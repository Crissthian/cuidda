import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { ListaHallazgos } from "../odontograma/ListaHallazgos";
import Odontograma from "../odontograma/Odontograma";
import type { HallazgoClinico } from "../odontograma/types";
import { toast } from "sonner";

export interface FilaPlan {
  id: number;
  tratamiento: string;
  fecha: string;
  estado: "pendiente" | "culminado";
}

const FILAS_INICIALES = 1;

const crearFilasInicialesSesiones = (): FilaPlan[] =>
  Array.from({ length: FILAS_INICIALES }).map((_, idx) => ({
    id: idx + 1,
    tratamiento: "",
    fecha: new Date().toISOString().split("T")[0],
    estado: "pendiente",
  }));

interface OdontogramaTabProps {
  cdgAtencion?: string;
  estadoAtencion?: string;
  dniPaciente?: string;
  onLoadComplete?: (loaded: boolean) => void;
  readOnly?: boolean;
}

export interface OdontogramaTabRef {
  handleSave: () => Promise<boolean>;
  validate: () => Promise<boolean>;
  getFormData: () => {
    odontograma: HallazgoClinico[];
    plan_trabajo: FilaPlan[];
    sesiones: string;
  };
}

/**
 * Componente que gestiona la visualización interactiva de la dentadura y el plan de tratamiento.
 * Sincroniza el estado del odontograma gráfico con el listado de hallazgos.
 */
export const OdontogramaTab = forwardRef<
  OdontogramaTabRef,
  OdontogramaTabProps
