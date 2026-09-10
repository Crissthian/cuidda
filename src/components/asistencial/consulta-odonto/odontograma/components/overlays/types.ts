/**
 * Types and shared utilities for SVG overlay components.
 */

import type { ToothData, HallazgoClinico } from '../../types'

/**
 * Props base que comparten todos los overlay components.
 */
export interface OverlayBaseProps {
	/** Referencias a los elementos DOM de los dientes */
	toothRefs: React.RefObject<Map<number, HTMLDivElement>>
	/** Referencia al contenedor SVG */
	containerRef: React.RefObject<HTMLDivElement | null>
	/** Indica si las referencias están listas para usar */
	refsReady: boolean
	/** Dientes de la arcada superior */
	upperTeeth: ToothData[]
	/** Dientes de la arcada inferior */
	lowerTeeth: ToothData[]
	/** Clave para forzar re-renderizado */
	refreshKey?: number
}

/**
 * Contexto extendido para overlays que necesitan validar hallazgos.
 */
export interface OverlayWithHallazgosProps extends OverlayBaseProps {
	hallazgos: HallazgoClinico[]
}

/**
 * Calcula el rectángulo de un diente relativo al contenedor.
 */
export function getToothRect(
	toothId: number,
	toothRefs: Map<number, HTMLDivElement>,
	container: HTMLDivElement | null
): { rect: DOMRect; containerRect: DOMRect; cx: number; topY: number } | null {
	const toothEl = toothRefs.get(toothId)
	if (!toothEl || !container) return null

	const rect = toothEl.getBoundingClientRect()
	const containerRect = container.getBoundingClientRect()

	const cx = rect.left - containerRect.left + rect.width / 2
	const topY = rect.top - containerRect.top

	return { rect, containerRect, cx, topY }
}

/**
 * Determina si un diente pertenece a la arcada superior.
 */
export function isUpperTooth(toothId: number): boolean {
	return toothId < 30 || (toothId >= 50 && toothId < 70)
}

/**
 * Colores estándar para overlays.
 */
export const OVERLAY_COLORS = {
	bueno: '#2563EB', // Azul
	malo: '#DC2626' // Rojo
} as const

/**
 * Offsets verticales para diferentes áreas del diente.
 * Basados en el layout de ToothColumn.
 */
export const VERTICAL_OFFSETS = {
	upper: {
		/** Centro del área de interacción (corona gráfica) */
		crownCenter: 204,
		/** Centro del área de imagen (raíz) */
		rootCenter: 120,
		/** Centro del número/ID */
		numberCenter: 253,
		/** Espacio entre siglas y diente */
		siglaImageSpace: 72
	},
	lower: {
		/** Centro del área de interacción (corona gráfica) */
		crownCenter: 68,
		/** Centro del área de imagen (raíz) */
		rootCenter: 152,
		/** Centro del número/ID */
		numberCenter: 16,
		/** Espacio entre siglas y diente */
		siglaImageSpace: 200
	}
} as const
