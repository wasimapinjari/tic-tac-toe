import GameEnvironment from '@/app/_components/GameEnvironment';
import useRender from '@/hooks/useRender';
import { delay } from '@/utils/helperFunctions';
import { act } from 'react';
import { testElement, testHTML } from '../setup';

describe('group', () => {
  const { debug, click, getByRole, getAllByRole, getAllByText } = useRender(
    <GameEnvironment />
  );
  const grabConstants = () => {
    const boardResetButton = getByRole('button', {
      name: /board/i,
    });
    return {
      boardResetButton,
    };
  };
  it('should render board reset button', () => {
    const { boardResetButton } = grabConstants();
    testElement(boardResetButton);
  });
  it('should reset board after clicking reset button', async () => {
    const gridCells = getAllByRole('gridcell');
    const { boardResetButton } = grabConstants();
    await click(gridCells[0]);
    const spanWithX = getAllByText('X')[0];
    await act(async () => delay());
    await click(boardResetButton);
    testHTML(spanWithX, '<span />');
  });
});
