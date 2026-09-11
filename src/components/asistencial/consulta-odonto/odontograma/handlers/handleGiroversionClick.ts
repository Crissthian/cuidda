/**
 * Handler para clicks de Giroversión dental.
 */

import { toast } from "sonner";
import { isToothInvalid } from "../utils";
import type { ToothClickHandler } from "./types";
import { generateHallazgoId, getCurrentDate } from "./types";

/**
 * Maneja el click para agregar una giroversión dental (mesial o distal).
 * Valida que el diente sea válido y no tenga giroversión existente.
 */
export const handleGiroversionClick: ToothClickHandler = (ctx) => {
  const { id, hallazgos, selectionMode, onHallazgoCreated, giroversions } = ctx;

  if (
    selectionMode.type !== "giroversion_mesial" &&
    selectionMode.type !== "giroversion_distal"
  ) {
    return false;
  }

  if (isToothInvalid(id, hallazgos)) {
    toast.error("No se puede registrar giroversión en un diente inválido.");
    return true;
  }

  const existing = giroversions.find((g) => g.toothId === id);
  if (existing) {
    toast.error("Ya existe una giroversión registrada en este diente.");
    return true;
  }

  const direction =
    selectionMode.type === "giroversion_mesial" ? "Mesial" : "Distal";

  onHallazgoCreated({
    id: generateHallazgoId(),
    diente: id,
    hallazgo: "GIROVERSION",
    estado: selectionMode.status,
    especificacion: `Giroversión ${direction}`,
    fecha: getCurrentDate(),
  });

  return true;
};
