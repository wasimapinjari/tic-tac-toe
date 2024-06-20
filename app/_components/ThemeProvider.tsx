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
    const userDarkPreferance = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    payload = userDarkPreferance ? 'dark' : 'light';
    if (!state.theme) {
      payload = (localStorage.getItem('theme') as Theme) || payload;
      dispatch({ type: 'setTheme', payload });
    }
    const setTheme = state.theme || payload;
    localStorage.setItem('theme', setTheme);
    if (setTheme === 'light') {
      document.documentElement.style.setProperty('--scroll-thumb', '#bbb');
      document.documentElement.style.setProperty('--scroll-track', '#ddd');
      document.documentElement.style.setProperty(
        '--text-shadow',
        '0 0 0.1rem #2229'
      );
      document
        .querySelector('[name="theme-color"]')
        ?.setAttribute('content', 'white');
    }
    if (setTheme === 'dark') {
      document.documentElement.style.setProperty('--scroll-thumb', '#555');
      document.documentElement.style.setProperty('--scroll-track', '#333');
      document.documentElement.style.setProperty(
        '--text-shadow',
        '0 0 0.12rem white'
      );
      document
        .querySelector('[name="theme-color"]')
        ?.setAttribute('content', '#222');
    }
  }, [state.theme, dispatch]);

  return (
    <>
      <div className='theme' data-theme={state.theme}>
        {children}
      </div>
    </>
  );
}
