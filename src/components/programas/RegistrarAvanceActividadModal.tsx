import SuccessModal from "@/components/ui/SuccessModal";
import { estadosAvanceActividad } from "@/lib/programasData";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  actividad?: string;
};

const labelClass = "mb-1 block text-sm text-text-secondary";
const inputClass = "form-input py-2.5 text-sm";
const selectClass = "form-select appearance-none py-2.5 text-sm";
const MAX_SIZE_MB = 15;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

export default function RegistrarAvanceActividadModal({
  isOpen,
  onClose,
  actividad,
}: Props) {
  const [estado, setEstado] = useState("");
  const [fecha, setFecha] = useState("");
  const [cumplimiento, setCumplimiento] = useState(75);
  const [observacion, setObservacion] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [estadoError, setEstadoError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
      setFileError("");
    }
  }, []);

  const onDropRejected = useCallback(() => {
    setFileError(
      `El archivo supera los ${MAX_SIZE_MB} MB o el formato no es válido (PDF, JPG, PNG, XLSX).`,
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    maxSize: MAX_SIZE_BYTES,
    accept: {
      "application/pdf": [".pdf"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
  });

  const resetForm = () => {
    setEstado("");
    setFecha("");
    setCumplimiento(75);
    setObservacion("");
    setSelectedFile(null);
    setFileError("");
    setEstadoError("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    resetForm();
    onClose();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!estado) {
      setEstadoError("Selecciona un estado para continuar.");
      return;
    }
    setShowSuccess(true);
  };

  const sizeLabel = selectedFile
    ? selectedFile.size >= 1024 * 1024
      ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`
      : `${(selectedFile.size / 1024).toFixed(0)} KB`
    : "";

  if (!isOpen && !showSuccess) return null;

  return (
    <>
      {isOpen && !showSuccess && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-registrar-avance-title"
          onClick={handleClose}
        >
          <div
            className="relative flex max-h-[95vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl bg-surface-default shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-6 top-5 flex size-8 items-center justify-center rounded-full text-brand hover:bg-surface-light"
              aria-label="Cerrar modal"
            >
              <i
                className="fa-solid fa-right-from-bracket text-lg"
                aria-hidden="true"
              />
            </button>

            <div className="overflow-y-auto px-8 py-6">
              <h2
                id="modal-registrar-avance-title"
                className="text-center text-xl font-bold text-brand"
              >
                Registrar cumplimiento
              </h2>
              {actividad && (
                <p className="mt-1 text-center text-sm text-text-secondary">
                  {actividad}
                </p>
              )}

              <form
                className="mt-6 flex flex-col gap-5"
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="avance-estado" className={labelClass}>
                      Estado
                    </label>
                    <div className="form-select-container">
                      <select
                        id="avance-estado"
                        value={estado}
                        onChange={(e) => {
                          setEstado(e.target.value);
                          if (e.target.value) setEstadoError("");
                        }}
                        className={`${selectClass} ${estado ? "text-text-primary" : "text-muted"}`}
                        aria-invalid={estadoError ? "true" : "false"}
                        aria-describedby={
                          estadoError ? "avance-estado-error" : undefined
                        }
                      >
                        <option value="" disabled hidden>
                          Seleccionar
                        </option>
                        {estadosAvanceActividad.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    {estadoError && (
                      <p
                        id="avance-estado-error"
                        className="mt-1 text-xs text-risk-red"
                      >
                        {estadoError}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="avance-fecha" className={labelClass}>
                      Fecha de ejecución
                    </label>
                    <input
                      id="avance-fecha"
                      type="date"
                      value={fecha}
                      onChange={(e) => setFecha(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="avance-cumplimiento" className={labelClass}>
                    % cumplimiento —{" "}
                    <span className="font-bold text-brand">
                      {cumplimiento}%
                    </span>
                  </label>
                  <input
                    id="avance-cumplimiento"
                    type="range"
                    min={0}
                    max={100}
                    value={cumplimiento}
                    onChange={(e) => setCumplimiento(Number(e.target.value))}
                    className="w-full accent-brand"
                    aria-valuetext={`${cumplimiento} por ciento`}
                  />
                </div>

                <div>
                  <span id="avance-evidencia-label" className={labelClass}>
                    Evidencia{" "}
                    <span className="text-muted">(PDF, JPG, PNG, XLSX)</span>
                  </span>
                  <div
                    {...getRootProps()}
                    className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-8 text-center transition ${
                      isDragActive
                        ? "border-brand bg-brand/5"
                        : "border-brand/60 bg-surface-default"
                    }`}
                  >
                    <input
                      {...getInputProps()}
                      aria-label="Evidencia, formatos PDF, JPG, PNG, XLSX, hasta 15 MB"
                    />
                    <i
                      className="fa-solid fa-file-arrow-up text-3xl text-brand"
                      aria-hidden="true"
                    />
                    <p className="mt-2 text-sm font-semibold text-muted">
                      Subir archivo
                    </p>
                    <p className="text-xs text-muted">Hasta {MAX_SIZE_MB} MB</p>
                  </div>
                  {fileError && (
                    <p className="mt-1 text-xs text-risk-red">{fileError}</p>
                  )}
                  {selectedFile && (
                    <div className="relative mt-3 flex items-center justify-between gap-3 rounded-lg border border-brand/30 bg-white p-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFile(null);
                        }}
                        className="absolute right-3 top-3 text-muted transition-colors hover:text-risk-red"
                        aria-label={`Quitar ${selectedFile.name}`}
                      >
                        <i
                          className="fa-regular fa-trash-can text-xs"
                          aria-hidden="true"
                        />
                      </button>
                      <div className="flex items-center gap-3 pr-6">
                        <i
                          className="fa-regular fa-file-lines text-2xl text-brand"
                          aria-hidden="true"
                        />
                        <div className="flex flex-col">
                          <span className="text-xs font-bold uppercase text-text-secondary">
                            {selectedFile.name}
                          </span>
                          <span className="text-[11px] text-muted">
                            {sizeLabel}
                          </span>
                        </div>
                      </div>
                      <span className="rounded-full bg-success/15 px-3 py-1 text-[11px] font-bold text-success-dark">
                        Cargado
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="avance-observacion" className={labelClass}>
                    Observación
                  </label>
                  <textarea
                    id="avance-observacion"
                    rows={3}
                    value={observacion}
                    onChange={(e) => setObservacion(e.target.value)}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div className="flex justify-center gap-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex items-center gap-2 rounded-lg bg-muted px-6 py-2.5 text-[11px] font-bold text-white transition hover:bg-muted-80"
                  >
                    <i
                      className="fa-solid fa-trash text-[11px]"
                      aria-hidden="true"
                    />
                    CANCELAR
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-lg bg-brand px-6 py-2.5 text-[11px] font-bold text-white transition hover:bg-primary-hover"
                  >
                    <i
                      className="fa-solid fa-plus text-[11px]"
                      aria-hidden="true"
                    />
                    GUARDAR AVANCE
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <SuccessModal
        isOpen={showSuccess}
        onClose={handleCloseSuccess}
        title={"Actividad actualizada\ncorrectamente"}
      />
    </>
  );
}
