import type { Crown, Pulpotomia, Sellante, SuperficieDesgastada, TratamientoConducto } from '../types'
import { ToothZone } from './ToothZone'
import type { FC } from 'react'

/**

/**
 * @interface ToothInteractionProps
 * @description Propiedades del componente ToothInteraction.
 */
interface ToothInteractionProps {
	isAnterior: boolean
	crown?: Crown
	pulpotomia?: Pulpotomia
	surfaces?: Record<string, boolean>
	restauracion?: { surfaces: string[]; sigla: string; status: 'bueno' | 'malo' }

	restauracionTemporal?: { surfaces: string[] }
	superficieDesgastada?: SuperficieDesgastada
	tratamientoConducto?: TratamientoConducto
	sellante?: Sellante
	onZoneClick?: (zone: string) => void
}

/**
 * Componente que gestiona la interacción visual con las caras del diente y el renderizado de coronas.
 */
export const ToothInteraction: FC<ToothInteractionProps> = ({
	isAnterior,
	crown,
	pulpotomia,
	surfaces = {},
	restauracion,

	restauracionTemporal,
	superficieDesgastada,
	tratamientoConducto,
	sellante,
	onZoneClick
}) => {
	const handleZoneClick = (zone: string) => {
		if (onZoneClick) onZoneClick(zone)
	}

	// Helper para determinar color y estado activo de una zona
	const getZoneProps = (zone: string) => {
		const isCaries = surfaces[zone]
		const isRestauracion = restauracion?.surfaces.includes(zone)
		const isRestauracionTemporal = restauracionTemporal?.surfaces.includes(zone)

		// Superficie desgastada ahora se dibuja como línea, no rellena el fondo
		let active = !!isCaries || !!isRestauracion || !!isRestauracionTemporal
		let color = 'bg-red-500' // Default (Caries)

		if (isRestauracion) {
			if (restauracion?.status === 'bueno') {
				color = 'bg-blue-600'
			} else {
				color = 'bg-blue-600 border-2 border-red-600'
			}
			if (isCaries) color = 'bg-red-600'
		}

		if (isRestauracionTemporal) {
			active = true
			color = 'bg-white border-2 border-red-600'
		}

		return { active, color }
	}

	return (
		<div className='flex flex-col items-center justify-center relative w-14 h-14 border border-transparent'>
			{crown && (
				<div
					className={`absolute inset-0 rounded-full border-2 w-full h-full pointer-events-none z-10 ${
						crown.status === 'bueno' ? 'border-blue-600' : 'border-red-600'
					}`}
				></div>
			)}
			{pulpotomia && (
				<div className={`absolute inset-0 flex items-center justify-center pointer-events-none z-10`}>
					<div
						className={'w-5 h-5 rounded border border-transparent'}
						style={{
							backgroundColor: pulpotomia.status === 'bueno' ? '#2563eb' : '#dc2626'
						}}
					></div>
				</div>
			)}
			{tratamientoConducto && (
				<div className={`absolute inset-0 flex items-center justify-center pointer-events-none z-15`}>
					<div
						className={'w-1 h-full rounded border border-transparent'}
						style={{
							backgroundColor: tratamientoConducto.status === 'bueno' ? '#2563eb' : '#dc2626'
						}}
					></div>
				</div>
			)}
			{sellante && (
				<div className='absolute inset-0 flex items-center justify-center pointer-events-none z-20 border border-transparent'>
					<div className={`relative w-8 h-8 flex items-center justify-center`}>
						<div
							className={`absolute w-full h-1 border-transparent`}
							style={{ backgroundColor: sellante.status === 'bueno' ? '#2563eb' : '#dc2626' }}
						></div>
						<div
							className={`absolute h-full w-1 border-transparent`}
							style={{ backgroundColor: sellante.status === 'bueno' ? '#2563eb' : '#dc2626' }}
						></div>
					</div>
				</div>
			)}

			<div className='flex flex-col items-center relative z-0 h-12 justify-center border border-transparent'>
				<ToothZone
					position='superior'
					onClick={() => handleZoneClick('superior')}
					{...getZoneProps('superior')}
				/>
				<div className='flex items-center'>
					<ToothZone
						position='derecha'
						onClick={() => handleZoneClick('derecha')}
						{...getZoneProps('derecha')}
					/>
					{!isAnterior && (
						<ToothZone
							position='centro'
							onClick={() => handleZoneClick('centro')}
							{...getZoneProps('centro')}
						/>
					)}
					<ToothZone
						position='izquierda'
						onClick={() => handleZoneClick('izquierda')}
						{...getZoneProps('izquierda')}
					/>
				</div>
				<ToothZone
					position='inferior'
					onClick={() => handleZoneClick('inferior')}
					{...getZoneProps('inferior')}
				/>

				{/* Líneas horizontales para Superficie Desgastada */}
				{superficieDesgastada?.surfaces.map((zone) => {
					let top = '50%'
					let left = '50%'
					let width = '0.8rem' // Ligeramente menor que la zona para que no choque

					const verticalOffset = '1rem'
					const horizontalOffset = isAnterior ? '0.5rem' : '1rem'

					switch (zone) {
						case 'superior':
							top = `calc(50% - ${verticalOffset})`
							break
						case 'inferior':
							top = `calc(50% + ${verticalOffset})`
							break
						case 'centro':
							// top 50%, left 50%
							break
						case 'izquierda':
							left = `calc(50% + ${horizontalOffset})`
							break
						case 'derecha':
							left = `calc(50% - ${horizontalOffset})`
							break
					}

					return (
						<div
							key={zone}
							className='absolute h-0.5 bg-red-600 pointer-events-none z-30'
							style={{
								top,
								left,
								width,
								transform: 'translate(-50%, -50%)'
							}}
						/>
					)
				})}
			</div>
		</div>
	)
}
