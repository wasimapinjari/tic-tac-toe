'use client';

import { useGameDispatch } from '@/hooks/useGameDispatch';
import { useGameState } from '@/hooks/useGameState';
import SoundOff from './SoundOff';
import SoundOn from './SoundOn';
import {
  MouseEvent,
  MouseEventHandler,
  SyntheticEvent,
  useEffect,
  useRef,
} from 'react';
import { AudioRef, Player, Theme } from '@/types/gameTypes';
import Moon from './Moon';
import Sun from './Sun';
import { initialCells } from '@/context/GameContextProvider';
import {
  arrayItemPlaceIndexes,
  randomArrayItem,
} from '@/utils/helperFunctions';

export default function MenuBox() {
  const {
    setTheme,
    setDifficulty,
    setComputer,
    setChosenPlayer,
    setChaos,
    setSound,
    setPlayer,
    setInfinity,
    setCells,
    setIndex,
    setWinningCombo,
    setWinner,
  } = useGameDispatch();

  const state = useGameState();
  const music = useRef<AudioRef>(null);
  const sfxHover = useRef<AudioRef>(null);
  const sfxSelected = useRef<AudioRef>(null);
  const isUserInteracted = useRef(false);
  useEffect(() => {
    function handleInteraction() {
      isUserInteracted.current = true;
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    }
    document.addEventListener('click', handleInteraction);
    document.addEventListener('keydown', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);
  }, []);

  function reset() {
    if (state.isLoading) return;
    handleSelectedSound();
    setCells(initialCells);
    setPlayer(state.chosenPlayer);
    setWinner(null);
    setWinningCombo([-1, -1, -1]);
    if (state.infinityIndex !== -1) {
      const infinityTileSpan = document.querySelector(
        `[data-tile="${state.infinityIndex}"] span`
      ) as HTMLDivElement;
      infinityTileSpan.style.color = 'inherit';
      infinityTileSpan.style.textShadow = 'inherit';
      infinityTileSpan.style.animation = 'none';
    }
    setIndex(-1);
  }

  function handleSound() {
    setSound(!state.isSoundOn);
    if (!music.current) {
      music.current = new Audio('./music.mp3');
      music.current.loop = true;
    }
    if (!state.isSoundOn) return music.current.play();
    music.current.pause();
  }
  function handleTheme(theme: Theme) {
    setTheme(theme);
    handleSelectedSound();
  }

  function handleHoverSound() {
    if (!isUserInteracted.current) return;
    if (!sfxHover.current) sfxHover.current = new Audio('./hover.mp3');
    sfxHover.current.currentTime = 0;
    sfxHover.current.play();
  }
  function handleSelectedSound() {
    if (!sfxSelected.current) sfxSelected.current = new Audio('./selected.mp3');
    sfxSelected.current.currentTime = 0;
    sfxSelected.current.play();
  }

  function handleClickReset<T>(clickFunction: (payload: T) => void) {
    return function (payload: T) {
      return function () {
        handleSelectedSound();
        clickFunction(payload);
        reset();
      };
    };
  }

  function handleClick<T>(clickFunction: (payload: T) => void) {
    return function (payload: T) {
      return function () {
        handleSelectedSound();
        clickFunction(payload);
      };
    };
  }
  function handleClick2<T>(clickFunction: (payload: T) => void) {
    return function (payload: T) {
      return function <U>(clickFunction2: (payload: U) => void) {
        return function (payload2: U) {
          return function () {
            handleSelectedSound();
            clickFunction(payload);
            clickFunction2(payload2);
          };
        };
      };
    };
  }

  function handleClickResetChoice<T>(clickFunction: (payload: T) => void) {
    return function (payload: T) {
      return function <U>(clickFunction2: (payload: U) => void) {
        return function (payload2: U) {
          return function (e: SyntheticEvent<HTMLButtonElement>) {
            handleSelectedSound();
            clickFunction(payload);
            clickFunction2(payload2);
            console.log(state);
            const chosenPlayer = (e.target as HTMLButtonElement)
              .textContent as Player;
            if (state.winner || state.chosenPlayer === chosenPlayer) return;
            if (state.isInfinityMode) {
              if (state.infinityIndex !== -1) {
                let infinityIndex;
                let color = state.theme === 'dark' ? 'lightgreen' : 'green';
                if (state.cells[state.infinityIndex] !== chosenPlayer) {
                  const infinityTileSpan = document.querySelector(
                    `[data-tile="${state.infinityIndex}"] span`
                  ) as HTMLDivElement;
                  infinityTileSpan.style.color = 'inherit';
                  infinityTileSpan.style.textShadow = 'inherit';
                  infinityTileSpan.style.animation = 'none';
                  const playerPositions = arrayItemPlaceIndexes(
                    state.cells,
                    chosenPlayer
                  );
                  infinityIndex =
                    playerPositions[randomArrayItem(playerPositions)];
                  setIndex(infinityIndex);
                }
                infinityIndex = infinityIndex || state.infinityIndex;
                const infinityTileSpan2 = document.querySelector(
                  `[data-tile="${infinityIndex}"] span`
                ) as HTMLDivElement;
                document.documentElement.style.setProperty(
                  '--infinity-color',
                  color
                );
                infinityTileSpan2.style.color = color;
                infinityTileSpan2.style.textShadow = `0 0 1rem ${color}`;
                infinityTileSpan2.style.animation =
                  'tile-span .5s alternate-reverse infinite ease-in-out, icon-intro 1s ease-out';
              }
            }
          };
        };
      };
    };
  }

  function handleClickResetPlayWith<T>(clickFunction: (payload: T) => void) {
    return function (payload: T) {
      return function (e: SyntheticEvent<HTMLButtonElement>) {
        handleSelectedSound();
        clickFunction(payload);
        const playWith = {
          Friends: false,
          Computer: true,
        };

        const chosenPlayMode = (e.target as HTMLButtonElement).textContent as
          | 'Friends'
          | 'Computer';

        if (state.winner || state.isComputer === playWith[chosenPlayMode])
          return;
        if (state.isInfinityMode) {
          if (state.infinityIndex !== -1) {
            let infinityIndex;
            let color = state.theme === 'dark' ? 'lightgreen' : 'green';
            if (state.cells[state.infinityIndex] !== state.chosenPlayer) {
              const infinityTileSpan = document.querySelector(
                `[data-tile="${state.infinityIndex}"] span`
              ) as HTMLDivElement;
              infinityTileSpan.style.color = 'inherit';
              infinityTileSpan.style.textShadow = 'inherit';
              infinityTileSpan.style.animation = 'none';
              const playerPositions = arrayItemPlaceIndexes(
                state.cells,
                state.chosenPlayer
              );
              infinityIndex = playerPositions[randomArrayItem(playerPositions)];
              setIndex(infinityIndex);
            }
            infinityIndex = infinityIndex || state.infinityIndex;
            const infinityTileSpan2 = document.querySelector(
              `[data-tile="${infinityIndex}"] span`
            ) as HTMLDivElement;
            document.documentElement.style.setProperty(
              '--infinity-color',
              color
            );
            infinityTileSpan2.style.color = color;
            infinityTileSpan2.style.textShadow = `0 0 1rem ${color}`;
            infinityTileSpan2.style.animation =
              'tile-span .5s alternate-reverse infinite ease-in-out, icon-intro 1s ease-out';
          }
        }
      };
    };
  }

  function handleEnableChaos() {
    handleClick2(setChaos)(true)(setInfinity)(false)();
    reset();
  }

  function handleEnableInfinity() {
    handleClick2(setInfinity)(true)(setChaos)(false)();
    reset();
  }

  const soundProps = {
    handleSound,
    handleHoverSound,
  };
  const themeProps = {
    handleTheme,
    handleHoverSound,
  };
  return (
    <>
      <aside className='menu-box'>
        <div className='icon-container'>
          {state.theme === 'light' ? (
            <Sun {...themeProps} />
          ) : (
            <Moon {...themeProps} />
          )}
          {state.isSoundOn ? (
            <SoundOn {...soundProps} />
          ) : (
            <SoundOff {...soundProps} />
          )}
        </div>
        <div>
          <h2 id='choose-player-label'>Choose Player</h2>
          <div
            className='button-group'
            aria-labelledby='choose-player-label'
            role='group'
          >
            <button
              type='button'
              onMouseEnter={handleHoverSound}
              onClick={handleClickResetChoice(setChosenPlayer)('X')(setPlayer)(
                'X'
              )}
              className={
                'button left' + (state.chosenPlayer === 'X' ? ' active' : '')
              }
              aria-pressed={state.chosenPlayer === 'X'}
              aria-label='Choose X as a player'
            >
              X
            </button>
            <button
              type='button'
              onMouseEnter={handleHoverSound}
              onClick={handleClickResetChoice(setChosenPlayer)('O')(setPlayer)(
                'O'
              )}
              className={
                'button right' + (state.chosenPlayer === 'O' ? ' active' : '')
              }
              aria-pressed={state.chosenPlayer === 'O'}
              aria-label='Choose O as a player'
            >
              O
            </button>
          </div>
        </div>

        <div>
          <h2 id='play-with-label'>Play With</h2>
          <div
            className='button-group'
            aria-labelledby='play-with-label'
            role='group'
          >
            <button
              type='button'
              onMouseEnter={handleHoverSound}
              onClick={handleClickResetPlayWith(setComputer)(false)}
              className={'button left' + (!state.isComputer ? ' active' : '')}
              aria-pressed={!state.isComputer}
              aria-label='Play tic-tac-toe with friends'
            >
              Friends
            </button>
            <button
              type='button'
              onMouseEnter={handleHoverSound}
              onClick={handleClickResetPlayWith(setComputer)(true)}
              className={'button right' + (state.isComputer ? ' active' : '')}
              aria-pressed={state.isComputer}
              aria-label='Play tic-tac-toe with computer'
            >
              Computer
            </button>
          </div>
        </div>

        <div>
          <h2 id='difficulty-label'>Difficulty</h2>
          <div
            className='button-group'
            aria-labelledby='difficulty-label'
            role='group'
          >
            <button
              type='button'
              onMouseEnter={handleHoverSound}
              onClick={handleClick(setDifficulty)(true)}
              className={'button left' + (state.isGameEasy ? ' active' : '')}
              aria-pressed={state.isGameEasy}
              aria-label='Set tic-tac-toe game difficulty to easy'
            >
              Easy
            </button>
            <button
              type='button'
              onMouseEnter={handleHoverSound}
              onClick={handleClick(setDifficulty)(false)}
              className={'button right' + (!state.isGameEasy ? ' active' : '')}
              aria-pressed={!state.isGameEasy}
              aria-label='Set tic-tac-toe game difficulty to hard'
            >
              Hard
            </button>
          </div>
        </div>

        <div>
          <h2 id='Infinity-mode-label'>Infinity Mode</h2>
          <div
            className='button-group'
            aria-labelledby='Infinity-mode-label'
            role='group'
          >
            <button
              type='button'
              onMouseEnter={handleHoverSound}
              onClick={handleEnableInfinity}
              className={
                'button left' + (state.isInfinityMode ? ' active' : '')
              }
              aria-pressed={state.isInfinityMode}
              aria-label='Enable tic-tac-toe Infinity mode'
            >
              Enable
            </button>
            <button
              type='button'
              onMouseEnter={handleHoverSound}
              onClick={handleClickReset(setInfinity)(false)}
              className={
                'button right' + (!state.isInfinityMode ? ' active' : '')
              }
              aria-pressed={!state.isInfinityMode}
              aria-label='Disable tic-tac-toe Infinity mode'
            >
              Disable
            </button>
          </div>
        </div>

        <div>
          <h2 id='chaos-mode-label'>Chaos Mode</h2>
          <div
            className='button-group'
            aria-labelledby='chaos-mode-label'
            role='group'
          >
            <button
              type='button'
              onMouseEnter={handleHoverSound}
              onClick={handleEnableChaos}
              className={'button left' + (state.isChaosMode ? ' active' : '')}
              aria-pressed={state.isChaosMode}
              aria-label='Enable tic-tac-toe chaos mode'
            >
              Enable
            </button>
            <button
              type='button'
              onMouseEnter={handleHoverSound}
              onClick={handleClickReset(setChaos)(false)}
              className={'button right' + (!state.isChaosMode ? ' active' : '')}
              aria-pressed={!state.isChaosMode}
              aria-label='Disable tic-tac-toe chaos mode'
            >
              Disable
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
