/**
 * ApplianceOverlay - Renderiza aparatos ortodónticos (fijos y removibles).
 */

import React from "react";
import type { Appliance } from "../../types";
import type { OverlayBaseProps } from "./types";
import { OVERLAY_COLORS } from "./types";
import {
  getCoordinates,
  generateZigzagPath,
  isToothInCurrentView,
} from "../../utils";

interface ApplianceOverlayProps extends OverlayBaseProps {
  appliances: Appliance[];
}

/**
 * Componente que renderiza aparatos ortodónticos.
 * - Aparatos Fijos: Línea recta con cuadrados con cruz en los extremos.
 * - Aparatos Removibles: Línea en zigzag.
 */
export const ApplianceOverlay: React.FC<ApplianceOverlayProps> = ({
  appliances,
  toothRefs,
  containerRef,
  refsReady,
  upperTeeth,
  lowerTeeth,
}) => {
  if (!refsReady) return null;

  return (
    <>
      {appliances.map((app) => {
        // Solo renderizar aparatos cuyos dientes estén en la vista actual
        if (
          !isToothInCurrentView(app.startId, upperTeeth, lowerTeeth) ||
          !isToothInCurrentView(app.endId, upperTeeth, lowerTeeth)
        ) {
          return null;
        }

        const start = getCoordinates(
          app.startId,
          toothRefs.current,
          containerRef.current,
        );
        const end = getCoordinates(
          app.endId,
          toothRefs.current,
          containerRef.current,
        );
        if (!start || !end) return null;

        const color =
          app.status === "bueno" ? OVERLAY_COLORS.bueno : OVERLAY_COLORS.malo;

        if (app.type === "fixed") {
          return (
            <g key={app.id}>
              <line
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke={color}
                strokeWidth="2"
              />
              {[start, end].map((pt, i) => (
                <g key={`${app.id}-pt-${i}`}>
                  <rect
                    x={pt.x - 7}
                    y={pt.y - 7}
                    width={14}
                    height={14}
                    fill="white"
                    stroke={color}
                    strokeWidth="2"
                  />
                  <line
                    x1={pt.x}
                    y1={pt.y - 5}
                    x2={pt.x}
                    y2={pt.y + 5}
                    stroke={color}
                    strokeWidth="2"
                  />
                  <line
                    x1={pt.x - 5}
                    y1={pt.y}
                    x2={pt.x + 5}
                    y2={pt.y}
                    stroke={color}
                    strokeWidth="2"
                  />
                </g>
              ))}
            </g>
          );
        }

        // Aparato removible - línea zigzag
        return (
          <path
            key={app.id}
            d={generateZigzagPath(start.x, start.y, end.x, end.y)}
            stroke={color}
            strokeWidth="2"
            fill="none"
          />
        );
      })}
    </>
  );
};
