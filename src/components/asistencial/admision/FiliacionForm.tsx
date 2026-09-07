import { calcularEdad } from "@/lib/fechaUtils";
import React from "react";
import { useFormContext } from "react-hook-form";
import type { AdmisionInput } from "./admision.types";
import { useAdmision } from "./AdmisionContext";

export default function FiliacionForm() {
  const { catalogs } = useAdmision();
  const { register, watch, setValue } = useFormContext<AdmisionInput>();
  const { tiposDocumento, sexos, estadoCivil, gradoInstruccion } = catalogs;

  const edad = watch("paciente.edad");

  /**
   * Calcula la edad al momento para mantener coherencia visual.
   */
  const handleFechaNacimientoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const fecha = e.target.value;
    setValue("paciente.fecha_nacimiento", fecha);
    if (fecha) {
      const calculo = calcularEdad(fecha).toString();
      setValue("paciente.edad", calculo);
    } else {
      setValue("paciente.edad", "");
    }
  };

  return (
    <>
      <div className="grid grid-cols-[2fr_3fr_3fr] gap-3">
        <div>
          <label className="my-2 block text-sm font-medium text-text-primary">
            Código de UNACEM
          </label>
          <input
            type="text"
            className="w-full rounded-lg border-none  px-4 py-2 bg-surface-light"
            {...register("paciente.codigo_unacem")}
          />
        </div>
        <div>
          <label className="my-2 block text-sm font-medium text-text-primary">
            Tipo de documento
          </label>
          <div className="relative">
            <select
              className="w-full appearance-none rounded-lg border-none px-4 py-2  "
              {...register("paciente.tipo_documento")}
            >
              <option value="" disabled>
                SELECCIONE
              </option>
              {tiposDocumento.map((tipo) => (
                <option key={tipo.num_item} value={tipo.num_item}>
                  {tipo.des_item}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="my-2 block text-sm font-medium text-text-primary">
            N.º de documento
          </label>
          <input
            type="text"
            className="w-full rounded-lg border-none  px-4 py-2 bg-surface-light"
            {...register("paciente.numero_documento")}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="my-2 block text-sm font-medium text-text-primary">
            Apellidos
          </label>
          <input
            type="text"
            className="w-full rounded-lg border-none  px-4 py-2 bg-surface-light uppercase"
            {...register("paciente.apellido")}
          />
        </div>
        <div>
          <label className="my-2 block text-sm font-medium text-text-primary">
            Nombres
          </label>
          <input
            type="text"
            className="w-full rounded-lg border-none  px-4 py-2 bg-surface-light uppercase"
            {...register("paciente.nombre")}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="my-2 block text-sm font-medium text-text-primary">
            Sexo
          </label>
          <div className="relative">
            <select
              className="w-full appearance-none rounded-lg border-none px-4 py-2  "
              {...register("paciente.sexo")}
            >
              <option value="" disabled>
                SELECCIONE
              </option>
              {sexos.map((sexo) => {
                if (sexo.num_item !== "000") {
                  return (
                    <option key={sexo.num_item} value={sexo.num_item}>
                      {sexo.des_item}
                    </option>
                  );
                }
                return null;
              })}
            </select>
          </div>
        </div>
        <div>
          <label className="my-2 block text-sm font-medium text-text-primary">
            Fecha de nacimiento
          </label>
          <div className="relative">
            <input
              type="date"
              className="w-full rounded-lg border-none  px-4 py-2 bg-surface-light"
              {...register("paciente.fecha_nacimiento")}
              onChange={handleFechaNacimientoChange}
            />
          </div>
        </div>
        <div>
          <label className="my-2 block text-sm font-medium text-text-primary">
            Edad
          </label>
          <input
            type="text"
            className="w-full rounded-lg border-none  px-4 py-2 bg-surface-light"
            value={edad || ""}
            readOnly
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="my-2 block text-sm font-medium text-text-primary">
            Estado civil
          </label>
          <div className="relative">
            <select
              className="w-full appearance-none rounded-lg border-none px-4 py-2  "
              {...register("paciente.estado_civil")}
            >
              <option value="" disabled>
                SELECCIONE
              </option>
              {estadoCivil.map((estado) => (
                <option key={estado.num_item} value={estado.num_item}>
                  {estado.des_item}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="my-2 block text-sm font-medium text-text-primary">
            Grado de instrucción
          </label>
          <div className="relative">
            <select
              className="w-full appearance-none rounded-lg border-none px-4 py-2  "
              {...register("paciente.grado_instruccion")}
            >
              <option value="" disabled>
                SELECCIONE
              </option>
              {gradoInstruccion.map((grado) => (
                <option key={grado.num_item} value={grado.num_item}>
                  {grado.des_item}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="my-2 block text-sm font-medium text-text-primary">
            Teléfono
          </label>
          <input
            type="text"
            className="w-full rounded-lg border-none  px-4 py-2 bg-surface-light"
            {...register("paciente.telefono")}
          />
        </div>
      </div>
      <div>
        <label className="my-2 block text-sm font-medium text-text-primary">
          Correo
        </label>
        <input
          type="email"
          className="w-full rounded-lg border-none  px-4 py-2 bg-surface-light uppercase"
          {...register("paciente.correo")}
        />
      </div>
    </>
  );
}
