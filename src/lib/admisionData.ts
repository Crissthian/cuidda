/**
 * Datos de ejemplo (mock) para el módulo de Admisión en Cuidda.
 * Reemplazan los catálogos y consultas del servidor de Lucemedic.
 */

export interface TablaItem {
  num_item: string;
  des_item: string;
}

export interface Catalogs {
  sedes: TablaItem[];
  procedencias: TablaItem[];
  planillas: TablaItem[];
  especialidades: TablaItem[];
  tiposDocumento: TablaItem[];
  sexos: TablaItem[];
  estadoCivil: TablaItem[];
  gradoInstruccion: TablaItem[];
  departamentos: TablaItem[];
  tipoAtencion: TablaItem[];
}

export const catalogsAdmision: Catalogs = {
  sedes: [
    { num_item: "001", des_item: "SEDE LIMA" },
    { num_item: "002", des_item: "SEDE CONDORCOCHA" },
    { num_item: "003", des_item: "SEDE AREQUIPA" },
  ],
  procedencias: [
    { num_item: "001", des_item: "PLANILLA" },
    { num_item: "002", des_item: "PARTICULAR" },
    { num_item: "003", des_item: "CONVENIO" },
  ],
  planillas: [
    { num_item: "001", des_item: "PLANILLA GENERAL" },
    { num_item: "002", des_item: "PLANILLA CONTRATISTAS" },
    { num_item: "003", des_item: "PLANILLA ADMINISTRATIVA" },
  ],
  especialidades: [
    { num_item: "001", des_item: "MEDICINA GENERAL" },
    { num_item: "002", des_item: "MEDICINA INTERNA" },
    { num_item: "003", des_item: "PEDIATRÍA" },
    { num_item: "004", des_item: "GINECOLOGÍA" },
    { num_item: "005", des_item: "CARDIOLOGÍA" },
    { num_item: "006", des_item: "TRAUMATOLOGÍA" },
    { num_item: "007", des_item: "DERMATOLOGÍA" },
    { num_item: "008", des_item: "NEUROLOGÍA" },
    { num_item: "009", des_item: "ECOGRAFÍA" },
    { num_item: "010", des_item: "LABORATORIO" },
    { num_item: "011", des_item: "ESPECIALIDAD 011" },
  ],
  tiposDocumento: [
    { num_item: "001", des_item: "DNI" },
    { num_item: "002", des_item: "CARNET DE EXTRANJERÍA" },
    { num_item: "003", des_item: "PASAPORTE" },
    { num_item: "004", des_item: "RUC" },
  ],
  sexos: [
    { num_item: "000", des_item: "SELECCIONE" },
    { num_item: "001", des_item: "MASCULINO" },
    { num_item: "002", des_item: "FEMENINO" },
  ],
  estadoCivil: [
    { num_item: "001", des_item: "SOLTERO" },
    { num_item: "002", des_item: "CASADO" },
    { num_item: "003", des_item: "DIVORCIADO" },
    { num_item: "004", des_item: "VIUDO" },
  ],
  gradoInstruccion: [
    { num_item: "001", des_item: "PRIMARIA" },
    { num_item: "002", des_item: "SECUNDARIA" },
    { num_item: "003", des_item: "TÉCNICO" },
    { num_item: "004", des_item: "UNIVERSITARIO" },
    { num_item: "005", des_item: "POSTGRADO" },
  ],
  departamentos: [
    { num_item: "01", des_item: "AMAZONAS" },
    { num_item: "02", des_item: "ANCASH" },
    { num_item: "03", des_item: "APURIMAC" },
    { num_item: "04", des_item: "AREQUIPA" },
    { num_item: "05", des_item: "AYACUCHO" },
    { num_item: "06", des_item: "CAJAMARCA" },
    { num_item: "07", des_item: "CALLAO" },
    { num_item: "08", des_item: "CUSCO" },
    { num_item: "09", des_item: "HUANCAVELICA" },
    { num_item: "10", des_item: "HUANUCO" },
    { num_item: "11", des_item: "ICA" },
    { num_item: "12", des_item: "JUNIN" },
    { num_item: "13", des_item: "LA LIBERTAD" },
    { num_item: "14", des_item: "LAMBAYEQUE" },
    { num_item: "15", des_item: "LIMA" },
    { num_item: "16", des_item: "LORETO" },
    { num_item: "17", des_item: "MADRE DE DIOS" },
    { num_item: "18", des_item: "MOQUEGUA" },
    { num_item: "19", des_item: "PASCO" },
    { num_item: "20", des_item: "PIURA" },
    { num_item: "21", des_item: "PUNO" },
    { num_item: "22", des_item: "SAN MARTIN" },
    { num_item: "23", des_item: "TACNA" },
    { num_item: "24", des_item: "TUMBES" },
    { num_item: "25", des_item: "UCAYALI" },
  ],
  tipoAtencion: [
    { num_item: "001", des_item: "CONSULTA EXTERNA" },
    { num_item: "002", des_item: "EMERGENCIA" },
    { num_item: "003", des_item: "HOSPITALIZACIÓN" },
  ],
};

