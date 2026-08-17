export function parsearNumero(value: FormDataEntryValue | null): number {
  if (typeof value !== 'string') return Number.NaN;
  return Number(value.replace(',', '.'));
}
