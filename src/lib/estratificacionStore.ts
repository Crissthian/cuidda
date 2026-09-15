/**
 * Store en memoria de la estratificación: trabajadores y su historial de
 * cambios de grupo.
 */
import { create } from "zustand";
import { useAuthStore } from "./authStore";
import {
  historialCambiosInicial,
  trabajadoresEstratificacion,
  type CambioGrupo,
  type Grupo,
  type TrabajadorEstratificacion,
} from "./estratificacionData";

export interface CambiarGrupoInput {
  trabajadorId: number;
  nuevoGrupo: Grupo;
  justificacion: string;
}

interface EstratificacionState {
  trabajadores: TrabajadorEstratificacion[];
  /** Historial de cambios indexado por id de trabajador, del más reciente al más antiguo. */
  historiales: Record<number, CambioGrupo[]>;
  cambiarGrupo: (input: CambiarGrupoInput) => void;
}

/** Fecha y hora en el formato usado por el historial: dd/mm/yyyy HH:MM. */
export function formatearFechaHora(fecha: Date): string {
  const dd = String(fecha.getDate()).padStart(2, "0");
  const mm = String(fecha.getMonth() + 1).padStart(2, "0");
  const yyyy = fecha.getFullYear();
  const hh = String(fecha.getHours()).padStart(2, "0");
  const min = String(fecha.getMinutes()).padStart(2, "0");
  return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
}

export const useEstratificacionStore = create<EstratificacionState>((set) => ({
  trabajadores: trabajadoresEstratificacion.map((t) => ({ ...t })),
  historiales: historialCambiosInicial,

  cambiarGrupo: ({ trabajadorId, nuevoGrupo, justificacion }) =>
    set((state) => {
      const trabajador = state.trabajadores.find((t) => t.id === trabajadorId);
      if (!trabajador || trabajador.grupo === nuevoGrupo) return state;

      const grupoAnterior = trabajador.grupo;

      const cambio: CambioGrupo = {
        id: Date.now(),
        grupo: nuevoGrupo,
        realizadoPor: useAuthStore.getState().username ?? "ADMINISTRADOR",
        fechaHora: formatearFechaHora(new Date()),
        justificacion:
          justificacion.trim() ||
          `Cambio manual de grupo (desde ${grupoAnterior})`,
      };

      return {
        trabajadores: state.trabajadores.map((t) =>
          t.id === trabajadorId ? { ...t, grupo: nuevoGrupo } : t,
        ),
        historiales: {
          ...state.historiales,
          [trabajadorId]: [cambio, ...(state.historiales[trabajadorId] ?? [])],
        },
      };
    }),
}));
