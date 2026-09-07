/**
 * Utilidades de fecha para el módulo de Admisión (solo UI).
 */

/**
 * Calcula la edad en años a partir de una fecha en formato YYYY-MM-DD.
 */
export function calcularEdad(fecha: string): number {
  const nacimiento = new Date(fecha);
  if (Number.isNaN(nacimiento.getTime())) return 0;

  const hoy = new Date();
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad -= 1;
  }
  return Math.max(0, edad);
}

/**
 * Convierte una fecha (Date, string ISO o string con formato) a YYYY-MM-DD
 * para usarla en inputs type="date".
 */
export function convertirFechaParaInputDate(fecha: Date | string): string {
  if (!fecha) return "";
  const d = fecha instanceof Date ? fecha : new Date(fecha);
  if (Number.isNaN(d.getTime())) return "";
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
