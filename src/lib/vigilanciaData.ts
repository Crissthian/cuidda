export const kpis = [
  {
    id: 1,
    label: "TRABAJADORES EN \nVIGILANCIA",
    value: "1,284",
    sub: "+42 este mes",
    subColor: "text-success",
    icon: "fa-user-shield",
    iconBg: "bg-[#e6f0ff]",
    iconColor: "text-brand",
  },
  {
    id: 2,
    label: "APTITUD VIGENTE",
    value: "91.4%",
    sub: "117 EMOs por vencer",
    subColor: "text-success",
    icon: "fa-user-check",
    iconBg: "bg-risk-salmon/15",
    iconColor: "text-risk-salmon",
  },
  {
    id: 3,
    label: "CUMPLIMIENTO DEL \nPLAN ANUAL",
    value: "78%",
    sub: "meta trimestral 85%",
    subColor: "text-success",
    icon: "fa-file-circle-plus",
    iconBg: "bg-[#e0f8f0]",
    iconColor: "text-[#0bbb8a]",
  },
  {
    id: 4,
    label: "CASOS EN \nSEGUIMIENTO (G3)",
    value: "63",
    sub: "9 pendientes de comité",
    subColor: "text-success",
    icon: "fa-user-doctor",
    iconBg: "bg-risk-red/10",
    iconColor: "text-risk-red",
  },
] as const;

export const planData = [
  { mes: "ENE", plan: 100, ejecutado: 60 },
  { mes: "FEB", plan: 80, ejecutado: 50 },
  { mes: "MAR", plan: 90, ejecutado: 60 },
  { mes: "ABR", plan: 80, ejecutado: 50 },
  { mes: "MAY", plan: 90, ejecutado: 40 },
  { mes: "JUN", plan: 80, ejecutado: 70 },
  { mes: "JUL", plan: 100, ejecutado: 60 },
  { mes: "AGO", plan: 100, ejecutado: 60 },
  { mes: "SET", plan: 90, ejecutado: 60 },
  { mes: "OCT", plan: 80, ejecutado: 50 },
  { mes: "NOV", plan: 100, ejecutado: 60 },
  { mes: "DIC", plan: 90, ejecutado: 60 },
] as const;

export const estratificacion = [
  {
    id: "G1",
    label: "Sin hallazgos o hallazgos no relevantes",
    value: 742,
    pct: 60,
    color: "bg-success",
    dot: "bg-success",
    badgeBg: "bg-success/15",
  },
  {
    id: "G2",
    label: "Riesgo con hallazgos relevantes no alarmantes",
    value: 356,
    pct: 29,
    color: "bg-risk-salmon",
    dot: "bg-risk-salmon",
    badgeBg: "bg-risk-salmon/15",
  },
  {
    id: "G3",
    label: "Riesgo con hallazgos importantes / alarmantes",
    value: 142,
    pct: 11,
    color: "bg-risk-red",
    dot: "bg-risk-red",
    badgeBg: "bg-risk-red/10",
  },
] as const;

export const casosPriorizados = [
  {
    id: 1,
    trabajador: "Luis Quispe Ramos",
    dni: "DNI 4412896",
    puesto: "Operador de perforadora",
    sede: "Condorcocha",
    hallazgos: ["Hipoacusia neurosensorial bilateral", "IMC 33.1"],
    aptitud: "APTO CON\nRESTRICCIONES",
    grupo: "G3" as const,
  },
  {
    id: 2,
    trabajador: "Maria Chávez Loayza",
    dni: "DNI 52698874",
    puesto: "Analista de laboratorio",
    sede: "Condorcocha",
    hallazgos: ["Espirometria restrictiva leve"],
    hallazgosColor: "text-risk-salmon",
    aptitud: "APTO",
    grupo: "G2" as const,
  },
  {
    id: 3,
    trabajador: "Jorge Tito Ayala",
    dni: "DNI 75968399",
    puesto: "Soldador",
    sede: "Condorcocha",
    hallazgos: ["Pterigión OD", "Dermatitis de contacto"],
    aptitud: "OBSERVADO",
    grupo: "G3" as const,
  },
  {
    id: 4,
    trabajador: "Pedro Salas Martinez",
    dni: "DNI 58698874",
    puesto: "Conductor de volquete",
    sede: "Condorcocha",
    hallazgos: ["HTA", "Somnolencia diurna"],
    hallazgosColor: "text-risk-salmon",
    aptitud: "APTO CON\nRESTRICCIONES",
    grupo: "G2" as const,
  },
] as const;

export const hallazgosFrecuentes = [
  {
    id: 1,
    label: "Hipoacusia inducida por ruido",
    value: 96,
    delta: "+8%",
    pct: 34,
  },
  { id: 2, label: "Sobrepeso / obesidad", value: 284, delta: "+3%", pct: 100 },
  { id: 3, label: "Dislipidemia", value: 173, delta: "-2%", pct: 61 },
  {
    id: 4,
    label: "Trastorno musculoesquelético",
    value: 141,
    delta: "+5%",
    pct: 50,
  },
  { id: 5, label: "Hipertensión arterial", value: 88, delta: "0%", pct: 31 },
  {
    id: 6,
    label: "Alteración espirométrica",
    value: 47,
    delta: "+11%",
    pct: 17,
  },
] as const;

export const avanceProgramas = [
  {
    id: 1,
    label: "Conservación auditiva",
    actividades: "1/4 ACTIVIDADES",
    pct: 30,
  },
  {
    id: 2,
    label: "Protección respiratoria",
    actividades: "2/3 ACTIVIDADES",
    pct: 65,
  },
  {
    id: 3,
    label: "Ergonomía y espalda sana",
    actividades: "1/4 ACTIVIDADES",
    pct: 28,
  },
  {
    id: 4,
    label: "Salud mental y fatiga",
    actividades: "2/3 ACTIVIDADES",
    pct: 70,
  },
  { id: 5, label: "Cardiometabólico", actividades: "1/4 ACTIVIDADES", pct: 25 },
] as const;

export const proximosHitos = [
  {
    id: 1,
    fecha: "18 ago",
    titulo: "EMO periódico – Planta UNACEM Condorcocha (86 trabajadores)",
    subtitulo: "Lucemedic",
  },
  {
    id: 2,
    fecha: "22 ago",
    titulo: "Reevaluación audiométrica semestral G2/G3",
    subtitulo: "Programa auditivo",
  },
  {
    id: 3,
    fecha: "28 ago",
    titulo: "Capacitación de primeros auxilios (brigadistas)",
    subtitulo: "Capacitaciones",
  },
  {
    id: 4,
    fecha: "05 sep",
    titulo: "Comité de reubicación laboral – 9 casos G3",
    subtitulo: "RR.HH. + Médico",
  },
] as const;
