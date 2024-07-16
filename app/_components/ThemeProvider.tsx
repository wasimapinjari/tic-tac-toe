'use client';

import { useGameDispatch } from '@/hooks/useGameDispatch';
import { useGameState } from '@/hooks/useGameState';
import { Children, Theme } from '@/types/gameTypes';
import { useEffect } from 'react';

export default function ThemeProvider({ children }: Children) {
  const { theme } = useGameState();
  const { setTheme } = useGameDispatch();
  useEffect(() => {
    const userDarkPreference = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    let payload: Theme = userDarkPreference ? 'dark' : 'light';
    if (!theme) {
      payload = (localStorage.getItem('theme') as Theme) || payload;
      setTheme(payload);
    }
    const newTheme = theme || payload;
    localStorage.setItem('theme', newTheme);
  }, [theme, setTheme]);

  return (
    <div className='theme' data-theme={theme} data-testid='theme'>
      {children}
    </div>
  );
}
