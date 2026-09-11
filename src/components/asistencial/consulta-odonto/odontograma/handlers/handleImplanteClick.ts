import type { ClickHandlerContext } from "./types";
import type { HallazgoClinico } from "../types";
import { isToothInvalid } from "../utils";
import { toast } from "sonner";

/**
 * Maneja el click para Implante Dental.
 * Se coloca sigla "IMP" en Azul (bueno) o Rojo (malo).
 * Sólo se registra cuando se observe clínicamente la presencia del implante dental.
 */
export const handleImplanteClick = (ctx: ClickHandlerContext): boolean => {
  const { id, selectionMode, hallazgos, onHallazgoCreated, onHallazgoDeleted } =
    ctx;

  if (!selectionMode.isActive || selectionMode.type !== "implante_dental") {
    return false;
  }

  // Validaciones básicas
  if (isToothInvalid(id, hallazgos)) {
    toast.error(
      'No se puede registrar "Implante Dental" en un diente inválido.',
    );
    return true;
  }

  // Buscar hallazgo existente
  const existing = hallazgos.find(
    (h) => h.hallazgo === "IMPLANTE_DENTAL" && h.diente === id,
  );

  if (existing) {
    // Toggle: Si click en existente, borrar.
    if (onHallazgoDeleted) onHallazgoDeleted(existing.id);
  } else {
    const newHallazgo: HallazgoClinico = {
      id: Date.now().toString(),
      diente: id,
      hallazgo: "IMPLANTE_DENTAL",
      estado: selectionMode.status,
      sigla: "IMP",
      especificacion: "Implante Dental",
      fecha: new Date().toLocaleDateString("es-PE"),
    };
    onHallazgoCreated(newHallazgo);
  }

  return true;
};
