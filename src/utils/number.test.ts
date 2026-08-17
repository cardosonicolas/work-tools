import { describe, expect, it } from 'vitest';
import { parsearNumero } from './number';

describe('parsearNumero', () => {
  it('acepta punto y coma decimal', () => {
    expect(parsearNumero('123.45')).toBe(123.45);
    expect(parsearNumero('123,45')).toBe(123.45);
  });

  it('devuelve NaN para valores que no son texto numérico', () => {
    expect(parsearNumero(null)).toBeNaN();
    expect(parsearNumero(new File(['x'], 'x.txt'))).toBeNaN();
    expect(parsearNumero('')).toBe(0);
  });
});
