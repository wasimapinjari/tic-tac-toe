import InvisibleBoxes from '@/app/_components/InvisibleBoxes';
import useRender from '@/hooks/useRender';
import { testElement } from '../setup';

describe('group', () => {
  const { debug, getAllByRole } = useRender(<InvisibleBoxes />);
  it('should render invisible boxes', () => {
    const invisibleBoxes = getAllByRole('generic', {
      hidden: true,
    });
    Array.from({ length: 13 }).forEach((_, index) =>
      testElement(invisibleBoxes[index])
    );
  });
});
