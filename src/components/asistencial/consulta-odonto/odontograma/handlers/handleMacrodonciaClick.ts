import { toast } from 'sonner'
import type { HallazgoClinico } from '../types'
import { isToothInvalid } from '../utils'
import type { ClickHandlerContext } from './types'

/**
 * Handler para el hallazgo: MACRODONCIA
 * @param ctx Contexto con toda la información necesaria para los handlers
 * @returns true si se manejó el click, false si no
 */
export function handleMacrodonciaClick(ctx: ClickHandlerContext): boolean {
	const { id, hallazgos, selectionMode, onHallazgoCreated, onHallazgoDeleted } = ctx

	if (!selectionMode.isActive || selectionMode.type !== 'macrodoncia') {
		return false
	}

	// 1. Validaciones básicas
	if (isToothInvalid(id, hallazgos)) {
		toast.error('No se puede registrar macrodoncia en un diente ausente o inválido.')
		return true
	}

	// 2. Buscar si ya existe el hallazgo en este diente
	const existingHallazgo = hallazgos.find((h) => h.diente === id && h.hallazgo === 'MACRODONCIA')

	// 3. Toggle: Si existe se borra, si no existe se crea
	if (existingHallazgo && onHallazgoDeleted) {
		onHallazgoDeleted(existingHallazgo.id)
	} else {
		const newHallazgo: HallazgoClinico = {
			id: Date.now().toString(),
			diente: id,
			hallazgo: 'MACRODONCIA',
			estado: 'bueno', // Azul por defecto según requerimiento
			siglas: 'MAC',
			especificacion: 'Macrodoncia',
			fecha: new Date().toLocaleDateString('es-PE')
		}
		onHallazgoCreated(newHallazgo)
	}

	return true
}
