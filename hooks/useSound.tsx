'use client';

import { useCallback } from 'react';
import { useGameState } from './useGameState';

const hover = new Audio('./hover.mp3');
const selected = new Audio('./selected.mp3');
const draw = new Audio('./draw.mp3');
const win = new Audio('./win.mp3');

function usePlay(sound: HTMLAudioElement) {
  const { isUserInteracted } = useGameState();
  return useCallback(() => {
    if (!isUserInteracted) return;
    if (sound) {
      sound.currentTime = 0;
      sound.play();
    }
  }, [isUserInteracted, sound]);
}

export default function useSound() {
  const hoverSound = usePlay(hover);
  const selectedSound = usePlay(selected);
  const drawSound = usePlay(draw);
  const winSound = usePlay(win);
  return { hoverSound, selectedSound, drawSound, winSound };
}
