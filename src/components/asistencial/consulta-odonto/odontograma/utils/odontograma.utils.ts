/**
 * Funciones utilitarias para el componente Odontograma.
 */

import type { ToothData, Appliance, Diastema, HallazgoClinico } from '../types'

/**
 * Obtiene todos los IDs de dientes de las arcadas proporcionadas.
 * @param upperTeeth Dientes de la arcada superior.
 * @param lowerTeeth Dientes de la arcada inferior.
 * @returns Array con todos los IDs de dientes.
 */
export const getAllTeethIds = (upperTeeth: ToothData[], lowerTeeth: ToothData[]): number[] => {
	return [...upperTeeth, ...lowerTeeth].map((t) => t.id)
}

/**
 * Obtiene los IDs de dientes en un rango (inclusive).
 * @param startId ID del diente inicial.
 * @param endId ID del diente final.
 * @param upperTeeth Dientes de la arcada superior.
 * @param lowerTeeth Dientes de la arcada inferior.
 * @returns Array con los IDs de dientes en el rango.
 */
export const getTeethInRange = (
	startId: number,
	endId: number,
	upperTeeth: ToothData[],
	lowerTeeth: ToothData[]
): number[] => {
	const allIds = getAllTeethIds(upperTeeth, lowerTeeth)
	const startIdx = allIds.indexOf(startId)
	const endIdx = allIds.indexOf(endId)
	if (startIdx === -1 || endIdx === -1) return []
	const min = Math.min(startIdx, endIdx)
	const max = Math.max(startIdx, endIdx)
	return allIds.slice(min, max + 1)
}

/**
 * Verifica si dos dientes son contiguos.
 * @param id1 ID del primer diente.
 * @param id2 ID del segundo diente.
 * @param upperTeeth Dientes de la arcada superior.
 * @param lowerTeeth Dientes de la arcada inferior.
 * @returns true si los dientes son adyacentes.
 */
export const areTeethAdjacent = (
	id1: number,
	id2: number,
	upperTeeth: ToothData[],
	lowerTeeth: ToothData[]
): boolean => {
	const allIds = getAllTeethIds(upperTeeth, lowerTeeth)
	const idx1 = allIds.indexOf(id1)
	const idx2 = allIds.indexOf(id2)
	if (idx1 === -1 || idx2 === -1) return false
	return Math.abs(idx1 - idx2) === 1
}

/**
 * Verifica si un diente pertenece a la arcada superior.
 * @param id ID del diente.
 * @returns true si el diente está en la arcada superior.
 */
export const isUpperArch = (id: number): boolean => {
	return id < 30 || (id >= 50 && id < 70)
}

/**
 * Verifica si un diente existe en la vista actual.
 * @param id ID del diente.
 * @param upperTeeth Dientes de la arcada superior.
 * @param lowerTeeth Dientes de la arcada inferior.
 * @returns true si el diente está en la vista actual.
 */
export const isToothInCurrentView = (id: number, upperTeeth: ToothData[], lowerTeeth: ToothData[]): boolean => {
	const allTeethIds = [...upperTeeth, ...lowerTeeth].map((t) => t.id)
	return allTeethIds.includes(id)
}

/**
 * Genera la trayectoria SVG para un aparato removible con patrón zigzag.
 * @param x1 Coordenada X inicial.
 * @param y1 Coordenada Y inicial.
 * @param x2 Coordenada X final.
 * @param y2 Coordenada Y final.
 * @returns Path SVG en formato string.
 */
