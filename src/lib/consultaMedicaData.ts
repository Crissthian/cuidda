/**
 * Datos simulados (Mock) para el módulo de Consulta Médica (Solo UI).
 * Sin llamadas de red ni dependencias de backend.
 */

export interface PacienteConsultaMedica {
  codigo_atencion: string;
  apellido_paciente: string;
  nombre_paciente: string;
  numero_doc: string;
  codigo_especialidad: string;
  descripcion_especialidad: string;
  nombre_medico: string;
  fecha_atencion: string;
  hora_atencion: string;
  estado_atencion: "1" | "2"; // 1: En espera, 2: Culminado
  tipo_atencion?: string; // '001': Regular, '002': Emergencia
  edad?: number;
  procedencia?: string;
  razon_social?: string;
  motivo_consulta?: string;
  // Signos vitales iniciales
  talla?: string;
  peso?: string;
  temperatura?: string;
  frecuenciaRespiratoria?: string;
  frecuenciaCardiaca?: string;
  presionSistolica?: string;
  presionDiastolica?: string;
  saturacionOxigeno?: string;
}

export interface HistorialAtencionConsulta {
  fecha_triaje: string;
  codigo_atencion: string;
  codigo_consulta?: string;
  especialidad: string;
  medico: string;
}

export interface CIE10Item {
  codigo: string;
  descripcion: string;
}

export interface MedicamentoItem {
  IdMedicamento: number;
  CodigoInterno: string;
  NombreProducto: string;
  Presentacion: string;
  PrincipioActivo: string;
  StockActual: number;
}

export interface ExamenAuxiliar {
  id_examen: number;
  numero_examen: number;
  descripcion: string;
  orden: number;
}

export interface SubcategoriaExamen {
  id_subcategoria: number;
  nombre: string;
  orden: number;
  examenes: ExamenAuxiliar[];
}

export interface CategoriaExamen {
  id_categoria: number;
  nombre: string;
  descripcion: string;
  orden: number;
  subcategorias: SubcategoriaExamen[];
}

export interface UbigeoItem {
  num_item: string;
  des_item: string;
}

export interface ArchivoConsulta {
  id: string | number;
  nombre: string;
  subidoPor: string;
  descripcion: string;
  fechaCreacion: string;
  fechaArchivo?: string;
  rutaOriginal: string;
  rutaPreview?: string;
  idAutor?: string;
  tamano?: string;
}

/* =========================================================================
   1. PACIENTES INICIALES
   ========================================================================= */
