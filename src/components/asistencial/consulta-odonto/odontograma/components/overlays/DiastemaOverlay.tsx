/**
 * DiastemaOverlay - Renderiza diastemas (espacios entre dientes).
 */

import React from 'react'
import type { Diastema } from '../../types'
import type { OverlayBaseProps } from './types'
import { isUpperTooth, OVERLAY_COLORS } from './types'
import { getCoordinates, isToothInCurrentView } from '../../utils'

interface DiastemaOverlayProps extends OverlayBaseProps {
	diastemas: Diastema[]
}

/**
 * Componente que renderiza diastemas.
 * Se muestra como paréntesis invertidos entre dos dientes adyacentes.
 */
export const DiastemaOverlay: React.FC<DiastemaOverlayProps> = ({
	diastemas,
	toothRefs,
	containerRef,
	refsReady,
	upperTeeth,
	lowerTeeth
}) => {
	if (!refsReady) return null

	return (
		<>
			{diastemas.map((dias) => {
				if (
					!isToothInCurrentView(dias.startId, upperTeeth, lowerTeeth) ||
					!isToothInCurrentView(dias.endId, upperTeeth, lowerTeeth)
				) {
					return null
				}

				const start = getCoordinates(dias.startId, toothRefs.current, containerRef.current)
				const end = getCoordinates(dias.endId, toothRefs.current, containerRef.current)
				if (!start || !end) return null

				const mx = (start.x + end.x) / 2
				const isUpper = isUpperTooth(dias.startId)
				const my = isUpper ? start.y + 100 : start.y - 100
				const color = dias.status === 'bueno' ? OVERLAY_COLORS.bueno : OVERLAY_COLORS.malo

				return (
					<g key={dias.id}>
						<path
							d={`M ${mx - 8} ${my - 16} Q ${mx + 8} ${my} ${mx - 8} ${my + 16}`}
							stroke={color}
							strokeWidth='2.5'
							fill='none'
						/>
						<path
							d={`M ${mx + 8} ${my - 16} Q ${mx - 8} ${my} ${mx + 8} ${my + 16}`}
							stroke={color}
							strokeWidth='2.5'
							fill='none'
						/>
					</g>
				)
			})}
		</>
	)
}
