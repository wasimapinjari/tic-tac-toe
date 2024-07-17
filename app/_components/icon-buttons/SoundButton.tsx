import { useGameDispatch } from '@/hooks/useGameDispatch';
import { useGameState } from '@/hooks/useGameState';
import { useState } from 'react';
import Button from '../Button';
import SoundOff from '../icons/SoundOff';
import SoundOn from '../icons/SoundOn';

let music: HTMLAudioElement;

export default function SoundButton() {
  const { isSoundOn } = useGameState();
  const { setSound } = useGameDispatch();
  const [isLoading, setIsLoading] = useState(false);
  function handleSound() {
    if (!music) {
      setIsLoading(true);
      music = new Audio('./music.mp3');
      music.addEventListener('canplaythrough', () =>
        setTimeout(() => setIsLoading(false))
      );
      music.loop = true;
    }
    setSound(!isSoundOn);
    if (!isSoundOn) return music.play();
    music.pause();
  }
  return (
    <Button
      aria-label={`Turn music ${isSoundOn ? 'off' : 'on'}`}
      onClick={handleSound}
      data-testid='music-button'
    >
      {isLoading ? (
        <div className='spinner' />
      ) : isSoundOn ? (
        <SoundOn />
      ) : (
        <SoundOff />
      )}
    </Button>
  );
}
