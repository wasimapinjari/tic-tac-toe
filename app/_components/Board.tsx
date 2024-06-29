'use client';

import { initialCells, initialScore } from '@/context/GameContextProvider';
import { AudioRef, Cells, Player, WinningCombination } from '@/types/gameTypes';
import {
  arrayItemPlaceIndexes,
  isArrayEmpty,
  isArrayFilled,
  isArrayFilledInfinity,
  isArrayFilledInfinityStrict,
  randomArrayItem,
  removeArrayItem,
} from '@/utils/helperFunctions';
import CreateGroup from './CreateGroup';
import { useEffect, useRef } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { useGameDispatch } from '@/hooks/useGameDispatch';

const winningLines: WinningCombination[] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function Board() {
  const state = useGameState();
  const {
    setPlayer,
    setCells,
    setWinner,
    setWinningCombo,
    setScore,
    setIndex,
  } = useGameDispatch();
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

  useEffect(() => {
    const numpadKeys: number[] = [7, 8, 9, 4, 5, 6, 1, 2, 3];
    const tiles: NodeListOf<HTMLDivElement> =
      document.querySelectorAll('[data-tile]');
    const resetButtons: NodeListOf<HTMLDivElement> =
      document.querySelectorAll('.reset');
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      tiles.forEach((tile, i) => {
        if (+e.key === numpadKeys[i]) tile.click();
      });
      if (e.key === 'Enter') resetButtons[0].click();
      if (e.key === 'Backspace') resetButtons[1].click();
    });
  }, []);

  useEffect(() => {
    const lines = document.querySelectorAll('[data-line]');
    const tiles = document.querySelectorAll('[data-tile]');
    const tilesArray: HTMLDivElement[] = [];
    let eachLine: HTMLDivElement;
    let eachTile: HTMLDivElement;
    for (let i = 0; i < lines.length; i++) {
      eachLine = lines[i] as HTMLDivElement;
      const lineArray = JSON.parse(eachLine.dataset.line as string).join('');
      if (state.winningCombination.join('') === lineArray) {
        setTimeout(() => (eachLine.style.visibility = 'visible'), 350);
        break;
      }
    }
    for (let j = 0; j < tiles.length; j++) {
      eachTile = tiles[j] as HTMLDivElement;
      const tileIndex = parseInt(eachTile.dataset.tile as string);
      const indexExist = state.winningCombination.includes(tileIndex);
      if (indexExist) tilesArray.push(eachTile);
    }
    tilesArray.forEach((tile) =>
      setTimeout(() => {
        tile.style.backgroundColor = 'var(--tile-win)';
        tile.classList.add('tile-win');
      }, 350)
    );
    return () => {
      eachLine.style.visibility = 'hidden';
      tilesArray.forEach((tile) => {
        tile.style.backgroundColor = 'inherit';
        tile.classList.remove('tile-win');
      });
    };
  }, [state.winningCombination, state.theme]);

  useEffect(() => {
    const tiles: NodeListOf<HTMLDivElement> =
      document.querySelectorAll('[data-tile]');
    const gamebox: HTMLDivElement = document.querySelector(
      '.game-box'
    ) as HTMLDivElement;
    if (isArrayFilled(state.cells) && !state.winner) {
      tiles.forEach((tile) => {
        tile.style.borderColor = 'rgba(220, 20, 60, 0.7)';
        tile.style.boxShadow = '0 0 0.2rem 0.01rem crimson';
      });
      gamebox.style.borderColor = 'rgba(220, 20, 60, 0.7)';
      gamebox.style.boxShadow = '0 0 0.2rem 0.01rem crimson';
      gamebox.style.color = 'var(--color)';
      gamebox.style.textShadow = '0 0 0.05rem var(--color-hover)';
    }
    return () => {
      tiles.forEach((tile) => {
        tile.style.borderColor = 'var(--color)';
        tile.style.boxShadow = 'var(--tile-shadow)';
      });
      gamebox.style.borderColor = 'var(--color)';
      gamebox.style.boxShadow = 'var(--tile-shadow)';
      gamebox.style.color = 'var(--color)';
      gamebox.style.textShadow = '0 0 0.01rem var(--color)';
    };
  }, [state.cells, state.winner]);

  const sfxWin = useRef<AudioRef>(null);
  const sfxHover = useRef<AudioRef>(null);
  const sfxSelected = useRef<AudioRef>(null);
  const sfxMove = useRef<AudioRef>(null);

  function handleDrawSound() {
    if (!sfxMove.current) sfxMove.current = new Audio('./draw.mp3');
    sfxMove.current.currentTime = 0;
    sfxMove.current.play();
  }
  function handleWinSound() {
    if (!sfxWin.current) sfxWin.current = new Audio('./win.mp3');
    sfxWin.current.currentTime = 0;
    sfxWin.current.play();
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

  function handleReset() {
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

  function handleResetScore() {
    handleSelectedSound();
    setScore(initialScore);
  }
  function winnerAlgorithm(newCells: Cells) {
    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c]: WinningCombination = winningLines[i];
      if (
        newCells[a] &&
        newCells[a] === newCells[a] &&
        newCells[a] === newCells[b] &&
        newCells[a] === newCells[c]
      ) {
        setWinner(newCells[a]);
        setWinningCombo([a, b, c]);
        handleWinSound();
        const newScore = { ...state.score };
        const winningPlayer = newCells[a];
        if (winningPlayer)
          newScore[winningPlayer] = newScore[winningPlayer] + 1;
        setScore(newScore);
        return false;
      }
    }
    return newCells;
  }

  function handleSetCells(content: Player, index: number) {
    let newCells: Cells = [...state.cells];
    newCells[index] = content;
    if (state.isInfinityMode && state.infinityIndex !== -1) {
      if (isArrayFilledInfinity(newCells)) {
        newCells = removeArrayItem(newCells, state.infinityIndex);
      }
      const infinityTileSpan = document.querySelector(
        `[data-tile="${state.infinityIndex}"] span`
      ) as HTMLDivElement;
      infinityTileSpan.style.color = 'inherit';
      infinityTileSpan.style.textShadow = 'inherit';
      infinityTileSpan.style.animation = 'none';
    }
    if (state.isInfinityMode && !state.isComputer) {
      if (isArrayFilledInfinityStrict(newCells)) {
        const nextPlayer = content === 'X' ? 'O' : 'X';
        const playerPositions = arrayItemPlaceIndexes(newCells, nextPlayer);
        const infinityIndex = playerPositions[randomArrayItem(playerPositions)];
        setIndex(infinityIndex);
        const cells = winnerAlgorithm(newCells);
        if (cells) {
          const infinityTileSpan = document.querySelector(
            `[data-tile="${infinityIndex}"] span`
          ) as HTMLDivElement;

          let color = 'crimson';
          if (content !== state.chosenPlayer) {
            color = state.theme === 'dark' ? 'lightgreen' : 'green';
          }
          document.documentElement.style.setProperty('--infinity-color', color);
          infinityTileSpan.style.color = color;
          infinityTileSpan.style.textShadow = `0 0 1rem ${color}`;
          infinityTileSpan.style.animation =
            'tile-span .5s alternate-reverse infinite ease-in-out, icon-intro 1s ease-out';
        }
      }
    }
    setCells(newCells);
    const cells = winnerAlgorithm(newCells);
    if (cells) {
      if (isArrayFilled(cells)) handleDrawSound();
      if (state.isComputer || state.isChaosMode) nextComputerMove(cells);
    }
  }

  function nextComputerMove(
    cells: Cells,
    player: null | Player = null,
    stop = false
  ): boolean | void | Cells {
    const currentPlayer = state.currentPlayer;
    let computer: Player;
    let computerInfinityIndex: number;
    computer = currentPlayer === 'X' ? 'O' : 'X';
    if (state.isChaosMode) computer = player || state.currentPlayer;
    if (state.isInfinityMode) {
      const computerPositions = arrayItemPlaceIndexes(cells, computer);
      if (computerPositions.length > 2)
        computerInfinityIndex =
          computerPositions[randomArrayItem(computerPositions)];
    }
    function performMove(index: number, nextCells: Cells) {
      let newComputerCells = [...nextCells];
      newComputerCells[index] = computer;
      if (state.isInfinityMode && isArrayFilledInfinity(newComputerCells)) {
        newComputerCells = removeArrayItem(
          newComputerCells,
          computerInfinityIndex
        );
      }
      setPlayer(currentPlayer);
      if (!state.winner) {
        if (player === null) {
          let playerInfinityIndex: number;
          if (state.isInfinityMode) {
            if (isArrayFilledInfinity(newComputerCells)) {
              const playerPositions = arrayItemPlaceIndexes(
                newComputerCells,
                currentPlayer
              );
              playerInfinityIndex =
                playerPositions[randomArrayItem(playerPositions)];
              setIndex(playerInfinityIndex);
            }
          }
          setTimeout(() => {
            if (
              state.isInfinityMode &&
              isArrayFilledInfinity(newComputerCells)
            ) {
              const cells = winnerAlgorithm(newComputerCells);
              if (cells) {
                const infinityTileSpan = document.querySelector(
                  `[data-tile="${playerInfinityIndex}"] span`
                ) as HTMLDivElement;
                let color = state.theme === 'dark' ? 'lightgreen' : 'green';
                document.documentElement.style.setProperty(
                  '--infinity-color',
                  color
                );
                infinityTileSpan.style.color = color;
                infinityTileSpan.style.textShadow = `0 0 1rem ${color}`;
                infinityTileSpan.style.animation =
                  'tile-span .5s alternate-reverse infinite ease-in-out, icon-intro 1s ease-out';
              }
            }
            setCells(newComputerCells);
            if (state.isChaosMode) return;
          }, 300);
          if (state.isInfinityMode && isArrayFilledInfinity(newComputerCells))
            return;
        }
        setTimeout(() => setCells(newComputerCells), 600);
      }
      if (state.isChaosMode) setPlayer(currentPlayer === 'X' ? 'O' : 'X');
      if (state.isChaosMode && state.isComputer) {
        const newPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (player === null)
          return nextComputerMove(newComputerCells, newPlayer);
        if (player !== state.currentPlayer) {
          setPlayer(state.currentPlayer);
          if (!stop) return nextComputerMove(newComputerCells, newPlayer, true);
        }
      }
      winnerAlgorithm(newComputerCells);
    }

    const nextMovePlaceIndexes = arrayItemPlaceIndexes(cells, null);
    for (let i = 0; i < nextMovePlaceIndexes.length; i++) {
      const newCellsExperiment = [...cells];
      newCellsExperiment[nextMovePlaceIndexes[i]] =
        currentPlayer === 'X' ? 'O' : 'X';
      for (let j = 0; j < winningLines.length; j++) {
        const [a, b, c] = winningLines[j];
        if (
          newCellsExperiment[a] &&
          newCellsExperiment[a] === newCellsExperiment[a] &&
          newCellsExperiment[a] === newCellsExperiment[b] &&
          newCellsExperiment[a] === newCellsExperiment[c]
        ) {
          if (state.isGameEasy) {
            if (Math.round(Math.random() * 1))
              i = randomArrayItem(nextMovePlaceIndexes);
          }
          performMove(nextMovePlaceIndexes[i], cells);
          return;
        }
      }
    }
    for (let i = 0; i < nextMovePlaceIndexes.length; i++) {
      const newCellsExperiment = [...cells];
      newCellsExperiment[nextMovePlaceIndexes[i]] = currentPlayer;
      for (let j = 0; j < winningLines.length; j++) {
        const [a, b, c] = winningLines[j];
        if (
          newCellsExperiment[a] &&
          newCellsExperiment[a] === newCellsExperiment[a] &&
          newCellsExperiment[a] === newCellsExperiment[b] &&
          newCellsExperiment[a] === newCellsExperiment[c]
        ) {
          if (state.isGameEasy) {
            if (Math.round(Math.random() * 1))
              i = randomArrayItem(nextMovePlaceIndexes);
          }
          performMove(nextMovePlaceIndexes[i], cells);
          return;
        }
      }
    }
    performMove(
      nextMovePlaceIndexes[randomArrayItem(nextMovePlaceIndexes)],
      cells
    );
  }

  const isCellsEmpty = isArrayEmpty(state.cells);
  const isCellsFilled = isArrayFilled(state.cells);
  return (
    <section className='group-game'>
      <button
        type='button'
        className='reset'
        onMouseEnter={handleHoverSound}
        onClick={handleReset}
        aria-label='Reset tic-tac-toe board'
        disabled={state.isLoading}
      >
        Reset
      </button>
      <div className='game-box' role='grid'>
        {CreateGroup([0, 1, 2], handleSetCells)}
        {CreateGroup([3, 4, 5], handleSetCells)}
        {CreateGroup([6, 7, 8], handleSetCells)}
        <div className='invisible-box-vertical' aria-hidden='true'>
          <div data-line='[0, 3, 6]' />
          <div data-line='[1, 4, 7]' />
          <div data-line='[2, 5, 8]' />
        </div>
        <div className='invisible-box-vertical transform' aria-hidden='true'>
          <div data-line='[0, 1, 2]' />
          <div data-line='[3, 4, 5]' />
          <div data-line='[6, 7, 8]' />
        </div>
        <div className='invisible-box-vertical transform45' aria-hidden='true'>
          <div data-line='[2, 4, 6]' />
        </div>
        <div className='invisible-box-vertical transform-45' aria-hidden='true'>
          <div data-line='[0, 4, 8]' />
        </div>
      </div>
      <div className='score'>
        <p>
          <span id='x-score-label'>X</span> -&gt;&nbsp;
          <span aria-labelledby='x-score-label' aria-live='polite'>
            {state.score.X}
          </span>
          &nbsp; | &nbsp;<span id='o-score-label'>O</span> -&gt;&nbsp;
          <span aria-labelledby='o-score-label' aria-live='polite'>
            {state.score.O}
          </span>
        </p>
        <button
          type='button'
          className='reset'
          onMouseEnter={handleHoverSound}
          onClick={handleResetScore}
          aria-label='Reset tic-tac-toe score'
        >
          Reset
        </button>
      </div>
      <p
        style={{
          visibility:
            isCellsEmpty || state.winner || isCellsFilled
              ? 'visible'
              : 'hidden',
        }}
        className='game-status'
        aria-live='polite'
      >
        {isCellsEmpty && 'Make your first move!'}
        {!!state.winner && `— Winner is ${state.winner} —`}
        {isCellsFilled && !state.winner && `— Draw —`}
        <br />
        &nbsp;
      </p>
    </section>
  );
}
