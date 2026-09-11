/**
 * Handler para clicks de Fusión dental.
 */

import { toast } from "sonner";
import { areTeethAdjacent, isToothInvalid, isUpperArch } from "../utils";
import type { ToothClickHandler } from "./types";
import { generateHallazgoId, getCurrentDate } from "./types";

/**
 * Maneja el click para agregar una fusión entre dos dientes.
 * Requiere selección de dos dientes contiguos del mismo arco.
 */
export const handleFusionClick: ToothClickHandler = (ctx) => {
  const {
    id,
    hallazgos,
    selectionMode,
    setSelectionMode,
    onHallazgoCreated,
    fusions,
    upperTeeth,
    lowerTeeth,
  } = ctx;

  if (selectionMode.type !== "fusion") return false;

  // Primer click: establecer diente inicial
  if (selectionMode.startId === null) {
    if (isToothInvalid(id, hallazgos)) {
      toast.error("No se puede registrar fusión en un diente inválido.");
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

  // Segundo click: validar y crear fusión
  const startId = selectionMode.startId;
  const endId = id;

  if (isUpperArch(startId) !== isUpperArch(endId)) {
    toast.error("La fusión debe ser entre dientes del mismo arco.");
    return true;
  }

  if (!areTeethAdjacent(startId, endId, upperTeeth, lowerTeeth)) {
    toast.error("La fusión solo puede registrarse entre dientes contiguos.");
    return true;
  }

  if (isToothInvalid(startId, hallazgos) || isToothInvalid(endId, hallazgos)) {
    toast.error("Ambos dientes deben estar presentes.");
    return true;
  }

  const existing = fusions.find(
    (f) =>
      (f.startId === startId && f.endId === endId) ||
      (f.startId === endId && f.endId === startId),
  );

  if (existing) {
    toast.error("Ya existe una fusión registrada entre estos dientes.");
    return true;
  }

  onHallazgoCreated({
    id: generateHallazgoId(),
    diente: startId,
    dienteFinal: endId,
    hallazgo: "FUSION",
    estado: selectionMode.status,
    especificacion: "Fusión",
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
