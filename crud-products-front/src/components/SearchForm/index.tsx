import { Button } from '../Button';
import * as Styles from './styles';

export function SearchForm() {
  return (
    <Styles.Container>
      <input type="text" placeholder="Busque pelo código de produto..." />

      <Button title="Buscar" type="submit" />
    </Styles.Container>
  );
}
