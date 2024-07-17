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
import BoardOptions from './BoardOptions';

export default function GameEnvironment() {
  return (
    <section className='group-environment'>
      <BoardOptions />
      <Board />
      <GameScore />
      <GameStatus />
    </section>
  );
}