export const pacientesConsultaMock: PacienteConsultaMedica[] = [
  {
    codigo_atencion: "100452",
    apellido_paciente: "QUISPE ROJAS",
    nombre_paciente: "JUAN CARLOS",
    numero_doc: "45892314",
    codigo_especialidad: "ESP01",
    descripcion_especialidad: "MEDICINA OCUPACIONAL",
    nombre_medico: "DR. MARCO MENDOZA BUSTAMANTE",
    fecha_atencion: "2026-03-08",
    hora_atencion: "08:30",
    estado_atencion: "1",
    tipo_atencion: "001",
    edad: 34,
    procedencia: "1",
    razon_social: "MINERA LOS ANDES S.A.C.",
    motivo_consulta: "EVALUACIÓN MÉDICA PERIÓDICA ANUAL",
    talla: "1.72",
    peso: "74.5",
    temperatura: "36.6",
    frecuenciaRespiratoria: "18",
    frecuenciaCardiaca: "72",
    presionSistolica: "120",
    presionDiastolica: "80",
    saturacionOxigeno: "98",
  },
  {
    codigo_atencion: "100453",
    apellido_paciente: "FLORES MAMANI",
    nombre_paciente: "CARMEN ROSA",
    numero_doc: "70234190",
    codigo_especialidad: "ESP01",
    descripcion_especialidad: "MEDICINA OCUPACIONAL",
    nombre_medico: "DRA. PATRICIA ALVAREZ LUNA",
    fecha_atencion: "2026-03-08",
    hora_atencion: "09:15",
    estado_atencion: "2",
    tipo_atencion: "001",
    edad: 29,
    procedencia: "1",
    razon_social: "CONSTRUCTORA DEL SUR S.R.L.",
    motivo_consulta: "DOLOR LUMBAR POST-ESFUERZO",
    talla: "1.60",
    peso: "62.0",
    temperatura: "36.8",
    frecuenciaRespiratoria: "16",
    frecuenciaCardiaca: "78",
    presionSistolica: "110",
    presionDiastolica: "70",
    saturacionOxigeno: "99",
  },
  {
    codigo_atencion: "100454",
    apellido_paciente: "GARCIA HERRERA",
    nombre_paciente: "LUIS MIGUEL",
    numero_doc: "09874521",
    codigo_especialidad: "ESP02",
    descripcion_especialidad: "EMERGENCIAS Y URGENCIAS",
    nombre_medico: "DR. JORGE SALINAS RIVAS",
    fecha_atencion: "2026-03-08",
    hora_atencion: "10:00",
    estado_atencion: "1",
    tipo_atencion: "002",
    edad: 42,
    procedencia: "2",
    razon_social: "TRANSPORTES INTERNACIONALES S.A.",
    motivo_consulta: "CONTUSIÓN SEVERA EN HOMBRO DERECHO",
    talla: "1.68",
    peso: "81.0",
    temperatura: "37.1",
    frecuenciaRespiratoria: "20",
    frecuenciaCardiaca: "88",
    presionSistolica: "135",
    presionDiastolica: "85",
    saturacionOxigeno: "97",
  },
  {
    codigo_atencion: "100455",
    apellido_paciente: "TORRES CHAVEZ",
    nombre_paciente: "MARIA ELENA",
    numero_doc: "41258963",
    codigo_especialidad: "ESP01",
    descripcion_especialidad: "MEDICINA OCUPACIONAL",
    nombre_medico: "DRA. PATRICIA ALVAREZ LUNA",
    fecha_atencion: "2026-03-08",
    hora_atencion: "10:45",
    estado_atencion: "2",
    tipo_atencion: "001",
    edad: 38,
    procedencia: "1",
    razon_social: "AGROEXPORTADORA SOL VERDE S.A.C.",
    motivo_consulta: "CONTROL POST INCAPACIDAD TEMPORAL",
    talla: "1.55",
    peso: "58.0",
    temperatura: "36.5",
    frecuenciaRespiratoria: "17",
    frecuenciaCardiaca: "70",
    presionSistolica: "115",
    presionDiastolica: "75",
    saturacionOxigeno: "99",
  },
  {
    codigo_atencion: "100456",
    apellido_paciente: "LOPEZ SANTILLAN",
    nombre_paciente: "ANDRES FELIPE",
    numero_doc: "47851236",
    codigo_especialidad: "ESP02",
    descripcion_especialidad: "EMERGENCIAS Y URGENCIAS",
    nombre_medico: "DR. MARCO MENDOZA BUSTAMANTE",
    fecha_atencion: "2026-03-08",
    hora_atencion: "11:20",
    estado_atencion: "2",
    tipo_atencion: "002",
    edad: 26,
    procedencia: "2",
    razon_social: "LOGISTICA ANDINA S.A.",
    motivo_consulta: "HERIDA CORTANTE EN ANTEBRAZO IZQUIERDO",
    talla: "1.75",
    peso: "70.0",
    temperatura: "36.7",
    frecuenciaRespiratoria: "19",
    frecuenciaCardiaca: "82",
    presionSistolica: "125",
    presionDiastolica: "80",
    saturacionOxigeno: "98",
  },
  {
    codigo_atencion: "100457",
    apellido_paciente: "RAMIREZ VEGA",
    nombre_paciente: "SOFIA ISABEL",
    numero_doc: "44589632",
    codigo_especialidad: "ESP01",
    descripcion_especialidad: "MEDICINA OCUPACIONAL",
    nombre_medico: "DR. JORGE SALINAS RIVAS",
    fecha_atencion: "2026-03-08",
    hora_atencion: "12:00",
    estado_atencion: "1",
    tipo_atencion: "001",
    edad: 31,
    procedencia: "1",
    razon_social: "SERVICIOS INTEGRALES METALICOS",
    motivo_consulta: "EXAMEN MÉDICO DE INGRESO",
    talla: "1.63",
    peso: "56.5",
    temperatura: "36.6",
    frecuenciaRespiratoria: "16",
    frecuenciaCardiaca: "68",
    presionSistolica: "110",
    presionDiastolica: "70",
    saturacionOxigeno: "99",
  },
];

