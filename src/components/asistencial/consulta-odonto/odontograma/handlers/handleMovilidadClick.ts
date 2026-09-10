import { toast } from 'sonner'
import type { HallazgoClinico } from '../types'
import { isToothInvalid } from '../utils'
import type { ClickHandlerContext } from './types'

/**
 * Handler para el hallazgo: MOVILIDAD_PATOLOGICA (Grados 1, 2, 3)
 * @param ctx Contexto con toda la información necesaria para los handlers
 * @returns true si se manejó el click, false si no
 */
export function handleMovilidadClick(ctx: ClickHandlerContext): boolean {
	const { id, hallazgos, selectionMode, onHallazgoCreated, onHallazgoDeleted } = ctx

	if (!selectionMode.isActive) {
		return false
	}

	// Determinar el grado basado en el tipo de selección
	let grado = 0
	if (selectionMode.type === 'movilidad_1') grado = 1
	else if (selectionMode.type === 'movilidad_2') grado = 2
	else if (selectionMode.type === 'movilidad_3') grado = 3
	else return false

	// 1. Validaciones básicas
	if (isToothInvalid(id, hallazgos)) {
		toast.error('No se puede registrar movilidad en un diente ausente o inválido.')
		return true
	}

	// 2. Buscar si ya existe un hallazgo de movilidad en este diente
	// Regla: Solo puede haber UN grado de movilidad. Si existe, se reemplaza o borra si es el mismo.
	const existingHallazgo = hallazgos.find((h) => h.diente === id && h.hallazgo === 'MOVILIDAD_PATOLOGICA')

	// 3. Lógica de Toggle y Reemplazo
	if (existingHallazgo) {
		// Primero borramos el existente siempre
		if (onHallazgoDeleted) onHallazgoDeleted(existingHallazgo.id)

		// Si el existente era del MISMO grado, terminamos (toggle off)
		// Si era de DIFERENTE grado, procedemos a crear el nuevo (reemplazo)
		const existingGrado = parseInt(existingHallazgo.siglas?.replace('M', '') || '0')
		if (existingGrado === grado) {
			return true
		}
	}

	// Crear el nuevo hallazgo
	const newHallazgo: HallazgoClinico = {
		id: Date.now().toString(),
		diente: id,
		hallazgo: 'MOVILIDAD_PATOLOGICA',
		estado: 'malo', // Rojo por defecto
		siglas: `M${grado}`,
		especificacion: `Movilidad Grado ${grado}`,
		fecha: new Date().toLocaleDateString('es-PE')
	}
	onHallazgoCreated(newHallazgo)

	return true
}
