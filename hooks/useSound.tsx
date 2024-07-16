import { AudioRef } from '@/types/gameTypes';
import { useCallback, useRef } from 'react';
import { useGameState } from './useGameState';

export default function useSound() {
  const { isUserInteracted } = useGameState();
  const sfxHover = useRef<AudioRef>(null);
  const sfxSelected = useRef<AudioRef>(null);

  const handleHoverSound = useCallback(() => {
    if (!isUserInteracted) return;
    if (!sfxHover.current) sfxHover.current = new Audio('./hover.mp3');
    sfxHover.current.currentTime = 0;
    sfxHover.current.play();
  }, [isUserInteracted]);

  const handleSelectedSound = useCallback(() => {
    if (!isUserInteracted) return;
    if (!sfxSelected.current) sfxSelected.current = new Audio('./selected.mp3');
    sfxSelected.current.currentTime = 0;
    sfxSelected.current.play();
  }, [isUserInteracted]);

  return { handleHoverSound, handleSelectedSound };
}
