import { GameContextDispatch } from '@/context/contexts';
import { useContext } from 'react';

export function useGameDispatch() {
  const context = useContext(GameContextDispatch);
  if (!context) throw new Error('Context used outside of GameContextProvider');
  return context;
}
