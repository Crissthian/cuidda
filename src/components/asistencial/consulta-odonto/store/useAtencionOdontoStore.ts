/**
 * Store de Zustand para el estado compartido del modal de atención odontológica.
 */
import { create } from "zustand";

export type EstadoAtencion = "0" | "1" | "2";

export interface DatosEvento {
  nombrePaciente: string;
  fechaNacimiento: Date;
  fechaAtencion: Date;
  codigoAtencion: string;
  codigoOdontologia: string;
  nombreMedico: string;
  motivoConsulta: string;
  dniPaciente: string;
  estadoAtencion: string;
}

interface EstadosCarga {
  modal: boolean;
  consulta: boolean;
  odontograma: boolean;
  receta: boolean;
  archivos: boolean;
}

interface AtencionOdontoState {
  datosEvento: DatosEvento | null;
  codigoOdontologia: string;
  codigoGenerado: string;
  estadoAtencion: string;
  estaGuardando: boolean;
  estadosCarga: EstadosCarga;
  modalAbierto: boolean;
  alergiasTemp: string;

  inicializarAtencion: (datos: DatosEvento) => void;
  setCodigoOdontologia: (codigo: string) => void;
  setCodigoGenerado: (codigo: string) => void;
  setEstadoAtencion: (estado: string) => void;
  setEstaGuardando: (guardando: boolean) => void;
  setEstadoCarga: (componente: keyof EstadosCarga, cargado: boolean) => void;
  setModalAbierto: (abierto: boolean) => void;
  setAlergiasTemp: (val: string) => void;
  limpiarStore: () => void;

  todoCargado: () => boolean;
  esNuevaConsulta: () => boolean;
  codigoMostrado: () => string;
}

const ESTADOS_CARGA_INICIAL: EstadosCarga = {
  modal: false,
  consulta: false,
  odontograma: false,
  receta: false,
  archivos: false,
};

/**
 * Formatea un código a 8 dígitos con ceros a la izquierda
 * @param codigo - Código a formatear
 * @returns Código formateado con 8 dígitos
 */
export const formatearCodigo = (codigo: string | number | undefined): string => {
  if (!codigo) return "";
  return codigo.toString().padStart(8, "0");
};

export const useAtencionOdontoStore = create<AtencionOdontoState>((set, get) => ({
  datosEvento: null,
  codigoOdontologia: "",
  codigoGenerado: "",
  estadoAtencion: "0",
  estaGuardando: false,
  estadosCarga: ESTADOS_CARGA_INICIAL,
  modalAbierto: false,
  alergiasTemp: "",

  inicializarAtencion: (datos: DatosEvento) => {
    set({
      datosEvento: datos,
      estadoAtencion: datos.estadoAtencion,
      codigoOdontologia: formatearCodigo(datos.codigoOdontologia),
      estadosCarga: ESTADOS_CARGA_INICIAL,
    });
  },

  setCodigoOdontologia: (codigo: string) => {
    set({
      codigoOdontologia: formatearCodigo(codigo),
      codigoGenerado: "",
    });
  },

  setCodigoGenerado: (codigo: string) => {
    set({ codigoGenerado: formatearCodigo(codigo) });
  },

  setEstadoAtencion: (estado: string) => {
    set({ estadoAtencion: estado });
  },

  setEstaGuardando: (guardando: boolean) => {
    set({ estaGuardando: guardando });
  },

  setEstadoCarga: (componente: keyof EstadosCarga, cargado: boolean) => {
    set((state) => ({
      estadosCarga: { ...state.estadosCarga, [componente]: cargado },
    }));
  },

  setModalAbierto: (abierto: boolean) => {
    set({ modalAbierto: abierto });
  },

  setAlergiasTemp: (val: string) => {
    set({ alergiasTemp: val });
  },

  limpiarStore: () => {
    set({
      datosEvento: null,
      codigoOdontologia: "",
      codigoGenerado: "",
      estadoAtencion: "0",
      estaGuardando: false,
      estadosCarga: ESTADOS_CARGA_INICIAL,
      modalAbierto: false,
      alergiasTemp: "",
    });
  },

  todoCargado: () => {
    const { estadosCarga } = get();
    return Object.values(estadosCarga).every(Boolean);
  },

  esNuevaConsulta: () => {
    return get().estadoAtencion === "0";
  },

  codigoMostrado: () => {
    const { codigoOdontologia, codigoGenerado } = get();
    return codigoOdontologia || codigoGenerado;
  },
}));
