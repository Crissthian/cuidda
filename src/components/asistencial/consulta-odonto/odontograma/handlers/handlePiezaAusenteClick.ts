/**
 * Handler para clicks de Pieza Ausente.
 */

import { toast } from "sonner";
import type { ToothClickHandler } from "./types";
import { generateHallazgoId, getCurrentDate } from "./types";

/**
 * Maneja el click para registrar una pieza ausente.
 * Valida que el diente no esté ya marcado como ausente.
 */
export const handlePiezaAusenteClick: ToothClickHandler = (ctx) => {
  const {
    id,
    selectionMode,
    onHallazgoCreated,
    piezasAusentes,
    crownLabelInput,
  } = ctx;

  if (selectionMode.type !== "pieza_ausente") return false;

  if (piezasAusentes.some((p) => p.toothId === id)) {
    toast.error("Este diente ya está marcado como ausente.");
    return true;
  }

  onHallazgoCreated({
    id: generateHallazgoId(),
    diente: id,
    hallazgo: "PIEZA_AUSENTE",
    estado: "bueno", // Azul por defecto
    siglas: crownLabelInput as "DNE" | "DEX" | "DAO",
    especificacion: `Pieza Ausente: ${crownLabelInput}`,
    fecha: getCurrentDate(),
  });

  return true;
};
