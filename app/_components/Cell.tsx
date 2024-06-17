'use client';

import { useGameDispatch } from '@/hooks/useGameDispatch';
import { useGameState } from '@/hooks/useGameState';
import { CellFunction } from '@/types/gameTypes';
import { MouseEvent } from 'react';

export default function Cell({
  index,
  cellContent,
  setCellsContent,
}: CellFunction) {
  const state = useGameState();
  const { setPlayer, setWinningCombo, setLoading } = useGameDispatch();
  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    setLoading(true);
    if (!state.winner) setWinningCombo([-1, -1, -1]);
    if (cellContent || state.winner) return;
    if (state.currentPlayer === 'X') {
      setPlayer('O');
      return setCellsContent('X');
    }
    setPlayer('X');
    setCellsContent('O');
  }
  return (
    <button data-tile={index} disabled={state.isLoading} onClick={handleClick}>
      <span>{cellContent}</span>
    </button>
  );
}