>(
  (
    {
      cdgAtencion: _cdgAtencion,
      estadoAtencion,
      dniPaciente: _dniPaciente,
      onLoadComplete,
      readOnly = false,
    },
    ref,
  ) => {
    const [filasPlan, setFilasPlan] = useState<FilaPlan[]>(
      crearFilasInicialesSesiones,
    );

    const [modalConfirmacion, setModalConfirmacion] = useState<{
      abierto: boolean;
      filaId: number | null;
    }>({ abierto: false, filaId: null });
    const [modalContainer, setModalContainer] = useState<HTMLElement | null>(
      null,
    );

    useEffect(() => {
      setModalContainer(document.body);
    }, []);

    const [hallazgos, setHallazgos] = useState<HallazgoClinico[]>([]);

    useEffect(() => {
      // Carga inicial simulada
      if (!estadoAtencion) {
        onLoadComplete?.(true);
        return;
      }

      setHallazgos([]);
      setFilasPlan(crearFilasInicialesSesiones());
      onLoadComplete?.(true);
    }, [estadoAtencion, onLoadComplete]);

    useImperativeHandle(ref, () => ({
      handleSave: async () => true,
      validate: async () => true,
      getFormData: () => ({
        odontograma: hallazgos,
        plan_trabajo: filasPlan,
        sesiones: JSON.stringify(filasPlan),
      }),
    }));

    const etiquetasSesion = useMemo(
      () => filasPlan.map((_, idx) => `SESIÓN ${idx + 1}`),
      [filasPlan],
    );

    const crearFila = () => ({
      id: Date.now() + Math.random(),
      tratamiento: "",
      fecha: new Date().toISOString().split("T")[0],
      estado: "pendiente" as const,
    });

    const agregarFila = (filaId: number) => {
      if (readOnly) return;
      setFilasPlan((filas) => {
        const indice = filas.findIndex((f) => f.id === filaId);
        const nuevasFilas = [...filas];
        nuevasFilas.splice(indice + 1, 0, crearFila());
        return nuevasFilas;
      });
      toast.info("Nueva sesión agregada");
    };

    const eliminarFila = (filaId: number) => {
      if (readOnly) return;
      if (filasPlan.length <= 1) return;
      setModalConfirmacion({ abierto: true, filaId });
    };

    const confirmarEliminacion = () => {
      if (readOnly) {
        setModalConfirmacion({ abierto: false, filaId: null });
        return;
      }
      if (modalConfirmacion.filaId !== null) {
        setFilasPlan((filas) => {
          if (filas.length === 1) return filas;
          return filas.filter((f) => f.id !== modalConfirmacion.filaId);
        });
        toast.success("Sesión eliminada");
      }
      setModalConfirmacion({ abierto: false, filaId: null });
    };

    const cancelarEliminacion = () => {
      setModalConfirmacion({ abierto: false, filaId: null });
    };

    const actualizarCampo = <K extends keyof FilaPlan>(
      filaId: number,
      campo: K,
      valor: FilaPlan[K],
    ) => {
      if (readOnly) return;
      setFilasPlan((filas) =>
        filas.map((fila) =>
          fila.id === filaId ? { ...fila, [campo]: valor } : fila,
        ),
      );
    };

    const eliminarHallazgo = (id: string) => {
      if (readOnly) return;
      setHallazgos((prev) => prev.filter((h) => h.id !== id));
      toast.info("Hallazgo eliminado");
    };

    return (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8 h-full rounded-xl bg-surface-light shadow-md relative">
            <Odontograma
              hallazgos={hallazgos}
              onHallazgoCreated={(nuevo) =>
                setHallazgos((prev) => [...prev, nuevo])
              }
              onHallazgoDeleted={eliminarHallazgo}
            />
            {readOnly ? (
              <div
                className="absolute inset-0 z-10 cursor-default"
                aria-hidden="true"
              />
            ) : null}
          </div>

          <div className="col-span-4 rounded-xl bg-surface-light shadow-md">
            <ListaHallazgos
              hallazgos={hallazgos}
              onDelete={eliminarHallazgo}
              readOnly={readOnly}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="rounded-xl border border-border-default p-4">
            <div className="grid grid-cols-[140px_1fr_200px_220px_72px] items-center gap-4 bg-muted-20 rounded-lg p-4">
              <div className="text-sm font-semibold text-brand tracking-wider text-center uppercase">
                N° DE SESIÓN
              </div>
              <div className="text-xs font-semibold text-brand tracking-wider text-center uppercase border-l border-brand/40">
                TRATAMIENTO
              </div>
              <div className="text-xs font-semibold text-brand tracking-wider text-center uppercase border-l border-brand/40">
                FECHA
              </div>
              <div className="text-xs font-semibold text-brand tracking-wider text-center uppercase border-l border-r border-brand/40">
                ESTADO
              </div>
              <div className="text-sm font-semibold" />
            </div>

            <div className="mt-3 flex flex-col gap-3">
              {filasPlan.map((fila, indice) => (
                <div
                  key={fila.id}
                  className="grid grid-cols-[140px_1fr_200px_220px_72px] items-center gap-4 px-4"
                >
                  <div className="text-sm font-semibold text-text-secondary">
                    {etiquetasSesion[indice]}
                  </div>

                  <input
                    type="text"
                    className="form-input bg-surface-light text-sm"
                    value={fila.tratamiento}
                    readOnly={readOnly}
                    onChange={(e) =>
                      actualizarCampo(fila.id, "tratamiento", e.target.value)
                    }
                  />

                  <input
                    type="date"
                    className="form-input bg-surface-light w-full text-sm"
                    value={fila.fecha}
                    disabled={readOnly}
                    onChange={(e) =>
                      actualizarCampo(fila.id, "fecha", e.target.value)
                    }
                  />

                  <div className="flex items-center justify-center gap-4 bg-surface-light rounded-lg border border-surface-light h-10 px-3">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="radio"
                        className="form-input size-4"
                        name={`estado-${fila.id}`}
                        checked={fila.estado === "pendiente"}
                        disabled={readOnly}
                        onChange={() =>
                          actualizarCampo(fila.id, "estado", "pendiente")
                        }
                      />
                      <span className="text-xs font-medium uppercase text-text-secondary">
                        Pendiente
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="radio"
                        className="form-input size-4"
                        name={`estado-${fila.id}`}
                        checked={fila.estado === "culminado"}
                        disabled={readOnly}
                        onChange={() =>
                          actualizarCampo(fila.id, "estado", "culminado")
                        }
                      />
                      <span className="text-xs font-medium uppercase text-text-secondary">
                        Culminado
                      </span>
                    </label>
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    {!readOnly ? (
                      <>
                        <button
                          type="button"
                          className="p-2 hover:bg-muted-20 transition-colors w-10 h-10 text-slate-400 rounded-lg text-xl flex items-center justify-center hover:opacity-90 cursor-pointer"
                          aria-label="Agregar sesión"
                          title="Agregar sesión"
                          onClick={() => agregarFila(fila.id)}
                        >
                          <i className="fa-solid fa-plus"></i>
                        </button>
                        <button
                          type="button"
                          className="p-2 hover:bg-muted-20 transition-colors w-10 h-10 text-red-500 rounded-lg text-xl flex items-center justify-center hover:opacity-90 cursor-pointer"
                          aria-label="Eliminar sesión"
                          title="Eliminar sesión"
                          onClick={() => eliminarFila(fila.id)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <ConfirmacionModal
          isOpen={modalConfirmacion.abierto}
          onCancel={cancelarEliminacion}
          onConfirm={confirmarEliminacion}
          container={modalContainer}
        />
      </div>
    );
  },
);

export const ConfirmacionModal = ({
  isOpen,
  onCancel,
  onConfirm,
  container,
}: {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  container: HTMLElement | null;
}) => {
  if (!isOpen || !container) return null;

  return createPortal(
    <div className="absolute inset-0 flex items-center justify-center p-4 z-60">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      ></div>
      <div className="relative bg-surface-light rounded-lg w-full max-w-md shadow-xl z-10">
        <div className="px-6 py-4 border-b border-border-default">
          <h3 className="text-xl font-semibold text-text-primary">
            Confirmar eliminación
          </h3>
        </div>
        <div className="px-6 py-6">
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <i className="fa-solid fa-exclamation-triangle text-red-600 text-xl"></i>
            </div>
            <div className="flex-1">
              <p className="text-text-primary text-base leading-relaxed">
                ¿Está seguro de que desea eliminar esta sesión?
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Esta acción no se puede deshacer.
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 px-6 py-4 bg-surface-light rounded-b-lg">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-muted hover:bg-muted-80 text-white rounded-lg font-medium transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors cursor-pointer"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>,
    container,
  );
};

OdontogramaTab.displayName = "OdontogramaTab";
