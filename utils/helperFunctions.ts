import { Cells, Player } from '@/types/gameTypes';

export function randomArrayItem(array: number[]) {
  return Math.floor(Math.random() * array.length);
}

export function isArrayEmpty(array: Cells) {
  return array.reduce((acc, item) => {
    if (!item && acc) return true;
    return false;
  }, true);
}

export function isArrayFilled(array: Cells) {
  return array.reduce((acc, item) => {
    if (item && acc) return true;
    return false;
  }, true);
}

export function isArrayFilledInfinity(array: Cells) {
  let X = 0,
    O = 0;
  return array.reduce((acc, item) => {
    if (item === 'X') X++;
    if (item === 'O') O++;
    if (X === 3 || O === 3 || acc) return true;
    return false;
  }, false);
}

export function isArrayFilledInfinityStrict(array: Cells) {
  let X = 0,
    O = 0;
  return array.reduce((acc, item) => {
    if (item === 'X') X++;
    if (item === 'O') O++;
    if ((X === 3 && O === 3) || acc) return true;
    return false;
  }, false);
}

export function arrayItemPlaceIndexes(array: Cells, item: Player | null) {
  return array
    .map((move, index) => {
      if (move === item) return index;
      return [];
    })
    .flat();
}

export function removeArrayItem(array: Cells, itemIndex: number) {
  return array.map((item, index) => {
    if (index === itemIndex) return null;
    return item;
  });
}
