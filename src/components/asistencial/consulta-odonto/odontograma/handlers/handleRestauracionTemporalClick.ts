import type { ClickHandlerContext } from "./types";
import type { HallazgoClinico } from "../types";

/**
 * Maneja el click para Restauración Temporal.
 */
export const handleRestauracionTemporalClick = (
  ctx: ClickHandlerContext,
  surface?: string,
): boolean => {
  const { id, selectionMode, hallazgos, onHallazgoCreated, onHallazgoDeleted } =
    ctx;

  if (
    !selectionMode.isActive ||
    selectionMode.type !== "restauracion_temporal"
  ) {
    return false;
  }

  if (!surface) {
    return false;
  }

  // Buscar hallazgo existente
  const existing = hallazgos.find(
    (h) => h.hallazgo === "RESTAURACION_TEMPORAL" && h.diente === id,
  );

  let newSurfaces: string[] = [];
  let shouldDelete = false;

  if (existing) {
    const h = existing as HallazgoClinico;
    const currentSurfaces = h.superficies || [];

    // Toggle superficie
    if (currentSurfaces.includes(surface)) {
      newSurfaces = currentSurfaces.filter((s: string) => s !== surface);
    } else {
      newSurfaces = [...currentSurfaces, surface];
    }

    if (newSurfaces.length === 0) {
      shouldDelete = true;
      if (onHallazgoDeleted) onHallazgoDeleted(existing.id);
      return true;
    } else {
      if (onHallazgoDeleted) onHallazgoDeleted(existing.id);
    }
  } else {
    newSurfaces = [surface];
  }

  if (!shouldDelete) {
    const newHallazgo: HallazgoClinico = {
      id: Date.now().toString(),
      diente: id,
      hallazgo: "RESTAURACION_TEMPORAL",
      estado: "malo", // Siempre rojo por definición
      superficies: newSurfaces,
      especificacion: `Restauración Temporal en ${newSurfaces.join(", ")}`,
      fecha: new Date().toLocaleDateString("es-PE"),
    };
    onHallazgoCreated(newHallazgo);
  }

  return true;
};
