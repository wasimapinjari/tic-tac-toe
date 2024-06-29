import { useGameState } from '@/hooks/useGameState';
import { HandleSound, HandleTheme } from '@/types/gameTypes';

export default function Sun({ handleTheme, handleHoverSound }: HandleTheme) {
  const state = useGameState();
  return (
    <button
      type='button'
      onClick={() => handleTheme('dark')}
      onMouseEnter={handleHoverSound}
      className='theme-button'
      aria-label='Turn on the dark mode'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        stroke={state.theme === 'dark' ? '#ddd' : '#333'}
        viewBox='0 0 24 24'
        strokeWidth='1.5'
        className='icon'
        focusable={false}
        aria-hidden={true}
      >
        <filter id='blur'>
          <feGaussianBlur stdDeviation={1} />
        </filter>
        <path
          filter='url(#blur)'
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z'
        />
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z'
        />
      </svg>
    </button>
  );
}
