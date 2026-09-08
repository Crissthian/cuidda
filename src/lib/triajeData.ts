/**
 * Datos de ejemplo (mock) para el módulo de Triaje (solo UI).
 */

export interface AtencionTriaje {
    codigo_atencion: string;
    nombre_paciente: string;
    apellido_paciente: string;
    descripcion_especialidad: string;
    nombre_medico: string;
    fecha_atencion: string;
    hora_atencion: string;
    numero_doc: string;
    estado_atencion: string;
}

export interface HistorialAtencion {
    id: string;
    fecha: string;
    especialidad: string;
    medico: string;
    cdg_ate: string;
}

export interface CatalogoItem {
    num_item: string;
    des_item: string;
}

export interface MedicoCatalogo {
    cdg_med: string;
    des_med: string;
    cod_med: string;
}

export interface CatalogosTriaje {
    tiposDocumento: CatalogoItem[];
    sexos: CatalogoItem[];
    medicos: MedicoCatalogo[];
    procedencia: CatalogoItem[];
}

export interface PacienteDataTriaje {
    tipoDocumento: string;
    numDocumento: string;
    nombreApellido: string;
    fechaNacimiento: string;
    sexo: string;
    fechaAtencion: string;
    horaAtencion: string;
    medicoAsignado: string;
    procedencia: string;
    ruc: string;
    razonSocial: string;
    especialidad: string;
    motivoConsulta: string;
    codigoAtencion: string;
}

export interface SignosVitalesTriaje {
    talla?: number;
    peso?: number;
    temperatura_sv?: number;
    frecuencia_respiratoria?: number;
    frecuencia_cardiaca?: number;
    presion_sistolica?: number;
    presion_diastolica?: number;
    saturacion_oxigeno?: number;
}

export interface AntecedentesTriaje {
    tri_sed?: string;
    tri_ape?: string;
    tri_mic?: string;
    tri_sue?: string;
    tri_dep?: string;
    tri_estnut?: string;
    tri_sud?: string;
    tri_estan?: string;
    tri_temp?: number;
    tri_pres?: number;
}

export interface TriajeRegistro {
    signosVitales: SignosVitalesTriaje;
    antecedentes: AntecedentesTriaje;
}

export const atencionesTriajeMock: AtencionTriaje[] = [
    {
        codigo_atencion: "0000004789",
        nombre_paciente: "LUIS",
        apellido_paciente: "QUISPE RAMOS",
        descripcion_especialidad: "MEDICINA GENERAL",
        nombre_medico: "DR. CARLOS PEREZ GOMEZ",
        fecha_atencion: "2026-09-05",
        hora_atencion: "08:30",
        numero_doc: "4412896",
        estado_atencion: "0",
    },
    {
        codigo_atencion: "0000004790",
        nombre_paciente: "MARIA",
        apellido_paciente: "CHAVEZ LOAYZA",
        descripcion_especialidad: "MEDICINA GENERAL",
        nombre_medico: "DRA. ROSA FLORES DIAZ",
        fecha_atencion: "2026-09-05",
        hora_atencion: "09:00",
        numero_doc: "52698874",
        estado_atencion: "0",
    },
    {
        codigo_atencion: "0000004791",
        nombre_paciente: "JORGE",
        apellido_paciente: "TITO AYALA",
        descripcion_especialidad: "CARDIOLOGIA",
        nombre_medico: "DR. MIGUEL TORRES VEGA",
        fecha_atencion: "2026-09-04",
        hora_atencion: "10:15",
        numero_doc: "75968399",
        estado_atencion: "1",
    },
    {
        codigo_atencion: "0000004792",
        nombre_paciente: "ANA",
        apellido_paciente: "GARCIA LUNA",
        descripcion_especialidad: "MEDICINA GENERAL",
        nombre_medico: "DR. CARLOS PEREZ GOMEZ",
        fecha_atencion: "2026-09-04",
        hora_atencion: "11:00",
        numero_doc: "41234567",
        estado_atencion: "0",
    },
    {
        codigo_atencion: "0000004793",
        nombre_paciente: "PEDRO",
        apellido_paciente: "SANCHEZ ROJAS",
        descripcion_especialidad: "TRAUMATOLOGIA",
        nombre_medico: "DR. MIGUEL TORRES VEGA",
        fecha_atencion: "2026-09-03",
        hora_atencion: "08:45",
        numero_doc: "49876543",
        estado_atencion: "1",
    },
    {
        codigo_atencion: "0000004794",
        nombre_paciente: "CARMEN",
        apellido_paciente: "DIAZ FLORES",
        descripcion_especialidad: "MEDICINA GENERAL",
        nombre_medico: "DRA. ROSA FLORES DIAZ",
        fecha_atencion: "2026-09-03",
        hora_atencion: "09:30",
        numero_doc: "45678901",
        estado_atencion: "0",
    },
    {
        codigo_atencion: "0000004795",
        nombre_paciente: "JOSE",
        apellido_paciente: "RAMIREZ VEGA",
        descripcion_especialidad: "NEUROLOGIA",
        nombre_medico: "DR. CARLOS PEREZ GOMEZ",
        fecha_atencion: "2026-09-02",
        hora_atencion: "10:00",
        numero_doc: "42345678",
        estado_atencion: "1",
    },
    {
        codigo_atencion: "0000004796",
        nombre_paciente: "LUCIA",
        apellido_paciente: "MARTINEZ SOTO",
        descripcion_especialidad: "MEDICINA GENERAL",
        nombre_medico: "DRA. ROSA FLORES DIAZ",
        fecha_atencion: "2026-09-02",
        hora_atencion: "11:30",
        numero_doc: "43456789",
        estado_atencion: "0",
    },
];

