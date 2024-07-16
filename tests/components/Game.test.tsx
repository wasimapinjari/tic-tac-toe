import Game from '@/app/_components/Game';
import useRender from '@/hooks/useRender';
import { delayUpdate, testElement, testHTML, testText } from '../setup';
import { doThisWordsExist } from '@/utils/helperFunctions';

describe('group', () => {
  const { debug, click, getByRole, getAllByRole, getByTestId } = useRender(
    <Game />
  );
  const grabConstants = () => {
    const grid = getByRole('grid');
    const gridCells = getAllByRole('gridcell');
    const selectOButton = getByRole('button', {
      name: (name) => doThisWordsExist(name, /\bO\b/i, /player/i),
    });
    const friendsButton = getByRole('button', {
      name: /friends/i,
    });
    const infinityButton = getByRole('button', {
      name: (name) => doThisWordsExist(name, /enable/i, /infinity/i),
    });
    const chaosButton = getByRole('button', {
      name: (name) => doThisWordsExist(name, /enable/i, /chaos/i),
    });
    const clickCell = async (index: number, updateDelay = 0.1) => {
      await click(gridCells[index]);
      await delayUpdate(updateDelay);
    };
    const clickCellSequence = async (...cellIndexes: number[]) => {
      for (const index of cellIndexes) {
        await clickCell(index);
      }
    };
    const clickButtons = async (...buttons: HTMLElement[]) => {
      for (const button of buttons) {
        await click(button);
      }
    };
    return {
      grid,
      friendsButton,
      selectOButton,
      infinityButton,
      chaosButton,
      clickCell,
      clickCellSequence,
      clickButtons,
    };
  };
  describe('eye button', () => {
    it('should hide game options', async () => {
      const eyeButton = getByRole('button', {
        name: /hide/i,
      });
      await click(eyeButton);
      const gameContent = getByRole('main');
      testElement(gameContent);
      testHTML(gameContent, 'remove-double-columns');
    });
  });

  describe('gameplay: normal mode', () => {
    describe('play with friends as X', () => {
      it('should win the game & display correct winner X', async () => {
        const { grid, friendsButton, clickCellSequence } = grabConstants();
        await click(friendsButton);
        await clickCellSequence(0, 1, 4, 5, 8, 0);
        await delayUpdate(0.3);
        const status = getByTestId('status');
        testText(status, /winner/i, /x/i);
        testHTML(grid, 'visible');
      });
      it('should win the game & display correct winner O', async () => {
        const { grid, clickCellSequence, friendsButton } = grabConstants();
        await click(friendsButton);
        await clickCellSequence(1, 0, 5, 4, 7, 8);
        await delayUpdate(0.3);
        const status = getByTestId('status');
        testText(status, /winner/i, /o/i);
        testHTML(grid, 'visible');
      });
      it('should draw the game & display draw', async () => {
        const { clickCellSequence, friendsButton } = grabConstants();
        await click(friendsButton);
        await clickCellSequence(0, 1, 2, 6, 7, 8, 3, 4, 5);
        await delayUpdate(0.3);
        const status = getByTestId('status');
        testText(status, /draw/i);
      });
    });
    describe('play with friends as O', () => {
      it('should win the game & display correct winner O', async () => {
        const {
          grid,
          clickButtons,
          clickCellSequence,
          friendsButton,
          selectOButton,
        } = grabConstants();
        await clickButtons(selectOButton, friendsButton);
        await clickCellSequence(0, 1, 4, 5, 8);
        await delayUpdate(0.3);
        const status = getByTestId('status');
        testText(status, /winner/i, /o/i);
        testHTML(grid, 'visible');
      });
      it('should win the game & display correct winner X', async () => {
        const {
          grid,
          clickButtons,
          clickCellSequence,
          friendsButton,
          selectOButton,
        } = grabConstants();
        await clickButtons(selectOButton, friendsButton);
        await clickCellSequence(1, 0, 5, 4, 7, 8);
        await delayUpdate(0.3);
        const status = getByTestId('status');
        testText(status, /winner/i, /x/i);
        testHTML(grid, 'visible');
      });
      it('should draw the game & display draw', async () => {
        const {
          clickButtons,
          clickCellSequence,
          friendsButton,
          selectOButton,
        } = grabConstants();
        await clickButtons(selectOButton, friendsButton);
        await clickCellSequence(0, 1, 2, 6, 7, 8, 3, 4, 5);
        await delayUpdate(0.3);
        const status = getByTestId('status');
        testText(status, /draw/i);
      });
    });
    describe('play with computer as X', () => {
      it('should make a move', async () => {
        const { grid, clickCell } = grabConstants();
        await clickCell(0, 0.3);
        testHTML(grid, '<span>O</span>');
      });
    });
    describe('play with computer as O', () => {
      it('should make a move', async () => {
        const { grid, clickCell, selectOButton } = grabConstants();
        await click(selectOButton);
        await clickCell(0, 0.3);
        testHTML(grid, '<span>X</span>');
      });
    });
  });

  describe('gameplay: infinity mode', () => {
    describe('play with friends as X', () => {
      it('should randomly select a grid cell for infinity span', async () => {
        const {
          grid,
          clickButtons,
          clickCellSequence,
          friendsButton,
          infinityButton,
        } = grabConstants();
        await clickButtons(friendsButton, infinityButton);
        await clickCellSequence(0, 1, 2, 3, 4, 5);
        await delayUpdate(0.3);
        testHTML(grid, 'infinity-span');
      });
    });
    describe('play with friends as O', () => {
      it('should randomly select a grid cell for infinity span', async () => {
        const {
          grid,
          clickButtons,
          clickCellSequence,
          friendsButton,
          selectOButton,
          infinityButton,
        } = grabConstants();
        await clickButtons(selectOButton, friendsButton, infinityButton);
        await clickCellSequence(0, 1, 2, 3, 4, 5);
        await delayUpdate(0.3);
        testHTML(grid, 'infinity-span');
      });
    });
    describe('play with computer as X', () => {
      it('should make a move', async () => {
        const { grid, clickCell, infinityButton } = grabConstants();
        await click(infinityButton);
        await clickCell(0, 0.3);
        testHTML(grid, '<span>O</span>');
      });
    });
    describe('play with computer as O', () => {
      it('should make a move', async () => {
        const { grid, clickCell, clickButtons, selectOButton, infinityButton } =
          grabConstants();
        await clickButtons(selectOButton, infinityButton);
        await clickCell(0, 0.3);
        testHTML(grid, '<span>X</span>');
      });
    });
  });

  describe('gameplay: chaos mode', () => {
    describe('play with friends as X', () => {
      it('should not contain O after making first move', async () => {
        const { grid, clickCell, clickButtons, friendsButton, chaosButton } =
          grabConstants();
        await clickButtons(friendsButton, chaosButton);
        await clickCell(0, 0.3);
        expect(grid).not.toContainHTML('<span>O</span>');
      });
    });
    describe('play with friends as O', () => {
      it('should not contain X after making first move', async () => {
        const {
          grid,
          clickCell,
          clickButtons,
          friendsButton,
          chaosButton,
          selectOButton,
        } = grabConstants();
        await clickButtons(selectOButton, friendsButton, chaosButton);
        await clickCell(0, 0.3);
        expect(grid).not.toContainHTML('<span>X</span>');
      });
    });
    describe('play with computer as X', () => {
      it('should contain O after making first move', async () => {
        const { grid, clickCell, chaosButton } = grabConstants();
        await click(chaosButton);
        await clickCell(0, 0.7);
        testHTML(grid, '<span>O</span>');
      });
    });
    describe('play with computer as O', () => {
      it('should contain X after making first move', async () => {
        const { grid, clickCell, clickButtons, chaosButton, selectOButton } =
          grabConstants();
        await clickButtons(selectOButton, chaosButton);
        await clickCell(0, 0.7);
        testHTML(grid, '<span>X</span>');
      });
    });
  });
});
