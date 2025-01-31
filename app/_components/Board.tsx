import { useGameDispatch } from '@/hooks/useGameDispatch';
import { useGameState } from '@/hooks/useGameState';
import useHelper from '@/hooks/useHelper';
import useSound from '@/hooks/useSound';
import { Cells, Player, WinningCombination } from '@/types/gameTypes';
import {
  arrayItemPlaceIndexes,
  isArrayFilled,
  isArrayInfinity,
  randomArrayIndex,
  randomArrayItem,
  removeArrayItem,
  winningLogic,
} from '@/utils/helperFunctions';
import { useEffect } from 'react';
import CreateCellGroup from './CreateCellGroup';
import InvisibleBoxes from './InvisibleBoxes';

export const winningLines: WinningCombination[] = [
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
  const {
    state,
    timeline,
    current,
    currentPlayer,
    cells,
    winner,
    chosenPlayer,
    isComputer,
    isGameEasy,
    isChaosMode,
    isInfinityMode,
    theme,
    winningCombination,
    score,
    infinityIndex,
  } = useGameState();
  const {
    setPlayer,
    setCells,
    setWinner,
    setWinningCombo,
    setScore,
    setIndex,
    setTimeline,
    setCurrent,
    setCurrentWinner,
  } = useGameDispatch();
  const { $, $$ } = useHelper();
  const { winSound, drawSound } = useSound();
  useEffect(() => {
    const lines = $$('[data-line]');
    const tiles = $$('[data-tile]');
    const tilesArray: HTMLDivElement[] = [];
    let eachLine: HTMLDivElement;
    let eachTile: HTMLDivElement;
    for (let i = 0; i < lines.length; i++) {
      eachLine = lines[i];
      const lineArray = JSON.parse(eachLine.dataset.line as string).join('');
      if (winningCombination.join('') === lineArray) {
        setTimeout(() => eachLine.classList.add('visible'), 350);
        break;
      }
    }
    for (let j = 0; j < tiles.length; j++) {
      eachTile = tiles[j];
      const tileIndex = parseInt(eachTile.dataset.tile as string);
      const indexExist = winningCombination.includes(tileIndex);
      if (indexExist) tilesArray.push(eachTile);
    }
    tilesArray.forEach((tile) =>
      setTimeout(() => tile.classList.add('tile-win'), 350)
    );
    return () => {
      eachLine.classList.remove('visible');
      tilesArray.forEach((tile) => tile.classList.remove('tile-win'));
    };
  }, [winningCombination, theme, $$]);

  useEffect(() => {
    const groups = $$('.group');
    const gamebox = $('.game-box');
    if (isArrayFilled(cells) && !winner) {
      groups.forEach((group) => group.classList.add('group-draw'));
      gamebox.classList.add('gamebox-draw');
    }
    return () => {
      groups.forEach((group) => group.classList.remove('group-draw'));
      gamebox.classList.remove('gamebox-draw');
    };
  }, [cells, winner, $, $$]);

  function winnerAlgorithm(newCells: Cells) {
    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c]: WinningCombination = winningLines[i];
      if (winningLogic([a, b, c], newCells)) {
        setWinner(newCells[a]);
        setWinningCombo([a, b, c]);
        setCurrentWinner(newCells[a]);
        winSound();
        const newScore = { ...score };
        const winningPlayer = newCells[a]!;
        newScore[winningPlayer] = newScore[winningPlayer] + 1;
        setScore(newScore);
        return false;
      }
    }
    return newCells;
  }

  function handleSetCells(content: Player, index: number) {
    let newCells: Cells = [...cells];
    newCells[index] = content;
    if (isInfinityMode && infinityIndex !== -1) {
      if (isArrayInfinity(newCells))
        newCells = removeArrayItem(newCells, infinityIndex);
      const infinityTileSpan = $(`[data-tile="${infinityIndex}"] span`);
      infinityTileSpan.classList.remove('infinity-span');
    }
    if (isInfinityMode && !isComputer && isArrayInfinity(newCells)) {
      const nextPlayer = content === 'X' ? 'O' : 'X';
      const playerPositions = arrayItemPlaceIndexes(newCells, nextPlayer);
      const infinityIndexCurrent = randomArrayItem(playerPositions);
      setIndex(infinityIndexCurrent);
      const cellsReturned = winnerAlgorithm(newCells);
      if (cellsReturned) {
        let color = 'crimson';
        if (content !== chosenPlayer)
          color = theme === 'dark' ? 'lightgreen' : 'green';
        $('.theme').style.setProperty('--infinity-color', color);
        const infinityTileSpan = $(
          `[data-tile="${infinityIndexCurrent}"] span`
        );
        infinityTileSpan.classList.add('infinity-span');
      }
    }
    setCells(newCells);
    setTimeline(
      timeline.length === current
        ? [...timeline, newCells]
        : [...timeline.slice(0, current), newCells]
    );
    setCurrent(current + 1);
    const cellsReturned = winnerAlgorithm(newCells);
    if (cellsReturned) {
      if (isArrayFilled(cellsReturned)) drawSound();
      if (isComputer || isChaosMode) nextComputerMove(cellsReturned);
    }
  }

  function nextComputerMove(
    cellsReturned: Cells,
    player: null | Player = null,
    stop = false
  ) {
    const currentPlayingPlayer = currentPlayer;
    let computer: Player;
    let computerInfinityIndex: number;
    computer = currentPlayingPlayer === 'X' ? 'O' : 'X';
    if (isChaosMode) computer = player || currentPlayer;
    if (isInfinityMode) {
      const computerPositions = arrayItemPlaceIndexes(cellsReturned, computer);
      if (computerPositions.length > 2)
        computerInfinityIndex = randomArrayItem(computerPositions);
    }
    function performMove(index: number, nextCells: Cells) {
      let newComputerCells = [...nextCells];
      newComputerCells[index] = computer;
      if (isInfinityMode && isArrayInfinity(newComputerCells)) {
        newComputerCells = removeArrayItem(
          newComputerCells,
          computerInfinityIndex
        );
      }
      setPlayer(currentPlayingPlayer);
      if (!winner) {
        if (player === null) {
          let playerInfinityIndex: number;
          if (isInfinityMode && isArrayInfinity(newComputerCells)) {
            const playerPositions = arrayItemPlaceIndexes(
              newComputerCells,
              currentPlayingPlayer
            );
            playerInfinityIndex = randomArrayItem(playerPositions);
            setIndex(playerInfinityIndex);
          }
          setTimeout(() => {
            if (isInfinityMode && isArrayInfinity(newComputerCells)) {
              const cellsReturned = winnerAlgorithm(newComputerCells);
              if (cellsReturned) {
                let color = theme === 'dark' ? 'lightgreen' : 'green';
                $('.theme').style.setProperty('--infinity-color', color);
                const infinityTileSpan = $(
                  `[data-tile="${playerInfinityIndex}"] span`
                );
                infinityTileSpan.classList.add('infinity-span');
              }
            }
            setCells(newComputerCells);
            setTimeline(
              timeline.length === current
                ? [...timeline, newComputerCells]
                : [...timeline.slice(0, current), newComputerCells]
            );
            setCurrent(current + 1);
            if (isChaosMode) return;
          }, 300);
          if (isInfinityMode && isArrayInfinity(newComputerCells)) return;
        }
        setTimeout(() => {
          setCells(newComputerCells);
          setTimeline(
            timeline.length === current
              ? [...timeline, newComputerCells]
              : [...timeline.slice(0, current), newComputerCells]
          );
          setCurrent(current + 1);
        }, 600);
      }
      if (isChaosMode) setPlayer(currentPlayingPlayer === 'X' ? 'O' : 'X');
      if (isChaosMode && isComputer) {
        const newPlayer = currentPlayingPlayer === 'X' ? 'O' : 'X';
        if (player === null)
          return nextComputerMove(newComputerCells, newPlayer);
        if (player !== currentPlayer) {
          setPlayer(currentPlayer);
          if (!stop) return nextComputerMove(newComputerCells, newPlayer, true);
        }
      }
      winnerAlgorithm(newComputerCells);
    }

    let skip = true;
    const nextMovePlaceIndexes = arrayItemPlaceIndexes(cellsReturned, null);

    function predictWinningMove(predictForPlayer: Player) {
      for (let i = 0; i < nextMovePlaceIndexes.length; i++) {
        const newCellsExperiment = [...cellsReturned];
        newCellsExperiment[nextMovePlaceIndexes[i]] = predictForPlayer;
        for (let j = 0; j < winningLines.length; j++) {
          const [a, b, c] = winningLines[j];
          if (winningLogic([a, b, c], newCellsExperiment)) {
            if (isGameEasy && (Math.round(Math.random() * 1) || isChaosMode))
              i = randomArrayIndex(nextMovePlaceIndexes);
            performMove(nextMovePlaceIndexes[i], cellsReturned);
            skip = false;
            return;
          }
        }
      }
    }

    predictWinningMove(currentPlayingPlayer === 'X' ? 'O' : 'X');
    if (skip) predictWinningMove(currentPlayingPlayer);
    if (skip) performMove(randomArrayItem(nextMovePlaceIndexes), cellsReturned);
  }

  return (
    <div className='game-box' role='grid'>
      {CreateCellGroup([0, 1, 2], handleSetCells)}
      {CreateCellGroup([3, 4, 5], handleSetCells)}
      {CreateCellGroup([6, 7, 8], handleSetCells)}
      <InvisibleBoxes />
    </div>
  );
}