export const catalogosTriajeMock: CatalogosTriaje = {
    tiposDocumento: [
        { num_item: "001", des_item: "DNI" },
        { num_item: "002", des_item: "CARNET DE EXTRANJERIA" },
        { num_item: "003", des_item: "PASAPORTE" },
    ],
    sexos: [
        { num_item: "001", des_item: "MASCULINO" },
        { num_item: "002", des_item: "FEMENINO" },
    ],
    medicos: [
        {
            cdg_med: "001",
            des_med: "DR. CARLOS PEREZ GOMEZ",
            cod_med: "CMP-12345",
        },
        {
            cdg_med: "002",
            des_med: "DRA. ROSA FLORES DIAZ",
            cod_med: "CMP-23456",
        },
        {
            cdg_med: "003",
            des_med: "DR. MIGUEL TORRES VEGA",
            cod_med: "CMP-34567",
        },
    ],
    procedencia: [
        { num_item: "001", des_item: "EMPRESA" },
        { num_item: "002", des_item: "EXTERNO" },
        { num_item: "003", des_item: "CONVENIO" },
    ],
};

export const historialTriajeMock: HistorialAtencion[] = [
    {
        id: "00000001",
        fecha: "2026-08-20",
        especialidad: "MEDICINA GENERAL",
        medico: "DR. CARLOS PEREZ GOMEZ",
        cdg_ate: "0000004701",
    },
    {
        id: "00000002",
        fecha: "2026-07-15",
        especialidad: "CARDIOLOGIA",
        medico: "DR. MIGUEL TORRES VEGA",
        cdg_ate: "0000004650",
    },
    {
        id: "00000003",
        fecha: "2026-06-10",
        especialidad: "MEDICINA GENERAL",
        medico: "DRA. ROSA FLORES DIAZ",
        cdg_ate: "0000004602",
    },
];

export const pacienteDataTriajeMock: Record<string, PacienteDataTriaje> = {
    "0000004789": {
        tipoDocumento: "001",
        numDocumento: "4412896",
        nombreApellido: "LUIS QUISPE RAMOS",
        fechaNacimiento: "1985-03-14",
        sexo: "001",
        fechaAtencion: "2026-09-05",
        horaAtencion: "08:30",
        medicoAsignado: "001",
        procedencia: "001",
        ruc: "20123456789",
        razonSocial: "UNACEM S.A.A.",
        especialidad: "MEDICINA GENERAL",
        motivoConsulta: "EXAMEN MEDICO OCUPACIONAL PERIODICO",
        codigoAtencion: "0000004789",
    },
    "0000004790": {
        tipoDocumento: "001",
        numDocumento: "52698874",
        nombreApellido: "MARIA CHAVEZ LOAYZA",
        fechaNacimiento: "1990-07-22",
        sexo: "002",
        fechaAtencion: "2026-09-05",
        horaAtencion: "09:00",
        medicoAsignado: "002",
        procedencia: "001",
        ruc: "20123456789",
        razonSocial: "UNACEM S.A.A.",
        especialidad: "MEDICINA GENERAL",
        motivoConsulta: "CONTROL DE SALUD",
        codigoAtencion: "0000004790",
    },
    "0000004791": {
        tipoDocumento: "001",
        numDocumento: "75968399",
        nombreApellido: "JORGE TITO AYALA",
        fechaNacimiento: "1978-11-05",
        sexo: "001",
        fechaAtencion: "2026-09-04",
        horaAtencion: "10:15",
        medicoAsignado: "003",
        procedencia: "001",
        ruc: "20123456789",
        razonSocial: "UNACEM S.A.A.",
        especialidad: "CARDIOLOGIA",
        motivoConsulta: "DOLOR TORACICO",
        codigoAtencion: "0000004791",
    },
    "0000004792": {
        tipoDocumento: "001",
        numDocumento: "41234567",
        nombreApellido: "ANA GARCIA LUNA",
        fechaNacimiento: "1992-01-30",
        sexo: "002",
        fechaAtencion: "2026-09-04",
        horaAtencion: "11:00",
        medicoAsignado: "001",
        procedencia: "002",
        ruc: "20512345678",
        razonSocial: "MINERA CONDORCOCHA S.A.",
        especialidad: "MEDICINA GENERAL",
        motivoConsulta: "CEFALEA FRECUENTE",
        codigoAtencion: "0000004792",
    },
    "0000004793": {
        tipoDocumento: "001",
        numDocumento: "49876543",
        nombreApellido: "PEDRO SANCHEZ ROJAS",
        fechaNacimiento: "1980-05-18",
        sexo: "001",
        fechaAtencion: "2026-09-03",
        horaAtencion: "08:45",
        medicoAsignado: "003",
        procedencia: "001",
        ruc: "20123456789",
        razonSocial: "UNACEM S.A.A.",
        especialidad: "TRAUMATOLOGIA",
        motivoConsulta: "DOLOR LUMBAR",
        codigoAtencion: "0000004793",
    },
    "0000004794": {
        tipoDocumento: "001",
        numDocumento: "45678901",
        nombreApellido: "CARMEN DIAZ FLORES",
        fechaNacimiento: "1988-09-12",
        sexo: "002",
        fechaAtencion: "2026-09-03",
        horaAtencion: "09:30",
        medicoAsignado: "002",
        procedencia: "001",
        ruc: "20123456789",
        razonSocial: "UNACEM S.A.A.",
        especialidad: "MEDICINA GENERAL",
        motivoConsulta: "FIEBRE Y MALESTAR GENERAL",
        codigoAtencion: "0000004794",
    },
    "0000004795": {
        tipoDocumento: "001",
        numDocumento: "42345678",
        nombreApellido: "JOSE RAMIREZ VEGA",
        fechaNacimiento: "1975-02-25",
        sexo: "001",
        fechaAtencion: "2026-09-02",
        horaAtencion: "10:00",
        medicoAsignado: "001",
        procedencia: "001",
        ruc: "20123456789",
        razonSocial: "UNACEM S.A.A.",
        especialidad: "NEUROLOGIA",
        motivoConsulta: "MAREO Y VERTIGO",
        codigoAtencion: "0000004795",
    },
    "0000004796": {
        tipoDocumento: "001",
        numDocumento: "43456789",
        nombreApellido: "LUCIA MARTINEZ SOTO",
        fechaNacimiento: "1995-12-08",
        sexo: "002",
        fechaAtencion: "2026-09-02",
        horaAtencion: "11:30",
        medicoAsignado: "002",
        procedencia: "002",
        ruc: "20612345678",
        razonSocial: "CONSTRUCTORA ANDINA S.A.C.",
        especialidad: "MEDICINA GENERAL",
        motivoConsulta: "DOLOR ABDOMINAL",
        codigoAtencion: "0000004796",
    },
};

