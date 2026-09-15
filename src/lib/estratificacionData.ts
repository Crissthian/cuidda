/**
 * Datos simulados de la estratificación de trabajadores por grupo de riesgo.
 */

export type Grupo = "G1" | "G2" | "G3";

export interface TrabajadorEstratificacion {
  id: number;
  grupo: Grupo;
  nombre: string;
  cargo: string;
  tipo: string;
  sede: string;
  validado: boolean;
  hallazgos: string;
  actividades: string;
}

export interface CambioGrupo {
  id: number;
  grupo: Grupo;
  realizadoPor: string;
  fechaHora: string;
  justificacion: string;
}

export const trabajadoresEstratificacion: TrabajadorEstratificacion[] = [
  {
    id: 1,
    grupo: "G3",
    nombre: "Luis Quispe Ramos",
    cargo: "Operador de perforadora",
    tipo: "Interno",
    sede: "Condorcocha",
    validado: true,
    hallazgos: "Hipoacusia neurosensorial bilateral · IMC 33.1",
    actividades:
      "Capacitación anual / Examen médico anual / Reevaluación semestral / Consulta con especialista / Determinación de origen ocupacional / Comité de reubicación laboral",
  },
  {
    id: 2,
    grupo: "G2",
    nombre: "María Chávez Loayza",
    cargo: "Analista de laboratorio",
    tipo: "Interno",
    sede: "Condorcocha",
    validado: true,
    hallazgos: "Espirometría restrictiva leve",
    actividades:
      "Capacitación anual / Examen médico anual / Reevaluación semestral / Ingreso a programa específico",
  },
  {
    id: 3,
    grupo: "G3",
    nombre: "Jorge Tito Ayala",
    cargo: "Soldador",
    tipo: "Interno",
    sede: "Condorcocha",
    validado: false,
    hallazgos: "Pterigión OD · Dermatitis de contacto",
    actividades:
      "Capacitación anual / Examen médico anual / Reevaluación semestral / Consulta con especialista / Determinación de origen ocupacional / Comité de reubicación laboral",
  },
  {
    id: 4,
    grupo: "G1",
    nombre: "Ana Ruiz Mendoza",
    cargo: "Supervisora de planta",
    tipo: "Interno",
    sede: "Condorcocha",
    validado: true,
    hallazgos: "Sin hallazgos relevantes",
    actividades: "Capacitación anual / Examen médico anual",
  },
  {
    id: 5,
    grupo: "G2",
    nombre: "Pedro Salas Ninahuanca",
    cargo: "Conductor de volquete",
    tipo: "Externo",
    sede: "Condorcocha",
    validado: true,
    hallazgos: "HTA estadio 1 · Somnolencia diurna",
    actividades:
      "Capacitación anual / Examen médico anual / Reevaluación semestral / Ingreso a programa específico",
  },
  {
    id: 6,
    grupo: "G1",
    nombre: "Rosa Huamán Ccapa",
    cargo: "Asistente administrativo",
    tipo: "Externo",
    sede: "Condorcocha",
    validado: true,
    hallazgos: "Sin hallazgos relevantes",
    actividades: "Capacitación anual / Examen médico anual",
  },
  {
    id: 7,
    grupo: "G3",
    nombre: "Carlos Bravo Rios",
    cargo: "Mecánico de mina",
    tipo: "Interno",
    sede: "Condorcocha",
    validado: true,
    hallazgos: "Neumoconiosis 0/1 1/1 · Lumbalgia crónica",
    actividades:
      "Capacitación anual / Examen médico anual / Reevaluación semestral / Consulta con especialista / Determinación de origen ocupacional / Comité de reubicación laboral",
  },
  {
    id: 8,
    grupo: "G1",
    nombre: "Elena Paredes Vilchez",
    cargo: "Enfermera ocupacional",
    tipo: "Interno",
    sede: "Condorcocha",
    validado: true,
    hallazgos: "Sin hallazgos relevantes",
    actividades: "Capacitación anual / Examen médico anual",
  },
  {
    id: 9,
    grupo: "G2",
    nombre: "Victor Anco Flores",
    cargo: "Operador de chancado",
    tipo: "Externo",
    sede: "Condorcocha",
    validado: true,
    hallazgos: "Hipoacusia inicial (4 kHz)",
    actividades:
      "Capacitación anual / Examen médico anual / Reevaluación semestral / Ingreso a programa específico",
  },
  {
    id: 10,
    grupo: "G1",
    nombre: "Diana Ocampo Sifuentes",
    cargo: "Practicante de SST",
    tipo: "Externo",
    sede: "Condorcocha",
    validado: true,
    hallazgos: "Sin hallazgos relevantes",
    actividades: "Capacitación anual / Examen médico anual",
  },
];

