import { useGameDispatch } from '@/hooks/useGameDispatch';
import { useGameState } from '@/hooks/useGameState';
import useSound from '@/hooks/useSound';
import { AudioRef } from '@/types/gameTypes';
import { useRef } from 'react';
import SoundOff from '../icons/SoundOff';
import SoundOn from '../icons/SoundOn';
import Button from '../Button';

export default function SoundButton() {
  const { isSoundOn, isUserInteracted } = useGameState();
  const { setSound } = useGameDispatch();
  const music = useRef<AudioRef>(null);
  function handleSound() {
    if (!isUserInteracted) return;
    setSound(!isSoundOn);
    if (!music.current) {
      music.current = new Audio('./music.mp3');
      music.current.loop = true;
    }
    if (!isSoundOn) return music.current.play();
    music.current.pause();
  }
  return (
    <Button
      aria-label={`Turn music ${isSoundOn ? 'off' : 'on'}`}
      onClick={handleSound}
      data-testid='music-button'
    >
      {isSoundOn ? <SoundOn /> : <SoundOff />}
    </Button>
  );
}
