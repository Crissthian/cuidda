/**
 * Handler para clicks de Corona dental.
 */

import { toast } from 'sonner'
import { hasCrown, isToothInvalid } from '../utils'
import type { ToothClickHandler } from './types'
import { generateHallazgoId, getCurrentDate } from './types'

/**
 * Maneja el click para agregar una corona dental.
 * Valida que el diente sea válido y no tenga corona existente.
 */
export const handleCrownClick: ToothClickHandler = (ctx) => {
	const { id, hallazgos, selectionMode, onHallazgoCreated, crownLabelInput } = ctx

	if (selectionMode.type !== 'crown' && selectionMode.type !== 'corona_temporal') return false

	if (isToothInvalid(id, hallazgos)) {
		toast.error('No se puede colocar corona en un diente ausente, extraído, no erupcionado o agenésico.')
		return true
	}

	if (hasCrown(id, hallazgos)) {
		toast.error('Este diente ya tiene una corona.')
		return true
	}

	const isTemporal = selectionMode.type === 'corona_temporal'
	const sigla = isTemporal ? 'CT' : crownLabelInput.toUpperCase()

	onHallazgoCreated({
		id: generateHallazgoId(),
		diente: id,
		hallazgo: isTemporal ? 'CORONA_TEMPORAL' : 'CORONA',
		estado: selectionMode.status,
		siglas: sigla,
		especificacion: isTemporal ? 'Corona Temporal' : `Corona ${sigla}`,
		fecha: getCurrentDate()
	})

	return true
}
