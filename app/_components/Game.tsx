import GameContextProvider from '@/context/GameContextProvider';
import Heading from './Heading';
import GameBox from './GameBox';
import ThemeProvider from './ThemeProvider';
import GrainyTexture from './GrainyTexture';

export default function Game() {
  return (
    <GameContextProvider>
      <ThemeProvider>
        <GrainyTexture />
        <div className='texture-background' />
        <div className='game'>
          <Heading />
          <GameBox />
        </div>
      </ThemeProvider>
    </GameContextProvider>
  );
}