export const triajeRegistrosMock: Record<string, TriajeRegistro> = {
    "00000001": {
        signosVitales: {
            talla: 1.72,
            peso: 78,
            temperatura_sv: 36.5,
            frecuencia_respiratoria: 16,
            frecuencia_cardiaca: 72,
            presion_sistolica: 120,
            presion_diastolica: 80,
            saturacion_oxigeno: 98,
        },
        antecedentes: {
            tri_sed: "NORMAL",
            tri_ape: "BUENO",
            tri_mic: "NORMAL",
            tri_sue: "REGULAR",
            tri_dep: "NORMAL",
            tri_estnut: "NORMAL",
            tri_sud: "NORMAL",
            tri_estan: "TRANQUILO",
            tri_temp: 36.5,
            tri_pres: 120,
        },
    },
    "00000002": {
        signosVitales: {
            talla: 1.65,
            peso: 68,
            temperatura_sv: 36.8,
            frecuencia_respiratoria: 18,
            frecuencia_cardiaca: 76,
            presion_sistolica: 135,
            presion_diastolica: 85,
            saturacion_oxigeno: 97,
        },
        antecedentes: {
            tri_sed: "NORMAL",
            tri_ape: "REGULAR",
            tri_mic: "NORMAL",
            tri_sue: "MALO",
            tri_dep: "IRREGULAR",
            tri_estnut: "SOBREPESO",
            tri_sud: "NORMAL",
            tri_estan: "ANSIOSO",
            tri_temp: 36.8,
            tri_pres: 135,
        },
    },
    "00000003": {
        signosVitales: {
            talla: 1.8,
            peso: 82,
            temperatura_sv: 36.6,
            frecuencia_respiratoria: 17,
            frecuencia_cardiaca: 70,
            presion_sistolica: 118,
            presion_diastolica: 76,
            saturacion_oxigeno: 99,
        },
        antecedentes: {
            tri_sed: "NORMAL",
            tri_ape: "BUENO",
            tri_mic: "NORMAL",
            tri_sue: "BUENO",
            tri_dep: "NORMAL",
            tri_estnut: "NORMAL",
            tri_sud: "NORMAL",
            tri_estan: "TRANQUILO",
            tri_temp: 36.6,
            tri_pres: 118,
        },
    },
};

export const getPacienteDataTriaje = (
    atencionID: string,
): PacienteDataTriaje | null => pacienteDataTriajeMock[atencionID] ?? null;

export const getTriajeRegistro = (triajeID: string): TriajeRegistro | null =>
    triajeRegistrosMock[triajeID] ?? null;
