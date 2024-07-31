import { NavLink } from 'react-router-dom';

import * as Styles from './styles';

export function Header() {
  return (
    <Styles.Container>
      <Styles.Content>
        <Styles.Buttons>
          <NavLink to="/">Produtos</NavLink>
          <NavLink to="/new">Novo Produto</NavLink>
        </Styles.Buttons>
      </Styles.Content>
    </Styles.Container>
  );
}
