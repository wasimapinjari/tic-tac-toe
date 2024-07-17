import useClick from '@/hooks/useClick';
import { useGameDispatch } from '@/hooks/useGameDispatch';
import { useGameState } from '@/hooks/useGameState';
import useHelper from '@/hooks/useHelper';
import useSound from '@/hooks/useSound';
import { Cells, Player, PlayWithOptions } from '@/types/gameTypes';
import {
  arrayItemPlaceIndexes,
  infinityTransform,
  isArrayFilled,
  isArrayInfinity,
  randomArrayItem,
} from '@/utils/helperFunctions';
import { SyntheticEvent } from 'react';
import Option from './Option';

export default function GameOptions() {
  const {
    state,
    timeline,
    current,
    cells,
    winner,
    chosenPlayer,
    isComputer,
    isGameEasy,
    isChaosMode,
    isInfinityMode,
    theme,
    isLoading,
    infinityIndex,
    isOptionsHidden,
  } = useGameState();
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
    setTimeline,
    setIndex,
    setCurrent,
  } = useGameDispatch();
  const { $ } = useHelper();
  const { selectedSound } = useSound();
  const handleClick = useClick();

  function resetInfinity() {
    if (infinityIndex !== -1) {
      const infinityTileSpan = $(`[data-tile="${infinityIndex}"] span`);
      infinityTileSpan.classList.remove('infinity-span');
    }
    setIndex(-1);
  }

  function handleClick2<T>(clickFunction: (payload: T) => void) {
    return function (payload: T) {
      return function <U>(clickFunction2: (payload: U) => void) {
        return function (payload2: U) {
          return function () {
            selectedSound();
            clickFunction(payload);
            clickFunction2(payload2);
          };
        };
      };
    };
  }

  function resetInfinityMode(newChosenPlayer: Player = chosenPlayer) {
    if (isInfinityMode && infinityIndex !== -1) {
      let infinityIndexCurrent;
      let color = theme === 'dark' ? 'lightgreen' : 'green';
      if (cells[infinityIndex] !== newChosenPlayer) {
        const infinityTileSpan = $(`[data-tile="${infinityIndex}"] span`);
        infinityTileSpan.classList.remove('infinity-span');
        const playerPositions = arrayItemPlaceIndexes(cells, newChosenPlayer);
        infinityIndexCurrent = randomArrayItem(playerPositions);
        const infinityTileSpan2 = $(
          `[data-tile="${infinityIndexCurrent}"] span`
        );
        infinityTileSpan2.classList.add('infinity-span');
        setIndex(infinityIndexCurrent);
        setPlayer(newChosenPlayer);
      }
      $('.theme').style.setProperty('--infinity-color', color);
    }
  }

  function handleSelect<T>(clickFunction: (payload: T) => void) {
    return function (payload: T) {
      return function <U>(clickFunction2: (payload: U) => void) {
        return function (payload2: U) {
          return function (e: SyntheticEvent<HTMLButtonElement>) {
            selectedSound();
            clickFunction(payload);
            clickFunction2(payload2);
            const selectButtonText = (e.target as HTMLButtonElement)
              .textContent as Player;
            if (winner || chosenPlayer === selectButtonText) return;
            resetInfinityMode(selectButtonText);
          };
        };
      };
    };
  }

  function handlePlayWith<T>(clickFunction: (payload: T) => void) {
    return function (payload: T) {
      return function (e: SyntheticEvent<HTMLButtonElement>) {
        selectedSound();
        clickFunction(payload);
        const playWith = {
          Friends: false,
          Computer: true,
        };
        const selectButtonText = (e.target as HTMLButtonElement)
          .textContent as PlayWithOptions;
        if (winner || isComputer === playWith[selectButtonText]) return;
        resetInfinityMode();
      };
    };
  }

  function handleInfinity() {
    handleClick2(setInfinity)(true)(setChaos)(false)();
    if (!winner && !isArrayFilled(cells) && isArrayInfinity(cells)) {
      let color = theme === 'dark' ? 'lightgreen' : 'green';
      const { array, infinityIndex } = infinityTransform(cells, chosenPlayer);
      const infinityTileSpan = $(`[data-tile="${infinityIndex}"] span`);
      $('.theme').style.setProperty('--infinity-color', color);
      infinityTileSpan.classList.add('infinity-span');
      setCells(array);
      setTimeline([array]);
      setCurrent(0);
      setIndex(infinityIndex);
    }
  }

  function handleChaos() {
    handleClick2(setChaos)(true)(setInfinity)(false)();
    resetInfinity();
  }
  return (
    <section className={`game-options${isOptionsHidden ? ' hidden' : ''}`}>
      <Option>
        <Option.Heading>Select Player</Option.Heading>
        <Option.Buttons>
          <Option.Button
            onClick={handleSelect(setChosenPlayer)('X')(setPlayer)('X')}
            active={chosenPlayer === 'X'}
            ariaLabel='Choose X as a player'
            data-testid='player-x-button'
          >
            X
          </Option.Button>
          <Option.Button
            onClick={handleSelect(setChosenPlayer)('O')(setPlayer)('O')}
            active={chosenPlayer === 'O'}
            ariaLabel='Choose O as a player'
            data-testid='player-o-button'
          >
            O
          </Option.Button>
        </Option.Buttons>
      </Option>

      <Option>
        <Option.Heading>Play With</Option.Heading>
        <Option.Buttons>
          <Option.Button
            onClick={handlePlayWith(setComputer)(false)}
            active={!isComputer}
            ariaLabel='Play tic-tac-toe with friends'
            data-testid='friends-button'
          >
            Friends
          </Option.Button>
          <Option.Button
            onClick={handlePlayWith(setComputer)(true)}
            active={isComputer}
            ariaLabel='Play tic-tac-toe with computer'
            data-testid='computer-button'
          >
            Computer
          </Option.Button>
        </Option.Buttons>
      </Option>

      <Option>
        <Option.Heading>Difficulty</Option.Heading>
        <Option.Buttons>
          <Option.Button
            onClick={handleClick(setDifficulty)(true)}
            active={isGameEasy}
            ariaLabel='Set tic-tac-toe game difficulty to easy'
            data-testid='easy-button'
          >
            Easy
          </Option.Button>
          <Option.Button
            onClick={handleClick(setDifficulty)(false)}
            active={!isGameEasy}
            ariaLabel='Set tic-tac-toe game difficulty to hard'
            data-testid='hard-button'
          >
            Hard
          </Option.Button>
        </Option.Buttons>
      </Option>

      <Option>
        <Option.Heading>Infinity Mode</Option.Heading>
        <Option.Buttons>
          <Option.Button
            onClick={handleInfinity}
            active={isInfinityMode}
            ariaLabel='Enable tic-tac-toe Infinity mode'
            data-testid='enable-infinity-button'
          >
            Enable
          </Option.Button>
          <Option.Button
            onClick={handleClick(setInfinity)(false, resetInfinity)}
            active={!isInfinityMode}
            ariaLabel='Disable tic-tac-toe Infinity mode'
            data-testid='disable-infinity-button'
          >
            Disable
          </Option.Button>
        </Option.Buttons>
      </Option>

      <Option>
        <Option.Heading>Chaos Mode</Option.Heading>
        <Option.Buttons>
          <Option.Button
            onClick={handleChaos}
            active={isChaosMode}
            ariaLabel='Enable tic-tac-toe Chaos mode'
            data-testid='enable-chaos-button'
          >
            Enable
          </Option.Button>
          <Option.Button
            onClick={handleClick(setChaos)(false, resetInfinity)}
            active={!isChaosMode}
            ariaLabel='Disable tic-tac-toe Chaos mode'
            data-testid='disable-chaos-button'
          >
            Disable
          </Option.Button>
        </Option.Buttons>
      </Option>
    </section>
  );
}
