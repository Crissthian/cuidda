/**
 * Datos simulados (Mock) para el módulo de Consulta Odontológica (Solo UI).
 * Sin backend, sin dependencias de red.
 */

export interface PacienteOdonto {
  id: string;
  codigoAtencion: string;
  codigoOdontologia: string;
  apellidosNombres: string;
  areaAtencion: string;
  medico: string;
  fechaNacimiento: Date;
  fechaIngreso: Date;
  horaIngreso: string;
  motivoConsulta: string;
  dni: string;
  estadoAtencion: "0" | "2"; // 0: En espera, 2: Culminado
}

export interface CIE10Item {
  codigo: string;
  descripcion: string;
}

export interface MedicamentoOdontoItem {
  IdMedicamento: number;
  CodigoInterno: string;
  NombreProducto: string;
  Presentacion: string;
  PrincipioActivo: string;
  StockActual: number;
}

export interface CatalogoItem {
  num_item: string;
  des_item: string;
}

export interface FilaPlanTratamiento {
  id: number;
  tratamiento: string;
  fecha: string;
  estado: "pendiente" | "culminado";
}

export interface ArchivoOdonto {
  id: string | number;
  nombre: string;
  subidoPor: string;
  descripcion: string;
  fechaCreacion: string;
  fechaArchivo?: string;
  rutaOriginal: string;
  rutaPreview?: string;
  idAutor?: string;
}

// 8 Pacientes Odontológicos Simulados
export const pacientesOdontoMock: PacienteOdonto[] = [
  {
    id: "00000101",
    codigoAtencion: "00000101",
    codigoOdontologia: "00000014",
    apellidosNombres: "MENDOZA FLORES CARLOS ALBERTO",
    areaAtencion: "ODONTOLOGIA",
    medico: "DRA. ANA PAOLA RIVAS",
    fechaNacimiento: new Date(1991, 4, 15),
    fechaIngreso: new Date(2026, 2, 8),
    horaIngreso: "08:30",
    motivoConsulta: "DOLOR AGUDO EN MOLAR INFERIOR DERECHO Y SANGRADO GINGIVAL",
    dni: "45892134",
    estadoAtencion: "0",
  },
  {
    id: "00000102",
    codigoAtencion: "00000102",
    codigoOdontologia: "00000012",
    apellidosNombres: "PAREDES VARGAS LUCIA BEATRIZ",
    areaAtencion: "ODONTOLOGIA",
    medico: "DR. JORGE LUIS MONTALVO",
    fechaNacimiento: new Date(1987, 8, 20),
    fechaIngreso: new Date(2026, 2, 8),
    horaIngreso: "09:15",
    motivoConsulta: "CONTROL PERIODICO Y LIMPIEZA DENTAL (PROFILAXIS)",
    dni: "41258963",
    estadoAtencion: "2",
  },
  {
    id: "00000103",
    codigoAtencion: "00000103",
    codigoOdontologia: "",
    apellidosNombres: "QUISPE CONDORI MANUEL GONZALO",
    areaAtencion: "ODONTOLOGIA",
    medico: "DRA. ANA PAOLA RIVAS",
    fechaNacimiento: new Date(1995, 11, 3),
    fechaIngreso: new Date(2026, 2, 8),
    horaIngreso: "10:00",
    motivoConsulta: "FRACTURA PARCIAL EN INCISIVO SUPERIOR POR TRAUMATISMO",
    dni: "70894512",
    estadoAtencion: "0",
  },
  {
    id: "00000104",
    codigoAtencion: "00000104",
    codigoOdontologia: "00000009",
    apellidosNombres: "RODRIGUEZ SOTO MARIELA YANET",
    areaAtencion: "ODONTOLOGIA",
    medico: "DR. JORGE LUIS MONTALVO",
    fechaNacimiento: new Date(1983, 1, 18),
    fechaIngreso: new Date(2026, 2, 7),
    horaIngreso: "11:40",
    motivoConsulta: "EVALUACION PARA COLOCACION DE PROTESIS FIJA EN ZONA POSTERIOR",
    dni: "09874563",
    estadoAtencion: "2",
  },
  {
    id: "00000105",
    codigoAtencion: "00000105",
    codigoOdontologia: "",
    apellidosNombres: "SANCHEZ GOMEZ PEDRO FELIPE",
    areaAtencion: "ODONTOLOGIA",
    medico: "DRA. ANA PAOLA RIVAS",
    fechaNacimiento: new Date(1979, 6, 25),
    fechaIngreso: new Date(2026, 2, 7),
    horaIngreso: "14:20",
    motivoConsulta: "HIPERSENSIBILIDAD DENTAL GENERALIZADA CON ALIMENTOS FRIOS",
    dni: "10568974",
    estadoAtencion: "0",
  },
  {
    id: "00000106",
    codigoAtencion: "00000106",
    codigoOdontologia: "00000007",
    apellidosNombres: "TORRES MEJIA ELENA ESPERANZA",
    areaAtencion: "ODONTOLOGIA",
    medico: "DR. JORGE LUIS MONTALVO",
    fechaNacimiento: new Date(1999, 10, 12),
    fechaIngreso: new Date(2026, 2, 6),
    horaIngreso: "15:10",
    motivoConsulta: "REVISION POST-OPERATORIA DE EXODONCIA TERCER MOLAR",
    dni: "72365418",
    estadoAtencion: "2",
  },
  {
    id: "00000107",
    codigoAtencion: "00000107",
    codigoOdontologia: "",
    apellidosNombres: "ZAVALA HUAMAN RICARDO ANDRES",
    areaAtencion: "ODONTOLOGIA",
    medico: "DRA. ANA PAOLA RIVAS",
    fechaNacimiento: new Date(1993, 3, 30),
    fechaIngreso: new Date(2026, 2, 6),
    horaIngreso: "16:00",
    motivoConsulta: "MOLESTIAS AL MASTICAR EN PREMOLARES SUPERIORES IZQUIERDOS",
    dni: "47852147",
    estadoAtencion: "0",
  },
  {
    id: "00000108",
    codigoAtencion: "00000108",
    codigoOdontologia: "00000005",
    apellidosNombres: "CHAVEZ GUTIERREZ ROSA AMALIA",
    areaAtencion: "ODONTOLOGIA",
    medico: "DR. JORGE LUIS MONTALVO",
    fechaNacimiento: new Date(1989, 7, 7),
    fechaIngreso: new Date(2026, 2, 5),
    horaIngreso: "16:45",
    motivoConsulta: "SEGUIMIENTO DE TRATAMIENTO DE ENDODONCIA Y SELLADO CORONAL",
    dni: "43658921",
    estadoAtencion: "2",
  },
];

