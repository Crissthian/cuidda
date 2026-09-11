/**
 * EspigoOverlay - Renderiza los espigos muñones.
 */

import React from "react";
import type { EspigoMunon } from "../../types";
import type { OverlayBaseProps } from "./types";
import {
  getToothRect,
  isUpperTooth,
  OVERLAY_COLORS,
  VERTICAL_OFFSETS,
} from "./types";
import { isToothInCurrentView } from "../../utils";

interface EspigoOverlayProps extends OverlayBaseProps {
  espigos: EspigoMunon[];
}

/**
 * Componente que renderiza los espigos muñones.
 * Se muestra como una línea vertical con un cuadrado en la corona.
 */
export const EspigoOverlay: React.FC<EspigoOverlayProps> = ({
  espigos,
  toothRefs,
  containerRef,
  refsReady,
  upperTeeth,
  lowerTeeth,
}) => {
  if (!refsReady) return null;

  return (
    <>
      {espigos.map((esp) => {
        if (!isToothInCurrentView(esp.toothId, upperTeeth, lowerTeeth))
          return null;

        const data = getToothRect(
          esp.toothId,
          toothRefs.current,
          containerRef.current,
        );
        if (!data) return null;

        const { cx, topY } = data;
        const isUpper = isUpperTooth(esp.toothId);
        const offsets = isUpper
          ? VERTICAL_OFFSETS.upper
          : VERTICAL_OFFSETS.lower;
        const crownY = topY + offsets.crownCenter;
        const rootY = topY + offsets.rootCenter;

        const color =
          esp.status === "bueno" ? OVERLAY_COLORS.bueno : OVERLAY_COLORS.malo;
        const squareSize = 16;
        const halfSize = squareSize / 2;

        return (
          <g key={esp.id}>
            {/* Línea desde el centro gráfico hasta el centro de la imagen */}
            <line
              x1={cx}
              y1={crownY}
              x2={cx}
              y2={rootY}
              stroke={color}
              strokeWidth="3"
            />
            {/* Cuadrado en la corona (centro gráfico) */}
            <rect
              x={cx - halfSize}
              y={crownY - halfSize}
              width={squareSize}
              height={squareSize}
              fill={color}
            />
          </g>
        );
      })}
    </>
  );
};
