import { useFormContext } from "react-hook-form";
import type { AdmisionInput } from "./admision.types";

export default function ContactoEmergencia() {
  const { register } = useFormContext<AdmisionInput>();

  return (
    <div className="rounded-lg mt-6">
      <h2 className="mb-6 text-lg font-bold">Contacto de emergencia</h2>
      <div className="grid grid-cols-3 gap-6">
        <div>
          <label className="mb-3 block text-base font-medium text-text-primary">
            Contacto de emergencia
          </label>
          <input
            type="text"
            className="w-full rounded-lg border-none  bg-surface-light px-4 py-2"
            {...register("paciente.contacto_emergencia_nombre")}
          />
        </div>
        <div>
          <label className="mb-3 block text-base font-medium text-text-primary">
            Parentesco
          </label>
          <input
            type="text"
            className="w-full rounded-lg border-none  bg-surface-light px-4 py-2"
            {...register("paciente.contacto_emergencia_parentesco")}
          />
        </div>
        <div>
          <label className="mb-3 block text-base font-medium text-text-primary">
            N.º de contacto de emergencia
          </label>
          <input
            type="text"
            className="w-full rounded-lg border-none  bg-surface-light px-4 py-2"
            {...register("paciente.contacto_emergencia_telefono")}
          />
        </div>
      </div>
    </div>
  );
}
