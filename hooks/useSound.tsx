import { useCallback } from 'react';
import { useGameState } from './useGameState';

let selected: HTMLAudioElement,
  hover: HTMLAudioElement,
  draw: HTMLAudioElement,
  win: HTMLAudioElement;

const usePlay = (sound: HTMLAudioElement) => {
  const { isUserInteracted } = useGameState();
  return useCallback(() => {
    if (!isUserInteracted) return;
    if (sound) {
      sound.currentTime = 0;
      sound.play();
    }
  }, [isUserInteracted, sound]);
};

export default function useSound() {
  const loadAudio = () => {
    selected = new Audio('./sounds/selected.mp3');
    hover = new Audio('./sounds/hover.mp3');
    draw = new Audio('./sounds/draw.mp3');
    win = new Audio('./sounds/win.mp3');
  };
  const hoverSound = usePlay(hover);
  const selectedSound = usePlay(selected);
  const drawSound = usePlay(draw);
  const winSound = usePlay(win);
  return { loadAudio, hoverSound, selectedSound, drawSound, winSound };
}