/* =========================================================================
   2. HISTORIAL DE ATENCIONES PREVIAS
   ========================================================================= */
export const historialAtencionesMock: Record<
  string,
  HistorialAtencionConsulta[]
> = {
  "45892314": [
    {
      fecha_triaje: "15/01/2026",
      codigo_atencion: "098231",
      codigo_consulta: "00004120",
      especialidad: "MEDICINA GENERAL",
      medico: "DRA. PATRICIA ALVAREZ LUNA",
    },
    {
      fecha_triaje: "20/08/2025",
      codigo_atencion: "087112",
      codigo_consulta: "00003890",
      especialidad: "MEDICINA OCUPACIONAL",
      medico: "DR. MARCO MENDOZA BUSTAMANTE",
    },
  ],
  "70234190": [
    {
      fecha_triaje: "05/11/2025",
      codigo_atencion: "091002",
      codigo_consulta: "00004011",
      especialidad: "MEDICINA DEL TRABAJO",
      medico: "DR. JORGE SALINAS RIVAS",
    },
  ],
  "09874521": [
    {
      fecha_triaje: "10/02/2026",
      codigo_atencion: "099120",
      codigo_consulta: "00004155",
      especialidad: "TRAUMATOLOGIA OCUPACIONAL",
      medico: "DR. MARCO MENDOZA BUSTAMANTE",
    },
  ],
};

/* =========================================================================
   3. CATÁLOGO CIE-10
   ========================================================================= */
export const catalogoCIE10Mock: CIE10Item[] = [
  { codigo: "J00", descripcion: "RINOFARINGITIS AGUDA [RESFRIADO COMÚN]" },
  { codigo: "J02.9", descripcion: "FARINGITIS AGUDA, NO ESPECIFICADA" },
  { codigo: "J03.9", descripcion: "AMIGDALITIS AGUDA, NO ESPECIFICADA" },
  { codigo: "J20.9", descripcion: "BRONQUITIS AGUDA, NO ESPECIFICADA" },
  { codigo: "M54.5", descripcion: "LUMBAGO NO ESPECIFICADO" },
  { codigo: "M54.2", descripcion: "CERVICALGIA" },
  { codigo: "M75.1", descripcion: "SÍNDROME DEL MANGUITO ROTATORIO" },
  { codigo: "K29.7", descripcion: "GASTRITIS, NO ESPECIFICADA" },
  { codigo: "K21.9", descripcion: "ENFERMEDAD POR REFLUJO GASTROESOFÁGICO" },
  { codigo: "I10", descripcion: "HIPERTENSIÓN ESENCIAL (PRIMARIA)" },
  {
    codigo: "E11.9",
    descripcion: "DIABETES MELLITUS TIPO 2 SIN MENCION DE COMPLICACION",
  },
  { codigo: "E66.9", descripcion: "OBESIDAD, NO ESPECIFICADA" },
  {
    codigo: "S61.0",
    descripcion: "HERIDA DE DEDO(S) DE LA MANO, SIN DAÑO DE LA UÑA",
  },
  {
    codigo: "S60.0",
    descripcion: "CONTUSIÓN DE DEDO(S) DE LA MANO, SIN DAÑO DE LA UÑA",
  },
  { codigo: "H10.1", descripcion: "CONJUNTIVITIS AGUDA ATÓPICA" },
  { codigo: "Z00.0", descripcion: "EXAMEN MÉDICO GENERAL DE RUTINA" },
  { codigo: "Z02.1", descripcion: "EXAMEN PREVIO A LA ADMISIÓN AL EMPLEO" },
  {
    codigo: "Z04.2",
    descripcion: "EXAMEN Y OBSERVACIÓN POR ACCIDENTE DE TRABAJO",
  },
];

