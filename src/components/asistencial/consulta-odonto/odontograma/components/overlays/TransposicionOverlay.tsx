/**
 * TransposicionOverlay - Renderiza transposición dentaria.
 * Dibuja dos flechas curvas cruzadas entre los dientes seleccionados.
 */

import React from "react";
import type { Transposicion } from "../../types";
import { isToothInCurrentView } from "../../utils";
import type { OverlayBaseProps } from "./types";
import { isUpperTooth, OVERLAY_COLORS, VERTICAL_OFFSETS } from "./types";

interface TransposicionOverlayProps extends OverlayBaseProps {
  transposiciones?: Transposicion[];
}

/**
 * Componente que renderiza transposiciones dentarias.
 * Muestra flechas curvas cruzadas entre los dientes.
 */
export const TransposicionOverlay: React.FC<TransposicionOverlayProps> = ({
  transposiciones = [],
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
        {/* Marcador para puntas de flecha azules */}
        <marker
          id="arrowhead-transposicion"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#2563EB" />
        </marker>
      </defs>
      {transposiciones.map((trans) => {
        if (!isToothInCurrentView(trans.startId, upperTeeth, lowerTeeth))
          return null;

        const toothStart = toothRefs.current.get(trans.startId);
        const toothEnd = toothRefs.current.get(trans.endId);
        const container = containerRef.current;
        if (!toothStart || !toothEnd || !container) return null;

        const rectStart = toothStart.getBoundingClientRect();
        const rectEnd = toothEnd.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        const isUpper = isUpperTooth(trans.startId);
        const offset = isUpper
          ? VERTICAL_OFFSETS.upper.siglaImageSpace
          : VERTICAL_OFFSETS.lower.siglaImageSpace;

        // Coordenadas de los centros de los números
        const cxStart =
          rectStart.left - containerRect.left + rectStart.width / 2;
        const cyStart = rectStart.top - containerRect.top + offset;

        const cxEnd = rectEnd.left - containerRect.left + rectEnd.width / 2;
        const cyEnd = rectEnd.top - containerRect.top + offset;

        const color = OVERLAY_COLORS.bueno; // Azul

        // Puntos de control para la curva
        const midX = (cxStart + cxEnd) / 2;

        // Reducimos la altura de la curva para que quepa en el espacio intermedio
        // Y hacemos que se crucen desplazando los puntos de inicio/fin ligeramente
        const yOffset = 5;
        const curveHeight = 15;

        const pathArc1 = `M ${cxStart} ${cyStart - yOffset} Q ${midX} ${cyStart + curveHeight} ${cxEnd} ${cyEnd - yOffset}`;
        const pathArc2 = `M ${cxEnd} ${cyEnd + yOffset} Q ${midX} ${cyEnd - curveHeight} ${cxStart} ${cyStart + yOffset}`;

        return (
          <g key={trans.id}>
            {/* Flecha 1 */}
            <path
              d={pathArc1}
              stroke={color}
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowhead-transposicion)"
            />
            {/* Flecha 2 */}
            <path
              d={pathArc2}
              stroke={color}
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowhead-transposicion)"
            />
          </g>
        );
      })}
    </>
  );
};
