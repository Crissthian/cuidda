import { useFormContext } from "react-hook-form";
import type { TriajeFormDTO } from "./triaje.types";

/**
 * Sección de antecedentes fisiológicos vinculada al formulario de triaje.
 */
export default function AntecedentesFisiologicos({
  readOnly = false,
}: {
  readOnly?: boolean;
}) {
  const { register } = useFormContext<TriajeFormDTO>();

  return (
    <div className="rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-text-primary mb-6">
        Antecedentes Fisiológicos
      </h2>

      <div className="space-y-4 text-text-primary">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="sed" className="form-label text-text-primary">
              Sed
            </label>
            <input
              id="sed"
              className="form-input uppercase"
              readOnly={readOnly}
              {...register("antecedentes.tri_sed")}
            />
          </div>
          <div>
            <label htmlFor="apetito" className="form-label text-text-primary">
              Apetito
            </label>
            <input
              id="apetito"
              className="form-input uppercase"
              readOnly={readOnly}
              {...register("antecedentes.tri_ape")}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4 text-text-primary">
        <div>
          <label htmlFor="miccion" className="form-label text-text-primary">
            Micción
          </label>
          <input
            id="miccion"
            className="form-input uppercase"
            readOnly={readOnly}
            {...register("antecedentes.tri_mic")}
          />
        </div>
        <div>
          <label htmlFor="sueno" className="form-label text-text-primary">
            Sueño
          </label>
          <input
            id="sueno"
            className="form-input uppercase"
            readOnly={readOnly}
            {...register("antecedentes.tri_sue")}
          />
        </div>
        <div>
          <label htmlFor="deposicion" className="form-label text-text-primary">
            Deposición
          </label>
          <input
            id="deposicion"
            className="form-input uppercase"
            readOnly={readOnly}
            {...register("antecedentes.tri_dep")}
          />
        </div>
        <div>
          <label
            htmlFor="estado_nutricional"
            className="form-label text-text-primary"
          >
            Estado nutricional
          </label>
          <input
            id="estado_nutricional"
            className="form-input uppercase"
            readOnly={readOnly}
            {...register("antecedentes.tri_estnut")}
          />
        </div>
        <div>
          <label htmlFor="sudor" className="form-label text-text-primary">
            Sudor
          </label>
          <input
            id="sudor"
            className="form-input uppercase"
            readOnly={readOnly}
            {...register("antecedentes.tri_sud")}
          />
        </div>
        <div>
          <label
            htmlFor="estado_animo"
            className="form-label text-text-primary"
          >
            Estado de ánimo
          </label>
          <input
            id="estado_animo"
            className="form-input uppercase"
            readOnly={readOnly}
            {...register("antecedentes.tri_estan")}
          />
        </div>
        <div>
          <label htmlFor="temperatura" className="form-label text-text-primary">
            Temperatura
          </label>
          <input
            id="temperatura"
            className="form-input uppercase"
            type="number"
            step="0.1"
            readOnly={readOnly}
            {...register("antecedentes.tri_temp")}
          />
        </div>
        <div>
          <label
            htmlFor="presion_arterial"
            className="form-label text-text-primary"
          >
            Presión Arterial
          </label>
          <input
            id="presion_arterial"
            className="form-input uppercase"
            type="number"
            readOnly={readOnly}
            {...register("antecedentes.tri_pres")}
          />
        </div>
      </div>
    </div>
  );
}
