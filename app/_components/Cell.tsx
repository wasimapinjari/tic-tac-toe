import { useGameDispatch } from '@/hooks/useGameDispatch';
import { useGameState } from '@/hooks/useGameState';
import { AudioRef, CellFunction } from '@/types/gameTypes';
import { useRef } from 'react';

export default function Cell({
  index,
  cellContent,
  setCellsContent,
}: CellFunction) {
  const { currentPlayer, winner, isComputer, isChaosMode, isLoading } =
    useGameState();
  const { setPlayer, setWinningCombo, setLoading } = useGameDispatch();
  const sfxMove = useRef<AudioRef>(null);
  function handleMoveSound() {
    if (!sfxMove.current) sfxMove.current = new Audio('./move.mp3');
    sfxMove.current.currentTime = 0;
    sfxMove.current.play();
  }
  function handleClickBeforeWait() {
    handleMoveSound();
    if (!winner) setWinningCombo([-1, -1, -1]);
    if (cellContent || winner) return;
    if (currentPlayer === 'X') {
      setPlayer('O');
      setCellsContent('X');
      return;
    }
    setPlayer('X');
    setCellsContent('O');
  }

  function throttle() {
    if ((!isChaosMode && isComputer) || (isChaosMode && !isComputer))
      setTimeout(() => setLoading(false), 600);
    if (!isChaosMode && !isComputer) setTimeout(() => setLoading(false), 100);
    if (isChaosMode && isComputer) setTimeout(() => setLoading(false), 900);
  }

  function handleClick() {
    if (isLoading || cellContent) return;
    setLoading(true);
    handleClickBeforeWait();
    throttle();
  }
  return (
    <button
      role='gridcell'
      data-tile={index}
      disabled={isLoading}
      onClick={handleClick}
    >
      <span>{cellContent}</span>
    </button>
  );
}
