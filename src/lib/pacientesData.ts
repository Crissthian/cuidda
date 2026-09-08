/**
 * Datos de ejemplo (mock) para el módulo de Pacientes (solo UI).
 */

export interface PacienteRow {
  CDG_PER: string;
  NUMERO_HISTORIA_PERSONA: string;
  APELLIDO_NOMBRES: string;
}

export interface PacienteHistoria {
  historia: string;
  dni: string;
  nombres: string;
  apellidos: string;
  nombreCompleto: string;
  fechaNacimiento: string;
  edad: string;
  sexo: string;
  estadoCivil: string;
}

export interface AtencionItem {
  cdgAtencion: string;
  cdgTriaje: string;
  fecha: string;
  numero: string;
  especialidad: string;
  triaje: boolean;
  medicina: boolean;
  receta: boolean;
  lab: boolean;
  rx: boolean;
  odonto: boolean;
  otros: boolean;
}

export const pacientesMock: PacienteRow[] = [
  {
    CDG_PER: "000001",
    NUMERO_HISTORIA_PERSONA: "HC-000001",
    APELLIDO_NOMBRES: "QUISPE RAMOS LUIS",
  },
  {
    CDG_PER: "000002",
    NUMERO_HISTORIA_PERSONA: "HC-000002",
    APELLIDO_NOMBRES: "CHAVEZ LOAYZA MARIA",
  },
  {
    CDG_PER: "000003",
    NUMERO_HISTORIA_PERSONA: "HC-000003",
    APELLIDO_NOMBRES: "TITO AYALA JORGE",
  },
  {
    CDG_PER: "000004",
    NUMERO_HISTORIA_PERSONA: "HC-000004",
    APELLIDO_NOMBRES: "GARCIA LUNA ANA",
  },
  {
    CDG_PER: "000005",
    NUMERO_HISTORIA_PERSONA: "HC-000005",
    APELLIDO_NOMBRES: "SANCHEZ ROJAS PEDRO",
  },
  {
    CDG_PER: "000006",
    NUMERO_HISTORIA_PERSONA: "HC-000006",
    APELLIDO_NOMBRES: "DIAZ FLORES CARMEN",
  },
  {
    CDG_PER: "000007",
    NUMERO_HISTORIA_PERSONA: "HC-000007",
    APELLIDO_NOMBRES: "RAMIREZ VEGA JOSE",
  },
  {
    CDG_PER: "000008",
    NUMERO_HISTORIA_PERSONA: "HC-000008",
    APELLIDO_NOMBRES: "MARTINEZ SOTO LUCIA",
  },
];

export const historiasClinicasMock: Record<string, PacienteHistoria> = {
  "HC-000001": {
    historia: "HC-000001",
    dni: "4412896",
    nombres: "LUIS",
    apellidos: "QUISPE RAMOS",
    nombreCompleto: "QUISPE RAMOS LUIS",
    fechaNacimiento: "1985-03-14",
    edad: "41 años",
    sexo: "MASCULINO",
    estadoCivil: "CASADO",
  },
  "HC-000002": {
    historia: "HC-000002",
    dni: "52698874",
    nombres: "MARIA",
    apellidos: "CHAVEZ LOAYZA",
    nombreCompleto: "CHAVEZ LOAYZA MARIA",
    fechaNacimiento: "1990-07-22",
    edad: "36 años",
    sexo: "FEMENINO",
    estadoCivil: "SOLTERO",
  },
  "HC-000003": {
    historia: "HC-000003",
    dni: "75968399",
    nombres: "JORGE",
    apellidos: "TITO AYALA",
    nombreCompleto: "TITO AYALA JORGE",
    fechaNacimiento: "1978-11-05",
    edad: "47 años",
    sexo: "MASCULINO",
    estadoCivil: "CASADO",
  },
  "HC-000004": {
    historia: "HC-000004",
    dni: "41234567",
    nombres: "ANA",
    apellidos: "GARCIA LUNA",
    nombreCompleto: "GARCIA LUNA ANA",
    fechaNacimiento: "1992-01-30",
    edad: "34 años",
    sexo: "FEMENINO",
    estadoCivil: "SOLTERO",
  },
  "HC-000005": {
    historia: "HC-000005",
    dni: "49876543",
    nombres: "PEDRO",
    apellidos: "SANCHEZ ROJAS",
    nombreCompleto: "SANCHEZ ROJAS PEDRO",
    fechaNacimiento: "1980-05-18",
    edad: "46 años",
    sexo: "MASCULINO",
    estadoCivil: "CASADO",
  },
  "HC-000006": {
    historia: "HC-000006",
    dni: "45678901",
    nombres: "CARMEN",
    apellidos: "DIAZ FLORES",
    nombreCompleto: "DIAZ FLORES CARMEN",
    fechaNacimiento: "1988-09-12",
    edad: "37 años",
    sexo: "FEMENINO",
    estadoCivil: "SOLTERO",
  },
  "HC-000007": {
    historia: "HC-000007",
    dni: "42345678",
    nombres: "JOSE",
    apellidos: "RAMIREZ VEGA",
    nombreCompleto: "RAMIREZ VEGA JOSE",
    fechaNacimiento: "1975-02-25",
    edad: "51 años",
    sexo: "MASCULINO",
    estadoCivil: "CASADO",
  },
  "HC-000008": {
    historia: "HC-000008",
    dni: "43456789",
    nombres: "LUCIA",
    apellidos: "MARTINEZ SOTO",
    nombreCompleto: "MARTINEZ SOTO LUCIA",
    fechaNacimiento: "1995-12-08",
    edad: "30 años",
    sexo: "FEMENINO",
    estadoCivil: "SOLTERO",
  },
};

