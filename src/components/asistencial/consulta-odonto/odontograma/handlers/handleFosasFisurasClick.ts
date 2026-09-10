import type { ClickHandlerContext } from './types'
import type { HallazgoClinico } from '../types'
import { isToothInvalid } from '../utils'
import { toast } from 'sonner'

/**
 * Maneja el click para Fosas y Fisuras Profundas.
 * Se coloca sigla FFP en azul.
 */
export const handleFosasFisurasClick = (ctx: ClickHandlerContext): boolean => {
	const { id, selectionMode, hallazgos, onHallazgoCreated, onHallazgoDeleted } = ctx

	if (!selectionMode.isActive || selectionMode.type !== 'fosas_fisuras_profundas') {
		return false
	}

	// Validaciones básicas
	if (isToothInvalid(id, hallazgos)) {
		toast.error('No se puede registrar "Fosas y Fisuras Profundas" en un diente inválido.')
		return true
	}

	// Buscar hallazgo existente
	const existing = hallazgos.find((h) => h.hallazgo === 'FOSAS_FISURAS_PROFUNDAS' && h.diente === id)

	if (existing) {
		// Toggle: Si click en existente, borrar.
		if (onHallazgoDeleted) onHallazgoDeleted(existing.id)
	} else {
		const newHallazgo: HallazgoClinico = {
			id: Date.now().toString(),
			diente: id,
			hallazgo: 'FOSAS_FISURAS_PROFUNDAS',
			estado: 'bueno',
			sigla: 'FFP',
			especificacion: 'Fosas y Fisuras Profundas',
			fecha: new Date().toLocaleDateString('es-PE')
			// Guardamos el viewMode actual si existe en el contexto, aunque no esté explícito en ClickHandlerContext todavía en todos lados,
			// pero Odontograma.tsx lo inyecta si actualizamos createHandlerContext.
			// Por ahora seguimos el patrón de otros handlers.
		}
		onHallazgoCreated(newHallazgo)
	}

	return true
}
