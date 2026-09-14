/** Datos simulados del modal "Generar documento con IA" (solo UI). */

export const tiposDocumentoIa = [
  { id: "programa", label: "Documento del Programa" },
  { id: "avance", label: "Informe de avance" },
  { id: "final", label: "Informes final" },
] as const;

export type TipoDocumentoIaId = (typeof tiposDocumentoIa)[number]["id"];

export const documentoIaContenido: Record<
  TipoDocumentoIaId,
  { titulo: string; cuerpo: string }
> = {
  programa: {
    titulo: "PROGRAMA DE CONSERVACIÓN AUDITIVA",
    cuerpo: `1. DATOS GENERALES
Empresa: UNACEM PERU S.A.
Sede: UM Concepción
Período: 2026
Responsable: Dr. A. Manrique
Tipo: Programa Ocupacional · Enfoque: Audiología

2. INTRODUCCIÓN
El presente documento corresponde al programa "Conservación auditiva", ejecutado en el marco del Sistema de Vigilancia Médica Ocupacional de Minera Andes Sur S.A.. La información utilizada proviene de los registros existentes en la plataforma: EMO, Línea Base, Vigilancia Médica.

3. JUSTIFICACIÓN
Exposición principal identificada: Ruido ocupacional (GES perforación, planta concentradora).
- 17 hallazgos audiométricos en el EMO periódico
- 5 casos requieren seguimiento especializado
- 76 trabajadores con desplazamiento de umbral > 25 dB

4. POBLACIÓN OBJETIVO
Total: 218 trabajadores`,
  },
  avance: {
    titulo: "INFORME DE AVANCE — CONSERVACIÓN AUDITIVA",
    cuerpo: `1. DATOS GENERALES
Empresa: Minera Andes Sur S.A.
Sede: UM Concepción
Período: 2026
Responsable: Dr. A. Manrique
Tipo: Programa Ocupacional · Enfoque: Audiología

2. INTRODUCCIÓN
El presente documento corresponde al programa "Conservación auditiva", ejecutado en el marco del Sistema de Vigilancia Médica Ocupacional de Minera Andes Sur S.A.. La información utilizada proviene de los registros existentes en la plataforma: EMO, Línea Base, Vigilancia Médica.

3. JUSTIFICACIÓN
Exposición principal identificada: Ruido ocupacional (GES perforación, planta concentradora).
- 17 hallazgos audiométricos en el EMO periódico
- 5 casos requieren seguimiento especializado
- 76 trabajadores con desplazamiento de umbral > 25 dB

4. POBLACIÓN OBJETIVO
Total: 218 trabajadores`,
  },
  final: {
    titulo: "INFORME FINAL — CONSERVACIÓN AUDITIVA",
    cuerpo: `1. DATOS GENERALES
Empresa: Minera Andes Sur S.A.
Sede: UM Concepción
Período: 2026
Responsable: Dr. A. Manrique
Tipo: Programa Ocupacional · Enfoque: Audiología

2. INTRODUCCIÓN
El presente documento corresponde al programa "Conservación auditiva", ejecutado en el marco del Sistema de Vigilancia Médica Ocupacional de Minera Andes Sur S.A.. La información utilizada proviene de los registros existentes en la plataforma: EMO, Línea Base, Vigilancia Médica.

3. JUSTIFICACIÓN
Exposición principal identificada: Ruido ocupacional (GES perforación, planta concentradora).
- 17 hallazgos audiométricos en el EMO periódico
- 5 casos requieren seguimiento especializado
- 76 trabajadores con desplazamiento de umbral > 25 dB

4. POBLACIÓN OBJETIVO
Total: 218 trabajadores`,
  },
};
