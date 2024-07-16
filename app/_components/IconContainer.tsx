import EyeButton from './icon-buttons/EyeButton';
import HelpButton from './icon-buttons/HelpButton';
import SoundButton from './icon-buttons/SoundButton';
import ThemeButton from './icon-buttons/ThemeButton';

export default function IconContainer() {
  return (
    <div className='icon-container'>
      <HelpButton />
      <EyeButton />
      <ThemeButton />
      <SoundButton />
    </div>
  );
}
