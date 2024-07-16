import GameOptions from '@/app/_components/GameOptions';
import useRender from '@/hooks/useRender';
import { doThisWordsExist, spreadArray } from '@/utils/helperFunctions';
import { testAttribute, testElement, testText } from '../setup';

describe('group', () => {
  const { debug, click, getByRole } = useRender(<GameOptions />);
  const tests = [
    {
      heading: 'select player',
      headingName: /player/i,
      buttonLeftName: [/\bX\b/i, /player/i],
      buttonRightName: [/\bO\b/i, /player/i],
      buttonLeftText: /X/i,
      buttonRightText: /O/i,
    },
    {
      heading: 'play with',
      buttonLeftName: /friends/i,
      buttonRightName: /computer/i,
    },
    {
      heading: 'difficulty',
      buttonLeftName: /easy/i,
      buttonRightName: /hard/i,
    },
    {
      heading: 'infinity mode',
      buttonLeftName: [/enable/i, /infinity/i],
      buttonRightName: [/disable/i, /infinity/i],
      buttonLeftText: /enable/i,
      buttonRightText: /disable/i,
    },
    {
      heading: 'chaos mode',
      buttonLeftName: [/enable/i, /chaos/i],
      buttonRightName: [/disable/i, /chaos/i],
      buttonLeftText: /enable/i,
      buttonRightText: /disable/i,
    },
  ];

  describe.each(tests)(
    '$heading',
    ({
      heading,
      headingName = new RegExp(`^${heading}$`, 'i'),
      buttonLeftName,
      buttonRightName,
      buttonLeftText = buttonLeftName,
      buttonRightText = buttonRightName,
    }) => {
      const grabConstants = () => {
        const buttonLeft = getByRole('button', {
          name: (name) =>
            doThisWordsExist(name, ...spreadArray(buttonLeftName)),
        });
        const buttonRight = getByRole('button', {
          name: (name) =>
            doThisWordsExist(name, ...spreadArray(buttonRightName)),
        });
        return {
          buttonLeft,
          buttonRight,
        };
      };
      it(`should render the heading: ${heading}`, () => {
        const heading = getByRole('heading', {
          name: headingName,
        });
        testElement(heading);
        testText(heading, headingName);
      });
      it('should render buttons with text content', async () => {
        const { buttonLeft, buttonRight } = grabConstants();
        testElement(buttonLeft);
        testElement(buttonRight);
        testText(buttonLeft, buttonLeftText as RegExp);
        testText(buttonRight, buttonRightText as RegExp);
      });
      it('should toggle state on button click', async () => {
        const { buttonLeft, buttonRight } = grabConstants();
        await click(buttonLeft);
        testAttribute(buttonLeft, 'aria-pressed', 'true');
        testAttribute(buttonRight, 'aria-pressed', 'false');
        await click(buttonRight);
        testAttribute(buttonLeft, 'aria-pressed', 'false');
        testAttribute(buttonRight, 'aria-pressed', 'true');
      });
    }
  );
});
