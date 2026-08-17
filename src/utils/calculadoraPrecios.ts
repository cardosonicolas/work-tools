import type { CalculadoraPreciosInput, CalculadoraPreciosResult } from '../types/calculadoraPrecios';

export const IVA = 1.21;
export const REMARQUE_KIOSCO = 1.5;
export const REMARQUE_PEDIDOS_YA = 1.5;
const CENTENA = 100;

export function redondearACentenaMasCercana(value: number): number {
  return Math.round(value / CENTENA) * CENTENA;
}

export function calcularPrecio(input: CalculadoraPreciosInput): CalculadoraPreciosResult {
  if (!Number.isFinite(input.precioCosto) || input.precioCosto <= 0) {
    throw new Error('El precio de costo debe ser un número positivo.');
  }
  if (input.esBulto && (!Number.isFinite(input.unidades) || input.unidades! <= 0 || !Number.isInteger(input.unidades))) {
    throw new Error('La cantidad de unidades debe ser un entero positivo.');
  }

  const costoIndividual = input.esBulto ? input.precioCosto / input.unidades! : input.precioCosto;
  const costoConIva = input.incluyeIva ? costoIndividual : costoIndividual * IVA;
  const precioPublicoReal = costoConIva * REMARQUE_KIOSCO;
  const precioPublicoSugerido = redondearACentenaMasCercana(precioPublicoReal);
  const precioPedidosYaReal = precioPublicoSugerido * REMARQUE_PEDIDOS_YA;

  return {
    costoIndividual,
    costoConIva,
    precioPublicoReal,
    precioPublicoSugerido,
    precioPedidosYaReal,
    precioPedidosYaSugerido: redondearACentenaMasCercana(precioPedidosYaReal),
  };
}
