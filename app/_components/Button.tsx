import useSound from '@/hooks/useSound';
import { ButtonProps } from '@/types/gameTypes';

export default function Button(props: ButtonProps) {
  const { handleHoverSound } = useSound();
  return (
    <button type='button' onMouseEnter={handleHoverSound} {...props}>
      {props.children}
    </button>
  );
}
