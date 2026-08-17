export interface CalculadoraPreciosInput {
  precioCosto: number;
  esBulto: boolean;
  unidades?: number;
  incluyeIva: boolean;
}

export interface CalculadoraPreciosResult {
  costoIndividual: number;
  costoConIva: number;
  precioPublicoReal: number;
  precioPublicoSugerido: number;
  precioPedidosYaReal: number;
  precioPedidosYaSugerido: number;
}
