import React from 'react'

/**
 * Identificadores de las caras/divisiones clickeables del diente.
 * - top, right, bottom, left: Caras externas de la corona
 * - center: Centro del diente (solo para premolar 1)
 * - grid-0 a grid-5: Celdas de la cuadrícula interna (premolar 2 y molares)
 */
// traductir al español las zonas del diente
export type ToothFace =
	| 'superior'
	| 'derecha'
	| 'inferior'
	| 'izquierda'
	| 'centro'
	| 'grid-0'
	| 'grid-1'
	| 'grid-2'
	| 'grid-3'
	| 'grid-4'
	| 'grid-5'

/**
 * Props del componente Diente.
 */
interface DienteProps {
	/** Número del diente según nomenclatura FDI (11-48) */
	numero: number
	/** Posición X del diente en el SVG */
	x: number
	/** Posición Y del diente en el SVG */
	y: number
	/** Tipo de dentición */
	tipo: 'adulto' | 'nino'
	/** Mapa de cara -> color para las caras pintadas */
	filledFaces?: Record<string, string>
	/** Handler para clic en una cara específica */
	onFaceClick?: (face: ToothFace, e: React.MouseEvent) => void
}

/**
 * Componente Diente - Representa un diente individual en el odontograma.
 *
 * Renderiza la corona con sus divisiones según el tipo de diente:
 * - Anteriores (1-3): 4 caras (trapecios + triángulos)
 * - Premolar 1 (4): 4 caras + centro sin división
 * - Premolar 2 (5): 4 caras + centro dividido en 2 (arriba/abajo)
 * - Molares (6-8): 4 caras + centro dividido en 6 (cuadrícula 3×2)
 *
 * También renderiza las raíces y el número del diente con un rectángulo indicador.
 */
