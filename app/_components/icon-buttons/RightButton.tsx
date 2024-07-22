import { useGameState } from '@/hooks/useGameState';
import useTimeline from '@/hooks/useTimeline';
import Button from '../Button';
import Right from '../icons/Right';

export default function RightButton() {
  const { timeline, current, isLoading } = useGameState();
  const travel = useTimeline();
  function handleClick() {
    const newCells = !current
      ? timeline[current]
      : current === timeline.length
      ? timeline[current - 1]
      : timeline[current];
    const newCurrent = current === timeline.length ? current : current + 1;
    travel(newCurrent, newCells);
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
