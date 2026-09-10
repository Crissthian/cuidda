import type { ClickHandlerContext } from './types'
import type { HallazgoClinico } from '../types'
import { isToothInvalid } from '../utils'
import { toast } from 'sonner'

/**
 * Maneja el click para Impactación.
 * Se coloca sigla "I" en azul.
 * Sólo se registra si se observa la pieza dentaria o parte de ella en boca.
 */
export const handleImpactacionClick = (ctx: ClickHandlerContext): boolean => {
	const { id, selectionMode, hallazgos, onHallazgoCreated, onHallazgoDeleted } = ctx

	if (!selectionMode.isActive || selectionMode.type !== 'impactacion') {
		return false
	}

	// Validaciones básicas: No se puede aplicar en diente ausente o no válido
	if (isToothInvalid(id, hallazgos)) {
		toast.error('No se puede registrar "Impactación" en un diente inválido o ausente.')
		return true
	}

	// Buscar hallazgo existente
	const existing = hallazgos.find((h) => h.hallazgo === 'IMPACTACION' && h.diente === id)

	if (existing) {
		// Toggle: Si click en existente, borrar.
		if (onHallazgoDeleted) onHallazgoDeleted(existing.id)
	} else {
		const newHallazgo: HallazgoClinico = {
			id: Date.now().toString(),
			diente: id,
			hallazgo: 'IMPACTACION',
			estado: 'bueno',
			sigla: 'I',
			especificacion: 'Pieza Impactada',
			fecha: new Date().toLocaleDateString('es-PE')
		}
		onHallazgoCreated(newHallazgo)
	}

	return true
}
