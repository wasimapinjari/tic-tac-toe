'use client';

import { useGameDispatch } from '@/hooks/useGameDispatch';
import { useGameState } from '@/hooks/useGameState';
import { Children, Theme } from '@/types/gameTypes';
import { useEffect } from 'react';

export default function ThemeProvider({ children }: Children) {
  const state = useGameState();
  const { setTheme } = useGameDispatch();
  useEffect(() => {
    const userDarkPreferance = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const themeChoice = userDarkPreferance ? 'dark' : 'light';
    let payload: Theme = themeChoice;
    if (!state.theme) {
      payload = (localStorage.getItem('theme') as Theme) || payload;
      setTheme(payload);
    }
    const newTheme = state.theme || payload;
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'light') {
      document.documentElement.style.setProperty('--scroll-thumb', '#bbb');
      document.documentElement.style.setProperty('--scroll-track', '#ddd');
      document.documentElement.style.setProperty(
        '--text-shadow',
        '0 0 0.1rem #2229'
      );
    }
    if (newTheme === 'dark') {
      document.documentElement.style.setProperty('--scroll-thumb', '#555');
      document.documentElement.style.setProperty('--scroll-track', '#333');
      document.documentElement.style.setProperty(
        '--text-shadow',
        '0 0 0.12rem white'
      );
    }
    const color = state.theme === 'dark' ? 'lightgreen' : 'green';
    document.documentElement.style.setProperty('--infinity-color', color);
  }, [state.theme, setTheme]);

  return (
    <div className='theme' data-theme={state.theme}>
      {children}
    </div>
  );
}
