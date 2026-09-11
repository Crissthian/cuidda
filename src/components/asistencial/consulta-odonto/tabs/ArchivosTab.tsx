import React, { useEffect, useRef, useState } from "react";
import Modal from "@/components/ui/Modal";
import { toast } from "sonner";
import { useAtencionOdontoStore } from "../store/useAtencionOdontoStore";
import {
  archivosOdontoMock,
  type ArchivoOdonto,
} from "@/lib/consultaOdontoData";

interface ArchivosTabProps {
  onLoadComplete?: (loaded: boolean) => void;
  readOnly?: boolean;
}

const PreviewImage = ({ alt }: { ruta?: string; alt: string }) => {
  return (
    <div className="size-16 bg-surface-default rounded-md border border-border-default flex items-center justify-center text-brand">
      <i className="fa-solid fa-file-image text-2xl"></i>
      <span className="sr-only">{alt}</span>
    </div>
  );
};

const ArchivoRow = ({
  archivo,
  index,
  onDelete,
  readOnly = false,
}: {
  archivo: ArchivoOdonto;
  index: number;
  onDelete: (id: string | number) => void;
  readOnly?: boolean;
}) => {
  const handleView = () => {
    toast.info(`Abriendo archivo ${archivo.nombre}...`);
  };

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-[3rem_2fr_1fr_1fr_2fr_1fr_1fr_0.5fr] gap-2 items-center text-sm p-2 border-b border-dashed border-border-default">
        <div className="text-center font-bold text-text-secondary">
          {index + 1}.-
        </div>
        <div className="text-left pl-8 uppercase text-text-secondary truncate">
          {archivo.nombre}
        </div>
        <div className="flex justify-center">
          <PreviewImage ruta={archivo.rutaPreview} alt={archivo.nombre} />
        </div>
        <div className="text-center uppercase text-xs text-text-secondary">
          {archivo.subidoPor}
        </div>
        <div className="text-center uppercase text-xs text-text-secondary">
          {archivo.descripcion}
        </div>
        <div className="text-center text-xs text-text-secondary">
          {archivo.fechaCreacion}
        </div>
        <div className="text-center text-xs text-text-secondary">
          {archivo.fechaArchivo || "-"}
        </div>

        <div className="flex items-center justify-evenly gap-4">
          <button
            type="button"
            onClick={handleView}
            className="text-brand hover:text-brand/90 transition-colors text-xl cursor-pointer"
            title="Ver archivo"
          >
            <i className="fa-solid fa-eye"></i>
          </button>

          <button
            type="button"
            onClick={() => onDelete(archivo.id)}
            disabled={readOnly}
            className={`text-red-500 disabled:text-gray-400 transition-colors text-xl ${
              readOnly
                ? "opacity-30 cursor-not-allowed"
                : "hover:text-red-600 cursor-pointer"
            }`}
            title={readOnly ? "Solo lectura" : "Eliminar"}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Componente Tabla de Archivos para Odontología.
 * Gestiona la carga, listado y eliminación simulada de archivos de la consulta.
 */
export function ArchivosTab({
  onLoadComplete,
  readOnly = false,
}: ArchivosTabProps): React.ReactElement {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [archivos, setArchivos] = useState<ArchivoOdonto[]>(archivosOdontoMock);
  const [fileToDeleteId, setFileToDeleteId] = useState<string | null>(null);

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const totalRecords = archivos.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / ITEMS_PER_PAGE));

  const [doctorName] = useState("DRA. ANA PAOLA RIVAS");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [nombreArchivo, setNombreArchivo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [origen, setOrigen] = useState("interno");
  const [area, setArea] = useState("odontologia");
  const [fechaArchivo, setFechaArchivo] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [dragActive, setDragActive] = useState(false);
  const [fileError, setFileError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const { datosEvento } = useAtencionOdontoStore();

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_TYPES = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/jpg",
  ];

  useEffect(() => {
    onLoadComplete?.(true);
  }, [onLoadComplete]);

  const resetForm = () => {
    setSelectedFile(null);
    setNombreArchivo("");
    setDescripcion("");
    setOrigen("interno");
    setArea("odontologia");
    setFechaArchivo(new Date().toISOString().split("T")[0]);
    setFileError("");
    setGeneralError("");
  };

  const handleCloseModal = () => {
    if (readOnly) return;
    setIsModalOpen(false);
    resetForm();
  };

  const handleFile = (file: File) => {
    setFileError("");
    setGeneralError("");
    if (!ALLOWED_TYPES.includes(file.type)) {
      setFileError("Solo se permiten archivos PDF o Imágenes (JPG, PNG).");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setFileError("El archivo excede el tamaño máximo de 10MB.");
      return;
    }
    setSelectedFile(file);
    if (!nombreArchivo.trim()) {
      const lastDot = file.name.lastIndexOf(".");
      const base = lastDot > 0 ? file.name.slice(0, lastDot) : file.name;
      const ext = lastDot > 0 ? file.name.slice(lastDot) : "";
      const safeBase = base.replace(/[^a-zA-Z0-9]/g, "_");
      setNombreArchivo(`${safeBase}_${Date.now()}${ext}`);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };

  const onSave = async () => {
    if (readOnly) return;
    if (!selectedFile) {
      setFileError("Debes seleccionar un archivo.");
      return;
    }

    let nombreFinal = nombreArchivo.trim();
    if (!nombreFinal) {
      setGeneralError("Debes ingresar un nombre para el archivo.");
      return;
    }

    const extension = selectedFile.name.substring(
      selectedFile.name.lastIndexOf("."),
    );
    if (!nombreFinal.toLowerCase().endsWith(extension.toLowerCase())) {
      nombreFinal += extension;
    }

    setIsSaving(true);
    toast.loading("Subiendo archivo...", { id: "subir-archivo" });

    setTimeout(() => {
      const nuevo: ArchivoOdonto = {
        id: String(Date.now()),
        nombre: nombreFinal,
        subidoPor: doctorName,
        descripcion: descripcion || "Archivo adjunto de odontología",
        fechaCreacion: new Date().toLocaleString("es-PE"),
        fechaArchivo: fechaArchivo || new Date().toISOString().split("T")[0],
        rutaOriginal: `/archivos/odonto/${nombreFinal}`,
        idAutor: "DOC-001",
      };

      setArchivos((prev) => [nuevo, ...prev]);
      setIsSaving(false);
      setIsModalOpen(false);
      resetForm();
      toast.success("Archivo subido correctamente", { id: "subir-archivo" });
    }, 500);
  };

  const handleDelete = (id: string | number) => {
    if (readOnly) return;
    setFileToDeleteId(id.toString());
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (readOnly || !fileToDeleteId) return;
    setIsDeleting(true);
    toast.loading("Eliminando archivo...", { id: "eliminar-archivo" });

    setTimeout(() => {
      setArchivos((prev) =>
        prev.filter((a) => a.id.toString() !== fileToDeleteId),
      );
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
      setFileToDeleteId(null);
      toast.success("Archivo eliminado correctamente", {
        id: "eliminar-archivo",
      });
    }, 400);
  };

  const paginatedArchivos = archivos.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-text-primary">
          Archivos Digitales
        </h3>
        {!readOnly ? (
          <button
            type="button"
            className="bg-brand text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-brand/90 transition-colors uppercase text-sm cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            Subir archivo
          </button>
        ) : null}
      </div>

      <div className="flex flex-col">
        {/* Cabecera de la Tabla */}
        <div className="grid grid-cols-[3rem_2fr_1fr_1fr_2fr_1fr_1fr_0.5fr] gap-2 items-center bg-muted-20 px-2 py-5 rounded-lg text-xs font-bold text-text-secondary uppercase tracking-wide text-center">
          <div>N°</div>
          <div className="text-center border-l border-border-default">
            Nombre
          </div>
          <div className="border-l border-border-default">Preview</div>
          <div className="border-l border-border-default">Subido Por</div>
          <div className="border-l border-border-default">Descripción</div>
          <div className="border-l border-border-default">
            Fecha de Creación
          </div>
          <div className="border-l border-border-default">Fecha de Archivo</div>
          <div className="border-l border-border-default">Acciones</div>
        </div>

        {/* Listado de Archivos */}
        <div className="flex flex-col">
          {paginatedArchivos.length > 0 ? (
            paginatedArchivos.map((archivo, index) => (
              <ArchivoRow
                key={archivo.id}
                archivo={archivo}
                index={(currentPage - 1) * ITEMS_PER_PAGE + index}
                onDelete={handleDelete}
                readOnly={readOnly}
              />
            ))
          ) : (
            <div className="text-center py-10 text-text-secondary italic">
              No hay archivos registrados para este paciente.
            </div>
          )}
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-6 pt-4 text-sm my-4 border-t border-border-default">
            <div className="text-sm text-text-secondary">
              Mostrando{" "}
              <span className="font-semibold text-text-primary">
                {paginatedArchivos.length}
              </span>{" "}
              de{" "}
              <span className="font-semibold text-text-primary">
                {totalRecords}
              </span>{" "}
              archivo(s)
            </div>

            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-md p-1 shadow-sm">
                <button
                  type="button"
                  aria-label="Página anterior"
                  title="Anterior"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors border focus:ring-2 focus:ring-brand ${
                    currentPage === 1
                      ? "bg-card-bg text-text-secondary cursor-not-allowed opacity-60 border-border-default"
                      : "bg-card-bg border-border-default text-text-primary hover:bg-muted-20 cursor-pointer"
                  }`}
                >
                  <i className="fas fa-chevron-left"></i>
                  <span className="hidden sm:inline">Anterior</span>
                </button>

                <div className="px-3 text-sm font-medium text-text-primary select-none">
                  Página {currentPage} de {totalPages}
                </div>

                <button
                  type="button"
                  aria-label="Página siguiente"
                  title="Siguiente"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors border focus:ring-2 focus:ring-brand ${
                    currentPage === totalPages
                      ? "bg-card-bg text-text-secondary cursor-not-allowed opacity-60 border-border-default"
                      : "bg-card-bg border-border-default text-text-primary hover:bg-muted-20 cursor-pointer"
                  }`}
                >
                  <span className="hidden sm:inline">Siguiente</span>
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal para Subir Nuevo Archivo */}
      <Modal
        isOpen={!readOnly && isModalOpen}
        onClose={handleCloseModal}
        title="Nuevo archivo"
        size="sm"
        zIndex={160}
      >
        <div className="flex flex-col text-text-primary">
          <h2 className="text-xl font-bold mb-6">Nuevo archivo</h2>
          <div className="flex flex-col gap-5">
            {/* Info del Doctor */}
            <div className="flex flex-col gap-2">
              <label className="text-text-primary font-medium text-sm">
                Doctor
              </label>
              <input
                type="text"
                value={datosEvento?.nombreMedico || doctorName}
                readOnly
                className="w-full bg-surface-light border-none rounded-lg p-3 text-text-secondary text-sm"
              />
            </div>

            {/* Datos del Archivo */}
            <div className="flex flex-col gap-2">
              <label className="text-text-primary font-medium text-sm">
                Nombre de archivo
              </label>
              <input
                type="text"
                value={nombreArchivo}
                onChange={(e) => {
                  setNombreArchivo(e.target.value);
                  if (generalError) setGeneralError("");
                }}
                className="w-full bg-surface-light border-none rounded-lg p-3 text-text-secondary text-sm uppercase"
                placeholder="El nombre del archivo"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-text-primary font-medium text-sm">
                Fecha de archivo
              </label>
              <input
                type="date"
                value={fechaArchivo}
                onChange={(e) => setFechaArchivo(e.target.value)}
                className="w-full bg-surface-light border-none rounded-lg p-3 text-text-secondary text-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-text-primary font-medium text-sm">
                Descripción
              </label>
              <textarea
                rows={3}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full bg-surface-light border-none rounded-lg p-3 text-text-secondary text-sm resize-none"
                placeholder="Detalles adicionales sobre el archivo..."
              ></textarea>
            </div>

            {/* Opciones de Clasificación */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-text-primary font-medium text-sm">
                  Origen
                </label>
                <div className="flex items-center gap-4">
                  {["interno", "externo"].map((val) => (
                    <label
                      key={val}
                      className="inline-flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="origen"
                        value={val}
                        checked={origen === val}
                        onChange={() => setOrigen(val)}
                        className="radio bg-muted-30 checked:text-brand"
                      />
                      <span className="text-text-secondary text-sm capitalize">
                        {val}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-text-primary font-medium text-sm">
                  Área
                </label>
                <div className="flex items-center gap-4">
                  {["odontologia", "otros"].map((val) => (
                    <label
                      key={val}
                      className="inline-flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="area"
                        value={val}
                        checked={area === val}
                        onChange={() => setArea(val)}
                        className="radio bg-muted-30 checked:text-brand"
                      />
                      <span className="text-text-secondary text-sm capitalize">
                        {val}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Zona de Carga (Drag & Drop) */}
            <div className="flex flex-col gap-2">
              <label className="text-text-secondary font-medium text-sm">
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
                    ? "border-brand bg-brand/5 scale-[1.01]"
                    : "border-border-default bg-surface-light/30 hover:bg-surface-light/50"
                }`}
              >
                <input
                  ref={inputRef}
                  type="file"
                  className="hidden"
                  onChange={handleChange}
                  accept=".pdf, .jpg, .jpeg, .png"
                />
                {selectedFile ? (
                  <div className="flex flex-col items-center relative">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                        setNombreArchivo("");
                      }}
                      className="absolute -top-6 -right-12 bg-red-500 text-white rounded-full size-7 flex items-center justify-center hover:bg-red-600 shadow-md cursor-pointer"
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                    <i
                      className={`fa-solid ${selectedFile.type === "application/pdf" ? "fa-file-pdf text-red-500" : "fa-image text-brand"} text-4xl mb-2`}
                    ></i>
                    <p className="text-text-primary text-sm font-semibold truncate max-w-50">
                      {selectedFile.name}
                    </p>
                    <p className="text-text-secondary text-xs">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <>
                    <i className="fa-solid fa-cloud-arrow-up text-brand/40 text-3xl mb-1"></i>
                    <p className="text-brand/70 font-medium text-sm px-4">
                      Click o arrastrar para subir imagen o PDF
                    </p>
                  </>
                )}
              </div>
              {fileError && (
                <p className="text-red-500 text-xs mt-1 font-medium">
                  {fileError}
                </p>
              )}
            </div>
          </div>

          {generalError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 animate-fadeIn">
              <i className="fa-solid fa-circle-exclamation"></i>
              <p className="text-sm font-medium">{generalError}</p>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={handleCloseModal}
              className="bg-transparent text-text-secondary font-bold py-2.5 px-6 rounded-lg hover:bg-muted-20 transition-colors uppercase text-xs cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={onSave}
              disabled={isSaving || !selectedFile}
              className="bg-brand text-white font-bold py-2.5 px-8 rounded-lg shadow-md hover:bg-brand/90 transition-all uppercase text-xs flex items-center gap-2 disabled:opacity-50 disabled:grayscale cursor-pointer"
            >
              {isSaving ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i> Guardando...
                </>
              ) : (
                "Guardar Archivo"
              )}
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal de Confirmación de Eliminación */}
      <Modal
        isOpen={!readOnly && isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmar eliminación"
        size="sm"
        zIndex={170}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-red-500 mb-2">
            <div className="size-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
              <i className="fa-solid fa-triangle-exclamation text-xl"></i>
            </div>
            <h2 className="text-lg font-bold text-text-primary uppercase">
              ¿Eliminar archivo?
            </h2>
          </div>
          <p className="text-text-primary text-sm leading-relaxed">
            Esta acción es irreversible. El archivo se eliminará permanentemente
            de la lista de atención odontológica.
          </p>
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 rounded-lg text-text-secondary font-medium hover:bg-muted-20 text-sm cursor-pointer"
              disabled={isDeleting}
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={confirmDelete}
              disabled={isDeleting}
              className="px-6 py-2 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 transition-all shadow-md text-sm flex items-center gap-2 uppercase cursor-pointer"
            >
              {isDeleting ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin text-xs"></i>{" "}
                  Procesando...
                </>
              ) : (
                "Sí, Eliminar"
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
