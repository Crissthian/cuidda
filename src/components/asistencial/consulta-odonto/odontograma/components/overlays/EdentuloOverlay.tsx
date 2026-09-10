/**
 * EdentulousOverlay - Renderiza líneas de Edéntulo Total.
 */

import React from 'react'
import type { HallazgoClinico } from '../../types'
import type { OverlayBaseProps } from './types'
import { getCoordinates } from '../../utils'

interface EdentuloOverlayProps extends OverlayBaseProps {
	hallazgos: HallazgoClinico[]
	viewMode: 'adult' | 'child'
}

/**
 * Componente que renderiza las líneas horizontales para Edéntulo Total.
 * Una línea azul horizontal atraviesa toda la arcada cuando hay edentulismo total.
 */
export const EdentulousOverlay: React.FC<EdentuloOverlayProps> = ({
	hallazgos,
	toothRefs,
	containerRef,
	refsReady,
	upperTeeth,
	lowerTeeth,
	viewMode
}) => {
	const edentuloSuperior = hallazgos.find(
		(h) =>
			h.hallazgo === 'EDENTULO_TOTAL' &&
			h.especificacion === 'Superior' &&
			(!h.viewMode || h.viewMode === viewMode)
	)
	const edentuloInferior = hallazgos.find(
		(h) =>
			h.hallazgo === 'EDENTULO_TOTAL' &&
			h.especificacion === 'Inferior' &&
			(!h.viewMode || h.viewMode === viewMode)
	)

	if (!refsReady) return null

	return (
		<>
			{/* Edéntulo Total Superior */}
			{edentuloSuperior &&
				(() => {
					// Obtener primer y último diente de la arcada superior actual (Adulto o Niño)
					const firstToothId = upperTeeth[0]?.id
					const lastToothId = upperTeeth[upperTeeth.length - 1]?.id

					const start = getCoordinates(firstToothId, toothRefs.current, containerRef.current)
					const end = getCoordinates(lastToothId, toothRefs.current, containerRef.current)
					const firstToothEl = toothRefs.current.get(firstToothId)
					const container = containerRef.current

					if (start && end && firstToothEl && container) {
						const rect = firstToothEl.getBoundingClientRect()
						const containerRect = container.getBoundingClientRect()
						const topY = rect.top - containerRect.top
						const y = topY + 144 // Upper Interaction Center

						return <line x1={start.x - 20} y1={y} x2={end.x + 20} y2={y} stroke='#2563EB' strokeWidth='4' />
					}
					return null
				})()}

			{/* Edéntulo Total Inferior */}
			{edentuloInferior &&
				(() => {
					// Obtener primer y último diente de la arcada inferior actual
					const firstToothId = lowerTeeth[0]?.id
					const lastToothId = lowerTeeth[lowerTeeth.length - 1]?.id

					const start = getCoordinates(firstToothId, toothRefs.current, containerRef.current)
					const end = getCoordinates(lastToothId, toothRefs.current, containerRef.current)
					const firstToothEl = toothRefs.current.get(firstToothId)
					const container = containerRef.current

					if (start && end && firstToothEl && container) {
						const rect = firstToothEl.getBoundingClientRect()
						const containerRect = container.getBoundingClientRect()
						const topY = rect.top - containerRect.top
						const y = topY + 130 // Lower Interaction Center

						return <line x1={start.x - 20} y1={y} x2={end.x + 20} y2={y} stroke='#2563EB' strokeWidth='4' />
					}
					return null
				})()}
		</>
	)
}
