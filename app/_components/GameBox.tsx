import Board from './Board';
import MenuBox from './MenuBox';

export default function GameBox() {
  return (
    <div className='game-box-group'>
      <Board />
      <MenuBox />
    </div>
  );
}
