import GameEnvironment from './GameEnvironment';
import GameOptions from './GameOptions';

export default function GameBody() {
  return (
    <main className='game-content'>
      <GameEnvironment />
      <GameOptions />
    </main>
  );
}
