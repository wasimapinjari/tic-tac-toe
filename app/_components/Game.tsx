import GameContextProvider from '@/context/GameContextProvider';
import Heading from './Heading';
import GameBox from './GameBox';
import ThemeProvider from './ThemeProvider';

export default function Game() {
  return (
    <GameContextProvider>
      <ThemeProvider>
        <div className='game'>
          <Heading />
          <GameBox />
        </div>
      </ThemeProvider>
    </GameContextProvider>
  );
}
