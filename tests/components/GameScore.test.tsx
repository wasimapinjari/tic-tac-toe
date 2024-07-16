import GameScore from '@/app/_components/GameScore';
import useRender from '@/hooks/useRender';
import { testElement } from '../setup';

describe('group', () => {
  const { debug, getByRole, getByTestId } = useRender(<GameScore />);
  it('should render score reset button', () => {
    const scoreResetButton = getByRole('button', {
      name: /score/i,
    });
    testElement(scoreResetButton);
  });
  it('should render score', async () => {
    const score = getByTestId('score');
    testElement(score);
  });
});
