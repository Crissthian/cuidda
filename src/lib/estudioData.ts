export const fichaEmpresa = [
  { label: "Razón social", value: "UNACEM PERU S.A." },
  { label: "R.U.C.", value: "20608552171" },
  { label: "Sector y nivel de riesgo", value: "Fabricación de cemento, cal y yeso – Alto riesgo" },
  { label: "Sedes operativas", value: "Atocongo - Condorcocha - Conchán - Lima" },
  { label: "Trabajadores en planilla", value: "739" },
  { label: "Personal tercerizado", value: "4144" },
  { label: "Contacto SST", value: "Ing. Rosa Villalobos — Jefa SST" },
  { label: "Responsable médico", value: "Dra. Lizette Cristina Cersso Muro — Médico Ocupacional" },
  { label: "Vigencia del protocolo", value: "2026-12-31" },
] as const;

export const informacionSensible = [
  { label: "Exámenes procesados", value: "1,142 archivos" },
  { label: "Calificaciones de enfermedad ocupacional", value: "12 expedientes" },
  { label: "Actas de comité de reubicación", value: "7 actas" },
  { label: "Convenios y contratos de servicio", value: "4 documentos" },
  { label: "Resultados de monitoreo higiénico", value: "18 informes" },
] as const;

export const antecedentes = [
  { campo: "Actividad económica principal", registro: "Extracción y concentración de cobre (CIIU 0729)" },
  { campo: "Estructura organizacional", registro: "3 sedes · 14 áreas · 62 puestos tipo · 4 grupos ocupacionales" },
  { campo: "Régimen de trabajo", registro: "Turnos 14x7 y 5x2 · altura 2,900–3,400 msnm" },
  { campo: "Antecedentes de enfermedad ocupacional", registro: "12 casos calificados en los últimos 5 años (hipoacusia 9, neumoconiosis 3)" },
  { campo: "Siniestralidad histórica", registro: "IF 2.1 · IS 48 · 0 fatales en 36 meses" },
  { campo: "Servicio de salud ocupacional", registro: "Tópico propio + Lucemedic (interno) · EMOs con clínica acreditada" },
] as const;

export const validacionCruzada = [
  {
    id: 1,
    titulo: "Correlación ruido–hipoacusia en Perforación",
    estado: "ALTO",
    estadoClass: "bg-[#ED042333] text-risk-red",
    descripcion:
      "El monitoreo de 94.2 dBA supera el LMP y coincide con 41 hallazgos audiométricos nuevos en el mismo grupo ocupacional. Se recomienda elevar la periodicidad audiométrica a semestral en 218 trabajadores.",
  },
  {
    id: 2,
    titulo: "Brecha entre IPERC y protocolo médico",
    estado: "MEDIO",
    estadoClass: "bg-[#FDCA4033] text-risk-salmon",
    descripcion:
      "El peligro «hipoxia hipobárica» está en la matriz IPERC pero el protocolo EMO vigente no incluye tamizaje cardiológico específico para 276 trabajadores expuestos.",
  },
  {
    id: 3,
    titulo: "Programa de salud mental subejecutado",
    estado: "MEDIO",
    estadoClass: "bg-[#FDCA4033] text-risk-salmon",
    descripcion:
      "Con 55% de avance y riesgo psicosocial medio, el cierre del plan anual está en riesgo. Sugerencia: 4 talleres virtuales adicionales en T3 con foco en turnos rotativos.",
  },
] as const;

export const objetivos = [
  {
    id: 1,
    objetivo: "Reducir 15% los nuevos casos de hipoacusia ocupacional",
    indicador: "Casos nuevos / 100 expuestos",
    meta: "≤ 2.4",
    estado: "EN CURSO",
    estadoClass: "bg-violet/15 text-violet",
  },
  {
    id: 2,
    objetivo: "Cobertura de EMO periódico al 98% de la población",
    indicador: "% EMOs vigentes",
    meta: "98%",
    estado: "COMPLETADO",
    estadoClass: "bg-success/15 text-success-dark",
  },
  {
    id: 3,
    objetivo: "Cerrar el 100% de casos G3 con plan individual",
    indicador: "% casos con plan",
    meta: "100%",
    estado: "PROGRAMADO",
    estadoClass: "bg-muted-20 text-muted",
  },
  {
    id: 4,
    objetivo: "Reducir riesgo psicosocial de medio a bajo",
    indicador: "Índice psicosocial",
    meta: "Bajo",
    estado: "EN CURSO",
    estadoClass: "bg-violet/15 text-violet",
  },
] as const;

export const sedesProcesos = [
  { sede: "Planta Condorcocha", ubicacion: "Junín", procesos: "12", trabajadores: "303", riesgo: "Ruido / polvo" },
  { sede: "Planta Atocongo", ubicacion: "Lima", procesos: "6", trabajadores: "403", riesgo: "Ergonómico / psicosocial" },
  { sede: "Terminal portuario Conchán", ubicacion: "Lima", procesos: "3", trabajadores: "33", riesgo: "Manipulación de cargas" },
  { sede: "Oficinas Villarán", ubicacion: "Lima", procesos: "1", trabajadores: "40", riesgo: "Ergonómico / psicosocial" },
] as const;
