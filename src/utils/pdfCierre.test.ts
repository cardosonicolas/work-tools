import { describe, expect, it } from 'vitest';
import { calcularCierreDiario } from './cierreDiario';
import { construirBloquesCierre } from './pdfCierre';

const input = { efectivo: 300000, pedidosYaEfectivo: 107430, pedidosYa: 162700, debito: 600000, rappi: 32600, posnetGetnet: 71590, posnetMercadoPago: 65290, cuentaCorriente: 48650, cigarrillos: 249910, cargas: 11900, horas: 170450 };

describe('pdf del cierre', () => {
  it('muestra los importes cargados sin redondear y los resultados como en pantalla', () => {
    const filas = construirBloquesCierre(input, calcularCierreDiario(input)).flat();
    const valor = (etiqueta: string) => filas.find((fila) => fila.etiqueta === etiqueta)?.valor;
    expect(valor('PedidosYa efectivo')).toBe('$107.430');
    expect(valor('Cigarrillos')).toBe('$249.910');
    expect(valor('T')).toBe('$1.388.300');
    expect(valor('(-DÉBITO)')).toBe('$932.200');
    expect(filas.at(-1)).toEqual({ etiqueta: 'Gcia Neta Ale', valor: '-$727.100', destacada: true });
  });
});
