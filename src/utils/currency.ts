import { redondearACentenas } from './cierreDiario';

const currencyFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency', currency: 'ARS', maximumFractionDigits: 0,
});
const preciseCurrencyFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency', currency: 'ARS', minimumFractionDigits: 2, maximumFractionDigits: 2,
});

export function formatearPesos(value: number): string {
  return currencyFormatter.format(redondearACentenas(value)).replace(/\u00a0/g, '');
}

export function formatearPesosExactos(value: number): string {
  return preciseCurrencyFormatter.format(value).replace(/\u00a0/g, '').replace(/,00$/, '');
}
