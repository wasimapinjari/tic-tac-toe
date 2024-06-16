'use client';

import { useGameDispatch } from '@/hooks/useGameDispatch';
import { useGameState } from '@/hooks/useGameState';
import { Children, Theme } from '@/types/gameTypes';
import { useEffect } from 'react';

export default function ThemeProvider({ children }: Children) {
  const state = useGameState();
  const { dispatch } = useGameDispatch();
  useEffect(() => {
    let payload: Theme | null = null;
    if (!state.theme) {
      payload = localStorage.getItem('theme') as Theme;
      dispatch({ type: 'setTheme', payload });
    }
    const userDarkPreferance = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const themeChoice = userDarkPreferance ? 'dark' : 'light';
    const setTheme = payload || state.theme || themeChoice;
    localStorage.setItem('theme', setTheme);
    if (setTheme === 'light') {
      document.documentElement.style.setProperty('--scroll-thumb', '#bbb');
      document.documentElement.style.setProperty('--scroll-track', '#ddd');
      document.documentElement.style.setProperty(
        '--text-shadow',
        '0 0 0.1rem #2229'
      );
    }
    if (setTheme === 'dark') {
      document.documentElement.style.setProperty('--scroll-thumb', '#555');
      document.documentElement.style.setProperty('--scroll-track', '#333');
      document.documentElement.style.setProperty(
        '--text-shadow',
        '0 0 0.12rem white'
      );
    }
  }, [state.theme, dispatch]);

  return (
    <div className='theme' data-theme={state.theme}>
      {children}
    </div>
  );
}
