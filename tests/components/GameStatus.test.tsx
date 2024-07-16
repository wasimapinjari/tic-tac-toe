import GameStatus from '@/app/_components/GameStatus';
import useRender from '@/hooks/useRender';
import { testElement } from '../setup';

describe('group', () => {
  const { debug, getByTestId } = useRender(<GameStatus />);
  it('should render status', () => {
    const status = getByTestId('status');
    testElement(status);
  });
});