/* =========================================================================
   4. CATÁLOGO DE MEDICAMENTOS (FARMACIA)
   ========================================================================= */
export const medicamentosMock: MedicamentoItem[] = [
  {
    IdMedicamento: 101,
    CodigoInterno: "MED001",
    NombreProducto: "PARACETAMOL 500 MG TABLETA",
    Presentacion: "TABLETA",
    PrincipioActivo: "PARACETAMOL",
    StockActual: 500,
  },
  {
    IdMedicamento: 102,
    CodigoInterno: "MED002",
    NombreProducto: "IBUPROFENO 400 MG TABLETA",
    Presentacion: "TABLETA",
    PrincipioActivo: "IBUPROFENO",
    StockActual: 320,
  },
  {
    IdMedicamento: 103,
    CodigoInterno: "MED003",
    NombreProducto: "AMOXICILINA 500 MG CAPSULA",
    Presentacion: "CAPSULA",
    PrincipioActivo: "AMOXICILINA",
    StockActual: 180,
  },
  {
    IdMedicamento: 104,
    CodigoInterno: "MED004",
    NombreProducto: "CETIRIZINA 10 MG TABLETA",
    Presentacion: "TABLETA",
    PrincipioActivo: "CETIRIZINA DICLORHIDRATO",
    StockActual: 240,
  },
  {
    IdMedicamento: 105,
    CodigoInterno: "MED005",
    NombreProducto: "OMEPRAZOL 20 MG CAPSULA",
    Presentacion: "CAPSULA",
    PrincipioActivo: "OMEPRAZOL",
    StockActual: 410,
  },
  {
    IdMedicamento: 106,
    CodigoInterno: "MED006",
    NombreProducto: "DICLOFENACO SODICO 50 MG TABLETA",
    Presentacion: "TABLETA",
    PrincipioActivo: "DICLOFENACO SODICO",
    StockActual: 150,
  },
  {
    IdMedicamento: 107,
    CodigoInterno: "MED007",
    NombreProducto: "DEXAMETASONA 4 MG / 2 ML AMPOLLA",
    Presentacion: "INYECTABLE",
    PrincipioActivo: "DEXAMETASONA",
    StockActual: 90,
  },
  {
    IdMedicamento: 108,
    CodigoInterno: "MED008",
    NombreProducto: "COMPLEJO B TABLETA RECUBIERTA",
    Presentacion: "TABLETA RECUBIERTA",
    PrincipioActivo: "TIAMINA + PIRIDOXINA + CIANOCOBALAMINA",
    StockActual: 300,
  },
  {
    IdMedicamento: 109,
    CodigoInterno: "MED009",
    NombreProducto: "NAPROXENO 550 MG TABLETA",
    Presentacion: "TABLETA",
    PrincipioActivo: "NAPROXENO SODICO",
    StockActual: 210,
  },
  {
    IdMedicamento: 110,
    CodigoInterno: "MED010",
    NombreProducto: "CLORFENAMINA MALEATO 4 MG TABLETA",
    Presentacion: "TABLETA",
    PrincipioActivo: "CLORFENAMINA MALEATO",
    StockActual: 350,
  },
];

/* =========================================================================
   5. CATÁLOGO JERÁRQUICO DE EXÁMENES AUXILIARES
   ========================================================================= */
