import { initialState } from '@/context/GameContextProvider';
import { useGameDispatch } from '@/hooks/useGameDispatch';
import { useGameState } from '@/hooks/useGameState';
import useHelper from '@/hooks/useHelper';
import { InteractionEvent, KeyEvent, InitialState } from '@/types/gameTypes';
import { useEffect, useRef } from 'react';
import GameBody from './GameBody';
import GameHeading from './GameHeading';
import IconContainer from './IconContainer';
import useSound from '@/hooks/useSound';

const validInteractionKeys = [
  'Enter',
  ' ',
  'Backspace',
  '`',
  '~',
  '-',
  '+',
  '*',
  '.',
];

for (let i = 0; i <= 9; i++) {
  validInteractionKeys.push(String(i));
}

for (let i = 65; i <= 90; i++) {
  validInteractionKeys.push(String.fromCharCode(i));
}

for (let i = 97; i <= 122; i++) {
  validInteractionKeys.push(String.fromCharCode(i));
}

export default function Container() {
  const { state } = useGameState();
  const { setInteraction } = useGameDispatch();
  const { loadAudio } = useSound();
  useEffect(() => {
    loadAudio();
  }, [loadAudio]);
  useEffect(() => {
    function handleInteraction(e: InteractionEvent) {
      let skip = true;
      const isKeyEvent = (e: InteractionEvent): e is KeyEvent => {
        return (e as KeyEvent)?.key !== undefined;
      };
      if (isKeyEvent(e)) {
        const { key } = e;
        skip = false;
        validInteractionKeys.forEach((button) => {
          if (key === button) skip = true;
        });
      }
      if (!e.isTrusted) skip = false;
      if (skip) {
        setInteraction(true);
        document.removeEventListener('click', handleInteraction);
        document.removeEventListener('keydown', handleInteraction);
        document.removeEventListener('touchstart', handleInteraction);
      }
    }
    document.addEventListener('click', handleInteraction);
    document.addEventListener('keydown', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);
  }, [setInteraction]);

  const { $, $$ } = useHelper();
  const stateBackup = useRef<InitialState>(initialState);
  useEffect(() => {
    stateBackup.current = state;
  }, [state]);

  useEffect(() => {
    const _ = (id: string) => $(`[data-testid="${id}-button"]`)?.click();

    document.addEventListener('mousedown', (e: MouseEvent) => {
      const { button } = e;
      if (button === 1) {
        e.preventDefault();
        _('redo');
      }
      if (button === 2) _('undo');
    });

    // document.addEventListener('contextmenu', (e: MouseEvent) =>
    //   e.preventDefault()
    // );

    document.addEventListener('keydown', (e: KeyEvent) => {
      const { key } = e;

      const numpadKeys: number[] = [7, 8, 9, 4, 5, 6, 1, 2, 3];
      const tiles = $$('[data-tile]');

      tiles.forEach((tile, i) => {
        if (+e.key === numpadKeys[i]) tile.click();
      });

      if (key === 'z' || key === 'Z' || key === '+') _('undo');

      if (key === 'x' || key === 'X' || key === '-') _('redo');

      if (key === ' ' || key === 'Enter') {
        e.preventDefault();
        _('reset-board');
      }

      if (key === 'Backspace' || key === '0' || key === '`' || key === '~')
        _('reset-score');

      if (key === 'Escape') {
        if ($('[data-testid="modal-close-button"]')) _('modal-close');
        if (!$('[data-testid="modal-close-button"]')) _('reset-board');
      }

      if (key === 'h' || key === 'H') {
        e.preventDefault();
        _('modal-open');
      }

      if (key === '.' || key === 'o' || key === 'O') _('eye');

      if (key === 'CapsLock' || key === '*' || key === 't' || key === 'T')
        _('theme');

      if (key === 'm' || key === 'M') _('music');

      if (key === 's' || key === 'S')
        _(stateBackup.current.chosenPlayer === 'X' ? 'player-o' : 'player-x');

      if (key === 'p' || key === 'P')
        _(stateBackup.current.isComputer ? 'friends' : 'computer');

      if (key === 'd' || key === 'D')
        _(stateBackup.current.isGameEasy ? 'hard' : 'easy');

      if (key === 'i' || key === 'I')
        _(
          stateBackup.current.isInfinityMode
            ? 'disable-infinity'
            : 'enable-infinity'
        );

      if (key === 'c' || key === 'C') {
        _(stateBackup.current.isChaosMode ? 'disable-chaos' : 'enable-chaos');
      }
    });
  }, [$, $$]);

  return (
    <div className='container'>
      <div className='game'>
        <IconContainer />
        <GameHeading />
        <GameBody />
      </div>
    </div>
  );
}
