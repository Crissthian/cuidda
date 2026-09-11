import type { ClickHandlerContext } from "./types";
import type { HallazgoClinico } from "../types";
import { isToothInvalid } from "../utils";
import { toast } from "sonner";

/**
 * Maneja el click para Remanente Radicular.
 * Registra 'RR' en rojo (malo) en el diente seleccionado.
 */
export const handleRemanenteRadicularClick = (
  ctx: ClickHandlerContext,
): boolean => {
  const {
    id,
    selectionMode,
    onHallazgoCreated,
    onHallazgoDeleted,
    hallazgos,
    viewMode,
  } = ctx;

  if (!selectionMode.isActive || selectionMode.type !== "remanente_radicular") {
    return false;
  }

  // Validar si el diente es válido (no ausente)
  if (isToothInvalid(id, hallazgos)) {
    toast.error(
      "No se puede registrar Remanente Radicular en un diente ausente.",
    );
    return true;
  }

  // Buscar si ya existe remanente radicular en el diente
  const existing = hallazgos.find(
    (h) => h.hallazgo === "REMANENTE_RADICULAR" && h.diente === id,
  );

  if (existing) {
    // Si existe, lo quitamos (toggle)
    if (onHallazgoDeleted) onHallazgoDeleted(existing.id);
  } else {
    // Crear nuevo hallazgo
    const newHallazgo: HallazgoClinico = {
      id: Date.now().toString(),
      diente: id,
      hallazgo: "REMANENTE_RADICULAR",
      siglas: "RR",
      estado: "malo",
      especificacion: "Remanente Radicular",
      fecha: new Date().toLocaleDateString("es-PE"),
      viewMode: viewMode, // Asignar el modo de vista actual
    };
    onHallazgoCreated(newHallazgo);
  }

  return true;
};
