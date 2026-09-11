import React from "react";
import { ToothInteraction } from "./ToothInteraction";
import { getToothImage } from "../constants";
import type {
  Crown,
  PiezaAusente,
  Pulpotomia,
  Sellante,
  SuperficieDesgastada,
  TratamientoConducto,
  DefectosEsmalte,
  FosasFisurasProfundas,
  Impactacion,
  ImplanteDental,
  Macrodoncia,
  Microdoncia,
  MovilidadPatologica,
  PosicionAnormalDentaria,
  PiezaEctopica,
  RemanenteRadicular,
} from "../types";

/**
 * @interface ToothColumnProps
 * @description Propiedades del componente ToothColumn.
 */
interface ToothColumnProps {
  id: number;
  position: "upper" | "lower";
  onToothClick: (id: number, position: "upper" | "lower") => void;
  crown?: Crown;
  piezaAusente?: PiezaAusente;
  pulpotomia?: Pulpotomia;
  caries?: { surfaces: string[]; sigla: string };
  restauracion?: {
    surfaces: string[];
    sigla: string;
    status: "bueno" | "malo";
  };
  restauracionTemporal?: { surfaces: string[] };
  superficieDesgastada?: SuperficieDesgastada;
  tratamientoConducto?: TratamientoConducto;
  sellante?: Sellante;
  defectosEsmalte?: DefectosEsmalte[];
  fosasFisuras?: FosasFisurasProfundas;
  impactacion?: Impactacion;
  implanteDental?: ImplanteDental;
  macrodoncia?: Macrodoncia;
  microdoncia?: Microdoncia;
  movilidadPatologica?: MovilidadPatologica;
  posicionAnormalDentaria?: PosicionAnormalDentaria;
  piezaEctopica?: PiezaEctopica;
  remanenteRadicular?: RemanenteRadicular;
  onZoneClick?: (id: number, zone: string) => void;
  isSelectionStart?: boolean;
}

/**
 * Muestra el número del diente o las siglas de la corona si corresponde.
 */