export const Diente: React.FC<DienteProps> = ({ numero, x, y, filledFaces = {}, onFaceClick }) => {
	// Determinar si es diente superior o inferior
	const isUpper = (numero >= 11 && numero <= 28) || (numero >= 51 && numero <= 65)

	// Identificar tipo de diente basado en el último dígito FDI
	const n = numero % 10

	// Categorizar el diente
	// 1-3: Anterior (Incisivo/Canino)
	// 4: Primer Premolar
	// 5: Segundo Premolar
	// 6-8: Molar
	let toothType: 'anterior' | 'pre1' | 'pre2' | 'molar' = 'anterior'
	if (n >= 6) toothType = 'molar'
	else if (n === 5) toothType = 'pre2'
	else if (n === 4) toothType = 'pre1'
	else toothType = 'anterior'

	// Cantidad de raíces para visualización
	let rootCount = 1
	if (toothType === 'molar') rootCount = 3
	else if (toothType === 'pre1' || toothType === 'pre2') rootCount = 2
	else rootCount = 1

	// Dimensiones del diente
	const WIDTH = 130 // Ancho de la corona
	const HEIGHT = 90 // Alto de la corona
	const ROOT_H = 90 // Alto de las raíces
	const RECT_H = 60 // Alto del rectángulo indicador
	const RECT_GAP = 10 // Espacio entre rectángulo y número

	// Constantes de geometría para el centro
	const OFFSET_X = 30 // Margen horizontal del centro
	const OFFSET_Y = 20 // Margen vertical del centro

	// Coordenadas de la corona (caja exterior)
	const pTL = { x: 0, y: 0 }
	const pTR = { x: WIDTH, y: 0 }
	const pBR = { x: WIDTH, y: HEIGHT }
	const pBL = { x: 0, y: HEIGHT }

	// Cálculo de coordenadas internas
	let pITL, pITR, pIBR, pIBL

	if (toothType === 'anterior') {
		// Anterior: El centro colapsa a una línea horizontal (borde incisal)
		const centerY = HEIGHT / 2
		pITL = { x: OFFSET_X, y: centerY }
		pIBL = { x: OFFSET_X, y: centerY }
		pITR = { x: WIDTH - OFFSET_X, y: centerY }
		pIBR = { x: WIDTH - OFFSET_X, y: centerY }
	} else {
		// Posteriores: Caja central estándar
		pITL = { x: OFFSET_X, y: OFFSET_Y }
		pITR = { x: WIDTH - OFFSET_X, y: OFFSET_Y }
		pIBR = { x: WIDTH - OFFSET_X, y: HEIGHT - OFFSET_Y }
		pIBL = { x: OFFSET_X, y: HEIGHT - OFFSET_Y }
	}

	// Paths de las caras externas
	const pathTop = `M${pTL.x},${pTL.y} L${pTR.x},${pTR.y} L${pITR.x},${pITR.y} L${pITL.x},${pITL.y} Z`
	const pathRight = `M${pTR.x},${pTR.y} L${pBR.x},${pBR.y} L${pIBR.x},${pIBR.y} L${pITR.x},${pITR.y} Z`
	const pathBottom = `M${pBR.x},${pBR.y} L${pBL.x},${pBL.y} L${pIBL.x},${pIBL.y} L${pIBR.x},${pIBR.y} Z`
	const pathLeft = `M${pBL.x},${pBL.y} L${pTL.x},${pTL.y} L${pITL.x},${pITL.y} L${pIBL.x},${pIBL.y} Z`

	// Estilos
	const strokeColor = 'var(--color-text-primary)' // Color del borde
	const strokeWidth = 1.5 // Grosor del borde
	const defaultFill = 'var(--color-surface-light)' // Relleno por defecto
	const rectFill = 'var(--color-surface-light)' // Color del rectángulo indicador (gris)

	// Obtener color de relleno para una cara
	const getFill = (face: ToothFace) => filledFaces[face] || defaultFill

	// Helper para click
	const handleClick = (face: ToothFace) => (e: React.MouseEvent) => {
		e.stopPropagation() // Evitar burbujeo si el diente tiene onClick
		onFaceClick?.(face, e)
	}

	/**
	 * Renderiza la cara central con sus divisiones internas.
	 * Varía según el tipo de diente.
	 */
	const renderCenterFace = () => {
		if (toothType === 'anterior') {
			// Los anteriores no tienen cara central visible (solo línea)
			return null
		}

		const cx = OFFSET_X
		const cy = OFFSET_Y
		const cw = WIDTH - OFFSET_X * 2
		const ch = HEIGHT - OFFSET_Y * 2

		if (toothType === 'pre1') {
			// Premolar 1: Centro sin divisiones
			const pathCenter = `M${pITL.x},${pITL.y} L${pITR.x},${pITR.y} L${pIBR.x},${pIBR.y} L${pIBL.x},${pIBL.y} Z`
			return (
				<path
					d={pathCenter}
					fill={getFill('centro')}
					stroke={strokeColor}
					strokeWidth={strokeWidth}
					onClick={handleClick('centro')}
					style={{ cursor: onFaceClick ? 'pointer' : 'default' }}
				/>
			)
		}

		if (toothType === 'pre2') {
			// Premolar 2: Dividido en 2 partes (arriba/abajo)
			const halfH = ch / 2
			const topPath = `M${cx},${cy} L${cx + cw},${cy} L${cx + cw},${cy + halfH} L${cx},${cy + halfH} Z`
			const bottomPath = `M${cx},${cy + halfH} L${cx + cw},${cy + halfH} L${cx + cw},${cy + ch} L${cx},${cy + ch} Z`

			return (
				<g>
					<path
						d={topPath}
						fill={getFill('grid-0')}
						stroke={strokeColor}
						strokeWidth={strokeWidth}
						onClick={handleClick('grid-0')}
						style={{ cursor: onFaceClick ? 'pointer' : 'default' }}
					/>
					<path
						d={bottomPath}
						fill={getFill('grid-1')}
						stroke={strokeColor}
						strokeWidth={strokeWidth}
						onClick={handleClick('grid-1')}
						style={{ cursor: onFaceClick ? 'pointer' : 'default' }}
					/>
				</g>
			)
		}

		if (toothType === 'molar') {
			// Molar: Cuadrícula 3×2 (6 celdas)
			const colW = cw / 3
			const rowH = ch / 2
			const cells: React.ReactElement[] = []

			for (let row = 0; row < 2; row++) {
				for (let col = 0; col < 3; col++) {
					const cellX = cx + col * colW
					const cellY = cy + row * rowH
					const cellPath = `M${cellX},${cellY} L${cellX + colW},${cellY} L${cellX + colW},${cellY + rowH} L${cellX},${cellY + rowH} Z`
					const cellId = `grid-${row * 3 + col}` as ToothFace

					cells.push(
						<path
							key={cellId}
							d={cellPath}
							fill={getFill(cellId)}
							stroke={strokeColor}
							strokeWidth={strokeWidth}
							onClick={handleClick(cellId)}
							style={{ cursor: onFaceClick ? 'pointer' : 'default' }}
						/>
					)
				}
			}

			return <g>{cells}</g>
		}

		return null
	}

	/**
	 * Renderiza las raíces del diente.
	 * La cantidad y dirección dependen del tipo de diente y arcada.
	 */
	const renderRoots = () => {
		const paths: React.ReactElement[] = []

		if (isUpper) {
			// Dientes superiores: Raíces hacia arriba
			if (rootCount === 1) {
				const path = `M${WIDTH * 0.25},0 L${WIDTH * 0.5},${-ROOT_H} L${WIDTH * 0.75},0`
				paths.push(<path key='r1' d={path} fill='none' stroke={strokeColor} strokeWidth={strokeWidth} />)
			} else if (rootCount === 2) {
				const path = `M0,0 L${WIDTH * 0.25},${-ROOT_H} L${WIDTH * 0.5},0 L${WIDTH * 0.75},${-ROOT_H} L${WIDTH},0`
				paths.push(<path key='r2' d={path} fill='none' stroke={strokeColor} strokeWidth={strokeWidth} />)
			} else {
				const third = WIDTH / 3
				const path = `M0,0 L${third * 0.5},${-ROOT_H} L${third},0 L${third * 1.5},${-ROOT_H} L${third * 2},0 L${third * 2.5},${-ROOT_H} L${WIDTH},0`
				paths.push(<path key='r3' d={path} fill='none' stroke={strokeColor} strokeWidth={strokeWidth} />)
			}
		} else {
			// Dientes inferiores: Raíces hacia abajo
			if (rootCount === 1) {
				const path = `M${WIDTH * 0.25},${HEIGHT} L${WIDTH * 0.5},${HEIGHT + ROOT_H} L${WIDTH * 0.75},${HEIGHT}`
				paths.push(<path key='r1' d={path} fill='none' stroke={strokeColor} strokeWidth={strokeWidth} />)
			} else if (rootCount === 2) {
				const path = `M0,${HEIGHT} L${WIDTH * 0.25},${HEIGHT + ROOT_H} L${WIDTH * 0.5},${HEIGHT} L${WIDTH * 0.75},${HEIGHT + ROOT_H} L${WIDTH},${HEIGHT}`
				paths.push(<path key='r2' d={path} fill='none' stroke={strokeColor} strokeWidth={strokeWidth} />)
			} else {
				const third = WIDTH / 3
				const path = `M0,${HEIGHT} L${third * 0.5},${HEIGHT + ROOT_H} L${third},${HEIGHT} L${third * 1.5},${HEIGHT + ROOT_H} L${third * 2},${HEIGHT} L${third * 2.5},${HEIGHT + ROOT_H} L${WIDTH},${HEIGHT}`
				paths.push(<path key='r3' d={path} fill='none' stroke={strokeColor} strokeWidth={strokeWidth} />)
			}
		}

		return <g className='roots'>{paths}</g>
	}

	// Posiciones del número y rectángulo
	// Superior: Rectángulo ARRIBA del número (más lejos de la raíz)
	// Inferior: Rectángulo ARRIBA del número (más cerca de la raíz) - Ya estaba así

	// Cálculo para Superior:
	// Raíces: 0 a -90
	// Texto: Baseline ~ -110 (ocupa -140 a -110)
	// Rectángulo: -190 a -150

	const MARGIN_VERTICAL = 15 // Margen adicional para separar de las raíces

	const rectY = isUpper ? -ROOT_H - 120 - RECT_H - MARGIN_VERTICAL : HEIGHT + ROOT_H + RECT_GAP + MARGIN_VERTICAL + 60

	const labelY = isUpper ? -ROOT_H - 80 - MARGIN_VERTICAL : rectY + RECT_H + 35

	return (
		<g transform={`translate(${x}, ${y})`}>
			{/* Raíces del diente */}
			{renderRoots()}

			{/* Corona del diente */}
			<g className='crown'>
				{/* Caras externas (siempre 4) */}
				<path
					d={pathTop}
					fill={getFill('superior')}
					stroke={strokeColor}
					strokeWidth={strokeWidth}
					onClick={handleClick('superior')}
					style={{ cursor: onFaceClick ? 'pointer' : 'default' }}
				/>
				<path
					d={pathRight}
					fill={getFill('derecha')}
					stroke={strokeColor}
					strokeWidth={strokeWidth}
					onClick={handleClick('derecha')}
					style={{ cursor: onFaceClick ? 'pointer' : 'default' }}
				/>
				<path
					d={pathBottom}
					fill={getFill('inferior')}
					stroke={strokeColor}
					strokeWidth={strokeWidth}
					onClick={handleClick('inferior')}
					style={{ cursor: onFaceClick ? 'pointer' : 'default' }}
				/>
				<path
					d={pathLeft}
					fill={getFill('izquierda')}
					stroke={strokeColor}
					strokeWidth={strokeWidth}
					onClick={handleClick('izquierda')}
					style={{ cursor: onFaceClick ? 'pointer' : 'default' }}
				/>

				{/* Cara central con divisiones */}
				{renderCenterFace()}
			</g>

			{/* Rectángulo indicador (gris) */}
			<rect x={0} y={rectY} width={WIDTH} height={RECT_H} fill={rectFill} rx={4} ry={4} />

			{/* Número del diente */}
			<text
				x={WIDTH / 2}
				y={labelY}
				textAnchor='middle'
				className='font-semibold'
				style={{ fontSize: '36px', fill: 'var(--color-text-primary)' }}
			>
				{numero}
			</text>
		</g>
	)
}
