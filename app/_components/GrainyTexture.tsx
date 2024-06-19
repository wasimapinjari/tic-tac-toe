export default function GrainyTexture() {
  return (
    <svg className='grainy-texture'>
      <filter id='grainy'>
        <feTurbulence
          type='fractalNoise'
          baseFrequency='1'
          numOctaves='4'
          stitchTiles='stitch'
        />
      </filter>
      <rect width='100%' height='100%' filter='url(#grainy)' />
    </svg>
  );
}
