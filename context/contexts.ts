import { DispatchActions, Modal, Option, State } from '@/types/gameTypes';
import { createContext } from 'react';

export const GameContextState = createContext<State | null>(null);
export const GameContextDispatch = createContext<DispatchActions | null>(null);
export const OptionContext = createContext<Option | null>(null);
export const ModalContext = createContext<Modal | null>(null);
