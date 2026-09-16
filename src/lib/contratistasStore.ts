/**
 * Store en memoria del registro de contratistas (solo UI).
 *
 * La fila que consume la tabla "Data de contratistas" es un subconjunto de lo
 * que captura el modal: aquí se normaliza y se derivan los campos que el
 * formulario no pide (slug, % EMO, fecha de actualización).
 */
import { create } from "zustand";
import { contratistas } from "./contratistasData";

export type EstadoContratista = "ACTIVO" | "OBSERVADO" | "INACTIVO";

export interface ContratistaRegistro {
  id: number;
  slug: string;
  empresa: string;
  ruc: string;
  servicio: string;
  sede: string;
  trabajadores: number;
  emoVigente: string;
  actualizacion: string;
  estado: EstadoContratista;
}

/** Datos que envía el modal "Registro de contratistas". */
export interface NuevoContratistaInput {
  ruc: string;
  razonSocial: string;
  rubro: string;
  actividad: string;
  tipoServicio: string;
  trabajadores: string;
  sedes: string[];
  estado: string;
}

const ESTADOS_VALIDOS: EstadoContratista[] = [
  "ACTIVO",
  "OBSERVADO",
  "INACTIVO",
];

/** Un contratista recién registrado aún no tiene EMO cargado. */
const EMO_VIGENTE_INICIAL = "0%";

export function slugDeEmpresa(empresa: string): string {
  return (
    empresa
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      // "S.A.C." → "sac" en lugar de "s-a-c".
      .replace(/[.,]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  );
}

function fechaHoy(): string {
  const hoy = new Date();
  const dia = String(hoy.getDate()).padStart(2, "0");
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  return `${dia}/${mes}/${hoy.getFullYear()}`;
}

function esEstadoValido(estado: string): estado is EstadoContratista {
  return (ESTADOS_VALIDOS as string[]).includes(estado);
}

interface ContratistasState {
  contratistas: ContratistaRegistro[];
  agregarContratista: (nuevo: NuevoContratistaInput) => ContratistaRegistro;
}

const contratistasIniciales: ContratistaRegistro[] = contratistas.map(
  (contratista) => ({
    ...contratista,
  }),
);

export const useContratistasStore = create<ContratistasState>((set) => ({
  contratistas: contratistasIniciales,

  agregarContratista: (nuevo) => {
    // Se destructura el input para no arrastrar campos que la tabla no usa.
    const {
      ruc,
      razonSocial,
      rubro,
      actividad,
      tipoServicio,
      trabajadores,
      sedes,
      estado,
    } = nuevo;

    const empresa = razonSocial.trim();
    const contratista: ContratistaRegistro = {
      id: Date.now(),
      slug: slugDeEmpresa(empresa),
      empresa,
      ruc: ruc.trim(),
      servicio: rubro.trim() || actividad.trim() || tipoServicio.trim() || "—",
      sede: sedes.join(", ") || "—",
      trabajadores: Number(trabajadores.replace(/\D/g, "")) || 0,
      emoVigente: EMO_VIGENTE_INICIAL,
      actualizacion: fechaHoy(),
      estado: esEstadoValido(estado) ? estado : "ACTIVO",
    };

    set((state) => ({ contratistas: [contratista, ...state.contratistas] }));
    return contratista;
  },
}));
