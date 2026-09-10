import React from 'react'
import type { HallazgoClinico } from '../../types'
import type { OverlayBaseProps } from './types'
import { getCoordinates } from '../../utils'

interface ProtesisTotalOverlayProps extends OverlayBaseProps {
	hallazgos: HallazgoClinico[]
	viewMode: 'adult' | 'child'
}

// Renderiza dos lineas paralelas para la protesis total.
export const ProtesisTotalOverlay: React.FC<ProtesisTotalOverlayProps> = ({
	hallazgos,
	toothRefs,
	containerRef,
	refsReady,
	upperTeeth,
	lowerTeeth,
	viewMode
}) => {
	// Hallazgos de protesis total.
	const protesisSuperior = hallazgos.find(
		(h) =>
			h.hallazgo === 'PROTESIS_TOTAL' &&
			h.especificacion === 'Superior' &&
			(!h.viewMode || h.viewMode === viewMode)
	)
	const protesisInferior = hallazgos.find(
		(h) =>
			h.hallazgo === 'PROTESIS_TOTAL' &&
			h.especificacion === 'Inferior' &&
			(!h.viewMode || h.viewMode === viewMode)
	)

	if (!refsReady) return null

	// Dibuja las dos lineas.
	const renderLines = (maxilar: 'Superior' | 'Inferior', status: 'bueno' | 'malo') => {
		const color = status === 'bueno' ? '#2563EB' : '#EF4444'

		let startToothId, endToothId

		if (maxilar === 'Superior') {
			startToothId = upperTeeth[0]?.id
			endToothId = upperTeeth[upperTeeth.length - 1]?.id
		} else {
			startToothId = lowerTeeth[0]?.id
			endToothId = lowerTeeth[lowerTeeth.length - 1]?.id
		}

		const currentToothRefs = toothRefs.current
		const currentContainerRef = containerRef.current

		const start = getCoordinates(startToothId, currentToothRefs, currentContainerRef)
		const end = getCoordinates(endToothId, currentToothRefs, currentContainerRef)

		if (start && end) {
			const y = start.y

			return (
				<g>
					{/* Linea 1 */}
					<line x1={start.x - 20} y1={y} x2={end.x + 20} y2={y} stroke={color} strokeWidth='3' />
					{/* Linea 2 (paralela) */}
					<line
						x1={start.x - 20}
						y1={maxilar === 'Superior' ? y - 10 : y + 10} // Separacion hacia afuera.
						x2={end.x + 20}
						y2={maxilar === 'Superior' ? y - 10 : y + 10}
						stroke={color}
						strokeWidth='3'
					/>
				</g>
			)
		}
		return null
	}

	return (
		<>
			{protesisSuperior && renderLines('Superior', protesisSuperior.estado || 'bueno')}
			{protesisInferior && renderLines('Inferior', protesisInferior.estado || 'bueno')}
		</>
	)
}
