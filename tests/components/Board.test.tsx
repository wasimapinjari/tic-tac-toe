import Board from '@/app/_components/Board';
import useRender from '@/hooks/useRender';
import { testElement } from '../setup';

describe('group', () => {
  const { debug, getByRole, getAllByRole } = useRender(<Board />);
  it('should render grid', () => {
    const grid = getByRole('grid');
    testElement(grid);
  });
  it('should render grid cells', async () => {
    const gridCells = getAllByRole('gridcell');
    Array.from({ length: 9 }).forEach((_, index) =>
      testElement(gridCells[index])
    );
  });
});
