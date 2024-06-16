import { Cells } from '@/types/gameTypes';

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
