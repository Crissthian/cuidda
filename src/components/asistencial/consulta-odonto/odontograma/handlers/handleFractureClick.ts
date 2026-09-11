/**
 * Handler para clicks de Fractura dental.
 */

import { toast } from "sonner";
import { isToothInvalid } from "../utils";
import type { ToothClickHandler } from "./types";
import { generateHallazgoId, getCurrentDate } from "./types";

/**
 * Maneja el click para agregar una fractura dental (corona o raíz).
 * Valida que el diente sea válido y no tenga fractura del mismo tipo.
 */
export const handleFractureClick: ToothClickHandler = (ctx) => {
  const { id, hallazgos, selectionMode, onHallazgoCreated, fractures } = ctx;

  if (
    selectionMode.type !== "fracture_crown" &&
    selectionMode.type !== "fracture_root"
  ) {
    return false;
  }

  if (isToothInvalid(id, hallazgos)) {
    toast.error("No se puede registrar fractura en un diente inválido.");
    return true;
  }

  const type = selectionMode.type === "fracture_crown" ? "crown" : "root";
  const existing = fractures.find((f) => f.toothId === id && f.type === type);

  if (existing) {
    toast.error(
      `Ya existe una fractura de ${type === "crown" ? "corona" : "raíz"} en este diente.`,
    );
    return true;
  }

  const hallazgoName =
    selectionMode.type === "fracture_crown"
      ? "FRACTURA_CORONA"
      : "FRACTURA_RAIZ";
  const spec =
    selectionMode.type === "fracture_crown"
      ? "Fractura Corona"
      : "Fractura Raíz";

  onHallazgoCreated({
    id: generateHallazgoId(),
    diente: id,
    hallazgo: hallazgoName,
    estado: "malo",
    especificacion: spec,
    fecha: getCurrentDate(),
  });

  return true;
};
