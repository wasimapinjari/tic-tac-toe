'use client';

import { initialCells, initialScore } from '@/context/GameContextProvider';
import { Cells, Player, WinningCombination } from '@/types/gameTypes';
import {
  isArrayEmpty,
  isArrayFilled,
  randomArrayItem,
} from '@/utils/helperFunctions';
import { useEffect, useRef } from 'react';
import CreateGroup from './CreateGroup';
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
    setLoading,
    setCells,
    setWinner,
    setWinningCombo,
    setScore,
  } = useGameDispatch();

  useEffect(() => {
    const lines = document.querySelectorAll('[data-line]');
    const tiles = document.querySelectorAll('[data-tile]');
    type HTMLDivElements<T> = T[];
    const tilesArray: HTMLDivElements<HTMLDivElement> = [];
    let eachLine: HTMLDivElement;
    let eachTile: HTMLDivElement;
    for (let i = 0; i < lines.length; i++) {
      eachLine = lines[i] as HTMLDivElement;
      const lineArray = JSON.parse(eachLine.dataset.line as string).join('');
      if (state.winningCombination.join('') === lineArray) {
        setTimeout(() => (eachLine.style.visibility = 'visible'), 200);
        break;
      }
    }
    for (let j = 0; j < tiles.length; j++) {
      eachTile = tiles[j] as HTMLDivElement;
      const tileIndex = parseInt(eachTile.dataset.tile as string);
      const indexExist = state.winningCombination.includes(tileIndex);
      if (indexExist) {
        tilesArray.push(eachTile);
      }
    }
    tilesArray.forEach((tile) =>
      setTimeout(() => (tile.style.backgroundColor = 'var(--tile-win)'), 200)
    );

    return () => {
      eachLine.style.visibility = 'hidden';
      tilesArray.forEach((tile) => (tile.style.backgroundColor = 'inherit'));
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
        tile.style.boxShadow = '0 0 0.2rem 0.01rem rgba(220, 20, 60, 1)';
      });
      gamebox.style.borderColor = 'rgba(220, 20, 60, 0.7)';
      gamebox.style.boxShadow = '0 0 0.2rem 0.01rem rgba(220, 20, 60, 1 )';
    }
    return () => {
      tiles.forEach((tile) => {
        tile.style.borderColor = 'var(--color)';
        tile.style.boxShadow = 'var(--tile-shadow)';
      });
      gamebox.style.borderColor = 'var(--color)';
      gamebox.style.boxShadow = 'var(--tile-shadow)';
    };
  }, [state.cells, state.winner]);

  const sfxPlayer = useRef<HTMLAudioElement | null>(null);
  const sfxDraw = useRef<HTMLAudioElement | null>(null);
  const sfxWin = useRef<HTMLAudioElement | null>(null);
  const sfxReset = useRef<HTMLAudioElement | null>(null);
  const sfxResetScore = useRef<HTMLAudioElement | null>(null);
  const sfxHover = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (state.winner) sfxWin.current?.play();
    if (isArrayFilled(state.cells) && !state.winner) sfxDraw.current?.play();
    if (
      !isArrayEmpty(state.cells) &&
      !isArrayFilled(state.cells) &&
      !state.winner
    )
      sfxPlayer.current?.play();
  }, [state.cells, state.winner]);

  function handleHover() {
    if (!sfxHover.current) sfxHover.current = new Audio('./hover.mp3');
    sfxHover.current.currentTime = 0;
    sfxHover.current.play();
  }

  function handleSound() {
    if (!sfxWin.current) sfxWin.current = new Audio('./win.mp3');
    if (!sfxPlayer.current) sfxPlayer.current = new Audio('./move.mp3');
    if (!sfxDraw.current) sfxDraw.current = new Audio('./draw.mp3');
  }

  function handleReset() {
    if (!sfxReset.current) sfxReset.current = new Audio('./reset.mp3');
    sfxReset.current.currentTime = 0;
    sfxReset.current.play();
    setPlayer('X');
    setCells(initialCells);
    setWinner(null);
    setLoading(false);
    setWinningCombo([-1, -1, -1]);
  }

  function handleResetScore() {
    if (!sfxResetScore.current)
      sfxResetScore.current = new Audio('./reset-score.mp3');
    sfxResetScore.current.currentTime = 0;
    sfxResetScore.current.play();
    setScore(initialScore);
  }

  function nextComputerMove(
    cells: Cells,
    player: null | Player = null,
    stop = false
  ): boolean | void | Cells {
    const currentPlayer = state.currentPlayer;
    let computer: Player;
    computer = currentPlayer === 'X' ? 'O' : 'X';
    if (state.chaosMode) {
      computer = player || state.currentPlayer;
    }
    if (typeof cells === 'boolean') return;
    const nextMovePlaceIndexes = cells
      .map((move, index) => {
        if (move === null) return index;
        return [];
      })
      .flat();
    let skip = false;
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
          skip = true;
          if (state.isGameEasy) {
            if (Math.round(Math.random() * 1)) {
              i = randomArrayItem(nextMovePlaceIndexes);
            }
          }
          return performMove(nextMovePlaceIndexes[i], cells);
        }
      }
    }
    if (skip) return;
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
          skip = true;
          if (state.isGameEasy) {
            if (Math.round(Math.random() * 1)) {
              i = randomArrayItem(nextMovePlaceIndexes);
            }
          }
          return performMove(nextMovePlaceIndexes[i], cells);
        }
      }
    }
    if (skip) return;
    performMove(
      nextMovePlaceIndexes[randomArrayItem(nextMovePlaceIndexes)],
      cells
    );

    function performMove(index: number, nextCells: Cells) {
      const newComputerCells = [...nextCells];
      newComputerCells[index] = computer;
      setPlayer(currentPlayer);
      if (!state.winner) {
        if (player === null) {
          setTimeout(() => {
            setCells(newComputerCells);
            if (state.chaosMode) return;
          }, 300);
        }
        setTimeout(() => {
          setCells(newComputerCells);
        }, 600);
      }
      if (state.chaosMode) {
        setPlayer(currentPlayer === 'X' ? 'O' : 'X');
      }
      if (state.chaosMode && state.isComputer) {
        const newPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (player === null) {
          return nextComputerMove(newComputerCells, newPlayer);
        }
        if (player !== state.currentPlayer) {
          setPlayer(state.currentPlayer);
          if (!stop) {
            return nextComputerMove(newComputerCells, newPlayer, true);
          }
        }
      }
      return winnerAlgorithm(newComputerCells);
    }
  }

  function handleSetCells(content: Player, index: number) {
    handleSound();
    const newCells: Cells = [...state.cells];
    newCells[index] = content;
    setCells(newCells);
    const cells = winnerAlgorithm(newCells);
    if (typeof cells === 'object') {
      if (state.isComputer || state.chaosMode) {
        return nextComputerMove(cells);
      }
    }
  }

  function winnerAlgorithm(newCells: Cells) {
    let winner = false;
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
        const newScore = { ...state.score };
        const winningPlayer = newCells[a];
        if (winningPlayer)
          newScore[winningPlayer] = newScore[winningPlayer] + 1;
        setScore(newScore);
        return (winner = true);
      }
    }
    return winner ? false : newCells;
  }
  const isCellsEmpty = isArrayEmpty(state.cells);
  const isCellsFilled = isArrayFilled(state.cells);

  return (
    <div className='group-game'>
      <button
        className='reset'
        onMouseEnter={handleHover}
        onClick={handleReset}
      >
        Reset
      </button>
      <div className='game-box'>
        {CreateGroup([0, 1, 2], handleSetCells)}
        {CreateGroup([3, 4, 5], handleSetCells)}
        {CreateGroup([6, 7, 8], handleSetCells)}
        <div className='invisible-box-vertical'>
          <div data-line='[0, 3, 6]'></div>
          <div data-line='[1, 4, 7]'></div>
          <div data-line='[2, 5, 8]'></div>
        </div>
        <div className='invisible-box-vertical transform'>
          <div data-line='[0, 1, 2]'></div>
          <div data-line='[3, 4, 5]'></div>
          <div data-line='[6, 7, 8]'></div>
        </div>
        <div className='invisible-box-vertical transform45'>
          <div data-line='[2, 4, 6]'></div>
        </div>
        <div className='invisible-box-vertical transform-45'>
          <div data-line='[0, 4, 8]'></div>
        </div>
      </div>
      <div className='score'>
        <p>
          X -&gt; <span className='score-value'>{state.score.X}</span>
          &nbsp;| &nbsp;O -&gt;{' '}
          <span className='score-value'>{state.score.O}</span>
        </p>
        <button
          className='reset'
          onMouseEnter={handleHover}
          onClick={handleResetScore}
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
          marginBottom: '2rem',
        }}
        className='game-status'
      >
        {isCellsEmpty && 'Make your first move!'}
        {!!state.winner && `Winner is ${state.winner}`}
        {isCellsFilled && !state.winner && '- Draw -'}
        &nbsp;
      </p>
    </div>
  );
}
