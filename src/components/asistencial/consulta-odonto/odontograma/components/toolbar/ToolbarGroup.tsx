import React from 'react'

interface ToolbarGroupProps {
	/** Título de la sección/grupo */
	label: string
	/** Contenido del grupo (botones) */
	children: React.ReactNode
	/** Si debe mostrar borde derecho separador */
	separator?: boolean
	/** Clase adicional */
	className?: string
}

/**
 * Agrupador visual para botones en la barra de herramientas.
 */
export const ToolbarGroup: React.FC<ToolbarGroupProps> = ({ label, children, separator = true, className = '' }) => {
	return (
		<div className={`flex flex-col gap-1.5 ${separator ? 'pr-6 border-r border-gray-200' : ''} ${className}`}>
			<span className='text-[10px] uppercase font-extrabold text-gray-500 tracking-wider select-none'>
				{label}
			</span>
			<div className='flex gap-1 flex-wrap items-center'>{children}</div>
		</div>
	)
}
