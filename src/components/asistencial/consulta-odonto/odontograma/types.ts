/**
 * Tipos e interfaces para el componente Odontograma.
 */

/**
 * @interface HallazgoClinico
 * @description Representa un hallazgo clínico registrado en el odontograma.
 */
export interface HallazgoClinico {
	id: string
	diente: number | null // null para hallazgos generales o de boca completa
	dienteFinal?: number | null // Para rangos (ej. ortodoncia)
	hallazgo: string // Nombre o código del hallazgo
	estado?: 'bueno' | 'malo' // Para diferenciar colores (azul/rojo)
	siglas?: string // Para coronas (ej. CLM, CV)
	superficies?: string[] // Para carie u otros que pinten caras
	especificacion: string // Superficies, detalles adicionales
	fecha: string
	sigla?: string
	viewMode?: 'adult' | 'child'
}

export interface BaseHallazgo {
	id: string
	hallazgo?: string
	estado?: 'bueno' | 'malo'
}

/**
 * @interface Tooth
 * @description Define la estructura base de un diente para su representación interna.
 */
export interface Tooth {
	id: number
	type: 'adult' | 'child'
	position: 'upper' | 'lower'
	quadrant: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
}

/**
 * @interface ToothData
 * @description Datos de un diente para las constantes de dentadura.
 */
export interface ToothData {
	id: number
	hasImage: boolean
}

/**
 * @interface OdontogramaProps
 * @description Propiedades aceptadas por el componente principal del odontograma.
 */
export interface OdontogramaProps {
	hallazgos: HallazgoClinico[]
	onHallazgoCreated: (hallazgo: HallazgoClinico) => void
	onHallazgoDeleted?: (id: string) => void
}

/**
 * @interface Appliance
 * @description Representa un aparato ortodóntico (fijo o removible) en el odontograma.
 */
export interface Appliance {
	type: string
	id: string
	startId: number
	endId: number
	maxilar: 'Superior' | 'Inferior'
	status: 'bueno' | 'malo'
}

export interface ProtesisTotal {
	id: string
	maxilar: 'Superior' | 'Inferior'
	status: 'bueno' | 'malo'
}

export interface ProtesisRemovible {
	id: string
	startId: number
	endId: number
	status: 'bueno' | 'malo'
}

/**
 * @interface Crown
 * @description Representa una corona dental aplicada a un diente específico.
 */
export interface Crown {
	id: string
	toothId: number
	label: string
	status: 'bueno' | 'malo'
	type?: 'definitiva' | 'temporal'
}

/**
 * @interface Diastema
 * @description Representa un diastema entre dos dientes.
 */
export interface Diastema {
	id: string
	startId: number
	endId: number
	status: 'bueno' | 'malo'
}

/**
 * @interface EspigoMunon
 * @description Representa un espigo muñón en un diente.
 */
export interface EspigoMunon {
	id: string
	toothId: number
	status: 'bueno' | 'malo'
}

/**
 * @interface SelectionMode
 * @description Controla el estado actual de la herramienta de selección en la interfaz.
 */
export interface SelectionMode {
	isActive: boolean
	type: SelectionType
	status: 'bueno' | 'malo'
	startId: number | null
}

/**
 * @type SelectionType
 * @description Tipos de selección disponibles en el odontograma.
 */
export interface Gemination extends BaseHallazgo {
	toothId: number
}

export interface Giroversion extends BaseHallazgo {
	toothId: number
	direction: 'mesial' | 'distal'
}

export interface Caries extends BaseHallazgo {
	toothId: number
	surfaces: string[]
	sigla: 'MB' | 'CE' | 'CD' | 'CDP'
}

export interface Transposicion extends BaseHallazgo {
	hallazgo: 'TRANSPOSICION'
	startId: number
	endId: number
}

