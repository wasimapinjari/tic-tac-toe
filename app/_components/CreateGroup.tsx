'use client';

import { Player } from '@/types/gameTypes';
import Cell from './Cell';
import { useGameState } from '@/hooks/useGameState';

export default function CreateGroup(
  indexes: number[],
  handleSetCells: (content: Player, index: number) => void
) {
  const state = useGameState();
  return (
    <div className='group'>
      {indexes.map((item) => (
        <Cell
          index={item}
          key={item}
          cellContent={state.cells[item]}
          setCellsContent={(content: Player) => handleSetCells(content, item)}
        />
      ))}
    </div>
  );
}
