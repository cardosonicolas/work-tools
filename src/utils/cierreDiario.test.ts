import { describe, expect, it } from 'vitest';
import { calcularCierreDiario, redondearACentenas } from './cierreDiario';
import { formatearPesos } from './currency';

const input = { efectivo: 400000, pedidosYaEfectivo: 0, pedidosYa: 150000, debito: 350000, rappi: 0, posnetGetnet: 0, posnetMercadoPago: 0, cuentaCorriente: 0, cigarrillos: 250000, cargas: 40000, horas: 110000 };

describe('cierre diario', () => {
  it('calcula sin redondear internamente', () => {
    expect(calcularCierreDiario(input)).toEqual({ total: 900000, baseCalculo: 610000, proveedores: 406666.6666666667, gananciaAle: 203333.3333333333, debitoDescontar: 500000, horas: 110000, gananciaNetaAle: -406666.6666666667, recompraCigarrillos: 217400, gananciaCigarrillos: 32600, gananciaKiosco: 72600 });
  });
  it('redondea a centenas según la convención del cierre', () => {
    expect(redondearACentenas(406666.67)).toBe(406700);
    expect(redondearACentenas(203333.33)).toBe(203400);
    expect(redondearACentenas(-406666.67)).toBe(-406600);
    expect(redondearACentenas(217400)).toBe(217400);
  });
  it('formatea el caso obligatorio en pesos argentinos', () => {
    const result = calcularCierreDiario(input);
    expect(formatearPesos(result.total)).toBe('$900.000');
    expect(formatearPesos(result.baseCalculo)).toBe('$610.000');
    expect(formatearPesos(result.proveedores)).toBe('$406.700');
    expect(formatearPesos(result.gananciaAle)).toBe('$203.400');
    expect(formatearPesos(result.debitoDescontar)).toBe('$500.000');
    expect(formatearPesos(result.horas)).toBe('$110.000');
    expect(formatearPesos(result.gananciaNetaAle)).toBe('-$406.600');
    expect(formatearPesos(result.recompraCigarrillos)).toBe('$217.400');
    expect(formatearPesos(result.gananciaCigarrillos)).toBe('$32.600');
    expect(formatearPesos(result.gananciaKiosco)).toBe('$72.600');
  });

  it('suma PedidosYa efectivo al efectivo, Rappi y posnets al débito y cuenta corriente al total', () => {
    const result = calcularCierreDiario({ efectivo: 300000, pedidosYaEfectivo: 107430, pedidosYa: 162700, debito: 600000, rappi: 32600, posnetGetnet: 71590, posnetMercadoPago: 65290, cuentaCorriente: 48650, cigarrillos: 249910, cargas: 11900, horas: 170450 });
    expect(result.total).toBe(1388260);
    expect(result.baseCalculo).toBe(1126450);
    expect(result.debitoDescontar).toBe(932180);
  });
});
