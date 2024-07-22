import { initialCells } from '@/context/GameContextProvider';
import { useGameDispatch } from '@/hooks/useGameDispatch';
import { useGameState } from '@/hooks/useGameState';
import useHelper from '@/hooks/useHelper';
import useSound from '@/hooks/useSound';
import { Cells, Player, WinningCombination } from '@/types/gameTypes';
import {
  arrayItemPlaceIndexes,
  isArrayInfinity,
  randomArrayItem,
  winningLogic,
} from '@/utils/helperFunctions';
import { winningLines } from '../app/_components/Board';

export default function useTimeline() {
  const {
    infinityIndex,
    score,
    isInfinityMode,
    isLoading,
    currentPlayer,
    chosenPlayer,
    isComputer,
    theme,
  } = useGameState();
  const {
    setLoading,
    setIndex,
    setScore,
    setWinner,
    setWinningCombo,
    setCurrentWinner,
  } = useGameDispatch();
  const { $ } = useHelper();
  const { setCells, setCurrent } = useGameDispatch();
  const { selectedSound, winSound } = useSound();
  let currentWinner: Player | null;
  const newScore = { ...score };
  function throttle() {
    if (isLoading) return;
    setLoading(true);
    setTimeout(() => setLoading(false), 100);
  }
  function winnerAlgorithm(newCells: Cells) {
    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c]: WinningCombination = winningLines[i];
      if (winningLogic([a, b, c], newCells)) {
        setWinner(newCells[a]);
        setWinningCombo([a, b, c]);
        winSound();
        setCurrentWinner(newCells[a]);
        if (newCells[a]) newScore[newCells[a]] = newScore[newCells[a]] + 1;
        setScore(newScore);
        return false;
      }
    }
    return newCells;
  }
  return (newCurrent: number, newCells: Cells) => {
    setCurrent(newCurrent);
    throttle();
    selectedSound();
    setCells(newCells);
    winnerAlgorithm(newCells);
    if (currentWinner) {
      newScore[currentWinner] = newScore[currentWinner] - 1;
      setCurrentWinner(null);
    }
    setScore(newScore);
    setWinner(null);
    setWinningCombo([-1, -1, -1]);
    if (infinityIndex !== -1) {
      const infinityTileSpan = $(`[data-tile="${infinityIndex}"] span`);
      infinityTileSpan.classList.remove('infinity-span');
    }
    setIndex(-1);
    if (isInfinityMode && isArrayInfinity(newCells)) {
      let nextPlayer: Player = currentPlayer;
      if (isComputer) nextPlayer = chosenPlayer;
      const playerPositions = arrayItemPlaceIndexes(newCells, nextPlayer);
      const infinityIndexCurrent = randomArrayItem(playerPositions);
      setIndex(infinityIndexCurrent);
      const cellsReturned = winnerAlgorithm(newCells);
      if (cellsReturned) {
        let color = 'crimson';
        if (currentPlayer === chosenPlayer)
          color = theme === 'dark' ? 'lightgreen' : 'green';
        if (isComputer) color = theme === 'dark' ? 'lightgreen' : 'green';
        $('.theme').style.setProperty('--infinity-color', color);
        const infinityTileSpan = $(
          `[data-tile="${infinityIndexCurrent}"] span`
        );
        infinityTileSpan.classList.add('infinity-span');
      }
    }
  };
}
