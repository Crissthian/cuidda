import SuccessModal from "@/components/ui/SuccessModal";
import { useState } from "react";

export type EnviarResultadosData = {
  nombre: string;
  dni: string;
  emo: string;
  vencimiento: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  data: EnviarResultadosData | null;
};

const canales = ["WhatsApp", "Correo electrónico", "SMS"];

const tiposComunicacion = [
  "Enlace seguro con token",
  "Documento PDF adjunto",
  "Notificación de lectura",
];

const labelClass = "mb-1 block text-xs text-text-secondary";
const inputClass = "form-input !py-2.5 text-xs";
const selectClass = "form-select appearance-none !py-2.5 text-xs";

export default function EnviarResultadosModal({
  isOpen,
  onClose,
  data,
}: Props) {
  const [canal, setCanal] = useState("");
  const [tipo, setTipo] = useState("");
  const [destino, setDestino] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const resetForm = () => {
    setCanal("");
    setTipo("");
    setDestino("");
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
          aria-labelledby="modal-enviar-resultados-title"
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
                id="modal-enviar-resultados-title"
                className="text-lg font-bold text-brand"
              >
                Enviar resultados
              </h2>
              <p className="mt-1 text-sm text-text-primary">
                {data?.nombre ?? "Trabajador"} · DNI {data?.dni ?? "—"} ·{" "}
                {data?.emo ?? "Periódico 2026"}
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setShowSuccess(true);
                }}
                className="mt-8 flex flex-col gap-5"
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="canal-envio" className={labelClass}>
                      Canal
                    </label>
                    <div className="form-select-container">
                      <select
                        id="canal-envio"
                        value={canal}
                        onChange={(e) => setCanal(e.target.value)}
                        className={`${selectClass} ${canal ? "text-text-primary" : "text-muted"}`}
                      >
                        <option value="" disabled hidden>
                          Seleccionar
                        </option>
                        {canales.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="tipo-comunicacion" className={labelClass}>
                      Tipo de comunicación
                    </label>
                    <div className="form-select-container">
                      <select
                        id="tipo-comunicacion"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        className={`${selectClass} ${tipo ? "text-text-primary" : "text-muted"}`}
                      >
                        <option value="" disabled hidden>
                          Seleccionar
                        </option>
                        {tiposComunicacion.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="destino-envio" className={labelClass}>
                    Celular / correo de destino
                  </label>
                  <input
                    id="destino-envio"
                    type="text"
                    value={destino}
                    onChange={(e) => setDestino(e.target.value)}
                    className={inputClass}
                    autoComplete="off"
                  />
                </div>

                <p className="text-xs leading-relaxed text-risk-salmon">
                  Enlace único con token seguro, validación por DNI y
                  vencimiento el {data?.vencimiento ?? "2026-12-31"} .
                </p>

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
                    className="flex items-center justify-center gap-2 rounded-lg bg-brand px-8 py-2.5 text-[11px] font-bold text-white hover:bg-primary-hover"
                  >
                    <i
                      className="fa-regular fa-floppy-disk text-[11px]"
                      aria-hidden="true"
                    />
                    ENVIAR
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
        title={"Resultados enviados\ncorrectamente"}
      />
    </>
  );
}
