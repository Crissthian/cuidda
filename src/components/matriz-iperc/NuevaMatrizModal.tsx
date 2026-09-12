import SuccessModal from "@/components/ui/SuccessModal";
import { sedesMatrizIperc } from "@/lib/matrizData";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function NuevaMatrizModal({ isOpen, onClose }: Props) {
  const [sede, setSede] = useState("");
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
    maxSize: 10 * 1024 * 1024,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".xls"],
    },
  });

  const extension = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.endsWith(".csv")) return "CSV";
    if (lower.endsWith(".xls")) return "XLS";
    return "XLSX";
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleCargarDocumento = () => {
    setShowSuccess(true);
  };

  const resetAll = () => {
    setSede("");
    setSelectedFile(null);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    resetAll();
    onClose();
  };

  const handleCloseUpload = () => {
    resetAll();
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
          aria-labelledby="modal-matriz-title"
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

            <div className="overflow-y-auto px-8 py-8">
              {/* Header */}
              <div className="text-center">
                <h2
                  id="modal-matriz-title"
                  className="text-xl font-bold text-brand"
                >
                  Carga de matriz IPERC
                </h2>
              </div>

              {/* Paso 1: selección de sede */}
              <section
                className="mt-4 rounded-xl bg-surface-default p-5 shadow-md shadow-border-subtle/30 ring-1 ring-border-subtle/20"
                aria-labelledby="paso1-matriz-title"
              >
                <h3
                  id="paso1-matriz-title"
                  className="flex flex-wrap items-baseline gap-1 text-sm text-text-secondary"
                >
                  <span className="mr-1 text-2xl font-bold text-brand">1.</span>
                  <span className="font-bold text-brand">
                    Selecciona la sede
                  </span>
                </h3>

                <div className="form-select-container mt-4">
                  <select
                    id="sede-matriz"
                    value={sede}
                    onChange={(e) => setSede(e.target.value)}
                    className={`form-select appearance-none ${sede ? "text-text-primary" : "text-muted"}`}
                  >
                    <option value="" disabled hidden>
                      Seleccionar
                    </option>
                    {sedesMatrizIperc.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </section>

              {/* Paso 2: archivo fuente */}
              <section
                className="mt-4 rounded-xl bg-surface-default p-5 shadow-md shadow-border-subtle/30 ring-1 ring-border-subtle/20"
                aria-labelledby="paso2-matriz-title"
              >
                <h3
                  id="paso2-matriz-title"
                  className="flex flex-wrap items-baseline gap-1 text-sm text-text-secondary"
                >
                  <span className="mr-1 text-2xl font-bold text-brand">2.</span>
                  <span className="font-bold text-brand">Archivo fuente</span>
                </h3>
                <p className="ml-7 text-xs text-muted">
                  Formatos aceptados: .xlsx, .csv
                </p>

                <div
                  {...getRootProps()}
                  className={`mt-4 flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 text-center transition border-brand/60 bg-surface-default ${
                    isDragActive
                      ? "border-brand bg-brand/5"
                      : "border-brand/60 bg-surface-default"
                  }`}
                >
                  <input {...getInputProps()} />
                  <i
                    className="fa-solid fa-file-arrow-up text-3xl text-brand"
                    aria-hidden="true"
                  />
                  <p className="mt-3 text-sm font-semibold text-muted">
                    Arrastra el archivo aquí
                  </p>
                  <p className="text-xs text-muted">
                    o selecciona desde tu equipo · hasta 10 MB
                  </p>
                </div>

                <div className="mt-4 flex justify-center">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept=".xlsx,.csv,.xls"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <span className="flex rounded-lg bg-muted px-6 py-2 text-xs font-bold text-white hover:bg-muted-80">
                      Seleccionar archivo
                    </span>
                  </label>
                  <button type="button" onClick={open} className="sr-only">
                    Abrir selector
                  </button>
                </div>

                {selectedFile && (
                  <div className="relative mt-4 flex flex-col gap-2 rounded-lg border border-brand/30 bg-surface-light p-4">
                    <button
                      type="button"
                      onClick={() => setSelectedFile(null)}
                      className="absolute right-3 top-3 text-muted transition-colors hover:text-risk-red"
                      aria-label={`Quitar ${selectedFile.name}`}
                    >
                      <i
                        className="fa-regular fa-trash-can text-xs"
                        aria-hidden="true"
                      />
                    </button>
                    <div className="flex items-center justify-between gap-3 pr-6">
                      <div className="flex items-center gap-3">
                        <i
                          className="fa-regular fa-file-excel text-2xl text-success"
                          aria-hidden="true"
                        />
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-text-secondary">
                            {selectedFile.name}
                          </span>
                          <span className="text-[11px] text-muted">
                            {extension(selectedFile.name)} ·{" "}
                            {(selectedFile.size / 1024).toFixed(0)} KB
                          </span>
                        </div>
                      </div>
                      <span className="rounded-full bg-success/15 px-3 py-1 text-[10px] font-bold text-success-dark">
                        Cargado
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-light">
                      <div className="h-full w-full rounded-full bg-success" />
                    </div>
                  </div>
                )}
              </section>

              {/* Acciones */}
              {selectedFile && (
                <div className="mx-6 mt-6 flex justify-center gap-4">
                  <button
                    type="button"
                    onClick={handleCloseUpload}
                    className="flex w-6/12 items-center justify-center gap-2 rounded-lg bg-muted px-8 py-3 text-xs font-bold text-white hover:bg-muted-80"
                  >
                    <i
                      className="fa-solid fa-trash text-xs"
                      aria-hidden="true"
                    />
                    CANCELAR
                  </button>
                  <button
                    type="button"
                    onClick={handleCargarDocumento}
                    className="flex w-7/12 items-center justify-center gap-2 rounded-lg bg-brand px-4 py-3 text-xs font-bold text-white hover:bg-primary-hover"
                  >
                    <i
                      className="fa-solid fa-cloud-arrow-up text-xs"
                      aria-hidden="true"
                    />
                    CARGAR DOCUMENTO
                  </button>
                </div>
              )}
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
