/**
 * PiezaExtruidaOverlay - Renderiza piezas extruidas.
 */

import React from 'react'
import type { PiezaExtruida } from '../../types'
import type { OverlayBaseProps } from './types'
import { getToothRect, isUpperTooth, OVERLAY_COLORS } from './types'
import { isToothInCurrentView } from '../../utils'

interface PiezaExtruidaOverlayProps extends OverlayBaseProps {
	piezasExtruidas: PiezaExtruida[]
}

/**
 * Componente que renderiza piezas extruidas.
 * Se muestra como una flecha recta vertical azul apuntando hacia afuera del diente.
 */
export const PiezaExtruidaOverlay: React.FC<PiezaExtruidaOverlayProps> = ({
	piezasExtruidas,
	toothRefs,
	containerRef,
	refsReady,
	upperTeeth,
	lowerTeeth
}) => {
	if (!refsReady) return null

	return (
		<>
			{piezasExtruidas?.map((item) => {
				if (!isToothInCurrentView(item.toothId, upperTeeth, lowerTeeth)) return null

				const data = getToothRect(item.toothId, toothRefs.current, containerRef.current)
				if (!data) return null

				const { cx, topY } = data
				const isUpper = isUpperTooth(item.toothId)

				let y1: number, y2: number
				const length = 24

				if (isUpper) {
					// Upper: Apunta hacia ABAJO (sentido externo incisal)
					y1 = topY + 138
					y2 = y1 + length
				} else {
					// Lower: Apunta hacia ARRIBA (sentido externo incisal)
					y1 = topY + 134
					y2 = y1 - length
				}

				const color = OVERLAY_COLORS.bueno
				const arrowHeadSize = 5

				const linePath = `M ${cx} ${y1} L ${cx} ${y2}`

				let arrowHeadPath = ''
				if (isUpper) {
					// Apunta ABAJO
					arrowHeadPath = `M ${cx - arrowHeadSize} ${y2 - arrowHeadSize} L ${cx} ${y2} L ${cx + arrowHeadSize} ${y2 - arrowHeadSize}`
				} else {
					// Apunta ARRIBA
					arrowHeadPath = `M ${cx - arrowHeadSize} ${y2 + arrowHeadSize} L ${cx} ${y2} L ${cx + arrowHeadSize} ${y2 + arrowHeadSize}`
				}

				return (
					<g key={item.id}>
						<path d={linePath} stroke={color} strokeWidth='3' fill='none' />
						<path d={arrowHeadPath} stroke={color} strokeWidth='3' fill='none' />
					</g>
				)
			})}
		</>
	)
}
