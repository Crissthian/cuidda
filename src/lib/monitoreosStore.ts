import { create } from "zustand";
import { resultadosMonitoreo } from "./monitoreosData";

export interface ResultadoMonitoreo {
  id: number;
  agente: string;
  tipo: string;
  area: string;
  fecha: string;
  resultado: string;
  lmp: string;
  estado: string;
  estadoClass: string;
}

export const monitoreoEstadoClass: Record<string, string> = {
  EXCEDE: "bg-risk-red/15 text-risk-red",
  CONFORME: "bg-success/15 text-success-dark",
  OBSERVADO: "bg-risk-salmon/15 text-risk-salmon",
  PROGRAMADO: "bg-brand/15 text-brand",
  CARGADO: "bg-brand/15 text-brand",
};

export function inferirTipoAgente(agente: string): string {
  const value = agente.toLowerCase();
  if (value.includes("psicosocial")) return "Psicosocial";
  if (value.includes("ergon")) return "Ergonómico";
  return "Higiénico";
}

interface MonitoreosState {
  resultados: ResultadoMonitoreo[];
  agregarResultado: (
    nuevo: Omit<ResultadoMonitoreo, "id" | "estadoClass"> & {
      estadoClass?: string;
    },
  ) => void;
}

const iniciales: ResultadoMonitoreo[] = resultadosMonitoreo.map((row) => ({
  id: row.id,
  agente: row.agente,
  tipo: row.tipo,
  area: row.area,
  fecha: row.fecha,
  resultado: row.resultado,
  lmp: row.lmp,
  estado: row.estado,
  estadoClass: row.estadoClass,
}));

export const useMonitoreosStore = create<MonitoreosState>((set) => ({
  resultados: iniciales,
  agregarResultado: (nuevo) =>
    set((state) => ({
      resultados: [
        {
          ...nuevo,
          id: Date.now(),
          estadoClass:
            nuevo.estadoClass ??
            monitoreoEstadoClass[nuevo.estado] ??
            "bg-brand/15 text-brand",
        },
        ...state.resultados,
      ],
    })),
}));
