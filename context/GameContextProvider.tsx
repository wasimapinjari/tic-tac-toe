'use client';

import { useReducer } from 'react';
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
  chaosMode: false,
  theme: null,
  winningCombination: [-1, -1, -1],
  score: initialScore,
  isLoading: false,
  isSoundOn: false,
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
        chaosMode: payload,
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
    default:
      throw new Error('Error, Invalid Action: ' + type);
  }
}

export default function GameContextProvider({ children }: Children) {
  const [state, dispatch] = useReducer(reducer, initialState);
  function setChosenPlayer(payload: Player) {
    return dispatch({ type: 'setChosenPlayer', payload });
  }
  function setPlayer(payload: Player) {
    return dispatch({ type: 'setPlayer', payload });
  }
  function setCells(payload: Cells) {
    return dispatch({ type: 'setCells', payload });
  }
  function setWinner(payload: Player | null) {
    return dispatch({ type: 'setWinner', payload });
  }
  function setTheme(payload: Theme) {
    return dispatch({ type: 'setTheme', payload });
  }
  function setComputer(payload: boolean) {
    return dispatch({ type: 'setComputer', payload });
  }
  function setChaos(payload: boolean) {
    return dispatch({ type: 'setChaos', payload });
  }
  function setDifficulty(payload: boolean) {
    return dispatch({ type: 'setDifficulty', payload });
  }
  function setWinningCombo(payload: WinningCombination) {
    return dispatch({ type: 'setWinningCombo', payload });
  }
  function setScore(payload: Score) {
    return dispatch({ type: 'setScore', payload });
  }
  function setLoading(payload: boolean) {
    return dispatch({ type: 'setLoading', payload });
  }
  function setSound(payload: boolean) {
    return dispatch({ type: 'setSound', payload });
  }
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
        }}
      >
        {children}
      </GameContextDispatch.Provider>
    </GameContextState.Provider>
  );
}