export const generateZigzagPath = (x1: number, y1: number, x2: number, y2: number): string => {
	const dx = x2 - x1
	const dy = y2 - y1
	const distance = Math.sqrt(dx * dx + dy * dy)
	if (distance < 1) return `M ${x1} ${y1}`

	// Parámetros para un zigzag rítmico
	const approxStep = 12
	const amplitude = 6

	// segments es el número de tramos del zigzag.
	// Para simetría, usamos un número par.
	let segments = Math.round(distance / approxStep)
	if (segments % 2 !== 0) segments++
	if (segments < 2) segments = 2

	// El ancho proyectado de un tramo completo (de pico a valle)
	// La suma de tramos: 0.5 (inicio) + (segments-2) (medios) + 0.5 (final) = (segments-1)
	const step = distance / (segments - 1)

	// Vectores unitarios para dirección y normal
	const ux = dx / distance
	const uy = dy / distance
	const nx = -uy
	const ny = ux

	let path = `M ${x1} ${y1}`

	for (let i = 1; i < segments; i++) {
		const d = (i - 0.5) * step
		const cx = x1 + d * ux
		const cy = y1 + d * uy

		const side = i % 2 === 1 ? 1 : -1
		const px = cx + side * amplitude * nx
		const py = cy + side * amplitude * ny
		path += ` L ${px} ${py}`
	}

	path += ` L ${x2} ${y2}`
	return path
}

/**
 * Genera la trayectoria SVG para una flecha en zigzag vertical.
 * @param x1 Coordenada X inicial.
 * @param y1 Coordenada Y inicial.
 * @param x2 Coordenada X final.
 * @param y2 Coordenada Y final.
 * @param straightLength Longitud de la línea recta final (opcional).
 * @returns Path SVG en formato string.
 */
export const generateVerticalZigzagPath = (
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	straightLength: number = 6
): string => {
	const dx = x2 - x1
	const dy = y2 - y1
	const totalDist = Math.sqrt(dx * dx + dy * dy)

	const zigzagDist = Math.max(0, totalDist - straightLength)
	if (zigzagDist < 1) return `M ${x1} ${y1} L ${x2} ${y2}`

	const approxStep = 6
	const amplitude = 4

	let segments = Math.round(zigzagDist / approxStep)
	if (segments % 2 !== 0) segments++
	if (segments < 2) segments = 2

	const step = zigzagDist / (segments - 1)

	const ux = dx / totalDist
	const uy = dy / totalDist
	const nx = -uy
	const ny = ux

	let path = `M ${x1} ${y1}`

	for (let i = 1; i < segments; i++) {
		const d = (i - 0.5) * step
		const cx = x1 + d * ux
		const cy = y1 + d * uy
		const side = i % 2 === 1 ? -1 : 1
		path += ` L ${cx + side * amplitude * nx} ${cy + side * amplitude * ny}`
	}

	const xZEnd = x1 + zigzagDist * ux
	const yZEnd = y1 + zigzagDist * uy
	path += ` L ${xZEnd} ${yZEnd} L ${x2} ${y2}`
	return path
}

/**
 * Calcula las coordenadas X e Y relativas al contenedor SVG para un diente dado.
 * @param id ID del diente.
 * @param toothRefs Map con referencias a los elementos DOM de los dientes.
 * @param containerRef Referencia al contenedor SVG.
 * @returns Coordenadas relativas o null si no se pueden calcular.
 */
export const getCoordinates = (
	id: number,
	toothRefs: Map<number, HTMLDivElement>,
	containerRef: HTMLDivElement | null
): { x: number; y: number } | null => {
	const el = toothRefs.get(id)
	const container = containerRef
	if (!el || !container) return null

	const rect = el.getBoundingClientRect()
	const containerRect = container.getBoundingClientRect()

	const x = rect.left - containerRect.left + rect.width / 2
	const isUpper = id < 30 || (id >= 50 && id < 70)

	const y = isUpper ? 50 : rect.height - 50

	return { x, y: rect.top - containerRect.top + y }
}

// --- Funciones de Validación ---

/**
 * Verifica si el diente tiene un estado inválido (ausente, extraído, no erupcionado, agenésico).
 * @param toothId ID del diente.
 * @param hallazgos Lista de hallazgos clínicos.
 * @returns true si el diente tiene un estado inválido.
 */
export const isToothInvalid = (toothId: number, hallazgos: HallazgoClinico[]): boolean => {
	const invalidStates = ['AUSENTE', 'EXTRAIDO', 'NO_ERUPCIONADO', 'AGENESICO', 'IMPLANTE', 'PIEZA_AUSENTE']
	return hallazgos.some((h) => h.diente === toothId && invalidStates.includes(h.hallazgo))
}

