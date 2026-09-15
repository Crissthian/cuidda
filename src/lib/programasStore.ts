import { create } from "zustand";
import { programaDetalle, programasCards } from "./programasData";

export interface ProgramaCard {
  id: number;
  titulo: string;
  responsable: string;
  categoria: string;
  categoriaClass: string;
  avance: number;
  trabajadores: string;
  actividades: string;
  grupos: string[];
  barColor: string;
  /* Metadatos capturados en el alta (solo memoria) */
  especialidad?: string;
  sede?: string;
  periodo?: string;
  objetivo?: string;
  listaActividades?: string[];
}

export const categoriaEstilos: Record<
  string,
  { categoriaClass: string; barColor: string }
> = {
  OCUPACIONAL: {
    categoriaClass: "bg-violet/15 text-violet",
    barColor: "bg-violet",
  },
  PREVENTIVO: {
    categoriaClass: "bg-success/15 text-success-dark",
    barColor: "bg-success",
  },
  SUBPROGRAMA: {
    categoriaClass: "bg-risk-salmon/15 text-risk-salmon",
    barColor: "bg-risk-salmon",
  },
};

export function normalizarCategoria(tipo: string): string {
  const value = tipo.trim().toUpperCase();
  if (value.startsWith("OCUPACIONAL")) return "OCUPACIONAL";
  if (value.startsWith("PREVENTIVO")) return "PREVENTIVO";
  if (value.startsWith("SUBPROGRAMA")) return "SUBPROGRAMA";
  return value;
}

export type NuevaProgramaInput = Omit<
  ProgramaCard,
  | "id"
  | "categoriaClass"
  | "barColor"
  | "avance"
  | "trabajadores"
  | "actividades"
> & {
  poblacion: number;
  totalActividades: number;
  avance?: number;
};

interface ProgramasState {
  programas: ProgramaCard[];
  agregarPrograma: (nuevo: NuevaProgramaInput) => ProgramaCard;
}

const iniciales: ProgramaCard[] = programasCards.map((p) => ({
  id: p.id,
  titulo: p.titulo,
  responsable: p.responsable,
  categoria: p.categoria,
  categoriaClass: p.categoriaClass,
  avance: p.avance,
  trabajadores: p.trabajadores,
  actividades: p.actividades,
  grupos: [...p.grupos],
  barColor: p.barColor,
}));

export const useProgramasStore = create<ProgramasState>((set) => ({
  programas: iniciales,
  agregarPrograma: (nuevo) => {
    const categoria = normalizarCategoria(nuevo.categoria);
    const estilos = categoriaEstilos[categoria] ?? categoriaEstilos.OCUPACIONAL;
    const {
      titulo,
      responsable,
      especialidad,
      sede,
      periodo,
      objetivo,
      grupos,
      poblacion,
      totalActividades,
      listaActividades,
      avance,
    } = nuevo;

    const programa: ProgramaCard = {
      id: Date.now(),
      titulo,
      responsable,
      categoria,
      categoriaClass: estilos.categoriaClass,
      barColor: estilos.barColor,
      avance: avance ?? 0,
      trabajadores: `${poblacion} trabajadores`,
      actividades: `0/${totalActividades} actividades`,
      grupos: [...grupos],
      especialidad,
      sede,
      periodo,
      objetivo,
      listaActividades,
    };
    set((state) => ({ programas: [programa, ...state.programas] }));
    return programa;
  },
}));

/* ------------------------------------------------------------------ *
 * Actividades del programa (plan de actividades, solo en memoria)
 * ------------------------------------------------------------------ */

export interface ActividadPrograma {
  id: number;
  programaId: number;
  actividad: string;
  responsable: string;
  fecha: string;
  estado: string;
  estadoClass: string;
  cumplimiento: number;
}

export const estadoActividadClass: Record<string, string> = {
  COMPLETADA: "bg-success/15 text-success-dark",
  "EN PROCESO": "bg-violet/15 text-violet",
  PENDIENTE: "bg-muted-20 text-muted",
  "NO EJECUTADA": "bg-risk-red/15 text-risk-red",
};

/** Referencia estable para programas aún sin actividades cargadas. */
export const ACTIVIDADES_VACIAS: ActividadPrograma[] = [];

export interface NuevaActividadInput {
  programaId: number;
  actividad: string;
  responsable: string;
  fecha: string;
  estado?: string;
  cumplimiento?: number;
}

export interface ActualizarActividadInput {
  programaId: number;
  actividadId: number;
  estado: string;
  fecha: string;
  cumplimiento: number;
}

interface ActividadesState {
  actividades: Record<number, ActividadPrograma[]>;
  agregarActividad: (nuevo: NuevaActividadInput) => ActividadPrograma;
  actualizarActividad: (nuevo: ActualizarActividadInput) => void;
  eliminarActividad: (programaId: number, actividadId: number) => void;
}

const actividadesIniciales: Record<number, ActividadPrograma[]> = {
  [programaDetalle.id]: programaDetalle.planActividades.map((a) => ({
    id: a.id,
    programaId: programaDetalle.id,
    actividad: a.actividad,
    responsable: a.responsable,
    fecha: a.fecha,
    estado: a.estado,
    estadoClass: a.estadoClass,
    cumplimiento: a.cumplimiento,
  })),
};

export const useActividadesProgramaStore = create<ActividadesState>((set) => ({
  actividades: actividadesIniciales,

  agregarActividad: (nuevo) => {
    const estado = nuevo.estado ?? "PENDIENTE";
    const {
      programaId,
      actividad,
      responsable,
      fecha,
      cumplimiento = 0,
    } = nuevo;

    const nuevaActividad: ActividadPrograma = {
      id: Date.now(),
      programaId,
      actividad,
      responsable,
      fecha,
      estado,
      estadoClass:
        estadoActividadClass[estado] ?? estadoActividadClass.PENDIENTE,
      cumplimiento,
    };

    set((state) => ({
      actividades: {
        ...state.actividades,
        [programaId]: [
          ...(state.actividades[programaId] ?? []),
          nuevaActividad,
        ],
      },
    }));

    return nuevaActividad;
  },

  actualizarActividad: ({
    programaId,
    actividadId,
    estado,
    fecha,
    cumplimiento,
  }) =>
    set((state) => ({
      actividades: {
        ...state.actividades,
        [programaId]: (state.actividades[programaId] ?? []).map((a) =>
          a.id === actividadId
            ? {
                ...a,
                estado,
                estadoClass:
                  estadoActividadClass[estado] ??
                  estadoActividadClass.PENDIENTE,
                fecha: fecha || a.fecha,
                cumplimiento,
              }
            : a,
        ),
      },
    })),

  eliminarActividad: (programaId, actividadId) =>
    set((state) => ({
      actividades: {
        ...state.actividades,
        [programaId]: (state.actividades[programaId] ?? []).filter(
          (a) => a.id !== actividadId,
        ),
      },
    })),
}));
