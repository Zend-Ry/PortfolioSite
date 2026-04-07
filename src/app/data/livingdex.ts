export interface Generation {
  gen: number;
  region: string;
  games: string;
  startDex: number;
  endDex: number;
  total: number;
  /** Update this value as you catch Pokémon */
  caught: number;
  color: string;
}

export const generations: Generation[] = [
  { gen: 1, region: 'Kanto',  games: 'Red / Blue / Yellow',         startDex: 1,   endDex: 151,  total: 151, caught: 0, color: '#CC0000' },
  { gen: 2, region: 'Johto',  games: 'Gold / Silver / Crystal',     startDex: 152, endDex: 251,  total: 100, caught: 0, color: '#B8860B' },
  { gen: 3, region: 'Hoenn',  games: 'Ruby / Sapphire / Emerald',   startDex: 252, endDex: 386,  total: 135, caught: 0, color: '#1565C0' },
  { gen: 4, region: 'Sinnoh', games: 'Diamond / Pearl / Platinum',  startDex: 387, endDex: 493,  total: 107, caught: 0, color: '#5C6BC0' },
  { gen: 5, region: 'Unova',  games: 'Black / White',               startDex: 494, endDex: 649,  total: 156, caught: 0, color: '#546E7A' },
  { gen: 6, region: 'Kalos',  games: 'X / Y',                       startDex: 650, endDex: 721,  total: 72,  caught: 0, color: '#1E88E5' },
  { gen: 7, region: 'Alola',  games: 'Sun / Moon',                  startDex: 722, endDex: 809,  total: 88,  caught: 0, color: '#FF8F00' },
  { gen: 8, region: 'Galar',  games: 'Sword / Shield',              startDex: 810, endDex: 905,  total: 96,  caught: 0, color: '#C62828' },
  { gen: 9, region: 'Paldea', games: 'Scarlet / Violet',            startDex: 906, endDex: 1025, total: 120, caught: 0, color: '#6A1B9A' },
];

export const TOTAL_POKEMON = generations.reduce((sum, g) => sum + g.total, 0);
export const TOTAL_CAUGHT  = generations.reduce((sum, g) => sum + g.caught, 0);
