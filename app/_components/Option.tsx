import { OptionContext } from '@/context/contexts';
import useOption from '@/hooks/useOption';
import { Children as ChildrenProps, OptionButton } from '@/types/gameTypes';
import { removeExtraSpaces } from '@/utils/helperFunctions';
import {
  Children,
  cloneElement,
  isValidElement,
  JSXElementConstructor,
  MouseEventHandler,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import ButtonWrapper from './Button';
import { useGameState } from '@/hooks/useGameState';

export default function Option({ children }: ChildrenProps) {
  const [heading, setHeading] = useState('');
  return (
    <OptionContext.Provider value={{ heading, setHeading }}>
      <div>{children}</div>
    </OptionContext.Provider>
  );
}

function Heading({ children }: ChildrenProps) {
  const { setHeading } = useOption();
  const child = Children.toArray(children);
  if (typeof child[0] !== 'string' || child.length > 1)
    throw new Error('Heading must be string with only one child');
  let heading = '';
  if (typeof children === 'string')
    heading = removeExtraSpaces(children).join('-');
  useEffect(() => setHeading(heading), [setHeading, heading]);
  return <h2 id={heading + '-label'}>{children}</h2>;
}

function Buttons({ children }: ChildrenProps) {
  const { heading } = useOption();
  const buttons: ReactElement<any, string | JSXElementConstructor<any>>[] = [];
  Children.forEach(children, (child) => {
    if (isValidElement(child)) if (child.type === Button) buttons.push(child);
  });
  return (
    <div
      className='button-group'
      aria-labelledby={heading ? heading + '-label' : undefined}
      role='group'
    >
      {buttons.map((button, index) => {
        const key = index;
        if (buttons.length < 2)
          return cloneElement(button, {
            className: 'single',
            key,
          });
        if (index !== 0 && index !== buttons.length - 1)
          return cloneElement(button, { className: 'middle', key });
        if (index === 0)
          return cloneElement(button, { className: 'left', key });
        if (index === buttons.length - 1)
          return cloneElement(button, { className: 'right', key });
      })}
    </div>
  );
}

function Button({
  onClick,
  active,
  ariaLabel,
  key,
  children,
  className,
  ...props
}: OptionButton) {
  const activeClass = active ? ' active' : '';
  const { isLoading } = useGameState();
  return (
    <ButtonWrapper
      onClick={onClick}
      className={'button' + [activeClass, className].join(' ')}
      aria-pressed={active}
      aria-label={ariaLabel}
      disabled={isLoading}
      key={key}
      {...props}
    >
      {children}
    </ButtonWrapper>
  );
}

Option.Heading = Heading;
Option.Buttons = Buttons;
Option.Button = Button;
