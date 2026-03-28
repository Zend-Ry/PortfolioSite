import {useState, useEffect, useMemo, useRef} from 'react';
import {Link} from 'react-router';
import {ArrowLeft, ChevronDown, Sun, Moon} from 'lucide-react';
import {motion, AnimatePresence} from 'motion/react';
import {useTheme} from '../context/ThemeContext';
import {generations} from '../data/livingdex';
import {PokemonCard} from '../components/PokemonCard';
import {
    fetchPokemonList,
    fetchPokemonSpeciesList,
    type PokeApiListItem,
    type PokeApiSpeciesListItem
} from '../data/pokeapiCacheClient';

const SHINY_COLOR = '#F0C040';
const BOX_SIZE = 30;
const GENERATION_ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];

type LivingDexPokemon = {
    entryKey: string;
    id: number;
    baseSpeciesId: number;
    releaseGen: number;
    isForm: boolean;
    name: string;
    isCaught: boolean;
    isShinyCaught: boolean;
    spriteNormal: string | null;
    spriteShiny: string | null;
};

type BoxGroup = {
    boxNumber: number;
    entries: LivingDexPokemon[];
    generation: number;
    formsOnly: boolean;
};

const POKEAPI_SPRITES_BASE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';
const POKEAPI_ANIMATED_BASE = `${POKEAPI_SPRITES_BASE}/versions/generation-v/black-white/animated`;
const STATIC_SHINY_FALLBACK_IDS = new Set<number>([
    493, // Arceus: upstream animated shiny GIF is identical to the normal GIF
]);

type ManualFormEntry = {
    entryKey: string;
    id: number;
    name: string;
    spriteNormal: string;
    spriteShiny: string;
};

const MANUAL_FORM_ENTRIES_BY_SPECIES: Record<number, ManualFormEntry[]> = {
    415: [
        {
            entryKey: 'combee-female',
            id: 415,
            name: 'combee-female',
            spriteNormal: `${POKEAPI_ANIMATED_BASE}/female/415.gif`,
            spriteShiny: `${POKEAPI_ANIMATED_BASE}/shiny/female/415.gif`,
        },
    ],
};

function toDisplayName(name: string): string {
    return name
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
}

function formatDexNumber(value: number): string {
    return `#${String(value).padStart(4, '0')}`;
}

function getPercentText(value: number, total: number): string {
    return total === 0 ? '0.0' : ((value / total) * 100).toFixed(1);
}

const EXCLUDED_FORM_SUFFIXES =
    ['-mega', '-gmax', '-male', '-ice', '-totem', '-strike', '-four', '-mask', '-two-segment', '-curly', '-zero', '-incarnate', '-crowned',
        '-full', '-disguised', '-meteor', '-midday', '-solo', '-unbound', '-complete', '-construct', '-50', '-shield', '-aria', '-ordinary',
        '-zen', '-land', '-altered', '-origin', '-plant', '-normal', '-primal', 'pikachu-'];
const REGIONAL_RELEASE_GEN_BY_SUFFIX: Record<string, number> = {
    '-alola': 7,
    '-galar': 8,
    '-hisui': 8,
    '-paldea': 9,
};

const PREFERRED_DEFAULT_FORM_SUFFIX_BY_SPECIES: Record<string, string> = {
    squawkabilly: '-green-plumage',
    toxtricity: '-amped',
    oricorio: '-baile',
    pumpkaboo: '-average',
    gourgeist: '-average',
    darmanitan: '-standard',
    basculin: '-red-striped',
};

// Species-wide shiny blocks (base species ID). Useful for impossible shinies or forms
// where the shiny should not be tracked separately.
const SHINY_BLOCKED_SPECIES_IDS = new Set<number>([
    494, // Victini

    //658, // Greninja (Ash / Battle Bond)

    //666, // Vivillon (Poké Ball Pattern)

    //670, // Floette (Eternal Flower)

    720, // Hoopa
    10086, // Hoopa (Unbound)

    721, // Volcanion

    789, // Cosmog
    790, // Cosmoem

    801, // Magearna
    10227, // Magearna (Original Color)

    802, // Marshadow

    891, // Kubfu
    892, // Urshifu (Single Strike)
    10191, // Urshifu (Rapid Strike)

    893, // Zarude
    10192, // Zarude (Dada)

    896, // Glastrier
    897, // Spectrier
    898, // Calyrex

    901, // Ursaluna (Bloodmoon)

    1006, // Walking Wake
    1007, // Iron Leaves

    1014, // Okidogi
    1015, // Munkidori
    1016, // Fezandipiti

    1017, // Ogerpon
    10272, // Ogerpon (Teal Mask)
    10273, // Ogerpon (Cornerstone Mask)
    10274, // Ogerpon (Hearthflame Mask)

    1020, // Gouging Fire
    1021, // Raging Bolt
    1022, // Iron Boulder
    1023, // Iron Crown
]);

