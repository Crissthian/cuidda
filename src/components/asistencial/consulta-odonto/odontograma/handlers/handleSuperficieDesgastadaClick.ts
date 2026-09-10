import type { ClickHandlerContext } from './types'
import type { HallazgoClinico } from '../types'

/**
 * Maneja el click para Superficie Desgastada.
 * Registra "DES" en rojo en el recuadro y dibuja rojo en la superficie.
 */
export const handleSuperficieDesgastadaClick = (ctx: ClickHandlerContext, surface?: string): boolean => {
	const { id, selectionMode, hallazgos, onHallazgoCreated, onHallazgoDeleted } = ctx

	if (!selectionMode.isActive || selectionMode.type !== 'superficie_desgastada') {
		return false
	}

	if (!surface) {
		return false
	}

	// Buscar hallazgo existente de superficie desgastada para este diente
	const existing = hallazgos.find((h) => h.hallazgo === 'SUPERFICIE_DESGASTADA' && h.diente === id)

	let newSurfaces: string[] = []
	let shouldDelete = false

	if (existing) {
		const currentSurfaces = existing.superficies || []

		if (currentSurfaces.includes(surface)) {
			newSurfaces = currentSurfaces.filter((s: string) => s !== surface)
		} else {
			newSurfaces = [...currentSurfaces, surface]
		}

		if (newSurfaces.length === 0) {
			shouldDelete = true
			if (onHallazgoDeleted) onHallazgoDeleted(existing.id)
			return true
		} else {
			if (onHallazgoDeleted) onHallazgoDeleted(existing.id)
		}
	} else {
		newSurfaces = [surface]
	}

	if (!shouldDelete) {
		const newHallazgo: HallazgoClinico = {
			id: Date.now().toString(),
			diente: id,
			hallazgo: 'SUPERFICIE_DESGASTADA',
			estado: 'malo',
			superficies: newSurfaces,
			sigla: 'DES',
			especificacion: `Superficie Desgastada (DES) en ${newSurfaces.join(', ')}`,
			fecha: new Date().toLocaleDateString('es-PE')
		}
		onHallazgoCreated(newHallazgo)
	}

	return true
}
