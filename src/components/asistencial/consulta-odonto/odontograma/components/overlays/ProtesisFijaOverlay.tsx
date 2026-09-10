/**
 * ProtesisFijaOverlay.tsx
 * Renderiza la Prótesis Dental Parcial Fija.
 * Se dibuja una línea recta horizontal de color azul/rojo que indica la extensión del puente.
 * Líneas verticales sobre los pilares.
 * Es graficado a nivel de los ápices.
 */

import React from 'react'
import type { ProtesisFija } from '../../types'
import type { OverlayBaseProps } from './types'
import { OVERLAY_COLORS } from './types'
import { getCoordinates, isUpperArch, isToothInCurrentView } from '../../utils'

interface ProtesisFijaOverlayProps extends OverlayBaseProps {
	protesisFija: ProtesisFija[]
}

export const ProtesisFijaOverlay: React.FC<ProtesisFijaOverlayProps> = ({
	protesisFija,
	toothRefs,
	containerRef,
	refsReady,
	upperTeeth,
	lowerTeeth
}) => {
	if (!refsReady) return null

	// Ajuste vertical para llegar a nivel "ápices" (raíces)
	// Asumiendo que getCoordinates devuelve el centro/top de la corona
	// Upper: Hacia arriba (Y menor)
	// Lower: Hacia abajo (Y mayor)
	const APEX_OFFSET = 0

	return (
		<>
			{protesisFija.map((item) => {
				if (
					!isToothInCurrentView(item.startId, upperTeeth, lowerTeeth) ||
					!isToothInCurrentView(item.endId, upperTeeth, lowerTeeth)
				) {
					return null
				}

				const start = getCoordinates(item.startId, toothRefs.current, containerRef.current)
				const end = getCoordinates(item.endId, toothRefs.current, containerRef.current)

				if (!start || !end) return null

				const color = item.status === 'bueno' ? OVERLAY_COLORS.bueno : OVERLAY_COLORS.malo
				const isUpper = isUpperArch(item.startId)
				const yOffset = isUpper ? -APEX_OFFSET : APEX_OFFSET

				const yPos = start.y + yOffset

				// Puntos de la línea horizontal
				const x1 = start.x
				const x2 = end.x
				const lineY = yPos

				// Longitud de las patas (líneas verticales)
				const legLength = 10
				const legY2 = lineY + (isUpper ? legLength : -legLength)

				return (
					<g key={item.id}>
						{/* Línea horizontal (Puente) */}
						<line x1={x1} y1={lineY} x2={x2} y2={lineY} stroke={color} strokeWidth='3' />

						{/* Línea vertical pilar Inicio */}
						<line x1={x1} y1={lineY} x2={x1} y2={legY2} stroke={color} strokeWidth='2' />

						{/* Línea vertical pilar Fin */}
						<line x1={x2} y1={lineY} x2={x2} y2={legY2} stroke={color} strokeWidth='2' />
					</g>
				)
			})}
		</>
	)
}
