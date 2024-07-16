import { useGameState } from '@/hooks/useGameState';
import { Player } from '@/types/gameTypes';
import Cell from './Cell';

export default function CreateCellGroup(
  indexes: number[],
  handleSetCells: (content: Player, index: number) => void
) {
  const { cells } = useGameState();
  return (
    <div className='group'>
      {indexes.map((item) => (
        <Cell
          index={item}
          key={item}
          cellContent={cells[item]}
          setCellsContent={(content: Player) => handleSetCells(content, item)}
        />
      ))}
    </div>
  );
}