/**
 * Historial inicial de cambios de grupo, indexado por id de trabajador.
 * Cada fila es el grupo resultante de un cambio real.
 */
export const historialCambiosInicial: Record<number, CambioGrupo[]> = {
  1: [
    {
      id: 1,
      grupo: "G3",
      realizadoPor: "Dr. M. Salcedo",
      fechaHora: "11/09/2026 01:15",
      justificacion: "Confirmación de hallazgo alarmante (desde G2)",
    },
    {
      id: 2,
      grupo: "G2",
      realizadoPor: "Sistema",
      fechaHora: "14/03/2016 00:00",
      justificacion: "Registro inicial",
    },
  ],
  2: [
    {
      id: 1,
      grupo: "G2",
      realizadoPor: "Dra. L. Peña",
      fechaHora: "02/08/2026 10:40",
      justificacion:
        "Espirometría restrictiva leve en EMO periódico (desde G1)",
    },
    {
      id: 2,
      grupo: "G1",
      realizadoPor: "Sistema",
      fechaHora: "20/01/2026 09:00",
      justificacion: "Registro inicial",
    },
  ],
  4: [
    {
      id: 1,
      grupo: "G1",
      realizadoPor: "Dr. M. Salcedo",
      fechaHora: "11/09/2026 01:15",
      justificacion: "Sin hallazgos en reevaluación (desde G2)",
    },
    {
      id: 2,
      grupo: "G2",
      realizadoPor: "Sistema",
      fechaHora: "14/03/2016 00:00",
      justificacion: "Registro inicial",
    },
  ],
  5: [
    {
      id: 1,
      grupo: "G2",
      realizadoPor: "Dr. J. Núñez",
      fechaHora: "28/07/2026 16:20",
      justificacion: "HTA controlada, se retira criterio de alarma (desde G3)",
    },
    {
      id: 2,
      grupo: "G3",
      realizadoPor: "Dr. M. Salcedo",
      fechaHora: "05/05/2026 11:05",
      justificacion: "Somnolencia diurna severa con riesgo vial (desde G2)",
    },
    {
      id: 3,
      grupo: "G2",
      realizadoPor: "Sistema",
      fechaHora: "10/02/2026 08:30",
      justificacion: "Registro inicial",
    },
  ],
  7: [
    {
      id: 1,
      grupo: "G3",
      realizadoPor: "Dr. M. Salcedo",
      fechaHora: "19/08/2026 09:50",
      justificacion: "Progresión radiológica a neumoconiosis 1/1 (desde G2)",
    },
    {
      id: 2,
      grupo: "G2",
      realizadoPor: "Sistema",
      fechaHora: "03/03/2026 12:00",
      justificacion: "Registro inicial",
    },
  ],
  8: [
    {
      id: 1,
      grupo: "G1",
      realizadoPor: "Dra. L. Peña",
      fechaHora: "30/06/2026 14:10",
      justificacion: "Hallazgos no relevantes en control anual (desde G2)",
    },
    {
      id: 2,
      grupo: "G2",
      realizadoPor: "Sistema",
      fechaHora: "12/01/2026 10:15",
      justificacion: "Registro inicial",
    },
  ],
};
