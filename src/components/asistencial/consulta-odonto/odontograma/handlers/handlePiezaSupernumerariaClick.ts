/**
 * Handler para clicks de Pieza Supernumeraria.
 */

import { toast } from 'sonner'
import { isToothInvalid, areTeethAdjacent, isUpperArch } from '../utils'
import type { ToothClickHandler } from './types'
import { generateHallazgoId, getCurrentDate } from './types'

/**
 * Maneja el click para agregar una pieza supernumeraria entre dos dientes.
 * Requiere selección de dos dientes contiguos del mismo arco y que sean adyacentes.
 */
export const handlePiezaSupernumerariaClick: ToothClickHandler = (ctx) => {
	const {
		id,
		hallazgos,
		selectionMode,
		setSelectionMode,
		onHallazgoCreated,
		piezasSupernumerarias,
		upperTeeth,
		lowerTeeth
	} = ctx

	if (selectionMode.type !== 'pieza_supernumeraria') return false

	// Primer click: establecer diente inicial
	if (selectionMode.startId === null) {
		if (isToothInvalid(id, hallazgos)) {
			toast.error('No se puede registrar pieza supernumeraria referencia a un diente inválido.')
			return true
		}
		setSelectionMode((prev) => ({ ...prev, startId: id }))
		return true
	}

	// Click en el mismo diente: cancelar selección
	if (selectionMode.startId === id) {
		setSelectionMode((prev) => ({ ...prev, startId: null }))
		return true
	}

	// Segundo click: validar y crear
	const startId = selectionMode.startId
	const endId = id

	if (isUpperArch(startId) !== isUpperArch(endId)) {
		toast.error('La pieza supernumeraria debe registrarse entre dientes del mismo arco.')
		return true
	}

	if (!areTeethAdjacent(startId, endId, upperTeeth, lowerTeeth)) {
		toast.error('La pieza supernumeraria debe referenciarse entre dientes contiguos.')
		return true
	}

	// Verificar si ya existe una pieza supernumeraria en esta misma ubicación
	const exists = piezasSupernumerarias?.some(
		(p) => (p.startId === startId && p.endId === endId) || (p.startId === endId && p.endId === startId)
	)

	if (exists) {
		toast.error('Ya existe una pieza supernumeraria registrada en esta ubicación.')
		setSelectionMode((prev) => ({ ...prev, startId: null }))
		return true
	}

	if (isToothInvalid(startId, hallazgos) || isToothInvalid(endId, hallazgos)) {
		toast.error('Ambos dientes de referencia deben estar presentes.')
		setSelectionMode((prev) => ({ ...prev, startId: null }))
		return true
	}

	onHallazgoCreated({
		id: generateHallazgoId(),
		diente: startId,
		dienteFinal: endId,
		hallazgo: 'PIEZA_SUPERNUMERARIA',
		estado: 'bueno',
		especificacion: 'Pieza Supernumeraria',
		fecha: getCurrentDate()
	})

	setSelectionMode({ isActive: false, type: 'fixed', status: 'bueno', startId: null })
	return true
}
