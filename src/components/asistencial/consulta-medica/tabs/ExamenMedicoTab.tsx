import React, { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";

interface ExamenMedicoTabProps {
  esEmergencia?: boolean;
  readOnly?: boolean;
}

/**
 * Calcula IMC y su clasificación visual a partir de talla (m) y peso (kg).
 */
const calcularImc = (talla: string, peso: string) => {
  const alturaM = parseFloat(talla);
  const pesoKg = parseFloat(peso);

  if (alturaM > 0 && pesoKg > 0) {
    const imcVal = pesoKg / (alturaM * alturaM);
    if (imcVal < 18.5)
      return {
        imc: `${imcVal.toFixed(1)} - Bajo Peso`,
        clase: "bg-sky-200 text-sky-800",
      };
    if (imcVal < 25)
      return {
        imc: `${imcVal.toFixed(1)} - Normal`,
        clase: "bg-green-300 text-green-900",
      };
    if (imcVal < 30)
      return {
        imc: `${imcVal.toFixed(1)} - Sobrepeso`,
        clase: "bg-lime-300 text-lime-900",
      };
    if (imcVal < 35)
      return {
        imc: `${imcVal.toFixed(1)} - Obesidad I`,
        clase: "bg-yellow-300 text-yellow-900",
      };
    if (imcVal < 40)
      return {
        imc: `${imcVal.toFixed(1)} - Obesidad II`,
        clase: "bg-orange-400 text-orange-900",
      };
    return {
      imc: `${imcVal.toFixed(1)} - Obesidad III`,
      clase: "bg-red-500 text-white",
    };
  }

  return { imc: "", clase: "bg-surface-light text-text-primary" };
};

/**
 * Determina nivel de presión arterial y su estilo según valores sistólica/diastólica.
 */
const calcularPresion = (sistolica: string, diastolica: string) => {
  const sis = parseFloat(sistolica);
  const dia = parseFloat(diastolica);

  if (sis > 0 && dia > 0) {
    if (sis < 120 && dia < 80)
      return { nivel: "Presión Normal", clase: "bg-green-300 text-green-900" };
    if (sis >= 120 && sis <= 129 && dia < 80)
      return { nivel: "Presión Elevada", clase: "bg-yellow-300 text-yellow-900" };
    if ((sis >= 130 && sis <= 139) || (dia >= 80 && dia <= 89))
      return {
        nivel: "Hipertensión Etapa 1",
        clase: "bg-orange-400 text-orange-900",
      };
    if (sis >= 140 || dia >= 90)
      return { nivel: "Hipertensión Etapa 2", clase: "bg-red-500 text-white" };
    return { nivel: "Indeterminado", clase: "bg-gray-300 text-text-primary" };
  }

  return { nivel: "", clase: "bg-surface-light text-text-primary" };
};

export default function ExamenMedicoTab({
  esEmergencia = false,
  readOnly = false,
}: ExamenMedicoTabProps) {
  const { register, watch, setValue } = useFormContext();
  const signosVitalesDisabled = readOnly || !esEmergencia;

  const talla = watch("talla");
  const peso = watch("peso");
  const presionSistolica = watch("presionSistolica");
  const presionDiastolica = watch("presionDiastolica");

  const { imc, imcClase } = useMemo(() => {
    const resultado = calcularImc(talla, peso);
    return { imc: resultado.imc, imcClase: resultado.clase };
  }, [talla, peso]);

  const { nivelPresion, nivelPresionClase } = useMemo(() => {
    const resultado = calcularPresion(presionSistolica, presionDiastolica);
    return { nivelPresion: resultado.nivel, nivelPresionClase: resultado.clase };
  }, [presionSistolica, presionDiastolica]);

  useEffect(() => {
    setValue("imc", imc, { shouldValidate: false, shouldDirty: false });
    setValue("imcClase", imcClase, { shouldValidate: false, shouldDirty: false });
  }, [imc, imcClase, setValue]);

  useEffect(() => {
    setValue("nivelPresion", nivelPresion, {
      shouldValidate: false,
      shouldDirty: false,
    });
    setValue("nivelPresionClase", nivelPresionClase, {
      shouldValidate: false,
      shouldDirty: false,
    });
  }, [nivelPresion, nivelPresionClase, setValue]);

  return (
    <div className="flex flex-row">
      <div className="space-y-4 w-1/2 text-start text-text-primary">
        <h2 className="text-lg font-semibold mb-6">Signos Vitales</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-muted-80">
              <i className="fas fa-ruler text-white text-xl"></i>
            </div>
            <div className="flex-1">
              <label htmlFor="talla" className="block text-sm font-medium mb-1">
                Talla <span className="text-sm">(en metros, ej: 1.70)</span>
              </label>
              <input
                id="talla"
                {...register("talla", { disabled: signosVitalesDisabled })}
                type="number"
                step="0.01"
                className="w-full px-3 py-2 border-none rounded bg-surface-light"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-muted-80">
              <i className="fas fa-weight text-white text-xl"></i>
            </div>
            <div className="flex-1">
              <label htmlFor="peso" className="block text-sm font-medium mb-1">
                Peso <span className="text-sm">(en kg)</span>
              </label>
              <input
                id="peso"
                {...register("peso", { disabled: signosVitalesDisabled })}
                type="number"
                step="0.1"
                className="w-full px-3 py-2 border-none rounded bg-surface-light"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-muted-80">
              <i className="fas fa-user text-white text-xl"></i>
            </div>
            <div className="flex-1">
              <label htmlFor="imc" className="block text-sm font-medium mb-1">
                I.M.C.
              </label>
              <input
                id="imc"
                type="text"
                value={imc}
                readOnly
                className={`${imcClase} w-full px-3 py-2 rounded-lg transition-all duration-300 text-sm font-semibold cursor-default`}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-muted-80">
              <i className="fas fa-thermometer-half text-white text-xl"></i>
            </div>
            <div className="flex-1">
              <label htmlFor="temperatura" className="block text-sm font-medium mb-1">
                Temperatura
              </label>
              <input
                id="temperatura"
                {...register("temperatura", { disabled: signosVitalesDisabled })}
                type="number"
                step="0.1"
                className="w-full px-3 py-2 border-none rounded bg-surface-light"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-muted-80">
              <i className="fas fa-lungs text-white text-xl"></i>
            </div>
            <div className="flex-1">
              <label htmlFor="frecuenciaRespiratoria" className="block text-sm font-medium mb-1">
                F. Respiratoria
              </label>
              <input
                id="frecuenciaRespiratoria"
                {...register("frecuenciaRespiratoria", { disabled: signosVitalesDisabled })}
                type="number"
                className="w-full px-3 py-2 border-none rounded bg-surface-light"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-muted-80">
              <i className="fas fa-heartbeat text-white text-xl"></i>
            </div>
            <div className="flex-1">
              <label htmlFor="frecuenciaCardiaca" className="block text-sm font-medium mb-1">
                F. Cardiaca
              </label>
              <input
                id="frecuenciaCardiaca"
                {...register("frecuenciaCardiaca", { disabled: signosVitalesDisabled })}
                type="number"
                className="w-full px-3 py-2 border-none rounded bg-surface-light"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-muted-80">
              <i className="fas fa-tint text-white text-xl"></i>
            </div>
            <div className="flex-1">
              <label htmlFor="presionSistolica" className="block text-sm font-medium mb-1">
                P. Sistólica
              </label>
              <input
                id="presionSistolica"
                {...register("presionSistolica", { disabled: signosVitalesDisabled })}
                type="number"
                className="w-full px-3 py-2 border-none rounded bg-surface-light"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-muted-80">
              <i className="fas fa-tint text-white text-xl"></i>
            </div>
            <div className="flex-1">
              <label htmlFor="presionDiastolica" className="block text-sm font-medium mb-1">
                P. Diastólica
              </label>
              <input
                id="presionDiastolica"
                {...register("presionDiastolica", { disabled: signosVitalesDisabled })}
                type="number"
                className="w-full px-3 py-2 border-none rounded bg-surface-light"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-muted-80">
              <i className="fas fa-tint text-white text-xl"></i>
            </div>
            <div className="flex-1">
              <label htmlFor="nivelPresion" className="block text-sm font-medium mb-1">
                Nivel de presión
              </label>
              <input
                id="nivelPresion"
                type="text"
                value={nivelPresion}
                readOnly
                className={`${nivelPresionClase} w-full px-3 py-2 rounded-lg transition-all duration-300 text-sm font-semibold cursor-default`}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-muted-80">
              <i className="fas fa-hand-holding-heart text-white text-xl"></i>
            </div>
            <div className="flex-1">
              <label htmlFor="saturacionOxigeno" className="block text-sm font-medium mb-1">
                Saturación O₂
              </label>
              <input
                id="saturacionOxigeno"
                {...register("saturacionOxigeno", { disabled: signosVitalesDisabled })}
                type="number"
                className="w-full px-3 py-2 border-none rounded bg-surface-light"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-1/2">
        <div className="p-6 rounded-lg max-w-4xl mx-auto text-start">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-text-primary mb-2">Anamnesis</h3>
            <textarea
              rows={5}
              readOnly={readOnly}
              className="w-full p-2 border border-border-subtle rounded-lg bg-surface-light text-text-primary text-sm resize-y uppercase"
              {...register("anamnesis")}
            />
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-text-primary mb-2">Examen físico</h3>
            <textarea
              rows={5}
              readOnly={readOnly}
              className="w-full p-2 border border-border-subtle rounded-lg bg-surface-light text-text-primary text-sm resize-y uppercase"
              {...register("examenFisico")}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">Medicación habitual</h3>
            <textarea
              rows={5}
              readOnly={readOnly}
              className="w-full p-2 border border-border-subtle rounded-lg bg-surface-light text-text-primary text-sm resize-y uppercase"
              {...register("medicacionHabitual")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
