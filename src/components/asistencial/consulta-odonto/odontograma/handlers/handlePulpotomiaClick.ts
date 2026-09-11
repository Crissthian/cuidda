/**
 * Handler para clicks de Pulpotomía.
 */

import { toast } from "sonner";
import { isToothInvalid } from "../utils";
import type { ToothClickHandler } from "./types";
import { generateHallazgoId, getCurrentDate } from "./types";

/**
 * Maneja el click para agregar o remover una pulpotomía.
 * Toggle: Si ya existe, se elimina; si no existe, se crea.
 */
export const handlePulpotomiaClick: ToothClickHandler = (ctx) => {
  const {
    id,
    hallazgos,
    selectionMode,
    setSelectionMode,
    onHallazgoCreated,
    onHallazgoDeleted,
    pulpotomias,
  } = ctx;

  if (selectionMode.type !== "pulpotomia") return false;

  if (isToothInvalid(id, hallazgos)) {
    toast.error("No se puede registrar pulpotomía en un diente inválido.");
    return true;
  }

  // Toggle: Si ya existe, eliminar
  const existing = pulpotomias?.find((p) => p.toothId === id);
  if (existing) {
    if (onHallazgoDeleted) {
      onHallazgoDeleted(existing.id);
    }
  } else {
    // Crear nuevo
    onHallazgoCreated({
      id: generateHallazgoId(),
      diente: id,
      hallazgo: "PULPOTOMIA",
      estado: selectionMode.status,
      especificacion: "Pulpotomía",
      fecha: getCurrentDate(),
    });
  }

  setSelectionMode({
    isActive: false,
    type: "fixed",
    status: "bueno",
    startId: null,
  });
  return true;
};