// Diagnósticos CIE-10 Odontológicos Mock
export const cie10OdontoMock: CIE10Item[] = [
  { codigo: "K02.0", descripcion: "CARIES LIMITADA AL ESMALTE" },
  { codigo: "K02.1", descripcion: "CARIES DE LA DENTINA" },
  { codigo: "K02.2", descripcion: "CARIES DEL CEMENTO" },
  { codigo: "K02.8", descripcion: "OTRAS CARIES DENTALES" },
  { codigo: "K04.0", descripcion: "PULPITIS AGUDA Y CRONICA" },
  { codigo: "K04.1", descripcion: "NECROSIS DE LA PULPA" },
  { codigo: "K04.4", descripcion: "PERIODONTITIS APICAL AGUDA ORIGINADA EN LA PULPA" },
  { codigo: "K04.5", descripcion: "PERIODONTITIS APICAL CRONICA" },
  { codigo: "K04.7", descripcion: "ABSCESO PERIAPICAL SIN FISTULA" },
  { codigo: "K05.0", descripcion: "GINGIVITIS AGUDA" },
  { codigo: "K05.1", descripcion: "GINGIVITIS CRONICA" },
  { codigo: "K05.3", descripcion: "PERIODONTITIS CRONICA" },
  { codigo: "K03.0", descripcion: "ATRICION EXCESIVA DE LOS DIENTES" },
  { codigo: "K03.1", descripcion: "ABRASION DE LOS DIENTES" },
  { codigo: "K03.2", descripcion: "EROSION DE LOS DIENTES" },
  { codigo: "K07.2", descripcion: "ANOMALIAS DE LA RELACION ENTRE LOS ARCOS DENTARIOS" },
  { codigo: "K07.3", descripcion: "ANOMALIAS DE LA POSICION DEL DIENTE" },
  { codigo: "Z01.2", descripcion: "EXAMEN ODONTOLOGICO GENERAL" },
];

