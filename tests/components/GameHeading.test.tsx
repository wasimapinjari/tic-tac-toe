import GameHeading from '@/app/_components/GameHeading';
import useRender from '@/hooks/useRender';
import { testElement, testText } from '../setup';

describe('group', () => {
  const { debug, getByRole, getAllByRole } = useRender(<GameHeading />);
  const testHeading = (element: HTMLElement) => {
    testElement(element);
    testText(element, 'Tic-Tac-Toe');
  };
  it('should render the heading', () => {
    const heading = getByRole('heading');
    testHeading(heading);
  });
  it('should render the heading shadow', () => {
    const headingShadow = getAllByRole('generic', {
      hidden: true,
    })[1];
    testHeading(headingShadow);
  });
});