export type SelectionType =
	| 'fixed'
	| 'removable'
	| 'crown'
	| 'corona_temporal'
	| 'caries'
	| 'caries_mb'
	| 'caries_ce'
	| 'caries_cd'
	| 'caries_cdp'
	| 'diastema'
	| 'edentulous_total'
	| 'espigo_munon'
	| 'fracture_crown'
	| 'fracture_root'
	| 'fusion'
	| 'gemination'
	| 'giroversion_mesial'
	| 'giroversion_distal'
	| 'restoration_good'
	| 'restoration_bad'
	| 'extraction_indicated'
	| 'extraction_performed'
	| 'sealant_good'
	| 'sealant_bad'
	| 'pieza_ausente'
	| 'diente_en_clavija'
	| 'pieza_erupcion'
	| 'pieza_extruida'
	| 'pieza_intruida'
	| 'pieza_supernumeraria'
	| 'pulpotomia'
	| 'protesis_fija'
	| 'protesis_total'
	| 'protesis_removible'
	| 'restauracion_definitiva'
	| 'restauracion_temporal'
	| 'superficie_desgastada'
	| 'tratamiento_conducto'
	| 'pulpectomia'
	| 'transposicion'
	| 'dde_opacidad'
	| 'dde_pigmentacion'
	| 'dde_fluorosis'
	| 'fosas_fisuras_profundas'
	| 'defectos_esmalte'
	| 'impactacion'
	| 'implante_dental'
	| 'macrodoncia'
	| 'microdoncia'
	| 'movilidad_1'
	| 'movilidad_2'
	| 'movilidad_3'
	| 'posicion_anormal_mesial'
	| 'posicion_anormal_distal'
	| 'posicion_anormal_vestibular'
	| 'posicion_anormal_palatinizado'
	| 'posicion_anormal_lingual'
	| 'pieza_ectopica'
	| 'remanente_radicular'

/**
 * @interface Macrodoncia
 * @description Representa una macrodoncia (Sigla MAC en azul).
 */
export interface Macrodoncia extends BaseHallazgo {
	hallazgo: 'MACRODONCIA'
	toothId: number
	sigla: 'MAC'
	status: 'bueno'
}

/**
 * @interface Microdoncia
 * @description Representa una microdoncia (Sigla MIC en azul).
 */
export interface Microdoncia extends BaseHallazgo {
	hallazgo: 'MICRODONCIA'
	toothId: number
	sigla: 'MIC'
	status: 'bueno'
}

/**
 * @interface PosicionAnormalDentaria
 * @description Representa una posicion anormal dentaria (sigla en azul).
 */
export interface PosicionAnormalDentaria extends BaseHallazgo {
	hallazgo: 'POSICION_ANORMAL_DENTARIA'
	toothId: number
	sigla: 'M' | 'D' | 'V' | 'P' | 'L'
	status: 'bueno'
}

/**
 * @interface MovilidadPatologica
 * @description Representa movilidad patológica (Sigla M + Grado en rojo).
 */
export interface MovilidadPatologica extends BaseHallazgo {
	hallazgo: 'MOVILIDAD_PATOLOGICA'
	toothId: number
	grado: 1 | 2 | 3
	sigla: string
	status: 'malo'
}

/**
 * @interface PiezaEctopica
 * @description Representa una pieza dentaria ectópica (Sigla E en azul).
 */
export interface PiezaEctopica extends BaseHallazgo {
	hallazgo: 'PIEZA_ECTOPICA'
	toothId: number
	sigla: 'E'
	status: 'bueno'
}

/**
 * @interface PiezaErupccion
 * @description Representa una pieza dentaria en erupción (flecha zigzag vertical).
 */
export interface PiezaErupccion extends BaseHallazgo {
	hallazgo: 'PIEZA_ERUPCION'
	toothId: number
}
// ... (omitting intermediate types if possible, but replace_file_content needs contiguous block)
// Actually I will just append the interface at the end and update SelectionType.

export interface RestauracionTemporal {
	id: string
	toothId: number
	surfaces: string[]
}

