import { useCallback, useEffect } from 'react';
import { useGameState } from './useGameState';

let selected: HTMLAudioElement,
  hover: HTMLAudioElement,
  draw: HTMLAudioElement,
  win: HTMLAudioElement;

export default function useSound() {
  const { isUserInteracted } = useGameState();
  const loadAudio = () => {
    selected = new Audio('./selected.mp3');
    hover = new Audio('./hover.mp3');
    draw = new Audio('./draw.mp3');
    win = new Audio('./win.mp3');
  };
  const usePlay = (sound: HTMLAudioElement) => {
    return () => {
      if (!isUserInteracted) return;
      if (sound) {
        sound.currentTime = 0;
        sound.play();
      }
    };
  };
  const hoverSound = usePlay(hover);
  const selectedSound = usePlay(selected);
  const drawSound = usePlay(draw);
  const winSound = usePlay(win);
  return { hoverSound, selectedSound, drawSound, winSound, loadAudio };
}
