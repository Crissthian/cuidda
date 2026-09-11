import SuccessModal from "@/components/ui/SuccessModal";
import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  trabajadorNombre?: string;
};

const dispositivos = [
  "UME-01 · Lector biométrico",
  "UME-02 · Lector biométrico",
  "Equipo móvil UME",
];

const labelClass = "mb-1 block text-xs text-text-secondary";
const inputClass = "form-input !py-2.5 text-xs";
const selectClass = "form-select appearance-none !py-2.5 text-xs";

function CheckRow({
  checked,
  onToggle,
  label,
  ariaLabel,
}: {
  checked: boolean;
  onToggle: () => void;
  label: string;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={onToggle}
      className="flex items-start gap-2.5 text-left"
    >
      <span
        className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded border ${
          checked
            ? "border-brand bg-brand"
            : "border-muted-30 bg-surface-light"
        }`}
        aria-hidden="true"
      >
        {checked && (
          <i
            className="fa-solid fa-check text-[8px] text-white-custom"
            aria-hidden="true"
          />
        )}
      </span>
      <span className="text-sm leading-relaxed text-text-primary">{label}</span>
    </button>
  );
}

export default function RegistrarLecturaModal({
  isOpen,
  onClose,
  trabajadorNombre = "Trabajador",
}: Props) {
  const [observaciones, setObservaciones] = useState("");
  const [firmaDigital, setFirmaDigital] = useState(false);
  const [bioValidada, setBioValidada] = useState(false);
  const [dispositivo, setDispositivo] = useState("");
  const [explicacion, setExplicacion] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const resetForm = () => {
    setObservaciones("");
    setFirmaDigital(false);
    setBioValidada(false);
    setDispositivo("");
    setExplicacion(false);
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
          aria-labelledby="modal-registrar-lectura-title"
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
                id="modal-registrar-lectura-title"
                className="text-lg font-bold text-brand"
              >
                Registrar lectura presencial
              </h2>
              <p className="mt-1 text-sm text-text-primary">
                {trabajadorNombre} · Unidad Médica Empresarial
              </p>

              <p className="mt-6 text-xs text-muted">
                Médico responsable y fecha/hora se registran automáticamente
                según la sesión.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setShowSuccess(true);
                }}
                className="mt-4 flex flex-col gap-5"
              >
                <div>
                  <label htmlFor="observaciones-lectura" className={labelClass}>
                    Observaciones
                  </label>
                  <textarea
                    id="observaciones-lectura"
                    rows={4}
                    value={observaciones}
                    onChange={(e) => setObservaciones(e.target.value)}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <CheckRow
                  checked={firmaDigital}
                  onToggle={() => setFirmaDigital((v) => !v)}
                  ariaLabel="Firma digital del trabajador registrada"
                  label="Firma digital del trabajador registrado (obligatoria)."
                />

                <section
                  aria-labelledby="huella-title"
                  className="rounded-xl bg-surface-default p-5 shadow-md shadow-border-subtle/30 ring-1 ring-border-subtle/20"
                >
                  <h3
                    id="huella-title"
                    className="flex items-center gap-2 text-sm font-semibold text-text-primary"
                  >
                    <i
                      className="fa-solid fa-fingerprint text-xl text-violet"
                      aria-hidden="true"
                    />
                    Huella dactilar
                  </h3>

                  <div className="mt-3">
                    <CheckRow
                      checked={bioValidada}
                      onToggle={() => setBioValidada((v) => !v)}
                      ariaLabel="Validación biométrica realizada"
                      label="Validación biométrica realizada. Si el lector no está integrado, desmarque para registrar “Validación biométrica pendiente / registro manual autorizado”."
                    />
                  </div>

                  <div className="mt-4">
                    <label htmlFor="dispositivo" className={labelClass}>
                      Dispositivo
                    </label>
                    <div className="form-select-container">
                      <select
                        id="dispositivo"
                        value={dispositivo}
                        onChange={(e) => setDispositivo(e.target.value)}
                        className={`${selectClass} ${dispositivo ? "text-text-primary" : "text-muted"}`}
                      >
                        <option value="" disabled hidden>
                          Seleccionar
                        </option>
                        {dispositivos.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </section>

                <CheckRow
                  checked={explicacion}
                  onToggle={() => setExplicacion((v) => !v)}
                  ariaLabel="El trabajador recibió explicación de resultados"
                  label="El trabajador recibió explicación de resultados y recomendaciones correspondientes."
                />

                <div className="flex justify-center gap-4 pb-2 pt-1">
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
                      className="fa-solid fa-check text-[11px]"
                      aria-hidden="true"
                    />
                    CONFIRMAR LECTURA
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
        title={"Lectura confirmada\ncorrectamente"}
      />
    </>
  );
}