export interface Empresa {
  ruc_cli: string;
  des_cli: string;
  dir_cli: string;
}

export const empresasMock: Empresa[] = [
  {
    ruc_cli: "20123456789",
    des_cli: "UNACEM S.A.A.",
    dir_cli: "AV. ATOCONGO 2440, ATE",
  },
  {
    ruc_cli: "20512345678",
    des_cli: "MINERA CONDORCOCHA S.A.",
    dir_cli: "JR. LOS SAUCES 120, CONDORCOCHA",
  },
  {
    ruc_cli: "20612345678",
    des_cli: "CONSTRUCTORA ANDINA S.A.C.",
    dir_cli: "AV. LA MARINA 890, SAN MIGUEL",
  },
  {
    ruc_cli: "20198765432",
    des_cli: "TRANSPORTES EL SOL E.I.R.L.",
    dir_cli: "CALLE LOS OLIVOS 45, SURCO",
  },
];

export interface PacienteMock {
  NUM_DNI: string;
  NOMBRE_PERSONA: string;
  APELLIDO_PERSONA: string;
  FECHA_NAC_PERSONA: string;
  CDG_SEX: string;
  CDG_EST: string;
  CDG_INSTR: string;
  CDG_DEP2: string;
  num_tel: string;
  MAIL_PERSONA: string;
  DIRECCION_PERSONA: string;
  WEB_PERSONA: string;
  TIP_DOCU: string;
  CONTACTO_EMERGENCIA: string;
  PARENTESCO_PAC: string;
  TELEFONO_EMERGENCIA: string;
}

export const pacientesMock: PacienteMock[] = [
  {
    NUM_DNI: "4412896",
    NOMBRE_PERSONA: "LUIS",
    APELLIDO_PERSONA: "QUISPE RAMOS",
    FECHA_NAC_PERSONA: "1985-03-14",
    CDG_SEX: "001",
    CDG_EST: "002",
    CDG_INSTR: "004",
    CDG_DEP2: "15",
    num_tel: "987654321",
    MAIL_PERSONA: "luis.quispe@correo.com",
    DIRECCION_PERSONA: "AV. LOS ALAMOS 123, ATE",
    WEB_PERSONA: "UNACEM-001",
    TIP_DOCU: "001",
    CONTACTO_EMERGENCIA: "MARIA QUISPE",
    PARENTESCO_PAC: "ESPOSA",
    TELEFONO_EMERGENCIA: "912345678",
  },
  {
    NUM_DNI: "52698874",
    NOMBRE_PERSONA: "MARIA",
    APELLIDO_PERSONA: "CHAVEZ LOAYZA",
    FECHA_NAC_PERSONA: "1990-07-22",
    CDG_SEX: "002",
    CDG_EST: "001",
    CDG_INSTR: "003",
    CDG_DEP2: "15",
    num_tel: "976543210",
    MAIL_PERSONA: "maria.chavez@correo.com",
    DIRECCION_PERSONA: "JR. LAS PALMAS 456, LA VICTORIA",
    WEB_PERSONA: "UNACEM-002",
    TIP_DOCU: "001",
    CONTACTO_EMERGENCIA: "PEDRO CHAVEZ",
    PARENTESCO_PAC: "HERMANO",
    TELEFONO_EMERGENCIA: "965432109",
  },
  {
    NUM_DNI: "75968399",
    NOMBRE_PERSONA: "JORGE",
    APELLIDO_PERSONA: "TITO AYALA",
    FECHA_NAC_PERSONA: "1978-11-05",
    CDG_SEX: "001",
    CDG_EST: "002",
    CDG_INSTR: "002",
    CDG_DEP2: "04",
    num_tel: "954321098",
    MAIL_PERSONA: "jorge.tito@correo.com",
    DIRECCION_PERSONA: "AV. EJERCITO 789, AREQUIPA",
    WEB_PERSONA: "UNACEM-003",
    TIP_DOCU: "001",
    CONTACTO_EMERGENCIA: "ANA TITO",
    PARENTESCO_PAC: "MADRE",
    TELEFONO_EMERGENCIA: "943210987",
  },
];

export interface MedicoMock {
  cdg_med: string;
  des_med: string;
  cod_med: string;
  ruc_med: string;
  dir_med: string;
  tel_med: string;
  swt_med: number;
}

export const medicosMock: MedicoMock[] = [
  {
    cdg_med: "001",
    des_med: "DR. CARLOS PEREZ GOMEZ",
    cod_med: "CMP-12345",
    ruc_med: "",
    dir_med: "AV. LIMA 100",
    tel_med: "999111222",
    swt_med: 1,
  },
  {
    cdg_med: "002",
    des_med: "DRA. ROSA FLORES DIAZ",
    cod_med: "CMP-23456",
    ruc_med: "",
    dir_med: "JR. UNION 200",
    tel_med: "999333444",
    swt_med: 2,
  },
  {
    cdg_med: "003",
    des_med: "DR. MIGUEL TORRES VEGA",
    cod_med: "CMP-34567",
    ruc_med: "",
    dir_med: "AV. AREQUIPA 300",
    tel_med: "999555666",
    swt_med: 3,
  },
];

