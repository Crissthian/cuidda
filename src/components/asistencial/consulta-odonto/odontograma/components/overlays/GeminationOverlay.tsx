/**
 * GeminationOverlay - Renderiza geminaciones dentales.
 */

import React from "react";
import type { Gemination } from "../../types";
import { isToothInCurrentView } from "../../utils";
import type { OverlayBaseProps } from "./types";
import { isUpperTooth, OVERLAY_COLORS, VERTICAL_OFFSETS } from "./types";

interface GeminationOverlayProps extends OverlayBaseProps {
  geminations: Gemination[];
}

/**
 * Componente que renderiza geminaciones dentales.
 * Se muestra como un círculo que rodea el número del diente.
 */
export const GeminationOverlay: React.FC<GeminationOverlayProps> = ({
  geminations,
  toothRefs,
  containerRef,
  refsReady,
  upperTeeth,
  lowerTeeth,
}) => {
  if (!refsReady) return null;

  return (
    <>
      {geminations.map((gem) => {
        if (!isToothInCurrentView(gem.toothId, upperTeeth, lowerTeeth))
          return null;

        const toothEl = toothRefs.current.get(gem.toothId);
        const container = containerRef.current;
        if (!toothEl || !container) return null;

        const rect = toothEl.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        const isUpper = isUpperTooth(gem.toothId);
        const offset = isUpper
          ? VERTICAL_OFFSETS.upper.numberCenter
          : VERTICAL_OFFSETS.lower.numberCenter;
        const upperAdjust = isUpper ? 5 : 0;
        const cx = rect.left - containerRect.left + rect.width / 2;
        const cy = rect.top - containerRect.top + offset + upperAdjust;

        const radius = 18;
        const color = OVERLAY_COLORS.bueno;

        return (
          <circle
            key={gem.id}
            cx={cx}
            cy={cy}
            r={radius}
            stroke={color}
            strokeWidth="2"
            fill="none"
          />
        );
      })}
    </>
  );
};
