import { useGameDispatch } from '@/hooks/useGameDispatch';
import { useGameState } from '@/hooks/useGameState';
import useSound from '@/hooks/useSound';
import { WinningCombination } from '@/types/gameTypes';
import { winningLogic } from '@/utils/helperFunctions';
import { winningLines } from '../Board';
import Button from '../Button';
import Right from '../icons/Right';
import useHelper from '@/hooks/useHelper';

export default function RightButton() {
  const {
    timeline,
    infinityIndex,
    current,
    score,
    isLoading,
    winner,
    currentWinner,
  } = useGameState();
  const {
    setCells,
    setCurrent,
    setLoading,
    setScore,
    setWinner,
    setWinningCombo,
    setCurrentWinner,
    setIndex,
  } = useGameDispatch();
  const { $ } = useHelper();
  const { selectedSound, winSound } = useSound();
  function throttle() {
    if (isLoading) return;
    setLoading(true);
    setTimeout(() => setLoading(false), 100);
  }
  function handleClick() {
    if (current === timeline.length) return;
    throttle();
    const newCells = !current
      ? timeline[current]
      : current === timeline.length
      ? timeline[current - 1]
      : timeline[current];
    selectedSound();
    setCurrent(current === timeline.length ? current : current + 1);
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
      aria-label={`Redo move`}
      data-testid='redo-button'
    >
      <Right />
    </Button>
  );
}
