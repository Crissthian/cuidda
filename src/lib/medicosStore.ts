/**
 * Store en memoria del catálogo de médicos.
 * Se siembra con los datos simulados y crece al registrar nuevos médicos.
 */
import { create } from "zustand";
import { medicos as medicosSeed, type Medico } from "./medicosData";

export interface NuevoMedicoInput {
  medico: string;
  dni: string;
  cmp: string;
  rne?: string;
  especialidad: string;
  sede: string;
}

interface MedicosState {
  medicos: Medico[];
  agregarMedico: (nuevo: NuevoMedicoInput) => Medico;
  /** Busca por CMP; sin coincidencia devuelve el primer médico del catálogo. */
  obtenerPorCmp: (cmp?: string | null) => Medico;
}

/** Valores para un médico recién registrado: aún no tiene certificado. */
const SIN_CERTIFICADO = {
  certificado: "SIN CERTIFICADO",
  vigencia: "—",
  ultimaFirma: "—",
  proveedor: "Sin certificado",
  serie: "—",
  inicio: "—",
  vencimiento: "—",
  correo: "—",
} as const;

export const useMedicosStore = create<MedicosState>((set, get) => ({
  medicos: medicosSeed.map((medico) => ({ ...medico })),

  agregarMedico: (nuevo) => {
    const { medico, dni, cmp, rne, especialidad, sede } = nuevo;

    const registro: Medico = {
      id: Date.now(),
      medico,
      dni,
      cmp,
      rne,
      especialidad,
      sede,
      ...SIN_CERTIFICADO,
    };

    set((state) => ({ medicos: [registro, ...state.medicos] }));
    return registro;
  },

  obtenerPorCmp: (cmp) =>
    get().medicos.find((medico) => medico.cmp === cmp) ?? get().medicos[0],
}));
