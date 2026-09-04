import SuccessModal from "@/components/ui/SuccessModal";
import { useMemo, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const fuentes = [
  "Listado recibido",
  "Declaración del contratista",
  "Reporte de cumplimiento",
  "Constancia de EMO",
  "Otro",
];

const labelClass = "mb-1 block text-xs text-text-secondary";
const inputClass = "form-input !py-2.5 text-xs";
const selectClass = "form-select appearance-none !py-2.5 text-xs";

export default function ActualizarCumplimientoModal({
  isOpen,
  onClose,
}: Props) {
  const [reportados, setReportados] = useState("");
  const [emoVigente, setEmoVigente] = useState("");
  const [fuente, setFuente] = useState("");
  const [responsable, setResponsable] = useState("");
  const [vencimiento, setVencimiento] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [validada, setValidada] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const cumplimiento = useMemo(() => {
    const total = Number(reportados);
    const vigentes = Number(emoVigente);
    if (!total || total <= 0 || Number.isNaN(vigentes)) return 0;
    return Math.min(100, Math.round((vigentes / total) * 100));
  }, [reportados, emoVigente]);

  const resetForm = () => {
    setReportados("");
    setEmoVigente("");
    setFuente("");
    setResponsable("");
    setVencimiento("");
    setObservaciones("");
    setValidada(false);
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

  if (!isOpen && !showSuccess) return null;

  return (
    <>
      {isOpen && !showSuccess && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-cumplimiento-title"
          onClick={handleClose}
        >
          <div
            className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-surface-default shadow-xl"
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
                id="modal-cumplimiento-title"
                className="text-lg font-bold text-brand"
              >
                Actualizar cumplimiento
              </h2>
              <p className="mt-1 text-xs text-text-secondary">
                La actualización se agrega al historial sin borrar registros
                previos.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setShowSuccess(true);
                }}
                className="mt-6 flex flex-col gap-4"
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="reportados" className={labelClass}>
                      Trabajadores reportados
                    </label>
                    <input
                      id="reportados"
                      type="number"
                      min={0}
                      value={reportados}
                      onChange={(e) => setReportados(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="emo" className={labelClass}>
                      Trabajadores con EMO vigente
                    </label>
                    <input
                      id="emo"
                      type="number"
                      min={0}
                      value={emoVigente}
                      onChange={(e) => setEmoVigente(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="fuente" className={labelClass}>
                    Trabajadores reportados
                  </label>
                  <div className="form-select-container">
                    <select
                      id="fuente"
                      value={fuente}
                      onChange={(e) => setFuente(e.target.value)}
                      className={`${selectClass} ${fuente ? "text-text-primary" : "text-muted"}`}
                    >
                      <option value="" disabled hidden>
                        Seleccionar
                      </option>
                      {fuentes.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="responsable" className={labelClass}>
                      Responsable que informó
                    </label>
                    <input
                      id="responsable"
                      type="text"
                      value={responsable}
                      onChange={(e) => setResponsable(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="vencimiento" className={labelClass}>
                      Próximo vencimiento
                    </label>
                    <div className="relative">
                      <i
                        className="fa-regular fa-calendar pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted"
                        aria-hidden="true"
                      />
                      <input
                        id="vencimiento"
                        type="date"
                        value={vencimiento}
                        onChange={(e) => setVencimiento(e.target.value)}
                        className={`${inputClass} pl-9`}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="observaciones" className={labelClass}>
                    Observaciones
                  </label>
                  <textarea
                    id="observaciones"
                    rows={3}
                    value={observaciones}
                    onChange={(e) => setObservaciones(e.target.value)}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="button"
                  role="checkbox"
                  aria-checked={validada}
                  onClick={() => setValidada((v) => !v)}
                  className="flex items-center gap-2 text-xs text-text-secondary"
                >
                  <span
                    className={`flex size-4 items-center justify-center rounded border ${
                      validada
                        ? "border-brand bg-brand"
                        : "border-muted-30 bg-surface-light"
                    }`}
                  >
                    {validada && (
                      <i
                        className="fa-solid fa-check text-[8px] text-white-custom"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                  Información validada por la empresa
                </button>

                <div className="flex items-center gap-2 rounded-lg bg-risk-salmon/15 px-4 py-2.5 text-xs font-semibold text-risk-salmon">
                  <i className="fa-solid fa-users text-sm" aria-hidden="true" />
                  Cumplimiento calculado:
                  <span className="text-base font-bold">{cumplimiento}%</span>
                </div>

                <p className="text-[11px] text-muted">
                  Fecha de actualización: 2026-09-02
                </p>

                <div className="flex justify-end gap-3 pb-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex items-center justify-center gap-2 rounded-lg bg-muted px-6 py-2.5 text-[11px] font-bold text-white hover:bg-muted-80"
                  >
                    <i
                      className="fa-solid fa-trash text-[11px]"
                      aria-hidden="true"
                    />
                    CANCELAR
                  </button>
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-2.5 text-[11px] font-bold text-white hover:bg-primary-hover"
                  >
                    <i
                      className="fa-regular fa-file-lines text-[11px]"
                      aria-hidden="true"
                    />
                    CARGAR ACTUALIZACIÓN
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
        title={"Actualización cargada\ncorrectamente"}
      />
    </>
  );
}