const NumberBox: React.FC<{
  id: number;
  position: "upper" | "lower";
  isInternal?: boolean;
  crown?: Crown;
  piezaAusente?: PiezaAusente;
  pulpotomia?: Pulpotomia;
  caries?: { surfaces: string[]; sigla: string };
  restauracion?: {
    surfaces: string[];
    sigla: string;
    status: "bueno" | "malo";
  };
  sellante?: Sellante;
  superficieDesgastada?: SuperficieDesgastada;
  tratamientoConducto?: TratamientoConducto;
  defectosEsmalte?: DefectosEsmalte[];
  fosasFisuras?: FosasFisurasProfundas;
  impactacion?: Impactacion;
  implanteDental?: ImplanteDental;
  macrodoncia?: Macrodoncia;
  microdoncia?: Microdoncia;
  movilidadPatologica?: MovilidadPatologica;
  posicionAnormalDentaria?: PosicionAnormalDentaria;
  piezaEctopica?: PiezaEctopica;
  remanenteRadicular?: RemanenteRadicular;
}> = ({
  id,
  position,
  isInternal = false,
  crown,
  piezaAusente,
  pulpotomia,
  caries,
  restauracion,
  sellante,
  superficieDesgastada,
  tratamientoConducto,
  defectosEsmalte,
  fosasFisuras,
  impactacion,
  implanteDental,
  macrodoncia,
  microdoncia,
  movilidadPatologica,
  posicionAnormalDentaria,
  piezaEctopica,
  remanenteRadicular,
}) => {
  // Si es interno, mostrar solo el número del diente
  if (isInternal) {
    return (
      <div className="flex items-center justify-center text-sm font-semibold w-full min-h-8 align-middle border text-text-secondary border-transparent">
        {id.toString()}
      </div>
    );
  }

  /**
   * Configuración de etiquetas con orden de prioridad.
   * El primer elemento que tenga condition=true será el seleccionado.
   */
  const labelConfigs = [
    {
      condition: !!piezaAusente,
      label: piezaAusente?.sigla || "",
      colorClass: "text-blue-600 border-blue-600",
    },
    {
      condition: !!tratamientoConducto,
      label: tratamientoConducto?.sigla || "",
      colorClass:
        tratamientoConducto?.status === "bueno"
          ? "text-blue-600 border-blue-600"
          : "text-red-600 border-red-600",
    },
    {
      condition: !!pulpotomia,
      label: "PP",
      colorClass:
        pulpotomia?.status === "bueno"
          ? "text-blue-600 border-blue-600"
          : "text-red-600 border-red-600",
    },
    {
      condition: !!crown,
      label: crown?.label || "",
      colorClass:
        crown?.status === "bueno"
          ? "text-blue-600 border-blue-600"
          : "text-red-600 border-red-600",
    },
    {
      condition: !!restauracion,
      label: restauracion?.sigla || "",
      colorClass:
        restauracion?.status === "bueno"
          ? "text-blue-600 border-blue-600"
          : "text-blue-600 border-red-600",
    },
    {
      condition: !!sellante,
      label: sellante?.sigla || "",
      colorClass:
        sellante?.status === "bueno"
          ? "text-blue-600 border-blue-600"
          : "text-red-600 border-red-600",
    },
    {
      condition: !!caries,
      label: caries?.sigla || "",
      colorClass: "text-red-600 border-red-600",
    },
    {
      condition: !!superficieDesgastada,
      label: "DES",
      colorClass: "text-red-600 border-red-600",
    },
    {
      condition: !!defectosEsmalte && defectosEsmalte.length > 0,
      label: defectosEsmalte?.[0]?.type || "",
      colorClass: "text-red-600 border-red-600",
      extraClass: (label: string) => (label.length > 3 ? "text-[10px]" : ""),
    },
    {
      condition: !!fosasFisuras,
      label: "FFP",
      colorClass: "text-blue-600 border-blue-600",
    },
    {
      condition: !!impactacion,
      label: "I",
      colorClass: "text-blue-600 border-blue-600",
    },
    {
      condition: !!implanteDental,
      label: "IMP",
      colorClass:
        implanteDental?.status === "bueno"
          ? "text-blue-600 border-blue-600"
          : "text-red-600 border-red-600",
      extraClass: () => "text-[10px]",
    },
    {
      condition: !!macrodoncia,
      label: "MAC",
      colorClass: "text-blue-600 border-blue-600",
    },
    {
      condition: !!microdoncia,
      label: "MIC",
      colorClass: "text-blue-600 border-blue-600",
    },
    {
      condition: !!posicionAnormalDentaria,
      label: posicionAnormalDentaria?.sigla || "",
      colorClass: "text-blue-600 border-blue-600",
    },
    {
      condition: !!piezaEctopica,
      label: "E",
      colorClass: "text-brand border-brand",
    },
    {
      condition: !!movilidadPatologica,
      label: movilidadPatologica?.sigla || "",
      colorClass: "text-red-600 border-red-600",
    },
    {
      condition: !!remanenteRadicular,
      label: remanenteRadicular?.sigla || "",
      colorClass: "text-red-600 border-red-600",
    },
  ];

  // Buscar la primera configuración que cumpla la condición
  const activeConfig = labelConfigs.find((config) => config.condition);

  // Construir las clases y el label
  const label = activeConfig?.label || "";
  const extraClasses = activeConfig
    ? `${activeConfig.colorClass} border-2 ${activeConfig.extraClass?.(label) || ""}`
    : "border-border-default";

  return (
    <div
      className={`
        flex items-center justify-center text-sm font-semibold w-full min-h-8 align-middle border
        py-1 rounded-sm shadow-sm
        ${position === "upper" ? "mb-8" : ""}
        ${position === "lower" ? "mt-8" : ""}
        ${extraClasses}
      `}
    >
      {label}
    </div>
  );
};

/**
 * Columna que representa un diente completo con su imagen, interacciones y numeración.
 */
