import React from 'react'
import type { LucideIcon } from 'lucide-react'

export interface ToolbarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	/** Estilo visual del botón */
	variant?: 'bueno' | 'malo' | 'neutral' | 'active'
	/** Icono opcional a mostrar (Componente Lucide) */
	icon?: LucideIcon
	/** Texto del botón */
	label?: string
	/** Si es true, muestra solo el icono o texto compacto */
	compact?: boolean
}

/**
 * Botón estandarizado para la barra de herramientas del odontograma.
 */
export const ToolbarButton: React.FC<ToolbarButtonProps> = ({
	variant = 'neutral',
	icon: Icon,
	label,
	compact = false,
	className = '',
	children,
	...props
}) => {
	const baseStyles =
		'flex items-center justify-center gap-1 rounded shadow-sm transition-colors text-xs font-semibold border outline-none focus:ring-2 focus:ring-offset-1'

	const variants = {
		bueno: 'bg-white border-blue-200 text-blue-700 hover:bg-blue-50 focus:ring-blue-500',
		malo: 'bg-white border-red-200 text-red-700 hover:bg-red-50 focus:ring-red-500',
		neutral: 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 focus:ring-gray-400',
		active: 'bg-blue-50 border-brand text-blue-700 ring-1 ring-blue-500'
	}

	const padding = compact ? 'px-2 py-1' : 'px-2.5 py-1.5'

	return (
		<button type='button' className={`${baseStyles} ${variants[variant]} ${padding} ${className}`} {...props}>
			{Icon && (
				<span className={compact ? '' : 'mr-0.5'}>
					<Icon size={14} />
				</span>
			)}
			{label}
			{children}
		</button>
	)
}
