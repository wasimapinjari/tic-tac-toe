export default function Left() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className='icon'
      focusable={false}
      aria-hidden={true}
      data-testid='left'
    >
      <filter id='blur'>
        <feGaussianBlur stdDeviation={1} />
      </filter>
      <path
        filter='url(#blur)'
        strokeLinecap='round'
        strokeLinejoin='round'
        d='m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
      />
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
      />
    </svg>
  );
}
