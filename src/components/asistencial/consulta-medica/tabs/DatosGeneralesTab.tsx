import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import {
  historialAtencionesMock,
  type HistorialAtencionConsulta,
} from "@/lib/consultaMedicaData";

interface DatosGeneralesTabProps {
  onExamenesAuxiliaresLoaded?: (examenes: number[]) => void;
  readOnly?: boolean;
}

export default function DatosGeneralesTab({
  onExamenesAuxiliaresLoaded,
  readOnly = false,
}: DatosGeneralesTabProps = {}) {
  const { watch, setValue, register } = useFormContext();
  const [historialAtenciones, setHistorialAtenciones] = useState<
    HistorialAtencionConsulta[]
  >([]);
  const [atencionCargando, setAtencionCargando] = useState<string | null>(null);

  const dni = watch("dni");
  const descansoMedico = watch("descansoMedico");
  const sufreAlergiaCual = watch("sufreAlergia_cual");
  const patologicos = watch("patologicos");
  const quirurgicos = watch("quirurgicos");
  const traumatico = watch("traumatico");
  const toxicologicos = watch("toxicologicos");
  const sufreAlergia = watch("sufreAlergia");
  const tomaMedicamento = watch("tomaMedicamento");
  const restricciones = watch("restricciones");
  const hijos = watch("hijos");
  const hijosFallecidos = watch("hijos_fallecidos");
  const vacunaTetano = watch("vacuna_tetano");
  const vacunaHepatitisB = watch("vacuna_hepatitis_b");
  const vacunaCovid = watch("vacuna_covid");
  const vacunaVph = watch("vacuna_vph");

  useEffect(() => {
    if (descansoMedico === "2") {
      setValue("descansoMedico_dias", 0);
    }
  }, [descansoMedico, setValue]);

  useEffect(() => {
    if (patologicos === "2") setValue("patologicos_cual", "");
  }, [patologicos, setValue]);

  useEffect(() => {
    if (quirurgicos === "2") setValue("quirurgicos_cual", "");
  }, [quirurgicos, setValue]);

  useEffect(() => {
    if (traumatico === "2") setValue("traumatico_cual", "");
  }, [traumatico, setValue]);

  useEffect(() => {
    if (toxicologicos === "2") setValue("toxicologicos_cual", "");
  }, [toxicologicos, setValue]);

  useEffect(() => {
    if (sufreAlergia === "2") setValue("sufreAlergia_cual", "");
  }, [sufreAlergia, setValue]);

  useEffect(() => {
    if (tomaMedicamento === "2") setValue("tomaMedicamento_cual", "");
  }, [tomaMedicamento, setValue]);

  useEffect(() => {
    if (restricciones === "2") setValue("restricciones_descripcion", "");
  }, [restricciones, setValue]);

  useEffect(() => {
    if (hijos === "2") setValue("hijos_cuantos", 0);
  }, [hijos, setValue]);

  useEffect(() => {
    if (hijosFallecidos === "2") setValue("hijos_fallecidos_motivos", "");
  }, [hijosFallecidos, setValue]);

  useEffect(() => {
    if (!vacunaTetano) setValue("vacuna_tetano_dosis", 0);
  }, [vacunaTetano, setValue]);

  useEffect(() => {
    if (!vacunaHepatitisB) setValue("vacuna_hepatitis_b_dosis", 0);
  }, [vacunaHepatitisB, setValue]);

  useEffect(() => {
    if (!vacunaCovid) setValue("vacuna_covid_dosis", 0);
  }, [vacunaCovid, setValue]);

  useEffect(() => {
    if (!vacunaVph) setValue("vacuna_vph_dosis", 0);
  }, [vacunaVph, setValue]);

  useEffect(() => {
    setValue("alergias", sufreAlergiaCual || "");
  }, [sufreAlergiaCual, setValue]);

  // Cargar historial simulado cuando haya DNI
  useEffect(() => {
    if (dni && historialAtencionesMock[dni]) {
      setHistorialAtenciones(historialAtencionesMock[dni]);
    } else {
      setHistorialAtenciones([]);
    }
  }, [dni]);

  const cargarAtencionParaEdicion = (item: HistorialAtencionConsulta) => {
    setAtencionCargando(item.codigo_atencion);
    setTimeout(() => {
      setValue("especialidad", item.especialidad);
      toast.success(
        `Atención previa #${item.codigo_atencion} cargada para edición`
      );
      if (onExamenesAuxiliaresLoaded) {
        onExamenesAuxiliaresLoaded([1, 5, 12]);
      }
      setAtencionCargando(null);
    }, 400);
  };

  return (
    <fieldset disabled={readOnly} className="space-y-8">
      {/* Sección 1: Contingencias laborales */}
      <section className="text-text-primary">
        <div className="grid grid-cols-3 gap-16 p-3">
          <div className="flex items-center justify-between">
            <span>Enfermedad comun</span>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  value="1"
                  {...register("enfermedadComun")}
                  className="radio bg-muted-30 checked:text-brand text-surface-light align-middle"
                />
                <span className="text-sm text-text-primary">Si</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  {...register("enfermedadComun")}
                  value="2"
                  defaultChecked={true}
                  className="radio bg-muted-30 checked:text-brand text-surface-light align-middle"
                />
                <span className="text-sm text-text-primary">No</span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span>Accidente de trabajo</span>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  {...register("accidenteTrabajo")}
                  value="1"
                  className="radio bg-muted-30 checked:text-brand text-surface-light align-middle"
                />
                <span className="text-sm text-text-primary">Si</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  {...register("accidenteTrabajo")}
                  value="2"
                  defaultChecked={true}
                  className="radio bg-muted-30 checked:text-brand text-surface-light align-middle"
                />
                <span className="text-sm text-text-primary">No</span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span>Descanso médico</span>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  {...register("descansoMedico")}
                  value="1"
                  className="radio bg-muted-30 checked:text-brand text-surface-light align-middle"
                />
                <span className="text-sm text-text-primary">Sí</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  {...register("descansoMedico")}
                  value="2"
                  defaultChecked={true}
                  className="radio bg-muted-30 checked:text-brand text-surface-light align-middle"
                />
                <span className="text-sm text-text-primary">No</span>
              </label>
              <div
                className={`${watch("descansoMedico") == "1" ? "" : "opacity-0 cursor-not-allowed"}`}
              >
                <label htmlFor="descansoMedico_dias">Dias</label>
                <input
                  id="descansoMedico_dias"
                  type="number"
                  min={0}
                  className="p-2 bg-muted-30 text-text-primary rounded-lg w-16 ms-4"
                  {...register("descansoMedico_dias")}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-16 p-3">
          <div className="flex items-center justify-between">
            <span>Enfermedad profesional</span>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  {...register("enfermedadProfesional")}
                  value="1"
                  className="radio bg-muted-30 checked:text-brand text-surface-light align-middle"
                />
                <span className="text-sm text-text-primary">Si</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  {...register("enfermedadProfesional")}
                  value="2"
                  defaultChecked={true}
                  className="radio bg-muted-30 checked:text-brand text-surface-light align-middle"
                />
                <span className="text-sm text-text-primary">No</span>
              </label>
            </div>
          </div>

          <div className="flex justify-between items-center gap-3">
            <span>Accidente comun</span>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  {...register("accidenteComun")}
                  value="1"
                  className="radio bg-muted-30 checked:text-brand text-surface-light align-middle"
                />
                <span className="text-sm text-text-primary">Si</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  {...register("accidenteComun")}
                  value="2"
                  defaultChecked={true}
                  className="radio bg-muted-30 checked:text-brand text-surface-light align-middle"
                />
                <span className="text-sm text-text-primary">No</span>
              </label>
            </div>
          </div>

          <div className="flex justify-between items-center gap-3">
            <span>Reincorporacion laboral</span>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  {...register("reincorporacionLaboral")}
                  value="1"
                  className="radio bg-muted-30 checked:text-brand text-surface-light align-middle"
                />
                <span className="text-sm text-text-primary">Si</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  {...register("reincorporacionLaboral")}
                  value="2"
                  defaultChecked={true}
                  className="radio bg-muted-30 checked:text-brand text-surface-light align-middle"
                />
                <span className="text-sm text-text-primary">No</span>
              </label>
              <div className="ps-1">
                <label className="select-none">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <input
                  className="p-2 bg-muted-30 text-text-primary rounded-lg w-16 ms-4 opacity-0"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 2: Restricciones */}
      <section className="text-start">
        <h3 className="text-lg font-semibold text-brand mb-6 px-2">Restricciones</h3>
        <div className="flex items-start gap-8 px-2">
          <div className="flex flex-1 items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="text-text-primary">Sí</span>
              <input
                type="radio"
                value="1"
                {...register("restricciones")}
                className="radio bg-muted-30 checked:text-brand text-surface-light align-middle"
              />
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="text-text-primary">No</span>
              <input
                type="radio"
                value="2"
                {...register("restricciones")}
                defaultChecked={true}
                className="radio bg-muted-30 checked:text-brand text-surface-light align-middle"
              />
            </label>
          </div>

          <div
            className={`flex flex-1 flex-col items-end gap-6 ${watch("restricciones") == "2" ? "opacity-50" : ""}`}
          >
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="text-text-primary">Temporal</span>
              <input
                type="radio"
                value="1"
                {...register("restricciones_tipo")}
                disabled={watch("restricciones") == "2"}
                className="radio bg-muted-30 checked:text-brand text-surface-light align-middle"
              />
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="text-text-primary">Permanente</span>
              <input
                type="radio"
                value="2"
                {...register("restricciones_tipo")}
                disabled={watch("restricciones") == "2"}
                className="radio bg-muted-30 checked:text-brand text-surface-light align-middle"
              />
            </label>
          </div>

          <div className="flex-8 ms-12">
            <label className="block text-text-primary mb-1">Descripción de la restricción</label>
            <input
              type="text"
              {...register("restricciones_descripcion")}
              disabled={watch("restricciones") == "2"}
              className={`w-full p-2 bg-surface-light text-text-primary rounded-lg ${watch("restricciones") == "2" ? "opacity-50 cursor-not-allowed" : ""}`}
            />
          </div>
        </div>
      </section>

      {/* Sección 3: Antecedentes patológicos personales */}
      <section className="text-start">
        <h3 className="text-lg font-semibold text-brand mb-6 px-2">
          Antecedentes patológicos personales
        </h3>
        <div className="space-y-4 px-2">
          {/* Patológicos */}
          <div className="grid grid-cols-[220px_80px_80px_1fr] gap-4 items-center">
            <span className="text-text-primary">Patológicos</span>
            <div className="flex items-center gap-2">
              <label htmlFor="patologicos-si" className="flex items-center gap-2 cursor-pointer">
                <span className="text-text-primary text-sm">Sí</span>
                <input
                  id="patologicos-si"
                  type="radio"
                  value="1"
                  {...register("patologicos")}
                  className="radio bg-muted-30 checked:text-brand text-surface-light align-middle"
                />
              </label>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="patologicos-no" className="flex items-center gap-2 cursor-pointer">
                <span className="text-text-primary text-sm">No</span>
                <input
                  id="patologicos-no"
                  type="radio"
                  value="2"
                  {...register("patologicos")}
                  className="radio bg-muted-30 checked:text-brand text-surface-light align-middle"
                  defaultChecked={true}
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
                disabled={watch("patologicos") == "2"}
                className={`form-input flex-1 text-text-primary text-sm uppercase ${watch("patologicos") == "2" ? "opacity-50 cursor-not-allowed" : ""}`}
              />
            </div>
          </div>

          {/* Quirúrgicos */}
          <div className="grid grid-cols-[220px_80px_80px_1fr] gap-4 items-center">
            <span className="text-text-primary">Quirúrgicos</span>
            <div className="flex items-center gap-2">
              <label htmlFor="quirurgicos-si" className="flex items-center gap-2 cursor-pointer">
                <span className="text-text-primary text-sm">Sí</span>
                <input
                  id="quirurgicos-si"
                  type="radio"
                  value="1"
                  {...register("quirurgicos")}
                  className="radio bg-muted-30 checked:text-brand text-surface-light align-middle"
                />
              </label>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="quirurgicos-no" className="flex items-center gap-2 cursor-pointer">
                <span className="text-text-primary text-sm">No</span>
                <input
                  id="quirurgicos-no"
                  type="radio"
                  value="2"
                  {...register("quirurgicos")}
                  className="radio bg-muted-30 checked:text-brand text-surface-light align-middle"
                  defaultChecked={true}
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
                disabled={watch("quirurgicos") == "2"}
                className={`form-input flex-1 text-text-primary text-sm uppercase ${watch("quirurgicos") == "2" ? "opacity-50 cursor-not-allowed" : ""}`}
              />
            </div>
          </div>

          {/* Traumático */}
          <div className="grid grid-cols-[220px_80px_80px_1fr] gap-4 items-center">
            <span className="text-text-primary">Traumático</span>
            <div className="flex items-center gap-2">
              <label htmlFor="traumatico-si" className="flex items-center gap-2 cursor-pointer">
                <span className="text-text-primary text-sm">Sí</span>
                <input
                  id="traumatico-si"
                  type="radio"
                  value="1"
                  {...register("traumatico")}
                  className="radio bg-muted-30 checked:text-brand text-surface-light align-middle"
                />
              </label>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="traumatico-no" className="flex items-center gap-2 cursor-pointer">
                <span className="text-text-primary text-sm">No</span>
                <input
                  id="traumatico-no"
                  type="radio"
                  value="2"
                  {...register("traumatico")}
                  className="radio bg-muted-30 checked:text-brand text-surface-light align-middle"
                  defaultChecked={true}
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
                disabled={watch("traumatico") == "2"}
                className={`form-input flex-1 text-text-primary text-sm uppercase ${watch("traumatico") == "2" ? "opacity-50 cursor-not-allowed" : ""}`}
              />
            </div>
          </div>

          {/* Toxicológicos */}
          <div className="grid grid-cols-[220px_80px_80px_1fr] gap-4 items-center">
            <span className="text-text-primary">Toxicológicos</span>
            <div className="flex items-center gap-2">
              <label htmlFor="toxicologicos-si" className="flex items-center gap-2 cursor-pointer">
                <span className="text-text-primary text-sm">Sí</span>
                <input
                  id="toxicologicos-si"
                  type="radio"
                  value="1"
                  {...register("toxicologicos")}
                  className="radio bg-muted-30 checked:text-brand text-surface-light align-middle"
                />
              </label>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="toxicologicos-no" className="flex items-center gap-2 cursor-pointer">
                <span className="text-text-primary text-sm">No</span>
                <input
                  id="toxicologicos-no"
                  type="radio"
                  value="2"
                  {...register("toxicologicos")}
                  className="radio bg-muted-30 checked:text-brand text-surface-light align-middle"
                  defaultChecked={true}
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
                disabled={watch("toxicologicos") == "2"}
                className={`form-input flex-1 text-text-primary text-sm uppercase ${watch("toxicologicos") == "2" ? "opacity-50 cursor-not-allowed" : ""}`}
              />
            </div>
          </div>

          {/* ¿Sufre de alguna alergia? */}
          <div className="grid grid-cols-[220px_80px_80px_1fr] gap-4 items-center">
            <span className="text-text-primary">¿Sufre de alguna alergia?</span>
            <div className="flex items-center gap-2">
              <label htmlFor="sufreAlergia-si" className="flex items-center gap-2 cursor-pointer">
                <span className="text-text-primary text-sm">Sí</span>
                <input
                  id="sufreAlergia-si"
                  type="radio"
                  value="1"
                  {...register("sufreAlergia")}
                  className="radio bg-muted-30 checked:text-brand text-surface-light align-middle"
                />
              </label>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="sufreAlergia-no" className="flex items-center gap-2 cursor-pointer">
                <span className="text-text-primary text-sm">No</span>
                <input
                  id="sufreAlergia-no"
                  type="radio"
                  value="2"
                  {...register("sufreAlergia")}
                  className="radio bg-muted-30 checked:text-brand text-surface-light align-middle"
                  defaultChecked={true}
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
                {...register("sufreAlergia_cual")}
                disabled={watch("sufreAlergia") == "2"}
                className={`form-input flex-1 text-text-primary text-sm uppercase ${watch("sufreAlergia") == "2" ? "opacity-50 cursor-not-allowed" : ""}`}
              />
            </div>
          </div>

          {/* ¿Toma algún medicamento? */}
          <div className="grid grid-cols-[220px_80px_80px_1fr] gap-4 items-center">
            <span className="text-text-primary">¿Toma algún medicamento?</span>
            <div className="flex items-center gap-2">
              <label htmlFor="tomaMedicamento-si" className="flex items-center gap-2 cursor-pointer">
                <span className="text-text-primary text-sm">Sí</span>
                <input
                  id="tomaMedicamento-si"
                  type="radio"
                  value="1"
                  {...register("tomaMedicamento")}
                  className="radio bg-muted-30 checked:text-brand text-surface-light align-middle"
                />
              </label>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="tomaMedicamento-no" className="flex items-center gap-2 cursor-pointer">
                <span className="text-text-primary text-sm">No</span>
                <input
                  id="tomaMedicamento-no"
                  type="radio"
                  value="2"
                  {...register("tomaMedicamento")}
                  className="radio bg-muted-30 checked:text-brand text-surface-light align-middle"
                  defaultChecked={true}
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
                disabled={watch("tomaMedicamento") == "2"}
                className={`form-input flex-1 text-text-primary text-sm uppercase ${watch("tomaMedicamento") == "2" ? "opacity-50 cursor-not-allowed" : ""}`}
              />
            </div>
          </div>

          {/* Otros antecedentes */}
          <div className="grid grid-cols-[220px_1fr] gap-4">
            <span className="text-text-primary">Otros antecedentes</span>
            <textarea
              id="otrosAntecedentes"
              {...register("otrosAntecedentes")}
              rows={3}
              className="bg-surface-light rounded-md p-2 w-auto text-text-primary uppercase"
            />
          </div>
        </div>
      </section>

      {/* Sección 4: Vacunas */}
      <section className="text-start">
        <h3 className="text-lg font-semibold text-brand mb-6 px-2">Vacunas</h3>
        <div className="space-y-6 px-3">
          <div className="grid grid-cols-3 gap-44 pr-44">
            {/* Columna 1 */}
            <div className="space-y-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("vacuna_influenza")}
                  className="checkbox bg-muted-30 checked:text-brand text-surface-light w-5 h-5 rounded"
                />
                <span className="text-text-primary">Influenza</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("vacuna_neumococo")}
                  className="checkbox bg-muted-30 checked:text-brand text-surface-light w-5 h-5 rounded"
                />
                <span className="text-text-primary">Neumococo</span>
              </label>
            </div>

            {/* Columna 2 */}
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("vacuna_tetano")}
                    className="checkbox bg-muted-30 checked:text-brand text-surface-light w-5 h-5 rounded"
                  />
                  <span className="text-text-primary">Dift. Tetano</span>
                </label>
                <div
                  className={`flex items-center gap-2 ${!watch("vacuna_tetano") ? "opacity-50" : ""}`}
                >
                  <span className="text-text-primary">N° de dosis</span>
                  <input
                    type="number"
                    min={0}
                    placeholder="0"
                    {...register("vacuna_tetano_dosis")}
                    disabled={!watch("vacuna_tetano")}
                    className="w-16 p-1 bg-muted-30 rounded text-center text-text-primary"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("vacuna_hepatitis_b")}
                    className="checkbox bg-muted-30 checked:text-brand text-surface-light w-5 h-5 rounded"
                  />
                  <span className="text-text-primary">Hepatitis B</span>
                </label>
                <div
                  className={`flex items-center gap-2 ${!watch("vacuna_hepatitis_b") ? "opacity-50" : ""}`}
                >
                  <span className="text-text-primary">N° de dosis</span>
                  <input
                    type="number"
                    min={0}
                    placeholder="0"
                    {...register("vacuna_hepatitis_b_dosis")}
                    disabled={!watch("vacuna_hepatitis_b")}
                    className="w-16 p-1 bg-muted-30 rounded text-center text-text-primary"
                  />
                </div>
              </div>
            </div>

            {/* Columna 3 */}
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("vacuna_covid")}
                    className="checkbox bg-muted-30 checked:text-brand text-surface-light w-5 h-5 rounded"
                  />
                  <span className="text-text-primary">COVID-19</span>
                </label>
                <div
                  className={`flex items-center gap-2 ${!watch("vacuna_covid") ? "opacity-50" : ""}`}
                >
                  <span className="text-text-primary">N° de dosis</span>
                  <input
                    type="number"
                    min={0}
                    placeholder="0"
                    {...register("vacuna_covid_dosis")}
                    disabled={!watch("vacuna_covid")}
                    className="w-16 p-1 bg-muted-30 rounded text-center text-text-primary"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("vacuna_vph")}
                    className="checkbox bg-muted-30 checked:text-brand text-surface-light w-5 h-5 rounded"
                  />
                  <span className="text-text-primary">VPH</span>
                </label>
                <div className={`flex items-center gap-2 ${!watch("vacuna_vph") ? "opacity-50" : ""}`}>
                  <span className="text-text-primary">N° de dosis</span>
                  <input
                    type="number"
                    min={0}
                    placeholder="0"
                    {...register("vacuna_vph_dosis")}
                    disabled={!watch("vacuna_vph")}
                    className="w-16 p-1 bg-muted-30 rounded text-center text-text-primary"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8 pt-4">
            <span className="font-medium text-text-primary">Menores de 6 años:</span>

            <label htmlFor="vacunasMenores6-completo" className="flex items-center gap-3 cursor-pointer">
              <input
                id="vacunasMenores6-completo"
                type="radio"
                {...register("vacuna_esquema_completo")}
                value="1"
                className="radio bg-muted-30 checked:text-brand text-surface-light w-5 h-5"
              />
              <span className="text-text-primary">Calendario completo</span>
            </label>

            <label htmlFor="vacunasMenores6-incompleto" className="flex items-center gap-3 cursor-pointer">
              <input
                id="vacunasMenores6-incompleto"
                type="radio"
                {...register("vacuna_esquema_completo")}
                value="2"
                className="radio bg-muted-30 checked:text-brand text-surface-light w-5 h-5"
              />
              <span className="text-text-primary">Calendario incompleto</span>
            </label>
          </div>

          <div className="space-y-2">
            <label className="block font-medium text-text-primary">Comentarios</label>
            <textarea
              {...register("vacuna_comentarios")}
              rows={3}
              className="w-full bg-surface-light rounded-lg p-3 text-text-primary resize-y uppercase"
            />
          </div>
        </div>
      </section>

      {/* Sección 5: Antecedentes familiares */}
      <section>
        <h3 className="text-lg font-semibold text-brand mb-6 text-start px-2">
          Antecedentes familiares
        </h3>
        <div className="space-y-4 text-start px-2">
          <div className="grid grid-cols-[200px_1fr] gap-4 items-center">
            <span className="text-text-primary">Padre</span>
            <div className="flex items-center gap-2">
              <input
                id="padre-cual"
                type="text"
                placeholder=""
                {...register("padre_cual")}
                className="form-input flex-1 text-text-primary text-sm uppercase"
              />
            </div>
          </div>
          <div className="grid grid-cols-[200px_1fr] gap-4 items-center">
            <span className="text-text-primary">Madre</span>
            <div className="flex items-center gap-2">
              <input
                id="madre-cual"
                type="text"
                placeholder=""
                {...register("madre_cual")}
                className="form-input flex-1 text-text-primary text-sm uppercase"
              />
            </div>
          </div>
          <div className="grid grid-cols-[200px_1fr] gap-4 items-center">
            <span className="text-text-primary">Hermanos</span>
            <div className="flex items-center gap-2">
              <input
                id="hermanos-cual"
                type="text"
                placeholder=""
                {...register("hermanos_cual")}
                className="form-input flex-1 text-text-primary text-sm uppercase"
              />
            </div>
          </div>
          <div className="grid grid-cols-[200px_1fr] gap-4 items-center">
            <span className="text-text-primary">Esposa (o)</span>
            <div className="flex items-center gap-2">
              <input
                id="esposa-cual"
                type="text"
                placeholder=""
                {...register("esposa_cual")}
                className="form-input flex-1 text-text-primary text-sm uppercase"
              />
            </div>
          </div>
          <div className="grid grid-cols-[200px_60px_60px_200px_220px_60px_60px_1fr] gap-4 items-center">
            <span className="text-text-primary">¿Tiene hijos?</span>
            <div className="flex items-center gap-2">
              <label htmlFor="hijos-si" className="flex items-center gap-2 cursor-pointer">
                <span className="text-text-primary text-sm">Sí</span>
                <input
                  id="hijos-si"
                  type="radio"
                  {...register("hijos")}
                  value="1"
                  className="radio bg-muted-30 checked:text-brand text-surface-light align-middle"
                />
              </label>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="hijos-no" className="flex items-center gap-2 cursor-pointer">
                <span className="text-text-primary text-sm">No</span>
                <input
                  id="hijos-no"
                  type="radio"
                  {...register("hijos")}
                  value="2"
                  defaultChecked={true}
                  className="radio bg-muted-30 checked:text-brand text-surface-light align-middle"
                />
              </label>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="hijos-cuantos" className="text-text-primary">
                ¿Cuántos?
              </label>
              <input
                id="hijos-cuantos"
                type="number"
                {...register("hijos_cuantos", { disabled: watch("hijos") == "2" })}
                className={`form-input w-16 max-w-16 ${watch("hijos") == "2" ? "opacity-50 cursor-not-allowed" : ""}`}
              />
            </div>
            <span className="text-text-primary text-end">¿Hijos fallecidos?</span>
            <div className="flex items-center gap-2">
              <label htmlFor="hijos-fallecidos-si" className="flex items-center gap-2 cursor-pointer">
                <span className="text-text-primary text-sm">Sí</span>
                <input
                  id="hijos-fallecidos-si"
                  type="radio"
                  {...register("hijos_fallecidos")}
                  value="1"
                  className="radio bg-muted-30 checked:text-brand text-surface-light align-middle"
                />
              </label>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="hijos-fallecidos-no" className="flex items-center gap-2 cursor-pointer">
                <span className="text-text-primary text-sm">No</span>
                <input
                  id="hijos-fallecidos-no"
                  type="radio"
                  {...register("hijos_fallecidos")}
                  value="2"
                  defaultChecked={true}
                  className="radio bg-muted-30 checked:text-brand text-surface-light align-middle"
                />
              </label>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="hijos-fallecidos-motivos" className="text-text-primary">
                ¿Motivos?
              </label>
              <input
                id="hijos-fallecidos-motivos"
                type="text"
                {...register("hijos_fallecidos_motivos")}
                disabled={watch("hijos_fallecidos") == "2"}
                className={`form-input flex-1 text-text-primary text-sm uppercase ${watch("hijos_fallecidos") == "2" ? "opacity-50 cursor-not-allowed" : ""}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sección 6: Historial de atenciones */}
      <section>
        <h3 className="text-lg font-semibold text-brand mb-4 text-start px-2">
          Historial de atenciones
        </h3>

        <div className="rounded-lg overflow-hidden">
          {historialAtenciones.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <i className="fa-solid fa-inbox text-4xl mb-2"></i>
              <p>No se encontraron atenciones previas</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-surface-default">
                <tr>
                  <th className="divisor px-4 py-3 text-center text-sm font-semibold text-text-primary">
                    N°
                  </th>
                  <th className="divisor px-4 py-3 text-center text-sm font-semibold text-text-primary">
                    FECHA
                  </th>
                  <th className="divisor px-4 py-3 text-center text-sm font-semibold text-text-primary">
                    CÓDIGO DE ATENCION
                  </th>
                  <th className="divisor px-4 py-3 text-center text-sm font-semibold text-text-primary">
                    ESPECIALIDAD
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-text-primary">
                    RESPONSABLE MÉDICO
                  </th>
                </tr>
              </thead>
              <tbody>
                {historialAtenciones.map((item, index) => (
                  <tr
                    key={item.codigo_atencion + index}
                    className="border-b border-border-default"
                  >
                    <td className="px-4 py-4 text-text-primary">{index + 1}.-</td>
                    <td className="px-4 py-4">
                      <div className="bg-surface-light rounded px-3 py-2 text-text-primary">
                        {item.fecha_triaje}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="bg-surface-light rounded px-3 py-2 text-text-primary">
                        {item.codigo_atencion}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="bg-surface-light rounded px-3 py-2 text-text-primary">
                        {item.especialidad}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="bg-surface-light rounded px-3 py-2 text-text-primary flex-1">
                          {item.medico}
                        </div>
                        {!readOnly ? (
                          <button
                            type="button"
                            className="text-brand hover:text-primary-hover cursor-pointer disabled:cursor-wait disabled:text-text-primary"
                            title="Cargar datos de la atención"
                            onClick={() => cargarAtencionParaEdicion(item)}
                            disabled={atencionCargando === item.codigo_atencion}
                          >
                            {atencionCargando === item.codigo_atencion ? (
                              <i className="fa-solid fa-spinner fa-spin text-xl"></i>
                            ) : (
                              <i className="fa-solid fa-pen-to-square text-xl"></i>
                            )}
                          </button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {!readOnly ? (
        <div className="flex justify-end pt-4">
          <button
            type="button"
            className="bg-brand hover:bg-primary-hover text-white px-8 py-2 rounded-lg font-semibold transition-all cursor-pointer"
          >
            <i className="fa-solid fa-file-medical mr-2"></i>
            Ver historia clínica
          </button>
        </div>
      ) : null}
    </fieldset>
  );
}
