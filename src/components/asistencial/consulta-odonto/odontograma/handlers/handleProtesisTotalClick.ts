import type { ClickHandlerContext } from './types'
import type { HallazgoClinico } from '../types'

/**
 * Maneja el click para Prótesis Total (Superior/Inferior).
 * Se aplica a toda la arcada (Superior o Inferior) dependiendo del diente clickeado.
 */
export const handleProtesisTotalClick = (ctx: ClickHandlerContext): boolean => {
	const { id, selectionMode, onHallazgoCreated, onHallazgoDeleted, hallazgos, upperTeeth, lowerTeeth, viewMode } = ctx

	if (!selectionMode.isActive || selectionMode.type !== 'protesis_total') {
		return false
	}

	// Determinar arcada
	const isUpper = upperTeeth.some((t) => t.id === id)
	const isLower = lowerTeeth.some((t) => t.id === id)

	if (!isUpper && !isLower) return false

	const arcada = isUpper ? 'Superior' : 'Inferior'

	// Buscar si ya existe prótesis total en esa arcada
	const existing = hallazgos.find(
		(h) =>
			h.hallazgo === 'PROTESIS_TOTAL' && h.especificacion === arcada && (!h.viewMode || h.viewMode === viewMode)
	)

	if (existing) {
		// Si existe y tiene diferente estado, actualizar (borrar y crear)
		if (existing.estado !== selectionMode.status) {
			if (onHallazgoDeleted) onHallazgoDeleted(existing.id)

			const newHallazgo: HallazgoClinico = {
				id: Date.now().toString(),
				diente: null, // Aplica a toda la arcada
				hallazgo: 'PROTESIS_TOTAL',
				estado: selectionMode.status,
				especificacion: arcada,
				fecha: new Date().toLocaleDateString('es-PE'),
				viewMode
			}
			onHallazgoCreated(newHallazgo)
		} else {
			// Si es el mismo estado, toggles off (eliminar)
			if (onHallazgoDeleted) onHallazgoDeleted(existing.id)
		}
	} else {
		// Crear nuevo
		const newHallazgo: HallazgoClinico = {
			id: Date.now().toString(),
			diente: null,
			hallazgo: 'PROTESIS_TOTAL',
			estado: selectionMode.status,
			especificacion: arcada,
			fecha: new Date().toLocaleDateString('es-PE'),
			viewMode
		}
		onHallazgoCreated(newHallazgo)
	}

	return true
}
