import type { ClickHandlerContext } from './types'
import type { HallazgoClinico } from '../types'

/**
 * Maneja el click para Restauración Definitiva.
 * Permite seleccionar superficies (mesial, distal, oclusal, etc.) y asignar una sigla.
 */
export const handleRestauracionClick = (ctx: ClickHandlerContext, surface?: string): boolean => {
	const { id, selectionMode, hallazgos, onHallazgoCreated, onHallazgoDeleted, crownLabelInput } = ctx

	if (!selectionMode.isActive || selectionMode.type !== 'restauracion_definitiva') {
		return false
	}

	if (!surface) {
		return false // Requiere una superficie específica, o 'center'
	}

	// Buscar hallazgo existente de restauración para este diente
	const existing = hallazgos.find((h) => h.hallazgo === 'RESTAURACION_DEFINITIVA' && h.diente === id)

	let newSurfaces: string[] = []
	let shouldDelete = false

	if (existing) {
		// Cast as Restauracion to access specific properties safely
		const restauracion = existing as HallazgoClinico
		const currentSurfaces = restauracion.superficies || []

		// Toggle superficie
		if (currentSurfaces.includes(surface)) {
			newSurfaces = currentSurfaces.filter((s: string) => s !== surface)
		} else {
			newSurfaces = [...currentSurfaces, surface]
		}

		// Si no quedan superficies, borrar el hallazgo
		if (newSurfaces.length === 0) {
			shouldDelete = true
			if (onHallazgoDeleted) onHallazgoDeleted(existing.id)
			return true
		} else {
			// Si quedan, actualizamos (borramos y creamos nuevo para simplicidad en flujo inmutable)
			// Ojo: idealmente update, pero aqui usamos delete/create
			if (onHallazgoDeleted) onHallazgoDeleted(existing.id)
		}
	} else {
		newSurfaces = [surface]
	}

	if (!shouldDelete) {
		// Usar crownLabelInput para la sigla del material (AM, RES, etc.)
		const sigla = crownLabelInput || 'RES' // Default si no hay input? El requerimiento dice "se anotan las siglas"

		const newHallazgo: HallazgoClinico = {
			id: Date.now().toString(),
			diente: id,
			hallazgo: 'RESTAURACION_DEFINITIVA',
			estado: selectionMode.status,
			superficies: newSurfaces,
			sigla: sigla,
			especificacion: `Restauración (${sigla}) en ${newSurfaces.join(', ')}`,
			fecha: new Date().toLocaleDateString('es-PE')
		}
		onHallazgoCreated(newHallazgo)
	}

	return true
}
