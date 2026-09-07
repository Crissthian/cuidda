import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import type { TriajeFormDTO } from "./triaje.types";

interface IMCCategory {
  max: number;
  label: string;
  className: string;
}

interface PresionRange {
  predicate: (sis: number, dia: number) => boolean;
  label: string;
  className: string;
}

const INDICATOR_DEFAULT_CLASS =
  "w-full px-3 py-2 bg-surface-light rounded transition-all duration-300 text-sm font-semibold text-text-primary cursor-default";
const INDICATOR_ACTIVE_BASE =
  "w-full  px-3 py-2 rounded-lg transition-all duration-300 text-sm font-semibold cursor-default";

const IMC_CATEGORIES: IMCCategory[] = [
  { max: 18.5, label: "Bajo Peso", className: "bg-sky-200 text-sky-800" },
  { max: 25, label: "Normal", className: "bg-green-300 text-green-900" },
  { max: 30, label: "Sobrepeso", className: "bg-lime-300 text-lime-900" },
  { max: 35, label: "Obesidad I", className: "bg-yellow-300 text-yellow-900" },
  { max: 40, label: "Obesidad II", className: "bg-orange-400 text-orange-900" },
  {
    max: Number.POSITIVE_INFINITY,
    label: "Obesidad III",
    className: "bg-red-500 text-white",
  },
];

const PRESION_RANGES: PresionRange[] = [
  {
    predicate: (sis: number, dia: number) => sis < 120 && dia < 80,
    label: "Presión Normal",
    className: "bg-green-300 text-green-900",
  },
  {
    predicate: (sis: number, dia: number) => sis >= 120 && sis <= 129 && dia < 80,
    label: "Presión Elevada",
    className: "bg-yellow-300 text-yellow-900",
  },
  {
    predicate: (sis: number, dia: number) =>
      (sis >= 130 && sis <= 139) || (dia >= 80 && dia <= 89),
    label: "Hipertensión Etapa 1",
    className: "bg-orange-400 text-orange-900",
  },
  {
    predicate: (sis: number, dia: number) => sis >= 140 || dia >= 90,
    label: "Hipertensión Etapa 2",
    className: "bg-red-500 text-white",
  },
];

/**
 * Sección de signos vitales con cálculos derivados (IMC y rango de presión) en tiempo real.
 */
