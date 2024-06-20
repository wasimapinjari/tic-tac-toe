'use client';

import { useGameDispatch } from '@/hooks/useGameDispatch';
import { useGameState } from '@/hooks/useGameState';
import SoundOff from './SoundOff';
import SoundOn from './SoundOn';
import { useRef } from 'react';

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
  const music = useRef<HTMLAudioElement | null>(null);
  const sfxHover = useRef<HTMLAudioElement | null>(null);
  const sfxSelected = useRef<HTMLAudioElement | null>(null);
  function handleSound() {
    setSound(!state.isSoundOn);
    if (!music.current) {
      music.current = new Audio('./music.mp3');
      music.current.loop = true;
    }
    if (!state.isSoundOn) music.current.play();
    if (state.isSoundOn) music.current.pause();
  }
  function handleHover() {
    if (!sfxHover.current) sfxHover.current = new Audio('./hover.mp3');
    sfxHover.current.currentTime = 0;
    sfxHover.current.play();
  }
  function handleSelected() {
    if (!sfxSelected.current) sfxSelected.current = new Audio('./selected.mp3');
    sfxSelected.current.currentTime = 0;
    sfxSelected.current.play();
  }
  return (
    <>
      {state.isSoundOn ? (
        <SoundOn handleSound={handleSound} />
      ) : (
        <SoundOff handleSound={handleSound} />
      )}
      <div className='menu-box'>
        <div>
          <h2>Choose Player</h2>
          <div className='button-group'>
            <button
              onMouseEnter={handleHover}
              onClick={() => {
                handleSelected();
                setChosenPlayer('X');
              }}
              className={
                'button left' + (state.chosenPlayer === 'X' ? ' active' : '')
              }
            >
              X
            </button>
            <button
              onMouseEnter={handleHover}
              onClick={() => {
                handleSelected();
                setChosenPlayer('O');
              }}
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
              onMouseEnter={handleHover}
              onClick={() => {
                handleSelected();
                setComputer(false);
              }}
              className={'button left' + (!state.isComputer ? ' active' : '')}
            >
              Friends
            </button>
            <button
              onMouseEnter={handleHover}
              onClick={() => {
                handleSelected();
                setComputer(true);
              }}
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
              onMouseEnter={handleHover}
              onClick={() => {
                handleSelected();
                setDifficulty(true);
              }}
              className={'button left' + (state.isGameEasy ? ' active' : '')}
            >
              Easy
            </button>
            <button
              onMouseEnter={handleHover}
              onClick={() => {
                handleSelected();
                setDifficulty(false);
              }}
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
              onMouseEnter={handleHover}
              onClick={() => {
                handleSelected();
                setChaos(true);
              }}
              className={'button left' + (state.chaosMode ? ' active' : '')}
            >
              Enable
            </button>
            <button
              onMouseEnter={handleHover}
              onClick={() => {
                handleSelected();
                setChaos(false);
              }}
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
              onMouseEnter={handleHover}
              onClick={() => {
                handleSelected();
                setTheme('dark');
              }}
              className={
                'button left' + (state.theme === 'dark' ? ' active' : '')
              }
            >
              Enable
            </button>
            <button
              onMouseEnter={handleHover}
              onClick={() => {
                handleSelected();
                setTheme('light');
              }}
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
