import { initialCells } from '@/context/GameContextProvider';
import { useGameDispatch } from '@/hooks/useGameDispatch';
import { useGameState } from '@/hooks/useGameState';
import useSound from '@/hooks/useSound';
import Button from '../Button';
import Left from '../icons/Left';

export default function LeftButton() {
  const { state, timeline, current, isLoading } = useGameState();
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
    setCurrent(current > 0 ? current - 1 : 0);
    setCells(current < 2 ? initialCells : timeline[current - 2]);
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
