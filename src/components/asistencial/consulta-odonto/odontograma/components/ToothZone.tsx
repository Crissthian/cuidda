import React from 'react'

/**
 * @interface ToothZoneProps
 * @description Propiedades del componente ToothZone.
 */
interface ToothZoneProps {
	position: string
	onClick?: () => void
	active?: boolean
	color?: string
}

/**
 * Representa una zona individual de un diente para registrar hallazgos específicos (caries, etc).
 */
export const ToothZone: React.FC<ToothZoneProps> = ({ position, onClick, active, color = '#f1f5f8' }) => {
	const isClassColor = color.includes('bg-') || color.includes('border-') || color.includes('text-')
	const activeClassName = active ? (isClassColor ? color : '') : 'bg-muted-20 hover:bg-muted-20/90'
	const style = active
		? isClassColor
			? undefined
			: { backgroundColor: color, borderColor: color }
		: { borderColor: '#8993af33 ' }

	return (
		<div
			onClick={onClick}
			className={`cursor-pointer border border-gray-400 w-4 h-4 transition-colors ${activeClassName}`}
			style={style}
			title={position}
		/>
	)
}
