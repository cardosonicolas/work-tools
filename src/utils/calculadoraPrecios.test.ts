import { describe, expect, it } from 'vitest';
import { calcularPrecio, redondearACentenaMasCercana } from './calculadoraPrecios';
import { formatearPesosExactos } from './currency';

describe('calculadora de precios', () => {
  it('calcula un producto cuyo costo ya incluye IVA', () => {
    const result = calcularPrecio({ precioCosto: 500, esBulto: false, incluyeIva: true });
    expect(result).toEqual({ costoIndividual: 500, costoConIva: 500, precioPublicoReal: 750, precioPublicoSugerido: 800, precioPedidosYaReal: 1200, precioPedidosYaSugerido: 1200 });
  });

  it('agrega IVA y calcula PedidosYa desde el precio público redondeado', () => {
    const result = calcularPrecio({ precioCosto: 413, esBulto: false, incluyeIva: false });
    expect(result.costoConIva).toBeCloseTo(499.73, 2);
    expect(result.precioPublicoReal).toBeCloseTo(749.595, 3);
    expect(result.precioPublicoSugerido).toBe(700);
    expect(result.precioPedidosYaReal).toBe(1050);
    expect(result.precioPedidosYaSugerido).toBe(1100);
  });

  it('calcula el costo individual a partir de un bulto', () => {
    const result = calcularPrecio({ precioCosto: 12000, esBulto: true, unidades: 24, incluyeIva: true });
    expect(result.costoIndividual).toBe(500);
    expect(result.precioPublicoSugerido).toBe(800);
    expect(result.precioPedidosYaSugerido).toBe(1200);
  });

  it('redondea matemáticamente a la centena más cercana', () => {
    expect(redondearACentenaMasCercana(749)).toBe(700);
    expect(redondearACentenaMasCercana(750)).toBe(800);
    expect(redondearACentenaMasCercana(849)).toBe(800);
    expect(redondearACentenaMasCercana(850)).toBe(900);
    expect(redondearACentenaMasCercana(900)).toBe(900);
  });

  it('formatea los valores reales con moneda argentina y hasta dos decimales', () => {
    expect(formatearPesosExactos(499.73)).toBe('$499,73');
    expect(formatearPesosExactos(749.595)).toBe('$749,60');
    expect(formatearPesosExactos(1200)).toBe('$1.200');
  });
});
