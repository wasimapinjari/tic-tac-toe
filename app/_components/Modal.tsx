import { ModalContext } from '@/context/contexts';
import useActions from '@/hooks/useActions';
import useClick from '@/hooks/useClick';
import useModal from '@/hooks/useModal';
import {
  Children as ChildrenProps,
  ModalContent,
  ModalContents,
  ModalIcon,
  ModalReducerActions,
  ModalState,
} from '@/types/gameTypes';
import { insertProperties } from '@/utils/helperFunctions';
import {
  Children,
  isValidElement,
  JSXElementConstructor,
  ReactElement,
  useReducer,
} from 'react';
import Button from './Button';
import Option from './Option';

const initialState: ModalState = { isOpen: false, current: 0 };

const reducer = (state: typeof initialState, action: ModalReducerActions) => {
  const { type, payload } = action;
  const newState = insertProperties(state, payload);
  switch (type) {
    case 'setOpen': {
      return newState('isOpen');
    }
    case 'setCurrent': {
      return newState('current');
    }
  }
};

export default function Modal({ children }: ChildrenProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const action = useActions<
    ModalReducerActions,
    ModalReducerActions['type'],
    ModalReducerActions['payload']
  >(dispatch);
  const setOpen = action('setOpen');
  const setCurrent = action('setCurrent');
  return (
    <ModalContext.Provider value={{ state, setOpen, setCurrent }}>
      {children}
    </ModalContext.Provider>
  );
}

function OpenIcon({ children, ariaLabel }: ModalIcon) {
  const { setOpen } = useModal();
  const handleClick = useClick();
  return (
    <Button
      onClick={handleClick(setOpen)(true)}
      aria-label={ariaLabel}
      data-testid='modal-open-button'
    >
      {children}
    </Button>
  );
}

function CloseIcon({ children, ariaLabel }: ModalIcon) {
  const {
    setOpen,
    state: { isOpen },
  } = useModal();
  const handleClick = useClick();
  return (
    isOpen && (
      <Button
        onClick={handleClick(setOpen)(false)}
        aria-label={ariaLabel}
        data-testid='modal-close-button'
      >
        {children}
      </Button>
    )
  );
}

function Overlay({ children }: ChildrenProps) {
  const {
    state: { isOpen, current },
    setCurrent,
  } = useModal();
  const handleClick = useClick();
  let closeButton;
  const contents: ModalContents[] = [];
  Children.forEach(children, (child) => {
    if (isValidElement(child)) {
      if (child.type === CloseIcon) closeButton = child;
      if (child.type === Content)
        contents.push({
          key: crypto.randomUUID(),
          tabName: child.props.tabName,
          jsx: child,
        });
    }
  });
  return (
    isOpen && (
      <div className='overlay'>
        <div className='overlay-header'>
          {closeButton}
          <div className='overlay-tabs'>
            <Option>
              <Option.Buttons>
                {contents.map((content, index) => {
                  return (
                    <Option.Button
                      onClick={handleClick(setCurrent)(index)}
                      active={current === index}
                      ariaLabel='View Shortcuts'
                      key={content.key}
                    >
                      {content.tabName}
                    </Option.Button>
                  );
                })}
              </Option.Buttons>
            </Option>
          </div>
        </div>
        <div className='overlay-content'>{contents[current]?.jsx}</div>
      </div>
    )
  );
}

function Content({ children, tabName }: ModalContent) {
  return children;
}

Modal.OpenIcon = OpenIcon;
Modal.CloseIcon = CloseIcon;
Modal.Overlay = Overlay;
Modal.Content = Content;
