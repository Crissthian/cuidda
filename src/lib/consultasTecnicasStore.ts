/**
 * Store en memoria del historial de consultas técnicas (solo UI).
 *
 * La tabla "Historial de consultas" consume un subconjunto de los campos del
 * dataset; el modal "Nueva consulta" no captura todos (sede, estado, código),
 * así que aquí se completan con valores por defecto.
 */
import { create } from "zustand";
import { consultasTecnicas } from "./consultasTecnicasData";

export type EstadoConsulta = "PENDIENTE" | "RESPONDIDO";

export interface ConsultaTecnicaRow {
  id: number;
  codigo: string;
  fechaHora: string;
  sede: string;
  trabajador: string;
  cargo: string;
  especialidad: string;
  motivo: string;
  estado: EstadoConsulta;
}

/** Datos que envía el modal "Nueva consulta técnica". */
export interface NuevaConsultaInput {
  apellidos: string;
  tipoDocumento: string;
  numeroDocumento: string;
  empresa: string;
  puesto: string;
  especialidad: string;
  motivo: string;
  pregunta: string;
}

/** Datos que el modal no solicita: se completan con valores fijos. */
const SEDE_POR_DEFECTO = "Lima";
const ESPECIALIDAD_POR_DEFECTO = "Medicina";
const MOTIVO_POR_DEFECTO = "Consulta técnica enviada al especialista.";
const TRABAJADOR_POR_DEFECTO = "Trabajador sin registrar";
const CARGO_POR_DEFECTO = "Puesto no especificado";
/** Toda consulta nace a la espera de la respuesta del especialista. */
const ESTADO_INICIAL: EstadoConsulta = "PENDIENTE";

/**
 * El mock ya mostraba "CT-2026-008" al enviar, así que se siembran los
 * correlativos previos y el siguiente código calculado continúa la serie.
 */
const CODIGOS_SEMILLA = ["CT-2026-006", "CT-2026-007"];

const PREFIJO_CODIGO = "CT";

function fechaHoraActual(): string {
  const ahora = new Date();
  const dosDigitos = (valor: number) => String(valor).padStart(2, "0");
  const fecha = [
    ahora.getFullYear(),
    dosDigitos(ahora.getMonth() + 1),
    dosDigitos(ahora.getDate()),
  ].join("-");
  const hora = `${dosDigitos(ahora.getHours())}:${dosDigitos(ahora.getMinutes())}`;
  return `${fecha} ${hora}`;
}

interface ConsultasTecnicasState {
  consultas: ConsultaTecnicaRow[];
  /** Código correlativo del año en curso, p. ej. CT-2026-008. */
  siguienteCodigo: () => string;
  agregarConsulta: (nueva: NuevaConsultaInput) => ConsultaTecnicaRow;
}

const consultasIniciales: ConsultaTecnicaRow[] = consultasTecnicas.map(
  (consulta, indice) => ({
    id: consulta.id,
    codigo: CODIGOS_SEMILLA[indice] ?? CODIGOS_SEMILLA[0],
    fechaHora: consulta.fechaHora,
    sede: consulta.sede,
    trabajador: consulta.trabajador,
    cargo: consulta.cargo,
    especialidad: consulta.especialidad,
    motivo: consulta.motivo,
    estado: consulta.estado,
  }),
);

export const useConsultasTecnicasStore = create<ConsultasTecnicasState>(
  (set, get) => ({
    consultas: consultasIniciales,

    siguienteCodigo: () => {
      const base = `${PREFIJO_CODIGO}-${new Date().getFullYear()}-`;

      const ultimo = get().consultas.reduce((max, consulta) => {
        if (!consulta.codigo.startsWith(base)) return max;
        const numero = Number(consulta.codigo.slice(base.length));
        return Number.isNaN(numero) ? max : Math.max(max, numero);
      }, 0);

      return `${base}${String(ultimo + 1).padStart(3, "0")}`;
    },

    agregarConsulta: (nueva) => {
      // Se destructura el input para no arrastrar campos que la tabla no usa.
      const { apellidos, puesto, especialidad, motivo, pregunta } = nueva;

      const consulta: ConsultaTecnicaRow = {
        id: Date.now(),
        codigo: get().siguienteCodigo(),
        fechaHora: fechaHoraActual(),
        sede: SEDE_POR_DEFECTO,
        trabajador: apellidos.trim() || TRABAJADOR_POR_DEFECTO,
        cargo: puesto.trim() || CARGO_POR_DEFECTO,
        especialidad: especialidad.trim() || ESPECIALIDAD_POR_DEFECTO,
        motivo: motivo.trim() || pregunta.trim() || MOTIVO_POR_DEFECTO,
        estado: ESTADO_INICIAL,
      };

      // El historial se muestra en orden cronológico ascendente: la consulta
      // recién enviada va al final.
      set((state) => ({ consultas: [...state.consultas, consulta] }));
      return consulta;
    },
  }),
);
