/**
 * Handler para clicks de Aparato Ortodóntico (Fijo o Removible).
 */

import { toast } from 'sonner'
import {
	getTeethInRange,
	hasFixedApplianceCovering,
	hasProtesisTotal,
	hasRemovableApplianceCovering,
	isToothInvalid,
	isUpperArch
} from '../utils'
import type { ToothClickHandler } from './types'
import { generateHallazgoId, getCurrentDate } from './types'

/**
 * Maneja el click para agregar un aparato ortodóntico (fijo o removible).
 * Requiere selección de dos dientes del mismo arco con validaciones específicas.
 */
export const handleApplianceClick: ToothClickHandler = (ctx) => {
	const { id, hallazgos, selectionMode, setSelectionMode, onHallazgoCreated, appliances, upperTeeth, lowerTeeth } =
		ctx

	if (selectionMode.type !== 'fixed' && selectionMode.type !== 'removable') {
		return false
	}

	// Primer click: establecer diente inicial
	if (selectionMode.startId === null) {
		if (selectionMode.type === 'fixed' && isToothInvalid(id, hallazgos)) {
			toast.error('No se puede iniciar aparato fijo en un diente inválido.')
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

	// Segundo click: validar y crear aparato
	const startId = selectionMode.startId
	const endId = id
	const startIsUpper = isUpperArch(startId)
	const endIsUpper = isUpperArch(endId)

	if (startIsUpper !== endIsUpper) {
		toast.error('El aparato debe conectar dientes de la misma arcada.')
		return true
	}

	const range = getTeethInRange(startId, endId, upperTeeth, lowerTeeth)

	// Validaciones para aparato fijo
	if (selectionMode.type === 'fixed') {
		if (range.length < 2) {
			toast.error('El aparato fijo requiere mínimo 2 dientes.')
			return true
		}
		if (range.some((tid) => isToothInvalid(tid, hallazgos))) {
			toast.error('Todos los dientes del aparato fijo deben estar presentes.')
			return true
		}
		const hasOverlap = appliances.some(
			(a) =>
				a.type === 'fixed' &&
				getTeethInRange(a.startId, a.endId, upperTeeth, lowerTeeth).some((t) => range.includes(t))
		)
		if (hasOverlap) {
			toast.error('Ya existe un aparato fijo sobre alguno de estos dientes.')
			return true
		}
		if (range.some((tid) => hasRemovableApplianceCovering(tid, appliances, upperTeeth, lowerTeeth))) {
			toast.error('No puede coexistir aparato fijo y removible en el mismo diente.')
			return true
		}
	}

	// Validaciones para aparato removible
	if (selectionMode.type === 'removable') {
		if (hasProtesisTotal(startIsUpper ? 'upper' : 'lower', hallazgos)) {
			toast.error('No se puede agregar aparato removible en arcada con prótesis total.')
			return true
		}
		const hasOverlap = appliances.some(
			(a) =>
				a.type === 'removable' &&
				getTeethInRange(a.startId, a.endId, upperTeeth, lowerTeeth).some((t) => range.includes(t))
		)
		if (hasOverlap) {
			toast.error('Ya existe un aparato removible sobre alguno de estos dientes.')
			return true
		}
		if (range.some((tid) => hasFixedApplianceCovering(tid, appliances, upperTeeth, lowerTeeth))) {
			toast.error('No puede coexistir aparato fijo y removible en el mismo diente.')
			return true
		}
	}

	onHallazgoCreated({
		id: generateHallazgoId(),
		diente: startId,
		dienteFinal: endId,
		hallazgo: selectionMode.type === 'fixed' ? 'APARATO_ORTODONTICO_FIJO' : 'APARATO_REMOVIBLE',
		estado: selectionMode.status,
		especificacion: selectionMode.type === 'fixed' ? 'Aparato Ortodóntico Fijo' : 'Aparato Removible',
		fecha: getCurrentDate()
	})

	setSelectionMode({ isActive: false, type: 'fixed', status: 'bueno', startId: null })
	return true
}
