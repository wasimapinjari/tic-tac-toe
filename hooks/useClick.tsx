import { Function } from '@/types/gameTypes';
import useSound from './useSound';
import { useGameState } from './useGameState';

export default function useClick() {
  const { handleSelectedSound } = useSound();
  return function handleClick<T>(clickFunction: (payload: T) => void) {
    return function (payload: T, ...rest: Function[]) {
      return function () {
        handleSelectedSound();
        clickFunction(payload);
        rest.forEach((func) => func());
      };
    };
  };
}
