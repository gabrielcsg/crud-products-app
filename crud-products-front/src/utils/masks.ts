import { FormEvent } from 'react';

export const formMaskMoney = (
  e: FormEvent<HTMLInputElement>
): FormEvent<HTMLInputElement> => {
  e.currentTarget.maxLength = 17;
  e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '');

  if (e.currentTarget.value.length) {
    e.currentTarget.value = `R$ ${e.currentTarget.value
      .replace(/\D/g, '')
      .replace(/(\d)(\d{2})$/, '$1,$2')
      .replace(/(?=(\d{3})+(\D))\B/g, '.')}`;
  }

  return e;
};

export const unmaskMoney = (maskedValue: string | number | null): number => {
  const stringValue = String(maskedValue)
    .trim()
    .replace('R$', '')
    .replace(/\./g, '')
    .replace(',', '.');

  return parseFloat(stringValue);
};
