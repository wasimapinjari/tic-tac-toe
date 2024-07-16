import EyeButton from '@/app/_components/icon-buttons/EyeButton';
import useRender from '@/hooks/useRender';
import { testElement, testHTML } from '@/tests/setup';
describe('group', () => {
  const { debug, click, getByRole, getByTestId } = useRender(<EyeButton />);
  const grabConstants = () => {
    const eyeButton = getByRole('button', {
      name: /hide/i,
    });
    return {
      eyeButton,
    };
  };
  it('should render the eye button with svg', () => {
    const { eyeButton } = grabConstants();
    testElement(eyeButton);
    testHTML(eyeButton, 'svg');
  });
  it('should toggle label and svg icon on click', async () => {
    const { eyeButton } = grabConstants();
    const showIcon = getByTestId('show');
    testElement(showIcon);
    testHTML(eyeButton, 'show');
    await click(eyeButton);
    const hideIcon = getByTestId('hide');
    testElement(hideIcon);
    testHTML(eyeButton, 'hide');
  });
});
