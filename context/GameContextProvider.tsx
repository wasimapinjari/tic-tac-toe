'use client';

import useActions from '@/hooks/useActions';
import { Children, InitialState, ReducerActions } from '@/types/gameTypes';
import { insertProperties } from '@/utils/helperFunctions';
import { useReducer } from 'react';
import { GameContextDispatch, GameContextState } from './contexts';

export const initialCells: null[] = Array(9).fill(null);

export const initialScore = {
  X: 0,
  O: 0,
};

export const initialState: InitialState = {
  timeline: [],
  current: 0,
  cells: initialCells,
  currentPlayer: 'X',
  winner: null,
  currentWinner: null,
  chosenPlayer: 'X',
  isComputer: true,
  isGameEasy: true,
  isChaosMode: false,
  isInfinityMode: false,
  theme: null,
  winningCombination: [-1, -1, -1],
  score: initialScore,
  isLoading: false,
  isSoundOn: false,
  isOptionsHidden: false,
  infinityIndex: -1,
  isUserInteracted: false,
};

function reducer(state: InitialState, action: ReducerActions): InitialState {
  const { type, payload } = action;
  const newState = insertProperties(state, payload);
  switch (type) {
    case 'setTimeline': {
      return newState('timeline');
    }
    case 'setCurrent': {
      return newState('current');
    }
    case 'setChosenPlayer': {
      return newState('chosenPlayer');
    }
    case 'setPlayer': {
      return newState('currentPlayer');
    }
    case 'setCells': {
      return newState('cells');
    }
    case 'setWinner': {
      return newState('winner');
    }
    case 'setCurrentWinner': {
      return newState('currentWinner');
    }
    case 'setTheme': {
      return newState('theme');
    }
    case 'setComputer': {
      return newState('isComputer');
    }
    case 'setChaos': {
      return newState('isChaosMode');
    }
    case 'setDifficulty': {
      return newState('isGameEasy');
    }
    case 'setWinningCombo': {
      return newState('winningCombination');
    }
    case 'setScore': {
      return newState('score');
    }
    case 'setLoading': {
      return newState('isLoading');
    }
    case 'setSound': {
      return newState('isSoundOn');
    }
    case 'setIndex': {
      return newState('infinityIndex');
    }
    case 'setInfinity': {
      return newState('isInfinityMode');
    }
    case 'setHideOptions': {
      return newState('isOptionsHidden');
    }
    case 'setInteraction': {
      return newState('isUserInteracted');
    }
    default:
      throw new Error('Error, Invalid Action: ' + type);
  }
}

export default function GameContextProvider({ children }: Children) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const action = useActions<
    ReducerActions,
    ReducerActions['type'],
    ReducerActions['payload']
  >(dispatch);

  const setChosenPlayer = action('setChosenPlayer');
  const setPlayer = action('setPlayer');
  const setCells = action('setCells');
  const setWinner = action('setWinner');
  const setCurrentWinner = action('setCurrentWinner');
  const setTheme = action('setTheme');
  const setComputer = action('setComputer');
  const setChaos = action('setChaos');
  const setDifficulty = action('setDifficulty');
  const setWinningCombo = action('setWinningCombo');
  const setScore = action('setScore');
  const setLoading = action('setLoading');
  const setSound = action('setSound');
  const setIndex = action('setIndex');
  const setInfinity = action('setInfinity');
  const setHideOptions = action('setHideOptions');
  const setInteraction = action('setInteraction');
  const setTimeline = action('setTimeline');
  const setCurrent = action('setCurrent');

  return (
    <GameContextState.Provider value={{ state, ...state }}>
      <GameContextDispatch.Provider
        value={{
          dispatch,
          setTimeline,
          setCurrent,
          setPlayer,
          setCells,
          setWinner,
          setCurrentWinner,
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
          setHideOptions,
          setInteraction,
        }}
      >
        {children}
      </GameContextDispatch.Provider>
    </GameContextState.Provider>
  );
}
