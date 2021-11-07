import { readable, writable, derived } from 'svelte/store';

export const lat = writable(null);
export const lon = writable(null);
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


export const deviceWidth = readable(0, function start(set) {
  let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  set(width);
  window.addEventListener('resize', () => {
    let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    set(width)
  });
  return function stop() {};
})

export const deviceHeight = readable(0, function start(set) {
  let height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
  set(height);
  window.addEventListener('resize', () => {
    let height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
    set(height)
  });
  return function stop() {};
})