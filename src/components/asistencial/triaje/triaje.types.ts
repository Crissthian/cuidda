/**
 * Tipos locales del formulario de Triaje (solo UI).
 */
import type {
  AntecedentesTriaje,
  PacienteDataTriaje,
  SignosVitalesTriaje,
} from "@/lib/triajeData";

export interface TriajeFormDTO {
  pacienteData: PacienteDataTriaje;
  signosVitales: SignosVitalesTriaje;
  antecedentes: AntecedentesTriaje;
}

export interface FiltrosTriaje {
  apellidoPaciente: string;
  nombreMedico: string;
  estado: string;
}

export type TriajeModalMode = "create" | "update" | "view";

export const defaultFiltrosTriaje: FiltrosTriaje = {
  apellidoPaciente: "",
  nombreMedico: "",
  estado: "",
};

export const emptyPacienteDataTriaje: PacienteDataTriaje = {
  tipoDocumento: "",
  numDocumento: "",
  nombreApellido: "",
  fechaNacimiento: "",
  sexo: "",
  fechaAtencion: "",
  horaAtencion: "",
  medicoAsignado: "",
  procedencia: "",
  ruc: "",
  razonSocial: "",
  especialidad: "",
  motivoConsulta: "",
  codigoAtencion: "",
};

export const emptyTriajeForm: TriajeFormDTO = {
  pacienteData: emptyPacienteDataTriaje,
  signosVitales: {},
  antecedentes: {},
};