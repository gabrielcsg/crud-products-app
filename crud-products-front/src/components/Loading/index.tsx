import * as Styles from './styles';

type Props = {
  type?: Styles.TypeLoading;
};

export function Loading({ type = 'primary' }: Props) {
  return (
    <Styles.Container type={type}>
      <svg viewBox="25 25 50 50">
        <circle r="20" cy="50" cx="50"></circle>
      </svg>
    </Styles.Container>
  );
}
