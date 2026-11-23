import type { CierreDiarioInput, CierreDiarioResult } from '../types/cierreDiario';

const PROVEEDORES_DIVISOR = 1.5;
const RECOMPRA_CIGARRILLOS_DIVISOR = 1.15;
const CENTENA = 100;

export function calcularCierreDiario(input: CierreDiarioInput): CierreDiarioResult {
  const efectivo = input.efectivo + input.pedidosYaEfectivo;
  const debito = input.debito + input.rappi + input.posnetGetnet + input.posnetMercadoPago;
  const total = efectivo + input.pedidosYa + debito + input.cuentaCorriente;
  const baseCalculo = total - (input.cigarrillos + input.cargas);
  const proveedores = baseCalculo / PROVEEDORES_DIVISOR;
  const gananciaAle = baseCalculo - proveedores;
  const debitoDescontar = input.pedidosYa + debito;
  const recompraCigarrillos = redondearACentenas(input.cigarrillos / RECOMPRA_CIGARRILLOS_DIVISOR);
  const gananciaCigarrillos = input.cigarrillos - recompraCigarrillos;

  return {
    total, baseCalculo, proveedores, gananciaAle, debitoDescontar,
    horas: input.horas,
    gananciaNetaAle: gananciaAle - debitoDescontar - input.horas,
    recompraCigarrillos,
    gananciaCigarrillos,
    gananciaKiosco: input.cargas + gananciaCigarrillos,
  };
}

/** Rounds display values up to the next hundred, including negative values. */
export function redondearACentenas(value: number): number {
  return Math.ceil(value / CENTENA) * CENTENA;
}
