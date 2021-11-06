import { readable, writable, derived } from 'svelte/store';

export const lat = writable(48.111);
export const lon = writable(-4.148);
export const dataMeteo = writable(null);
export const dataClim = writable(null);
export const nbPrevi = writable(7);
export const seed = writable('Aucun');
export const input = writable('Aucune');
export const dateSelected = writable(null);
export const resultReglementation = writable(null);
export const resultBonnePratique = writable(null);
export const resultQualiteAir = writable(null);
export const resultQualiteEau = writable(null);