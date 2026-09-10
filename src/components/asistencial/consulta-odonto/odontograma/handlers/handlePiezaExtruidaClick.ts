/**
 * Handler para clicks de Pieza Extruida.
 */

import { toast } from 'sonner'
import { isToothInvalid } from '../utils'
import type { ToothClickHandler } from './types'
import { generateHallazgoId, getCurrentDate } from './types'

/**
 * Maneja el click para registrar una pieza extruida.
 * Valida que el diente sea válido y no esté ya marcado.
 */
export const handlePiezaExtruidaClick: ToothClickHandler = (ctx) => {
	const { id, hallazgos, selectionMode, onHallazgoCreated, piezasExtruidas } = ctx

	if (selectionMode.type !== 'pieza_extruida') return false

	if (isToothInvalid(id, hallazgos)) {
		toast.error('No se puede registrar "Extruida" en un diente inválido.')
		return true
	}

	if (piezasExtruidas.some((p) => p.toothId === id)) {
		toast.error('Este diente ya está marcado como "Extruida".')
		return true
	}

	onHallazgoCreated({
		id: generateHallazgoId(),
		diente: id,
		hallazgo: 'PIEZA_EXTRUIDA',
		estado: 'bueno',
		especificacion: 'Pieza Dental Extruida',
		fecha: getCurrentDate()
	})

	return true
}
