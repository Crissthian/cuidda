import SuccessModal from "@/components/ui/SuccessModal";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function formatFileSize(size: number) {
  if (size >= 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  return `${(size / 1024).toFixed(0)} KB`;
}

function getFileTypeLabel(name: string) {
  const lower = name.toLowerCase();
  if (lower.endsWith(".csv")) return "CSV";
  if (lower.endsWith(".pdf")) return "PDF";
  if (lower.endsWith(".xls")) return "XLS";
  return "XLSX";
}

export default function AnalisisCausaRaizModal({ isOpen, onClose }: Props) {
  const [codigo, setCodigo] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    maxSize: 20 * 1024 * 1024,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".xls"],
      "application/pdf": [".pdf"],
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleCargarDocumento = () => {
    if (!codigo.trim()) {
      toast.error("Digite el código asignado.");
      return;
    }
    if (!selectedFile) {
      toast.error("Seleccione el archivo fuente.");
      return;
    }
    setShowSuccess(true);
  };

  const resetState = () => {
    setCodigo("");
    setSelectedFile(null);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    resetState();
    onClose();
  };

  const handleCloseUpload = () => {
    resetState();
    onClose();
  };

  if (!isOpen && !showSuccess) return null;

  return (
    <>
      {isOpen && !showSuccess && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-causa-raiz-title"
          onClick={handleCloseUpload}
        >
          <div
            className="relative flex max-h-[95vh] w-full max-w-125 flex-col overflow-hidden rounded-2xl bg-surface-default shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button top right */}
            <button
              type="button"
              onClick={handleCloseUpload}
              className="absolute right-6 top-6 flex size-8 items-center justify-center rounded-full text-brand hover:bg-surface-light"
              aria-label="Cerrar modal"
            >
              <i
                className="fa-solid fa-right-from-bracket text-lg"
                aria-hidden="true"
              />
            </button>

            <div className="overflow-y-auto px-6 py-7 sm:px-8">
              {/* Header */}
              <div className="text-center">
                <h2
                  id="modal-causa-raiz-title"
                  className="text-xl font-bold text-brand"
                >
                  Análisis causa raiz
                </h2>
                <p className="mt-1 text-sm text-text-secondary">
                  Cargar documento de análisis
                </p>
              </div>

              {/* Paso 1: código */}
              <section
                className="mt-5 rounded-xl bg-white p-5 shadow-[0_2px_12px_rgba(0,100,210,0.08)] ring-1 ring-brand/10"
                aria-labelledby="codigo-causa-title"
              >
                <div className="flex items-start gap-2">
                  <span
                    className="text-2xl font-extrabold leading-none text-brand"
                    aria-hidden="true"
                  >
                    1.
                  </span>
                  <h3
                    id="codigo-causa-title"
                    className="pt-0.5 text-[15px] font-bold text-brand"
                  >
                    Digita el código asignado
                  </h3>
                </div>
                <input
                  id="codigo-causa"
                  type="text"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  className="form-input mt-3 bg-surface-light"
                  autoComplete="off"
                />
              </section>

              {/* Paso 2: archivo */}
              <section
                className="mt-4 rounded-xl bg-white p-5 shadow-[0_2px_12px_rgba(0,100,210,0.08)] ring-1 ring-brand/10"
                aria-labelledby="archivo-fuente-causa-title"
              >
                <div className="flex items-start gap-2">
                  <span
                    className="text-2xl font-extrabold leading-none text-brand"
                    aria-hidden="true"
                  >
                    2.
                  </span>
                  <div>
                    <h3
                      id="archivo-fuente-causa-title"
                      className="pt-0.5 text-[15px] font-bold text-brand"
                    >
                      Archivo fuente
                    </h3>
                    <p className="mt-0.5 text-[13px] text-muted">
                      Formatos aceptados: .xlsx, .csv, pdf
                    </p>
                  </div>
                </div>

                <div
                  {...getRootProps()}
                  className={`mt-4 flex min-h-44 flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-8 text-center transition ${
                    isDragActive
                      ? "border-brand bg-brand/5"
                      : "border-brand/60 bg-white"
                  }`}
                >
                  <input {...getInputProps()} />
                  <i
                    className="fa-solid fa-file-arrow-up text-4xl text-brand"
                    aria-hidden="true"
                  />
                  <p className="mt-3 text-sm font-bold text-muted">
                    Arrastra el archivo aquí
                  </p>
                  <p className="mt-0.5 text-xs text-muted">
                    o selecciona desde tu equipo · hasta 20 MB
                  </p>
                </div>

                <div className="mt-5 flex justify-center">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept=".xlsx,.csv,.xls,.pdf"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <span className="inline-flex rounded-lg bg-muted px-8 py-2.5 text-sm font-semibold text-white transition hover:bg-muted-80">
                      Seleccionar archivo
                    </span>
                  </label>
                  <button type="button" onClick={open} className="sr-only">
                    Abrir selector
                  </button>
                </div>

                {selectedFile && (
                  <div className="relative mt-4 flex flex-col gap-2.5 rounded-lg border border-brand/40 bg-white p-3.5">
                    <button
                      type="button"
                      onClick={() => setSelectedFile(null)}
                      className="absolute right-3 top-3 text-muted transition-colors hover:text-risk-red"
                      aria-label={`Quitar ${selectedFile.name}`}
                    >
                      <i
                        className="fa-regular fa-trash-can text-sm"
                        aria-hidden="true"
                      />
                    </button>
                    <div className="flex items-center justify-between gap-3 pr-7">
                      <div className="flex min-w-0 items-center gap-3">
                        <i
                          className="fa-regular fa-file-excel shrink-0 text-3xl text-success"
                          aria-hidden="true"
                        />
                        <div className="flex min-w-0 flex-col">
                          <span className="truncate text-xs font-bold uppercase text-text-secondary">
                            {selectedFile.name}
                          </span>
                          <span className="text-[11px] uppercase text-muted">
                            {getFileTypeLabel(selectedFile.name)} ·{" "}
                            {formatFileSize(selectedFile.size)}
                          </span>
                        </div>
                      </div>
                      <span className="shrink-0 rounded-full bg-success/15 px-4 py-1 text-[11px] font-medium text-success-dark">
                        Cargado
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-surface-light">
                      <div className="h-full w-full rounded-full bg-success" />
                    </div>
                  </div>
                )}
              </section>

              {/* Acciones */}
              <div className="mt-6 flex justify-center gap-4 px-1 pb-1">
                <button
                  type="button"
                  onClick={handleCloseUpload}
                  className="flex w-1/2 items-center justify-center gap-2 rounded-lg bg-muted px-4 py-3 text-xs font-bold text-white hover:bg-muted-80"
                >
                  <i className="fa-solid fa-trash text-xs" aria-hidden="true" />
                  CANCELAR
                </button>
                <button
                  type="button"
                  onClick={handleCargarDocumento}
                  className="flex w-1/2 items-center justify-center gap-2 rounded-lg bg-brand px-4 py-3 text-xs font-bold text-white hover:bg-primary-hover"
                >
                  <i
                    className="fa-solid fa-cloud-arrow-up text-sm"
                    aria-hidden="true"
                  />
                  CARGAR DOCUMENTO
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <SuccessModal
        isOpen={showSuccess}
        onClose={handleCloseSuccess}
        title={"Archivo cargado\ncorrectamente"}
      />
    </>
  );
}
