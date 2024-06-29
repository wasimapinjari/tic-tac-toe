'use client';

import { useGameDispatch } from '@/hooks/useGameDispatch';
import { useGameState } from '@/hooks/useGameState';
import { AudioRef, CellFunction } from '@/types/gameTypes';
import { useRef } from 'react';

export default function Cell({
  index,
  cellContent,
  setCellsContent,
}: CellFunction) {
  const state = useGameState();
  const { setPlayer, setWinningCombo, setLoading } = useGameDispatch();
  const sfxMove = useRef<AudioRef>(null);
  function handleMoveSound() {
    if (!sfxMove.current) sfxMove.current = new Audio('./move.mp3');
    sfxMove.current.currentTime = 0;
    sfxMove.current.play();
  }
  function handleClickAfterWait() {
    // console.log(state);
    handleMoveSound();
    if (!state.winner) setWinningCombo([-1, -1, -1]);
    if (cellContent || state.winner) return;
    if (state.currentPlayer === 'X') {
      setPlayer('O');
      setCellsContent('X');
      return;
    }
    setPlayer('X');
    setCellsContent('O');
  }
  function handleClick() {
    if (state.isLoading) return;
    setLoading(true);
    handleClickAfterWait();
    if (
      (!state.isChaosMode && state.isComputer) ||
      (state.isChaosMode && !state.isComputer)
    )
      setTimeout(() => setLoading(false), 600);
    if (!state.isChaosMode && !state.isComputer)
      setTimeout(() => setLoading(false), 100);
    if (state.isChaosMode && state.isComputer)
      setTimeout(() => setLoading(false), 900);
  }
  return (
    <button
      role='gridcell'
      data-tile={index}
      disabled={state.isLoading}
      onClick={handleClick}
    >
      <span>{cellContent}</span>
    </button>
  );
}
