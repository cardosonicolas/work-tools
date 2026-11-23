/**
 * Parses an `<input type="date">` value (YYYY-MM-DD) as a local date.
 * `new Date('2026-11-15')` would be UTC midnight, which shows as the 14th in Argentina (UTC-3).
 */
export function parsearFecha(value: FormDataEntryValue | null): Date | null {
  if (typeof value !== 'string') return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const [anio, mes, dia] = match.slice(1).map(Number);
  const fecha = new Date(anio, mes - 1, dia);
  return fecha.getMonth() === mes - 1 && fecha.getDate() === dia ? fecha : null;
}

/** Formats a date as YYYY-MM-DD in local time, for an `<input type="date">` value. */
export function fechaParaInput(fecha: Date): string {
  const dosDigitos = (n: number) => String(n).padStart(2, '0');
  return `${fecha.getFullYear()}-${dosDigitos(fecha.getMonth() + 1)}-${dosDigitos(fecha.getDate())}`;
}
