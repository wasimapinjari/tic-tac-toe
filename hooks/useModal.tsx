import { ModalContext } from '@/context/contexts';
import { useContext } from 'react';

export default function useModal() {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error('Context used outside of OptionContextProvider');
  return context;
}