/**
 * Verifica si el diente tiene corona.
 * @param toothId ID del diente.
 * @param hallazgos Lista de hallazgos clínicos.
 * @returns true si el diente tiene corona.
 */
export const hasCrown = (toothId: number, hallazgos: HallazgoClinico[]): boolean => {
	return hallazgos.some((h) => h.diente === toothId && (h.hallazgo === 'CORONA' || h.hallazgo === 'CORONA_TEMPORAL'))
}

/**
 * Verifica si hay prótesis total en la arcada.
 * @param arch Arcada a verificar ('upper' o 'lower').
 * @param hallazgos Lista de hallazgos clínicos.
 * @returns true si hay prótesis total en la arcada.
 */
export const hasProtesisTotal = (arch: 'upper' | 'lower', hallazgos: HallazgoClinico[]): boolean => {
	return hallazgos.some(
		(h) =>
			h.hallazgo === 'PROTESIS_TOTAL' &&
			h.especificacion?.toLowerCase().includes(arch === 'upper' ? 'superior' : 'inferior')
	)
}

/**
 * Verifica si existe un aparato fijo que cubra el diente.
 * @param toothId ID del diente.
 * @param appliances Lista de aparatos.
 * @param upperTeeth Dientes de la arcada superior.
 * @param lowerTeeth Dientes de la arcada inferior.
 * @returns true si hay un aparato fijo cubriendo el diente.
 */
export const hasFixedApplianceCovering = (
	toothId: number,
	appliances: Appliance[],
	upperTeeth: ToothData[],
	lowerTeeth: ToothData[]
): boolean => {
	return appliances.some((a) => {
		if (a.type !== 'fixed') return false
		const range = getTeethInRange(a.startId, a.endId, upperTeeth, lowerTeeth)
		return range.includes(toothId)
	})
}

/**
 * Verifica si existe un aparato removible que cubra el diente.
 * @param toothId ID del diente.
 * @param appliances Lista de aparatos.
 * @param upperTeeth Dientes de la arcada superior.
 * @param lowerTeeth Dientes de la arcada inferior.
 * @returns true si hay un aparato removible cubriendo el diente.
 */
export const hasRemovableApplianceCovering = (
	toothId: number,
	appliances: Appliance[],
	upperTeeth: ToothData[],
	lowerTeeth: ToothData[]
): boolean => {
	return appliances.some((a) => {
		if (a.type !== 'removable') return false
		const range = getTeethInRange(a.startId, a.endId, upperTeeth, lowerTeeth)
		return range.includes(toothId)
	})
}

/**
 * Verifica si existe un diastema entre dos dientes (bidireccional).
 * @param id1 ID del primer diente.
 * @param id2 ID del segundo diente.
 * @param diastemas Lista de diastemas.
 * @returns true si existe un diastema entre los dientes.
 */
export const hasDiastemaBetween = (id1: number, id2: number, diastemas: Diastema[]): boolean => {
	return diastemas.some((d) => (d.startId === id1 && d.endId === id2) || (d.startId === id2 && d.endId === id1))
}

/**
 * Verifica si un aparato fijo (puente) cubre ambos dientes.
 * @param id1 ID del primer diente.
 * @param id2 ID del segundo diente.
 * @param appliances Lista de aparatos.
 * @param upperTeeth Dientes de la arcada superior.
 * @param lowerTeeth Dientes de la arcada inferior.
 * @returns true si hay un puente entre los dientes.
 */
export const hasBridgeBetween = (
	id1: number,
	id2: number,
	appliances: Appliance[],
	upperTeeth: ToothData[],
	lowerTeeth: ToothData[]
): boolean => {
	return appliances.some((a) => {
		if (a.type !== 'fixed') return false
		const range = getTeethInRange(a.startId, a.endId, upperTeeth, lowerTeeth)
		return range.includes(id1) && range.includes(id2)
	})
}
