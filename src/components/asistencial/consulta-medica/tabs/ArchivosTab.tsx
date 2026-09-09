import React, { useRef, useState } from 'react'
import { toast } from 'sonner'
import Modal from '@/components/ui/Modal'
import { archivosMock } from '@/lib/consultaMedicaData'

interface Archivo {
	id: string | number
	nombre: string
	subidoPor: string
	descripcion: string
	fechaCreacion: string
	fechaArchivo?: string
	rutaOriginal: string
	rutaPreview?: string
	idAutor?: string
}

const PreviewImage = ({ ruta, alt }: { ruta?: string; alt: string }) => {
	if (ruta) {
		return (
			<img
				src={ruta}
				alt={alt}
				className='size-20 object-cover rounded-md border border-border-default'
				loading='lazy'
			/>
		)
	}

	return (
		<div className='size-20 bg-surface-default rounded-md border border-border-default flex items-center justify-center'>
			<i className='fa-solid fa-file text-gray-400'></i>
		</div>
	)
}

const ArchivoRow = ({
	archivo,
	index,
	doctorKey,
	onDelete,
	readOnly = false
}: {
	archivo: Archivo
	index: number
	doctorKey: string
	onDelete: (id: string | number) => void
	readOnly?: boolean
}) => {
	const handleView = () => {
		toast.info('Abriendo archivo...', { id: 'archivo' })
		window.open(archivo.rutaOriginal, '_blank', 'noopener,noreferrer')
		toast.success('Archivo abierto', { id: 'archivo' })
	}

	const esAutor = Boolean(doctorKey)

	return (
		<div className='flex flex-col'>
			<div className='grid grid-cols-[3rem_2fr_1fr_1fr_2fr_1fr_1fr_0.5fr] gap-2 items-center text-sm p-2 border-b border-dashed border-border-default'>
				<div className='text-center font-bold text-text-secondary'>{index + 1}.-</div>
				<div className='text-left pl-8 uppercase text-text-secondary truncate'>{archivo.nombre}</div>
				<div className='flex justify-center'>
					<PreviewImage ruta={archivo.rutaPreview} alt={archivo.nombre} />
				</div>
				<div className='text-center uppercase text-ms text-text-secondary'>{archivo.subidoPor}</div>
				<div className='text-center uppercase text-ms text-text-secondary'>{archivo.descripcion}</div>
				<div className='text-center text-ms text-text-secondary'>{archivo.fechaCreacion}</div>
				<div className='text-center text-ms text-text-secondary'>{archivo.fechaArchivo || '-'}</div>

				<div className='flex items-center justify-evenly gap-4'>
					<button
						type='button'
						onClick={handleView}
						className='text-brand hover:text-brand/90 transition-colors text-xl cursor-pointer'
						title='Ver archivo'
					>
						<i className='fa-solid fa-eye'></i>
					</button>

					{!readOnly ? (
						<button
							type='button'
							onClick={() => onDelete(archivo.id)}
							className={`text-red-500 hover:text-red-500/90 transition-colors text-xl cursor-pointer`}
							title='Eliminar'
						>
							<i className='fa-solid fa-trash'></i>
						</button>
					) : null}
				</div>
			</div>
		</div>
	)
}

