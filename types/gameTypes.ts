import { MouseEventHandler, ReactNode } from 'react';

export type Children = {
  children: ReactNode;
};

export type Theme = 'dark' | 'light';
export type Player = 'X' | 'O';
export type Cells = (Player | null)[];
export type WinningCombination = [number, number, number];
export type Score = {
  X: number;
  O: number;
};
export type BooleanKeys = {
  [key in
    | 'isComputer'
    | 'isGameEasy'
    | 'chaosMode'
    | 'isLoading'
    | 'isSoundOn']: boolean;
};
export type InitialState = {
  currentPlayer: Player;
  chosenPlayer: Player;
  cells: Cells;
  winner: null | Player;
  theme: null | Theme;
  winningCombination: WinningCombination;
  score: Score;
} & BooleanKeys;

export type ReducerActions =
  | {
      type: 'setChosenPlayer' | 'setPlayer';
      payload: Player;
    }
  | {
      type: 'setWinner';
      payload: Player | null;
    }
  | {
      type: 'setCells';
      payload: Cells;
    }
  | {
      type: 'setTheme';
      payload: Theme;
    }
  | {
      type: 'setWinningCombo';
      payload: WinningCombination;
    }
  | {
      type: 'setScore';
      payload: Score;
    }
  | {
      type:
        | 'setComputer'
        | 'setChaos'
        | 'setDifficulty'
        | 'setLoading'
        | 'setSound';
      payload: boolean;
    };

export type PlayerActions = {
  [key in 'setPlayer' | 'setChosenPlayer']: (payload: Player) => void;
};
export type BooleanActions = {
  [key in
    | 'setComputer'
    | 'setDifficulty'
    | 'setChaos'
    | 'setLoading'
    | 'setSound']: (payload: boolean) => void;
};
export type DispatchActions = {
  dispatch: (value: ReducerActions) => void;
  setTheme: (payload: Theme) => void;
  setCells: (payload: Cells) => void;
  setWinner: (payload: Player | null) => void;
  setWinningCombo: (payload: WinningCombination) => void;
  setScore: (payload: Score) => void;
} & PlayerActions &
  BooleanActions;

export type CellFunction = {
  index: number;
  cellContent: Player | null;
  setCellsContent: (content: Player) => void;
};

export type HandleSound = {
  handleSound: MouseEventHandler<SVGSVGElement>;
};
