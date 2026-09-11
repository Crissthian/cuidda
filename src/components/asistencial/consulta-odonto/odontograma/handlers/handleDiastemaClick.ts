/**
 * Handler para clicks de Diastema.
 */

import { toast } from "sonner";
import {
  areTeethAdjacent,
  hasBridgeBetween,
  hasDiastemaBetween,
  isToothInvalid,
  isUpperArch,
} from "../utils";
import type { ToothClickHandler } from "./types";
import { generateHallazgoId, getCurrentDate } from "./types";

/**
 * Maneja el click para agregar un diastema entre dos dientes.
 * Requiere selección de dos dientes contiguos del mismo arco.
 */
export const handleDiastemaClick: ToothClickHandler = (ctx) => {
  const {
    id,
    hallazgos,
    selectionMode,
    setSelectionMode,
    onHallazgoCreated,
    diastemas,
    appliances,
    upperTeeth,
    lowerTeeth,
  } = ctx;

  if (selectionMode.type !== "diastema") return false;

  // Primer click: establecer diente inicial
  if (selectionMode.startId === null) {
    if (isToothInvalid(id, hallazgos)) {
      toast.error("No se puede registrar diastema en un diente inválido.");
      return true;
    }
    setSelectionMode((prev) => ({ ...prev, startId: id }));
    return true;
  }

  // Click en el mismo diente: cancelar selección
  if (selectionMode.startId === id) {
    setSelectionMode((prev) => ({ ...prev, startId: null }));
    return true;
  }

  // Segundo click: validar y crear diastema
  const startId = selectionMode.startId;
  const endId = id;

  if (isUpperArch(startId) !== isUpperArch(endId)) {
    toast.error("El diastema debe registrarse entre dientes del mismo arco.");
    return true;
  }

  if (!areTeethAdjacent(startId, endId, upperTeeth, lowerTeeth)) {
    toast.error("El diastema solo puede registrarse entre dientes contiguos.");
    return true;
  }

  if (isToothInvalid(startId, hallazgos) || isToothInvalid(endId, hallazgos)) {
    toast.error("Ambos dientes deben estar presentes y erupcionados.");
    return true;
  }

  if (hasDiastemaBetween(startId, endId, diastemas)) {
    toast.error("Ya existe un diastema entre estos dientes.");
    return true;
  }

  if (hasBridgeBetween(startId, endId, appliances, upperTeeth, lowerTeeth)) {
    toast.error("No se puede registrar diastema donde existe un puente.");
    return true;
  }

  onHallazgoCreated({
    id: generateHallazgoId(),
    diente: startId,
    dienteFinal: endId,
    hallazgo: "DIASTEMA",
    estado: selectionMode.status,
    especificacion: "Diastema",
    fecha: getCurrentDate(),
  });

  setSelectionMode({
    isActive: false,
    type: "fixed",
    status: "bueno",
    startId: null,
  });
  return true;
};
