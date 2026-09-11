/**
 * Modal principal de atención odontológica.
 *
 * Muestra datos del paciente y pestañas para: Consulta, Odontograma, Receta y Archivos.
 * Utiliza Zustand para el estado compartido entre pestañas y react-hook-form.
 */
import React, { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import FechaHora from "@/components/FechaHora";
import { ArchivosTab } from "./tabs/ArchivosTab";
import { ConsultaTab, type ConsultaTabRef } from "./tabs/ConsultaTab";
import { OdontogramaTab, type OdontogramaTabRef } from "./tabs/OdontogramaTab";
import { RecetaTab, type RecetaTabRef } from "./tabs/RecetaTab";
import {
  MODAL_SIZE_CLASSES,
  type ModalSize,
} from "@/components/ui/modal.constants";
import { preventSubmitOnEnter } from "@/lib/preventSubmitOnEnter";
import { calcularEdad } from "@/lib/calcularEdad";
import {
  formatearCodigo,
  useAtencionOdontoStore,
  type DatosEvento,
} from "./store/useAtencionOdontoStore";
import { toast } from "sonner";

type IdPestana = "consulta" | "odontograma" | "receta" | "archivos";

interface ConfiguracionPestana {
  id: IdPestana;
  etiqueta: string;
}

interface ModalIniciarAtencionProps {
  isOpen: boolean;
  onClose: () => void;
  datosEvento: DatosEvento;
  readOnly?: boolean;
  size?: ModalSize;
}

const PESTANAS: ConfiguracionPestana[] = [
  { id: "consulta", etiqueta: "Consulta" },
  { id: "odontograma", etiqueta: "Odontograma" },
  { id: "receta", etiqueta: "Receta" },
  { id: "archivos", etiqueta: "Archivos" },
];

export function ModalIniciarAtencion({
  isOpen,
  onClose,
  datosEvento,
  readOnly = false,
  size = "full",
}: ModalIniciarAtencionProps): React.ReactElement | null {
  const {
    estaGuardando,
    inicializarAtencion,
    setCodigoOdontologia,
    setCodigoGenerado,
    setEstadoAtencion,
    setEstaGuardando,
    setEstadoCarga,
    setModalAbierto,
    limpiarStore,
    todoCargado,
    esNuevaConsulta,
    codigoMostrado,
  } = useAtencionOdontoStore();

  const [montado, setMontado] = React.useState(false);
  const [pestanaActiva, setPestanaActiva] =
    React.useState<IdPestana>("consulta");

  const refConsultaTab = React.useRef<ConsultaTabRef>(null);
  const refOdontogramaTab = React.useRef<OdontogramaTabRef>(null);
  const refRecetaTab = React.useRef<RecetaTabRef>(null);

  const manejarConsultaCargada = useCallback(
    (cargado: boolean) => setEstadoCarga("consulta", cargado),
    [setEstadoCarga],
  );

  const manejarOdontogramaCargado = useCallback(
    (cargado: boolean) => setEstadoCarga("odontograma", cargado),
    [setEstadoCarga],
  );

  const manejarRecetaCargada = useCallback(
    (cargado: boolean) => setEstadoCarga("receta", cargado),
    [setEstadoCarga],
  );

  const manejarArchivosCargados = useCallback(
    (cargado: boolean) => setEstadoCarga("archivos", cargado),
    [setEstadoCarga],
  );

  /**
   * Guardado simulado
   */
  const manejarGuardadoPrincipal = useCallback(
    async (evento?: React.SyntheticEvent) => {
      evento?.preventDefault();
      if (estaGuardando || !datosEvento) return;

      try {
        setEstaGuardando(true);

        // 1. Validar pestañas
        if (refConsultaTab.current) {
          const consultaValida = await refConsultaTab.current.validate();
          if (!consultaValida) {
            toast.error("Complete los datos obligatorios de la consulta");
            setEstaGuardando(false);
            return;
          }
        }

        if (refRecetaTab.current) {
          const recetaValida = await refRecetaTab.current.validate();
          if (!recetaValida) {
            toast.error(
              "Complete los datos obligatorios de la receta/diagnóstico",
            );
            setEstaGuardando(false);
            return;
          }
        }

        // 2. Simulación de persistencia
        setTimeout(() => {
          setCodigoOdontologia(datosEvento.codigoOdontologia || "00000015");
          setEstadoAtencion("2"); // Finalizado
          setEstaGuardando(false);
          toast.success("Atención guardada correctamente");
        }, 600);
      } catch (err) {
        const error = err as Error;
        console.error("Error en guardado:", error);
        toast.error(error.message || "Error al guardar");
        setEstaGuardando(false);
      }
    },
    [
      estaGuardando,
      datosEvento,
      setCodigoOdontologia,
      setEstadoAtencion,
      setEstaGuardando,
    ],
  );

  useEffect(() => {
    if (isOpen && datosEvento) {
      inicializarAtencion(datosEvento);
      setModalAbierto(true);
      setPestanaActiva("consulta");
      if (datosEvento.codigoOdontologia) {
        setCodigoOdontologia(datosEvento.codigoOdontologia);
      } else {
        setCodigoGenerado("00000015");
      }
      setEstadoCarga("modal", true);
    }
  }, [
    isOpen,
    datosEvento,
    inicializarAtencion,
    setModalAbierto,
    setCodigoOdontologia,
    setCodigoGenerado,
    setEstadoCarga,
  ]);

  useEffect(() => {
    setMontado(true);
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
      if (!isOpen) {
        limpiarStore();
      }
    };
  }, [isOpen, limpiarStore]);

  if (!montado || !isOpen) return null;

  const esTodoCargado = todoCargado();
  const esNueva = esNuevaConsulta();
  const codigoAMostrar = codigoMostrado();
  const isReadOnlyMode = readOnly;

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm overflow-hidden z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-modal-atencion"
    >
      <div
        className={`${MODAL_SIZE_CLASSES[size]} bg-surface-default rounded-2xl shadow-2xl overflow-hidden flex flex-col max-w-[95vw] w-[95vw] max-h-[95vh] h-[95vh] relative`}
      >
        <form
          onSubmit={manejarGuardadoPrincipal}
          onKeyDown={preventSubmitOnEnter}
          className="h-full flex flex-col"
        >
          <div className="px-6 py-2 flex flex-col gap-4 overflow-y-auto w-full h-full">
            {/* Botones de acción flotantes */}
            <div className="flex relative flex-row justify-end top-4 z-50 p-0 h-0 gap-2">
              {/* Botón Guardar/Actualizar */}
              {!isReadOnlyMode ? (
                <button
                  type="submit"
                  disabled={estaGuardando || (!esNueva && !esTodoCargado)}
                  className={`btn -left-96 top-4 z-50 border-none rounded-lg text-white font-medium px-4 py-2 shadow-md flex items-center gap-2 transition-colors cursor-pointer ${
                    estaGuardando || (!esNueva && !esTodoCargado)
                      ? "bg-muted-50 cursor-not-allowed opacity-70"
                      : "bg-muted hover:bg-muted-hover cursor-pointer"
                  }`}
                  aria-label={
                    esNueva ? "Guardar consulta" : "Actualizar consulta"
                  }
                >
                  {estaGuardando ? (
                    <>
                      <i
                        className="fa-solid fa-spinner fa-spin"
                        aria-hidden="true"
                      ></i>
                      Guardando...
                    </>
                  ) : (
                    <>
                      <i
                        className="fa-solid fa-floppy-disk"
                        aria-hidden="true"
                      ></i>
                      {esNueva ? "GUARDAR" : "ACTUALIZAR"}
                    </>
                  )}
                </button>
              ) : null}

              {/* Botón Cerrar */}
              <button
                type="button"
                onClick={onClose}
                className={
                  isReadOnlyMode
                    ? "flex items-center p-2.5 justify-center size-10 rounded-lg bg-brand text-white transition-colors hover:bg-primary-hover cursor-pointer"
                    : "btn left-full top-4 z-50 bg-muted border-none rounded-lg text-white font-medium px-4 py-2 shadow-md flex items-center gap-2 cursor-pointer hover:bg-muted-hover transition-colors"
                }
                aria-label="Cerrar modal"
              >
                <i
                  className="fa-solid fa-sign-out-alt text-lg"
                  aria-hidden="true"
                ></i>
                {isReadOnlyMode ? null : "Cerrar"}
              </button>
            </div>

            {/* Encabezado del modal */}
            <header>
              <div className="flex flex-row items-center mb-2 gap-8">
                <div className="flex items-center gap-4">
                  <h1
                    id="titulo-modal-atencion"
                    className="text-xl font-bold text-brand"
                  >
                    Odontología
                  </h1>
                  {isReadOnlyMode ? (
                    <span className="rounded-full bg-brand/10 px-3 py-1 text-sm font-medium text-brand">
                      Solo lectura
                    </span>
                  ) : null}
                </div>
                <div className="flex-1 max-w-xl">
                  <input
                    type="text"
                    readOnly
                    value={
                      codigoAMostrar ? formatearCodigo(codigoAMostrar) : ""
                    }
                    className="max-w-60 px-6 py-2 text-center text-xl font-semibold bg-muted-30 text-brand rounded-lg border-none outline-none"
                    aria-label="Código de odontología"
                  />
                </div>
              </div>

              <div className="flex flex-row mt-4 justify-between items-center">
                <h2 className="text-xl font-semibold text-text-primary my-2">
                  Datos generales del paciente
                </h2>
                <div className="relative -top">
                  <FechaHora />
                </div>
              </div>
            </header>

            {/* Sección de datos del paciente */}
            <section
              className="grid grid-cols-4 gap-4 mt-0"
              aria-label="Información del paciente"
            >
              <div className="flex flex-col">
                <label
                  htmlFor="nombrePaciente"
                  className="text-sm font-medium text-brand mb-1"
                >
                  Apellidos y Nombres
                </label>
                <input
                  id="nombrePaciente"
                  type="text"
                  readOnly
                  value={datosEvento?.nombrePaciente || ""}
                  className="form-input bg-surface-light text-text-primary uppercase"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="edadPaciente"
                  className="text-sm font-medium text-brand mb-1"
                >
                  Edad
                </label>
                <input
                  id="edadPaciente"
                  type="text"
                  readOnly
                  value={calcularEdad(datosEvento?.fechaNacimiento)}
                  className="form-input bg-surface-light text-text-primary"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="fechaAtencion"
                  className="text-sm font-medium text-brand mb-1"
                >
                  Fecha de atención
                </label>
                <input
                  id="fechaAtencion"
                  type="text"
                  readOnly
                  value={
                    new Date(
                      datosEvento?.fechaAtencion || "",
                    ).toLocaleDateString("es-PE") || ""
                  }
                  className="form-input bg-surface-light text-text-primary"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="codigoAtencion"
                  className="text-sm font-medium text-brand mb-1"
                >
                  Código de atención
                </label>
                <input
                  id="codigoAtencion"
                  type="text"
                  readOnly
                  value={datosEvento?.codigoAtencion || ""}
                  className="form-input bg-surface-light text-text-primary"
                />
              </div>
            </section>

            {/* Navegación por pestañas */}
            <div
              className="flex gap-2 w-8/12 bg-surface-light rounded-xl p-2"
              role="tablist"
              aria-label="Secciones de la atención"
            >
              {PESTANAS.map((pestana) => (
                <button
                  key={pestana.id}
                  type="button"
                  role="tab"
                  aria-selected={pestanaActiva === pestana.id}
                  aria-controls={`panel-${pestana.id}`}
                  id={`tab-${pestana.id}`}
                  onClick={() => setPestanaActiva(pestana.id)}
                  className={`px-6 py-2.5 text-sm rounded-xl font-semibold transition-all flex-1 cursor-pointer ${
                    pestanaActiva === pestana.id
                      ? "bg-brand text-white shadow-lg"
                      : "bg-surface-default text-brand hover:bg-muted-20"
                  }`}
                >
                  {pestana.etiqueta}
                </button>
              ))}
            </div>

            {/* Contenido de las pestañas */}
            <div className="rounded-xl p-6 mt-2 border border-border-default flex-1">
              {/* Panel: Consulta */}
              <div
                id="panel-consulta"
                role="tabpanel"
                aria-labelledby="tab-consulta"
                className={
                  pestanaActiva === "consulta" ? "block h-full" : "hidden"
                }
              >
                <ConsultaTab
                  ref={refConsultaTab}
                  onLoadComplete={manejarConsultaCargada}
                  readOnly={isReadOnlyMode}
                />
              </div>

              {/* Panel: Odontograma */}
              <div
                id="panel-odontograma"
                role="tabpanel"
                aria-labelledby="tab-odontograma"
                className={
                  pestanaActiva === "odontograma" ? "block h-full" : "hidden"
                }
              >
                <OdontogramaTab
                  ref={refOdontogramaTab}
                  cdgAtencion={datosEvento.codigoAtencion}
                  estadoAtencion={datosEvento.estadoAtencion}
                  dniPaciente={datosEvento.dniPaciente}
                  onLoadComplete={manejarOdontogramaCargado}
                  readOnly={isReadOnlyMode}
                />
              </div>

              {/* Panel: Receta */}
              <div
                id="panel-receta"
                role="tabpanel"
                aria-labelledby="tab-receta"
                className={
                  pestanaActiva === "receta" ? "block h-full" : "hidden"
                }
              >
                <RecetaTab
                  ref={refRecetaTab}
                  codigo={datosEvento.codigoAtencion}
                  estado={datosEvento.estadoAtencion}
                  abierto={pestanaActiva === "receta"}
                  onLoadComplete={manejarRecetaCargada}
                  readOnly={isReadOnlyMode}
                />
              </div>

              {/* Panel: Archivos */}
              <div
                id="panel-archivos"
                role="tabpanel"
                aria-labelledby="tab-archivos"
                className={
                  pestanaActiva === "archivos" ? "block h-full" : "hidden"
                }
              >
                <ArchivosTab
                  onLoadComplete={manejarArchivosCargados}
                  readOnly={isReadOnlyMode}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
}
