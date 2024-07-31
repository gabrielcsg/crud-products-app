import { useEffect, useState } from 'react';

import * as Styles from './styles';
import { formatDate } from '../../utils/dates';
import { IProduct } from '../../models/Product';
import {
  deleteProductService,
  getProductsService,
} from '../../services/products';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { formatCurrency } from '../../utils/currency';
import { Loading } from '../../components/Loading';
import { PageTitle } from '../../components/PageTitle';

export function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function loadProducts() {
    try {
      setIsLoading(true);
      const response = await getProductsService();
      setProducts(response.data);
    } catch (error) {
      alert('Não foi possível obter os produtos.');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRemoveProduct(productId: string) {
    try {
      if (confirm('Você realmente deseja excluir o produto?')) {
        await deleteProductService(productId);
        loadProducts();
      }
    } catch (error) {
      alert('Não foi possível remover o produto.');
    }
  }

  function handleEditProduct(productId: string) {
    navigate(`/update/${productId}`);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Styles.ProductsContainer>
      <PageTitle title="Produtos" />
      {isLoading && <Loading />}
      <Styles.ProductsContent>
        <Styles.ProductsTable>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nome</th>
              <th>Estoque Total</th>
              <th>Estoque de Corte</th>
              <th>Estoque Disponivel</th>
              <th>Preço de</th>
              <th>Preço por</th>
              <th>Criado em</th>
              <th>Atualizado em</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <strong>{product.code}</strong>
                </td>
                <td>{product.name}</td>
                <td>{product.totalStock}</td>
                <td>{product.cutStock}</td>
                <td>{product.availableStock}</td>
                <td>{formatCurrency(product.priceFrom)}</td>
                <td>{formatCurrency(product.pricePer)}</td>
                <td>{formatDate(product.createdAt)}</td>
                <td>{formatDate(product.updatedAt)}</td>
                <td>
                  <Styles.Actions>
                    <Button
                      onClick={() => handleEditProduct(product.id)}
                      title="Editar"
                    />
                    <Button
                      onClick={() => handleRemoveProduct(product.id)}
                      title="Deletar"
                    />
                  </Styles.Actions>
                </td>
              </tr>
            ))}
          </tbody>
        </Styles.ProductsTable>
      </Styles.ProductsContent>
    </Styles.ProductsContainer>
  );
}
