/**
 * Períodos para filtros de búsqueda (solo UI).
 * Centraliza el cálculo del año actual y la lista de últimos 10 años
 * para evitar duplicar la lógica en cada contenido.
 */

export const TODAY = new Date();

export const CURRENT_YEAR = TODAY.getFullYear();

export const YEARS: number[] = Array.from(
  { length: 10 },
  (_, i) => CURRENT_YEAR - i,
);

export const TODAY_ISO = `${CURRENT_YEAR}-${String(TODAY.getMonth() + 1).padStart(2, "0")}-${String(
  TODAY.getDate(),
).padStart(2, "0")}`;
