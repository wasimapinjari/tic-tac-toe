import { useGameState } from '@/hooks/useGameState';
import { HandleSound } from '@/types/gameTypes';

export default function SoundOff({
  handleSound,
  handleHoverSound,
}: HandleSound) {
  const state = useGameState();
  return (
    <button
      type='button'
      aria-label='Turn the music off'
      onClick={handleSound}
      onMouseEnter={handleHoverSound}
      className='sound-button'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth='1.5'
        stroke={state.theme === 'dark' ? '#ddd' : '#333'}
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
          d='M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z'
        />
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z'
        />
      </svg>
    </button>
  );
}
