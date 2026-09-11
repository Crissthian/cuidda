import type { ClickHandlerContext } from "./types";
import type { HallazgoClinico } from "../types";

/**
 * Maneja el click para Transposición Dentaria.
 * Requiere seleccionar dos dientes (startId y endId).
 */
export const handleTransposicionClick = (ctx: ClickHandlerContext): boolean => {
  const {
    id,
    selectionMode,
    setSelectionMode,
    hallazgos,
    onHallazgoCreated,
    onHallazgoDeleted,
  } = ctx;

  if (!selectionMode.isActive || selectionMode.type !== "transposicion") {
    return false;
  }

  // Si no hay diente inicial seleccionado, seleccionarlo
  if (!selectionMode.startId) {
    setSelectionMode({ ...selectionMode, startId: id });
    return true;
  }

  // Si ya hay uno seleccionado
  const startId = selectionMode.startId;
  const endId = id;

  // Cancelar si se selecciona el mismo diente
  if (startId === endId) {
    setSelectionMode({ ...selectionMode, startId: null });
    return true;
  }

  // Verificar si ya existe una transposición entre estos dos dientes
  const existing = hallazgos.find(
    (h) =>
      h.hallazgo === "TRANSPOSICION" &&
      ((h.diente === startId && h.dienteFinal === endId) ||
        (h.diente === endId && h.dienteFinal === startId)),
  );

  if (existing) {
    // Si existe, eliminar (toggle)
    if (onHallazgoDeleted) onHallazgoDeleted(existing.id);
  } else {
    // Crear nuevo hallazgo
    const newHallazgo: HallazgoClinico = {
      id: Date.now().toString(),
      diente: startId,
      dienteFinal: endId,
      hallazgo: "TRANSPOSICION",
      estado: "bueno", // Siempre azul según requerimiento
      especificacion: `Transposición entre ${startId} y ${endId}`,
      fecha: new Date().toLocaleDateString("es-PE"),
    };
    onHallazgoCreated(newHallazgo);
  }

  // Resetear startId
  setSelectionMode({ ...selectionMode, startId: null });
  return true;
};
