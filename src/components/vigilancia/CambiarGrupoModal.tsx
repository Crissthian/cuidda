import SuccessModal from "@/components/ui/SuccessModal";
import type { Grupo } from "@/lib/estratificacionData";
import { useEstratificacionStore } from "@/lib/estratificacionStore";
import { useEffect, useState, type FormEvent } from "react";

type Trabajador = {
  id: number;
  nombre: string;
  cargo: string;
  sede: string;
  grupo: Grupo;
};

type Props = {
  trabajador: Trabajador | null;
  onClose: () => void;
};

const badgeMap: Record<Grupo, string> = {
  G1: "bg-success/15 text-success-dark",
  G2: "bg-risk-salmon/15 text-risk-salmon",
  G3: "bg-risk-red/10 text-risk-red",
};

const dotMap: Record<Grupo, string> = {
  G1: "bg-success",
  G2: "bg-risk-salmon",
  G3: "bg-risk-red",
};

const gruposDisponibles: Grupo[] = ["G1", "G2", "G3"];

export default function CambiarGrupoModal({ trabajador, onClose }: Props) {
  const [nuevoGrupo, setNuevoGrupo] = useState("");
  const [justificacion, setJustificacion] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const cambiarGrupo = useEstratificacionStore((state) => state.cambiarGrupo);

  const isOpen = trabajador !== null;

  useEffect(() => {
    if (isOpen) {
      setNuevoGrupo("");
      setJustificacion("");
      setShowSuccess(false);
    }
  }, [isOpen, trabajador?.nombre]);

  if (!isOpen && !showSuccess) return null;

  const grupoActual = trabajador?.grupo;
  const isInvalid = nuevoGrupo === "" || nuevoGrupo === grupoActual;

  const resetAndClose = () => {
    setNuevoGrupo("");
    setJustificacion("");
    setShowSuccess(false);
    onClose();
  };

  const handleGuardar = (e: FormEvent) => {
    e.preventDefault();
    if (!trabajador || isInvalid) return;

    cambiarGrupo({
      trabajadorId: trabajador.id,
      nuevoGrupo: nuevoGrupo as Grupo,
      justificacion,
    });
    setShowSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setNuevoGrupo("");
    setJustificacion("");
    onClose();
  };

  return (
    <>
      {isOpen && !showSuccess && trabajador && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-cambiar-grupo-title"
          onClick={resetAndClose}
        >
          <div
            className="relative flex max-h-[95vh] w-full max-w-125 flex-col overflow-hidden rounded-2xl bg-surface-default shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={resetAndClose}
              className="absolute right-6 top-6 flex size-8 items-center justify-center rounded-full text-brand hover:bg-surface-light"
              aria-label="Cerrar modal"
            >
              <i
                className="fa-solid fa-right-from-bracket text-lg"
                aria-hidden="true"
              />
            </button>

            <div className="overflow-y-auto px-8 py-8">
              <h2
                id="modal-cambiar-grupo-title"
                className="text-xl font-bold text-brand"
              >
                Cambiar grupo de trabajador
              </h2>
              <p className="mt-1 text-sm text-accent-muted">
                {trabajador.nombre} • {trabajador.cargo} • {trabajador.sede}
              </p>

              <form onSubmit={handleGuardar} className="mt-6 flex flex-col">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-text-primary">
                    Grupo actual:
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold leading-none ${badgeMap[trabajador.grupo]}`}
                  >
                    <span
                      className={`size-2 rounded-full ${dotMap[trabajador.grupo]}`}
                      aria-hidden="true"
                    />
                    {trabajador.grupo}
                  </span>
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="cambiar-grupo-nuevo"
                    className="mb-2 block text-sm text-text-primary"
                  >
                    Nuevo grupo
                  </label>
                  <div className="relative">
                    <select
                      id="cambiar-grupo-nuevo"
                      value={nuevoGrupo}
                      onChange={(e) => setNuevoGrupo(e.target.value)}
                      className="form-input w-full appearance-none bg-surface-light px-4 py-3 text-sm text-text-secondary outline-none"
                    >
                      <option value="">Seleccionar</option>
                      {gruposDisponibles.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>
                  {isInvalid && (
                    <p className="mt-2 text-xs text-warning">
                      Seleccione un grupo distinto al actual para poder guardar.
                    </p>
                  )}
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="cambiar-grupo-justificacion"
                    className="mb-2 block text-sm text-text-primary"
                  >
                    Justificación del cambio
                  </label>
                  <textarea
                    id="cambiar-grupo-justificacion"
                    rows={2}
                    value={justificacion}
                    onChange={(e) => setJustificacion(e.target.value)}
                    className="form-input resize-none bg-surface-light px-4 py-3 text-sm"
                  />
                </div>

                <div className="mt-8 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={resetAndClose}
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
                      className="fa-regular fa-floppy-disk text-[11px]"
                      aria-hidden="true"
                    />
                    GUARDAR CAMBIO
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
        title={"Grupo actualizado\ncorrectamente"}
      />
    </>
  );
}
