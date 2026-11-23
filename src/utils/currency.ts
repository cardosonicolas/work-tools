import { redondearACentenas } from './cierreDiario';

const currencyFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency', currency: 'ARS', maximumFractionDigits: 0,
});
const exactCurrencyFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency', currency: 'ARS', minimumFractionDigits: 2, maximumFractionDigits: 2,
});

export function formatearPesos(value: number): string {
  return currencyFormatter.format(redondearACentenas(value)).replace(/\u00a0/g, '');
}

/** Formats an amount without rounding to hundreds (drops a trailing ",00"). */
export function formatearPesosExactos(value: number): string {
  return exactCurrencyFormatter.format(value).replace(/\u00a0/g, '').replace(/,00$/, '');
}