// Medicamentos Odontológicos Mock
export const medicamentosOdontoMock: MedicamentoOdontoItem[] = [
  {
    IdMedicamento: 1,
    CodigoInterno: "MED-001",
    NombreProducto: "AMOXICILINA 500 MG CAPSULA",
    Presentacion: "CAJA X 100 CAPSULAS",
    PrincipioActivo: "AMOXICILINA",
    StockActual: 150,
  },
  {
    IdMedicamento: 2,
    CodigoInterno: "MED-002",
    NombreProducto: "AMOXICILINA + ACIDO CLAVULANICO 500/125 MG TABLETA",
    Presentacion: "CAJA X 14 TABLETAS",
    PrincipioActivo: "AMOXICILINA + ACIDO CLAVULANICO",
    StockActual: 80,
  },
  {
    IdMedicamento: 3,
    CodigoInterno: "MED-003",
    NombreProducto: "IBUPROFENO 400 MG TABLETA RECUBIERTA",
    Presentacion: "CAJA X 100 TABLETAS",
    PrincipioActivo: "IBUPROFENO",
    StockActual: 240,
  },
  {
    IdMedicamento: 4,
    CodigoInterno: "MED-004",
    NombreProducto: "IBUPROFENO 600 MG TABLETA RECUBIERTA",
    Presentacion: "CAJA X 100 TABLETAS",
    PrincipioActivo: "IBUPROFENO",
    StockActual: 190,
  },
  {
    IdMedicamento: 5,
    CodigoInterno: "MED-005",
    NombreProducto: "PARACETAMOL 500 MG TABLETA",
    Presentacion: "CAJA X 100 TABLETAS",
    PrincipioActivo: "PARACETAMOL",
    StockActual: 320,
  },
  {
    IdMedicamento: 6,
    CodigoInterno: "MED-006",
    NombreProducto: "CLORHEXIDINA GLUCONATO 0.12% ENJUAGUE BUCAL 300 ML",
    Presentacion: "FRASCO X 300 ML",
    PrincipioActivo: "CLORHEXIDINA",
    StockActual: 45,
  },
  {
    IdMedicamento: 7,
    CodigoInterno: "MED-007",
    NombreProducto: "KETOROLACO TROMETAMINA 10 MG TABLETA SUBLINGUAL",
    Presentacion: "CAJA X 10 TABLETAS",
    PrincipioActivo: "KETOROLACO",
    StockActual: 60,
  },
  {
    IdMedicamento: 8,
    CodigoInterno: "MED-008",
    NombreProducto: "CLINDAMICINA 300 MG CAPSULA",
    Presentacion: "CAJA X 24 CAPSULAS",
    PrincipioActivo: "CLINDAMICINA",
    StockActual: 55,
  },
  {
    IdMedicamento: 9,
    CodigoInterno: "MED-009",
    NombreProducto: "DEXAMETASONA 4 MG TABLETA",
    Presentacion: "CAJA X 10 TABLETAS",
    PrincipioActivo: "DEXAMETASONA",
    StockActual: 90,
  },
  {
    IdMedicamento: 10,
    CodigoInterno: "MED-010",
    NombreProducto: "NAPROXENO SODICO 550 MG TABLETA",
    Presentacion: "CAJA X 20 TABLETAS",
    PrincipioActivo: "NAPROXENO",
    StockActual: 110,
  },
];

// Vías de Administración
export const viasAplicacionOdonto: CatalogoItem[] = [
  { num_item: "01", des_item: "ORAL" },
  { num_item: "02", des_item: "TOPICA" },
  { num_item: "03", des_item: "SUBLINGUAL" },
  { num_item: "04", des_item: "INTRAMUSCULAR" },
];

// Frecuencias de Medicación
export const frecuenciasOdonto: CatalogoItem[] = [
  { num_item: "01", des_item: "CADA 6 HORAS" },
  { num_item: "02", des_item: "CADA 8 HORAS" },
  { num_item: "03", des_item: "CADA 12 HORAS" },
  { num_item: "04", des_item: "CADA 24 HORAS" },
  { num_item: "05", des_item: "DOSIS UNICA" },
  { num_item: "06", des_item: "CONDICIONAL AL DOLOR" },
];

// Sistemas
export const sistemasOdonto: CatalogoItem[] = [
  { num_item: "01", des_item: "SISTEMA ESTOMATOGNATICO" },
  { num_item: "02", des_item: "SISTEMA DIGESTIVO" },
  { num_item: "03", des_item: "SISTEMA RESPIRATORIO" },
  { num_item: "04", des_item: "SISTEMA CARDIOVASCULAR" },
  { num_item: "05", des_item: "SISTEMA NERVIOSO" },
  { num_item: "06", des_item: "GENERAL / MULTISISTEMICO" },
];

// Archivos Digitales Mock
export const archivosOdontoMock: ArchivoOdonto[] = [
  {
    id: "1",
    nombre: "radiografia_panoramica_01.jpg",
    subidoPor: "DRA. ANA PAOLA RIVAS",
    descripcion: "Radiografía panorámica pre-operatoria de piezas posteriores",
    fechaCreacion: "2026-03-08 08:45",
    fechaArchivo: "2026-03-08",
    rutaOriginal: "/archivos/odonto/rx_panoramica.jpg",
    rutaPreview: "/images/logopdf.png",
    idAutor: "DOC-001",
  },
  {
    id: "2",
    nombre: "rx_periapical_pieza_46.jpg",
    subidoPor: "DRA. ANA PAOLA RIVAS",
    descripcion: "Radiografía periapical localizada pieza 46",
    fechaCreacion: "2026-03-08 08:50",
    fechaArchivo: "2026-03-08",
    rutaOriginal: "/archivos/odonto/rx_46.jpg",
    rutaPreview: "/images/logopdf.png",
    idAutor: "DOC-001",
  },
];
