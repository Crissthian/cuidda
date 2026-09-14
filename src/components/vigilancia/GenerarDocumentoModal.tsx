import SuccessModal from "@/components/ui/SuccessModal";
import { empresasMock } from "@/lib/admisionData";
import { infoIncorporarOpciones } from "@/lib/generarDocumentoData";
import { YEARS } from "@/lib/periodos";
import { SEDES } from "@/lib/sedes";
import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function GenerarDocumentoModal({ isOpen, onClose }: Props) {
  const [periodo, setPeriodo] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [sede, setSede] = useState("");
  const [infoSeleccionada, setInfoSeleccionada] = useState<string[]>([]);
  const [objetivo, setObjetivo] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const toggleInfo = (id: string) => {
    setInfoSeleccionada((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const resetForm = () => {
    setPeriodo("");
    setEmpresa("");
    setSede("");
    setInfoSeleccionada([]);
    setObjetivo("");
  };

  const handleGenerar = () => {
    setShowSuccess(true);
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
          aria-labelledby="modal-generar-documento-title"
          onClick={handleClose}
        >
          <div
            className="relative flex max-h-[95vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-surface-default shadow-xl"
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
                id="modal-generar-documento-title"
                className="text-lg font-bold text-brand"
              >
                Generar documento personalizado
              </h2>
              <p className="mt-1 text-sm text-accent-muted">
                La IA redacta el documento utilizando exclusivamente la
                información seleccionada.
              </p>

              <form
                className="mt-6 flex flex-col gap-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleGenerar();
                }}
              >
                {/* Paso 1: filtros de alcance */}
                <section
                  aria-labelledby="paso1-generar-documento-title"
                  className="grid grid-cols-1 gap-4 sm:grid-cols-3"
                >
                  <h3 id="paso1-generar-documento-title" className="sr-only">
                    Alcance del documento
                  </h3>
                  <div>
                    <label
                      htmlFor="doc-periodo"
                      className="mb-1 block text-xs text-text-secondary"
                    >
                      Periodo
                    </label>
                    <div className="form-select-container">
                      <select
                        id="doc-periodo"
                        value={periodo}
                        onChange={(e) => setPeriodo(e.target.value)}
                        className={`form-select appearance-none py-2.5 text-xs ${periodo ? "text-text-primary" : "text-muted"}`}
                      >
                        <option value="">Seleccionar</option>
                        {YEARS.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="doc-empresa"
                      className="mb-1 block text-xs text-text-secondary"
                    >
                      Empresa
                    </label>
                    <div className="form-select-container">
                      <select
                        id="doc-empresa"
                        value={empresa}
                        onChange={(e) => setEmpresa(e.target.value)}
                        className={`form-select appearance-none py-2.5 text-xs ${empresa ? "text-text-primary" : "text-muted"}`}
                      >
                        <option value="">Seleccionar</option>
                        {empresasMock.map((item) => (
                          <option key={item.ruc_cli} value={item.des_cli}>
                            {item.des_cli}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="doc-sede"
                      className="mb-1 block text-xs text-text-secondary"
                    >
                      Sede
                    </label>
                    <div className="form-select-container">
                      <select
                        id="doc-sede"
                        value={sede}
                        onChange={(e) => setSede(e.target.value)}
                        className={`form-select appearance-none py-2.5 text-xs ${sede ? "text-text-primary" : "text-muted"}`}
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
                </section>

                {/* Paso 2: información a incorporar */}
                <section aria-labelledby="paso2-generar-documento-title">
                  <h3
                    id="paso2-generar-documento-title"
                    className="text-xs font-semibold text-text-primary"
                  >
                    Información a incorporar
                  </h3>
                  <div
                    className="mt-3 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2"
                    role="group"
                    aria-label="Información a incorporar"
                  >
                    {infoIncorporarOpciones.map((opcion) => {
                      const checked = infoSeleccionada.includes(opcion.id);
                      return (
                        <label
                          key={opcion.id}
                          className="flex cursor-pointer items-center gap-2.5 text-xs text-text-secondary"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleInfo(opcion.id)}
                            className="checkbox size-5 rounded-md border-brand bg-surface-light checked:bg-brand checked:text-surface-light"
                          />
                          <span>{opcion.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </section>

                {/* Paso 3: objetivo del documento */}
                <section aria-labelledby="paso3-generar-documento-title">
                  <h3
                    id="paso3-generar-documento-title"
                    className="text-xs font-semibold text-text-primary"
                  >
                    <label htmlFor="doc-objetivo">Objetivo del documento</label>
                  </h3>
                  <textarea
                    id="doc-objetivo"
                    value={objetivo}
                    onChange={(e) => setObjetivo(e.target.value)}
                    rows={4}
                    className="form-input mt-2 min-h-24 resize-none text-xs"
                  />
                </section>

                {/* Acciones */}
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex items-center gap-2 rounded-lg bg-muted px-6 py-2.5 text-xs font-bold text-white hover:bg-muted-80"
                  >
                    <i
                      className="fa-solid fa-trash text-xs"
                      aria-hidden="true"
                    />
                    CANCELAR
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-lg bg-brand px-6 py-2.5 text-xs font-bold text-white hover:bg-primary-hover"
                  >
                    <i
                      className="fa-solid fa-robot text-xs"
                      aria-hidden="true"
                    />
                    GENERAR
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
        title={"Documento generado\ncorrectamente"}
      />
    </>
  );
}
