/**
 * Hook para derivar y memoizar hallazgos clínicos en estructuras específicas.
 * Centraliza todas las transformaciones de HallazgoClinico[] a tipos especializados.
 */

import { useMemo } from 'react'
import type {
	HallazgoClinico,
	Appliance,
	Crown,
	Caries,
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
	RemanenteRadicular
} from '../types'
import { isUpperArch } from '../utils'

/** Retorno del hook useHallazgosDerivados */
export interface HallazgosDerivados {
	appliances: Appliance[]
	crowns: Crown[]
	cariesList: Caries[]
	diastemas: Diastema[]
	espigos: EspigoMunon[]
	fractures: Fracture[]
	fusions: Fusion[]
	geminations: Gemination[]
	giroversions: Giroversion[]
	piezasAusentes: PiezaAusente[]
	dientesEnClavija: DienteEnClavija[]
	piezasErupccion: PiezaErupccion[]
	piezasExtruidas: PiezaExtruida[]
	piezasIntruidas: PiezaIntruida[]
	piezasSupernumerarias: PiezaSupernumeraria[]
	pulpotomias: Pulpotomia[]
	protesisFija: ProtesisFija[]
	restauraciones: Restauracion[]
	restauracionesTemporales: RestauracionTemporal[]
	superficiesDesgastadas: SuperficieDesgastada[]
	tratamientosConducto: TratamientoConducto[]
	transposiciones: Transposicion[]
	sellantes: Sellante[]
	defectosEsmalte: DefectosEsmalte[]
	fosasFisuras: FosasFisurasProfundas[]
	impactacion: Impactacion[]
	implanteDental: ImplanteDental[]
	macrodoncia: Macrodoncia[]
	microdoncia: Microdoncia[]
	movilidadPatologica: MovilidadPatologica[]
	posicionesAnormales: PosicionAnormalDentaria[]
	piezasEctopicas: PiezaEctopica[]
	remanenteRadicular: RemanenteRadicular[]
}

/**
 * Hook personalizado que transforma el array de hallazgos clínicos en estructuras
 * específicas memoizadas para cada tipo de hallazgo.
 *
 * @param hallazgos - Lista de hallazgos clínicos crudos
 * @returns Objeto con arrays memoizados de cada tipo de hallazgo
 */
