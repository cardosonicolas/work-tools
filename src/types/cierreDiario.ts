export interface CierreDiarioInput {
  efectivo: number;
  pedidosYaEfectivo: number;
  pedidosYa: number;
  debito: number;
  rappi: number;
  posnetGetnet: number;
  posnetMercadoPago: number;
  cuentaCorriente: number;
  cigarrillos: number;
  cargas: number;
  horas: number;
}

export interface CierreDiarioResult {
  total: number;
  baseCalculo: number;
  proveedores: number;
  gananciaAle: number;
  debitoDescontar: number;
  horas: number;
  gananciaNetaAle: number;
  recompraCigarrillos: number;
  gananciaCigarrillos: number;
  gananciaKiosco: number;
}
