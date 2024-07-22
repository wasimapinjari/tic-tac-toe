import { initialCells } from '@/context/GameContextProvider';
import { useGameState } from '@/hooks/useGameState';
import useTimeline from '@/hooks/useTimeline';
import Button from '../Button';
import Left from '../icons/Left';

export default function LeftButton() {
  const { timeline, current, isLoading } = useGameState();
  const travel = useTimeline();
  function handleClick() {
    const newCells = current < 2 ? initialCells : timeline[current - 2];
    const newCurrent = current > 0 ? current - 1 : 0;
    travel(newCurrent, newCells);
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
