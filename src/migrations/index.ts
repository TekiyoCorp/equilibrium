import * as migration_20250916_183747 from './20250916_183747';
import * as migration_20250917_131238 from './20250917_131238';

export const migrations = [
  {
    up: migration_20250916_183747.up,
    down: migration_20250916_183747.down,
    name: '20250916_183747',
  },
  {
    up: migration_20250917_131238.up,
    down: migration_20250917_131238.down,
    name: '20250917_131238'
  },
];
