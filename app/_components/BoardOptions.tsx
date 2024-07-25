import { initialCells } from '@/context/GameContextProvider';
import { useGameDispatch } from '@/hooks/useGameDispatch';
import { useGameState } from '@/hooks/useGameState';
import useHelper from '@/hooks/useHelper';
import useSound from '@/hooks/useSound';
import Button from './Button';
import LeftButton from './icon-buttons/LeftButton';
import RightButton from './icon-buttons/RightButton';

export default function BoardOptions() {
  const { chosenPlayer, isLoading, infinityIndex } = useGameState();
  const {
    setTimeline,
    setPlayer,
    setCells,
    setWinner,
    setWinningCombo,
    setIndex,
    setCurrent,
    setCurrentWinner,
  } = useGameDispatch();
  const { selectedSound } = useSound();
  const { $ } = useHelper();
  function handleReset() {
    if (isLoading) return;
    selectedSound();
    setCells(initialCells);
    setTimeline([initialCells]);
    setCurrent(0);
    setPlayer(chosenPlayer);
    setWinner(null);
    setCurrentWinner(null);
    setWinningCombo([-1, -1, -1]);
    if (infinityIndex !== -1) {
      const infinityTileSpan = $(`[data-tile="${infinityIndex}"] span`);
      infinityTileSpan.classList.remove('infinity-span');
    }
    setIndex(-1);
  }
  return (
    <div className='board-options'>
      <LeftButton />
      <Button
        className='reset'
        onClick={handleReset}
        aria-label='Reset tic-tac-toe board'
        disabled={isLoading}
        data-testid='reset-board-button'
      >
        Reset
      </Button>
      <RightButton />
    </div>
  );
}
