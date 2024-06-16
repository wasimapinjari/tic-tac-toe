import { DispatchActions, InitialState } from '@/types/gameTypes';
import { createContext } from 'react';

export const GameContextState = createContext<InitialState | null>(null);
export const GameContextDispatch = createContext<DispatchActions | null>(null);
