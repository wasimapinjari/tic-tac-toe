import useClick from '@/hooks/useClick';
import { useGameDispatch } from '@/hooks/useGameDispatch';
import { useGameState } from '@/hooks/useGameState';
import { Theme } from '@/types/gameTypes';
import Button from '../Button';
import Moon from '../icons/Moon';
import Sun from '../icons/Sun';

export default function ThemeButton() {
  const { theme } = useGameState();
  const { setTheme } = useGameDispatch();
  const handleClick = useClick();
  const isThemeDark = theme === 'dark';
  const switchTheme = isThemeDark ? 'light' : 'dark';
  return (
    <Button
      onClick={handleClick(setTheme)(switchTheme as Theme)}
      aria-label={`Switch to ${switchTheme} mode`}
      data-testid='theme-button'
    >
      {isThemeDark ? <Moon /> : <Sun />}
    </Button>
  );
}
