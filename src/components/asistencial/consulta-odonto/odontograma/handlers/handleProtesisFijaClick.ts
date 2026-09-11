/**
 * Handler para clicks de Prótesis Dental Parcial Fija.
 */

import { toast } from "sonner";
import {
  isToothInvalid,
  isUpperArch,
  getTeethInRange,
  hasProtesisTotal,
} from "../utils";
import type { ToothClickHandler } from "./types";
import { generateHallazgoId, getCurrentDate } from "./types";

/**
 * Maneja el click para agregar una Prótesis Dental Parcial Fija.
 * Requiere selección de dos dientes del mismo arco.
 * Se dibuja una línea recta horizontal a nivel de los ápices.
 */
export const handleProtesisFijaClick: ToothClickHandler = (ctx) => {
  const {
    id,
    hallazgos,
    selectionMode,
    setSelectionMode,
    onHallazgoCreated,
    upperTeeth,
    lowerTeeth,
  } = ctx;

  if (selectionMode.type !== "protesis_fija") {
    return false;
  }

  // Validar que no haya prótesis total
  const isUpper = isUpperArch(id);
  if (hasProtesisTotal(isUpper ? "upper" : "lower", hallazgos)) {
    toast.error(
      "No se puede agregar prótesis dental en arcada con prótesis total.",
    );
    return true;
  }

  // Primer click: establecer diente inicial
  if (selectionMode.startId === null) {
    if (isToothInvalid(id, hallazgos)) {
      toast.error("No se puede iniciar prótesis fija en un diente inválido.");
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

  // Segundo click: validar y crear hallazgo
  const startId = selectionMode.startId;
  const endId = id;
  const startIsUpper = isUpperArch(startId);
  const endIsUpper = isUpperArch(endId);

  if (startIsUpper !== endIsUpper) {
    toast.error("La prótesis debe conectar dientes de la misma arcada.");
    return true;
  }

  const range = getTeethInRange(startId, endId, upperTeeth, lowerTeeth);

  if (range.length < 2) {
    toast.error(
      "La prótesis fija requiere al menos 2 dientes (pilar inicial y final).",
    );
    return true;
  }

  // Nota: A diferencia del aparato fijo, aquí no se valida estricta superposición
  // porque puede ser un reemplazo, pero si se desea se puede agregar.
  // Por ahora permitimos la flexibilidad.

  onHallazgoCreated({
    id: generateHallazgoId(),
    diente: startId,
    dienteFinal: endId,
    hallazgo: "PROTESIS_FIJA",
    estado: selectionMode.status,
    especificacion: "Prótesis Dental Parcial Fija",
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