export function useHallazgosDerivados(hallazgos: HallazgoClinico[]): HallazgosDerivados {
	// Aparatos ortodónticos (fijos y removibles)
	const appliances = useMemo<Appliance[]>(
		() =>
			hallazgos
				.filter((h) => h.hallazgo === 'APARATO_ORTODONTICO_FIJO' || h.hallazgo === 'APARATO_REMOVIBLE')
				.map((h) => ({
					id: h.id,
					startId: h.diente!,
					endId: h.dienteFinal!,
					maxilar: isUpperArch(h.diente!) ? 'Superior' : 'Inferior',
					type: h.hallazgo === 'APARATO_ORTODONTICO_FIJO' ? 'fixed' : 'removable',
					status: h.estado as 'bueno' | 'malo'
				})),
		[hallazgos]
	)

	// Coronas dentales
	const crowns = useMemo<Crown[]>(
		() =>
			hallazgos
				.filter((h) => h.hallazgo === 'CORONA' || h.hallazgo === 'CORONA_TEMPORAL')
				.map((h) => ({
					id: h.id,
					toothId: h.diente!,
					label: h.hallazgo === 'CORONA_TEMPORAL' ? 'CT' : h.siglas || 'CR',
					status: h.hallazgo === 'CORONA_TEMPORAL' ? 'malo' : (h.estado as 'bueno' | 'malo'),
					type: h.hallazgo === 'CORONA_TEMPORAL' ? 'temporal' : 'definitiva'
				})),
		[hallazgos]
	)

	// Caries dentales
	const cariesList = useMemo<Caries[]>(
		() =>
			hallazgos
				.filter((h) => h.hallazgo === 'CARIES')
				.map((h) => ({
					id: h.id,
					toothId: h.diente!,
					surfaces: h.superficies || [],
					sigla: (h.siglas as 'MB' | 'CE' | 'CD' | 'CDP') || 'CE',
					status: 'malo' // Caries siempre es malo (rojo)
				})),
		[hallazgos]
	)

	// Diastemas
	const diastemas = useMemo<Diastema[]>(
		() =>
			hallazgos
				.filter((h) => h.hallazgo === 'DIASTEMA')
				.map((h) => ({
					id: h.id,
					startId: h.diente!,
					endId: h.dienteFinal!,
					status: h.estado as 'bueno' | 'malo'
				})),
		[hallazgos]
	)

	// Espigos muñones
	const espigos = useMemo<EspigoMunon[]>(
		() =>
			hallazgos
				.filter((h) => h.hallazgo === 'ESPIGO_MUNON')
				.map((h) => ({
					id: h.id,
					toothId: h.diente!,
					status: h.estado as 'bueno' | 'malo'
				})),
		[hallazgos]
	)

	// Fracturas dentales
	const fractures = useMemo<Fracture[]>(
		() =>
			hallazgos
				.filter((h) => h.hallazgo === 'FRACTURA_CORONA' || h.hallazgo === 'FRACTURA_RAIZ')
				.map((h) => ({
					id: h.id,
					toothId: h.diente!,
					type: h.hallazgo === 'FRACTURA_CORONA' ? 'crown' : 'root',
					status: 'malo'
				})),
		[hallazgos]
	)

	// Fusiones dentales
	const fusions = useMemo<Fusion[]>(
		() =>
			hallazgos
				.filter((h) => h.hallazgo === 'FUSION')
				.map((h) => ({
					id: h.id,
					startId: h.diente!,
					endId: h.dienteFinal!,
					status: h.estado as 'bueno' | 'malo'
				})),
		[hallazgos]
	)

	// Geminaciones
	const geminations = useMemo<Gemination[]>(
		() =>
			hallazgos
				.filter((h) => h.hallazgo === 'GEMINACION')
				.map((h) => ({
					id: h.id,
					toothId: h.diente!,
					status: h.estado as 'bueno' | 'malo'
				})),
		[hallazgos]
	)

	// Giroversiones
	const giroversions = useMemo<Giroversion[]>(
		() =>
			hallazgos
				.filter((h) => h.hallazgo === 'GIROVERSION')
				.map((h) => ({
					id: h.id,
					toothId: h.diente!,
					direction: h.especificacion?.toLowerCase().includes('mesial') ? 'mesial' : 'distal',
					status: h.estado as 'bueno' | 'malo'
				})),
		[hallazgos]
	)

	// Piezas ausentes
	const piezasAusentes = useMemo<PiezaAusente[]>(
		() =>
			hallazgos
				.filter((h) => h.hallazgo === 'PIEZA_AUSENTE')
				.map((h) => ({
					id: h.id,
					toothId: h.diente!,
					sigla: (h.siglas as 'DNE' | 'DEX' | 'DAO') || 'DNE',
					status: 'bueno' // Siempre azul
				})),
		[hallazgos]
	)

	// Dientes en clavija
	const dientesEnClavija = useMemo<DienteEnClavija[]>(
		() =>
			hallazgos
				.filter((h) => h.hallazgo === 'DIENTE_EN_CLAVIJA')
				.map((h) => ({
					id: h.id,
					toothId: h.diente!,
					hallazgo: 'DIENTE_EN_CLAVIJA' as const,
					status: 'bueno' // Siempre azul
				})),
		[hallazgos]
	)

	// Piezas en erupción
	const piezasErupccion = useMemo<PiezaErupccion[]>(
		() =>
			hallazgos
				.filter((h) => h.hallazgo === 'PIEZA_ERUPCION')
				.map((h) => ({
					id: h.id,
					toothId: h.diente!,
					hallazgo: 'PIEZA_ERUPCION' as const,
					status: 'bueno' // Siempre azul
				})),
		[hallazgos]
	)

	// Piezas extruidas
	const piezasExtruidas = useMemo<PiezaExtruida[]>(
		() =>
			hallazgos
				.filter((h) => h.hallazgo === 'PIEZA_EXTRUIDA')
				.map((h) => ({
					id: h.id,
					toothId: h.diente!,
					hallazgo: 'PIEZA_EXTRUIDA' as const,
					status: 'bueno' // Siempre azul
				})),
		[hallazgos]
	)

	// Piezas intruidas
	const piezasIntruidas = useMemo<PiezaIntruida[]>(
		() =>
			hallazgos
				.filter((h) => h.hallazgo === 'PIEZA_INTRUIDA')
				.map((h) => ({
					id: h.id,
					toothId: h.diente!,
					hallazgo: 'PIEZA_INTRUIDA' as const,
					status: 'bueno' // Siempre azul
				})),
		[hallazgos]
	)

	// Piezas supernumerarias
	const piezasSupernumerarias = useMemo<PiezaSupernumeraria[]>(
		() =>
			hallazgos
				.filter((h) => h.hallazgo === 'PIEZA_SUPERNUMERARIA')
				.map((h) => ({
					id: h.id,
					startId: h.diente!,
					endId: h.dienteFinal!,
					hallazgo: 'PIEZA_SUPERNUMERARIA' as const,
					status: 'bueno'
				})),
		[hallazgos]
	)

	// Pulpotomías
	const pulpotomias = useMemo<Pulpotomia[]>(
		() =>
			hallazgos
				.filter((h) => h.hallazgo === 'PULPOTOMIA')
				.map((h) => ({
					id: h.id,
					toothId: h.diente!,
					hallazgo: 'PULPOTOMIA' as const,
					status: h.estado as 'bueno' | 'malo'
				})),
		[hallazgos]
	)

	// Prótesis Fija
	const protesisFija = useMemo<ProtesisFija[]>(
		() =>
			hallazgos
				.filter((h) => h.hallazgo === 'PROTESIS_FIJA')
				.map((h) => ({
					id: h.id,
					startId: h.diente!,
					endId: h.dienteFinal!,
					status: h.estado as 'bueno' | 'malo'
				})),
		[hallazgos]
	)

	// Restauraciones
	const restauraciones = useMemo<Restauracion[]>(
		() =>
			hallazgos
				.filter((h) => h.hallazgo === 'RESTAURACION_DEFINITIVA')
				.map((h) => ({
					id: h.id,
					toothId: h.diente!,
					surfaces: h.superficies || [],
					sigla: h.sigla || 'RES',
					status: h.estado as 'bueno' | 'malo'
				})),
		[hallazgos]
	)

	// Restauraciones Temporales
	const restauracionesTemporales = useMemo<RestauracionTemporal[]>(
		() =>
			hallazgos
				.filter((h) => h.hallazgo === 'RESTAURACION_TEMPORAL')
				.map((h) => ({
					id: h.id,
					toothId: h.diente!,
					surfaces: h.superficies || []
				})),
		[hallazgos]
	)

	// Sellantes
	const sellantes = useMemo<Sellante[]>(
		() =>
			hallazgos
				.filter((h) => h.hallazgo === 'SELLANTE')
				.map((h) => ({
					id: h.id,
					toothId: h.diente!,
					sigla: h.sigla || 'S',
					status: h.estado as 'bueno' | 'malo'
				})),
		[hallazgos]
	)

	// Superficie Desgastada
	const superficiesDesgastadas = useMemo<SuperficieDesgastada[]>(
		() =>
			hallazgos
				.filter((h) => h.hallazgo === 'SUPERFICIE_DESGASTADA')
				.map((h) => ({
					id: h.id,
					toothId: h.diente!,
					surfaces: h.superficies || [],
					sigla: 'DES',
					status: 'malo'
				})),
		[hallazgos]
	)

	// Tratamiento de Conducto
	const tratamientosConducto = useMemo<TratamientoConducto[]>(
		() =>
			hallazgos
				.filter((h) => h.hallazgo === 'TRATAMIENTO_CONDUCTO')
				.map((h) => ({
					id: h.id,
					toothId: h.diente!,
					sigla: (h.sigla as 'TC' | 'PC') || 'TC',
					status: h.estado as 'bueno' | 'malo'
				})),
		[hallazgos]
	)

	// Transposiciones (nuevo)
	const transposiciones = useMemo<Transposicion[]>(
		() =>
			hallazgos
				.filter((h) => h.hallazgo === 'TRANSPOSICION')
				.map((h) => ({
					id: h.id,
					hallazgo: 'TRANSPOSICION',
					startId: h.diente!,
					endId: h.dienteFinal!,
					status: h.estado as 'bueno' | 'malo'
				})),
		[hallazgos]
	)

	// Defectos de Esmalte (DDE)
	const defectosEsmalte = useMemo<DefectosEsmalte[]>(
		() =>
			hallazgos
				.filter((h) => h.hallazgo === 'HIPOPLASIA_ESMALTE')
				.map((h) => ({
					id: h.id,
					toothId: h.diente!,
					type: (h.sigla as 'O' | 'PE' | 'Fluorosis') || 'O',
					status: 'malo'
				})),
		[hallazgos]
	)

	// Fosas y Fisuras Profundas (nuevo)
	const fosasFisuras = useMemo<FosasFisurasProfundas[]>(
		() =>
			hallazgos
				.filter((h) => h.hallazgo === 'FOSAS_FISURAS_PROFUNDAS')
				.map((h) => ({
					id: h.id,
					toothId: h.diente!,
					hallazgo: 'FOSAS_FISURAS_PROFUNDAS',
					sigla: 'FFP',
					status: 'bueno'
				})),
		[hallazgos]
	)

	// Impactación (nuevo)
	const impactacion = useMemo<Impactacion[]>(
		() =>
			hallazgos
				.filter((h) => h.hallazgo === 'IMPACTACION')
				.map((h) => ({
					id: h.id,
					toothId: h.diente!,
					hallazgo: 'IMPACTACION',
					sigla: 'I',
					status: 'bueno'
				})),
		[hallazgos]
	)

	// Implante Dental (nuevo)
	const implanteDental = useMemo<ImplanteDental[]>(
		() =>
			hallazgos
				.filter((h) => h.hallazgo === 'IMPLANTE_DENTAL')
				.map((h) => ({
					id: h.id,
					toothId: h.diente!,
					hallazgo: 'IMPLANTE_DENTAL',
					sigla: 'IMP',
					status: h.estado as 'bueno' | 'malo'
				})),
		[hallazgos]
	)

	// Macrodoncia (nuevo)
	const macrodoncia = useMemo<Macrodoncia[]>(
		() =>
			hallazgos
				.filter((h) => h.hallazgo === 'MACRODONCIA')
				.map((h) => ({
					id: h.id,
					toothId: h.diente!,
					hallazgo: 'MACRODONCIA',
					sigla: 'MAC',
					status: 'bueno'
				})),
		[hallazgos]
	)

	// Microdoncia (nuevo)
	const microdoncia = useMemo<Microdoncia[]>(
		() =>
			hallazgos
				.filter((h) => h.hallazgo === 'MICRODONCIA')
				.map((h) => ({
					id: h.id,
					toothId: h.diente!,
					hallazgo: 'MICRODONCIA',
					sigla: 'MIC',
					status: 'bueno'
				})),
		[hallazgos]
	)

	// Posicion Anormal Dentaria
	const posicionesAnormales = useMemo<PosicionAnormalDentaria[]>(() => {
		const validSiglas = new Set(['M', 'D', 'V', 'P', 'L'])

		return hallazgos
			.filter((h) => h.hallazgo === 'POSICION_ANORMAL_DENTARIA')
			.map((h) => {
				const sigla = (h.sigla || h.siglas || '').toUpperCase()
				if (!validSiglas.has(sigla)) return null

				return {
					id: h.id,
					toothId: h.diente!,
					hallazgo: 'POSICION_ANORMAL_DENTARIA' as const,
					sigla: sigla as PosicionAnormalDentaria['sigla'],
					status: 'bueno'
				}
			})
			.filter((item): item is PosicionAnormalDentaria => Boolean(item))
	}, [hallazgos])

	// Movilidad Patológica (nuevo)
	const movilidadPatologica = useMemo<MovilidadPatologica[]>(
		() =>
			hallazgos
				.filter((h) => h.hallazgo === 'MOVILIDAD_PATOLOGICA')
				.map((h) => ({
					id: h.id,
					toothId: h.diente!,
					hallazgo: 'MOVILIDAD_PATOLOGICA',
					grado: parseInt(h.siglas?.replace('M', '') || '1') as 1 | 2 | 3,
					sigla: h.siglas || 'M1',
					status: 'malo'
				})),
		[hallazgos]
	)

	// Pieza Ectópica (nuevo)
	const piezasEctopicas = useMemo<PiezaEctopica[]>(
		() =>
			hallazgos
				.filter((h) => h.hallazgo === 'PIEZA_ECTOPICA')
				.map((h) => ({
					id: h.id,
					toothId: h.diente!,
					hallazgo: 'PIEZA_ECTOPICA',
					sigla: 'E',
					status: 'bueno'
				})),
		[hallazgos]
	)

	const remanenteRadicular = useMemo<RemanenteRadicular[]>(
		() =>
			hallazgos
				.filter((h) => h.hallazgo === 'REMANENTE_RADICULAR')
				.map((h) => ({
					id: h.id,
					toothId: h.diente!,
					hallazgo: 'REMANENTE_RADICULAR',
					sigla: 'RR',
					status: 'malo'
				})),
		[hallazgos]
	)

	return {
		appliances,
		crowns,
		cariesList,
		diastemas,
		espigos,
		fractures,
		fusions,
		geminations,
		giroversions,
		piezasAusentes,
		dientesEnClavija,
		piezasErupccion,
		piezasExtruidas,
		piezasIntruidas,
		piezasSupernumerarias,
		pulpotomias,
		protesisFija,
		restauraciones,
		restauracionesTemporales,
		superficiesDesgastadas,
		tratamientosConducto,
		transposiciones,
		sellantes,
		defectosEsmalte,
		fosasFisuras,
		impactacion,
		implanteDental,
		macrodoncia,
		microdoncia,
		posicionesAnormales,
		movilidadPatologica,
		piezasEctopicas,
		remanenteRadicular
	}
}
