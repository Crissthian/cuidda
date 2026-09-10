/**
 * Handler para clicks de Pieza en Erupción.
 */

import { toast } from 'sonner'
import { isToothInvalid } from '../utils'
import type { ToothClickHandler } from './types'
import { generateHallazgoId, getCurrentDate } from './types'

/**
 * Maneja el click para registrar una pieza en erupción.
 * Valida que el diente sea válido y no esté ya marcado.
 */
export const handlePiezaErupcionClick: ToothClickHandler = (ctx) => {
	const { id, hallazgos, selectionMode, onHallazgoCreated, piezasErupccion } = ctx

	if (selectionMode.type !== 'pieza_erupcion') return false

	if (isToothInvalid(id, hallazgos)) {
		toast.error('No se puede registrar "En erupción" en un diente inválido.')
		return true
	}

	if (piezasErupccion.some((p) => p.toothId === id)) {
		toast.error('Este diente ya está marcado como "En erupción".')
		return true
	}

	onHallazgoCreated({
		id: generateHallazgoId(),
		diente: id,
		hallazgo: 'PIEZA_ERUPCION',
		estado: 'bueno',
		especificacion: 'Pieza Dental en Erupción',
		fecha: getCurrentDate()
	})

	return true
}