export default function ArchivosTab({
	codigoAtencion: _codigoAtencion = '',
	readOnly = false
}: {
	codigoAtencion?: string
	readOnly?: boolean
} = {}): React.ReactElement {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
	const [isSaving, setIsSaving] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)

	const [archivos, setArchivos] = useState<Archivo[]>(
		archivosMock.map((a) => ({
			id: a.id,
			nombre: a.nombre,
			subidoPor: a.subidoPor,
			descripcion: a.descripcion,
			fechaCreacion: a.fechaCreacion,
			fechaArchivo: a.fechaArchivo,
			rutaOriginal: a.rutaOriginal,
			rutaPreview: a.rutaPreview,
			idAutor: 'DOC-001'
		}))
	)
	const [fileToDeleteId, setFileToDeleteId] = useState<string | null>(null)

	const [currentPage, setCurrentPage] = useState(1)
	const [totalRecords, setTotalRecords] = useState(archivosMock.length)
	const ITEMS_PER_PAGE = 20
	const totalPages = Math.ceil(totalRecords / ITEMS_PER_PAGE) || 1

	const [doctorName] = useState('MEDICO EVALUADOR')
	const [doctorKey] = useState('001-medico')

	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [nombreArchivo, setNombreArchivo] = useState('')
	const [descripcion, setDescripcion] = useState('')
	const [origen, setOrigen] = useState('interno')
	const [area, setArea] = useState('otros')
	const [fechaArchivo, setFechaArchivo] = useState(new Date().toISOString().split('T')[0])
	const [dragActive, setDragActive] = useState(false)
	const [fileError, setFileError] = useState('')
	const [generalError, setGeneralError] = useState('')

	const inputRef = useRef<HTMLInputElement>(null)

	const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
	const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']

	const resetForm = () => {
		setSelectedFile(null)
		setNombreArchivo('')
		setDescripcion('')
		setOrigen('interno')
		setArea('otros')
		setFechaArchivo(new Date().toISOString().split('T')[0])
		setFileError('')
		setGeneralError('')
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
		resetForm()
	}

	const handleFile = (file: File) => {
		setFileError('')
		setGeneralError('')
		if (!ALLOWED_TYPES.includes(file.type)) {
			setFileError('Solo se permiten archivos PDF o Imágenes (JPG, PNG).')
			return
		}
		if (file.size > MAX_FILE_SIZE) {
			setFileError('El archivo excede el tamaño máximo de 10MB.')
			return
		}
		setSelectedFile(file)
		if (!nombreArchivo.trim()) {
			const lastDot = file.name.lastIndexOf('.')
			const base = lastDot > 0 ? file.name.slice(0, lastDot) : file.name
			const ext = lastDot > 0 ? file.name.slice(lastDot) : ''
			const safeBase = base.replace(/[^a-zA-Z0-9]/g, '_')
			setNombreArchivo(`${safeBase}_${Date.now()}${ext}`)
		}
	}

	const handleDrag = (e: React.DragEvent) => {
		e.preventDefault()
		e.stopPropagation()
		setDragActive(e.type === 'dragenter' || e.type === 'dragover')
	}

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault()
		e.stopPropagation()
		setDragActive(false)
		if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0])
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.[0]) handleFile(e.target.files[0])
	}

	const onSave = () => {
		if (!selectedFile) {
			setFileError('Debes seleccionar un archivo.')
			return
		}

		let nombreFinal = nombreArchivo.trim()
		if (!nombreFinal) {
			setGeneralError('Debes ingresar un nombre para el archivo.')
			return
		}

		const extension = selectedFile.name.substring(selectedFile.name.lastIndexOf('.'))
		if (!nombreFinal.toLowerCase().endsWith(extension.toLowerCase())) {
			nombreFinal += extension
		}

		const existeNombre = archivos.some((archivo) => archivo.nombre.toLowerCase() === nombreFinal.toLowerCase())
		if (existeNombre) {
			setGeneralError('Ya existe un archivo con este nombre. Por favor, elige otro.')
			return
		}

		setIsSaving(true)
		toast.info('Subiendo archivo...', { id: 'archivo' })

		setTimeout(() => {
			const nuevoArchivo: Archivo = {
				id: `arch-${Date.now()}`,
				nombre: nombreFinal,
				subidoPor: doctorName,
				descripcion: descripcion || 'Archivo adjunto de consulta médica',
				fechaCreacion: new Date().toLocaleString('es-PE'),
				fechaArchivo,
				rutaOriginal: '/fondo-login.png',
				rutaPreview: '/fondo-login.png',
				idAutor: doctorKey
			}

			setArchivos([nuevoArchivo, ...archivos])
			setTotalRecords((prev) => prev + 1)
			setIsSaving(false)
			setIsModalOpen(false)
			resetForm()
			toast.success('Archivo subido correctamente', { id: 'archivo' })
		}, 400)
	}

	const handleDelete = (id: string | number) => {
		setFileToDeleteId(id.toString())
		setIsDeleteModalOpen(true)
	}

	const confirmDelete = () => {
		if (!fileToDeleteId) return
		setIsDeleting(true)
		toast.info('Eliminando archivo...', { id: 'archivo' })

		setTimeout(() => {
			setArchivos(archivos.filter((a) => a.id.toString() !== fileToDeleteId))
			setTotalRecords((prev) => Math.max(0, prev - 1))
			setIsDeleting(false)
			setIsDeleteModalOpen(false)
			setFileToDeleteId(null)
			toast.success('Archivo eliminado correctamente', { id: 'archivo' })
		}, 300)
	}

	return (
		<div className='flex flex-col gap-6 text-start'>
			<div className='flex justify-between items-center mb-2'>
				<h3 className='text-lg font-bold text-text-primary'>Archivos Digitales</h3>
				{!readOnly ? (
					<button
						type='button'
						className='bg-brand text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-brand/90 transition-colors uppercase text-sm cursor-pointer'
						onClick={() => setIsModalOpen(true)}
					>
						Subir archivo
					</button>
				) : null}
			</div>

			<div className='flex flex-col'>
				{/* Cabecera de la Tabla */}
				<div className='grid grid-cols-[3rem_2fr_1fr_1fr_2fr_1fr_1fr_0.5fr] gap-2 items-center bg-muted-20 px-2 py-5 rounded-lg text-xs font-bold text-text-secondary uppercase tracking-wide text-center'>
					<div>N°</div>
					<div className='text-center border-l border-border-default'>Nombre</div>
					<div className='border-l border-border-default'>Preview</div>
					<div className='border-l border-border-default'>Subido Por</div>
					<div className='border-l border-border-default'>Descripción</div>
					<div className='border-l border-border-default'>Fecha de Subida</div>
					<div className='border-l border-border-default'>Fecha de Archivo</div>
					<div className='border-l border-border-default'>Acciones</div>
				</div>

				{/* Listado de Archivos */}
				<div className='flex flex-col'>
					{archivos.length > 0 ? (
						archivos.map((archivo, index) => (
							<ArchivoRow
								key={archivo.id}
								archivo={archivo}
								index={(currentPage - 1) * ITEMS_PER_PAGE + index}
								doctorKey={doctorKey}
								onDelete={handleDelete}
								readOnly={readOnly}
							/>
						))
					) : (
						<div className='text-center py-10 text-text-secondary italic'>
							No hay archivos registrados para esta atención.
						</div>
					)}
				</div>

				{/* Paginación */}
				{totalPages > 1 && (
					<div className='flex flex-col sm:flex-row justify-between items-center gap-3 mt-6 pt-4 text-sm my-4 border-t border-border-default'>
						<div className='text-sm text-text-primary-80'>
							Mostrando <span className='font-semibold text-text-primary'>{archivos.length}</span> de{' '}
							<span className='font-semibold text-text-primary'>{totalRecords}</span> archivo(s)
						</div>

						<div className='flex items-center gap-2'>
							<div className='inline-flex items-center gap-2 rounded-md p-1 shadow-sm'>
								<button
									type='button'
									aria-label='Página anterior'
									title='Anterior'
									onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
									disabled={currentPage === 1}
									className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors border focus:ring-2 focus:ring-offset-1 focus:ring-brand cursor-pointer ${
										currentPage === 1
											? 'bg-card-bg text-accent-content cursor-not-allowed opacity-60 border-border-default'
											: 'bg-card-bg border-border-default text-accent-content'
									}`}
								>
									<i className='fas fa-chevron-left'></i>
									<span className='hidden sm:inline'>Anterior</span>
								</button>

								<div className='px-3 text-sm font-medium text-text-primary select-none'>
									Página {currentPage} de {totalPages}
								</div>

								<button
									type='button'
									aria-label='Página siguiente'
									title='Siguiente'
									onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
									disabled={currentPage === totalPages}
									className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors border focus:ring-2 focus:ring-offset-1 focus:ring-brand cursor-pointer ${
										currentPage === totalPages
											? 'bg-card-bg text-accent-content cursor-not-allowed opacity-60 border-border-default'
											: 'bg-card-bg border-border-default text-accent-content'
									}`}
								>
									<span className='hidden sm:inline'>Siguiente</span>
									<i className='fas fa-chevron-right'></i>
								</button>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Modal para Subir Nuevo Archivo */}
			{!readOnly ? (
				<Modal isOpen={isModalOpen} onClose={handleCloseModal} title='Nuevo archivo' size='sm' zIndex={160}>
					<div className='flex flex-col text-text-primary'>
						<h2 className='text-xl font-bold mb-6'>Nuevo archivo</h2>
						<div className='flex flex-col gap-5'>
							{/* Info del Doctor */}
							<div className='flex flex-col gap-2'>
								<label className='text-text-primary font-medium text-sm'>Doctor</label>
								<input
									type='text'
									value={doctorName}
									readOnly
									className='w-full bg-surface-light border-none rounded-lg p-3 text-text-secondary text-sm'
								/>
							</div>

							{/* Datos del Archivo */}
							<div className='flex flex-col gap-2'>
								<label className='text-text-primary font-medium text-sm'>Nombre de archivo</label>
								<input
									type='text'
									value={nombreArchivo}
									onChange={(e) => {
										setNombreArchivo(e.target.value)
										if (generalError) setGeneralError('')
									}}
									className='w-full bg-surface-light border-none rounded-lg p-3 text-text-secondary text-sm uppercase'
									placeholder='El nombre del archivo'
								/>
							</div>

							<div className='flex flex-col gap-2'>
								<label className='text-text-primary font-medium text-sm'>Descripción</label>
								<textarea
									rows={3}
									value={descripcion}
									onChange={(e) => setDescripcion(e.target.value)}
									className='w-full bg-surface-light border-none rounded-lg p-3 text-text-secondary text-sm resize-none'
									placeholder='Detalles adicionales sobre el archivo...'
								></textarea>
							</div>

							{/* Opciones de Clasificación */}
							<div className='grid grid-cols-2 gap-4'>
								<div className='flex flex-col gap-2'>
									<label className='text-text-primary font-medium text-sm'>Origen</label>
									<div className='flex items-center gap-4'>
										{['interno', 'externo'].map((val) => (
											<label key={val} className='inline-flex items-center gap-2 cursor-pointer'>
												<input
													type='radio'
													name='origen'
													value={val}
													checked={origen === val}
													onChange={() => setOrigen(val)}
													className='radio bg-muted-30 checked:text-brand'
												/>
												<span className='text-text-secondary text-sm capitalize'>{val}</span>
											</label>
										))}
									</div>
								</div>
								<div className='flex flex-col gap-2'>
									<label className='text-text-primary font-medium text-sm'>Área</label>
									<div className='flex items-center gap-4'>
										{['odontologia', 'otros'].map((val) => (
											<label key={val} className='inline-flex items-center gap-2 cursor-pointer'>
												<input
													type='radio'
													name='area'
													value={val}
													checked={area === val}
													onChange={() => setArea(val)}
													className='radio bg-muted-30 checked:text-brand'
												/>
												<span className='text-text-secondary text-sm capitalize'>{val}</span>
											</label>
										))}
									</div>
								</div>
							</div>

							{/* Zona de Carga (Drag & Drop) */}
							<div className='flex flex-col gap-2'>
								<label className='text-text-secondary font-medium text-sm'>
									Adjuntar Archivo (Máx 10MB)
								</label>
								<div
									onDragEnter={handleDrag}
									onDragLeave={handleDrag}
									onDragOver={handleDrag}
									onDrop={handleDrop}
									onClick={() => inputRef.current?.click()}
									className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all gap-2 ${
										dragActive
											? 'border-brand bg-brand/5 scale-[1.01]'
											: 'border-surface-light bg-surface-light/30 hover:bg-surface-light/50'
									}`}
								>
									<input
										ref={inputRef}
										type='file'
										className='hidden'
										onChange={handleChange}
										accept='.pdf, .jpg, .jpeg, .png'
									/>
									{selectedFile ? (
										<div className='flex flex-col items-center relative'>
											<button
												type='button'
												onClick={(e) => {
													e.stopPropagation()
													setSelectedFile(null)
													setNombreArchivo('')
												}}
												className='absolute -top-6 -right-12 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-600 shadow-md cursor-pointer'
											>
												<i className='fa-solid fa-xmark'></i>
											</button>
											<i
												className={`fa-solid ${selectedFile.type === 'application/pdf' ? 'fa-file-pdf text-red-500' : 'fa-image text-brand'} text-4xl mb-2`}
											></i>
											<p className='text-text-primary text-sm font-semibold truncate max-w-50'>
												{selectedFile.name}
											</p>
											<p className='text-gray-500 text-xs'>
												{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
											</p>
										</div>
									) : (
										<>
											<i className='fa-solid fa-cloud-arrow-up text-brand/40 text-3xl mb-1'></i>
											<p className='text-brand/70 font-medium text-sm px-4'>
												Click o arrastrar para subir imagen o PDF
											</p>
										</>
									)}
								</div>
								{fileError && <p className='text-red-500 text-xs mt-1 font-medium'>{fileError}</p>}
							</div>
						</div>

						{generalError && (
							<div className='mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 animate-fadeIn'>
								<i className='fa-solid fa-circle-exclamation'></i>
								<p className='text-sm font-medium'>{generalError}</p>
							</div>
						)}

						<div className='flex justify-end gap-3 mt-8'>
							<button
								type='button'
								onClick={handleCloseModal}
								className='bg-transparent text-text-secondary font-bold py-2.5 px-6 rounded-lg hover:bg-muted-20 transition-colors uppercase text-xs cursor-pointer'
							>
								Cancelar
							</button>
							<button
								type='button'
								onClick={onSave}
								disabled={isSaving || !selectedFile}
								className='bg-brand text-white font-bold py-2.5 px-8 rounded-lg shadow-brand/20 shadow-lg hover:bg-brand/90 transition-all uppercase text-xs flex items-center gap-2 disabled:opacity-50 disabled:grayscale cursor-pointer'
							>
								{isSaving ? (
									<>
										<i className='fa-solid fa-spinner fa-spin'></i> Guardando...
									</>
								) : (
									'Guardar Archivo'
								)}
							</button>
						</div>
					</div>
				</Modal>
			) : null}

			{/* Modal de Confirmación de Eliminación */}
			{!readOnly ? (
				<Modal
					isOpen={isDeleteModalOpen}
					onClose={() => setIsDeleteModalOpen(false)}
					title='Confirmar eliminación'
					size='sm'
					zIndex={170}
				>
					<div className='flex flex-col gap-4'>
						<div className='flex items-center gap-3 text-red-500 mb-2'>
							<div className='w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0'>
								<i className='fa-solid fa-triangle-exclamation text-xl'></i>
							</div>
							<h2 className='text-lg font-bold text-gray-800 uppercase'>¿Eliminar archivo?</h2>
						</div>
						<p className='text-text-primary text-sm leading-relaxed'>
							Esta acción es irreversible. El archivo se eliminará permanentemente de la consulta médica.
						</p>
						<div className='flex justify-end gap-3 mt-4'>
							<button
								onClick={() => setIsDeleteModalOpen(false)}
								className='px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-gray-100 text-sm italic cursor-pointer'
								disabled={isDeleting}
							>
								Cancelar
							</button>
							<button
								onClick={confirmDelete}
								className='px-4 py-2 bg-red-500 hover:bg-red-500/90 text-white rounded-lg text-sm font-semibold cursor-pointer'
								disabled={isDeleting}
							>
								{isDeleting ? 'Eliminando...' : 'Eliminar'}
							</button>
						</div>
					</div>
				</Modal>
			) : null}
		</div>
	)
}
