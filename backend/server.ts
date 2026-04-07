import express, { Request, Response } from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app  = express();
const PORT = process.env.PORT ?? 3001;
const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';
const POKEAPI_CACHE_TTL_MS = Number(process.env.POKEAPI_CACHE_TTL_MS ?? 1000 * 60 * 60 * 24);

// ─── Middleware ───────────────────────────────────────────────────────────────

app.use(cors({ origin: 'http://localhost:5173' })); // your Vite dev URL
app.use(express.json());

// ─── Database ─────────────────────────────────────────────────────────────────

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database(path.join(__dirname, 'livingdex.db'));

// Create the progress table if it doesn't exist yet
db.exec(`
  CREATE TABLE IF NOT EXISTS progress (
    gen          INTEGER PRIMARY KEY,
    caught       INTEGER NOT NULL DEFAULT 0,
    caught_shiny INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS pokeapi_cache (
    cache_key  TEXT PRIMARY KEY,
    payload    TEXT NOT NULL,
    fetched_at INTEGER NOT NULL,
    expires_at INTEGER NOT NULL,
    source_url TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_pokeapi_cache_expires_at ON pokeapi_cache (expires_at);
`);

// Seed one row per generation on first run (safe to re-run — uses INSERT OR IGNORE)
const seed = db.prepare('INSERT OR IGNORE INTO progress (gen) VALUES (?)');
for (let gen = 1; gen <= 9; gen++) seed.run(gen);

type PokemonCacheRow = {
  cache_key: string;
  payload: string;
  fetched_at: number;
  expires_at: number;
  source_url: string;
};

const getPokemonCache = db.prepare(
  'SELECT cache_key, payload, fetched_at, expires_at, source_url FROM pokeapi_cache WHERE cache_key = ?',
);

const upsertPokemonCache = db.prepare(`
  INSERT INTO pokeapi_cache (cache_key, payload, fetched_at, expires_at, source_url)
  VALUES (?, ?, ?, ?, ?)
  ON CONFLICT(cache_key)
  DO UPDATE SET
    payload = excluded.payload,
    fetched_at = excluded.fetched_at,
    expires_at = excluded.expires_at,
    source_url = excluded.source_url
`);

const normalizePokemonKey = (value: string) => value.trim().toLowerCase();

async function getCachedPokemon(
  idOrName: string,
  forceRefresh = false,
): Promise<{ data: unknown; cached: boolean; fetchedAt: number; expiresAt: number; sourceUrl: string }> {
  const cacheKey = normalizePokemonKey(idOrName);
  if (!cacheKey) {
    throw new Error('Invalid Pokemon id or name');
  }

  const now = Date.now();
  const existing = getPokemonCache.get(cacheKey) as PokemonCacheRow | undefined;

  if (existing && existing.expires_at > now && !forceRefresh) {
    return {
      data: JSON.parse(existing.payload),
      cached: true,
      fetchedAt: existing.fetched_at,
      expiresAt: existing.expires_at,
      sourceUrl: existing.source_url,
    };
  }

  const sourceUrl = `${POKEAPI_BASE_URL}/pokemon/${encodeURIComponent(cacheKey)}`;
  const response = await fetch(sourceUrl);

  if (!response.ok) {
    throw new Error(`PokeAPI request failed with status ${response.status}`);
  }

  const data = await response.json();
  const fetchedAt = Date.now();
  const expiresAt = fetchedAt + POKEAPI_CACHE_TTL_MS;

  upsertPokemonCache.run(cacheKey, JSON.stringify(data), fetchedAt, expiresAt, sourceUrl);

  return { data, cached: false, fetchedAt, expiresAt, sourceUrl };
}

// ─── Routes ───────────────────────────────────────────────────────────────────

// GET /api/progress
// Returns caught + caughtShiny for all 9 generations.
app.get('/api/progress', (_req: Request, res: Response) => {
  const rows = db.prepare('SELECT gen, caught, caught_shiny AS caughtShiny FROM progress ORDER BY gen').all();
  res.json(rows);
});

// PATCH /api/progress/:gen
// Updates caught and/or caughtShiny for a single generation.
// Body: { caught?: number, caughtShiny?: number }
app.patch('/api/progress/:gen', (req: Request, res: Response) => {
  const gen = Number(req.params.gen);
  const { caught, caughtShiny } = req.body as { caught?: number; caughtShiny?: number };

  if (!gen || gen < 1 || gen > 9) {
    res.status(400).json({ error: 'Invalid generation number (1–9)' });
    return;
  }

  if (caught !== undefined) {
    db.prepare('UPDATE progress SET caught = ? WHERE gen = ?').run(caught, gen);
  }
  if (caughtShiny !== undefined) {
    db.prepare('UPDATE progress SET caught_shiny = ? WHERE gen = ?').run(caughtShiny, gen);
  }

  const updated = db.prepare('SELECT gen, caught, caught_shiny AS caughtShiny FROM progress WHERE gen = ?').get(gen);
  res.json(updated);
});

// GET /api/pokemon/:idOrName
// Fetches a Pokemon payload from cache or PokeAPI, then caches it.
app.get('/api/pokemon/:idOrName', async (req: Request, res: Response) => {
  try {
    const idOrName = String(req.params.idOrName ?? '');
    const forceRefresh = req.query.refresh === '1';
    const result = await getCachedPokemon(idOrName, forceRefresh);
    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    const statusCode = message.includes('status 404') ? 404 : 500;
    res.status(statusCode).json({ error: message });
  }
});

// GET /api/pokemon?ids=1,2,pikachu
// Batch variant useful for card grids.
app.get('/api/pokemon', async (req: Request, res: Response) => {
  const idsParam = String(req.query.ids ?? '').trim();
  if (!idsParam) {
    res.status(400).json({ error: 'ids query is required, e.g. /api/pokemon?ids=1,2,pikachu' });
    return;
  }

  const keys = idsParam
    .split(',')
    .map((v) => normalizePokemonKey(v))
    .filter(Boolean);

  if (keys.length === 0) {
    res.status(400).json({ error: 'No valid ids provided' });
    return;
  }

  try {
    const forceRefresh = req.query.refresh === '1';
    const items = await Promise.all(keys.map((key) => getCachedPokemon(key, forceRefresh)));
    res.json({ items });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: message });
  }
});

// ─── Start ────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
