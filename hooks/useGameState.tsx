import { GameContextState } from '@/context/contexts';
import { useContext } from 'react';

export function useGameState() {
  const context = useContext(GameContextState);
  if (!context) throw new Error('Context used outside of GameContextProvider');
  return context;
}
