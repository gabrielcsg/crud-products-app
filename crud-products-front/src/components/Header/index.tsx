import { useNavigate } from 'react-router-dom';
import { Button } from '../Button';

import * as Styles from './styles';

interface Props {
  title: string;
}

export function Header({ title }: Props) {
  const navigate = useNavigate();

  function handleNewProduct() {
    navigate('/new');
  }

  function handleProducts() {
    navigate('/');
  }

  return (
    <Styles.Container>
      <Styles.Content>
        <Styles.Title>{title}</Styles.Title>
        <Styles.Buttons>
          <Button title="Produtos" onClick={handleProducts} />
          <Button title="Novo Produto" onClick={handleNewProduct} />
        </Styles.Buttons>
      </Styles.Content>
    </Styles.Container>
  );
}
