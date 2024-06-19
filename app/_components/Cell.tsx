'use client';

import { useGameDispatch } from '@/hooks/useGameDispatch';
import { useGameState } from '@/hooks/useGameState';
import { CellFunction } from '@/types/gameTypes';

export default function Cell({
  index,
  cellContent,
  setCellsContent,
}: CellFunction) {
  const state = useGameState();
  const { setPlayer, setWinningCombo, setLoading } = useGameDispatch();
  function handleClickAfterWait() {
    if (state.winner) return;
    if (state.cells[index]) return;
    if (!state.winner) setWinningCombo([-1, -1, -1]);
    if (cellContent || state.winner) return;
    if (state.currentPlayer === 'X') {
      setPlayer('O');
      return setCellsContent('X');
    }
    setPlayer('X');
    setCellsContent('O');
  }
  function handleClick() {
    if (state.isLoading) return;
    setLoading(true);
    if (!state.isComputer) {
      setTimeout(() => {
        setLoading(false);
      }, 600);
    }
    if (state.chaosMode && state.isComputer) {
      setTimeout(() => {
        setLoading(false);
      }, 900);
    }
    handleClickAfterWait();
  }
  return (
    <button
      // style={{ backgroundColor: color }}
      data-tile={index}
      disabled={state.isLoading}
      onClick={handleClick}
    >
      <span>{cellContent}</span>
    </button>
  );
}
