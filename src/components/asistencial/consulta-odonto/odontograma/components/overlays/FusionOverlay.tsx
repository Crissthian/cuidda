/**
 * FusionOverlay - Renderiza fusiones dentales.
 */

import React from 'react'
import type { Fusion } from '../../types'
import type { OverlayBaseProps } from './types'
import { isUpperTooth, VERTICAL_OFFSETS, OVERLAY_COLORS } from './types'
import { isToothInCurrentView } from '../../utils'

interface FusionOverlayProps extends OverlayBaseProps {
	fusions: Fusion[]
}

/**
 * Componente que renderiza fusiones dentales.
 * Se muestra como dos círculos que rodean los números de los dientes fusionados.
 */
export const FusionOverlay: React.FC<FusionOverlayProps> = ({
	fusions,
	toothRefs,
	containerRef,
	refsReady,
	upperTeeth,
	lowerTeeth
}) => {
	if (!refsReady) return null

	return (
		<>
			{fusions.map((fus) => {
				if (!isToothInCurrentView(fus.startId, upperTeeth, lowerTeeth)) return null

				const toothStart = toothRefs.current.get(fus.startId)
				const toothEnd = toothRefs.current.get(fus.endId)
				const container = containerRef.current
				if (!toothStart || !toothEnd || !container) return null

				const rectStart = toothStart.getBoundingClientRect()
				const rectEnd = toothEnd.getBoundingClientRect()
				const containerRect = container.getBoundingClientRect()

				const isUpper = isUpperTooth(fus.startId)
				const offset = isUpper ? VERTICAL_OFFSETS.upper.numberCenter : VERTICAL_OFFSETS.lower.numberCenter
				const upperAdjust = isUpper ? 5 : 0
				const cxStart = rectStart.left - containerRect.left + rectStart.width / 2
				const cyStart = rectStart.top - containerRect.top + offset + upperAdjust

				const cxEnd = rectEnd.left - containerRect.left + rectEnd.width / 2
				const cyEnd = rectEnd.top - containerRect.top + offset + upperAdjust

				const radius = 18
				const color = OVERLAY_COLORS.bueno

				return (
					<g key={fus.id}>
						<circle cx={cxStart} cy={cyStart} r={radius} stroke={color} strokeWidth='2' fill='none' />
						<circle cx={cxEnd} cy={cyEnd} r={radius} stroke={color} strokeWidth='2' fill='none' />
						<line
							x1={cxStart < cxEnd ? cxStart + radius : cxStart - radius}
							y1={cyStart}
							x2={cxStart < cxEnd ? cxEnd - radius : cxEnd + radius}
							y2={cyEnd}
							stroke={color}
							strokeWidth='2'
						/>
					</g>
				)
			})}
		</>
	)
}
