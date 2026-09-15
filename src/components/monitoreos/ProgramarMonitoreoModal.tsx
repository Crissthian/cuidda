import SuccessModal from "@/components/ui/SuccessModal";
import { inferirTipoAgente, useMonitoreosStore } from "@/lib/monitoreosStore";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const tiposMonitoreo = ["Higiénico", "Psicosocial", "Ergonómico"];

export default function ProgramarMonitoreoModal({ isOpen, onClose }: Props) {
  const [agente, setAgente] = useState("");
  const [tipo, setTipo] = useState("");
  const [area, setArea] = useState("");
  const [fecha, setFecha] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const agregarResultado = useMonitoreosStore(
    (state) => state.agregarResultado,
  );

  const resetForm = () => {
    setAgente("");
    setTipo("");
    setArea("");
    setFecha("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleProgramar = () => {
    if (!agente.trim() || !tipo || !area.trim() || !fecha) {
      toast.error("Complete agente, tipo, área y fecha para programar.");
      return;
    }
    agregarResultado({
      agente: agente.trim(),
      tipo: tipo || inferirTipoAgente(agente),
      area: area.trim(),
      fecha,
      resultado: "Pendiente",
      lmp: "—",
      estado: "PROGRAMADO",
    });
    setShowSuccess(true);
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
          aria-labelledby="modal-programar-title"
          onClick={handleClose}
        >
          <div
            className="relative flex max-h-[95vh] w-full max-w-120 px-4 flex-col overflow-hidden rounded-2xl bg-surface-default shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button top right */}
            <button
              type="button"
              onClick={handleClose}
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
                  id="modal-programar-title"
                  className="text-sm font-bold text-brand"
                >
                  Programa tu monitoreo
                </h2>
              </div>

              {/* Form */}
              <form
                className="mt-8 flex flex-col gap-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleProgramar();
                }}
              >
                <div>
                  <label
                    htmlFor="agente"
                    className="form-label text-xs text-text-primary"
                  >
                    Ingresa agente
                  </label>
                  <input
                    id="agente"
                    type="text"
                    value={agente}
                    onChange={(e) => setAgente(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div>
                  <label
                    htmlFor="tipo"
                    className="form-label text-xs text-text-primary"
                  >
                    Selecciona tipo
                  </label>
                  <div className="form-select-container">
                    <select
                      id="tipo"
                      value={tipo}
                      onChange={(e) => setTipo(e.target.value)}
                      className="form-select appearance-none"
                    >
                      <option value="" />
                      {tiposMonitoreo.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="area"
                    className="form-label text-xs text-text-primary"
                  >
                    Área a evaluar
                  </label>
                  <input
                    id="area"
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div>
                  <label
                    htmlFor="fecha"
                    className="form-label text-xs text-text-primary"
                  >
                    Seleccionar fecha
                  </label>
                  <div className="relative max-w-55">
                    <input
                      id="fecha"
                      type="date"
                      value={fecha}
                      onChange={(e) => setFecha(e.target.value)}
                      placeholder="31-08-2026"
                      className="form-input px-4"
                    />
                  </div>
                </div>

                {/* Acciones */}
                <div className="mx-6 mt-6 flex justify-center gap-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex w-6/12 items-center justify-center gap-2 rounded-lg bg-muted px-8 py-3 text-xs font-bold text-white hover:bg-muted-80"
                  >
                    <i
                      className="fa-solid fa-trash text-xs"
                      aria-hidden="true"
                    />
                    CANCELAR
                  </button>
                  <button
                    type="submit"
                    className="flex w-7/12 items-center justify-center gap-2 rounded-lg bg-brand px-4 py-3 text-xs font-bold text-white hover:bg-primary-hover"
                  >
                    <i
                      className="fa-regular fa-calendar-check text-sm"
                      aria-hidden="true"
                    />
                    PROGRAMAR
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
        title={"Monitoreo programado\ncorrectamente"}
      />
    </>
  );
}
