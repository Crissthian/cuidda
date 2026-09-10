/**
 * Handler para clicks de Pieza Intruida.
 */

import { toast } from 'sonner'
import { isToothInvalid } from '../utils'
import type { ToothClickHandler } from './types'
import { generateHallazgoId, getCurrentDate } from './types'

/**
 * Maneja el click para registrar una pieza intruida.
 * Valida que el diente sea válido y no esté ya marcado.
 */
export const handlePiezaIntruidaClick: ToothClickHandler = (ctx) => {
	const { id, hallazgos, selectionMode, onHallazgoCreated, piezasIntruidas } = ctx

	if (selectionMode.type !== 'pieza_intruida') return false

	if (isToothInvalid(id, hallazgos)) {
		toast.error('No se puede registrar "Intruida" en un diente inválido.')
		return true
	}

	if (piezasIntruidas?.some((p) => p.toothId === id)) {
		toast.error('Este diente ya está marcado como "Intruida".')
		return true
	}

	onHallazgoCreated({
		id: generateHallazgoId(),
		diente: id,
		hallazgo: 'PIEZA_INTRUIDA',
		estado: 'bueno',
		especificacion: 'Pieza Dental Intruida',
		fecha: getCurrentDate()
	})

	return true
}
