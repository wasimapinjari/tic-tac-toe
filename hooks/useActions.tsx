import { Dispatch, useCallback } from 'react';

export default function useActions<T, U, V>(dispatch: Dispatch<T>) {
  return function useAction(type: U) {
    return useCallback(
      (payload: V) => {
        return dispatch({ type, payload } as T);
      },
      [type]
    );
  };
}
