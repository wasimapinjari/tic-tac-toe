import { initialCells } from '@/context/GameContextProvider';
import { useGameDispatch } from '@/hooks/useGameDispatch';
import { useGameState } from '@/hooks/useGameState';
import useSound from '@/hooks/useSound';
import { Player, WinningCombination } from '@/types/gameTypes';
import { winningLogic } from '@/utils/helperFunctions';
import { winningLines } from '../Board';
import Button from '../Button';
import Left from '../icons/Left';
import useHelper from '@/hooks/useHelper';

export default function LeftButton() {
  const {
    state,
    infinityIndex,
    score,
    cells,
    winner,
    timeline,
    current,
    isLoading,
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
  function throttle() {
    if (isLoading) return;
    setLoading(true);
    setTimeout(() => setLoading(false), 100);
  }
  function handleClick() {
    console.log(state);
    if (timeline.length === 0) currentWinner = null;
    currentWinner = currentWinner || winner;
    const newCells = current < 2 ? initialCells : timeline[current - 2];
    throttle();
    selectedSound();
    setCurrent(current > 0 ? current - 1 : 0);
    setCells(newCells);
    const newScore = { ...score };
    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c]: WinningCombination = winningLines[i];
      if (winningLogic([a, b, c], newCells)) {
        setWinner(newCells[a]);
        setWinningCombo([a, b, c]);
        winSound();
        setCurrentWinner(newCells[a]);
        if (newCells[a]) newScore[newCells[a]] = newScore[newCells[a]] + 1;
        setScore(newScore);
        return;
      }
    }
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
  }
  return (
    <Button
      disabled={isLoading}
      onClick={handleClick}
      aria-label={`Undo move`}
      data-testid='undo-button'
    >
      <Left />
    </Button>
  );
}
