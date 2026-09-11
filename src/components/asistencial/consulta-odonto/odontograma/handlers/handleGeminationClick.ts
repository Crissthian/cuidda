/**
 * Handler para clicks de Geminación dental.
 */

import { toast } from "sonner";
import { isToothInvalid } from "../utils";
import type { ToothClickHandler } from "./types";
import { generateHallazgoId, getCurrentDate } from "./types";

/**
 * Maneja el click para agregar una geminación dental.
 * Valida que el diente sea válido y no tenga geminación existente.
 */
export const handleGeminationClick: ToothClickHandler = (ctx) => {
  const { id, hallazgos, selectionMode, onHallazgoCreated, geminations } = ctx;

  if (selectionMode.type !== "gemination") return false;

  if (isToothInvalid(id, hallazgos)) {
    toast.error("No se puede registrar geminación en un diente inválido.");
    return true;
  }

  const existing = geminations.find((g) => g.toothId === id);
  if (existing) {
    toast.error("Ya existe una geminación registrada en este diente.");
    return true;
  }

  onHallazgoCreated({
    id: generateHallazgoId(),
    diente: id,
    hallazgo: "GEMINACION",
    estado: selectionMode.status,
    especificacion: "Geminación",
    fecha: getCurrentDate(),
  });

  return true;
};
