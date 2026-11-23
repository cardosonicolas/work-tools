import type { CierreDiarioInput, CierreDiarioResult } from '../types/cierreDiario';
import { formatearPesos, formatearPesosExactos } from './currency';

export interface FilaPdf {
  etiqueta: string;
  valor: string;
  destacada?: boolean;
}

/** Row blocks of the PDF, in order; a separator line is drawn between blocks. */
export function construirBloquesCierre(input: CierreDiarioInput, result: CierreDiarioResult): FilaPdf[][] {
  const exacto = formatearPesosExactos;
  return [
    [
      { etiqueta: 'Efectivo', valor: exacto(input.efectivo) },
      { etiqueta: 'PedidosYa efectivo', valor: exacto(input.pedidosYaEfectivo) },
      { etiqueta: 'PedidosYa online', valor: exacto(input.pedidosYa) },
      { etiqueta: 'Transferencia', valor: exacto(input.debito) },
      { etiqueta: 'Rappi', valor: exacto(input.rappi) },
      { etiqueta: 'Posnet Getnet', valor: exacto(input.posnetGetnet) },
      { etiqueta: 'Posnet Mercado Pago', valor: exacto(input.posnetMercadoPago) },
      { etiqueta: 'Cuenta corriente', valor: exacto(input.cuentaCorriente) },
    ],
    [
      { etiqueta: 'T', valor: formatearPesos(result.total), destacada: true },
      { etiqueta: 'Cigarrillos', valor: exacto(input.cigarrillos) },
      { etiqueta: 'Cargas', valor: exacto(input.cargas) },
    ],
    [
      { etiqueta: '%15', valor: formatearPesos(result.baseCalculo) },
      { etiqueta: 'Proveedores', valor: formatearPesos(result.proveedores) },
    ],
    [
      { etiqueta: 'Gcia Ale', valor: formatearPesos(result.gananciaAle) },
      { etiqueta: '(-DÉBITO)', valor: formatearPesos(result.debitoDescontar) },
      { etiqueta: 'Horas', valor: exacto(input.horas) },
    ],
    [
      { etiqueta: 'Gcia Neta Ale', valor: formatearPesos(result.gananciaNetaAle), destacada: true },
    ],
  ];
}

export function formatearFechaCierre(fecha: Date): string {
  return fecha.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

/** Generates and downloads the PDF. jsPDF is imported lazily to keep it out of the page bundle. */
export async function descargarPdfCierre(input: CierreDiarioInput, result: CierreDiarioResult, fecha: Date): Promise<void> {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const izquierda = 25;
  const derecha = 185;
  const fechaTexto = formatearFechaCierre(fecha);
  let y = 30;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('CIERRE DE CAJA', izquierda, y);
  doc.setFontSize(13);
  doc.text(`DÍA: ${fechaTexto}`, derecha, y, { align: 'right' });
  y += 5;
  doc.setLineWidth(0.6);
  doc.line(izquierda, y, derecha, y);
  y += 10;

  doc.setLineWidth(0.3);
  const bloques = construirBloquesCierre(input, result);
  bloques.forEach((bloque, indice) => {
    bloque.forEach((fila) => {
      doc.setFont('helvetica', fila.destacada ? 'bold' : 'normal');
      doc.setFontSize(fila.destacada ? 14 : 12);
      doc.text(fila.etiqueta, izquierda, y);
      doc.text(fila.valor, derecha, y, { align: 'right' });
      y += 8;
    });
    if (indice < bloques.length - 1) {
      doc.line(izquierda, y - 4, derecha, y - 4);
      y += 4;
    }
  });

  const [dia, mes, anio] = fechaTexto.split('/');
  doc.save(`cierre-${anio}-${mes}-${dia}.pdf`);
}