export const categoriasExamenesMock: CategoriaExamen[] = [
  {
    id_categoria: 1,
    nombre: "INTERCONSULTAS",
    descripcion: "Pruebas de sangre, orina y perfiles bioquímicos",
    orden: 1,
    subcategorias: [
      {
        id_subcategoria: 101,
        nombre: "HEMATOLOGÍA",
        orden: 1,
        examenes: [
          {
            id_examen: 1001,
            numero_examen: 1,
            descripcion: "Hemograma Completo + Plaquetas",
            orden: 1,
          },
          {
            id_examen: 1002,
            numero_examen: 2,
            descripcion: "Grupo Sanguíneo y Factor Rh",
            orden: 2,
          },
          {
            id_examen: 1003,
            numero_examen: 3,
            descripcion: "Velocidad de Sedimentación Globular (VSG)",
            orden: 3,
          },
          {
            id_examen: 1004,
            numero_examen: 4,
            descripcion: "Hemoglobina Glicosilada (HbA1c)",
            orden: 4,
          },
        ],
      },
      {
        id_subcategoria: 102,
        nombre: "BIOQUÍMICA",
        orden: 2,
        examenes: [
          {
            id_examen: 1005,
            numero_examen: 5,
            descripcion: "Glucosa Basal en Suero",
            orden: 1,
          },
          {
            id_examen: 1006,
            numero_examen: 6,
            descripcion:
              "Perfil Lipídico (Colesterol, Triglicéridos, HDL, LDL)",
            orden: 2,
          },
          {
            id_examen: 1007,
            numero_examen: 7,
            descripcion:
              "Perfil Hepático (TGO, TGP, Fosfatasa Alcalina, Bilirrubinas)",
            orden: 3,
          },
          {
            id_examen: 1008,
            numero_examen: 8,
            descripcion: "Perfil Renal (Urea, Creatinina, Ácido Úrico)",
            orden: 4,
          },
        ],
      },
      {
        id_subcategoria: 103,
        nombre: "ORINA Y TOXICOLOGÍA",
        orden: 3,
        examenes: [
          {
            id_examen: 1009,
            numero_examen: 9,
            descripcion: "Examen Completo de Orina (Sedimento)",
            orden: 1,
          },
          {
            id_examen: 1010,
            numero_examen: 10,
            descripcion: "Panel Toxicológico (Cocaína / Marihuana)",
            orden: 2,
          },
          {
            id_examen: 1011,
            numero_examen: 11,
            descripcion: "Dosaje de Plomo en Sangre",
            orden: 3,
          },
        ],
      },
    ],
  },
  {
    id_categoria: 2,
    nombre: "ECOGRAFÍAS",
    descripcion: "Estudios radiológicos y ecográficos",
    orden: 2,
    subcategorias: [
      {
        id_subcategoria: 201,
        nombre: "RADIOLOGÍA DIGITAL",
        orden: 1,
        examenes: [
          {
            id_examen: 2001,
            numero_examen: 12,
            descripcion: "Radiografía de Tórax PA (OIT)",
            orden: 1,
          },
          {
            id_examen: 2002,
            numero_examen: 13,
            descripcion: "Radiografía de Columna Lumbar Frontal y Lateral",
            orden: 2,
          },
          {
            id_examen: 2003,
            numero_examen: 14,
            descripcion: "Radiografía de Miembro Superior Afectado",
            orden: 3,
          },
        ],
      },
      {
        id_subcategoria: 202,
        nombre: "ECOGRAFÍA",
        orden: 2,
        examenes: [
          {
            id_examen: 2004,
            numero_examen: 15,
            descripcion: "Ecografía de Partes Blandas",
            orden: 1,
          },
          {
            id_examen: 2005,
            numero_examen: 16,
            descripcion: "Ecografía Abdominal Completa",
            orden: 2,
          },
        ],
      },
    ],
  },
  {
    id_categoria: 3,
    nombre: "LABORATORIO",
    descripcion: "Espirometría, audiometría y cardiología",
    orden: 3,
    subcategorias: [
      {
        id_subcategoria: 301,
        nombre: "FISIOLOGÍA RESPIRATORIA Y AUDITIVA",
        orden: 1,
        examenes: [
          {
            id_examen: 3001,
            numero_examen: 17,
            descripcion: "Espirometría Ocupacional Estandarizada",
            orden: 1,
          },
          {
            id_examen: 3002,
            numero_examen: 18,
            descripcion: "Audiometría Ocupacional Tonal",
            orden: 2,
          },
        ],
      },
      {
        id_subcategoria: 302,
        nombre: "CARDIOLOGÍA",
        orden: 2,
        examenes: [
          {
            id_examen: 3003,
            numero_examen: 19,
            descripcion: "Electrocardiograma (EKG) Reposo 12 Derivaciones",
            orden: 1,
          },
          {
            id_examen: 3004,
            numero_examen: 20,
            descripcion: "Prueba de Esfuerzo Cardiovascular",
            orden: 2,
          },
        ],
      },
    ],
  },
  {
    id_categoria: 4,
    nombre: "PROCEDIMIENTOS",
    descripcion: "Evaluaciones por médico especialista",
    orden: 4,
    subcategorias: [
      {
        id_subcategoria: 401,
        nombre: "ESPECIALIDADES MÉDICAS",
        orden: 1,
        examenes: [
          {
            id_examen: 4001,
            numero_examen: 21,
            descripcion:
              "Interconsulta a Oftalmología (Agudeza Visual y Fondo de Ojo)",
            orden: 1,
          },
          {
            id_examen: 4002,
            numero_examen: 22,
            descripcion: "Interconsulta a Traumatología y Ortopedia",
            orden: 2,
          },
          {
            id_examen: 4003,
            numero_examen: 23,
            descripcion: "Interconsulta a Neumología",
            orden: 3,
          },
          {
            id_examen: 4004,
            numero_examen: 24,
            descripcion: "Interconsulta a Dermatología Ocupacional",
            orden: 4,
          },
        ],
      },
    ],
  },
  {
    id_categoria: 5,
    nombre: "RADIOLOGÍAS",
    descripcion: "Exámenes y procedimientos varios",
    orden: 5,
    subcategorias: [
      {
        id_subcategoria: 501,
        nombre: "RADIOLOGÍA GENERAL",
        orden: 1,
        examenes: [
          {
            id_examen: 5001,
            numero_examen: 25,
            descripcion: "Radiografía de Columna Cervical Frontal y Lateral",
            orden: 1,
          },
          {
            id_examen: 5002,
            numero_examen: 26,
            descripcion: "Radiografía de Columna Dorsal Frontal y Lateral",
            orden: 2,
          },
        ],
      },
    ],
  },
];

