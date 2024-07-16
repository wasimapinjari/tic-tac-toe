'use client';

import GameContextProvider from '@/context/GameContextProvider';
import Container from './Container';
import GrainyTexture from './GrainyTexture';
import ThemeProvider from './ThemeProvider';

export default function Game() {
  return (
    <GameContextProvider>
      <ThemeProvider>
        <GrainyTexture />
        <div className='background' />
        <Container />
      </ThemeProvider>
    </GameContextProvider>
  );
}
