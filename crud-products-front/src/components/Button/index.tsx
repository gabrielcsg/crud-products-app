import { ButtonHTMLAttributes } from 'react';

import * as Styles from './styles';
import { Loading } from '../Loading';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  isLoading?: boolean;
}

export function Button({ title, isLoading, ...rest }: Props) {
  return (
    <Styles.Button disabled={isLoading} {...rest}>
      {isLoading ? <Loading type="secondary" /> : title}
    </Styles.Button>
  );
}
