import ThemeButton from '@/app/_components/icon-buttons/ThemeButton';
import ThemeProvider from '@/app/_components/ThemeProvider';
import useRender from '@/hooks/useRender';
import { testElement, testHTML } from '@/tests/setup';

describe('group', () => {
  const { debug, click, getByRole, getByTestId } = useRender(
    <ThemeProvider>
      <ThemeButton />
    </ThemeProvider>
  );
  const grabConstants = () => {
    const themeButton = getByRole('button', {
      name: /mode/i,
    });
    const themeContainer = getByTestId('theme');
    const userPreferTheme = themeButton.ariaLabel?.includes('light mode')
      ? 'light'
      : 'dark';
    const userPreferThemeOpposite =
      userPreferTheme === 'dark' ? 'light' : 'dark';
    return {
      themeButton,
      themeContainer,
      userPreferTheme,
      userPreferThemeOpposite,
    };
  };
  it('should render the theme button with svg icon', () => {
    const { themeButton } = grabConstants();
    testElement(themeButton);
    testHTML(themeButton, 'svg');
  });
  it('should toggle theme svg icon', async () => {
    const { themeButton, userPreferThemeOpposite } = grabConstants();
    await click(themeButton);
    testElement(themeButton);
    testHTML(themeButton, userPreferThemeOpposite + ' mode');
  });
  it('should toggle theme', async () => {
    const {
      themeButton,
      themeContainer,
      userPreferTheme,
      userPreferThemeOpposite,
    } = grabConstants();
    // theme data is retrive from local storage!
    await click(themeButton);
    testHTML(themeContainer, `data-theme="${userPreferTheme}"`);
    await click(themeButton);
    testHTML(themeContainer, `data-theme="${userPreferThemeOpposite}"`);
  });
});
