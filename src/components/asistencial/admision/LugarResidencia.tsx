import { useFormContext } from "react-hook-form";
import type { AdmisionInput } from "./admision.types";

export default function LugarResidencia() {
  const { register } = useFormContext<AdmisionInput>();

  return (
    <div className="rounded-lg">
      <div>
        <label className="my-2 block text-sm font-medium text-text-primary">
          Lugar de residencia
        </label>
        <input
          type="text"
          className="w-full rounded-lg border-none  px-4 py-2 bg-surface-light"
          {...register("paciente.direccion")}
        />
      </div>
      <div>
        <label className="my-2 block text-sm font-medium text-text-primary">
          Lugar de nacimiento
        </label>
        <input
          type="text"
          className="w-full rounded-lg border-none  px-4 py-2 bg-surface-light"
          {...register("paciente.lugar_nacimiento")}
        />
      </div>
    </div>
  );
}
