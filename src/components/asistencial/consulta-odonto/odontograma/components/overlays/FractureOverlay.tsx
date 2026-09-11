/**
 * FractureOverlay - Renderiza fracturas dentales.
 */

import React from "react";
import type { Fracture } from "../../types";
import type { OverlayBaseProps } from "./types";
import {
  getToothRect,
  isUpperTooth,
  VERTICAL_OFFSETS,
  OVERLAY_COLORS,
} from "./types";
import { isToothInCurrentView } from "../../utils";

interface FractureOverlayProps extends OverlayBaseProps {
  fractures: Fracture[];
}

/**
 * Componente que renderiza fracturas dentales.
 * Se muestra como una línea zigzag roja horizontal sobre la corona o raíz.
 */
export const FractureOverlay: React.FC<FractureOverlayProps> = ({
  fractures,
  toothRefs,
  containerRef,
  refsReady,
  upperTeeth,
  lowerTeeth,
}) => {
  if (!refsReady) return null;

  return (
    <>
      {fractures.map((frac) => {
        if (!isToothInCurrentView(frac.toothId, upperTeeth, lowerTeeth))
          return null;

        const data = getToothRect(
          frac.toothId,
          toothRefs.current,
          containerRef.current,
        );
        if (!data) return null;

        const { cx, topY } = data;
        const isUpper = isUpperTooth(frac.toothId);
        const offsets = isUpper
          ? VERTICAL_OFFSETS.upper
          : VERTICAL_OFFSETS.lower;

        const crownCenterY = topY + offsets.crownCenter;
        const rootCenterY = topY + offsets.rootCenter;

        const width = 24;
        const startX = cx - width / 2;
        const endX = cx + width / 2;
        const height = 40;
        const yCenter = frac.type === "crown" ? crownCenterY : rootCenterY;

        return (
          <line
            key={frac.id}
            x1={startX}
            y1={yCenter - height / 2}
            x2={endX}
            y2={yCenter + height / 2}
            stroke={OVERLAY_COLORS.malo}
            strokeWidth="3"
          />
        );
      })}
    </>
  );
};