// Species where only alternate forms are shiny-blocked, while the base entry can still be shiny.
const SHINY_BLOCKED_FORM_SPECIES_IDS = new Set<number>([
    774, // Minior core forms stay locked, base Minior can be shiny
]);

// Exact Pokemon entry IDs to block from shiny tracking without affecting the whole species.
const SHINY_BLOCKED_ENTRY_IDS = new Set<number>([
    10080, // Pikachu (Original Cap)
    10081, // Pikachu (Hoenn Cap)
    10082, // Pikachu (Sinnoh Cap)
    10083, // Pikachu (Unova Cap)
    10084, // Pikachu (Kalos Cap)
    10085, // Pikachu (Alola Cap)
    10086, // Pikachu (Partner Cap)
    10087, // Pikachu (World Cap)
]);

// Exact Pokemon entry IDs to exclude (does not remove whole species/family)
const EXCLUDED_POKEMON_IDS = new Set<number>([
    10006, // Shaymin Sky
    10007, // Giratina Origin
    10018, // Meloetta (Pirouette Forme)
    10022, // Kyurem (Black Kyurem)
    10023, // Kyurem (White Kyurem)
    10024, // Keldo Resolute
    10061, // Floette (Eternal Flower)
    10026, // Aegislash (Blade Forme)
    10116, // Greninja Battle Bond
    10117, // Greninja Ash
    10127, // Wishiwashi School
    10143, // Mimikyu Busted
    10151, // Rockruff Own Tempo
    10155, // Necrozma Dusk Mane
    10156, // Necrozma Dawn Wings
    10157, // Necrozma Ultra
    10158,  // Starter Pikachu
    10159,  // Starter Eevee
    10182, // Cramorant Gulping
    10183, // Cramorant Gorging
    10187, // Morpeko Hangry
    10190, // Eternatus Eternamax
    10192, // Zarude Dada
    10194, // Calyrex Shadow
    10264, // Koraidon Limited Build
    10265, // Koraidon Sprinting Build
    10266, // Koraidon Swimming Build
    10267, // Koraidon Gliding Build
    10268, // Miraidon Low Key Mode
    10269, // Miraidon Drive Mode
    10270, // Miraidon Aquatic Mode
    10271, // Miraidon Glide Mode
    10276, // Terapagos Terastal
    10277, // Terapagos Stellar
]);

function splitIntoChunks<T>(items: T[], chunkSize: number): T[][] {
    const chunks: T[][] = [];
    for (let index = 0; index < items.length; index += chunkSize) {
        chunks.push(items.slice(index, index + chunkSize));
    }
    return chunks;
}

function getGenerationForDexNumber(id: number): number {
    const generation = generations.find((g) => id >= g.startDex && id <= g.endDex);
    return generation?.gen ?? 9;
}

function getReleaseGeneration(formName: string, baseSpeciesId: number): number {
    const normalizedName = formName.toLowerCase();
    for (const [suffix, generation] of Object.entries(REGIONAL_RELEASE_GEN_BY_SUFFIX)) {
        if (normalizedName.includes(suffix)) {
            return generation;
        }
    }
    return getGenerationForDexNumber(baseSpeciesId);
}

function findBaseSpeciesName(formName: string, speciesNamesByLength: string[]): string | null {
    const normalizedFormName = formName.toLowerCase();
    for (const speciesName of speciesNamesByLength) {
        if (normalizedFormName.startsWith(`${speciesName}-`)) {
            return speciesName;
        }
    }
    return null;
}

function getDisplayDexNumber(pokemon: LivingDexPokemon): number {
    return pokemon.id;
}

function isShinyBlocked(pokemon: LivingDexPokemon): boolean {
    return SHINY_BLOCKED_SPECIES_IDS.has(pokemon.baseSpeciesId)
        || (SHINY_BLOCKED_FORM_SPECIES_IDS.has(pokemon.baseSpeciesId) && pokemon.isForm)
        || SHINY_BLOCKED_ENTRY_IDS.has(pokemon.id);
}

