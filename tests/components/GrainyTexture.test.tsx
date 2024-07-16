import GrainyTexture from '@/app/_components/GrainyTexture';
import useRender from '@/hooks/useRender';
import { testElement } from '../setup';

describe('group', () => {
  const { debug, getByTestId } = useRender(<GrainyTexture />);
  it('should render invisible boxes', () => {
    const grainyTexture = getByTestId('grainy-texture');
    testElement(grainyTexture);
  });
});
