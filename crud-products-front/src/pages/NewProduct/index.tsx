import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import { ProductDataSchema, productSchema } from '../../models/Product';
import { postProductService } from '../../services/products';

import * as Styles from './styles';
import { formMaskMoney } from '../../utils/masks';
import { isAxiosError } from 'axios';
import { PageTitle } from '../../components/PageTitle';

export function NewProduct() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
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
      await postProductService({
        code,
        name,
        totalStock,
        cutStock,
        priceFrom: Number(priceFrom),
        pricePer: Number(pricePer),
      });

      alert('Produto criado com sucesso!');
      navigate('/');
    } catch (error) {
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      } else {
        alert('Não foi possível cadastrar o produto.');
      }
    }
  }

  return (
    <Styles.Container>
      <PageTitle title="Cadastrar Produto" />
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

        <Button title="Cadastrar" type="submit" isLoading={isSubmitting} />
      </form>
    </Styles.Container>
  );
}
