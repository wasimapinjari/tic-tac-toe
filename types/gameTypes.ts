import {
  ComponentPropsWithoutRef,
  Dispatch,
  JSXElementConstructor,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  SetStateAction,
} from 'react';

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
export type History = {
  current: number;
  timeline: Cells[];
};

export type InitialState = {
  timeline: Cells[];
  current: number;
  cells: Cells;
  theme: null | Theme;
  winningCombination: WinningCombination;
  score: Score;
  infinityIndex: number;
} & {
  [key in 'currentPlayer' | 'chosenPlayer']: Player;
} & {
  [key in 'winner' | 'currentWinner']: Player | null;
} & {
  [key in
    | 'isComputer'
    | 'isGameEasy'
    | 'isChaosMode'
    | 'isLoading'
    | 'isSoundOn'
    | 'isOptionsHidden'
    | 'isInfinityMode'
    | 'isUserInteracted']: boolean;
};

export type State = (InitialState & { state: InitialState }) | null;

type BooleanActionNames =
  | 'setComputer'
  | 'setDifficulty'
  | 'setChaos'
  | 'setLoading'
  | 'setSound'
  | 'setInfinity'
  | 'setHideOptions'
  | 'setInteraction';

type NumberActionNames = 'setCurrent' | 'setIndex';

export type ReducerActions =
  | {
      type: 'setTimeline';
      payload: Cells[];
    }
  | {
      type: 'setCurrent';
      payload: number;
    }
  | {
      type: 'setChosenPlayer' | 'setPlayer';
      payload: Player;
    }
  | {
      type: 'setWinner' | 'setCurrentWinner';
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
      type: BooleanActionNames;
      payload: boolean;
    }
  | {
      type: NumberActionNames;
      payload: number;
    };

export type PlayerActions = {
  [key in 'setPlayer' | 'setChosenPlayer']: (payload: Player) => void;
};
export type BooleanActions = {
  [key in BooleanActionNames]: (payload: boolean) => void;
};
export type NumberActions = {
  [key in NumberActionNames]: (payload: number) => void;
};
export type DispatchActions = {
  dispatch: (payload: ReducerActions) => void;
  setTimeline: (payload: Cells[]) => void;
  setCurrent: (payload: number) => void;
  setIndex: (payload: number) => void;
  setTheme: (payload: Theme) => void;
  setCells: (payload: Cells) => void;
  setWinner: (payload: Player | null) => void;
  setCurrentWinner: (payload: Player | null) => void;
  setWinningCombo: (payload: WinningCombination) => void;
  setScore: (payload: Score) => void;
} & PlayerActions &
  BooleanActions &
  NumberActions;

export type Option = {
  heading: string;
  setHeading: Dispatch<SetStateAction<string>>;
};

export type OptionButton = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  active: boolean;
  ariaLabel: string;
  key?: string | number;
} & ButtonProps;

export type Modal = ModalDispatchActions & { state: ModalInitialState };

export type ModalInitialState = {
  isOpen: boolean;
  current: number;
};

export type ModalReducerActions =
  | {
      type: 'setOpen';
      payload: boolean;
    }
  | {
      type: 'setCurrent';
      payload: number;
    };

export type ModalDispatchActions = {
  setOpen: (payload: boolean) => void;
  setCurrent: (payload: number) => void;
};

export type ModalIcon = { ariaLabel: string } & Children;

export type ModalContent = { tabName: string } & Children;

export type ModalContents = {
  key: string;
  tabName: string;
  jsx: ReactElement<any, string | JSXElementConstructor<any>>;
};

// export type Function = (...args: unknown[]) => unknown;

export type CellFunction = {
  index: number;
  cellContent: Player | null;
  setCellsContent: (content: Player) => void;
};

export type AudioRef = HTMLAudioElement | null;

export type PlayWithOptions = 'Friends' | 'Computer';

export type ButtonProps = ComponentPropsWithoutRef<'button'>;

export type KeyEvent = globalThis.KeyboardEvent;

export type InteractionEvent = MouseEvent | KeyEvent | TouchEvent;
