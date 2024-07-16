import {
  DispatchActions,
  InitialState,
  ModalDispatchActions,
  ModalReducerActions,
  ModalState,
  OptionState,
} from '@/types/gameTypes';
import { createContext } from 'react';

export const GameContextState = createContext<
  (InitialState & { state: InitialState }) | null
>(null);
export const GameContextDispatch = createContext<DispatchActions | null>(null);
export const OptionContext = createContext<OptionState | null>(null);
export const ModalContext = createContext<
  (ModalDispatchActions & { state: ModalState }) | null
>(null);
