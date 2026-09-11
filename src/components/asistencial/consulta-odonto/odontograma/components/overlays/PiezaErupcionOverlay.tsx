/**
 * PiezaErupcionOverlay - Renderiza piezas en erupción.
 */

import React from "react";
import type { PiezaErupccion } from "../../types";
import type { OverlayBaseProps } from "./types";
import { getToothRect, isUpperTooth, OVERLAY_COLORS } from "./types";
import { isToothInCurrentView } from "../../utils";

interface PiezaErupcionOverlayProps extends OverlayBaseProps {
  piezasErupccion: PiezaErupccion[];
}

/**
 * Componente que renderiza piezas en erupción.
 * Se muestra como una flecha zigzag vertical azul apuntando hacia el diente.
 */
export const PiezaErupcionOverlay: React.FC<PiezaErupcionOverlayProps> = ({
  piezasErupccion,
  toothRefs,
  containerRef,
  refsReady,
  upperTeeth,
  lowerTeeth,
}) => {
  if (!refsReady) return null;

  return (
    <>
      <defs>
        <marker
          id="arrowHead"
          markerWidth="12"
          markerHeight="12"
          refX="10"
          refY="6"
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <path
            d="M0,0 L12,6 L0,12"
            fill="none"
            stroke={OVERLAY_COLORS.bueno}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
      </defs>
      {piezasErupccion?.map((item) => {
        if (!isToothInCurrentView(item.toothId, upperTeeth, lowerTeeth))
          return null;

        const data = getToothRect(
          item.toothId,
          toothRefs.current,
          containerRef.current,
        );
        if (!data) return null;

        const { cx, topY } = data;
        const isUpper = isUpperTooth(item.toothId);

        // Coordenadas refinadas para estar "sobre la imagen del diente"
        // Aumentamos el rango para que el zigzag luzca mejor
        let y1: number, y2: number;
        if (isUpper) {
          y1 = topY + 70;
          y2 = topY + 150;
        } else {
          y1 = topY + 194;
          y2 = topY + 114;
        }

        const amplitude = 8;
        const dy = (y2 - y1) / 7;

        const zigzagPath = `M ${cx} ${y1}
          L ${cx + amplitude} ${y1 + dy}
          L ${cx - amplitude} ${y1 + 2 * dy}
          L ${cx + amplitude} ${y1 + 3 * dy}
          L ${cx - amplitude} ${y1 + 4 * dy}
          L ${cx + amplitude} ${y1 + 5 * dy}
          L ${cx - amplitude} ${y1 + 6 * dy}
          L ${cx} ${y2}`;

        const color = OVERLAY_COLORS.bueno;

        return (
          <g key={item.id}>
            <path
              d={zigzagPath}
              stroke={color}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              markerEnd="url(#arrowHead)"
            />
          </g>
        );
      })}
    </>
  );
};
