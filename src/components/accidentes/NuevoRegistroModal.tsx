import SuccessModal from "@/components/ui/SuccessModal";
import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const tiposRegistro = ["Accidente", "Incidente", "Enf. ocupacional"];

export default function NuevoRegistroModal({ isOpen, onClose }: Props) {
  const [tipo, setTipo] = useState("");
  const [fecha, setFecha] = useState("");
  const [trabajador, setTrabajador] = useState("");
  const [area, setArea] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const codigoAsignado =
    tipo === "Accidente"
      ? "ACC-2026-014"
      : tipo === "Incidente"
        ? "INC-2026-058"
        : tipo === "Enf. ocupacional"
          ? "EO-2026-003"
          : "ACC-2026-014";

  const resetForm = () => {
    setTipo("");
    setFecha("");
    setTrabajador("");
    setArea("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleRegistrar = () => {
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
          aria-labelledby="modal-registro-title"
          onClick={handleClose}
        >
          <div
            className="relative flex max-h-[90vh] w-full max-w-120 flex-col overflow-hidden rounded-2xl bg-white shadow-xl"
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
                  id="modal-registro-title"
                  className="text-xl font-bold text-brand"
                >
                  Registro de accidente / incidente
                </h2>
              </div>

              {/* Form */}
              <form
                className="mt-8 flex flex-col gap-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleRegistrar();
                }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="tipo" className="form-label">
                      Selecciona tipo de registro
                    </label>
                    <div className="form-select-container">
                      <select
                        id="tipo"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        className="form-select appearance-none"
                      >
                        <option value="" disabled hidden />
                        {tiposRegistro.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="codigo" className="form-label">
                      Código asignado
                    </label>
                    <input
                      id="codigo"
                      type="text"
                      value={codigoAsignado}
                      readOnly
                      className="form-input bg-brand/15 text-start font-bold text-brand"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="fecha" className="form-label">
                    Seleccionar fecha del evento
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

                <div>
                  <label htmlFor="trabajador" className="form-label">
                    Nombre del trabajador
                  </label>
                  <input
                    id="trabajador"
                    type="text"
                    value={trabajador}
                    onChange={(e) => setTrabajador(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div>
                  <label htmlFor="area" className="form-label">
                    Área
                  </label>
                  <input
                    id="area"
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="form-input"
                  />
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
                      className="fa-regular fa-square-check text-sm"
                      aria-hidden="true"
                    />
                    REGISTRAR
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
        title={"Registro cargado\ncorrectamente"}
      />
    </>
  );
}
