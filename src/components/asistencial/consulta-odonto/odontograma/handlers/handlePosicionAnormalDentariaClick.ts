import { toast } from 'sonner'
import type { HallazgoClinico } from '../types'
import { isToothInvalid } from '../utils'
import type { ClickHandlerContext } from './types'
import { generateHallazgoId, getCurrentDate } from './types'

const SIGLA_BY_TYPE = {
	posicion_anormal_mesial: { sigla: 'M', descripcion: 'Mesializado' },
	posicion_anormal_distal: { sigla: 'D', descripcion: 'Distalizado' },
	posicion_anormal_vestibular: { sigla: 'V', descripcion: 'Vestibularizado' },
	posicion_anormal_palatinizado: { sigla: 'P', descripcion: 'Palatinizado' },
	posicion_anormal_lingual: { sigla: 'L', descripcion: 'Lingualizado' }
} as const

/**
 * Handler para posicion anormal dentaria.
 */
export const handlePosicionAnormalDentariaClick = (ctx: ClickHandlerContext): boolean => {
	const { id, hallazgos, selectionMode, onHallazgoCreated, onHallazgoDeleted } = ctx

	if (!selectionMode.isActive) return false

	const seleccion = SIGLA_BY_TYPE[selectionMode.type as keyof typeof SIGLA_BY_TYPE]
	if (!seleccion) return false

	if (isToothInvalid(id, hallazgos)) {
		toast.error('No se puede registrar una posicion anormal dentaria en un diente invalido o ausente.')
		return true
	}

	const existing = hallazgos.find((h) => h.diente === id && h.hallazgo === 'POSICION_ANORMAL_DENTARIA')
	const existingSigla = (existing?.sigla || existing?.siglas || '').toUpperCase()

	if (existing) {
		if (!onHallazgoDeleted) return true

		onHallazgoDeleted(existing.id)
		if (existingSigla === seleccion.sigla) return true
	}

	const newHallazgo: HallazgoClinico = {
		id: generateHallazgoId(),
		diente: id,
		hallazgo: 'POSICION_ANORMAL_DENTARIA',
		estado: 'bueno',
		sigla: seleccion.sigla,
		especificacion: `Posicion anormal dentaria: ${seleccion.descripcion}`,
		fecha: getCurrentDate()
	}
	onHallazgoCreated(newHallazgo)

	return true
}