/* =========================================================================
   6. CATÁLOGOS AUXILIARES: VÍAS, FRECUENCIAS, SEDES, UBIGEO
   ========================================================================= */
export const sedesMock: { num_item: string; des_item: string }[] = [
  { num_item: "1", des_item: "SEDE CENTRAL LIMA" },
  { num_item: "2", des_item: "SEDE SUR AREQUIPA" },
  { num_item: "3", des_item: "SEDE NORTE TRUJILLO" },
  { num_item: "4", des_item: "SEDE MINA TOQUEPALA" },
];

export const viasAplicacionMock: { num_item: string; des_item: string }[] = [
  { num_item: "1", des_item: "ORAL" },
  { num_item: "2", des_item: "SUBLINGUAL" },
  { num_item: "3", des_item: "INTRAMUSCULAR" },
  { num_item: "4", des_item: "INTRAVENOSA" },
  { num_item: "5", des_item: "TÓPICA" },
  { num_item: "6", des_item: "OFTÁLMICA" },
  { num_item: "7", des_item: "INHALATORIA" },
  { num_item: "8", des_item: "RECTAL" },
];

export const frecuenciasMedicacionMock: {
  num_item: string;
  des_item: string;
}[] = [
  { num_item: "1", des_item: "CADA 4 HORAS" },
  { num_item: "2", des_item: "CADA 6 HORAS" },
  { num_item: "3", des_item: "CADA 8 HORAS" },
  { num_item: "4", des_item: "CADA 12 HORAS" },
  { num_item: "5", des_item: "CADA 24 HORAS (UNA VEZ AL DÍA)" },
  { num_item: "6", des_item: "CONDICIONAL AL DOLOR" },
  { num_item: "7", des_item: "DOSIS ÚNICA" },
];