function getNextCatchState(pokemon: LivingDexPokemon): LivingDexPokemon {
    if (isShinyBlocked(pokemon)) {
        return pokemon.isCaught
            ? {...pokemon, isCaught: false, isShinyCaught: false}
            : {...pokemon, isCaught: true};
    }

    if (pokemon.isShinyCaught) {
        return {...pokemon, isCaught: false, isShinyCaught: false};
    }

    if (pokemon.isCaught) {
        return {...pokemon, isCaught: true, isShinyCaught: true};
    }

    return {...pokemon, isCaught: true};
}

function normalizeDexSearch(query: string): {digitsRaw: string; digitsNormalized: string} | null {
    const withoutHash = query.trim().replace(/^#/, '').trim();
    if (!/^\d+$/.test(withoutHash)) {
        return null;
    }

    const digitsNormalized = withoutHash.replace(/^0+/, '') || '0';
    return {digitsRaw: withoutHash, digitsNormalized};
}

function buildInitialCollection(speciesList: PokeApiSpeciesListItem[], pokemonList: PokeApiListItem[]): LivingDexPokemon[] {
    const speciesByName = new Map(speciesList.map((species) => [species.name, species.id]));
    const baseSpecies = [...speciesList].sort((a, b) => a.id - b.id);
    const speciesNamesByLength = [...speciesByName.keys()].sort((a, b) => b.length - a.length);
    const formsByBaseSpecies = new Map<number, PokeApiListItem[]>();

    for (const pokemon of pokemonList) {
        if (speciesByName.has(pokemon.name)) {
            continue;
        }

        const normalizedName = pokemon.name.toLowerCase();
        // Skip non-Home forms and default male form aliases to avoid duplicate base entries.
        if (EXCLUDED_FORM_SUFFIXES.some((suffix) => normalizedName.includes(suffix))) {
            continue;
        }

        const baseSpeciesName = findBaseSpeciesName(normalizedName, speciesNamesByLength);
        if (!baseSpeciesName) {
            continue;
        }

        const baseSpeciesId = speciesByName.get(baseSpeciesName);
        if (!baseSpeciesId) {
            continue;
        }

        const forms = formsByBaseSpecies.get(baseSpeciesId) ?? [];
        forms.push(pokemon);
        formsByBaseSpecies.set(baseSpeciesId, forms);
    }

    const buildEntry = ({
                            entryKey,
                            id,
                            name,
                            baseSpeciesId,
                            isForm,
                            releaseGen,
                            spriteNormal,
                            spriteShiny,
                        }: {
        entryKey?: string;
        id: number;
        name: string;
        baseSpeciesId: number;
        isForm: boolean;
        releaseGen: number;
        spriteNormal?: string | null;
        spriteShiny?: string | null;
    }): LivingDexPokemon => {
        const hasAnimatedGen5 = id <= 649;
        const useStaticShinyFallback = STATIC_SHINY_FALLBACK_IDS.has(id);
        const defaultSpriteNormal = hasAnimatedGen5
            ? `${POKEAPI_ANIMATED_BASE}/${id}.gif`
            : `${POKEAPI_SPRITES_BASE}/${id}.png`;
        const defaultSpriteShiny = hasAnimatedGen5 && !useStaticShinyFallback
            ? `${POKEAPI_ANIMATED_BASE}/shiny/${id}.gif`
            : `${POKEAPI_SPRITES_BASE}/shiny/${id}.png`;

        return {
            entryKey: entryKey ?? String(id),
            id,
            baseSpeciesId,
            releaseGen,
            isForm,
            name: toDisplayName(name),
            isCaught: false,
            isShinyCaught: false,
            spriteNormal: spriteNormal ?? defaultSpriteNormal,
            spriteShiny: spriteShiny ?? defaultSpriteShiny,
        };
    };

    const orderedCollection: LivingDexPokemon[] = [];
    for (const species of baseSpecies) {
        const forms = (formsByBaseSpecies.get(species.id) ?? []).sort((a, b) => a.id - b.id);
        const manualForms = MANUAL_FORM_ENTRIES_BY_SPECIES[species.id] ?? [];
        const preferredSuffix = PREFERRED_DEFAULT_FORM_SUFFIX_BY_SPECIES[species.name];
        const preferredDefaultForm = preferredSuffix
            ? forms.find((form) => form.name.endsWith(preferredSuffix))
            : undefined;

        const releaseGen = getGenerationForDexNumber(species.id);
        if (!EXCLUDED_POKEMON_IDS.has(species.id)) {
            orderedCollection.push(
                buildEntry({
                    id: preferredDefaultForm?.id ?? species.id,
                    name: preferredDefaultForm?.name ?? species.name,
                    baseSpeciesId: species.id,
                    isForm: false,
                    releaseGen: preferredDefaultForm
                        ? getReleaseGeneration(preferredDefaultForm.name, species.id)
                        : releaseGen,
                }),
            );
        }

        for (const form of forms) {
            if (preferredDefaultForm && form.id === preferredDefaultForm.id) {
                continue;
            }
            if (EXCLUDED_POKEMON_IDS.has(form.id)) {
                continue;
            }
            orderedCollection.push(
                buildEntry({
                    id: form.id,
                    name: form.name,
                    baseSpeciesId: species.id,
                    isForm: true,
                    releaseGen: getReleaseGeneration(form.name, species.id),
                }),
            );
        }

        for (const manualForm of manualForms) {
            orderedCollection.push(
                buildEntry({
                    entryKey: manualForm.entryKey,
                    id: manualForm.id,
                    name: manualForm.name,
                    baseSpeciesId: species.id,
                    isForm: true,
                    releaseGen,
                    spriteNormal: manualForm.spriteNormal,
                    spriteShiny: manualForm.spriteShiny,
                }),
            );
        }
    }

    return orderedCollection;
}

function DualProgressBar({
                             value,
                             valueShiny,
                             max,
                             maxShiny = max,
                             color,
                         }: {
    value: number;
    valueShiny: number;
    max: number;
    maxShiny?: number;
    color: string;
}) {
    const normalPct = max === 0 ? 0 : Math.min(100, (value / max) * 100);
    const shinyPct = maxShiny === 0 ? 0 : Math.min(100, (valueShiny / maxShiny) * 100);
    return (
        <div className="flex flex-col gap-0.5">
            <div className="w-full h-2 overflow-hidden" style={{backgroundColor: 'rgba(128,128,128,0.2)'}}>
                <div
                    className="h-full transition-all duration-700"
                    style={{width: `${normalPct}%`, backgroundColor: color}}
                />
            </div>
            <div className="w-full h-2 overflow-hidden" style={{backgroundColor: 'rgba(128,128,128,0.2)'}}>
                <div
                    className="h-full transition-all duration-700"
                    style={{width: `${shinyPct}%`, backgroundColor: SHINY_COLOR}}
                />
            </div>
        </div>
    );
}

export default function PokemonLivingDex() {
    const {theme, colors, toggleTheme} = useTheme();
    const previousPokemonRef = useRef<LivingDexPokemon | null>(null);
    const [generationsOpen, setGenerationsOpen] = useState(false);
    const [boxedView, setBoxedView] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [pokemonCollection, setPokemonCollection] = useState<LivingDexPokemon[]>([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState<string | null>(null);

    useEffect(() => {
        Promise.all([fetchPokemonSpeciesList(), fetchPokemonList()])
            .then(async ([species, allPokemon]) => {
                setPokemonCollection(buildInitialCollection(species, allPokemon));
                const response = await fetch('http://localhost:3001/api/pokemon', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                })

                const collection = await response.json();
                setPokemonCollection((curr) => {
                    return curr.map((pokemon) => {
                        const dbEntry = collection.find((d: {dex_id: number}) => d.dex_id === pokemon.id);

                        if (dbEntry !== undefined)
                        {
                            if (pokemon.id === dbEntry.dex_id)
                            {
                                return {...pokemon, isCaught: dbEntry.caught === 1, isShinyCaught: dbEntry.shiny === 1};
                            }
                        }
                        return pokemon;
                    })
                });
            })
            .catch((err: unknown) => {
                setFetchError(err instanceof Error ? err.message : 'Failed to load full Pokemon and form list');
            })
            .finally(() => setLoading(false));
    }, []);

    const collectionTotal = pokemonCollection.length;
    const collectionCaught = pokemonCollection.filter((pokemon) => pokemon.isCaught).length;
    const shinyEligiblePokemon = pokemonCollection.filter((pokemon) => !isShinyBlocked(pokemon));
    const shinyEligibleTotal = shinyEligiblePokemon.length;
    const collectionCaughtShiny = shinyEligiblePokemon.filter((pokemon) => pokemon.isShinyCaught).length;

    const generationProgress = useMemo(
        () =>
            generations.map((g) => {
                const inRange = pokemonCollection.filter((pokemon) => pokemon.releaseGen === g.gen);
                const shinyEligibleInRange = inRange.filter((pokemon) => !isShinyBlocked(pokemon));
                const caught = inRange.filter((pokemon) => pokemon.isCaught).length;
                const caughtShiny = shinyEligibleInRange.filter((pokemon) => pokemon.isShinyCaught).length;
                return {...g, total: inRange.length, shinyTotal: shinyEligibleInRange.length, caught, caughtShiny};
            }),
        [pokemonCollection],
    );

    const overallPct = getPercentText(collectionCaught, collectionTotal);
    const overallShinyPct = getPercentText(collectionCaughtShiny, shinyEligibleTotal);

    const boxedGroups = useMemo(() => {
        const groups: BoxGroup[] = [];
        let boxNumber = 1;
        const assignedEntryKeys = new Set<string>();

        for (const generation of generations) {
            const baseSpeciesEntries = pokemonCollection.filter(
                (pokemon) => !pokemon.isForm && pokemon.releaseGen === generation.gen,
            );
            const formEntries = pokemonCollection.filter(
                (pokemon) => pokemon.isForm && pokemon.releaseGen === generation.gen,
            );

            for (const chunk of splitIntoChunks(baseSpeciesEntries, BOX_SIZE)) {
                chunk.forEach((entry) => assignedEntryKeys.add(entry.entryKey));``
                groups.push({boxNumber, entries: chunk, generation: generation.gen, formsOnly: false});
                boxNumber += 1;
            }

            for (const chunk of splitIntoChunks(formEntries, BOX_SIZE)) {
                chunk.forEach((entry) => assignedEntryKeys.add(entry.entryKey));
                groups.push({boxNumber, entries: chunk, generation: generation.gen, formsOnly: true});
                boxNumber += 1;
            }
        }

        const unassignedEntries = pokemonCollection.filter((pokemon) => !assignedEntryKeys.has(pokemon.entryKey));
        const sortedUnassigned = [...unassignedEntries].sort((a, b) => a.id - b.id);
        for (const chunk of splitIntoChunks(sortedUnassigned, BOX_SIZE)) {
            if (chunk.length === 0) continue;
            groups.push({
                boxNumber,
                entries: chunk,
                generation: chunk[0].releaseGen,
                formsOnly: chunk.every((pokemon) => pokemon.isForm),
            });
            boxNumber += 1;
        }

        return groups;
    }, [pokemonCollection]);

    const filteredPokemonCollection = useMemo(() => {
        const normalizedSearch = searchQuery.trim().toLowerCase();
        if (!normalizedSearch) {
            return pokemonCollection;
        }

        const dexSearch = normalizeDexSearch(normalizedSearch);

        return pokemonCollection.filter((pokemon) => {
            if (pokemon.name.toLowerCase().includes(normalizedSearch)) {
                return true;
            }

            if (!dexSearch) {
                return false;
            }

            const dexNumber = getDisplayDexNumber(pokemon);
            const dexRaw = String(dexNumber);
            const dexPadded4 = dexRaw.padStart(4, '0');

            return dexRaw.includes(dexSearch.digitsNormalized) || dexPadded4.includes(dexSearch.digitsRaw);
        });
    }, [pokemonCollection, searchQuery]);

    const filteredBoxedGroups = useMemo(() => {
        const filteredEntryKeys = new Set(filteredPokemonCollection.map((pokemon) => pokemon.entryKey));
        return boxedGroups
            .map((group) => ({
                ...group,
                entries: group.entries.filter((pokemon) => filteredEntryKeys.has(pokemon.entryKey)),
            }))
            .filter((group) => group.entries.length > 0);
    }, [boxedGroups, filteredPokemonCollection]);

    const toggleCaught = async (entryKey: string) => {

        const previousPokemon = pokemonCollection.find((p) => p.entryKey === entryKey);
        previousPokemonRef.current = previousPokemon ?? null;

        // Update local state immediately for responsive UI
        setPokemonCollection((prev) => {

            if (!previousPokemon) {
                return prev;
            }

            return prev.map((pokemon) =>
                pokemon.entryKey === entryKey ? getNextCatchState(pokemon) : pokemon,
            );
        });

        // optimistically update backend, but don't block UI and don't revert on failure since user can manually fix it later by clicking again
        const response = await fetch('http://localhost:3001/api/pokemon/cycle', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dex_id: previousPokemonRef.current.id, name: previousPokemonRef.current.name })
        });

        // Fallback if backend update fails - restore previous state
        if (!response.ok) {
            // restore previous state
            setPokemonCollection((prev) =>
                prev.map((pokemon) =>
                    pokemon.entryKey === entryKey ? previousPokemonRef.current! : pokemon
                )
            );
        }
    };

    const renderPokemonCard = (pokemon: LivingDexPokemon) => {
        const shinyBlocked = isShinyBlocked(pokemon);
        const displayDexNumber = getDisplayDexNumber(pokemon);

        return (
            <PokemonCard
                key={pokemon.entryKey}
                dexNumber={displayDexNumber}
                name={loading ? formatDexNumber(displayDexNumber) : pokemon.name}
                isCaught={pokemon.isCaught}
                isShinyCaught={!shinyBlocked && pokemon.isShinyCaught}
                imageSrc={pokemon.spriteNormal ?? undefined}
                imageSrcShiny={shinyBlocked ? undefined : pokemon.spriteShiny ?? undefined}
                onClick={() => toggleCaught(pokemon.entryKey)}
            />
        );
    };

    return (
        <div
            className="min-h-screen transition-colors duration-500"
            style={{backgroundColor: colors.background, color: colors.text}}
        >
            <div className="max-w-5xl mx-auto px-6 py-12">
                <div className="flex items-center justify-between mb-10">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
                        style={{color: colors.primary, fontFamily: 'JetBrains Mono, monospace'}}
                    >
                        <ArrowLeft size={16}/>
                        back to portfolio
                    </Link>

                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg transition-all hover:scale-110 cursor-pointer"
                        style={{color: colors.primary, backgroundColor: colors.cardBg}}
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? <Sun size={18}/> : <Moon size={18}/>}
                    </button>
                </div>

                <div className="mb-4">
                    <span
                        className="text-xs px-3 py-1 rounded-full"
                        style={{
                            backgroundColor: colors.cardBg,
                            color: colors.textSecondary,
                            fontFamily: 'JetBrains Mono, monospace',
                            border: `1px solid ${colors.primary}33`,
                        }}
                    >
                        🤫 secret page
                    </span>
                </div>

                <div className="mb-10">
                    <h1 className="text-4xl md:text-5xl mb-2">
                        Pokemon{' '}
                        <span style={{color: colors.primary}}>Living Dex</span>
                    </h1>
                    <p className="text-sm" style={{color: colors.textSecondary, fontFamily: 'SUSE, sans-serif'}}>
                        One of every species, form, evolution — caught and stored into Pokémon home.
                    </p>
                </div>

                <div
                    className="rounded-xl p-8 mb-10"
                    style={{
                        backgroundColor: colors.cardBg,
                        boxShadow: theme === 'light' ? '0 4px 20px rgba(0,0,0,0.08)' : 'none',
                    }}
                >
                    <p className="text-xs mb-3"
                       style={{color: colors.textSecondary, fontFamily: 'JetBrains Mono, monospace'}}>
                        overall progress
                    </p>

                    <div className="flex items-end justify-between gap-4 mb-4">
                        <div className="flex flex-col gap-0">
                            <p className="text-3xl font-bold leading-tight" style={{color: colors.primary}}>
                                {collectionCaught}{' '}
                                <span className="text-lg font-normal" style={{color: colors.textSecondary}}>
                  / {collectionTotal}
                </span>
                            </p>
                            <p className="text-3xl font-bold leading-tight" style={{color: SHINY_COLOR}}>
                                {collectionCaughtShiny}{' '}
                                <span className="text-lg font-normal" style={{color: colors.textSecondary}}>
                  / {shinyEligibleTotal}
                </span>
                            </p>
                        </div>

                        <div className="text-right flex flex-col gap-1">
                            <p className="text-sm font-bold"
                               style={{color: colors.primary, fontFamily: 'JetBrains Mono, monospace'}}>
                                {overallPct}%
                            </p>
                            <p className="text-sm font-bold"
                               style={{color: SHINY_COLOR, fontFamily: 'JetBrains Mono, monospace'}}>
                                ✨ {overallShinyPct}%
                            </p>
                        </div>
                    </div>

                    <DualProgressBar
                        value={collectionCaught}
                        valueShiny={collectionCaughtShiny}
                        max={collectionTotal}
                        maxShiny={shinyEligibleTotal}
                        color={colors.primary}
                    />
                </div>

                <div>
                    <button
                        onClick={() => setGenerationsOpen((prev) => !prev)}
                        className="flex items-center justify-between w-full mb-5 group cursor-pointer"
                    >
            <span
                className="text-xs tracking-widest uppercase"
                style={{color: colors.textSecondary, fontFamily: 'JetBrains Mono, monospace'}}
            >
              by generation
            </span>
                        <motion.div
                            animate={{rotate: generationsOpen ? 0 : -90}}
                            transition={{duration: 0.25}}
                        >
                            <ChevronDown size={16} style={{color: colors.textSecondary}}/>
                        </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                        {generationsOpen && (
                            <motion.div
                                key="gen-grid"
                                initial={{opacity: 0, height: 0}}
                                animate={{opacity: 1, height: 'auto'}}
                                exit={{opacity: 0, height: 0}}
                                transition={{duration: 0.3, ease: 'easeInOut'}}
                                style={{overflow: 'hidden'}}
                            >
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {generationProgress.map((g) => {
                                        const pct = getPercentText(g.caught, g.total);
                                        const shinyPct = getPercentText(g.caughtShiny, g.shinyTotal);
                                        const complete = g.caught === g.total;
                                        const shinyComplete = g.shinyTotal > 0 && g.caughtShiny === g.shinyTotal;
                                        return (
                                            <div
                                                key={g.gen}
                                                className="rounded-xl p-6 flex flex-col gap-4"
                                                style={{
                                                    backgroundColor: colors.cardBg,
                                                    boxShadow: theme === 'light' ? '0 2px 10px rgba(0,0,0,0.05)' : 'none',
                                                    borderTop: `3px solid ${g.color}`,
                                                }}
                                            >
                                                <div className="flex items-start justify-between gap-2">
                                                    <div>
                                                        <span
                                                            className="text-xs px-2 py-0.5 rounded"
                                                            style={{
                                                                backgroundColor: `${g.color}22`,
                                                                color: g.color,
                                                                fontFamily: 'JetBrains Mono, monospace',
                                                            }}
                                                        >
                                                            Gen {GENERATION_ROMAN_NUMERALS[g.gen - 1]}
                                                        </span>
                                                        <h2 className="text-lg mt-1">{g.region}</h2>
                                                        <p className="text-xs" style={{
                                                            color: colors.textSecondary,
                                                            fontFamily: 'SUSE, sans-serif'
                                                        }}>
                                                            {g.games}
                                                        </p>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        {complete && <span className="text-base"
                                                                           title="Normal complete!">✅</span>}
                                                        {shinyComplete && <span className="text-base"
                                                                                title="Shiny complete!">✨</span>}
                                                    </div>
                                                </div>

                                                <p className="text-xs" style={{
                                                    color: colors.textSecondary,
                                                    fontFamily: 'JetBrains Mono, monospace'
                                                }}>
                                                    {formatDexNumber(g.startDex)} – {formatDexNumber(g.endDex)}
                                                </p>

                                                <div className="mt-auto flex flex-col gap-2">
                                                    <div className="flex items-end justify-between gap-2">
                                                        <div className="flex flex-col gap-0">
                                                            <p className="text-xl font-bold leading-tight"
                                                               style={{color: g.color}}>
                                                                {g.caught}{' '}
                                                                <span className="text-sm font-normal"
                                                                      style={{color: colors.textSecondary}}>/ {g.total}</span>
                                                            </p>
                                                            <p className="text-xl font-bold leading-tight"
                                                               style={{color: SHINY_COLOR}}>
                                                                {g.caughtShiny}{' '}
                                                                <span className="text-sm font-normal"
                                                                      style={{color: colors.textSecondary}}>/ {g.shinyTotal}</span>
                                                            </p>
                                                        </div>
                                                        <div className="text-right flex flex-col gap-0.5">
                                                            <p className="text-xs font-bold" style={{
                                                                color: g.color,
                                                                fontFamily: 'JetBrains Mono, monospace'
                                                            }}>
                                                                {pct}%
                                                            </p>
                                                            <p className="text-xs font-bold" style={{
                                                                color: SHINY_COLOR,
                                                                fontFamily: 'JetBrains Mono, monospace'
                                                            }}>
                                                                ✨ {shinyPct}%
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <DualProgressBar value={g.caught} valueShiny={g.caughtShiny}
                                                                     max={g.total} maxShiny={g.shinyTotal}
                                                                     color={g.color}/>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <section className="mt-10">
                    <div className="flex items-center justify-between mb-4 gap-3">
                        <h2
                            className="text-xs tracking-widest uppercase"
                            style={{color: colors.textSecondary, fontFamily: 'JetBrains Mono, monospace'}}
                        >
                            catch list
                        </h2>
                        <button
                            type="button"
                            onClick={() => setBoxedView((prev) => !prev)}
                            className="text-xs px-3 py-1 rounded-full border transition-opacity hover:opacity-85 cursor-pointer"
                            style={{
                                color: boxedView ? '#ffffff' : colors.textSecondary,
                                backgroundColor: boxedView ? colors.primary : colors.cardBg,
                                borderColor: `${colors.primary}44`,
                                fontFamily: 'JetBrains Mono, monospace',
                            }}
                        >
                            Boxed view: {boxedView ? 'ON' : 'OFF'}
                        </button>
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                            placeholder="Search by name or dex number (e.g. #0387)"
                            className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                            style={{
                                backgroundColor: colors.cardBg,
                                color: colors.text,
                                border: `1px solid ${colors.primary}44`,
                                fontFamily: 'Arial, Helvetica, sans-serif',
                            }}
                            aria-label="Search catch list"
                        />
                    </div>
                    {fetchError && (
                        <p className="text-xs mb-3" style={{color: '#DC2626', fontFamily: 'JetBrains Mono, monospace'}}>
                            ⚠ {fetchError}
                        </p>
                    )}

                    {boxedView ? (
                        <div className="flex flex-col gap-6">
                            {filteredBoxedGroups.map((box) => {
                                const firstDex = box.entries[0] ? getDisplayDexNumber(box.entries[0]) : 0;
                                const lastDex = box.entries[box.entries.length - 1] ? getDisplayDexNumber(box.entries[box.entries.length - 1]) : 0;
                                const generation = generations.find((g) => g.gen === box.generation);
                                const boxTypeLabel = box.formsOnly ? `${generation?.region ?? 'Unknown'} forms` : generation?.region ?? 'Unknown';
                                return (
                                    <div
                                        key={`box-${box.boxNumber}`}
                                        className="rounded-xl p-4"
                                        style={{
                                            backgroundColor: colors.cardBg,
                                            boxShadow: theme === 'light' ? '0 2px 10px rgba(0,0,0,0.05)' : 'none',
                                        }}
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <p className="text-xs"
                                               style={{color: colors.primary, fontFamily: 'JetBrains Mono, monospace'}}>
                                                Box {String(box.boxNumber).padStart(2, '0')} - {boxTypeLabel}
                                            </p>
                                            <p className="text-xs" style={{
                                                color: colors.textSecondary,
                                                fontFamily: 'JetBrains Mono, monospace'
                                            }}>
                                                {formatDexNumber(firstDex)} - {formatDexNumber(lastDex)} ({box.entries.length}/{BOX_SIZE})
                                            </p>
                                        </div>

                                        <div
                                            className="grid gap-4"
                                            style={{gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))'}}
                                        >
                                            {box.entries.map(renderPokemonCard)}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div
                            className="grid gap-4"
                            style={{gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))'}}
                        >
                            {filteredPokemonCollection.map(renderPokemonCard)}
                        </div>
                    )}

                    {!loading && filteredPokemonCollection.length === 0 && (
                        <p className="text-xs mt-4"
                           style={{color: colors.textSecondary, fontFamily: 'JetBrains Mono, monospace'}}>
                            No Pokemon match your search.
                        </p>
                    )}
                </section>

                <p
                    className="mt-10 text-xs text-center"
                    style={{color: colors.textSecondary, fontFamily: 'JetBrains Mono, monospace'}}
                >
                    Living Dex collection — {collectionCaught} / {collectionTotal} caught
                </p>

                <div className="mt-6 text-xs" style={{color: colors.textSecondary, fontFamily: 'SUSE, sans-serif'}}>
                    <p>
                        Pokemon data is provided by{' '}
                        <a
                            href="https://pokeapi.co/"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{color: colors.primary}}
                        >
                            PokeAPI
                        </a>
                        .
                    </p>
                    <p className="mt-1">
                        Pokemon names, sprites, and related assets are trademarks and copyrights of Nintendo, Game
                        Freak, and The Pokemon Company.
                        This project is fan-made and not affiliated with or endorsed by Nintendo, Game Freak, or The
                        Pokemon Company.
                    </p>
                </div>

            </div>
        </div>
    );
}
