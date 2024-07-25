import { initialScore } from '@/context/GameContextProvider';
import { useGameDispatch } from '@/hooks/useGameDispatch';
import { useGameState } from '@/hooks/useGameState';
import useSound from '@/hooks/useSound';
import Button from './Button';
import { gt } from './icon-buttons/HelpButton';

export default function GameScore() {
  const { score } = useGameState();
  const { setScore } = useGameDispatch();
  const { selectedSound, hoverSound } = useSound();
  function handleResetScore() {
    selectedSound();
    setScore(initialScore);
  }
  return (
    <div className='score'>
      <p aria-live='polite' data-testid='score'>
        <span id='x-score-label'>X</span>
        {gt}
        <span aria-labelledby='x-score-label'>{score.X}</span>
        &nbsp; | &nbsp;<span id='o-score-label'>O</span>
        {gt}
        <span aria-labelledby='o-score-label'>{score.O}</span>
      </p>
      <Button
        type='button'
        className='reset'
        onMouseEnter={hoverSound}
        onClick={handleResetScore}
        aria-label='Reset tic-tac-toe score'
        data-testid='reset-score-button'
      >
        Reset
      </Button>
    </div>
  );
}
