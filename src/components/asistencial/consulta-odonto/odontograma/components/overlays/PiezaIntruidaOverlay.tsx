/**
 * PiezaIntruidaOverlay - Renderiza piezas intruidas.
 */

import React from 'react'
import type { PiezaIntruida } from '../../types'
import type { OverlayBaseProps } from './types'
import { getToothRect, isUpperTooth, OVERLAY_COLORS } from './types'
import { isToothInCurrentView } from '../../utils'

interface PiezaIntruidaOverlayProps extends OverlayBaseProps {
	piezasIntruidas: PiezaIntruida[]
}

/**
 * Componente que renderiza piezas intruidas.
 * Se muestra como una flecha recta vertical azul apuntando hacia la encía (adentro).
 */
export const PiezaIntruidaOverlay: React.FC<PiezaIntruidaOverlayProps> = ({
	piezasIntruidas,
	toothRefs,
	containerRef,
	refsReady,
	upperTeeth,
	lowerTeeth
}) => {
	if (!refsReady) return null

	return (
		<>
			{piezasIntruidas?.map((item) => {
				if (!isToothInCurrentView(item.toothId, upperTeeth, lowerTeeth)) return null

				const data = getToothRect(item.toothId, toothRefs.current, containerRef.current)
				if (!data) return null

				const { cx, topY } = data
				const isUpper = isUpperTooth(item.toothId)

				let y1: number, y2: number
				const length = 24

				if (isUpper) {
					// Upper: Apunta hacia ARRIBA (hacia encía)
					y1 = topY + 158
					y2 = y1 - length
				} else {
					// Lower: Apunta hacia ABAJO (hacia encía)
					y1 = topY + 114
					y2 = y1 + length
				}

				const color = OVERLAY_COLORS.bueno
				const arrowHeadSize = 5

				const linePath = `M ${cx} ${y1} L ${cx} ${y2}`

				let arrowHeadPath = ''
				if (isUpper) {
					// Apunta ARRIBA (y2 < y1)
					arrowHeadPath = `M ${cx - arrowHeadSize} ${y2 + arrowHeadSize} L ${cx} ${y2} L ${cx + arrowHeadSize} ${y2 + arrowHeadSize}`
				} else {
					// Apunta ABAJO (y2 > y1)
					arrowHeadPath = `M ${cx - arrowHeadSize} ${y2 - arrowHeadSize} L ${cx} ${y2} L ${cx + arrowHeadSize} ${y2 - arrowHeadSize}`
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
