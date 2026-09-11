/**
 * DienteEnClavijaOverlay - Renderiza dientes en clavija.
 */

import React from "react";
import type { DienteEnClavija } from "../../types";
import type { OverlayBaseProps } from "./types";
import { getToothRect, isUpperTooth, OVERLAY_COLORS } from "./types";
import { isToothInCurrentView } from "../../utils";

interface DienteEnClavijaOverlayProps extends OverlayBaseProps {
  dientesEnClavija: DienteEnClavija[];
}

/**
 * Componente que renderiza dientes en clavija.
 * Se muestra como un triángulo azul apuntando hacia afuera del diente.
 */
export const DienteEnClavijaOverlay: React.FC<DienteEnClavijaOverlayProps> = ({
  dientesEnClavija,
  toothRefs,
  containerRef,
  refsReady,
  upperTeeth,
  lowerTeeth,
}) => {
  if (!refsReady) return null;

  return (
    <>
      {dientesEnClavija.map((item) => {
        if (!isToothInCurrentView(item.toothId, upperTeeth, lowerTeeth))
          return null;

        const data = getToothRect(
          item.toothId,
          toothRefs.current,
          containerRef.current,
        );
        if (!data) return null;

        const { cx, topY, rect } = data;
        const isUpper = isUpperTooth(item.toothId);

        // El triángulo debe estar en el espacio entre el NumberBox y la imagen
        const cy = isUpper ? topY + 56 : topY + rect.height - 56;

        const size = 16;
        const color = OVERLAY_COLORS.bueno;
        const half = size / 2;

        // Triángulo apuntando hacia afuera del diente
        let points = "";
        if (isUpper) {
          // Superior: apunta hacia arriba
          points = `${cx - half},${cy + half} ${cx + half},${cy + half} ${cx},${cy - half}`;
        } else {
          // Inferior: apunta hacia abajo
          points = `${cx - half},${cy - half} ${cx + half},${cy - half} ${cx},${cy + half}`;
        }

        return (
          <polygon key={item.id} points={points} fill={color} stroke="none" />
        );
      })}
    </>
  );
};
