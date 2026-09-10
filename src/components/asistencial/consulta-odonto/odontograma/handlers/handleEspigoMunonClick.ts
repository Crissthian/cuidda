/**
 * Handler para clicks de Espigo Muñón.
 */

import { toast } from 'sonner'
import { isToothInvalid } from '../utils'
import type { ToothClickHandler } from './types'
import { generateHallazgoId, getCurrentDate } from './types'

/**
 * Maneja el click para agregar un espigo muñón.
 * Valida que el diente sea válido y no tenga espigo existente.
 */
export const handleEspigoMunonClick: ToothClickHandler = (ctx) => {
	const { id, hallazgos, selectionMode, onHallazgoCreated, espigos } = ctx

	if (selectionMode.type !== 'espigo_munon') return false

	if (isToothInvalid(id, hallazgos)) {
		toast.error('No se puede registrar espigo muñón en un diente inválido.')
		return true
	}

	if (espigos.some((e) => e.toothId === id)) {
		toast.error('Este diente ya tiene registrado un espigo muñón.')
		return true
	}

	onHallazgoCreated({
		id: generateHallazgoId(),
		diente: id,
		hallazgo: 'ESPIGO_MUNON',
		estado: selectionMode.status,
		especificacion: 'Espigo Muñon',
		fecha: getCurrentDate()
	})

	return true
}
