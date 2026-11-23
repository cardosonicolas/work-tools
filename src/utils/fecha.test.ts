import { describe, expect, it } from 'vitest';
import { fechaParaInput, parsearFecha } from './fecha';

describe('fecha de la caja', () => {
  it('interpreta la fecha del input en horario local', () => {
    const fecha = parsearFecha('2026-11-15');
    expect(fecha?.getFullYear()).toBe(2026);
    expect(fecha?.getMonth()).toBe(10);
    expect(fecha?.getDate()).toBe(15);
  });

  it('rechaza fechas vacías o inválidas', () => {
    expect(parsearFecha('')).toBeNull();
    expect(parsearFecha(null)).toBeNull();
    expect(parsearFecha('2026-02-31')).toBeNull();
  });

  it('formatea una fecha para el input', () => {
    expect(fechaParaInput(new Date(2026, 0, 5))).toBe('2026-01-05');
  });
});
