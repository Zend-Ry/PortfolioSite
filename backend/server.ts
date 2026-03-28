import express, { Request, Response } from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app  = express();
const PORT = process.env.PORT ?? 3001;

// ─── Middleware ───────────────────────────────────────────────────────────────

app.use(cors({ origin: 'http://localhost:5173' })); // your Vite dev URL
app.use(express.json());

// ─── Database ─────────────────────────────────────────────────────────────────

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database(path.join(__dirname, 'livingdex.db'));

// Create the pkmn if it doesn't exist yet
db.exec(`
  CREATE TABLE IF NOT EXISTS pkmn (
    dex_id INTEGER NOT NULL,
    name TEXT,
    caught INTEGER NOT NULL DEFAULT 0 CHECK (caught IN(0, 1)),
    shiny INTEGER NOT NULL DEFAULT 0 CHECK (shiny IN(0, 1)),
    PRIMARY KEY (dex_id),
    CHECK (NOT (shiny = 1 AND caught = 0))
  );
`);

// ─── Routes ───────────────────────────────────────────────────────────────────

app.post('/api/pokemon/cycle', (req: Request, res: Response) => {
  const { dex_id } = req.body;

  if (db.prepare('SELECT 1 FROM pkmn WHERE dex_id = ?').get(dex_id) === undefined)
  {
    db.prepare('INSERT INTO pkmn (dex_id, caught, shiny) VALUES (?, 1, 0)').run(dex_id);
  }
  else
  {
    const row = db.prepare('SELECT caught, shiny FROM pkmn WHERE dex_id = ?').get(dex_id) as { caught: number; shiny: number };

    if (row.caught === 1 && row.shiny === 0) {
      db.prepare('UPDATE pkmn SET shiny = ? WHERE dex_id = ?').run(1, dex_id);
    } else if (row.caught === 1 && row.shiny === 1) {
      db.prepare('UPDATE pkmn SET caught = ?, shiny = ? WHERE dex_id = ?').run(0, 0, dex_id);
    } else {
      db.prepare('UPDATE pkmn SET caught = ? WHERE dex_id = ?').run(1, dex_id);
    }
  }

  const updated = db.prepare('SELECT dex_id, caught, shiny FROM pkmn WHERE dex_id = ?').get(dex_id);
  res.json(updated);
});

// ─── Start ────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
