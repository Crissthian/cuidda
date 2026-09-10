import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtencionOdontoStore } from "../store/useAtencionOdontoStore";
import {
  ANTECEDENTE_NO,
  consultaOdontoSchema,
  VALORES_INICIALES_CONSULTA,
  type ConsultaOdontoDTO,
} from "../schema";

interface ConsultaTabProps {
  onSaveSuccess?: (payload: { estadoAtencion: string; codigoOdontologia?: string }) => void;
  onLoadComplete?: (cargado: boolean) => void;
  readOnly?: boolean;
}

export interface ConsultaTabRef {
  handleSave: () => Promise<boolean>;
  validate: () => Promise<boolean>;
  getFormData: () => ConsultaOdontoDTO;
}

/**
 * Formulario principal de la consulta odontológica.
 * Maneja antecedentes, enfermedad actual y diagnósticos preliminares.
 */
export const ConsultaTab = React.forwardRef<ConsultaTabRef, ConsultaTabProps>(
  ({ onLoadComplete, readOnly = false }, ref) => {
    const { datosEvento, alergiasTemp, setAlergiasTemp } = useAtencionOdontoStore();

    const nombreMedico = datosEvento?.nombreMedico ?? "";
    const motivoConsulta = datosEvento?.motivoConsulta ?? "";

    const methods = useForm<ConsultaOdontoDTO>({
      resolver: zodResolver(consultaOdontoSchema),
      defaultValues: {
        ...VALORES_INICIALES_CONSULTA,
        doctor: nombreMedico,
        motivo_consulta: motivoConsulta,
        tiempo_enfermedad: "",
        signos_sintomas: "",
        comentarios_generales: "",
        padre_cual: "",
        madre_cual: "",
        hermanos_cual: "",
        esposa_cual: "",
        patologicos_cual: "",
        quirurgicos_cual: "",
        traumatico_cual: "",
        toxicologicos_cual: "",
        sufreAlergia_cual: "",
        tomaMedicamento_cual: "",
        otros_antecedentes: "",
        recomendaciones: "",
      },
    });

    const {
      register,
      watch,
      setValue,
      getValues,
      trigger,
      formState: { errors },
    } = methods;

    const antPatologicos = watch("ant_patologicos");
    const antQuirurgicos = watch("ant_quirurgicos");
    const antTraumatico = watch("ant_traumatico");
    const antToxicologicos = watch("ant_toxicologicos");
    const antAlergia = watch("ant_alergia");
    const antMedicamento = watch("ant_medicamento");

    useEffect(() => {
      if (datosEvento) {
        setValue("doctor", datosEvento.nombreMedico || "");
        setValue("motivo_consulta", datosEvento.motivoConsulta || "");
      }
      onLoadComplete?.(true);
    }, [datosEvento, setValue, onLoadComplete]);

    useEffect(() => {
      if (alergiasTemp !== getValues("sufreAlergia_cual")) {
        setValue("sufreAlergia_cual", alergiasTemp);
      }
    }, [alergiasTemp, setValue, getValues]);

    // Limpieza de campos "_cual" al seleccionar "NO"
    useEffect(() => {
      if (antPatologicos === ANTECEDENTE_NO) setValue("patologicos_cual", "");
      if (antQuirurgicos === ANTECEDENTE_NO) setValue("quirurgicos_cual", "");
      if (antTraumatico === ANTECEDENTE_NO) setValue("traumatico_cual", "");
      if (antToxicologicos === ANTECEDENTE_NO) setValue("toxicologicos_cual", "");
      if (antAlergia === ANTECEDENTE_NO) {
        setValue("sufreAlergia_cual", "");
        setAlergiasTemp("");
      }
      if (antMedicamento === ANTECEDENTE_NO) setValue("tomaMedicamento_cual", "");
    }, [
      antPatologicos,
      antQuirurgicos,
      antTraumatico,
      antToxicologicos,
      antAlergia,
      antMedicamento,
      setValue,
      setAlergiasTemp,
    ]);

    React.useImperativeHandle(ref, () => ({
      handleSave: async () => true,
      validate: async () => await trigger(),
      getFormData: () => getValues(),
    }));

    return (
      <fieldset disabled={readOnly} className="contents">
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-text-secondary mb-1">Doctor</label>
                <input type="text" className="form-input rounded-lg" readOnly {...register("doctor")} />
                {errors.doctor && (
                  <span className="text-xs text-red-500 mt-1">{errors.doctor.message}</span>
                )}
              </div>

              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-brand mb-2">Enfermedad Actual</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col">
                    <label className="text-sm text-text-secondary mb-1">Tiempo de enfermedad</label>
                    <textarea
                      className="form-input rounded-lg"
                      rows={6}
                      {...register("tiempo_enfermedad")}
                    ></textarea>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm text-text-secondary mb-1">
                      Signos y síntomas principales
                    </label>
                    <textarea
                      className="form-input rounded-lg"
                      rows={6}
                      {...register("signos_sintomas")}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-brand mb-2">Comentarios Generales</h3>
                <textarea
                  className="form-input rounded-lg"
                  rows={6}
                  {...register("comentarios_generales")}
                ></textarea>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-text-secondary mb-1">
                  Motivo de atención
                </label>
                <input
                  type="text"
                  className="form-input rounded-lg"
                  readOnly
                  {...register("motivo_consulta")}
                />
              </div>

              <div className="flex flex-col">
                <div className="flex flex-col gap-3">
                  <section>
                    <h3 className="text-lg font-semibold text-brand mb-6 text-start px-2">
                      Antecedentes familiares
                    </h3>
                    <div className="space-y-4 text-start px-2">
                      {/* Padre */}
                      <div className="grid grid-cols-[200px_1fr] gap-4 items-center">
                        <span className="text-text-primary">Padre</span>
                        <div className="flex items-center gap-2">
                          <input
                            id="padre-cual"
                            type="text"
                            {...register("padre_cual")}
                            placeholder=""
                            className="form-input flex-1 text-text-primary text-sm uppercase"
                          />
                        </div>
                      </div>
                      {/* Madre */}
                      <div className="grid grid-cols-[200px_1fr] gap-4 items-center">
                        <span className="text-text-primary">Madre</span>
                        <div className="flex items-center gap-2">
                          <input
                            id="madre-cual"
                            type="text"
                            {...register("madre_cual")}
                            placeholder=""
                            className="form-input flex-1 text-text-primary text-sm uppercase"
                          />
                        </div>
                      </div>
                      {/* Hermanos */}
                      <div className="grid grid-cols-[200px_1fr] gap-4 items-center">
                        <span className="text-text-primary">Hermanos</span>
                        <div className="flex items-center gap-2">
                          <input
                            id="hermanos-cual"
                            type="text"
                            {...register("hermanos_cual")}
                            placeholder=""
                            className="form-input flex-1 text-text-primary text-sm uppercase"
                          />
                        </div>
                      </div>
                      {/* Esposa(o) */}
                      <div className="grid grid-cols-[200px_1fr] gap-4 items-center">
                        <span className="text-text-primary">Esposa (o)</span>
                        <div className="flex items-center gap-2">
                          <input
                            id="esposa-cual"
                            type="text"
                            {...register("esposa_cual")}
                            placeholder=""
                            className="form-input flex-1 text-text-primary text-sm uppercase"
                          />
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Antecedentes patológicos personales */}
                  <section className="text-start">
                    <h3 className="text-lg font-semibold text-brand mb-6 px-2">
                      Antecedentes patológicos personales
                    </h3>
                    <div className="space-y-4 px-2">
                      {/* Patológicos */}
                      <div className="grid grid-cols-[220px_80px_80px_1fr] gap-4 items-center">
                        <span className="text-text-primary">Patológicos</span>
                        <div className="flex items-center gap-2">
                          <label
                            htmlFor="patologicos-si"
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <span className="text-text-primary text-sm">Sí</span>
                            <input
                              id="patologicos-si"
                              type="radio"
                              value="1"
                              {...register("ant_patologicos")}
                              className="radio bg-muted-30 checked:text-brand text-surface-light"
                            />
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <label
                            htmlFor="patologicos-no"
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <span className="text-text-primary text-sm">No</span>
                            <input
                              id="patologicos-no"
                              type="radio"
                              value="2"
                              {...register("ant_patologicos")}
                              className="radio bg-muted-30 checked:text-brand text-surface-light"
                            />
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <label htmlFor="patologicos-cual" className="text-text-primary">
                            ¿Cuál?
                          </label>
                          <input
                            id="patologicos-cual"
                            type="text"
                            placeholder="NINGUNA"
                            {...register("patologicos_cual")}
                            disabled={antPatologicos === ANTECEDENTE_NO}
                            className={`form-input flex-1 text-text-primary text-sm uppercase ${antPatologicos === ANTECEDENTE_NO ? "opacity-50 cursor-not-allowed" : ""}`}
                          />
                        </div>
                      </div>

                      {/* Quirúrgicos */}
                      <div className="grid grid-cols-[220px_80px_80px_1fr] gap-4 items-center">
                        <span className="text-text-primary">Quirúrgicos</span>
                        <div className="flex items-center gap-2">
                          <label
                            htmlFor="quirurgicos-si"
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <span className="text-text-primary text-sm">Sí</span>
                            <input
                              id="quirurgicos-si"
                              type="radio"
                              value="1"
                              {...register("ant_quirurgicos")}
                              className="radio bg-muted-30 checked:text-brand text-surface-light"
                            />
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <label
                            htmlFor="quirurgicos-no"
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <span className="text-text-primary text-sm">No</span>
                            <input
                              id="quirurgicos-no"
                              type="radio"
                              value="2"
                              {...register("ant_quirurgicos")}
                              className="radio bg-muted-30 checked:text-brand text-surface-light"
                            />
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <label htmlFor="quirurgicos-cual" className="text-text-primary">
                            ¿Cuál?
                          </label>
                          <input
                            id="quirurgicos-cual"
                            type="text"
                            placeholder="NINGUNA"
                            {...register("quirurgicos_cual")}
                            disabled={antQuirurgicos === ANTECEDENTE_NO}
                            className={`form-input flex-1 text-text-primary text-sm uppercase ${antQuirurgicos === ANTECEDENTE_NO ? "opacity-50 cursor-not-allowed" : ""}`}
                          />
                        </div>
                      </div>

                      {/* Traumático */}
                      <div className="grid grid-cols-[220px_80px_80px_1fr] gap-4 items-center">
                        <span className="text-text-primary">Traumático</span>
                        <div className="flex items-center gap-2">
                          <label
                            htmlFor="traumatico-si"
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <span className="text-text-primary text-sm">Sí</span>
                            <input
                              id="traumatico-si"
                              type="radio"
                              value="1"
                              {...register("ant_traumatico")}
                              className="radio bg-muted-30 checked:text-brand text-surface-light"
                            />
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <label
                            htmlFor="traumatico-no"
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <span className="text-text-primary text-sm">No</span>
                            <input
                              id="traumatico-no"
                              type="radio"
                              value="2"
                              {...register("ant_traumatico")}
                              className="radio bg-muted-30 checked:text-brand text-surface-light"
                            />
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <label htmlFor="traumatico-cual" className="text-text-primary">
                            ¿Cuál?
                          </label>
                          <input
                            id="traumatico-cual"
                            type="text"
                            placeholder="NINGUNA"
                            {...register("traumatico_cual")}
                            disabled={antTraumatico === ANTECEDENTE_NO}
                            className={`form-input flex-1 text-text-primary text-sm uppercase ${antTraumatico === ANTECEDENTE_NO ? "opacity-50 cursor-not-allowed" : ""}`}
                          />
                        </div>
                      </div>

                      {/* Toxicológicos */}
                      <div className="grid grid-cols-[220px_80px_80px_1fr] gap-4 items-center">
                        <span className="text-text-primary">Toxicológicos</span>
                        <div className="flex items-center gap-2">
                          <label
                            htmlFor="toxicologicos-si"
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <span className="text-text-primary text-sm">Sí</span>
                            <input
                              id="toxicologicos-si"
                              type="radio"
                              value="1"
                              {...register("ant_toxicologicos")}
                              className="radio bg-muted-30 checked:text-brand text-surface-light"
                            />
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <label
                            htmlFor="toxicologicos-no"
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <span className="text-text-primary text-sm">No</span>
                            <input
                              id="toxicologicos-no"
                              type="radio"
                              value="2"
                              {...register("ant_toxicologicos")}
                              className="radio bg-muted-30 checked:text-brand text-surface-light"
                            />
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <label htmlFor="toxicologicos-cual" className="text-text-primary">
                            ¿Cuál?
                          </label>
                          <input
                            id="toxicologicos-cual"
                            type="text"
                            placeholder="NINGUNA"
                            {...register("toxicologicos_cual")}
                            disabled={antToxicologicos === ANTECEDENTE_NO}
                            className={`form-input flex-1 text-text-primary text-sm uppercase ${antToxicologicos === ANTECEDENTE_NO ? "opacity-50 cursor-not-allowed" : ""}`}
                          />
                        </div>
                      </div>

                      {/* ¿Sufre de alguna alergia? */}
                      <div className="grid grid-cols-[220px_80px_80px_1fr] gap-4 items-center">
                        <span className="text-text-primary">¿Sufre de alguna alergia?</span>
                        <div className="flex items-center gap-2">
                          <label
                            htmlFor="sufreAlergia-si"
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <span className="text-text-primary text-sm">Sí</span>
                            <input
                              id="sufreAlergia-si"
                              type="radio"
                              value="1"
                              {...register("ant_alergia")}
                              className="radio bg-muted-30 checked:text-brand text-surface-light"
                            />
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <label
                            htmlFor="sufreAlergia-no"
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <span className="text-text-primary text-sm">No</span>
                            <input
                              id="sufreAlergia-no"
                              type="radio"
                              value="2"
                              {...register("ant_alergia")}
                              className="radio bg-muted-30 checked:text-brand text-surface-light"
                            />
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <label htmlFor="sufreAlergia-cual" className="text-text-primary">
                            ¿Cuál?
                          </label>
                          <input
                            id="sufreAlergia-cual"
                            type="text"
                            placeholder="NINGUNA"
                            {...register("sufreAlergia_cual", {
                              onChange: (e) => setAlergiasTemp(e.target.value),
                            })}
                            disabled={antAlergia === ANTECEDENTE_NO}
                            className={`form-input flex-1 text-text-primary text-sm uppercase ${antAlergia === ANTECEDENTE_NO ? "opacity-50 cursor-not-allowed" : ""}`}
                          />
                        </div>
                      </div>

                      {/* ¿Toma algún medicamento? */}
                      <div className="grid grid-cols-[220px_80px_80px_1fr] gap-4 items-center">
                        <span className="text-text-primary">¿Toma algún medicamento?</span>
                        <div className="flex items-center gap-2">
                          <label
                            htmlFor="tomaMedicamento-si"
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <span className="text-text-primary text-sm">Sí</span>
                            <input
                              id="tomaMedicamento-si"
                              type="radio"
                              value="1"
                              {...register("ant_medicamento")}
                              className="radio bg-muted-30 checked:text-brand text-surface-light"
                            />
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <label
                            htmlFor="tomaMedicamento-no"
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <span className="text-text-primary text-sm">No</span>
                            <input
                              id="tomaMedicamento-no"
                              type="radio"
                              value="2"
                              {...register("ant_medicamento")}
                              className="radio bg-muted-30 checked:text-brand text-surface-light"
                            />
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <label htmlFor="tomaMedicamento-cual" className="text-text-primary">
                            ¿Cuál?
                          </label>
                          <input
                            id="tomaMedicamento-cual"
                            type="text"
                            placeholder="NINGUNA"
                            {...register("tomaMedicamento_cual")}
                            disabled={antMedicamento === ANTECEDENTE_NO}
                            className={`form-input flex-1 text-text-primary text-sm uppercase ${antMedicamento === ANTECEDENTE_NO ? "opacity-50 cursor-not-allowed" : ""}`}
                          />
                        </div>
                      </div>

                      {/* Otros antecedentes */}
                      <div className="grid grid-cols-[220px_1fr] gap-4">
                        <span className="text-text-primary">Otros antecedentes</span>
                        <textarea
                          id="otrosAntecedentes"
                          rows={3}
                          {...register("otros_antecedentes")}
                          className="bg-surface-light rounded-md p-2 w-auto text-text-primary uppercase"
                        />
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </fieldset>
    );
  }
);

ConsultaTab.displayName = "ConsultaTab";
