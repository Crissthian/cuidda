/**
 * GiroversionOverlay - Renderiza giroversiones dentales.
 */

import React from "react";
import type { Giroversion } from "../../types";
import type { OverlayBaseProps } from "./types";
import {
  getToothRect,
  isUpperTooth,
  VERTICAL_OFFSETS,
  OVERLAY_COLORS,
} from "./types";
import { isToothInCurrentView } from "../../utils";

interface GiroversionOverlayProps extends OverlayBaseProps {
  giroversions: Giroversion[];
}

/**
 * Componente que renderiza giroversiones dentales.
 * Se muestra como un arco con flecha indicando la dirección de rotación.
 */
export const GiroversionOverlay: React.FC<GiroversionOverlayProps> = ({
  giroversions,
  toothRefs,
  containerRef,
  refsReady,
  upperTeeth,
  lowerTeeth,
}) => {
  if (!refsReady) return null;

  return (
    <>
      {giroversions.map((giro) => {
        if (!isToothInCurrentView(giro.toothId, upperTeeth, lowerTeeth))
          return null;

        const data = getToothRect(
          giro.toothId,
          toothRefs.current,
          containerRef.current,
        );
        if (!data) return null;

        const { cx, topY } = data;
        const isUpper = isUpperTooth(giro.toothId);
        const cy =
          topY +
          (isUpper
            ? VERTICAL_OFFSETS.upper.crownCenter
            : VERTICAL_OFFSETS.lower.crownCenter);

        // Determinar dirección de la flecha basado en cuadrante
        const id = giro.toothId;
        const isQ1 = (id >= 11 && id <= 18) || (id >= 51 && id <= 55);
        const isQ4 = (id >= 41 && id <= 48) || (id >= 81 && id <= 85);
        const isRightMesial = isQ1 || isQ4;

        const isMesial = giro.direction === "mesial";
        const arrowPointsRight = isRightMesial ? isMesial : !isMesial;

        const r = 12;
        const color = OVERLAY_COLORS.bueno;

        // Path del arco
        const d = arrowPointsRight
          ? `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`
          : `M ${cx + r} ${cy} A ${r} ${r} 0 0 0 ${cx - r} ${cy}`;

        // Path de la flecha
        const arrowPath = arrowPointsRight
          ? `M ${cx + r - 3} ${cy - 5} L ${cx + r} ${cy} L ${cx + r + 3} ${cy - 5}`
          : `M ${cx - r - 3} ${cy - 5} L ${cx - r} ${cy} L ${cx - r + 3} ${cy - 5}`;

        return (
          <g key={giro.id}>
            <path d={d} stroke={color} strokeWidth="2" fill="none" />
            <path d={arrowPath} stroke={color} strokeWidth="2" fill="none" />
          </g>
        );
      })}
    </>
  );
};
