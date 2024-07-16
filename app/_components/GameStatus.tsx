import { useGameState } from '@/hooks/useGameState';
import {
  isArrayEmpty,
  isArrayFilled,
  randomArrayItem,
} from '@/utils/helperFunctions';
import { useEffect, useRef } from 'react';

const motivations = [
  'Keep going',
  'Good job',
  'Keep pushing',
  'You got this',
  'Well done',
  'There you go',
];

export default function GameStatus() {
  const { cells, winner, currentPlayer, isComputer, isLoading } =
    useGameState();
  useEffect(() => {
    if (!isLoading) motivation.current = randomArrayItem(motivations);
  }, [isLoading]);
  const motivation = useRef(motivations[0]);
  const isCellsEmpty = isArrayEmpty(cells);
  const isCellsFilled = isArrayFilled(cells);
  const isTrue = !isCellsEmpty && !isCellsFilled && !winner;

  return (
    <p className='game-status' aria-live='polite' data-testid='status'>
      {isCellsEmpty && 'Make your first move!'}
      {!!winner && `— Winner is ${winner} —`}
      {isCellsFilled && !winner && `— Draw —`}
      {isTrue && !isComputer && `${currentPlayer}'s turn`}
      {isTrue && isComputer && motivation.current + '!'}
      <br />
      &nbsp;
    </p>
  );
}
