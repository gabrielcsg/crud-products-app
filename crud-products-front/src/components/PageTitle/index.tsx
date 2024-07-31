import * as Styles from './styles';

interface IProps {
  title: string;
}

export function PageTitle({ title }: IProps) {
  return <Styles.Title>{title}</Styles.Title>;
}
