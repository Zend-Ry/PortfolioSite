export type CachedPokemonResponse = {
  data: unknown;
  cached: boolean;
  fetchedAt: number;
  expiresAt: number;
  sourceUrl: string;
};

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';
// Bump this when cache payload or sprite priority rules change.
const COOKIE_PREFIX = 'poke_cache_v2_animated_';
const CACHE_TTL_MS = 1000 * 60 * 60 * 24; // 24h

// Minimal shape of a PokeAPI /pokemon/:id response — only what the card grid needs.
export type PokeApiPokemon = {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
    front_shiny:   string | null;
  };
};

type CookieCachePayload = {
  data: PokeApiPokemon;
  fetchedAt: number;
  expiresAt: number;
  sourceUrl: string;
};

export type PokeApiSpeciesListItem = {
  id: number;
  name: string;
};

export type PokeApiListItem = {
  id: number;
  name: string;
};

function normalizePokemonKey(value: string | number): string {
  return String(value).trim().toLowerCase();
}

function buildCookieName(idOrName: string | number): string {
  const key = normalizePokemonKey(idOrName).replace(/[^a-z0-9_-]/g, '_');
  return `${COOKIE_PREFIX}${key}`;
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const encodedName = `${encodeURIComponent(name)}=`;
  const parts = document.cookie.split('; ');
  const found = parts.find((part) => part.startsWith(encodedName));
  if (!found) return null;
  return decodeURIComponent(found.slice(encodedName.length));
}

function setCookie(name: string, value: string, expiresAt: number): void {
  if (typeof document === 'undefined') return;
  const maxAgeSec = Math.max(0, Math.floor((expiresAt - Date.now()) / 1000));
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; Max-Age=${maxAgeSec}; Path=/; SameSite=Lax`;
}

function readCachedPokemon(idOrName: string | number): CachedPokemonResponse | null {
  const cookieValue = getCookie(buildCookieName(idOrName));
  if (!cookieValue) return null;

  try {
    const parsed = JSON.parse(cookieValue) as CookieCachePayload;
    if (parsed.expiresAt <= Date.now()) return null;

    return {
      data: parsed.data,
      cached: true,
      fetchedAt: parsed.fetchedAt,
      expiresAt: parsed.expiresAt,
      sourceUrl: parsed.sourceUrl,
    };
  } catch {
    return null;
  }
}

function looksAnimatedSprite(url: string | null | undefined): boolean {
  if (!url) return false;
  return /\.gif(\?|$)/i.test(url);
}

function writeCachedPokemon(idOrName: string | number, payload: CookieCachePayload): void {
  setCookie(buildCookieName(idOrName), JSON.stringify(payload), payload.expiresAt);
}

function mapToMinimalPokemon(raw: unknown): PokeApiPokemon {
  const pokemon = raw as {
    id: number;
    name: string;
    sprites?: {
      front_default?: string | null;
      front_shiny?: string | null;
      versions?: {
        ['generation-v']?: {
          ['black-white']?: {
            animated?: {
              front_default?: string | null;
              front_shiny?: string | null;
            };
          };
        };
      };
    };
  };

  const animated = pokemon.sprites?.versions?.['generation-v']?.['black-white']?.animated;

  return {
    id: pokemon.id,
    name: pokemon.name,
    sprites: {
      // Prefer Generation V animated sprites where they exist, then fall back to static.
      front_default: animated?.front_default ?? pokemon.sprites?.front_default ?? null,
      front_shiny: animated?.front_shiny ?? pokemon.sprites?.front_shiny ?? null,
    },
  };
}

// Narrows the raw `data: unknown` from the cache response to the shape we use.
export function extractPokemon(response: CachedPokemonResponse): PokeApiPokemon {
  const raw = response.data as PokeApiPokemon;
  return {
    id:      raw.id,
    name:    raw.name,
    sprites: {
      front_default: raw.sprites?.front_default ?? null,
      front_shiny:   raw.sprites?.front_shiny   ?? null,
    },
  };
}

export async function fetchCachedPokemon(idOrName: string, refresh = false): Promise<CachedPokemonResponse> {
  if (!refresh) {
    const cached = readCachedPokemon(idOrName);
    // If an old/static payload somehow remains, refresh so animated preference applies.
    if (cached) {
      const pokemon = extractPokemon(cached);
      if (looksAnimatedSprite(pokemon.sprites.front_default) || looksAnimatedSprite(pokemon.sprites.front_shiny)) {
        return cached;
      }
    }
  }

  const normalized = normalizePokemonKey(idOrName);
  if (!normalized) {
    throw new Error('Pokemon id or name is required');
  }

  const sourceUrl = `${POKEAPI_BASE_URL}/pokemon/${encodeURIComponent(normalized)}`;
  const response = await fetch(sourceUrl);

  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon ${idOrName}: HTTP ${response.status}`);
  }

  const rawData = await response.json();
  const data = mapToMinimalPokemon(rawData);
  const fetchedAt = Date.now();
  const expiresAt = fetchedAt + CACHE_TTL_MS;

  writeCachedPokemon(idOrName, { data, fetchedAt, expiresAt, sourceUrl });

  return {
    data,
    cached: false,
    fetchedAt,
    expiresAt,
    sourceUrl,
  };
}

export async function fetchCachedPokemonBatch(ids: Array<string | number>, refresh = false) {
  const items = await Promise.all(ids.map((id) => fetchCachedPokemon(String(id), refresh)));
  return { items };
}

// Pulls the full species dex list from PokeAPI (one request).
export async function fetchPokemonSpeciesList(limit = 2000): Promise<PokeApiSpeciesListItem[]> {
  const response = await fetch(`${POKEAPI_BASE_URL}/pokemon-species?limit=${limit}&offset=0`);
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon species list: HTTP ${response.status}`);
  }

  const payload = (await response.json()) as {
    results?: Array<{ name: string; url: string }>;
  };

  const results = payload.results ?? [];
  const parsed = results
    .map((item) => {
      const idMatch = item.url.match(/\/(\d+)\/?$/);
      const id = idMatch ? Number(idMatch[1]) : NaN;
      if (!Number.isFinite(id)) return null;
      return { id, name: item.name };
    })
    .filter((item): item is PokeApiSpeciesListItem => item !== null)
    .sort((a, b) => a.id - b.id);

  return parsed;
}

// Pulls the full Pokemon list, including non-default forms.
export async function fetchPokemonList(limit = 3000): Promise<PokeApiListItem[]> {
  const response = await fetch(`${POKEAPI_BASE_URL}/pokemon?limit=${limit}&offset=0`);
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon list: HTTP ${response.status}`);
  }

  const payload = (await response.json()) as {
    results?: Array<{ name: string; url: string }>;
  };

  const results = payload.results ?? [];
  const parsed = results
    .map((item) => {
      const idMatch = item.url.match(/\/(\d+)\/?$/);
      const id = idMatch ? Number(idMatch[1]) : NaN;
      if (!Number.isFinite(id)) return null;
      return { id, name: item.name };
    })
    .filter((item): item is PokeApiListItem => item !== null)
    .sort((a, b) => a.id - b.id);

  return parsed;
}

