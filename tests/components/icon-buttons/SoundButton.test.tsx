import SoundButton from '@/app/_components/icon-buttons/SoundButton';
import useRender from '@/hooks/useRender';
import { testElement, testHTML } from '@/tests/setup';

describe('group', () => {
  const { debug, click, getByRole, getByTestId } = useRender(<SoundButton />);
  const grabConstants = () => {
    const musicButton = getByRole('button', {
      name: /music/i,
    });
    return {
      musicButton,
    };
  };
  it('should render the music button with svg', () => {
    const { musicButton } = grabConstants();
    testElement(musicButton);
    testHTML(musicButton, 'svg');
  });
  it.skip('should play music on click', async () => {
    const { musicButton } = grabConstants();
    const playMock = vi.fn();
    window.Audio = vi.fn().mockImplementation(() => ({
      play: playMock,
    }));
    Element.prototype.addEventListener = () => vi.fn();
    await click(musicButton);
    debug();
    testElement(musicButton);
    expect(playMock).toHaveBeenCalled();
  });
  it('should toggle label and svg icon on click', async () => {
    const { musicButton } = grabConstants();
    const soundOffIcon = getByTestId('sound-off');
    testElement(soundOffIcon);
    testHTML(musicButton, 'music on');
    await click(musicButton);
    const soundOnIcon = getByTestId('sound-on');
    testElement(soundOnIcon);
    testHTML(musicButton, 'music off');
  });
});
