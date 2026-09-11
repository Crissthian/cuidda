import SuccessModal from "@/components/ui/SuccessModal";
import { responsablesActividad } from "@/lib/programasData";
import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const labelClass = "mb-1 block text-sm text-text-secondary";
const inputClass = "form-input py-2.5 text-sm";
const selectClass = "form-select appearance-none py-2.5 text-sm";

export default function NuevaActividadModal({ isOpen, onClose }: Props) {
  const [actividad, setActividad] = useState("");
  const [responsable, setResponsable] = useState("");
  const [fecha, setFecha] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const resetForm = () => {
    setActividad("");
    setResponsable("");
    setFecha("");
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
          aria-labelledby="modal-nueva-actividad-title"
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
                id="modal-nueva-actividad-title"
                className="text-center text-xl font-bold text-brand"
              >
                Nueva actividad
              </h2>

              <form
                className="mt-6 flex flex-col gap-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  setShowSuccess(true);
                }}
              >
                <div>
                  <label htmlFor="nueva-actividad" className={labelClass}>
                    Actividad
                  </label>
                  <input
                    id="nueva-actividad"
                    type="text"
                    value={actividad}
                    onChange={(e) => setActividad(e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="nueva-actividad-responsable"
                      className={labelClass}
                    >
                      Responsable
                    </label>
                    <div className="form-select-container">
                      <select
                        id="nueva-actividad-responsable"
                        value={responsable}
                        onChange={(e) => setResponsable(e.target.value)}
                        className={`${selectClass} ${responsable ? "text-text-primary" : "text-muted"}`}
                      >
                        <option value="" disabled hidden>
                          Seleccionar
                        </option>
                        {responsablesActividad.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                      <i
                        className="fa-solid fa-chevron-down form-select-icon text-xs"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="nueva-actividad-fecha" className={labelClass}>
                      Fecha programada
                    </label>
                    <div className="relative">
                      <input
                        id="nueva-actividad-fecha"
                        type="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        className={`${inputClass}`}
                        aria-describedby="nueva-actividad-fecha-hint"
                      />
                    </div>
                    <span id="nueva-actividad-fecha-hint" className="sr-only">
                      Formato día, mes, año
                    </span>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
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
                    <i className="fa-solid fa-plus text-[11px]" aria-hidden="true" />
                    AGREGAR
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
        title={"Actividad añadida\ncorrectamente"}
      />
    </>
  );
}
