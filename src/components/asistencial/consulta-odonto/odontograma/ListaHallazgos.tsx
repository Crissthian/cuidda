import React from 'react'
import type { HallazgoClinico } from './types'

interface ListaHallazgosProps {
	hallazgos: HallazgoClinico[]
	onDelete: (id: string) => void
	readOnly?: boolean
}

export const ListaHallazgos: React.FC<ListaHallazgosProps> = ({ hallazgos, onDelete, readOnly = false }) => {
	return (
		<div className='flex flex-col h-full rounded-xl border border-border-default bg-surface-light shadow-sm overflow-hidden'>
			{/* Header */}
			<div className='bg-muted-20 p-4 border-b border-border-default'>
				<h3 className='text-sm font-bold text-brand uppercase tracking-wider'>Hallazgos Clínicos</h3>
			</div>

			{/* List Content */}
			<div className='flex-1 overflow-y-auto p-0'>
				{hallazgos.length === 0 ? (
					<div className='flex flex-col items-center justify-center h-40 text-text-tertiary px-6 text-center'>
						<i className='fa-solid fa-clipboard-list text-3xl mb-3 opacity-20'></i>
						<span className='text-sm'>No hay hallazgos registrados</span>
					</div>
				) : (
					<table className='w-full text-sm text-left'>
						<thead className='bg-surface-hover text-xs font-semibold text-text-secondary uppercase sticky top-0'>
							<tr>
								<th className='px-4 py-3 w-16 text-center'>Diente</th>
								<th className='px-4 py-3'>Hallazgo</th>
								<th className='px-4 py-3'>Espec.</th>
								<th className='px-4 py-3 w-10 text-center'></th>
							</tr>
						</thead>
						<tbody className='divide-y divide-border-default'>
							{hallazgos.map((item) => (
								<tr key={item.id} className='hover:bg-muted-10 transition-colors'>
									<td className='px-4 py-3 font-semibold text-center'>
										{item.diente ? (
											<span className='bg-surface-default border border-border-default rounded px-1.5 py-0.5 text-xs inline-block min-w-6'>
												{item.diente}
												{item.dienteFinal && ` - ${item.dienteFinal}`}
											</span>
										) : (
											<span className='text-text-tertiary'>-</span>
										)}
									</td>
									<td className='px-4 py-3 text-text-primary'>{item.hallazgo}</td>
									<td className='px-4 py-3 text-text-secondary text-xs'>{item.especificacion}</td>
									<td className='px-4 py-3 text-center'>
										{!readOnly ? (
											<button
												type='button'
												onClick={() => onDelete(item.id)}
												className='text-status-error hover:text-red-700 transition-colors flex items-center justify-center w-6 h-6 rounded hover:bg-red-50'
												title='Eliminar hallazgo'
											>
												<i className='fa-solid fa-trash-can text-sm'></i>
											</button>
										) : null}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>

			{/* Footer / Summary if needed */}
			<div className='border-t border-border-default bg-muted-10 p-2 text-xs text-text-tertiary text-center'>
				{hallazgos.length} registro(s)
			</div>
		</div>
	)
}
