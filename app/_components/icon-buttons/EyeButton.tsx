import useClick from '@/hooks/useClick';
import { useGameDispatch } from '@/hooks/useGameDispatch';
import { useGameState } from '@/hooks/useGameState';
import useHelper from '@/hooks/useHelper';
import { useEffect } from 'react';
import Button from '../Button';
import Hide from '../icons/Hide';
import Show from '../icons/Show';

export default function EyeButton() {
  const { isOptionsHidden } = useGameState();
  const { setHideOptions } = useGameDispatch();
  const handleClick = useClick();
  const { $ } = useHelper();
  useEffect(() => {
    const iconContainer = $('.icon-container');
    if (iconContainer) {
      const { height } = $('.container').getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      if (height > viewportHeight) {
        iconContainer.classList.add('remove-scroll-width');
        return;
      }
      iconContainer.classList.remove('remove-scroll-width');
    }
  }, [$, isOptionsHidden]);

  const handleContainer = () => {
    const gameContainer = $('.game-content');
    if (gameContainer) {
      gameContainer.classList.remove('remove-double-columns');
      if (!isOptionsHidden)
        gameContainer.classList.add('remove-double-columns');
    }
  };
  return (
    <Button
      aria-label={`${isOptionsHidden ? 'Show' : 'Hide'} game options`}
      onClick={handleClick(setHideOptions)(!isOptionsHidden, handleContainer)}
      data-testid='eye-button'
    >
      {isOptionsHidden ? <Hide /> : <Show />}
    </Button>
  );
}
