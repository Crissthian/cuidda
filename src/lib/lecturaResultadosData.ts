export type LecturaEstado = "COMPLETADA" | "PENDIENTE";

export interface LecturaConstancia {
  nombre: string;
  dni: string;
  fecha: string;
  transaccion: string;
  modalidad: string;
  hora: string;
  medico: string;
  observaciones: string;
  bioRef: string;
  lector: string;
  registroFechaHora: string;
}

export interface LecturaResultado {
  id: number;
  nombre: string;
  dni: string;
  sede: string;
  puesto: string;
  emo: string;
  fecha: string;
  fechaCorta: string;
  empresa: string;
  medico: string;
  emoRef: string;
  expiracion: string;
  expiracionCorta: string;
  grupo: "G1" | "G2" | "G3";
  modalidad: "Presencial" | "Remota";
  estado: LecturaEstado;
  estadoLabel: string;
  conclusionTitulo: string;
  conclusionDetalle: string;
  resultados: string[];
  recomendaciones: string[];
  constancia: LecturaConstancia | null;
}

export const lecturasResultados: LecturaResultado[] = [
  {
    id: 1,
    nombre: "Rosa Quispe Mamani",
    dni: "44231987",
    sede: "Condorcocha",
    puesto: "Operario de planta",
    emo: "Periódico 2026",
    fecha: "2026-02-11",
    fechaCorta: "2026-02-11",
    empresa: "UNACEM PERU S.A.",
    medico: "Dr. M. Salcedo",
    emoRef: "EMO-T-1042-2026",
    expiracion: "2026-12-31",
    expiracionCorta: "2026-12-31",
    grupo: "G3",
    modalidad: "Presencial",
    estado: "COMPLETADA",
    estadoLabel: "LECTURA COMPLETADA",
    conclusionTitulo: "Apto con restricciones",
    conclusionDetalle: "control por hipoacusia y presión arterial.",
    resultados: [
      "Audiometría: hipoacusia neurosensorial bilateral",
      "Presión arterial 148/92 mmHg",
    ],
    recomendaciones: [
      "Uso permanente de protección auditiva",
      "Control de presión arterial mensual",
    ],
    constancia: {
      nombre: "Rosa Quispe Mamani",
      dni: "44231987",
      fecha: "2026-08-14",
      transaccion: "FRM-3311-77A2",
      modalidad: "Presencial",
      hora: "10:12",
      medico: "Dr. M. Salcedo",
      observaciones:
        "Se explicaron hallazgos audiológicos y control de presión arterial.",
      bioRef: "BIO-REF-9F41",
      lector: "UME-01",
      registroFechaHora: "2026-08-14 10:12",
    },
  },
  {
    id: 2,
    nombre: "Carlos Aliaga Ríos",
    dni: "07712340",
    sede: "Condorcocha",
    puesto: "Supervisor",
    emo: "Periódico 2026",
    fecha: "2026-01-28",
    fechaCorta: "28-01-2026",
    empresa: "UNACEM PERU S.A.",
    medico: "Dr. M. Salcedo",
    emoRef: "EMO-T-0871-2026",
    expiracion: "31-12-2026",
    expiracionCorta: "31-12-2026",
    grupo: "G3",
    modalidad: "Presencial",
    estado: "PENDIENTE",
    estadoLabel: "REQUIERE ATENCIÓN PRESENCIAL",
    conclusionTitulo: "Observado",
    conclusionDetalle: "requiere evaluación neumológica complementaria.",
    resultados: [
      "Espirometría con patrón restrictivo nivel",
      "Radiografía OIT 1/0",
    ],
    recomendaciones: [
      "Repetir espirometría en 30 días",
      "Uso estricto de respirador",
    ],
    constancia: null,
  },
  {
    id: 3,
    nombre: "Milagros Ccanto Vera",
    dni: "70021455",
    sede: "Atococongo",
    puesto: "Analista de laboratorio",
    emo: "Periódico 2026",
    fecha: "2026-03-02",
    fechaCorta: "02-03-2026",
    empresa: "UNACEM PERU S.A.",
    medico: "Dr. M. Salcedo",
    emoRef: "EMO-T-0935-2026",
    expiracion: "31-12-2026",
    expiracionCorta: "31-12-2026",
    grupo: "G2",
    modalidad: "Presencial",
    estado: "PENDIENTE",
    estadoLabel: "REQUIERE ATENCIÓN PRESENCIAL",
    conclusionTitulo: "Observado",
    conclusionDetalle: "requiere reevaluación por hallazgo relevante.",
    resultados: [
      "Hemoglobina 16.8 g/dL sobre valor referencial",
      "Espirometría con patrón obstructivo leve",
    ],
    recomendaciones: [
      "Repetir hemograma en 30 días",
      "Uso de EPP respiratorio en laboratorio",
    ],
    constancia: null,
  },
  {
    id: 4,
    nombre: "Jhon Ramos Huaman",
    dni: "76554320",
    sede: "Atococongo",
    puesto: "Conductor",
    emo: "Periódico 2026",
    fecha: "2026-04-19",
    fechaCorta: "2026-04-19",
    empresa: "UNACEM PERU S.A.",
    medico: "Dr. M. Salcedo",
    emoRef: "EMO-T-1105-2026",
    expiracion: "2026-12-31",
    expiracionCorta: "2026-12-31",
    grupo: "G2",
    modalidad: "Presencial",
    estado: "COMPLETADA",
    estadoLabel: "LECTURA COMPLETADA",
    conclusionTitulo: "Apto con restricciones",
    conclusionDetalle: "control por agudeza visual y somnolencia diurna.",
    resultados: [
      "Agudeza visual 20/30 con corrección",
      "Test de Epworth 11 puntos",
    ],
    recomendaciones: [
      "Uso permanente de lentes correctores",
      "Evaluación de higiene de sueño",
    ],
    constancia: {
      nombre: "Jhon Ramos Huaman",
      dni: "76554320",
      fecha: "2026-08-14",
      transaccion: "FRM-3311-88B4",
      modalidad: "Presencial",
      hora: "11:05",
      medico: "Dr. M. Salcedo",
      observaciones:
        "Se explicaron hallazgos visuales y recomendaciones de fatiga.",
      bioRef: "BIO-REF-7C22",
      lector: "UME-01",
      registroFechaHora: "2026-08-14 11:05",
    },
  },
  {
    id: 5,
    nombre: "Ana Lucía Ferrer",
    dni: "48890012",
    sede: "Conchán",
    puesto: "Asistente administrativa",
    emo: "Periódico 2026",
    fecha: "2026-05-08",
    fechaCorta: "2026-05-08",
    empresa: "UNACEM PERU S.A.",
    medico: "Dr. M. Salcedo",
    emoRef: "EMO-T-1188-2026",
    expiracion: "2026-12-31",
    expiracionCorta: "2026-12-31",
    grupo: "G1",
    modalidad: "Remota",
    estado: "COMPLETADA",
    estadoLabel: "LECTURA COMPLETADA",
    conclusionTitulo: "Apto",
    conclusionDetalle: "sin hallazgos relevantes en EMO periódico.",
    resultados: [
      "Hemograma dentro de valores referenciales",
      "Audiometría normal bilateral",
    ],
    recomendaciones: [
      "Capacitación anual de salud ocupacional",
      "Examen médico anual",
    ],
    constancia: {
      nombre: "Ana Lucía Ferrer",
      dni: "48890012",
      fecha: "2026-08-15",
      transaccion: "FRM-3311-91C8",
      modalidad: "Remota",
      hora: "09:40",
      medico: "Dr. M. Salcedo",
      observaciones: "Entrega remota con confirmación de recepción.",
      bioRef: "BIO-REF-3D19",
      lector: "UME-01",
      registroFechaHora: "2026-08-15 09:40",
    },
  },
];
