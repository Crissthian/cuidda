import SuccessModal from "@/components/ui/SuccessModal";
import {
  actividadesInicialesPrograma,
  especialidadesPrograma,
  gruposRiesgoPrograma,
  periodosPrograma,
  responsablesPrograma,
  sedesPrograma,
  tiposPrograma,
} from "@/lib/programasData";
import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const MAX_ACTIVIDADES = 10;

const labelClass = "mb-1 block text-[11px] text-text-secondary";
const inputClass = "form-input py-2 text-xs";
const selectClass = "form-select appearance-none py-2 text-xs";

export default function NuevoProgramaModal({ isOpen, onClose }: Props) {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [responsable, setResponsable] = useState("");
  const [sede, setSede] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [grupos, setGrupos] = useState<string[]>(["G1"]);
  const [objetivo, setObjetivo] = useState("");
  const [actividades, setActividades] = useState<string[]>([
    ...actividadesInicialesPrograma,
  ]);
  const [nuevaActividad, setNuevaActividad] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const toggleGrupo = (id: string) => {
    setGrupos((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id],
    );
  };

  const poblacionTotal = gruposRiesgoPrograma.reduce(
    (acc, g) => acc + (grupos.includes(g.id) ? g.poblacion : 0),
    0,
  );

  const detallePoblacion = gruposRiesgoPrograma
    .map((g) => `${g.id} ${grupos.includes(g.id) ? g.poblacion : 0}`)
    .join(" · ");

  const agregarActividad = () => {
    const value = nuevaActividad.trim();
    if (!value || actividades.length >= MAX_ACTIVIDADES) return;
    setActividades((prev) => [...prev, value]);
    setNuevaActividad("");
  };

  const quitarActividad = (index: number) => {
    setActividades((prev) => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setNombre("");
    setTipo("");
    setEspecialidad("");
    setResponsable("");
    setSede("");
    setPeriodo("");
    setGrupos(["G1"]);
    setObjetivo("");
    setActividades([...actividadesInicialesPrograma]);
    setNuevaActividad("");
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
          aria-labelledby="modal-nuevo-programa-title"
          onClick={handleClose}
        >
          <div
            className="relative flex max-h-[95vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-surface-default shadow-xl"
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
                id="modal-nuevo-programa-title"
                className="text-base font-bold text-brand"
              >
                Nuevo programa
              </h2>

              <form
                className="mt-4 flex flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setShowSuccess(true);
                }}
              >
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-5">
                    <label htmlFor="prog-nombre" className={labelClass}>
                      Nombre del programa
                    </label>
                    <input
                      id="prog-nombre"
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div className="col-span-3">
                    <label htmlFor="prog-tipo" className={labelClass}>
                      Tipo
                    </label>
                    <div className="form-select-container">
                      <select
                        id="prog-tipo"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        className={`${selectClass} ${tipo ? "text-text-primary" : "text-muted"}`}
                      >
                        <option value="" disabled hidden>
                          Seleccionar
                        </option>
                        {tiposPrograma.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      <i
                        className="fa-solid fa-chevron-down form-select-icon text-xs"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <div className="col-span-4">
                    <label htmlFor="prog-especialidad" className={labelClass}>
                      Especialidad / enfoque
                    </label>
                    <div className="form-select-container">
                      <select
                        id="prog-especialidad"
                        value={especialidad}
                        onChange={(e) => setEspecialidad(e.target.value)}
                        className={`${selectClass} ${especialidad ? "text-text-primary" : "text-muted"}`}
                      >
                        <option value="" disabled hidden>
                          Seleccionar
                        </option>
                        {especialidadesPrograma.map((e) => (
                          <option key={e} value={e}>
                            {e}
                          </option>
                        ))}
                      </select>
                      <i
                        className="fa-solid fa-chevron-down form-select-icon text-xs"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <div className="col-span-5">
                    <label htmlFor="prog-responsable" className={labelClass}>
                      Responsable
                    </label>
                    <div className="form-select-container">
                      <select
                        id="prog-responsable"
                        value={responsable}
                        onChange={(e) => setResponsable(e.target.value)}
                        className={`${selectClass} ${responsable ? "text-text-primary" : "text-muted"}`}
                      >
                        <option value="" disabled hidden>
                          Seleccionar
                        </option>
                        {responsablesPrograma.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                      <i
                        className="fa-solid fa-chevron-down form-select-icon text-xs"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <div className="col-span-4">
                    <label htmlFor="prog-sede" className={labelClass}>
                      Sede
                    </label>
                    <div className="form-select-container">
                      <select
                        id="prog-sede"
                        value={sede}
                        onChange={(e) => setSede(e.target.value)}
                        className={`${selectClass} ${sede ? "text-text-primary" : "text-muted"}`}
                      >
                        <option value="" disabled hidden>
                          Seleccionar
                        </option>
                        {sedesPrograma.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <i
                        className="fa-solid fa-chevron-down form-select-icon text-xs"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <div className="col-span-3">
                    <label htmlFor="prog-periodo" className={labelClass}>
                      Periodo
                    </label>
                    <div className="form-select-container">
                      <select
                        id="prog-periodo"
                        value={periodo}
                        onChange={(e) => setPeriodo(e.target.value)}
                        className={`${selectClass} ${periodo ? "text-text-primary" : "text-muted"}`}
                      >
                        <option value="" disabled hidden>
                          Seleccionar
                        </option>
                        {periodosPrograma.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                      <i
                        className="fa-solid fa-chevron-down form-select-icon text-xs"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <span className={labelClass}>Grupos de riesgo incluidos</span>
                  <div
                    className="flex gap-3"
                    role="group"
                    aria-label="Grupos de riesgo incluidos"
                  >
                    {gruposRiesgoPrograma.map((g) => {
                      const active = grupos.includes(g.id);
                      return (
                        <button
                          key={g.id}
                          type="button"
                          onClick={() => toggleGrupo(g.id)}
                          aria-pressed={active}
                          className={`w-24 rounded-lg border px-4 py-1.5 text-xs font-bold transition ${
                            active
                              ? "border-brand bg-brand text-white"
                              : "border-brand/60 bg-surface-default text-brand hover:bg-brand/5"
                          }`}
                        >
                          {g.id}
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-1.5 text-brand">
                    Población estimada:{" "}
                    <span className="font-bold">
                      {poblacionTotal} trabajadores
                    </span>{" "}
                    ({detallePoblacion})
                  </p>
                </div>

                <div>
                  <label htmlFor="prog-objetivo" className={labelClass}>
                    Objetivo
                  </label>
                  <textarea
                    id="prog-objetivo"
                    rows={3}
                    value={objetivo}
                    onChange={(e) => setObjetivo(e.target.value)}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <section
                  className="rounded-xl p-4 ring-1 ring-border-subtle/40"
                  aria-labelledby="prog-actividades-title"
                >
                  <h3
                    id="prog-actividades-title"
                    className="text-xs font-bold text-text-primary"
                  >
                    Actividades iniciales ({actividades.length}/
                    {MAX_ACTIVIDADES})
                  </h3>

                  {actividades.length === 0 ? (
                    <p className="mt-3 rounded-lg bg-surface-light px-4 py-3 text-center text-xs text-muted">
                      Sin actividades. Agrega la primera con el campo inferior.
                    </p>
                  ) : (
                    <ul className="mt-3 flex flex-col gap-2">
                      {actividades.map((a, i) => (
                        <li
                          key={`${i}-${a}`}
                          className="flex items-center justify-between gap-3 rounded-lg bg-brand/10 px-4 py-2.5"
                        >
                          <span className="text-xs font-bold text-brand">
                            {a}
                          </span>
                          <button
                            type="button"
                            onClick={() => quitarActividad(i)}
                            aria-label={`Quitar ${a}`}
                            className="text-brand transition-colors hover:text-risk-red"
                          >
                            <i
                              className="fa-regular fa-trash-can text-xs"
                              aria-hidden="true"
                            />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-3 flex gap-3">
                    <input
                      type="text"
                      value={nuevaActividad}
                      onChange={(e) => setNuevaActividad(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          agregarActividad();
                        }
                      }}
                      placeholder="Agregar actividad"
                      aria-label="Agregar actividad"
                      disabled={actividades.length >= MAX_ACTIVIDADES}
                      className="form-input border border-brand/60 py-2 text-xs disabled:opacity-50"
                    />
                    <button
                      type="button"
                      onClick={agregarActividad}
                      disabled={
                        !nuevaActividad.trim() ||
                        actividades.length >= MAX_ACTIVIDADES
                      }
                      className="flex shrink-0 items-center gap-1.5 rounded-lg bg-muted-20 px-4 py-2 text-[11px] font-bold text-muted transition hover:bg-muted-30 disabled:opacity-50"
                    >
                      <i className="fa-solid fa-plus" aria-hidden="true" />
                      AGREGAR
                    </button>
                  </div>
                </section>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex items-center gap-2 rounded-lg bg-muted px-6 py-2.5 text-[11px] font-bold text-white transition hover:bg-muted-80"
                  >
                    <i
                      className="fa-solid fa-trash text-[11px]"
                      aria-hidden="true"
                    />
                    CANCELAR
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-lg bg-brand px-6 py-2.5 text-[11px] font-bold text-white transition hover:bg-primary-hover"
                  >
                    <i
                      className="fa-solid fa-floppy-disk text-[11px]"
                      aria-hidden="true"
                    />
                    CREAR PROGRAMA
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
        title={"Programa cargado\ncorrectamente"}
      />
    </>
  );
}
