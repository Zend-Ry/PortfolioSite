# Living Dex Backend Cache

This backend now includes a SQLite cache for PokeAPI responses.

## What it does

- Stores Pokemon API payloads in `livingdex.db` (`pokeapi_cache` table)
- Uses cache-first reads
- Automatically refreshes cache entries after TTL expires
- Supports forced refresh via query string

## Environment

- `PORT` (default: `3001`)
- `POKEAPI_CACHE_TTL_MS` (default: `86400000`, i.e. 24 hours)

## API Endpoints

### `GET /api/pokemon/:idOrName`

Examples:

- `/api/pokemon/1`
- `/api/pokemon/pikachu`
- `/api/pokemon/pikachu?refresh=1`

Returns:

- `data`: raw PokeAPI payload
- `cached`: `true` when returned from local cache
- `fetchedAt`: unix ms timestamp of source fetch
- `expiresAt`: unix ms timestamp when cache expires
- `sourceUrl`: PokeAPI URL used

### `GET /api/pokemon?ids=1,2,pikachu`

Batch fetch for multiple Pokemon keys.

Optional:

- `refresh=1` to bypass cache and re-fetch all provided keys

### Existing endpoints

- `GET /api/progress`
- `PATCH /api/progress/:gen`

## Run

```bash
npm install
npm run dev
```

