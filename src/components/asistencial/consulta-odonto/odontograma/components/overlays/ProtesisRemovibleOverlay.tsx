import React from 'react'
import type { HallazgoClinico } from '../../types'
import type { OverlayBaseProps } from './types'
import { getCoordinates, isToothInCurrentView } from '../../utils'

interface ProtesisRemovibleOverlayProps extends OverlayBaseProps {
	hallazgos: HallazgoClinico[]
	viewMode: 'adult' | 'child'
}

/**
 * Renderiza 2 líneas horizontales paralelas a nivel de los ápices
 * de las piezas dentarias reemplazadas.
 */
export const ProtesisRemovibleOverlay: React.FC<ProtesisRemovibleOverlayProps> = ({
	hallazgos,
	toothRefs,
	containerRef,
	refsReady,
	upperTeeth,
	lowerTeeth,
	viewMode
}) => {
	// Filtrar hallazgos de prótesis removible
	// Asumimos que se guardan con 'PROTESIS_REMOVIBLE'
	const removibles = hallazgos.filter(
		(h) => h.hallazgo === 'PROTESIS_REMOVIBLE' && (!h.viewMode || h.viewMode === viewMode)
	)

	if (!refsReady) return null

	return (
		<>
			{removibles.map((item) => {
				const startId = item.diente
				const endId = item.dienteFinal

				if (!startId || !endId) return null

				if (
					!isToothInCurrentView(startId, upperTeeth, lowerTeeth) ||
					!isToothInCurrentView(endId, upperTeeth, lowerTeeth)
				) {
					return null
				}

				const currentToothRefs = toothRefs.current
				const currentContainerRef = containerRef.current

				const start = getCoordinates(startId, currentToothRefs, currentContainerRef)
				const end = getCoordinates(endId, currentToothRefs, currentContainerRef)

				if (!start || !end) return null

				const color = item.estado === 'bueno' ? '#2563EB' : '#EF4444'

				// Usamos start.y directamente para alinear con ápices
				// (Misma lógica que Protesis Fija y Total corregida)
				const y = start.y

				// Determinar si es superior para saber hacia donde separar la segunda línea
				// Aunque para prótesis removible, la descripción dice "a nivel de ápices".
				// Podemos usar la misma lógica de "hacia afuera" de la arcada.
				const isUpper = startId < 30 || (startId >= 50 && startId < 70)

				const y2 = isUpper ? y - 10 : y + 10

				return (
					<g key={item.id}>
						{/* Línea 1 (Nivel ápices) */}
						<line x1={start.x} y1={y} x2={end.x} y2={y} stroke={color} strokeWidth='3' />
						{/* Línea 2 (Paralela, hacia afuera) */}
						<line x1={start.x} y1={y2} x2={end.x} y2={y2} stroke={color} strokeWidth='3' />
					</g>
				)
			})}
		</>
	)
}
