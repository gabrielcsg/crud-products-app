import axios, { AxiosResponse } from 'axios';
import { IBaseProduct, IProduct } from '../models/Product';

const BASE_URL = 'http://localhost:3333';

const api = axios.create({
  baseURL: BASE_URL,
});

export function getProductsService(): Promise<AxiosResponse<IProduct[]>> {
  return api.get<IProduct[]>('/products');
}

export async function getProductDetailsService(
  productId: string
): Promise<AxiosResponse<IProduct>> {
  return api.get(`/products/${productId}`);
}

export async function postProductService(
  newProductData: IBaseProduct
): Promise<AxiosResponse<IProduct>> {
  return api.post('/products', newProductData);
}

export async function updateProductService(
  productId: string,
  updateProductData: IBaseProduct
): Promise<AxiosResponse<IProduct>> {
  return api.put(`/products/${productId}`, updateProductData);
}

export async function deleteProductService(
  productId: string
): Promise<AxiosResponse<void>> {
  return api.delete(`/products/${productId}`);
}