export const atencionesHistorialMock: Record<string, AtencionItem[]> = {
  "HC-000001": [
    {
      cdgAtencion: "0000004789",
      cdgTriaje: "00000001",
      fecha: "05/09/2026",
      numero: "0000004789",
      especialidad: "MEDICINA GENERAL",
      triaje: true,
      medicina: true,
      receta: true,
      lab: true,
      rx: false,
      odonto: false,
      otros: false,
    },
    {
      cdgAtencion: "0000004701",
      cdgTriaje: "00000001",
      fecha: "20/08/2026",
      numero: "0000004701",
      especialidad: "MEDICINA GENERAL",
      triaje: true,
      medicina: true,
      receta: false,
      lab: false,
      rx: false,
      odonto: true,
      otros: false,
    },
    {
      cdgAtencion: "0000004650",
      cdgTriaje: "00000002",
      fecha: "15/07/2026",
      numero: "0000004650",
      especialidad: "CARDIOLOGIA",
      triaje: true,
      medicina: false,
      receta: false,
      lab: true,
      rx: true,
      odonto: false,
      otros: true,
    },
  ],
  "HC-000002": [
    {
      cdgAtencion: "0000004790",
      cdgTriaje: "",
      fecha: "05/09/2026",
      numero: "0000004790",
      especialidad: "MEDICINA GENERAL",
      triaje: false,
      medicina: true,
      receta: true,
      lab: false,
      rx: false,
      odonto: false,
      otros: false,
    },
    {
      cdgAtencion: "0000004710",
      cdgTriaje: "00000003",
      fecha: "22/08/2026",
      numero: "0000004710",
      especialidad: "MEDICINA GENERAL",
      triaje: true,
      medicina: true,
      receta: true,
      lab: true,
      rx: false,
      odonto: false,
      otros: false,
    },
  ],
  "HC-000003": [
    {
      cdgAtencion: "0000004791",
      cdgTriaje: "00000002",
      fecha: "04/09/2026",
      numero: "0000004791",
      especialidad: "CARDIOLOGIA",
      triaje: true,
      medicina: true,
      receta: true,
      lab: true,
      rx: true,
      odonto: false,
      otros: false,
    },
  ],
  "HC-000004": [
    {
      cdgAtencion: "0000004792",
      cdgTriaje: "",
      fecha: "04/09/2026",
      numero: "0000004792",
      especialidad: "MEDICINA GENERAL",
      triaje: false,
      medicina: false,
      receta: false,
      lab: false,
      rx: false,
      odonto: false,
      otros: true,
    },
  ],
  "HC-000005": [
    {
      cdgAtencion: "0000004793",
      cdgTriaje: "00000003",
      fecha: "03/09/2026",
      numero: "0000004793",
      especialidad: "TRAUMATOLOGIA",
      triaje: true,
      medicina: true,
      receta: true,
      lab: false,
      rx: true,
      odonto: false,
      otros: false,
    },
  ],
  "HC-000006": [
    {
      cdgAtencion: "0000004794",
      cdgTriaje: "",
      fecha: "03/09/2026",
      numero: "0000004794",
      especialidad: "MEDICINA GENERAL",
      triaje: false,
      medicina: true,
      receta: false,
      lab: true,
      rx: false,
      odonto: false,
      otros: false,
    },
  ],
  "HC-000007": [
    {
      cdgAtencion: "0000004795",
      cdgTriaje: "00000001",
      fecha: "02/09/2026",
      numero: "0000004795",
      especialidad: "NEUROLOGIA",
      triaje: true,
      medicina: true,
      receta: true,
      lab: true,
      rx: false,
      odonto: true,
      otros: true,
    },
  ],
  "HC-000008": [
    {
      cdgAtencion: "0000004796",
      cdgTriaje: "",
      fecha: "02/09/2026",
      numero: "0000004796",
      especialidad: "MEDICINA GENERAL",
      triaje: false,
      medicina: false,
      receta: false,
      lab: false,
      rx: false,
      odonto: false,
      otros: false,
    },
  ],
};

export const getHistoriaClinica = (historia: string): PacienteHistoria | null =>
  historiasClinicasMock[historia] ?? null;

export const getAtencionesHistorial = (historia: string): AtencionItem[] =>
  atencionesHistorialMock[historia] ?? [];
