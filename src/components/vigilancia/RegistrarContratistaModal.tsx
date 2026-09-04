import SuccessModal from "@/components/ui/SuccessModal";
import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const rubros = [
  "Seguridad",
  "Servicios Generales",
  "Mecánica",
  "Perforación",
  "Mantenimiento",
];
const estados = ["ACTIVO", "OBSERVADO", "INACTIVO"];
const tiposResponsable = ["Operativo", "Administrativo", "SST", "Legal"];
const sedesOptions = ["Condorcocha", "Conchán", "Villarán", "Atocongo"];

type Responsable = {
  nombre: string;
  cargo: string;
  telefono: string;
  correo: string;
  tipo: string;
  principal: boolean;
};

const emptyResponsable: Responsable = {
  nombre: "",
  cargo: "",
  telefono: "",
  correo: "",
  tipo: "",
  principal: false,
};

const labelClass = "mb-1 block text-[11px] text-text-secondary";
const inputClass = "form-input !py-2 text-xs";
const selectClass = "form-select appearance-none !py-2 text-xs";

export default function RegistrarContratistaModal({ isOpen, onClose }: Props) {
  const [ruc, setRuc] = useState("");
  const [razonSocial, setRazonSocial] = useState("");
  const [nombreComercial, setNombreComercial] = useState("");
  const [rubro, setRubro] = useState("");
  const [actividad, setActividad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [trabajadores, setTrabajadores] = useState("");
  const [sedes, setSedes] = useState<string[]>(["Condorcocha"]);
  const [estado, setEstado] = useState("");
  const [area, setArea] = useState("");
  const [tipoServicio, setTipoServicio] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [responsables, setResponsables] = useState<Responsable[]>([
    { ...emptyResponsable },
  ]);
  const [showSuccess, setShowSuccess] = useState(false);

  const toggleSede = (sede: string) => {
    setSedes((prev) =>
      prev.includes(sede) ? prev.filter((s) => s !== sede) : [...prev, sede],
    );
  };

  const updateResponsable = (index: number, patch: Partial<Responsable>) => {
    setResponsables((prev) =>
      prev.map((r, i) => (i === index ? { ...r, ...patch } : r)),
    );
  };

  const resetForm = () => {
    setRuc("");
    setRazonSocial("");
    setNombreComercial("");
    setRubro("");
    setActividad("");
    setDireccion("");
    setTelefono("");
    setCorreo("");
    setTrabajadores("");
    setSedes(["Condorcocha"]);
    setEstado("");
    setArea("");
    setTipoServicio("");
    setFechaInicio("");
    setFechaFin("");
    setObservaciones("");
    setResponsables([{ ...emptyResponsable }]);
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
          aria-labelledby="modal-contratista-title"
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
                id="modal-contratista-title"
                className="text-base font-bold text-brand"
              >
                Registro de contratistas
              </h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setShowSuccess(true);
                }}
                className="mt-4 flex flex-col gap-6"
              >
                {/* ── Información general ── */}
                <section aria-labelledby="info-general-title">
                  <h3
                    id="info-general-title"
                    className="text-xs font-bold text-text-primary"
                  >
                    Información general
                  </h3>
                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div>
                      <label htmlFor="ruc" className={labelClass}>
                        R.U.C.
                      </label>
                      <input
                        id="ruc"
                        value={ruc}
                        onChange={(e) => setRuc(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="razon" className={labelClass}>
                        Razón social
                      </label>
                      <input
                        id="razon"
                        value={razonSocial}
                        onChange={(e) => setRazonSocial(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="nombre-com" className={labelClass}>
                        Nombre comercial
                      </label>
                      <input
                        id="nombre-com"
                        value={nombreComercial}
                        onChange={(e) => setNombreComercial(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="rubro" className={labelClass}>
                        Rubro
                      </label>
                      <div className="form-select-container">
                        <select
                          id="rubro"
                          value={rubro}
                          onChange={(e) => setRubro(e.target.value)}
                          className={`${selectClass} ${rubro ? "text-text-primary" : "text-muted"}`}
                        >
                          <option value="" disabled hidden>
                            Seleccionar
                          </option>
                          {rubros.map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="actividad" className={labelClass}>
                        Actividad económica
                      </label>
                      <input
                        id="actividad"
                        value={actividad}
                        onChange={(e) => setActividad(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="direccion" className={labelClass}>
                        Dirección
                      </label>
                      <input
                        id="direccion"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="tel" className={labelClass}>
                        Teléfono
                      </label>
                      <input
                        id="tel"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="correo" className={labelClass}>
                        Correo corporativo
                      </label>
                      <input
                        id="correo"
                        type="email"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="trab" className={labelClass}>
                        Trabajadores asignados (aprox.)
                      </label>
                      <input
                        id="trab"
                        value={trabajadores}
                        onChange={(e) => setTrabajadores(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </section>

                {/* ── Relación con la empresa ── */}
                <section aria-labelledby="relacion-title">
                  <h3
                    id="relacion-title"
                    className="text-xs font-bold text-text-primary"
                  >
                    Relación con la empresa
                  </h3>

                  <p className="mt-3 text-[11px] text-text-secondary">
                    Sedes donde realiza actividades
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {sedesOptions.map((s) => {
                      const active = sedes.includes(s);
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleSede(s)}
                          aria-pressed={active}
                          className={`rounded-md px-4 py-1.5 text-[11px] font-medium transition border border-brand/50 ${
                            active
                              ? "bg-brand text-white-custom"
                              : "bg-surface-default text-brand hover:bg-brand/5"
                          }`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div>
                      <label htmlFor="estado" className={labelClass}>
                        Estado
                      </label>
                      <div className="form-select-container">
                        <select
                          id="estado"
                          value={estado}
                          onChange={(e) => setEstado(e.target.value)}
                          className={`${selectClass} ${estado ? "text-text-primary" : "text-muted"}`}
                        >
                          <option value="" disabled hidden>
                            Seleccionar
                          </option>
                          {estados.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="area" className={labelClass}>
                        Área donde presta servicios
                      </label>
                      <input
                        id="area"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="tipo-serv" className={labelClass}>
                        Tipo de servicio contratado
                      </label>
                      <input
                        id="tipo-serv"
                        value={tipoServicio}
                        onChange={(e) => setTipoServicio(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="f-inicio" className={labelClass}>
                        Fecha de inicio
                      </label>
                      <div className="relative">
                        <input
                          id="f-inicio"
                          type="date"
                          value={fechaInicio}
                          onChange={(e) => setFechaInicio(e.target.value)}
                          className={`${inputClass}`}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="f-fin" className={labelClass}>
                        Fecha de término (si aplica)
                      </label>
                      <div className="relative">
                        <input
                          id="f-fin"
                          type="date"
                          value={fechaFin}
                          onChange={(e) => setFechaFin(e.target.value)}
                          className={`${inputClass}`}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="obs" className={labelClass}>
                        Observaciones
                      </label>
                      <input
                        id="obs"
                        value={observaciones}
                        onChange={(e) => setObservaciones(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </section>

                {/* ── Responsables ── */}
                <section aria-labelledby="resp-title">
                  <div className="flex items-center justify-between">
                    <h3
                      id="resp-title"
                      className="text-xs font-bold text-text-primary"
                    >
                      Responsables del contratista
                    </h3>
                    <button
                      type="button"
                      onClick={() =>
                        setResponsables((prev) => [
                          ...prev,
                          { ...emptyResponsable },
                        ])
                      }
                      className="flex items-center gap-2 rounded-lg bg-muted-20 px-4 py-2 text-[11px] text-text-primary hover:bg-brand hover:text-white-custom"
                    >
                      <i
                        className="fa-solid fa-plus text-[10px]"
                        aria-hidden="true"
                      />
                      AÑADIR RESPONSABLE
                    </button>
                  </div>

                  {responsables.map((resp, i) => (
                    <div
                      key={i}
                      className="mt-3 rounded-xl bg-surface-default p-5 shadow-sm ring-1 ring-border-subtle/20"
                    >
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <div>
                          <label className={labelClass}>Nombre completo</label>
                          <input
                            value={resp.nombre}
                            onChange={(e) =>
                              updateResponsable(i, { nombre: e.target.value })
                            }
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Cargo</label>
                          <input
                            value={resp.cargo}
                            onChange={(e) =>
                              updateResponsable(i, { cargo: e.target.value })
                            }
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Teléfono</label>
                          <input
                            value={resp.telefono}
                            onChange={(e) =>
                              updateResponsable(i, { telefono: e.target.value })
                            }
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>
                            Correo electrónico
                          </label>
                          <input
                            type="email"
                            value={resp.correo}
                            onChange={(e) =>
                              updateResponsable(i, { correo: e.target.value })
                            }
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>
                            Tipo de responsable
                          </label>
                          <div className="form-select-container">
                            <select
                              value={resp.tipo}
                              onChange={(e) =>
                                updateResponsable(i, { tipo: e.target.value })
                              }
                              className={`${selectClass} ${resp.tipo ? "text-text-primary" : "text-muted"}`}
                            >
                              <option value="" disabled hidden>
                                Seleccionar
                              </option>
                              {tiposResponsable.map((t) => (
                                <option key={t} value={t}>
                                  {t}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="flex items-end pb-2">
                          <button
                            type="button"
                            role="radio"
                            aria-checked={resp.principal}
                            onClick={() =>
                              updateResponsable(i, {
                                principal: !resp.principal,
                              })
                            }
                            className="flex items-center gap-2 text-xs text-text-secondary"
                          >
                            <span
                              className={`flex size-5 items-center justify-center rounded-full border ${
                                resp.principal
                                  ? "border-brand bg-brand"
                                  : "border-muted-30 bg-muted-20"
                              }`}
                            >
                              {resp.principal && (
                                <i
                                  className="fa-solid fa-check text-[8px] text-white"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                            Contacto principal
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </section>

                {/* Nota legal */}
                <p className="flex items-start gap-2 text-[11px] leading-relaxed text-muted">
                  <i
                    className="fa-solid fa-circle-info mt-0.5 shrink-0 text-xs"
                    aria-hidden="true"
                  />
                  <span>
                    La gestión de la vigilancia médica ocupacional del personal
                    contratista corresponde a su respectivo empleador. Este
                    módulo permite únicamente realizar seguimiento al
                    cumplimiento declarado o documentado para actividades
                    desarrolladas dentro de las sedes de operación.
                  </span>
                </p>

                {/* Acciones */}
                <div className="flex justify-end gap-3 pb-2">
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
                      className="fa-solid fa-floppy-disk text-[11px]"
                      aria-hidden="true"
                    />
                    GUARDAR CONTRATISTA
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
