'use client';

import { useGameDispatch } from '@/hooks/useGameDispatch';
import { useGameState } from '@/hooks/useGameState';
import Image from 'next/image';
import SoundOff from './SoundOff';
import SoundOn from './SoundOn';

export default function MenuBox() {
  const {
    setTheme,
    setDifficulty,
    setComputer,
    setChosenPlayer,
    setChaos,
    setSound,
  } = useGameDispatch();
  const state = useGameState();
  function handleSound() {
    setSound(!state.isSoundOn);
    // const music = new Audio('./untitled.mp3');
    // music.loop = true;
    // if (state.isSoundOn) music.play();
    // if (!state.isSoundOn) music.paused;
  }
  // console.log(state);
  return (
    <>
      {/* {state.isSoundOn ? (
        <SoundOn handleSound={handleSound} />
      ) : (
        <SoundOff handleSound={handleSound} />
      )} */}
      <div className='menu-box'>
        <div>
          <h2>Choose Player</h2>
          <div className='button-group'>
            <button
              onClick={() => setChosenPlayer('X')}
              className={
                'button left' + (state.chosenPlayer === 'X' ? ' active' : '')
              }
            >
              X
            </button>
            <button
              onClick={() => setChosenPlayer('O')}
              className={
                'button right' + (state.chosenPlayer === 'O' ? ' active' : '')
              }
            >
              O
            </button>
          </div>
        </div>

        <div>
          <h2>Play With</h2>
          <div className='button-group'>
            <button
              onClick={() => setComputer(false)}
              className={'button left' + (!state.isComputer ? ' active' : '')}
            >
              Friends
            </button>
            <button
              onClick={() => setComputer(true)}
              className={'button right' + (state.isComputer ? ' active' : '')}
            >
              Computer
            </button>
          </div>
        </div>

        <div>
          <h2>Difficulty</h2>
          <div className='button-group'>
            <button
              onClick={() => setDifficulty(true)}
              className={'button left' + (state.isGameEasy ? ' active' : '')}
            >
              Easy
            </button>
            <button
              onClick={() => setDifficulty(false)}
              className={'button right' + (!state.isGameEasy ? ' active' : '')}
            >
              Hard
            </button>
          </div>
        </div>

        <div>
          <h2>Chaos Mode</h2>
          <div className='button-group'>
            <button
              onClick={() => setChaos(true)}
              className={'button left' + (state.chaosMode ? ' active' : '')}
            >
              Enable
            </button>
            <button
              onClick={() => setChaos(false)}
              className={'button right' + (!state.chaosMode ? ' active' : '')}
            >
              Disable
            </button>
          </div>
        </div>

        <div>
          <h2>Dark Mode</h2>
          <div className='button-group'>
            <button
              onClick={() => setTheme('dark')}
              className={
                'button left' + (state.theme === 'dark' ? ' active' : '')
              }
            >
              Enable
            </button>
            <button
              onClick={() => setTheme('light')}
              className={
                'button right' + (state.theme === 'light' ? ' active' : '')
              }
            >
              Disable
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