export const ToothColumn = React.memo(
  React.forwardRef<HTMLDivElement, ToothColumnProps>(
    (
      {
        id,
        position,
        onToothClick,
        crown,
        piezaAusente,
        pulpotomia,
        caries,
        restauracion,
        restauracionTemporal,
        superficieDesgastada,
        tratamientoConducto,
        sellante,
        defectosEsmalte,
        fosasFisuras,
        impactacion,
        implanteDental,
        macrodoncia,
        microdoncia,
        posicionAnormalDentaria,
        movilidadPatologica,
        piezaEctopica,
        remanenteRadicular,
        onZoneClick,
        isSelectionStart,
      },
      ref,
    ) => {
      const imgSrc = getToothImage(id, position);
      const isAnterior = id % 10 <= 3;

      // Map caries surfaces to boolean object for ToothInteraction
      const surfaces: Record<string, boolean> = {};
      if (caries) {
        caries.surfaces.forEach((s) => (surfaces[s] = true));
      }

      // Handler for keyboard interaction
      const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToothClick(id, position);
        }
      };

      const handleZoneClickInternal = React.useCallback(
        (zone: string) => {
          if (onZoneClick) onZoneClick(id, zone);
        },
        [id, onZoneClick],
      );

      return (
        <div
          ref={ref}
          className="flex flex-col items-center gap-2 border border-transparent w-12.5 relative mx-1 rounded-sm"
          onClick={() => onToothClick(id, position)}
          role="button"
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          {position === "upper" ? (
            <>
              <NumberBox
                id={id}
                position={position}
                crown={crown}
                piezaAusente={piezaAusente}
                pulpotomia={pulpotomia}
                caries={caries}
                restauracion={restauracion}
                sellante={sellante}
                superficieDesgastada={superficieDesgastada}
                tratamientoConducto={tratamientoConducto}
                defectosEsmalte={defectosEsmalte}
                fosasFisuras={fosasFisuras}
                impactacion={impactacion}
                implanteDental={implanteDental}
                macrodoncia={macrodoncia}
                microdoncia={microdoncia}
                posicionAnormalDentaria={posicionAnormalDentaria}
                movilidadPatologica={movilidadPatologica}
                piezaEctopica={piezaEctopica}
                remanenteRadicular={remanenteRadicular}
              />
              <div className="relative border border-transparent">
                <img
                  src={imgSrc}
                  alt={`Diente ${id}`}
                  className={`h-24 w-auto border border-transparent object-contain transition-all duration-300 hover:scale-110 hover:drop-shadow-lg cursor-pointer ${isSelectionStart ? "drop-shadow-[0_0_8px_rgba(37,99,235,0.8)] scale-110" : ""}`}
                />
              </div>
              <ToothInteraction
                isAnterior={isAnterior}
                crown={crown}
                pulpotomia={pulpotomia}
                surfaces={surfaces}
                restauracion={restauracion}
                restauracionTemporal={restauracionTemporal}
                superficieDesgastada={superficieDesgastada}
                sellante={sellante}
                tratamientoConducto={tratamientoConducto}
                onZoneClick={handleZoneClickInternal}
              />
              <NumberBox id={id} position={position} isInternal />
            </>
          ) : (
            <>
              <NumberBox id={id} position={position} isInternal />
              <ToothInteraction
                isAnterior={isAnterior}
                crown={crown}
                pulpotomia={pulpotomia}
                surfaces={surfaces}
                restauracion={restauracion}
                restauracionTemporal={restauracionTemporal}
                superficieDesgastada={superficieDesgastada}
                sellante={sellante}
                tratamientoConducto={tratamientoConducto}
                onZoneClick={handleZoneClickInternal}
              />
              <div className="relative border border-transparent">
                <img
                  src={imgSrc}
                  alt={`Diente ${id}`}
                  className={`h-24 w-auto border border-transparent object-contain transition-all duration-300 hover:scale-110 hover:drop-shadow-lg cursor-pointer ${isSelectionStart ? "drop-shadow-[0_0_8px_rgba(37,99,235,0.8)] scale-110" : ""}`}
                />
              </div>
              <NumberBox
                id={id}
                position={position}
                crown={crown}
                piezaAusente={piezaAusente}
                pulpotomia={pulpotomia}
                caries={caries}
                restauracion={restauracion}
                sellante={sellante}
                superficieDesgastada={superficieDesgastada}
                tratamientoConducto={tratamientoConducto}
                defectosEsmalte={defectosEsmalte}
                fosasFisuras={fosasFisuras}
                impactacion={impactacion}
                implanteDental={implanteDental}
                macrodoncia={macrodoncia}
                microdoncia={microdoncia}
                posicionAnormalDentaria={posicionAnormalDentaria}
                movilidadPatologica={movilidadPatologica}
                piezaEctopica={piezaEctopica}
                remanenteRadicular={remanenteRadicular}
              />
            </>
          )}
        </div>
      );
    },
  ),
);
ToothColumn.displayName = "ToothColumn";
