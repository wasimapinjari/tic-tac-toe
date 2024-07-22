import { Dancing_Script } from 'next/font/google';
const dancing = Dancing_Script({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false,
});

export default function GameHeading() {
  return (
    <header className={dancing.className}>
      <h1>Tic-Tac-Toe</h1>
      <span aria-hidden='true' className='heading-shadow'>
        Tic-Tac-Toe
      </span>
    </header>
  );
}
