import type { ClickHandlerContext } from './types'
import type { HallazgoClinico } from '../types'

/**
 * Maneja el click para Sellantes.
 */
export const handleSellanteClick = (ctx: ClickHandlerContext): boolean => {
	const { id, selectionMode, hallazgos, onHallazgoCreated, onHallazgoDeleted } = ctx

	if (!selectionMode.isActive || !['sealant_good', 'sealant_bad'].includes(selectionMode.type)) {
		return false
	}

	// Buscar hallazgo existente
	const existing = hallazgos.find((h) => h.hallazgo === 'SELLANTE' && h.diente === id)

	if (existing) {
		// Toggle: Si click en existente, borrar.
		if (onHallazgoDeleted) onHallazgoDeleted(existing.id)
	} else {
		const status = selectionMode.type === 'sealant_good' ? 'bueno' : 'malo'
		const newHallazgo: HallazgoClinico = {
			id: Date.now().toString(),
			diente: id,
			hallazgo: 'SELLANTE',
			estado: status,
			sigla: 'S',
			especificacion: `Sellante (${status})`,
			fecha: new Date().toLocaleDateString('es-PE')
		}
		onHallazgoCreated(newHallazgo)
	}

	return true
}
