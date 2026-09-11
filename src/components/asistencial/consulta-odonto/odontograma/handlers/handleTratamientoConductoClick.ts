import type { ClickHandlerContext } from "./types";
import type { HallazgoClinico } from "../types";

/**
 * Maneja el click para Tratamiento de Conducto.
 * Permite alternar TC o PC.
 */
export const handleTratamientoConductoClick = (
  ctx: ClickHandlerContext,
  subType: "TC" | "PC",
): boolean => {
  const { id, selectionMode, hallazgos, onHallazgoCreated, onHallazgoDeleted } =
    ctx;

  if (
    !selectionMode.isActive ||
    (selectionMode.type !== "tratamiento_conducto" &&
      selectionMode.type !== "pulpectomia")
  ) {
    return false;
  }

  // Buscar hallazgo existente de tratamiento de conducto para este diente
  const existing = hallazgos.find(
    (h) => h.hallazgo === "TRATAMIENTO_CONDUCTO" && h.diente === id,
  );

  if (existing) {
    // Si existe, lo eliminamos (toggle)
    if (onHallazgoDeleted) onHallazgoDeleted(existing.id);
  } else {
    // Crear nuevo hallazgo
    const newHallazgo: HallazgoClinico = {
      id: Date.now().toString(),
      diente: id,
      hallazgo: "TRATAMIENTO_CONDUCTO",
      estado: selectionMode.status,
      sigla: subType, // 'TC' o 'PC'
      especificacion:
        subType === "TC" ? "Tratamiento de Conducto" : "Pulpectomía",
      fecha: new Date().toLocaleDateString("es-PE"),
    };
    onHallazgoCreated(newHallazgo);
  }

  return true;
};
