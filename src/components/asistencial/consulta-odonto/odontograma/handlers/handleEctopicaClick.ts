import { toast } from "sonner";
import type { HallazgoClinico } from "../types";
import { isToothInvalid } from "../utils";
import type { ClickHandlerContext } from "./types";

/**
 * Handler para el hallazgo: PIEZA_ECTOPICA
 * @param ctx Contexto con toda la información necesaria para los handlers
 * @returns true si se manejó el click, false si no
 */
export function handleEctopicaClick(ctx: ClickHandlerContext): boolean {
  const { id, hallazgos, selectionMode, onHallazgoCreated, onHallazgoDeleted } =
    ctx;

  if (!selectionMode.isActive || selectionMode.type !== "pieza_ectopica") {
    return false;
  }

  // 1. Validaciones básicas
  if (isToothInvalid(id, hallazgos)) {
    toast.error(
      "No se puede registrar pieza ectópica en un diente ausente o inválido.",
    );
    return true;
  }

  // 2. Buscar si ya existe el hallazgo en este diente
  const existingHallazgo = hallazgos.find(
    (h) => h.diente === id && h.hallazgo === "PIEZA_ECTOPICA",
  );

  // 3. Toggle: Si existe se borra, si no existe se crea
  if (existingHallazgo && onHallazgoDeleted) {
    onHallazgoDeleted(existingHallazgo.id);
  } else {
    const newHallazgo: HallazgoClinico = {
      id: Date.now().toString(),
      diente: id,
      hallazgo: "PIEZA_ECTOPICA",
      estado: "bueno", // Azul por defecto
      siglas: "E",
      especificacion: "Pieza Ectópica",
      fecha: new Date().toLocaleDateString("es-PE"),
    };
    onHallazgoCreated(newHallazgo);
  }

  return true;
}
