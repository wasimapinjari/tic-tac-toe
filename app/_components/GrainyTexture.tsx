export default function GrainyTexture() {
  return (
    <svg className='grainy-texture'>
      <filter id='grainy'>
        <feTurbulence
          type='fractalNoise'
          baseFrequency={0.8}
          stitchTiles='stitch'
          numOctaves={4}
        />
      </filter>
      <rect height='100%' width='100%' filter='url(#grainy)' />
    </svg>
  );
}
