/**
 * Tipos para los handlers de click del Odontograma.
 * Define el contexto compartido y tipos de retorno para todos los handlers.
 */

import type {
  HallazgoClinico,
  SelectionMode,
  ToothData,
  Appliance,
  Caries,
  Crown,
  Diastema,
  EspigoMunon,
  Fracture,
  Fusion,
  Gemination,
  Giroversion,
  PiezaAusente,
  DienteEnClavija,
  PiezaErupccion,
  PiezaExtruida,
  PiezaIntruida,
  PiezaSupernumeraria,
  Pulpotomia,
  ProtesisFija,
  Restauracion,
  RestauracionTemporal,
  SuperficieDesgastada,
  TratamientoConducto,
  Sellante,
  Transposicion,
  DefectosEsmalte,
  FosasFisurasProfundas,
  Impactacion,
  ImplanteDental,
  Macrodoncia,
  Microdoncia,
  MovilidadPatologica,
  PosicionAnormalDentaria,
  PiezaEctopica,
  RemanenteRadicular,
} from "../types";

/**
 * Contexto compartido para todos los handlers de click.
 * Contiene todo lo necesario para validar y crear hallazgos.
 */
export interface ClickHandlerContext {
  /** ID del diente clickeado */
  id: number;
  /** Posición del diente (superior/inferior) */
  position: "upper" | "lower";
  /** Lista de hallazgos clínicos actuales */
  hallazgos: HallazgoClinico[];
  /** Modo de selección actual */
  selectionMode: SelectionMode;
  /** Función para actualizar el modo de selección */
  setSelectionMode: React.Dispatch<React.SetStateAction<SelectionMode>>;
  /** Callback para crear un nuevo hallazgo */
  onHallazgoCreated: (hallazgo: HallazgoClinico) => void;
  /** Callback opcional para eliminar un hallazgo */
  onHallazgoDeleted?: (id: string) => void;
  /** Input de etiqueta para corona/pieza ausente */
  crownLabelInput: string;
  /** Dientes de la arcada superior */
  upperTeeth: ToothData[];
  /** Dientes de la arcada inferior */
  lowerTeeth: ToothData[];
  // Hallazgos derivados memoizados
  appliances: Appliance[];
  crowns: Crown[];
  cariesList: Caries[];
  diastemas: Diastema[];
  espigos: EspigoMunon[];
  fractures: Fracture[];
  fusions: Fusion[];
  geminations: Gemination[];
  giroversions: Giroversion[];
  piezasAusentes: PiezaAusente[];
  dientesEnClavija: DienteEnClavija[];
  piezasErupccion: PiezaErupccion[];
  piezasExtruidas: PiezaExtruida[];
  piezasIntruidas: PiezaIntruida[];
  piezasSupernumerarias: PiezaSupernumeraria[];
  pulpotomias: Pulpotomia[];
  protesisFija: ProtesisFija[];
  restauraciones: Restauracion[];
  restauracionesTemporales: RestauracionTemporal[];
  superficiesDesgastadas: SuperficieDesgastada[];
  tratamientosConducto: TratamientoConducto[];
  transposiciones?: Transposicion[];
  sellantes: Sellante[];
  defectosEsmalte: DefectosEsmalte[];
  fosasFisuras: FosasFisurasProfundas[];
  impactacion: Impactacion[];
  implanteDental: ImplanteDental[];
  macrodoncia: Macrodoncia[];
  microdoncia: Microdoncia[];
  movilidadPatologica: MovilidadPatologica[];
  posicionesAnormales: PosicionAnormalDentaria[];
  piezaEctopica: PiezaEctopica[];
  remanenteRadicular: RemanenteRadicular[];
  /** Modo de vista actual (adulto/niño) */
  viewMode: "adult" | "child";
}

/**
 * Tipo de función handler para clicks en dientes.
 * @returns true si el handler procesó el click, false si debe continuar con otros handlers
 */
export type ToothClickHandler = (ctx: ClickHandlerContext) => boolean;

/**
 * Handler específico para zonas/superficies (caries, restauración).
 */
export type ZoneClickHandler = (
  ctx: ClickHandlerContext,
  zone: string,
) => boolean;

/**
 * Genera un ID único para un nuevo hallazgo.
 */
export function generateHallazgoId(): string {
  return Date.now().toString();
}

/**
 * Obtiene la fecha actual formateada para Perú.
 */
export function getCurrentDate(): string {
  return new Date().toLocaleDateString("es-PE");
}
