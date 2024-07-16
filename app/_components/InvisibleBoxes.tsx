import { Children } from '@/types/gameTypes';

export default function InvisibleBoxes() {
  const createLine = (line: string) => <div data-line={line} />;
  return (
    <>
      <InvisibleBox>
        {createLine('[0, 3, 6]')}
        {createLine('[1, 4, 7]')}
        {createLine('[2, 5, 8]')}
      </InvisibleBox>
      <InvisibleBox className='transform'>
        {createLine('[0, 1, 2]')}
        {createLine('[3, 4, 5]')}
        {createLine('[6, 7, 8]')}
      </InvisibleBox>
      <InvisibleBox className='transform45'>
        {createLine('[2, 4, 6]')}
      </InvisibleBox>
      <InvisibleBox className='transform-45'>
        {createLine('[0, 4, 8]')}
      </InvisibleBox>
    </>
  );
}

function InvisibleBox({
  className = '',
  children,
}: { className?: string } & Children) {
  return (
    <div
      className={`invisible-box-vertical ${className}`.trim()}
      aria-hidden='true'
    >
      {children}
    </div>
  );
}