export const sistemasMock: { num_item: string; des_item: string }[] = [
  { num_item: "1", des_item: "SISTEMA RESPIRATORIO" },
  { num_item: "2", des_item: "SISTEMA MUSCULOESQUELÉTICO" },
  { num_item: "3", des_item: "SISTEMA DIGESTIVO" },
  { num_item: "4", des_item: "SISTEMA CARDIOVASCULAR" },
  { num_item: "5", des_item: "SISTEMA NERVIOSO" },
  { num_item: "6", des_item: "SISTEMA TEGUMENTARIO / PIEL" },
  { num_item: "7", des_item: "ÓRGANOS DE LOS SENTIDOS" },
  { num_item: "8", des_item: "SALUD OCUPACIONAL GENERAL" },
];

export const departamentosMock: UbigeoItem[] = [
  { num_item: "15", des_item: "LIMA" },
  { num_item: "04", des_item: "AREQUIPA" },
  { num_item: "13", des_item: "LA LIBERTAD" },
  { num_item: "20", des_item: "PIURA" },
  { num_item: "11", des_item: "ICA" },
  { num_item: "12", des_item: "JUNIN" },
];

export const provinciasMock: Record<string, UbigeoItem[]> = {
  "15": [
    { num_item: "1501", des_item: "LIMA" },
    { num_item: "1506", des_item: "HUARAL" },
    { num_item: "1507", des_item: "HUAROCHIRI" },
    { num_item: "1505", des_item: "CAÑETE" },
  ],
  "04": [
    { num_item: "0401", des_item: "AREQUIPA" },
    { num_item: "0402", des_item: "CAMANA" },
    { num_item: "0404", des_item: "CAYLLOMA" },
  ],
};

export const distritosMock: Record<string, UbigeoItem[]> = {
  "1501": [
    { num_item: "150101", des_item: "LIMA CERCADO" },
    { num_item: "150103", des_item: "ATE VITARTE" },
    { num_item: "150119", des_item: "MIRAFLORES" },
    { num_item: "150131", des_item: "SAN ISIDRO" },
    { num_item: "150140", des_item: "SURCO" },
    { num_item: "150142", des_item: "VILLA EL SALVADOR" },
  ],
  "0401": [
    { num_item: "040101", des_item: "AREQUIPA CERCADO" },
    { num_item: "040103", des_item: "CAYMA" },
    { num_item: "040105", des_item: "CERRO COLORADO" },
  ],
};

/* =========================================================================
   7. ARCHIVOS DIGITALES MOCK
   ========================================================================= */
export const archivosMock: ArchivoConsulta[] = [
  {
    id: "arch-01",
    nombre: "radiografia_torax_oit.png",
    subidoPor: "Lic. Andrea Morales (Rayos X)",
    descripcion: "Placa de tórax PA OIT con informe de neumoconiosis negativo",
    fechaCreacion: "08/03/2026 09:40",
    fechaArchivo: "2026-03-08",
    rutaOriginal: "/fondo-login.png",
    rutaPreview: "/fondo-login.png",
    idAutor: "MED01-andrea",
    tamano: "2.4 MB",
  },
  {
    id: "arch-02",
    nombre: "resultado_laboratorio_hemograma.pdf",
    subidoPor: "Blgo. Carlos Paredes (Lab)",
    descripcion: "Hemograma automatizado 5 estirpes y perfil lipídico",
    fechaCreacion: "08/03/2026 10:15",
    fechaArchivo: "2026-03-08",
    rutaOriginal: "#",
    idAutor: "LAB03-carlos",
    tamano: "480 KB",
  },
  {
    id: "arch-03",
    nombre: "trazo_electrocardiograma.png",
    subidoPor: "Dra. Patricia Alvarez Luna",
    descripcion: "Trazado de EKG en reposo sin arritmias ni signos de isquemia",
    fechaCreacion: "08/03/2026 11:00",
    fechaArchivo: "2026-03-08",
    rutaOriginal: "/ilustracion-login.png",
    rutaPreview: "/ilustracion-login.png",
    idAutor: "MED02-patricia",
    tamano: "1.1 MB",
  },
];
