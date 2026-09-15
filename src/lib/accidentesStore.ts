/**
 * Store en memoria del registro de eventos (accidentes, incidentes y
 * enfermedades ocupacionales).
 */
import { create } from "zustand";
import { registroEventos } from "./accidentesData";

export interface EventoRegistro {
  id: number;
  tipo: string;
  codigo: string;
  fecha: string;
  trabajador: string;
  area: string;
  severidad: string;
  dias: string;
  causa: string;
  estado: string;
  estadoClass: string;
}

export interface NuevoEventoInput {
  tipo: string;
  fecha: string;
  trabajador: string;
  area: string;
}

const PREFIJO_TIPO: Record<string, string> = {
  Accidente: "ACC",
  Incidente: "INC",
  "Enf. ocupacional": "EO",
};

/** Estado con el que ingresa un evento recién reportado. */
const ESTADO_INICIAL = {
  estado: "EN ANÁLISIS",
  estadoClass: "bg-violet/15 text-violet",
};

interface AccidentesState {
  eventos: EventoRegistro[];
  /** Código correlativo del tipo indicado, p. ej. ACC-2026-015. */
  siguienteCodigo: (tipo: string) => string;
  agregarEvento: (nuevo: NuevoEventoInput) => EventoRegistro;
}

const eventosIniciales: EventoRegistro[] = registroEventos.map((evento) => ({
  ...evento,
}));

export const useAccidentesStore = create<AccidentesState>((set, get) => ({
  eventos: eventosIniciales,

  siguienteCodigo: (tipo) => {
    const prefijo = PREFIJO_TIPO[tipo] ?? "ACC";
    const base = `${prefijo}-${new Date().getFullYear()}-`;

    const ultimo = get().eventos.reduce((max, evento) => {
      if (!evento.codigo.startsWith(base)) return max;
      const numero = Number(evento.codigo.slice(base.length));
      return Number.isNaN(numero) ? max : Math.max(max, numero);
    }, 0);

    return `${base}${String(ultimo + 1).padStart(3, "0")}`;
  },

  agregarEvento: (nuevo) => {
    const { tipo, fecha, trabajador, area } = nuevo;

    const evento: EventoRegistro = {
      id: Date.now(),
      tipo,
      codigo: get().siguienteCodigo(tipo),
      fecha,
      trabajador,
      area,
      severidad: "Por evaluar",
      dias: "0",
      causa: "Pendiente de investigación",
      ...ESTADO_INICIAL,
    };

    set((state) => ({ eventos: [evento, ...state.eventos] }));
    return evento;
  },
}));
