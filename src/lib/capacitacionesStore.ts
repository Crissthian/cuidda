/**
 * Store en memoria del calendario de capacitaciones.
 * Se siembra con el calendario simulado y crece al programar capacitaciones.
 */
import { create } from "zustand";
import { calendarioCapacitaciones } from "./capacitacionesData";

export interface CapacitacionCalendario {
  id: number;
  tema: string;
  modalidad: string;
  grupo: string[];
  fecha: string;
  asistencia: string;
  cumplimiento: number;
  estado: string;
}

export interface NuevaCapacitacionInput {
  tema: string;
  modalidad: string;
  grupo: string;
  fecha: string;
  /** N° referencial de asistentes convocados (puede venir vacío). */
  referencial: string;
}

/**
 * Convierte la selección del modal ("G1 - G2", "Todos") en la lista que
 * espera la columna de grupo objetivo del calendario.
 */
export function normalizarGrupo(grupo: string): string[] {
  return grupo
    .split(" - ")
    .map((g) => g.trim())
    .filter(Boolean);
}

interface CapacitacionesState {
  calendario: CapacitacionCalendario[];
  agregarCapacitacion: (
    nuevo: NuevaCapacitacionInput,
  ) => CapacitacionCalendario;
}

const calendarioInicial: CapacitacionCalendario[] =
  calendarioCapacitaciones.map((c) => ({ ...c, grupo: [...c.grupo] }));

export const useCapacitacionesStore = create<CapacitacionesState>((set) => ({
  calendario: calendarioInicial,

  agregarCapacitacion: (nuevo) => {
    const { tema, modalidad, grupo, fecha, referencial } = nuevo;
    const convocados = Number(referencial) || 0;

    const capacitacion: CapacitacionCalendario = {
      id: Date.now(),
      tema,
      modalidad,
      grupo: normalizarGrupo(grupo),
      fecha,
      asistencia: `0 / ${convocados}`,
      cumplimiento: 0,
      estado: "PROGRAMADO",
    };

    set((state) => ({ calendario: [...state.calendario, capacitacion] }));
    return capacitacion;
  },
}));
