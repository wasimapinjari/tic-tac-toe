import GameContextProvider from '@/context/GameContextProvider';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode } from 'react';

export default function useRender(renderLogic: ReactNode) {
  beforeEach(() => {
    render(<GameContextProvider>{renderLogic}</GameContextProvider>);
  });
  afterEach(() => cleanup());
  const user = userEvent.setup();
  return {
    ...user,
    ...screen,
  };
}
