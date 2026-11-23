import { describe, expect, it } from 'vitest';
import { parsearNumero } from './number';

describe('parsearNumero', () => {
  it('acepta punto y coma decimal', () => {
    expect(parsearNumero('123.45')).toBe(123.45);
    expect(parsearNumero('123,45')).toBe(123.45);
  });

  it('interpreta el punto como separador de miles en formato argentino', () => {
    expect(parsearNumero('400.000')).toBe(400000);
    expect(parsearNumero('1.500')).toBe(1500);
    expect(parsearNumero('1.234,56')).toBe(1234.56);
    expect(parsearNumero('1.5')).toBe(1.5);
  });

  it('devuelve NaN para valores que no son texto numérico', () => {
    expect(parsearNumero(null)).toBeNaN();
    expect(parsearNumero(new File(['x'], 'x.txt'))).toBeNaN();
    expect(parsearNumero('')).toBeNaN();
    expect(parsearNumero('   ')).toBeNaN();
  });
});