export interface Sellante {
	id: string
	toothId: number
	sigla: string
	status: 'bueno' | 'malo'
}

/**
 * @interface PiezaExtruida
 * @description Representa una pieza dentaria extruida (flecha recta vertical hacia afuera).
 */
export interface PiezaExtruida extends BaseHallazgo {
	hallazgo: 'PIEZA_EXTRUIDA'
	toothId: number
}

/**
 * @interface PiezaIntruida
 * @description Representa una pieza dentaria intruida (flecha recta vertical hacia la encía).
 */
export interface PiezaIntruida extends BaseHallazgo {
	hallazgo: 'PIEZA_INTRUIDA'
	toothId: number
}

/**
 * @interface PiezaSupernumeraria
 * @description Representa una pieza supernumeraria entre dos dientes (Circulo azul con 'S').
 */
export interface PiezaSupernumeraria extends BaseHallazgo {
	hallazgo: 'PIEZA_SUPERNUMERARIA'
	startId: number
	endId: number
}

/**
 * @interface Pulpotomia
 * @description Representa una pulpotomía con visualización de pulpa coronal y sigla PP.
 */
export interface Pulpotomia extends BaseHallazgo {
	hallazgo: 'PULPOTOMIA'
	toothId: number
	status: 'bueno' | 'malo'
}

/**
 * @interface PiezaAusente
 * @description Representa una pieza dentaria ausente (DNE, DEX, DAO).
 */
export interface PiezaAusente extends BaseHallazgo {
	toothId: number
	sigla: 'DNE' | 'DEX' | 'DAO'
}

/**
 * @interface DienteEnClavija
 * @description Representa un diente en clavija.
 */
export interface DienteEnClavija extends BaseHallazgo {
	hallazgo: 'DIENTE_EN_CLAVIJA'
	toothId: number
}
/**
 * @interface Fracture
 * @description Representa una fractura dental en corona o raíz.
 */
export interface Fracture {
	id: string
	toothId: number
	type: 'crown' | 'root'
	status: 'malo'
}

/**
 * @interface Fusion
 * @description Representa una fusión entre dos dientes.
 */
export interface Fusion {
	id: string
	startId: number
	endId: number
	status: 'bueno' | 'malo'
}

/**
 * @type StatusType
 * @description Estados posibles para hallazgos y aparatos.
 */
export interface ProtesisFija {
	id: string
	startId: number
	endId: number
	status: 'bueno' | 'malo'
}

export interface Restauracion {
	id: string
	toothId: number
	surfaces: string[]
	sigla: string
	status: 'bueno' | 'malo'
}

export interface SuperficieDesgastada {
	id: string
	toothId: number
	surfaces: string[]
	sigla: 'DES'
	status: 'malo'
}

export interface TratamientoConducto {
	id: string
	toothId: number
	sigla: 'TC' | 'PC'
	status: 'bueno' | 'malo'
}

export type StatusType = 'bueno' | 'malo'

export interface DefectosEsmalte {
	id: string
	toothId: number
	type: 'O' | 'PE' | 'Fluorosis'
	status: 'malo'
}

export interface FosasFisurasProfundas extends BaseHallazgo {
	hallazgo: 'FOSAS_FISURAS_PROFUNDAS'
	toothId: number
	sigla: 'FFP'
	status: 'bueno'
}

export interface Impactacion extends BaseHallazgo {
	hallazgo: 'IMPACTACION'
	toothId: number
	sigla: 'I'
	status: 'bueno'
}

export interface ImplanteDental extends BaseHallazgo {
	hallazgo: 'IMPLANTE_DENTAL'
	toothId: number
	sigla: 'IMP'
	status: 'bueno' | 'malo'
}

export interface RemanenteRadicular extends BaseHallazgo {
	hallazgo: 'REMANENTE_RADICULAR'
	toothId: number
	sigla: 'RR'
	status: 'malo'
}
