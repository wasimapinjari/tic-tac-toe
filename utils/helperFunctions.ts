import { Cells, Player, WinningCombination } from '@/types/gameTypes';

export const randomArrayIndex = <T>(array: T[]) =>
  Math.floor(Math.random() * array.length);

export const randomArrayItem = <T>(array: T[]) =>
  array[randomArrayIndex(array)];

export const isArrayEmpty = (array: Cells) =>
  array.reduce((acc, item) => {
    if (!item && acc) return true;
    return false;
  }, true);

export const isArrayFilled = (array: Cells) =>
  array.reduce((acc, item) => {
    if (item && acc) return true;
    return false;
  }, true);

export const isArrayFilledInfinity = (array: Cells) => {
  let X = 0,
    O = 0;
  return array.reduce((acc, item) => {
    if (item === 'X') X++;
    if (item === 'O') O++;
    if (X === 3 || O === 3 || acc) return true;
    return false;
  }, false);
};

export const isArrayFilledInfinityStrict = (array: Cells) => {
  let X = 0,
    O = 0;
  return array.reduce((acc, item) => {
    if (item === 'X') X++;
    if (item === 'O') O++;
    if ((X === 3 && O === 3) || acc) return true;
    return false;
  }, false);
};

export const isArrayInfinity = (array: Cells) => {
  let X = 0,
    O = 0;
  return array.reduce((acc, item) => {
    if (item === 'X') X++;
    if (item === 'O') O++;
    if ((X > 2 && O > 2) || acc) return true;
    return false;
  }, false);
};

export const arrayItemPlaceIndexes = (array: Cells, item: Player | null) =>
  array
    .map((move, index) => {
      if (move === item) return index;
      return [];
    })
    .flat();

export const removeArrayItem = (array: Cells, itemIndex: number) =>
  array.map((item, index) => {
    if (index === itemIndex) return null;
    return item;
  });

export const delay = (seconds = 1) =>
  new Promise((resolve) => setTimeout(resolve, 1000 * seconds));

export const doThisWordsExist = (sentence: string, ...rest: RegExp[]) =>
  rest
    .map((expression) => {
      return expression.test(sentence);
    })
    .reduce((acc, boolean) => {
      if (!boolean || !acc) return false;
      return true;
    }, true);

export const spreadArray = <T>(array: T) =>
  Array.isArray(array) ? array : [array];

export const invertPlayers = (array: Cells) =>
  array.map((cellContent) => {
    if (!cellContent) return null;
    if (cellContent === 'X') return 'O';
    return 'X';
  });

export const infinityTransform = (array: Cells, chosenPlayer: Player) => {
  const positions = {
    X: arrayItemPlaceIndexes(array, 'X'),
    O: arrayItemPlaceIndexes(array, 'O'),
  };
  const { X, O } = positions;
  while (X.length > 3) {
    const index = randomArrayIndex(X);
    array[X[index]] = null;
    X.splice(index, 1);
  }
  while (O.length > 3) {
    const index = randomArrayIndex(O);
    array[O[index]] = null;
    O.splice(index, 1);
  }
  const infinityIndex = randomArrayItem(positions[chosenPlayer]);
  return { array, infinityIndex };
};

export const addDashes = (text: string) => text.split(' ').join('-');

export const removeExtraSpaces = (sentence: string) =>
  sentence
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .split(' ')
    .map((word) => {
      return !word || word === '\n'
        ? []
        : word.startsWith('\n')
        ? word.slice(1)
        : word;
    })
    .flat();

export const insertProperties = <T, U>(object: T, value: U) => {
  return (key: keyof T) => ({
    ...object,
    [key]: value,
  });
};

export const winningLogic = ([x, y, z]: WinningCombination, cells: Cells) =>
  cells[x] &&
  cells[x] === cells[x] &&
  cells[x] === cells[y] &&
  cells[x] === cells[z];
