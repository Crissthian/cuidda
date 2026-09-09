import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import {
	catalogoCIE10Mock,
	medicamentosMock,
	sistemasMock,
	viasAplicacionMock,
	frecuenciasMedicacionMock,
	type CIE10Item,
	type MedicamentoItem
} from '@/lib/consultaMedicaData'

interface RecetaTabProps {
	codigo?: string
	estado?: string
	puedeImprimir?: boolean
	abierto?: boolean
	readOnly?: boolean
}

export default function RecetaTab({ readOnly = false }: RecetaTabProps) {
	const [modalBusquedaAbierto, setModalBusquedaAbierto] = useState(false)
	const [diagnosticoSeleccionadoIndex, setDiagnosticoSeleccionadoIndex] = useState<number | null>(null)
	const [terminoBusqueda, setTerminoBusqueda] = useState('')
	const [resultadosFiltrados, setResultadosFiltrados] = useState<CIE10Item[]>([])
	const [buscando, setBuscando] = useState(false)
	const [modalConfirmacion, setModalConfirmacion] = useState<{
		abierto: boolean
		tipo: 'diagnostico' | 'receta' | null
		index: number | null
	}>({ abierto: false, tipo: null, index: null })

	const {
		control,
		setValue,
		watch,
		register: registerField,
		formState: { errors }
	} = useFormContext()

	// Estado para búsqueda de medicamentos en Receta
	const [activeSearchRowReceta, setActiveSearchRowReceta] = useState<number | null>(null)
	const [productSearchTermReceta, setProductSearchTermReceta] = useState('')
	const [searchResultsReceta, setSearchResultsReceta] = useState<MedicamentoItem[]>([])
	const [isSearchingReceta, setIsSearchingReceta] = useState(false)
	const debounceTimerReceta = useRef<NodeJS.Timeout | null>(null)

	const {
		fields: diagnosticos,
		append: appendDiagnostico,
		remove: removeDiagnostico
	} = useFieldArray({
		control,
		name: 'diagnosticos'
	})

	const {
		fields: recetas,
		append: appendReceta,
		remove: removeReceta,
		move: moveReceta
	} = useFieldArray({
		control,
		name: 'recetas'
	})

	// Búsqueda en catálogo CIE-10
	useEffect(() => {
		if (terminoBusqueda.trim().length <= 3) {
			setResultadosFiltrados([])
			return
		}

		setBuscando(true)
		const timer = setTimeout(() => {
			const q = terminoBusqueda.toLowerCase()
			const filtered = catalogoCIE10Mock.filter(
				(item) => item.codigo.toLowerCase().includes(q) || item.descripcion.toLowerCase().includes(q)
			)
			setResultadosFiltrados(filtered)
			setBuscando(false)
		}, 300)

		return () => clearTimeout(timer)
	}, [terminoBusqueda])

	// Búsqueda de medicamentos para Receta
	useEffect(() => {
		if (activeSearchRowReceta === null) return

		const term = productSearchTermReceta.trim()
		if (term.length < 3) {
			setSearchResultsReceta([])
			return
		}

		if (debounceTimerReceta.current) {
			clearTimeout(debounceTimerReceta.current)
		}

		debounceTimerReceta.current = setTimeout(() => {
			setIsSearchingReceta(true)
			const q = term.toLowerCase()
			const res = medicamentosMock.filter((m) => m.NombreProducto.toLowerCase().includes(q))
			setSearchResultsReceta(res)
			setIsSearchingReceta(false)
		}, 300)

		return () => {
			if (debounceTimerReceta.current) {
				clearTimeout(debounceTimerReceta.current)
			}
		}
	}, [productSearchTermReceta, activeSearchRowReceta])

	const handleProductSearchReceta = (rowIndex: number, term: string) => {
		setActiveSearchRowReceta(rowIndex)
		setProductSearchTermReceta(term)
	}

	const handleSelectProductReceta = (rowIndex: number, medicamento: MedicamentoItem) => {
		setValue(`recetas.${rowIndex}.producto`, medicamento.NombreProducto, {
			shouldValidate: true,
			shouldDirty: true
		})
		setValue(`recetas.${rowIndex}.cdg_medicamento`, String(medicamento.IdMedicamento ?? ''), {
			shouldValidate: false,
			shouldDirty: true
		})
		setActiveSearchRowReceta(null)
		setProductSearchTermReceta('')
		setSearchResultsReceta([])
	}

	// Funciones Diagnósticos
	const agregarDiagnostico = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		appendDiagnostico({ cie10: '', diagnostico: '', tipo: '', sistema: '' })
	}

	const limpiarDiagnostico = (index: number) => {
		setValue(`diagnosticos.${index}`, { cie10: '', diagnostico: '', tipo: '', sistema: '' })
	}

	const eliminarDiagnostico = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
		e.preventDefault()
		setModalConfirmacion({ abierto: true, tipo: 'diagnostico', index })
	}

	const confirmarEliminacion = () => {
		if (modalConfirmacion.tipo === 'diagnostico' && modalConfirmacion.index !== null) {
			if (diagnosticos.length > 1) {
				removeDiagnostico(modalConfirmacion.index)
			} else {
				limpiarDiagnostico(modalConfirmacion.index)
			}
		} else if (modalConfirmacion.tipo === 'receta' && modalConfirmacion.index !== null) {
			if (recetas.length > 1) {
				removeReceta(modalConfirmacion.index)
			} else {
				limpiarReceta(modalConfirmacion.index)
			}
		}
		setModalConfirmacion({ abierto: false, tipo: null, index: null })
	}

	const cancelarEliminacion = () => {
		setModalConfirmacion({ abierto: false, tipo: null, index: null })
	}

	// Funciones Recetas
	const agregarReceta = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		appendReceta({
			producto: '',
			cantidad: '',
			via: '',
			frecuencia: '',
			duracion: '',
			comentarios: '',
			cdg_medicamento: ''
		})
	}

	const limpiarReceta = (index: number) => {
		setValue(`recetas.${index}`, {
			producto: '',
			cantidad: '',
			via: '',
			frecuencia: '',
			duracion: '',
			comentarios: '',
			cdg_medicamento: ''
		})
	}

	const eliminarReceta = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
		e.preventDefault()
		setModalConfirmacion({ abierto: true, tipo: 'receta', index })
	}

	const moverRecetaArriba = (index: number) => {
		if (index > 0) moveReceta(index, index - 1)
	}

	const moverRecetaAbajo = (index: number) => {
		if (index < recetas.length - 1) moveReceta(index, index + 1)
	}

	const abrirModalBusqueda = (index: number) => {
		setDiagnosticoSeleccionadoIndex(index)
		setModalBusquedaAbierto(true)
		setTerminoBusqueda('')
		setResultadosFiltrados([])
	}

	const cerrarModalBusqueda = () => {
		setModalBusquedaAbierto(false)
		setDiagnosticoSeleccionadoIndex(null)
		setTerminoBusqueda('')
		setResultadosFiltrados([])
	}

	const seleccionarCIE10 = (cie10: CIE10Item) => {
		if (diagnosticoSeleccionadoIndex !== null) {
			setValue(`diagnosticos.${diagnosticoSeleccionadoIndex}.cie10`, cie10.codigo)
			setValue(`diagnosticos.${diagnosticoSeleccionadoIndex}.diagnostico`, cie10.descripcion)
		}
		cerrarModalBusqueda()
	}

	const autocompletarCIE10 = (codigo: string, index: number, openModalIfNotFound = false) => {
		if (!codigo.trim()) return false
		const encontrado = catalogoCIE10Mock.find((item) => item.codigo.toUpperCase() === codigo.trim().toUpperCase())
		if (encontrado) {
			setValue(`diagnosticos.${index}.diagnostico`, encontrado.descripcion)
			return true
		} else if (openModalIfNotFound) {
			abrirModalBusqueda(index)
			return false
		}
		return false
	}

	return (
		<div className='space-y-8 text-start'>
			<fieldset disabled={readOnly} className='space-y-8'>
				{/* Sección Diagnósticos */}
				<section>
					<h3 className='text-xl font-semibold mb-4 text-text-primary'>Diagnósticos</h3>

					<div className='rounded-lg overflow-hidden'>
						{/* Header tabla */}
						<div
							className='gap-4 py-3 text-text-primary'
							style={{ display: 'grid', gridTemplateColumns: '120px 1fr 360px 40px 40px 40px 150px' }}
						>
							<div className='flex items-center gap-2 text-brand'>
								<i className='fa-solid fa-book-medical'></i>
								<span className='font-semibold text-sm'>CIE-10</span>
							</div>
							<div className='flex items-center gap-2 text-brand'>
								<i className='fa-solid fa-book-medical'></i>
								<span className='font-semibold text-sm'>DIAGNÓSTICO</span>
							</div>
							<div className='flex items-center gap-2 text-brand'>
								<i className='fa-solid fa-lungs'></i>
								<span className='font-semibold text-sm'>SISTEMA</span>
							</div>
							<div className='text-center'>
								<span className='font-semibold text-sm'>P</span>
							</div>
							<div className='text-center'>
								<span className='font-semibold text-sm'>D</span>
							</div>
							<div className='text-center'>
								<span className='font-semibold text-sm'>R</span>
							</div>
							<div></div>
						</div>

						{/* Filas diagnósticos */}
						<div>
							{diagnosticos.map((field, index) => {
								const diagnosticosErrors = errors?.diagnosticos as Record<string, unknown> | undefined
								const diagnosticoErrorObj = diagnosticosErrors?.[index] as
									| Record<string, { message: string }>
									| undefined

								const errorCie10 = diagnosticoErrorObj?.cie10
								const errorDiagnostico = diagnosticoErrorObj?.diagnostico
								const errorTipo = diagnosticoErrorObj?.tipo

								return (
									<Fragment key={field.id}>
										<div
											className='gap-4 py-3 items-start text-text-secondary'
											style={{
												display: 'grid',
												gridTemplateColumns: '120px 1fr 360px 40px 40px 40px 150px'
											}}
										>
											<div className='flex flex-col'>
												<input
													type='text'
													placeholder='CIE-10'
													className={`w-full px-2 py-2 border rounded bg-surface-light -outline-offset-2 ${
														errorCie10 ? 'border-red-500' : 'border-none'
													}`}
													{...registerField(`diagnosticos.${index}.cie10`)}
													onKeyDown={(e) => {
														if (e.key === 'Enter') {
															e.preventDefault()
															abrirModalBusqueda(index)
														} else if (e.key === 'Tab') {
															const cie10Value = watch(`diagnosticos.${index}.cie10`)
															const diagnosticoValue = watch(
																`diagnosticos.${index}.diagnostico`
															)
															if (!diagnosticoValue?.trim() && cie10Value?.trim()) {
																e.preventDefault()
																autocompletarCIE10(cie10Value, index, true)
															}
														}
													}}
													onBlur={(e) => {
														const cie10Value = e.target.value
														if (cie10Value.trim()) {
															autocompletarCIE10(cie10Value, index, false)
														}
													}}
												/>
												{errorCie10 && (
													<span className='text-red-500 text-xs mt-2 w-96'>
														{errorCie10.message}
													</span>
												)}
											</div>
											<div className='flex flex-col'>
												<input
													type='text'
													readOnly
													tabIndex={-1}
													placeholder='Descripción del diagnóstico'
													className={`w-full px-3 py-2 rounded bg-surface-light ${
														errorDiagnostico ? 'border border-red-500' : 'border-none'
													}`}
													{...registerField(`diagnosticos.${index}.diagnostico`)}
												/>
												{errorDiagnostico && (
													<span className='text-red-500 text-xs mt-1'>
														{errorDiagnostico.message}
													</span>
												)}
											</div>
											<div className='flex flex-col'>
												<select
													className='w-full px-2 py-2 border-none rounded bg-surface-light text-sm uppercase text-text-primary'
													{...registerField(`diagnosticos.${index}.sistema`)}
												>
													<option value=''>SELECCIONAR</option>
													{sistemasMock.map((sistema, idx) => (
														<option key={idx} value={sistema.num_item}>
															{sistema.des_item}
														</option>
													))}
												</select>
											</div>
											<div className='flex flex-col items-center justify-center h-full'>
												<div className='flex justify-center'>
													<input
														type='radio'
														value='p'
														className='radio radio-info text-brand bg-muted-30'
														{...registerField(`diagnosticos.${index}.tipo`)}
													/>
												</div>
												{errorTipo && index === 0 && (
													<span className='text-red-500 text-xs mt-1 text-center whitespace-nowrap'>
														Seleccionar
													</span>
												)}
											</div>
											<div className='flex flex-col items-center justify-center h-full'>
												<div className='flex justify-center'>
													<input
														type='radio'
														value='d'
														className='radio radio-info text-brand bg-muted-30'
														{...registerField(`diagnosticos.${index}.tipo`)}
													/>
												</div>
											</div>
											<div className='flex flex-col items-center justify-center h-full'>
												<div className='flex justify-center'>
													<input
														type='radio'
														value='r'
														className='radio radio-info text-brand bg-muted-30'
														{...registerField(`diagnosticos.${index}.tipo`)}
													/>
												</div>
											</div>
											{!readOnly ? (
												<div className='flex items-center justify-end gap-3'>
													<button
														type='button'
														onClick={agregarDiagnostico}
														className='w-10 h-10 text-brand rounded-lg text-lg flex items-center justify-center hover:opacity-90 cursor-pointer'
													>
														<i className='fa-solid fa-plus text-2xl font-extrabold'></i>
													</button>
													<button
														type='button'
														onClick={(e) => eliminarDiagnostico(e, index)}
														className='w-10 h-10 text-red-500 rounded-lg flex items-center justify-center hover:opacity-90 cursor-pointer'
													>
														<i className='fa-solid fa-trash text-2xl'></i>
													</button>
												</div>
											) : null}
										</div>
									</Fragment>
								)
							})}
						</div>
					</div>
				</section>

				{/* Sección Receta */}
				<section className='text-text-primary'>
					<h3 className='text-xl font-semibold mb-4'>Receta</h3>
					<div className='rounded-lg overflow-hidden'>
						{/* Header tabla */}
						<div className='grid grid-cols-[60px_2fr_100px_160px_160px_100px_1.5fr_180px] py-3 gap-4 items-center'>
							<div className='text-center'>
								<span className='font-semibold text-xs'>N°</span>
							</div>
							<div className='text-center'>
								<span className='font-semibold text-xs'>PRODUCTO</span>
							</div>
							<div className='text-center'>
								<span className='font-semibold text-xs'>CANTIDAD</span>
							</div>
							<div className='text-center'>
								<span className='font-semibold text-xs'>VÍA</span>
							</div>
							<div className='text-center'>
								<span className='font-semibold text-xs'>FRECUENCIA</span>
							</div>
							<div className='text-center'>
								<span className='font-semibold text-xs'>DURACIÓN (días)</span>
							</div>
							<div className='text-center'>
								<span className='font-semibold text-xs'>COMENTARIOS</span>
							</div>
							<div></div>
						</div>
						{/* Filas receta */}
						<div>
							{recetas.map((field, index) => (
								<Fragment key={field.id}>
									<div className='grid grid-cols-[60px_2fr_100px_160px_160px_100px_1.5fr_180px] py-3 gap-4 items-center text-sm'>
										<div className='text-center'>
											<span className='font-medium'>{index + 1}.-</span>
										</div>
										<div className='relative'>
											<input
												type='text'
												className={`w-full px-3 py-2 border rounded bg-surface-light border-none uppercase`}
												{...registerField(`recetas.${index}.producto`, {
													onChange: (e) => {
														const val = e.target.value
														handleProductSearchReceta(index, val)
														setValue(`recetas.${index}.cdg_medicamento`, '', {
															shouldValidate: false,
															shouldDirty: true
														})
													}
												})}
												onFocus={(e) => {
													setActiveSearchRowReceta(index)
													if (e.target.value.length >= 3) {
														handleProductSearchReceta(index, e.target.value)
													}
												}}
												onBlur={() => {
													setTimeout(() => {
														setActiveSearchRowReceta(null)
													}, 200)
												}}
												placeholder='Buscar producto...'
											/>
											<input
												type='hidden'
												{...registerField(`recetas.${index}.cdg_medicamento`)}
											/>
											{activeSearchRowReceta === index &&
												(isSearchingReceta || searchResultsReceta.length > 0) && (
													<div className='absolute z-60 left-0 right-0 mt-1 bg-surface-default border border-border-default rounded-lg shadow-lg max-h-64 overflow-y-auto'>
														{isSearchingReceta ? (
															<div className='p-2 text-sm text-text-muted text-center'>
																Buscando...
															</div>
														) : searchResultsReceta.length > 0 ? (
															searchResultsReceta.map((result) => (
																<div
																	key={result.CodigoInterno}
																	className='w-full text-left p-2 hover:bg-surface-light text-sm border-b border-border-default last:border-0 cursor-pointer'
																	onMouseDown={(e) => {
																		e.preventDefault()
																		handleSelectProductReceta(index, result)
																	}}
																>
																	<div className='font-medium text-text-primary'>
																		{result.NombreProducto}
																	</div>
																	<div className='text-xs text-muted'>
																		Código: {result.CodigoInterno}
																	</div>
																</div>
															))
														) : (
															<div className='p-2 text-sm text-muted text-center'>
																Sin resultados
															</div>
														)}
													</div>
												)}
										</div>
										<input
											type='number'
											min={0}
											className='w-full px-3 py-2 border-none rounded bg-surface-light'
											{...registerField(`recetas.${index}.cantidad`)}
										/>
										<select
											className='w-full px-3 py-2 border-none rounded bg-surface-light uppercase text-primary'
											{...registerField(`recetas.${index}.via`)}
										>
											<option value=''>Seleccionar</option>
											{viasAplicacionMock.map((via, idx) => (
												<option key={idx} value={via.num_item}>
													{via.des_item}
												</option>
											))}
										</select>
										<select
											className='w-full px-3 py-2 border-none rounded bg-surface-light uppercase text-primary'
											{...registerField(`recetas.${index}.frecuencia`)}
										>
											<option value=''>Seleccionar</option>
											{frecuenciasMedicacionMock.map((frecuencia, idx) => (
												<option key={idx} value={frecuencia.num_item}>
													{frecuencia.des_item}
												</option>
											))}
										</select>
										<input
											type='text'
											className='w-full px-3 py-2 border-none rounded bg-surface-light uppercase'
											{...registerField(`recetas.${index}.duracion`)}
										/>
										<input
											type='text'
											className='w-full px-3 py-2 border-none rounded bg-surface-light uppercase'
											{...registerField(`recetas.${index}.comentarios`)}
										/>
										{!readOnly ? (
											<div className='flex items-center justify-end gap-1'>
												<button
													type='button'
													onClick={() => moverRecetaArriba(index)}
													disabled={index === 0}
													className='w-8 h-8 text-brand disabled:text-gray-300 rounded-lg flex items-center justify-center hover:opacity-90 cursor-pointer disabled:cursor-not-allowed'
													title='Mover arriba'
												>
													<i className='fa-solid fa-arrow-up text-lg'></i>
												</button>
												<button
													type='button'
													onClick={() => moverRecetaAbajo(index)}
													disabled={index === recetas.length - 1}
													className='w-8 h-8 text-brand disabled:text-gray-300 rounded-lg flex items-center justify-center hover:opacity-90 cursor-pointer disabled:cursor-not-allowed'
													title='Mover abajo'
												>
													<i className='fa-solid fa-arrow-down text-lg'></i>
												</button>
												<button
													type='button'
													onClick={agregarReceta}
													className='w-8 h-8 text-brand rounded-lg text-lg flex items-center justify-center hover:opacity-90 cursor-pointer'
												>
													<i className='fa-solid fa-plus text-xl font-extrabold'></i>
												</button>
												<button
													type='button'
													onClick={(e) => eliminarReceta(e, index)}
													className='w-8 h-8 text-red-500 rounded-lg flex items-center justify-center hover:opacity-90 cursor-pointer'
												>
													<i className='fa-solid fa-trash text-lg'></i>
												</button>
											</div>
										) : null}
									</div>
								</Fragment>
							))}
						</div>
					</div>
					<div className='py-4 flex flex-row gap-2 w-full'>
						<div className='flex-1'>
							<label className='block mb-2 font-semibold text-brand' htmlFor='alergias'>
								Alergias:
							</label>
							<textarea
								id='alergias'
								className='w-full px-3 py-2 border-none rounded bg-surface-light resize-y -outline-offset-1 uppercase'
								rows={4}
								{...registerField('alergias')}
							></textarea>
						</div>
						<div className='flex-1'>
							<label className='block mb-2 font-semibold text-brand' htmlFor='recomendaciones'>
								Recomendaciones:
							</label>
							<textarea
								id='recomendaciones'
								className='w-full px-3 py-2 border-none rounded bg-surface-light resize-y -outline-offset-1 uppercase'
								rows={4}
								{...registerField('recomendaciones')}
							></textarea>
						</div>
					</div>
				</section>
			</fieldset>

			{/* Modal de confirmación de eliminación */}
			{!readOnly && modalConfirmacion.abierto && (
				<div className='fixed inset-0 flex items-center justify-center p-4 z-70'>
					<div className='absolute inset-0 bg-black/50 backdrop-blur-sm' onClick={cancelarEliminacion}></div>
					<div className='relative bg-surface-light rounded-lg w-full max-w-md shadow-xl z-10'>
						<div className='px-6 py-4 border-b border-border-default'>
							<h3 className='text-xl font-semibold text-text-primary'>Confirmar eliminación</h3>
						</div>
						<div className='px-6 py-6'>
							<div className='flex items-start gap-4'>
								<div className='shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center'>
									<i className='fa-solid fa-exclamation-triangle text-red-600 text-xl'></i>
								</div>
								<div className='flex-1'>
									<p className='text-text-primary text-base leading-relaxed'>
										¿Está seguro de que desea eliminar este{' '}
										{modalConfirmacion.tipo === 'diagnostico' ? 'diagnóstico' : 'receta'}?
									</p>
									<p className='text-gray-500 text-sm mt-2'>Esta acción no se puede deshacer.</p>
								</div>
							</div>
						</div>
						<div className='flex justify-end gap-3 px-6 py-4 bg-surface-light rounded-b-lg'>
							<button
								type='button'
								onClick={cancelarEliminacion}
								className='px-6 py-2 bg-muted hover:bg-muted-80 text-white rounded-lg font-medium transition-colors cursor-pointer'
							>
								Cancelar
							</button>
							<button
								type='button'
								onClick={confirmarEliminacion}
								className='px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors cursor-pointer'
							>
								Eliminar
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Modal de búsqueda CIE-10 */}
			{!readOnly && modalBusquedaAbierto && (
				<div className='fixed inset-0 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm z-70'>
					<div className='rounded-lg w-full max-w-3xl max-h-[80vh] flex flex-col shadow-2xl bg-surface-light border border-border-default'>
						{/* Header del modal */}
						<div className='flex justify-between items-center px-6 py-4 border-b border-border-default bg-surface-light'>
							<h3 className='text-xl font-semibold text-text-primary'>Búsqueda de Diagnósticos CIE-10</h3>
							<button
								type='button'
								onClick={cerrarModalBusqueda}
								className='text-text-primary hover:text-text-primary transition-colors cursor-pointer'
							>
								<i className='fa-solid fa-times text-2xl'></i>
							</button>
						</div>

						{/* Contenido del modal */}
						<div className='flex-1 overflow-y-auto px-6 py-4 bg-surface-light text-text-primary'>
							<div className='mb-4'>
								<input
									type='text'
									placeholder='Buscar por descripción (mínimo 4 caracteres)...'
									className='w-full px-4 py-3 border border-border-default rounded-lg transition-all'
									autoFocus
									value={terminoBusqueda}
									onChange={(e) => setTerminoBusqueda(e.target.value)}
								/>
							</div>

							<div className='space-y-2'>
								{terminoBusqueda.trim().length < 4 ? (
									<div className='text-center py-12'>
										<i className='fa-solid fa-search text-5xl text-text-primary mb-4'></i>
										<p className='text-gray-500 text-lg'>
											Ingrese al menos 4 caracteres para buscar códigos CIE-10
										</p>
									</div>
								) : buscando ? (
									<div className='text-center py-12'>
										<i className='fa-solid fa-spinner fa-spin text-5xl text-brand mb-4'></i>
										<p className='text-gray-500 text-lg'>Buscando...</p>
									</div>
								) : resultadosFiltrados.length > 0 ? (
									<>
										<p className='text-sm text-text-primary mb-3'>
											Se muestran {resultadosFiltrados.length} resultado(s)
										</p>
										{resultadosFiltrados.map((item, index) => (
											<div
												key={index}
												onClick={() => seleccionarCIE10(item)}
												className='p-4 border border-border-default rounded-lg hover:bg-brand hover:text-white hover:border-brand cursor-pointer transition-all duration-200 hover:shadow-md'
											>
												<div className='flex gap-3 items-start'>
													<span className='font-bold text-base'>{item.codigo}</span>
													<span className='text-text-primary'>—</span>
													<span className='flex-1 leading-relaxed'>{item.descripcion}</span>
												</div>
											</div>
										))}
									</>
								) : (
									<div className='text-center py-12'>
										<i className='fa-solid fa-folder-open text-5xl text-gray-300 mb-4'></i>
										<p className='text-gray-500 text-lg'>
											No se encontraron resultados para "{terminoBusqueda}"
										</p>
										<p className='text-text-primary text-sm mt-2'>
											Intente con otros términos de búsqueda
										</p>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
