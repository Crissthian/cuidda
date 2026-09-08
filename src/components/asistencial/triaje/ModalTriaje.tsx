import FechaHora from "@/components/FechaHora";
import Modal from "@/components/ui/Modal";
import {
  catalogosTriajeMock,
  getPacienteDataTriaje,
  getTriajeRegistro,
  historialTriajeMock,
  type HistorialAtencion,
} from "@/lib/triajeData";
import { FormProvider } from "react-hook-form";
import { useEffect, useState, type KeyboardEvent } from "react";
import { toast } from "sonner";
import AntecedentesFisiologicos from "./AntecedentesFisiologicos";
import HistorialAtenciones from "./HistorialAtenciones";
import SignosVitales from "./SignosVitales";
import { emptyPacienteDataTriaje, type TriajeModalMode } from "./triaje.types";
import { useTriajeForm } from "./useTriajeForm";

interface ModalTriajeProps {
  isOpen: boolean;
  mode: TriajeModalMode;
  atencionID: string;
  idTriaje: string;
  onClose: () => void;
  onEditarHistorial: (triajeID: string) => void;
}

/**
 * Modal para creación/edición de un triaje (solo UI, datos mock).
 */
export default function ModalTriaje({
  isOpen,
  mode: modeProp,
  atencionID,
  idTriaje: idTriajeProp,
  onClose,
  onEditarHistorial,
}: ModalTriajeProps) {
  const fMethods = useTriajeForm();
  const [mode, setMode] = useState<TriajeModalMode>(modeProp);
  const [idTriaje, setIdTriaje] = useState(idTriajeProp);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [historial, setHistorial] = useState<HistorialAtencion[]>([]);

  const isReadOnlyMode = mode === "view";

  // Cargar datos del paciente y del triaje al abrir el modal
  useEffect(() => {
    if (!isOpen || !atencionID) return;

    setMode(modeProp);
    setIdTriaje(idTriajeProp);
    setLoading(true);

    const timer = window.setTimeout(() => {
      const dataPaciente = getPacienteDataTriaje(atencionID);

      if (modeProp === "create") {
        fMethods.reset({
          pacienteData: dataPaciente ?? emptyPacienteDataTriaje,
          signosVitales: {},
          antecedentes: {},
        });
      } else {
        const searchId = idTriajeProp || atencionID;
        const dataTriaje = getTriajeRegistro(searchId);
        fMethods.reset({
          pacienteData: dataPaciente ?? emptyPacienteDataTriaje,
          ...(dataTriaje ?? {}),
        });
      }

      setHistorial(historialTriajeMock);
      setLoading(false);
    }, 300);

    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, atencionID, modeProp, idTriajeProp]);

  const handleSubmit = fMethods.handleSubmit(() => {
    if (isReadOnlyMode) return;

    setSaving(true);
    // Simulación de guardado
    window.setTimeout(() => {
      setSaving(false);
      toast.success(
        mode === "create"
          ? "Triaje guardado con éxito"
          : "Triaje actualizado con éxito",
      );
      setMode("update");
    }, 600);
  });

  const handleCloseModal = () => {
    fMethods.reset();
    onClose();
  };

  const preventSubmitOnEnter = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && e.target instanceof HTMLInputElement) {
      e.preventDefault();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseModal}
      title="Triaje"
      size="5xl"
      closeOnBackdrop={!isReadOnlyMode}
      closeOnEscape={!isReadOnlyMode}
    >
      <FormProvider {...fMethods}>
        <div className="w-full">
          <form
            onSubmit={handleSubmit}
            onKeyDown={preventSubmitOnEnter}
            id="formTriaje"
          >
            {/* Header con ID y acciones */}
            <div className="flex justify-between items-center mb-6 px-6">
              <div className="flex items-center gap-4 text-xl font-semibold text-brand">
                <label htmlFor="inputIdTriaje">N° de triaje:</label>
                <input
                  id="inputIdTriaje"
                  name="idTriaje"
                  value={idTriaje}
                  readOnly
                  className="bg-muted-30 ms-6 text-center py-1 px-2 rounded-lg"
                />
                {isReadOnlyMode ? (
                  <span className="rounded-full bg-brand/10 px-3 py-1 text-sm font-medium text-brand">
                    Solo lectura
                  </span>
                ) : null}
              </div>
              {!isReadOnlyMode ? (
                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={saving || loading}
                    className="flex items-center gap-2 rounded-lg bg-muted-80 px-5 py-3 text-white transition-colors hover:bg-muted cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <i className="fa-solid fa-floppy-disk"></i>
                    <span>
                      {loading
                        ? "CARGANDO..."
                        : saving
                          ? "GUARDANDO..."
                          : mode === "create"
                            ? "GUARDAR"
                            : "ACTUALIZAR"}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex items-center p-2.5 justify-center size-10 rounded-lg bg-brand text-white transition-colors hover:bg-primary-hover"
                    aria-label="Cerrar modal"
                  >
                    <i className="fa-solid fa-sign-out-alt text-lg"></i>
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex items-center p-2.5 justify-center size-10 rounded-lg bg-brand text-white transition-colors hover:bg-primary-hover"
                  aria-label="Cerrar modal"
                >
                  <i className="fa-solid fa-sign-out-alt text-lg"></i>
                </button>
              )}
            </div>

            {/* Datos de filiación */}
            <div className="mb-6">
              <div className="flex items-center justify-between px-6">
                <h2 className="text-xl font-semibold text-text-primary">
                  Datos de filiación
                </h2>
                {!isReadOnlyMode ? <FechaHora /> : null}
              </div>
              <div className="rounded-lg p-6">
                <div className="grid grid-cols-4 gap-8 mb-6">
                  <div>
                    <label className="form-label" htmlFor="tipoDocumento">
                      Tipo de documento
                    </label>
                    <select
                      className="form-input"
                      id="tipoDocumento"
                      {...fMethods.register("pacienteData.tipoDocumento")}
                      disabled
                    >
                      <option value="" disabled>
                        Seleccionar
                      </option>
                      {catalogosTriajeMock.tiposDocumento.map((tipo) => (
                        <option key={tipo.num_item} value={tipo.num_item}>
                          {tipo.des_item}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="form-label" htmlFor="numDocumento">
                      N° de documento
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      id="numDocumento"
                      {...fMethods.register("pacienteData.numDocumento")}
                      disabled
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="form-label" htmlFor="nombreApellido">
                      Apellidos y nombres
                    </label>
                    <input
                      type="text"
                      className="form-input uppercase font-semibold text-text-primary"
                      id="nombreApellido"
                      {...fMethods.register("pacienteData.nombreApellido")}
                      disabled
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-8 mb-6">
                  <div>
                    <label className="form-label" htmlFor="fechaNacimiento">
                      Fecha de nacimiento
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      id="fechaNacimiento"
                      {...fMethods.register("pacienteData.fechaNacimiento")}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="sexo">
                      Sexo
                    </label>
                    <select
                      className="form-input"
                      id="sexo"
                      {...fMethods.register("pacienteData.sexo")}
                      disabled
                    >
                      <option value="" disabled>
                        Seleccionar
                      </option>
                      {catalogosTriajeMock.sexos.map((tipo) => (
                        <option key={tipo.num_item} value={tipo.num_item}>
                          {tipo.des_item}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="form-label" htmlFor="fechaAtencion">
                      Fecha de atención
                    </label>
                    <input
                      type="date"
                      className="form-input"
                      id="fechaAtencion"
                      {...fMethods.register("pacienteData.fechaAtencion")}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="horaAtencion">
                      Hora de atención
                    </label>
                    <input
                      type="time"
                      className="form-input"
                      id="horaAtencion"
                      {...fMethods.register("pacienteData.horaAtencion")}
                      disabled
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-8">
                  <div>
                    <label className="form-label" htmlFor="medicoAsignado">
                      Médico asignado
                    </label>
                    <select
                      className="form-input"
                      id="medicoAsignado"
                      {...fMethods.register("pacienteData.medicoAsignado")}
                      disabled
                    >
                      <option value="" disabled>
                        Seleccionar
                      </option>
                      {catalogosTriajeMock.medicos.map((medico) => (
                        <option key={medico.cdg_med} value={medico.cdg_med}>
                          {medico.des_med.split(" ").slice(0, 2).join(" ")} -{" "}
                          {medico.cod_med}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="form-label" htmlFor="procedencia">
                      Procedencia
                    </label>
                    <select
                      className="form-input"
                      id="procedencia"
                      {...fMethods.register("pacienteData.procedencia")}
                      disabled
                    >
                      <option value="" disabled>
                        Seleccionar
                      </option>
                      {catalogosTriajeMock.procedencia.map((proc) => (
                        <option key={proc.num_item} value={proc.num_item}>
                          {proc.des_item}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="form-label" htmlFor="ruc">
                      RUC
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      id="ruc"
                      {...fMethods.register("pacienteData.ruc")}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="razonSocial">
                      Razón social
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      id="razonSocial"
                      {...fMethods.register("pacienteData.razonSocial")}
                      disabled
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-8 mt-6">
                  <div>
                    <label className="form-label" htmlFor="codigoAtencion">
                      Codigo de atencion
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      id="codigoAtencion"
                      {...fMethods.register("pacienteData.codigoAtencion")}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="especialidad">
                      Especialidad
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      id="especialidad"
                      {...fMethods.register("pacienteData.especialidad")}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="motivoConsulta">
                      Motivo de consulta
                    </label>
                    <input
                      type="text"
                      className="form-input uppercase"
                      id="motivoConsulta"
                      {...fMethods.register("pacienteData.motivoConsulta")}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Secciones en dos columnas */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <AntecedentesFisiologicos readOnly={isReadOnlyMode} />
              <SignosVitales readOnly={isReadOnlyMode} />
            </div>
          </form>

          {/* Historial de atenciones */}
          {!isReadOnlyMode ? (
            <HistorialAtenciones
              historial={historial}
              onEditar={onEditarHistorial}
            />
          ) : null}
        </div>
      </FormProvider>
    </Modal>
  );
}
