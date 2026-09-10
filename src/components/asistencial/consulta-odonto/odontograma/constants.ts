/**
 * Constantes para el componente Odontograma.
 * Define la disposición de los dientes para adultos y niños.
 */

import type { ToothData } from './types'

/**
 * Dientes superiores para dentadura de adulto (cuadrantes 1 y 2).
 */
export const ADULT_TEETH_UPPER: ToothData[] = [
	{ id: 18, hasImage: true },
	{ id: 17, hasImage: true },
	{ id: 16, hasImage: true },
	{ id: 15, hasImage: true },
	{ id: 14, hasImage: true },
	{ id: 13, hasImage: true },
	{ id: 12, hasImage: true },
	{ id: 11, hasImage: true },
	{ id: 21, hasImage: true },
	{ id: 22, hasImage: true },
	{ id: 23, hasImage: true },
	{ id: 24, hasImage: true },
	{ id: 25, hasImage: true },
	{ id: 26, hasImage: true },
	{ id: 27, hasImage: true },
	{ id: 28, hasImage: true }
]

/**
 * Dientes inferiores para dentadura de adulto (cuadrantes 3 y 4).
 */
export const ADULT_TEETH_LOWER: ToothData[] = [
	{ id: 48, hasImage: true },
	{ id: 47, hasImage: true },
	{ id: 46, hasImage: true },
	{ id: 45, hasImage: true },
	{ id: 44, hasImage: true },
	{ id: 43, hasImage: true },
	{ id: 42, hasImage: true },
	{ id: 41, hasImage: true },
	{ id: 31, hasImage: true },
	{ id: 32, hasImage: true },
	{ id: 33, hasImage: true },
	{ id: 34, hasImage: true },
	{ id: 35, hasImage: true },
	{ id: 36, hasImage: true },
	{ id: 37, hasImage: true },
	{ id: 38, hasImage: true }
]

/**
 * Dientes superiores para dentadura de niño (cuadrantes 5 y 6).
 */
export const CHILD_TEETH_UPPER: ToothData[] = [
	{ id: 55, hasImage: true },
	{ id: 54, hasImage: true },
	{ id: 53, hasImage: true },
	{ id: 52, hasImage: true },
	{ id: 51, hasImage: true },
	{ id: 61, hasImage: true },
	{ id: 62, hasImage: true },
	{ id: 63, hasImage: true },
	{ id: 64, hasImage: true },
	{ id: 65, hasImage: true }
]

/**
 * Dientes inferiores para dentadura de niño (cuadrantes 7 y 8).
 */
export const CHILD_TEETH_LOWER: ToothData[] = [
	{ id: 85, hasImage: true },
	{ id: 84, hasImage: true },
	{ id: 83, hasImage: true },
	{ id: 82, hasImage: true },
	{ id: 81, hasImage: true },
	{ id: 71, hasImage: true },
	{ id: 72, hasImage: true },
	{ id: 73, hasImage: true },
	{ id: 74, hasImage: true },
	{ id: 75, hasImage: true }
]

/**
 * Obtiene la ruta de la imagen correspondiente a un diente específico.
 * @param id ID del diente según nomenclatura FDI.
 * @param position Arcada superior o inferior.
 * @returns URL de la imagen del diente.
 */
export const getToothImage = (id: number, position: 'upper' | 'lower'): string => {
	const prefix = position === 'upper' ? 'dentadura-sup-' : 'dentadura-inf-'
	return new URL(`./dientes/${prefix}${id}.png`, import.meta.url).href
}
