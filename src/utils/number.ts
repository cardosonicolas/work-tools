const MILES_CON_PUNTO = /^-?[1-9]\d{0,2}(\.\d{3})+$/;

export function parsearNumero(value: FormDataEntryValue | null): number {
  if (typeof value !== 'string') return Number.NaN;
  const texto = value.trim();
  if (texto === '') return Number.NaN;
  if (texto.includes(',')) return Number(texto.replace(/\./g, '').replace(',', '.'));
  if (MILES_CON_PUNTO.test(texto)) return Number(texto.replace(/\./g, ''));
  return Number(texto);
}
