import { useGameDispatch } from '@/hooks/useGameDispatch';
import { useGameState } from '@/hooks/useGameState';
import useSound from '@/hooks/useSound';
import Button from '../Button';
import Right from '../icons/Right';

export default function RightButton() {
  const { timeline, current, isLoading } = useGameState();
  const { setLoading } = useGameDispatch();
  const { setCells, setCurrent } = useGameDispatch();
  const { handleSelectedSound } = useSound();
  function throttle() {
    if (isLoading) return;
    setLoading(true);
    setTimeout(() => setLoading(false), 100);
  }
  function handleClick() {
    throttle();
    handleSelectedSound();
    setCurrent(current === timeline.length ? current : current + 1);
    setCells(
      !current
        ? timeline[current]
        : current === timeline.length
        ? timeline[current - 1]
        : timeline[current]
    );
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
