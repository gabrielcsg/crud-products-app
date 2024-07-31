import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import { ProductDataSchema, productSchema } from '../../models/Product';
import {
  getProductDetailsService,
  updateProductService,
} from '../../services/products';

import * as Styles from './styles';
import { useEffect } from 'react';
import { formMaskMoney } from '../../utils/masks';
import { formatCurrency } from '../../utils/currency';
import { isAxiosError } from 'axios';
import { PageTitle } from '../../components/PageTitle';

export function EditProduct() {
  const navigate = useNavigate();
  const { productId } = useParams();

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<ProductDataSchema>({
    resolver: zodResolver(productSchema),
  });

  async function handleCreateProduct({
    code,
    name,
    totalStock,
    cutStock,
    priceFrom,
    pricePer,
  }: ProductDataSchema) {
    try {
      if (productId) {
        await updateProductService(productId, {
          code,
          name,
          totalStock,
          cutStock,
          priceFrom: Number(priceFrom),
          pricePer: Number(pricePer),
        });

        alert('Produto atualizado com sucesso!');
        navigate('/');
      }
    } catch (error) {
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      } else {
        alert('Não foi possível atualizar o produto.');
      }
    }
  }

  useEffect(() => {
    async function loadProduct() {
      try {
        if (productId) {
          const response = await getProductDetailsService(productId);
          reset({
            code: response.data.code,
            name: response.data.name,
            totalStock: response.data.totalStock,
            cutStock: response.data.cutStock,
            priceFrom: formatCurrency(response.data.priceFrom),
            pricePer: formatCurrency(response.data.pricePer),
          });
        }
      } catch (error) {
        alert('Não foi possível obter os dados do produto.');
        navigate('/');
      }
    }

    loadProduct();
  }, [productId, reset, navigate]);

  return (
    <Styles.Container>
      <PageTitle title="Editar Produto" />
      <form onSubmit={handleSubmit(handleCreateProduct)}>
        <Input
          placeholder="Código"
          error={errors?.code?.message}
          required
          {...register('code')}
        />
        <Input
          placeholder="Nome"
          error={errors?.name?.message}
          required
          {...register('name')}
        />
        <Input
          type="number"
          min={0}
          placeholder="Estoque Total"
          error={errors?.totalStock?.message}
          required
          {...register('totalStock', { valueAsNumber: true })}
        />
        <Input
          type="number"
          min={0}
          placeholder="Estoque de Corte"
          error={errors?.cutStock?.message}
          required
          {...register('cutStock', { valueAsNumber: true })}
        />
        <Input
          placeholder="Preço de"
          error={errors?.priceFrom?.message}
          onKeyUp={formMaskMoney}
          required
          {...register('priceFrom')}
        />
        <Input
          placeholder="Preço por"
          error={errors?.pricePer?.message}
          onKeyUp={formMaskMoney}
          required
          {...register('pricePer')}
        />

        <Button title="Salvar" type="submit" isLoading={isSubmitting} />
      </form>
    </Styles.Container>
  );
}
