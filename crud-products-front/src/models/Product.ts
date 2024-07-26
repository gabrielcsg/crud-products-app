import { z } from 'zod';
import { unmaskMoney } from '../utils/masks';

export interface IBaseProduct {
  code: string;
  name: string;
  totalStock: number;
  cutStock: number;
  priceFrom: number;
  pricePer: number;
}

export interface IProduct extends IBaseProduct {
  id: string;
  availableStock: number;
  createdAt: string;
  updatedAt: string;
}

export const productSchema = z
  .object({
    code: z.string({ message: 'Código é obrigatório' }),
    name: z.string({ message: 'Nome é obrigatório' }),
    totalStock: z
      .number({ message: 'Estoque total deve ser um número' })
      .min(0, 'Não pode ser menor que 0'),
    cutStock: z
      .number({ message: 'Estoque de corte deve ser um número' })
      .min(0, 'Não pode ser menor que 0'),
    priceFrom: z
      .string({ message: 'Preço de é obrigatório' })
      .transform((value) => unmaskMoney(value))
      .pipe(z.number().min(0, 'Não pode ser menor que 0')),
    pricePer: z
      .string({ message: 'Preço por é obrigatório' })
      .transform((value) => unmaskMoney(value))
      .pipe(z.number().min(0, 'Não pode ser menor que 0')),
  })
  .refine((data) => data.pricePer <= data.priceFrom, {
    message: 'Preço de não pode ser inferior que Preço por',
    path: ['priceFrom'],
  });

export type ProductDataSchema = {
  code: string;
  name: string;
  totalStock: number;
  cutStock: number;
  priceFrom: string;
  pricePer: string;
};
