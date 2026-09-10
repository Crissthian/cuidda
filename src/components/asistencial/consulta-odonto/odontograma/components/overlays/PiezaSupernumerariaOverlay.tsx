/**
 * PiezaSupernumerariaOverlay - Renderiza piezas supernumerarias.
 */

import React from 'react'
import type { PiezaSupernumeraria } from '../../types'
import type { OverlayBaseProps } from './types'
import { isUpperTooth, OVERLAY_COLORS } from './types'
import { getCoordinates, isToothInCurrentView } from '../../utils'

interface PiezaSupernumerariaOverlayProps extends OverlayBaseProps {
	piezasSupernumerarias: PiezaSupernumeraria[]
}

/**
 * Componente que renderiza piezas supernumerarias.
 * Se muestra como una circunferencia azul con la letra "S" encerrada,
 * localizada entre los ápices de las piezas dentarias adyacentes.
 */
export const PiezaSupernumerariaOverlay: React.FC<PiezaSupernumerariaOverlayProps> = ({
	piezasSupernumerarias,
	toothRefs,
	containerRef,
	refsReady,
	upperTeeth,
	lowerTeeth
}) => {
	if (!refsReady) return null

	return (
		<>
			{piezasSupernumerarias?.map((item) => {
				if (
					!isToothInCurrentView(item.startId, upperTeeth, lowerTeeth) ||
					!isToothInCurrentView(item.endId, upperTeeth, lowerTeeth)
				) {
					return null
				}

				const start = getCoordinates(item.startId, toothRefs.current, containerRef.current)
				const end = getCoordinates(item.endId, toothRefs.current, containerRef.current)
				if (!start || !end) return null

				const mx = (start.x + end.x) / 2
				const isUpper = isUpperTooth(item.startId)

				// Posicionamiento cerca de ápices
				const my = isUpper ? start.y + 30 : start.y + 240

				const color = OVERLAY_COLORS.bueno // Azul
				const radius = 12

				return (
					<g key={item.id}>
						{/* Círculo */}
						<circle cx={mx} cy={my} r={radius} stroke={color} strokeWidth='2' fill='white' />
						{/* Letra S */}
						<text
							x={mx}
							y={my}
							textAnchor='middle'
							dominantBaseline='central'
							fill={color}
							fontSize='14'
							fontWeight='bold'
							fontFamily='Arial'
						>
							S
						</text>
					</g>
				)
			})}
		</>
	)
}
