import SuccessModal from "@/components/ui/SuccessModal";
import { useCapacitacionesStore } from "@/lib/capacitacionesStore";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const modalidades = ["Presencial", "Virtual", "Mixta"];
const gruposObjetivo = [
  "G1",
  "G2",
  "G3",
  "G1 - G2",
  "G2 - G3",
  "G1 - G3",
  "Todos",
];

export default function ProgramarCapacitacionModal({ isOpen, onClose }: Props) {
  const [tema, setTema] = useState("");
  const [modalidad, setModalidad] = useState("");
  const [grupo, setGrupo] = useState("");
  const [fecha, setFecha] = useState("");
  const [referencial, setReferencial] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const agregarCapacitacion = useCapacitacionesStore(
    (state) => state.agregarCapacitacion,
  );

  const resetForm = () => {
    setTema("");
    setModalidad("");
    setGrupo("");
    setFecha("");
    setReferencial("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleProgramar = () => {
    if (!tema.trim()) {
      toast.error("Ingrese el tema de la capacitación.");
      return;
    }
    if (!modalidad) {
      toast.error("Seleccione la modalidad.");
      return;
    }
    if (!grupo) {
      toast.error("Seleccione el grupo objetivo.");
      return;
    }
    if (!fecha) {
      toast.error("Seleccione la fecha de la capacitación.");
      return;
    }

    agregarCapacitacion({
      tema: tema.trim(),
      modalidad,
      grupo,
      fecha,
      referencial,
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
          aria-labelledby="modal-capacitacion-title"
          onClick={handleClose}
        >
          <div
            className="relative flex max-h-[95vh] w-full max-w-125 flex-col overflow-hidden rounded-2xl bg-surface-default shadow-xl"
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
                  id="modal-capacitacion-title"
                  className="text-xl font-bold text-brand"
                >
                  Programa tu capacitación
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
                    htmlFor="tema"
                    className="form-label text-sm text-text-primary font-normal"
                  >
                    Ingresar tema
                  </label>
                  <input
                    id="tema"
                    type="text"
                    value={tema}
                    onChange={(e) => setTema(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div>
                  <label
                    htmlFor="modalidad"
                    className="form-label text-sm text-text-primary font-normal"
                  >
                    Selecciona modalidad
                  </label>
                  <div className="form-select-container">
                    <select
                      id="modalidad"
                      value={modalidad}
                      onChange={(e) => setModalidad(e.target.value)}
                      className="form-select appearance-none"
                    >
                      <option value="" disabled hidden />
                      {modalidades.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="grupo"
                    className="form-label text-sm text-text-primary font-normal"
                  >
                    Selecciona grupo objetivo
                  </label>
                  <div className="form-select-container">
                    <select
                      id="grupo"
                      value={grupo}
                      onChange={(e) => setGrupo(e.target.value)}
                      className="form-select appearance-none"
                    >
                      <option value="" disabled hidden />
                      {gruposObjetivo.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex gap-2 justify-between">
                  <div className="flex-1">
                    <label
                      htmlFor="fecha"
                      className="form-label text-sm text-text-primary font-normal"
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
                        className="form-input w-10/12"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="referencial"
                      className="form-label text-sm text-text-primary font-normal"
                    >
                      N° referencial de asistencia
                    </label>
                    <div className="relative max-w-55">
                      <input
                        id="referencial"
                        type="number"
                        min={0}
                        value={referencial}
                        onChange={(e) => setReferencial(e.target.value)}
                        placeholder="0000"
                        className="form-input w-10/12"
                      />
                    </div>
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
        title={"Capacitación programada\ncorrectamente"}
      />
    </>
  );
}
