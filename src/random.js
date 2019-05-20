// shared mulberry32 random generator
let randomState = new Date().getTime();
export const random = () => {
  let t = (randomState += 0x6D2B79F5);
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  return ((t ^ t >>> 14) >>> 0) / 4294967296;
};
export const setRandomSeed = (seed) => {
  randomState = seed;
};


export const randomScalar = (min = 0, max = 1) => {
  return random() * (max - min) + min;
};
export const randomInteger = (min, max) => {
  return Math.floor(random() * (max - min) + min);
};
export const randomArray = (size, min = 0, max = 1) => {
  const arr = new Array(size);
  for (let i = 0; i < size; i++) {
    arr[i] = randomScalar(min, max);
  }
  return arr;
};
export const randomRgbColor = () => {
  return randomArray(3, 0, 255);
};
export const pickRandom = (arr) => {
  return arr[Math.trunc(random() * arr.length)];
};
export const pickRandomSubset = (nb, arr) => {
  return new Array(nb).fill(null).map(() => pickRandom(arr));
};