export interface ExamenCatalogo {
  id_examen: number;
  numero_examen: number;
  examen: string;
  precio: number;
}

export const examenesLaboratorioMock: ExamenCatalogo[] = [
  {
    id_examen: 1,
    numero_examen: 101,
    examen: "HEMOGRAMA COMPLETO",
    precio: 25.0,
  },
  {
    id_examen: 2,
    numero_examen: 102,
    examen: "GLUCOSA EN AYUNAS",
    precio: 15.0,
  },
  { id_examen: 3, numero_examen: 103, examen: "PERFIL LIPIDICO", precio: 45.0 },
  { id_examen: 4, numero_examen: 104, examen: "CREATININA", precio: 18.0 },
  {
    id_examen: 5,
    numero_examen: 105,
    examen: "EXAMEN COMPLETO DE ORINA",
    precio: 22.0,
  },
  { id_examen: 6, numero_examen: 106, examen: "TSH", precio: 35.0 },
  { id_examen: 7, numero_examen: 107, examen: "TGO / TGP", precio: 28.0 },
  { id_examen: 8, numero_examen: 108, examen: "BILIRRUBINAS", precio: 20.0 },
];

export interface Subcategoria {
  id_subcategoria: number;
  nombre: string;
  orden: number;
  precio?: number | null;
}

export const subcategoriasMock: Record<number, Subcategoria[]> = {
  2: [
    { id_subcategoria: 1, nombre: "ECOGRAFIA ABDOMINAL", orden: 1, precio: 80 },
    { id_subcategoria: 2, nombre: "ECOGRAFIA PELVICA", orden: 2, precio: 90 },
    { id_subcategoria: 3, nombre: "ECOGRAFIA MAMARIA", orden: 3, precio: 85 },
    { id_subcategoria: 4, nombre: "ECOGRAFIA TIROIDEA", orden: 4, precio: 75 },
  ],
  5: [
    {
      id_subcategoria: 1,
      nombre: "EXAMEN ESPECIALIDAD A",
      orden: 1,
      precio: 60,
    },
    {
      id_subcategoria: 2,
      nombre: "EXAMEN ESPECIALIDAD B",
      orden: 2,
      precio: 70,
    },
    {
      id_subcategoria: 3,
      nombre: "EXAMEN ESPECIALIDAD C",
      orden: 3,
      precio: 65,
    },
  ],
};

export interface Producto {
  codigo: string;
  descripcion: string;
  precio_soles: number;
  precio_dolares: number;
}

export const productosMock: Producto[] = [
  {
    codigo: "P001",
    descripcion: "CONSULTA MEDICA GENERAL",
    precio_soles: 50,
    precio_dolares: 13.5,
  },
  {
    codigo: "P002",
    descripcion: "HEMOGRAMA COMPLETO",
    precio_soles: 25,
    precio_dolares: 6.75,
  },
  {
    codigo: "P003",
    descripcion: "RADIOGRAFIA DE TORAX",
    precio_soles: 40,
    precio_dolares: 10.8,
  },
  {
    codigo: "P004",
    descripcion: "ELECTROCARDIOGRAMA",
    precio_soles: 35,
    precio_dolares: 9.45,
  },
  {
    codigo: "P005",
    descripcion: "ECOGRAFIA ABDOMINAL",
    precio_soles: 80,
    precio_dolares: 21.6,
  },
];

export const monedasMock: TablaItem[] = [
  { num_item: "001", des_item: "SOLES" },
  { num_item: "002", des_item: "DOLARES" },
];

export const condicionesPagoMock: TablaItem[] = [
  { num_item: "001", des_item: "CONTADO" },
  { num_item: "002", des_item: "CREDITO" },
];

export const formasPagoMock: TablaItem[] = [
  { num_item: "001", des_item: "EFECTIVO" },
  { num_item: "002", des_item: "TARJETA" },
  { num_item: "003", des_item: "TRANSFERENCIA" },
];

export const vendedoresMock: TablaItem[] = [
  { num_item: "001", des_item: "ADMINISTRADOR" },
  { num_item: "002", des_item: "CAJERO 1" },
];

export const provinciasMock: Record<string, TablaItem[]> = {
  "15": [
    { num_item: "1501", des_item: "LIMA" },
    { num_item: "1502", des_item: "ANCON" },
    { num_item: "1503", des_item: "ATE" },
  ],
  "04": [
    { num_item: "0401", des_item: "AREQUIPA" },
    { num_item: "0402", des_item: "CAMANA" },
  ],
};

export const distritosMock: Record<string, TablaItem[]> = {
  "1501": [
    { num_item: "150101", des_item: "LIMA" },
    { num_item: "150102", des_item: "BARRANCO" },
  ],
  "1503": [
    { num_item: "150301", des_item: "ATE" },
    { num_item: "150302", des_item: "SANTA ANITA" },
  ],
  "0401": [
    { num_item: "040101", des_item: "AREQUIPA" },
    { num_item: "040102", des_item: "JOSE LUIS BUSTAMANTE" },
  ],
};
