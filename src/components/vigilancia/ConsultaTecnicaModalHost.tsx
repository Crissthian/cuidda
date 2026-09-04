import { useEffect, useState } from "react";

function NuevaConsultaModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (sent) {
    return (
      <div
        className="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px] sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="consulta-enviada-title"
        onClick={onClose}
      >
        <div
          id="modalContainer"
          className="flex w-full max-w-105 flex-col items-center gap-3 rounded-2xl bg-surface-default px-10 py-12 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <span
            className="flex size-16 items-center justify-center rounded-full border-[3px] border-success"
            aria-hidden="true"
          >
            <i className="fa-solid fa-check text-2xl text-success" />
          </span>
          <h2
            id="consulta-enviada-title"
            className="text-center text-[15px] font-semibold leading-tight text-brand"
          >
            Consulta enviada correctamente
          </h2>
          <p className="text-center text-xs leading-snug text-muted">
            La consulta CT-2026-008 quedó en estado de Pendiente.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="modal-overlay fixed inset-0 z-50 flex justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-[2px] items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="nueva-consulta-title"
      onClick={onClose}
    >
      <div
        id="modalContainer"
        className="my-4 flex w-full max-w-180 flex-col h-10/12 overflow-hidden rounded-2xl bg-surface-default shadow-xl px-4"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header — fijo, no scrollea */}
        <div className="flex shrink-0 items-center justify-between gap-4 px-8 py-4">
          <h2
            id="nueva-consulta-title"
            className="text-sm font-bold tracking-tight text-brand"
          >
            Nueva consulta técnica
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 shrink-0 items-center justify-center rounded-full text-brand transition hover:bg-surface-light"
            aria-label="Cerrar modal"
          >
            <i
              className="fa-solid fa-right-from-bracket text-[15px]"
              aria-hidden="true"
            />
          </button>
        </div>

        <form
          className="flex flex-1 flex-col gap-6 overflow-y-auto px-8"
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
          }}
        >
          {/* Datos personales */}
          <section className="flex flex-col gap-3">
            <h3 className="text-xs font-bold tracking-wide text-text-primary">
              Datos personales
            </h3>
            <div className="grid grid-cols-12 gap-4">
              <label className="col-span-12 flex flex-col gap-1.5 sm:col-span-5">
                <span className="text-[11px] font-medium text-text-secondary">
                  Apellidos
                </span>
                <input
                  className="h-8 rounded-lg border-0 bg-surface-light px-3.5 text-xs text-text-primary outline-none placeholder:text-muted/60 focus:ring-1 focus:ring-brand"
                  placeholder=""
                />
              </label>
              <label className="col-span-6 flex flex-col gap-1.5 sm:col-span-4">
                <span className="text-[11px] font-medium text-text-secondary">
                  Tipo de documento
                </span>
                <div className="relative">
                  <select
                    defaultValue=""
                    className="flex h-8 w-full items-center rounded-lg border-0 bg-surface-light px-3.5 text-xs text-muted outline-none focus:ring-1 focus:ring-brand"
                  >
                    <option value="" disabled>
                      Seleccionar
                    </option>
                    <option>DNI</option>
                    <option>CE</option>
                    <option>Pasaporte</option>
                  </select>
                </div>
              </label>
              <label className="col-span-6 flex flex-col gap-1.5 sm:col-span-3">
                <span className="text-[11px] font-medium text-text-secondary">
                  N° de documento
                </span>
                <input
                  className="h-8 rounded-lg border-0 bg-surface-light px-3.5 text-xs text-text-primary outline-none placeholder:text-muted/60 focus:ring-1 focus:ring-brand"
                  placeholder=""
                />
              </label>
              <label className="col-span-12 flex flex-col gap-1.5 sm:col-span-6">
                <span className="text-[11px] font-medium text-text-secondary">
                  Empresa
                </span>
                <input
                  className="h-8 rounded-lg border-0 bg-surface-light px-3.5 text-xs text-text-primary outline-none placeholder:text-muted/60 focus:ring-1 focus:ring-brand"
                  placeholder=""
                />
              </label>
              <label className="col-span-12 flex flex-col gap-1.5 sm:col-span-6">
                <span className="text-[11px] font-medium text-text-secondary">
                  Puesto
                </span>
                <input
                  className="h-8 rounded-lg border-0 bg-surface-light px-3.5 text-xs text-text-primary outline-none placeholder:text-muted/60 focus:ring-1 focus:ring-brand"
                  placeholder=""
                />
              </label>
            </div>
          </section>

          {/* Datos de la consulta */}
          <section className="flex flex-col gap-3">
            <h3 className="text-xs font-bold tracking-wide text-text-primary">
              Datos de la consulta
            </h3>
            <div className="grid grid-cols-12 gap-4">
              <label className="col-span-12 flex flex-col gap-1.5 sm:col-span-4">
                <span className="text-[11px] font-medium text-text-secondary">
                  Especialidad
                </span>
                <div className="relative">
                  <select
                    defaultValue=""
                    className="flex h-8 w-full items-center appearance-none rounded-lg border-0 bg-surface-light px-3.5 text-xs text-muted outline-none focus:ring-1 focus:ring-brand"
                  >
                    <option value="" disabled>
                      Seleccionar
                    </option>
                    <option>Neumología</option>
                    <option>Otorrinolaringología</option>
                    <option>Cardiología</option>
                    <option>Dermatología</option>
                  </select>
                </div>
              </label>
              <label className="col-span-12 flex flex-col gap-1.5 sm:col-span-8">
                <span className="text-[11px] font-medium text-text-secondary">
                  Motivo de consulta
                </span>
                <input
                  className="h-8 rounded-lg border-0 bg-surface-light px-3.5 text-xs text-text-primary outline-none placeholder:text-muted/60 focus:ring-1 focus:ring-brand"
                  placeholder=""
                />
              </label>
            </div>
          </section>

          <section className="flex flex-col gap-2">
            <div>
              <p className="text-xs font-semibold text-brand">
                ¿Qué desea consultar al especialista?
              </p>
              <p className="mt-0.5 text-[11px] leading-snug text-muted">
                Formula tu pregunta con el contexto clínico y ocupacional
                necesario.
              </p>
            </div>
            <textarea
              rows={6}
              className="max-h-26 w-full resize-none rounded-lg border-0 bg-surface-light p-3.5 text-xs leading-relaxed text-text-primary outline-none placeholder:text-muted/60 focus:ring-1 focus:ring-brand"
              placeholder=""
            />
          </section>

          {/* Documentos */}
          <section className="flex flex-col gap-2">
            <div>
              <h3 className="text-xs font-bold tracking-wide text-text-primary">
                Documentos
              </h3>
              <p className="mt-0.5 text-[11px] text-muted">
                Adjunta evidencia del caso (PDF, JPG o PNG).
              </p>
            </div>
            <label className="flex w-full max-w-50 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-[#8fb8e6] bg-surface-light/40 px-4 py-7 text-center transition hover:bg-surface-light">
              <input
                type="file"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) setFileName(f.name);
                }}
              />
              <i
                className="fa-solid fa-file-circle-plus text-lg text-brand"
                aria-hidden="true"
              />
              <span className="max-w-full truncate text-[11px] font-semibold text-text-secondary">
                {fileName ? fileName : "Anexar documento"}
              </span>
              <span className="text-[11px] text-muted/70">
                JPG, PNG (10KB max)
              </span>
            </label>
          </section>

          {/* Acciones — barra fija visual al pie del scroll */}
          <div className="-mx-8 -mb-6 flex shrink-0 justify-end gap-3 border-t border-border-subtle/20 bg-surface-default px-8 py-4">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#9aa3b8] px-5 py-2.5 text-[11px] font-bold uppercase tracking-wide text-white transition hover:bg-[#8a94ad]"
            >
              <i className="fa-solid fa-trash text-[11px]" aria-hidden="true" />
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-5 py-2.5 text-[11px] font-bold uppercase tracking-wide text-white transition hover:bg-primary-hover"
            >
              <i
                className="fa-solid fa-envelope text-[11px]"
                aria-hidden="true"
              />
              Enviar consulta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ConsultaTecnicaModalHost() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const button = document.querySelector<HTMLButtonElement>(
      '[data-modal-trigger="nueva-consulta"]',
    );
    if (!button) return;

    const handleClick = () => setIsOpen(true);
    button.addEventListener("click", handleClick);
    return () => button.removeEventListener("click", handleClick);
  }, []);

  return isOpen ? (
    <NuevaConsultaModal onClose={() => setIsOpen(false)} />
  ) : null;
}
