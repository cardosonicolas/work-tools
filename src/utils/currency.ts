import { redondearACentenas } from './cierreDiario';

const currencyFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency', currency: 'ARS', maximumFractionDigits: 0,
});

export function formatearPesos(value: number): string {
  return currencyFormatter.format(redondearACentenas(value)).replace(/\u00a0/g, '');
}
