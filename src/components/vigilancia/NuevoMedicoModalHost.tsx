import SuccessModal from "@/components/ui/SuccessModal";
import { SEDES } from "@/lib/sedes";
import { useEffect, useState } from "react";

function NuevoMedicoModal({ onClose }: { onClose: () => void }) {
  const [nombres, setNombres] = useState("");
  const [dni, setDni] = useState("");
  const [cmp, setCmp] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [sede, setSede] = useState("");
  const [created, setCreated] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (created) {
    return (
      <SuccessModal
        isOpen
        onClose={onClose}
        title={"Médico creado\ncorrectamente"}
      />
    );
  }

  return (
    <div
      className="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px] sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="nuevo-medico-title"
      onClick={onClose}
    >
      <div
        id="modalContainer"
        className="relative flex max-h-[95vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-surface-default shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between gap-4 px-8 py-5">
          <h2
            id="nuevo-medico-title"
            className="text-lg font-bold tracking-tight text-brand"
          >
            Nuevo médico
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 shrink-0 items-center justify-center rounded-full text-brand transition hover:bg-surface-light"
            aria-label="Cerrar modal"
          >
            <i
              className="fa-solid fa-right-from-bracket text-lg"
              aria-hidden="true"
            />
          </button>
        </div>

        <form
          className="flex flex-col gap-5 overflow-y-auto px-8 pb-8"
          onSubmit={(event) => {
            event.preventDefault();
            setCreated(true);
          }}
        >
          <div>
            <label
              htmlFor="med-nombres"
              className="form-label text-sm font-normal text-text-primary"
            >
              Nombres y Apellidos
            </label>
            <input
              id="med-nombres"
              type="text"
              value={nombres}
              onChange={(event) => setNombres(event.target.value)}
              autoComplete="off"
              className="form-input h-10 text-xs"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="med-dni"
                className="form-label text-sm font-normal text-text-primary"
              >
                DNI
              </label>
              <input
                id="med-dni"
                type="text"
                value={dni}
                onChange={(event) => setDni(event.target.value)}
                autoComplete="off"
                inputMode="numeric"
                className="form-input h-10 text-xs"
              />
            </div>
            <div>
              <label
                htmlFor="med-cmp"
                className="form-label text-sm font-normal text-text-primary"
              >
                CMP
              </label>
              <input
                id="med-cmp"
                type="text"
                value={cmp}
                onChange={(event) => setCmp(event.target.value)}
                autoComplete="off"
                inputMode="numeric"
                className="form-input h-10 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="med-especialidad"
                className="form-label text-sm font-normal text-text-primary"
              >
                Especialidad
              </label>
              <input
                id="med-especialidad"
                type="text"
                value={especialidad}
                onChange={(event) => setEspecialidad(event.target.value)}
                autoComplete="off"
                className="form-input h-10 text-xs"
              />
            </div>
            <div>
              <label
                htmlFor="med-sede"
                className="form-label text-sm font-normal text-text-primary"
              >
                Sede
              </label>
              <div className="form-select-container">
                <select
                  id="med-sede"
                  value={sede}
                  onChange={(event) => setSede(event.target.value)}
                  className={`form-select h-10 flex items-center appearance-none text-xs ${sede ? "text-text-primary" : "text-muted"}`}
                >
                  <option value="">Seleccionar</option>
                  {SEDES.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Acciones */}
          <div className="mt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-lg bg-muted px-6 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-muted-80"
            >
              <i className="fa-solid fa-trash text-xs" aria-hidden="true" />
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-primary-hover"
            >
              <i
                className="fa-solid fa-user-doctor text-xs"
                aria-hidden="true"
              />
              Crear médico
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function NuevoMedicoModalHost() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const btn = document.querySelector<HTMLButtonElement>(
      '[data-modal-trigger="nuevo-medico"]',
    );
    if (!btn) return;

    const handler = () => setIsOpen(true);
    btn.addEventListener("click", handler);
    return () => btn.removeEventListener("click", handler);
  }, []);

  return isOpen ? <NuevoMedicoModal onClose={() => setIsOpen(false)} /> : null;
}
