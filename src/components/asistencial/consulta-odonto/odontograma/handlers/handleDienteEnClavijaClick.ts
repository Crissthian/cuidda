/**
 * Handler para clicks de Diente en Clavija.
 */

import { toast } from "sonner";
import { isToothInvalid } from "../utils";
import type { ToothClickHandler } from "./types";
import { generateHallazgoId, getCurrentDate } from "./types";

/**
 * Maneja el click para registrar un diente en clavija.
 * Valida que el diente sea válido y no esté ya marcado.
 */
export const handleDienteEnClavijaClick: ToothClickHandler = (ctx) => {
  const { id, hallazgos, selectionMode, onHallazgoCreated, dientesEnClavija } =
    ctx;

  if (selectionMode.type !== "diente_en_clavija") return false;

  if (isToothInvalid(id, hallazgos)) {
    toast.error('No se puede registrar "En clavija" en un diente inválido.');
    return true;
  }

  if (dientesEnClavija.some((d) => d.toothId === id)) {
    toast.error('Este diente ya está marcado como "En clavija".');
    return true;
  }

  onHallazgoCreated({
    id: generateHallazgoId(),
    diente: id,
    hallazgo: "DIENTE_EN_CLAVIJA",
    estado: "bueno",
    especificacion: "Diente en Clavija",
    fecha: getCurrentDate(),
  });

  return true;
};
