import { empresasMock as catalogsEmpresas } from "@/lib/admisionData";
import React from "react";
import { useFormContext } from "react-hook-form";
import type { AdmisionInput } from "./admision.types";
import { useAdmision } from "./AdmisionContext";

export default function SedeProcedencia() {
  const { catalogs, toggleModal } = useAdmision();
  const { register, watch, setValue } = useFormContext<AdmisionInput>();
  const { sedes, procedencias, planillas } = catalogs;

  const procedencia = watch("atencion.procedencia");
  const nombre_empresa = watch("atencion.nombre_empresa");

  const handleProcedenciaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setValue("atencion.procedencia", value);
    setValue("atencion.ruc_cliente", "");
    setValue("atencion.nombre_empresa", "");
    setValue("atencion.planilla", "");
  };

  /**
   * Busca la empresa por RUC cuando se abandona el campo y abre el modal si no se encuentra.
   */
  const handleRucKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      const ruc = (e.target as HTMLInputElement).value.trim();
      if (!ruc) {
        e.preventDefault();
        toggleModal("busquedaClientes", true);
        return;
      }
      // Simulación: si el RUC no coincide con una empresa mock, abrir modal
      const empresa = catalogsEmpresas.find((emp) => emp.ruc_cli === ruc);
      if (!empresa) {
        e.preventDefault();
        toggleModal("busquedaClientes", true);
        return;
      }
      setValue("atencion.nombre_empresa", empresa.des_cli);
    }
  };

  const showRucAndPlanilla = procedencia === "001";

  return (
    <>
      <div className="flex gap-3 px-6 py-3 w-3/4">
        <div className="flex-1">
          <label className="mb-2 block text-sm font-medium text-brand">
            Sede
          </label>
          <div className="relative">
            <select
              className="w-full appearance-none rounded-lg border-none bg-surface-light px-4 py-2 "
              {...register("atencion.sede")}
            >
              <option value="" disabled>
                SELECCIONE
              </option>
              {sedes.map((sede) => (
                <option key={sede.num_item} value={sede.num_item}>
                  {sede.des_item}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex-1">
          <label className="mb-2 block text-sm font-medium text-brand">
            Procedencia
          </label>
          <div className="relative mr-3">
            <select
              className="w-full appearance-none rounded-lg border-none bg-surface-light px-4 py-2 "
              value={procedencia}
              onChange={handleProcedenciaChange}
            >
              <option value="" disabled>
                SELECCIONE
              </option>
              {procedencias.map((procedencia) => (
                <option key={procedencia.num_item} value={procedencia.num_item}>
                  {procedencia.des_item}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex-1">
          {showRucAndPlanilla ? (
            <div id="planillasSelectContainer" className="ms-6">
              <label className="mb-2 block text-sm font-medium text-brand">
                Planilla
              </label>
              <div className="relative">
                <select
                  className="w-full appearance-none rounded-lg border-none bg-surface-light px-4 py-2 "
                  {...register("atencion.planilla")}
                >
                  <option value="" disabled>
                    SELECCIONE
                  </option>
                  {planillas.map((planilla) => (
                    <option key={planilla.num_item} value={planilla.num_item}>
                      {planilla.des_item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : (
            <div className="invisible">
              <label className="mb-2 block text-sm font-medium">&#8203;</label>
              <div className="relative">
                <div className="w-full rounded-lg bg-surface-light px-4 py-2">
                  &#8203;
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {showRucAndPlanilla && (
        <div className="mb-2 px-6">
          <div className="flex w-1/2 gap-3">
            <div className="flex-2">
              <label className="mb-2 block text-sm font-medium text-brand">
                RUC
              </label>
              <input
                type="text"
                className="w-full py-2 rounded-lg border-none  px-4 bg-surface-light"
                {...register("atencion.ruc_cliente")}
                onKeyDown={handleRucKeyDown}
              />
            </div>
            <div className="flex-5 mr-6">
              <label className="mb-2 block text-sm font-medium text-brand">
                Razón Social
              </label>
              <input
                type="text"
                className="w-full py-2 rounded-lg border-none  px-4 bg-surface-light"
                value={nombre_empresa || ""}
                readOnly
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
