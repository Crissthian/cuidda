import { medicosMock } from "@/lib/admisionData";
import React from "react";
import { useFormContext } from "react-hook-form";
import type { AdmisionInput } from "./admision.types";
import { useAdmision } from "./AdmisionContext";
import ModalComprobante from "./ModalComprobante";
import { useAdmisionComprobante } from "./useAdmisionComprobante";

export default function EspecialidadMedico() {
  const { catalogs, toggleModal, mode } = useAdmision();
  const { register, watch, setValue } = useFormContext<AdmisionInput>();
  const { canGenerateComprobante, disabledReason } = useAdmisionComprobante();
  const [isComprobanteModalOpen, setIsComprobanteModalOpen] =
    React.useState(false);
  const { especialidades } = catalogs;

  const nombre_medico = watch("atencion.nombre_medico");
  const numero_documento = watch("atencion.numero_documento");
  const yaTieneComprobante = Boolean(numero_documento?.trim());

  /**
   * Busca el médico por código y sincroniza el nombre si existe (mock).
   */
  const buscarMedicoPorCodigo = (codigo: string) => {
    if (!codigo || codigo.length < 2) return;
    const medico = medicosMock.find((m) => m.cdg_med.trim() === codigo.trim());

    if (medico) {
      setValue("atencion.codigo_medico", medico.cdg_med.trim());
      setValue("atencion.nombre_medico", medico.des_med.trim());
      return;
    }

    setValue("atencion.nombre_medico", "");
  };

  const handleMedicoKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      const ncod = e.currentTarget.value?.trim();
      buscarMedicoPorCodigo(ncod);
    }
  };

  return (
    <div className="mb-2 grid grid-cols-2 gap-x-12 gap-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-brand">
          Especialidad
        </label>
        <div className="relative">
          <select
            required
            disabled={mode === "actualizar"}
            className={`w-full appearance-none rounded-lg border-none bg-surface-light py-2 px-4 ${mode === "actualizar" ? "cursor-not-allowed opacity-70" : ""}`}
            {...register("atencion.especialidad")}
          >
            <option value="" disabled>
              SELECCIONE
            </option>
            {especialidades.map((especialidad) => (
              <option key={especialidad.num_item} value={especialidad.num_item}>
                {especialidad.des_item}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-brand">
          Médico
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            required
            className="flex-2 rounded-lg border-none  px-4 py-1 bg-surface-light"
            {...register("atencion.codigo_medico")}
            onKeyDown={handleMedicoKeyDown}
          />
          <input
            type="text"
            className="flex-5 rounded-lg border-none  px-4 py-1 bg-surface-light"
            value={nombre_medico || ""}
            readOnly
          />
          <button
            name="registroMedico"
            type="button"
            onClick={() => toggleModal("registroMedico", true)}
            className="flex text-xl items-center justify-center transition-colors cursor-pointer text-brand"
          >
            <i className="fa-solid fa-user-plus p-2.5"> </i>
          </button>
        </div>
      </div>
      <div className="mb-6 gap-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-brand">
            Motivo de consulta
          </label>
          <textarea
            className="w-full rounded-lg border-none  px-4 py-2 bg-surface-light uppercase"
            rows={3}
            {...register("atencion.motivo_consulta")}
          ></textarea>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <label className="mb-2 block text-sm font-medium text-brand">
              N.º de documento
            </label>
            <input
              type="text"
              readOnly={mode === "actualizar"}
              className={`rounded-lg w-50 border-none px-4 py-3 bg-surface-light uppercase ${mode === "actualizar" ? "cursor-not-allowed opacity-70" : ""}`}
              {...register("atencion.numero_documento")}
            />
          </div>
          <button
            type="button"
            onClick={() => setIsComprobanteModalOpen(true)}
            disabled={!canGenerateComprobante}
            title={
              disabledReason ||
              (yaTieneComprobante ? "Ver comprobante" : "Generar comprobante")
            }
            className="rounded-lg bg-brand text-sm px-6 py-2.5 mr-2 font-semibold text-white transition-colors hover:text-success self-end disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:text-white"
          >
            {yaTieneComprobante ? "Ver comprobante" : "Generar comprobante"}
          </button>
          <ModalComprobante
            isOpen={isComprobanteModalOpen}
            onClose={() => setIsComprobanteModalOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}
