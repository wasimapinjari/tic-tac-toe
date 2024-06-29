'use client';

import { useCallback, useReducer } from 'react';
import { GameContextDispatch, GameContextState } from './contexts';
import {
  Cells,
  Children,
  InitialState,
  Player,
  ReducerActions,
  Score,
  Theme,
  WinningCombination,
} from '@/types/gameTypes';

export const initialCells: null[] = Array(9).fill(null);

export const initialScore = {
  X: 0,
  O: 0,
};

const initialState: InitialState = {
  currentPlayer: 'X',
  cells: initialCells,
  winner: null,
  chosenPlayer: 'X',
  isComputer: true,
  isGameEasy: true,
  isChaosMode: false,
  isInfinityMode: true,
  theme: null,
  winningCombination: [-1, -1, -1],
  score: initialScore,
  isLoading: false,
  isSoundOn: false,
  infinityIndex: -1,
};

function reducer(state: InitialState, action: ReducerActions): InitialState {
  const { type, payload } = action;
  switch (type) {
    case 'setChosenPlayer': {
      return {
        ...state,
        chosenPlayer: payload,
      };
    }
    case 'setPlayer': {
      return {
        ...state,
        currentPlayer: payload,
      };
    }
    case 'setCells': {
      return {
        ...state,
        cells: [...payload],
      };
    }
    case 'setWinner': {
      return {
        ...state,
        winner: payload,
      };
    }
    case 'setTheme': {
      return {
        ...state,
        theme: payload,
      };
    }
    case 'setComputer': {
      return {
        ...state,
        isComputer: payload,
      };
    }
    case 'setChaos': {
      return {
        ...state,
        isChaosMode: payload,
      };
    }
    case 'setDifficulty': {
      return {
        ...state,
        isGameEasy: payload,
      };
    }
    case 'setWinningCombo': {
      return {
        ...state,
        winningCombination: payload,
      };
    }
    case 'setScore': {
      return {
        ...state,
        score: payload,
      };
    }
    case 'setLoading': {
      return {
        ...state,
        isLoading: payload,
      };
    }
    case 'setSound': {
      return {
        ...state,
        isSoundOn: payload,
      };
    }
    case 'setIndex': {
      return {
        ...state,
        infinityIndex: payload,
      };
    }
    case 'setInfinity': {
      return {
        ...state,
        isInfinityMode: payload,
      };
    }
    default:
      throw new Error('Error, Invalid Action: ' + type);
  }
}

export default function GameContextProvider({ children }: Children) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setChosenPlayer = useCallback((payload: Player) => {
    return dispatch({ type: 'setChosenPlayer', payload });
  }, []);
  const setPlayer = useCallback((payload: Player) => {
    return dispatch({ type: 'setPlayer', payload });
  }, []);
  const setCells = useCallback((payload: Cells) => {
    return dispatch({ type: 'setCells', payload });
  }, []);
  const setWinner = useCallback((payload: Player | null) => {
    return dispatch({ type: 'setWinner', payload });
  }, []);
  const setTheme = useCallback((payload: Theme) => {
    return dispatch({ type: 'setTheme', payload });
  }, []);
  const setComputer = useCallback((payload: boolean) => {
    return dispatch({ type: 'setComputer', payload });
  }, []);
  const setChaos = useCallback((payload: boolean) => {
    return dispatch({ type: 'setChaos', payload });
  }, []);
  const setDifficulty = useCallback((payload: boolean) => {
    return dispatch({ type: 'setDifficulty', payload });
  }, []);
  const setWinningCombo = useCallback((payload: WinningCombination) => {
    return dispatch({ type: 'setWinningCombo', payload });
  }, []);
  const setScore = useCallback((payload: Score) => {
    return dispatch({ type: 'setScore', payload });
  }, []);
  const setLoading = useCallback((payload: boolean) => {
    return dispatch({ type: 'setLoading', payload });
  }, []);
  const setSound = useCallback((payload: boolean) => {
    return dispatch({ type: 'setSound', payload });
  }, []);
  const setIndex = useCallback((payload: number) => {
    return dispatch({ type: 'setIndex', payload });
  }, []);
  const setInfinity = useCallback((payload: boolean) => {
    return dispatch({ type: 'setInfinity', payload });
  }, []);
  return (
    <GameContextState.Provider value={state}>
      <GameContextDispatch.Provider
        value={{
          dispatch,
          setPlayer,
          setCells,
          setWinner,
          setComputer,
          setTheme,
          setChosenPlayer,
          setDifficulty,
          setChaos,
          setWinningCombo,
          setScore,
          setLoading,
          setSound,
          setIndex,
          setInfinity,
        }}
      >
        {children}
      </GameContextDispatch.Provider>
    </GameContextState.Provider>
  );
}
