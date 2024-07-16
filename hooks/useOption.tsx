import { OptionContext } from '@/context/contexts';
import { useContext } from 'react';

export default function useOption() {
  const context = useContext(OptionContext);
  if (!context)
    throw new Error('Context used outside of OptionContextProvider');
  return context;
}
