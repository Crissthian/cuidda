/**
 * Tipos locales del formulario de Admisión (solo UI).
 */

export interface AdmisionInput {
  atencion: {
    cdg_ate: string;
    tipo_atencion: string;
    sede: string;
    procedencia: string;
    planilla: string;
    ruc_cliente: string;
    nombre_empresa: string;
    dni_paciente: string;
    nombre_paciente: string;
    dni_patrocinador: string;
    nombre_patrocinador: string;
    especialidad: string;
    codigo_medico: string;
    nombre_medico: string;
    motivo_consulta: string;
    tipo_documento: string;
    numero_documento: string;
    firma_imagen: string;
    huella_imagen: string;
    subcategoria_ecografia: string;
    subcategoria_esp011: string;
    observaciones: string;
  };
  paciente: {
    codigo_unacem: string;
    tipo_documento: string;
    numero_documento: string;
    apellido: string;
    nombre: string;
    sexo: string;
    fecha_nacimiento: string;
    edad: string;
    estado_civil: string;
    grado_instruccion: string;
    telefono: string;
    correo: string;
    direccion: string;
    lugar_nacimiento: string;
    contacto_emergencia_nombre: string;
    contacto_emergencia_parentesco: string;
    contacto_emergencia_telefono: string;
  };
}

export interface ExamenSeleccionado {
  codigo: number;
  numero_examen?: number;
  nombre: string;
  precio: number;
  origen?: "EXTERNA" | "INTERNA";
}

export interface ExamenEspecialidadSeleccionado {
  id: string;
  nombre: string;
  precio: number;
  especialidad: string;
}

export const emptyAdmisionInput: AdmisionInput = {
  atencion: {
    cdg_ate: "",
    tipo_atencion: "001",
    sede: "",
    procedencia: "",
    planilla: "",
    ruc_cliente: "",
    nombre_empresa: "",
    dni_paciente: "",
    nombre_paciente: "",
    dni_patrocinador: "",
    nombre_patrocinador: "",
    especialidad: "",
    codigo_medico: "",
    nombre_medico: "",
    motivo_consulta: "",
    tipo_documento: "",
    numero_documento: "",
    firma_imagen: "",
    huella_imagen: "",
    subcategoria_ecografia: "",
    subcategoria_esp011: "",
    observaciones: "",
  },
  paciente: {
    codigo_unacem: "",
    tipo_documento: "",
    numero_documento: "",
    apellido: "",
    nombre: "",
    sexo: "",
    fecha_nacimiento: "",
    edad: "",
    estado_civil: "",
    grado_instruccion: "",
    telefono: "",
    correo: "",
    direccion: "",
    lugar_nacimiento: "",
    contacto_emergencia_nombre: "",
    contacto_emergencia_parentesco: "",
    contacto_emergencia_telefono: "",
  },
};
