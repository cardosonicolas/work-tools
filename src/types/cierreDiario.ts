export interface CierreDiarioInput {
  efectivo: number;
  pedidosYa: number;
  debito: number;
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
