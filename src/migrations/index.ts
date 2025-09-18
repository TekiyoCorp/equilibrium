import * as migration_20250916_183747 from './20250916_183747';
import * as migration_20250917_131238 from './20250917_131238';
import * as migration_20250918_173009 from './20250918_173009';
import * as migration_20250918_182425 from './20250918_182425';

export const migrations = [
  {
    up: migration_20250916_183747.up,
    down: migration_20250916_183747.down,
    name: '20250916_183747',
  },
  {
    up: migration_20250917_131238.up,
    down: migration_20250917_131238.down,
    name: '20250917_131238',
  },
  {
    up: migration_20250918_173009.up,
    down: migration_20250918_173009.down,
    name: '20250918_173009',
  },
  {
    up: migration_20250918_182425.up,
    down: migration_20250918_182425.down,
    name: '20250918_182425'
  },
];