export default function SignosVitales({
  readOnly = false,
}: {
  readOnly?: boolean;
}) {
  const { register, watch } = useFormContext<TriajeFormDTO>();
  const [imc, setImc] = useState({
    value: "--",
    className: INDICATOR_DEFAULT_CLASS,
  });
  const [nivelPresion, setNivelPresion] = useState({
    value: "--",
    className: INDICATOR_DEFAULT_CLASS,
  });

  const talla = watch("signosVitales.talla");
  const peso = watch("signosVitales.peso");
  const presion_sistolica = watch("signosVitales.presion_sistolica");
  const presion_diastolica = watch("signosVitales.presion_diastolica");

  const asNumber = (value: string | number | undefined) => {
    if (value === undefined || value === "") return NaN;
    const parsed = typeof value === "string" ? parseFloat(value) : value;
    return Number.isFinite(parsed) ? parsed : NaN;
  };

  const calcularIMC = (alturaM?: number, pesoKg?: number) => {
    const altura = asNumber(alturaM);
    const peso = asNumber(pesoKg);

    if (altura > 0 && peso > 0) {
      const imcValue = peso / (altura * altura);
      const categoria =
        IMC_CATEGORIES.find(({ max }) => imcValue < max) ??
        IMC_CATEGORIES[IMC_CATEGORIES.length - 1];
      setImc({
        value: `${imcValue.toFixed(1)} - ${categoria.label}`,
        className: `${categoria.className} ${INDICATOR_ACTIVE_BASE}`,
      });
    } else {
      setImc({ value: "--", className: INDICATOR_DEFAULT_CLASS });
    }
  };

  const calcularPresion = (sis?: number, dia?: number) => {
    const sistolica = asNumber(sis);
    const diastolica = asNumber(dia);

    if (sistolica > 0 && diastolica > 0) {
      const categoria =
        PRESION_RANGES.find(({ predicate }) =>
          predicate(sistolica, diastolica),
        ) ?? {
          className: "bg-gray-300 text-text-primary",
          label: "Indeterminado",
        };
      setNivelPresion({
        value: categoria.label,
        className: `${categoria.className} ${INDICATOR_ACTIVE_BASE}`,
      });
    } else {
      setNivelPresion({ value: "--", className: INDICATOR_DEFAULT_CLASS });
    }
  };

  // Calcular IMC cuando cambian talla o peso
  useEffect(() => {
    calcularIMC(talla, peso);
  }, [talla, peso]);

  // Calcular nivel de presión cuando cambian los valores
  useEffect(() => {
    calcularPresion(presion_sistolica, presion_diastolica);
  }, [presion_sistolica, presion_diastolica]);

  return (
    <div className="space-y-4 p-6 shadow-sm text-text-primary">
      <h2 className="text-lg font-semibold mb-6">Signos Vitales</h2>

      {/* Fila 1 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-accent-muted rounded-lg flex items-center justify-center">
            <i className="fas fa-ruler text-white text-xl"></i>
          </div>
          <div className="flex-1">
            <label
              htmlFor="talla"
              className="block text-sm font-medium text-primary mb-1"
            >
              Talla{" "}
              <span className="text-sm text-text-primary">
                (en metros, ej: 1.70)
              </span>
            </label>
            <input
              id="talla"
              type="number"
              step="0.01"
              readOnly={readOnly}
              className="w-full px-3 py-2 bg-surface-light border-none rounded text-primary "
              {...register("signosVitales.talla")}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-accent-muted rounded-lg flex items-center justify-center">
            <i className="fas fa-weight text-white text-xl"></i>
          </div>
          <div className="flex-1">
            <label
              htmlFor="peso"
              className="block text-sm font-medium text-primary mb-1"
            >
              Peso <span className="text-sm text-text-primary">(en kg)</span>
            </label>
            <input
              id="peso"
              type="number"
              step="0.1"
              readOnly={readOnly}
              className="w-full px-3 py-2 bg-surface-light border-none rounded text-primary "
              {...register("signosVitales.peso")}
            />
          </div>
        </div>
      </div>

      {/* Fila 2 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-accent-muted rounded-lg flex items-center justify-center">
            <i className="fas fa-user text-white text-xl"></i>
          </div>
          <div className="flex-1">
            <label
              htmlFor="imc"
              className="block text-sm font-medium text-primary mb-1"
            >
              I.M.C.
            </label>
            <input
              id="imc"
              name="imc"
              readOnly
              type="text"
              value={imc.value}
              disabled
              className={imc.className}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-accent-muted rounded-lg flex items-center justify-center">
            <i className="fas fa-thermometer-half text-white text-xl"></i>
          </div>
          <div className="flex-1">
            <label
              htmlFor="temperatura_sv"
              className="block text-sm font-medium text-primary mb-1"
            >
              Temperatura
            </label>
            <input
              id="temperatura_sv"
              type="number"
              step="0.1"
              readOnly={readOnly}
              className="w-full px-3 py-2 bg-surface-light border-none rounded text-primary "
              {...register("signosVitales.temperatura_sv")}
            />
          </div>
        </div>
      </div>

      {/* Fila 3 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-accent-muted rounded-lg flex items-center justify-center">
            <i className="fas fa-lungs text-white text-xl"></i>
          </div>
          <div className="flex-1">
            <label
              htmlFor="frecuencia_respiratoria"
              className="block text-sm font-medium text-primary mb-1"
            >
              F. Respiratoria
            </label>
            <input
              id="frecuencia_respiratoria"
              type="number"
              readOnly={readOnly}
              className="w-full px-3 py-2 bg-surface-light border-none rounded text-primary "
              {...register("signosVitales.frecuencia_respiratoria")}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-accent-muted rounded-lg flex items-center justify-center">
            <i className="fas fa-heartbeat text-white text-xl"></i>
          </div>
          <div className="flex-1">
            <label
              htmlFor="frecuencia_cardiaca"
              className="block text-sm font-medium text-primary mb-1"
            >
              F. Cardiaca
            </label>
            <input
              id="frecuencia_cardiaca"
              type="number"
              readOnly={readOnly}
              className="w-full px-3 py-2 bg-surface-light border-none rounded text-primary "
              {...register("signosVitales.frecuencia_cardiaca")}
            />
          </div>
        </div>
      </div>

      {/* Fila 4: Presión arterial */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-accent-muted rounded-lg flex items-center justify-center">
            <i className="fas fa-tint text-white text-xl"></i>
          </div>
          <div className="flex-1">
            <label
              htmlFor="presion_sistolica"
              className="block text-sm font-medium text-primary mb-1"
            >
              P. Sistólica
            </label>
            <input
              id="presion_sistolica"
              type="number"
              readOnly={readOnly}
              className="w-full px-3 py-2 bg-surface-light border-none rounded text-primary "
              {...register("signosVitales.presion_sistolica")}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-accent-muted rounded-lg flex items-center justify-center">
            <i className="fas fa-tint text-white text-xl"></i>
          </div>
          <div className="flex-1">
            <label
              htmlFor="presion_diastolica"
              className="block text-sm font-medium text-primary mb-1"
            >
              P. Diastólica
            </label>
            <input
              id="presion_diastolica"
              type="number"
              readOnly={readOnly}
              className="w-full px-3 py-2 bg-surface-light border-none rounded text-primary "
              {...register("signosVitales.presion_diastolica")}
            />
          </div>
        </div>
      </div>

      {/* Fila 5: Nivel de presión */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-accent-muted rounded-lg flex items-center justify-center">
            <i className="fas fa-heartbeat text-white text-xl"></i>
          </div>
          <div className="flex-1">
            <label
              htmlFor="nivelPresion"
              className="block text-sm font-medium text-primary mb-1"
            >
              Nivel de Presión
            </label>
            <input
              id="nivelPresion"
              name="nivelPresion"
              readOnly
              type="text"
              value={nivelPresion.value}
              disabled
              className={nivelPresion.className}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-accent-muted rounded-lg flex items-center justify-center">
            <i className="fas fa-lungs text-white text-xl"></i>
          </div>
          <div className="flex-1">
            <label
              htmlFor="saturacion_oxigeno"
              className="block text-sm font-medium text-primary mb-1"
            >
              Saturación O₂
            </label>
            <input
              id="saturacion_oxigeno"
              type="number"
              readOnly={readOnly}
              className="w-full px-3 py-2 bg-surface-light border-none rounded text-primary  focus:ring-2 focus:ring-brand"
              {...register("signosVitales.saturacion_oxigeno")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}