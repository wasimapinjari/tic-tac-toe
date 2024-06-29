import Board from './Board';
import MenuBox from './MenuBox';

export default function GameBox() {
  return (
    <main className='game-box-group'>
      <Board />
      <MenuBox />
    </main>
  );
}
