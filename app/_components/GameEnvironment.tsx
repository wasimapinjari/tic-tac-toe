import { initialCells } from '@/context/GameContextProvider';
import { useGameDispatch } from '@/hooks/useGameDispatch';
import { useGameState } from '@/hooks/useGameState';
import useHelper from '@/hooks/useHelper';
import useSound from '@/hooks/useSound';
import Board from './Board';
import GameScore from './GameScore';
import GameStatus from './GameStatus';
import Button from './Button';
import RightButton from './icon-buttons/RightButton';
import LeftButton from './icon-buttons/LeftButton';

export default function GameEnvironment() {
  const { chosenPlayer, isLoading, infinityIndex } = useGameState();
  const {
    setTimeline,
    setPlayer,
    setCells,
    setWinner,
    setWinningCombo,
    setIndex,
    setCurrent,
  } = useGameDispatch();
  const { handleSelectedSound } = useSound();
  const { $ } = useHelper();

  function handleReset() {
    if (isLoading) return;
    handleSelectedSound();
    setCells(initialCells);
    setTimeline([initialCells]);
    setCurrent(0);
    setPlayer(chosenPlayer);
    setWinner(null);
    setWinningCombo([-1, -1, -1]);
    if (infinityIndex !== -1) {
      const infinityTileSpan = $(`[data-tile="${infinityIndex}"] span`);
      infinityTileSpan.classList.remove('infinity-span');
    }
    setIndex(-1);
  }

  return (
    <section className='group-environment'>
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
      <Board />
      <GameScore />
      <GameStatus />
    </section>
  );
}
