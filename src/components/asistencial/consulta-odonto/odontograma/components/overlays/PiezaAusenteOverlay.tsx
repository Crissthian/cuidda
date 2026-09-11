/**
 * PiezaAusenteOverlay - Renderiza piezas ausentes.
 */

import React from "react";
import type { PiezaAusente } from "../../types";
import type { OverlayBaseProps } from "./types";
import { getToothRect, OVERLAY_COLORS } from "./types";
import { isToothInCurrentView } from "../../utils";

interface PiezaAusenteOverlayProps extends OverlayBaseProps {
  piezasAusentes: PiezaAusente[];
}

/**
 * Componente que renderiza piezas ausentes.
 * Se muestra como un aspa (X) azul sobre el diente.
 */
export const PiezaAusenteOverlay: React.FC<PiezaAusenteOverlayProps> = ({
  piezasAusentes,
  toothRefs,
  containerRef,
  refsReady,
  upperTeeth,
  lowerTeeth,
}) => {
  if (!refsReady) return null;

  return (
    <>
      {piezasAusentes.map((pieza) => {
        if (!isToothInCurrentView(pieza.toothId, upperTeeth, lowerTeeth))
          return null;

        const data = getToothRect(
          pieza.toothId,
          toothRefs.current,
          containerRef.current,
        );
        if (!data) return null;

        const { cx, topY, rect } = data;
        const size = 30;

        // Usar el centro vertical del rect del diente
        const centerY = rect.height / 2 + topY;

        const x1 = cx - size;
        const x2 = cx + size;
        const y1 = centerY - size;
        const y2 = centerY + size;

        return (
          <g key={pieza.id}>
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={OVERLAY_COLORS.bueno}
              strokeWidth="3"
            />
            <line
              x1={x2}
              y1={y1}
              x2={x1}
              y2={y2}
              stroke={OVERLAY_COLORS.bueno}
              strokeWidth="3"
            />
          </g>
        );
      })}
    </>
  );
};
