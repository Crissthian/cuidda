/**
 * Calcula la edad a partir de la fecha de nacimiento.
 * Soporta formatos "YYYY-MM-DD" o "DD/MM/YYYY" y objetos Date.
 */
export function calcularEdad(
  fechaNacimiento: string | Date | undefined | null,
): number {
  if (!fechaNacimiento) {
    return 0;
  }

  let fecha: Date;

  if (fechaNacimiento instanceof Date && !isNaN(fechaNacimiento.getTime())) {
    fecha = fechaNacimiento;
  } else if (typeof fechaNacimiento === "string") {
    const normalized = fechaNacimiento.trim();

    let anio: number, mes: number, dia: number;

    if (normalized.includes("/")) {
      const partes = normalized.split("/");
      if (partes.length !== 3) {
        return 0;
      }
      [dia, mes, anio] = partes.map(Number);
    } else if (normalized.includes("-")) {
      const partes = normalized.split("T")[0].split("-");
      if (partes.length !== 3) {
        return 0;
      }
      [anio, mes, dia] = partes.map(Number);
    } else {
      return 0;
    }

    fecha = new Date(anio, mes - 1, dia);

    if (
      isNaN(fecha.getTime()) ||
      fecha.getFullYear() !== anio ||
      fecha.getMonth() + 1 !== mes ||
      fecha.getDate() !== dia
    ) {
      return 0;
    }
  } else {
    return 0;
  }

  const hoy = new Date();
  let edad = hoy.getFullYear() - fecha.getFullYear();

  const mesActual = hoy.getMonth();
  const mesNacimiento = fecha.getMonth();

  if (
    mesActual < mesNacimiento ||
    (mesActual === mesNacimiento && hoy.getDate() < fecha.getDate())
  ) {
    edad--;
  }

  return Math.max(0, edad);
}
