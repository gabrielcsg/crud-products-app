import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
} from 'react';
import * as Styles from './styles';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { error, ...rest },
  ref
) => {
  return (
    <>
      <Styles.InputContainer ref={ref} error={!!error} {...rest} />
      {!!error && <Styles.ErrorMessage>{error}</Styles.ErrorMessage>}
    </>
  );
};

export const Input = forwardRef(InputBase);
