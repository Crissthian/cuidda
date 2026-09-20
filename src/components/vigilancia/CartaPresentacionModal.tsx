import { SEDES } from "@/lib/sedes";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const labelClass = "mb-1.5 block text-[15px] text-text-primary";
const inputClass = "form-input rounded-lg! bg-surface-light! py-3! text-sm";

export default function CartaPresentacionModal({ isOpen, onClose }: Props) {
  const [sede, setSede] = useState("");
  const [vencimiento, setVencimiento] = useState("");
  const [autoridad, setAutoridad] = useState("");
  const [cargo, setCargo] = useState("");
  const [entidad, setEntidad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [asunto, setAsunto] = useState("");

  if (!isOpen) return null;

  const resetForm = () => {
    setSede("");
    setVencimiento("");
    setAutoridad("");
    setCargo("");
    setEntidad("");
    setDireccion("");
    setAsunto("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleDescargarDocx = () => {
    toast.success("Carta de presentación DOCX generada.");
    handleClose();
  };

  const handleGenerarPdf = () => {
    toast.success("Carta de presentación PDF generada.");
    handleClose();
  };

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-carta-presentacion-title"
      onClick={handleClose}
    >
      <div
        className="relative flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-surface-default shadow-xl"
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

        <div className="overflow-y-auto px-8 py-6 sm:px-10 sm:py-8">
          <h2
            id="modal-carta-presentacion-title"
            className="text-xl font-bold text-brand"
          >
            Carta de presentación
          </h2>
          <p className="mt-1 text-[15px] text-accent-muted">
            La autoridad destinataria y la dirección pueden variar según la
            jurisdicción.
          </p>

          <form
            className="mt-8 flex flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              handleGenerarPdf();
            }}
          >
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-3">
              <div>
                <label htmlFor="carta-sede" className={labelClass}>
                  Sede
                </label>
                <div className="form-select-container">
                  <select
                    id="carta-sede"
                    value={sede}
                    onChange={(e) => setSede(e.target.value)}
                    className={`form-select appearance-none rounded-lg! bg-surface-light! py-3! pr-10 text-sm ${sede ? "text-text-primary" : "text-muted"}`}
                  >
                    <option value="">Seleccionar</option>
                    {SEDES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <i
                    className="fa-solid fa-chevron-down form-select-icon text-sm"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="carta-vencimiento" className={labelClass}>
                  Próximo vencimiento
                </label>
                <input
                  id="carta-vencimiento"
                  type="date"
                  value={vencimiento}
                  onChange={(e) => setVencimiento(e.target.value)}
                  className={`${inputClass} [&::-webkit-calendar-picker-indicator]:cursor-pointer`}
                />
              </div>

              <div>
                <label htmlFor="carta-autoridad" className={labelClass}>
                  Autoridad destinataria
                </label>
                <input
                  id="carta-autoridad"
                  type="text"
                  value={autoridad}
                  onChange={(e) => setAutoridad(e.target.value)}
                  className={inputClass}
                  autoComplete="off"
                />
              </div>

              <div>
                <label htmlFor="carta-cargo" className={labelClass}>
                  Cargo
                </label>
                <input
                  id="carta-cargo"
                  type="text"
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                  className={inputClass}
                  autoComplete="off"
                />
              </div>

              <div>
                <label htmlFor="carta-entidad" className={labelClass}>
                  Entidad
                </label>
                <input
                  id="carta-entidad"
                  type="text"
                  value={entidad}
                  onChange={(e) => setEntidad(e.target.value)}
                  className={inputClass}
                  autoComplete="off"
                />
              </div>

              <div>
                <label htmlFor="carta-direccion" className={labelClass}>
                  Dirección
                </label>
                <input
                  id="carta-direccion"
                  type="text"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  className={inputClass}
                  autoComplete="off"
                />
              </div>
            </div>

            <div>
              <label htmlFor="carta-asunto" className={labelClass}>
                Asunto
              </label>
              <input
                id="carta-asunto"
                type="text"
                value={asunto}
                onChange={(e) => setAsunto(e.target.value)}
                className={inputClass}
                autoComplete="off"
              />
            </div>

            <div className="mt-4 flex flex-col justify-end gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleDescargarDocx}
                className="flex items-center justify-center gap-2 rounded-lg bg-muted px-6 py-3 text-xs font-bold text-white transition hover:bg-muted-80"
              >
                <i
                  className="fa-solid fa-file-word text-sm"
                  aria-hidden="true"
                />
                DESCARGAR DOCX
              </button>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3 text-xs font-bold text-white transition hover:bg-primary-hover"
              >
                <i
                  className="fa-solid fa-file-pdf text-sm"
                  aria-hidden="true"
                />
                GENERAR PDF
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
