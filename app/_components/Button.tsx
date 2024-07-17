import useSound from '@/hooks/useSound';
import { ButtonProps } from '@/types/gameTypes';

export default function Button(props: ButtonProps) {
  const { hoverSound } = useSound();
  return (
    <button type='button' onMouseEnter={hoverSound} {...props}>
      {props.children}
    </button>
  );
}
