import useSound from './useSound';

export default function useClick() {
  const { selectedSound } = useSound();
  return function handleClick<T>(clickFunction: (payload: T) => void) {
    return function (payload: T, ...rest: Function[]) {
      return function () {
        selectedSound();
        clickFunction(payload);
        rest.forEach((func) => func());
      };
    };
  };
}
