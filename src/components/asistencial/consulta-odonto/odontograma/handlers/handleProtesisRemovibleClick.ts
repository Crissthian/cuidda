import { toast } from "sonner";
import type { HallazgoClinico } from "../types";
import { getTeethInRange, isUpperArch } from "../utils";
import type { ClickHandlerContext } from "./types";

/**
 * Maneja el click para Prótesis Dental Parcial Removible.
 * Permite seleccionar un RANGO de dientes (inicio y fin).
 */
export const handleProtesisRemovibleClick = (
  ctx: ClickHandlerContext,
): boolean => {
  const {
    id,
    selectionMode,
    setSelectionMode,
    onHallazgoCreated,
    onHallazgoDeleted,
    hallazgos,
    upperTeeth,
    lowerTeeth,
  } = ctx;

  if (!selectionMode.isActive || selectionMode.type !== "protesis_removible") {
    return false;
  }

  // Si no hay un inicio de selección, lo marcamos
  if (selectionMode.startId === null) {
    setSelectionMode((prev) => ({ ...prev, startId: id }));
    return true;
  }

  // Si ya hay un inicio, este click es el final del rango
  const startId = selectionMode.startId;
  const endId = id;

  // Validar que ambos dientes estén en la misma arcada
  if (isUpperArch(startId) !== isUpperArch(endId)) {
    toast.error("El rango debe estar en la misma arcada.");
    setSelectionMode((prev) => ({ ...prev, startId: null }));
    return true;
  }

  // Validar rango válido
  const range = getTeethInRange(startId, endId, upperTeeth, lowerTeeth);
  if (range.length === 0) {
    setSelectionMode((prev) => ({ ...prev, startId: null }));
    return true;
  }

  // Validar que no cruce la línea media de forma inválida (opcional, pero removibles suelen cubrir tramos largos)

  // Crear hallazgo
  // Buscamos si ya existe uno idéntico para evitar duplicados o para actualizar
  const existing = hallazgos.find(
    (h) =>
      h.hallazgo === "PROTESIS_REMOVIBLE" &&
      h.diente === startId &&
      h.dienteFinal === endId,
  );

  if (existing) {
    if (onHallazgoDeleted) onHallazgoDeleted(existing.id);
  }

  // Crear nuevo hallazgo
  const newHallazgo: HallazgoClinico = {
    id: Date.now().toString(),
    diente: startId,
    dienteFinal: endId,
    hallazgo: "PROTESIS_REMOVIBLE",
    estado: selectionMode.status,
    especificacion: `Prótesis Removible del ${startId} al ${endId}`,
    fecha: new Date().toLocaleDateString("es-PE"),
  };

  onHallazgoCreated(newHallazgo);

  // Resetear selección
  setSelectionMode((prev) => ({ ...prev, startId: null }));
  return true;
};
