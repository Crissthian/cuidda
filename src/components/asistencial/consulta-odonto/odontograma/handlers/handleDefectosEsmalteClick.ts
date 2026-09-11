/**
 * Handler para clicks de Defectos de Esmalte (DDE).
 */

import { toast } from "sonner";
import { isToothInvalid } from "../utils";
import type { ToothClickHandler } from "./types";
import { generateHallazgoId, getCurrentDate } from "./types";

/**
 * Maneja el click para agregar defectos de desarrollo del esmalte.
 * Se aplica a un diente específico.
 */
export const handleDefectosEsmalteClick: ToothClickHandler = (ctx) => {
  const { id, hallazgos, selectionMode, onHallazgoCreated } = ctx;

  if (
    selectionMode.type !== "dde_opacidad" &&
    selectionMode.type !== "dde_pigmentacion" &&
    selectionMode.type !== "dde_fluorosis"
  ) {
    return false;
  }

  if (isToothInvalid(id, hallazgos)) {
    toast.error(
      "No se puede registrar este hallazgo en un diente ausente o inválido.",
    );
    return true;
  }

  // Evitar duplicados del mismo tipo exacto
  // Aunque un diente podria tener Opacidad y Pigmentación a la vez,
  // la norma suele indicar marcar el hallazgo predominante o permitir ambos.
  // Permitiremos agregar, pero si ya existe uno igual, avisar o no hacer nada.

  let sigla = "";
  let especificacion = "";

  switch (selectionMode.type) {
    case "dde_opacidad":
      sigla = "O";
      especificacion = "Opacidades del esmalte";
      break;
    case "dde_pigmentacion":
      sigla = "PE";
      especificacion = "Pigmentación del esmalte";
      break;
    case "dde_fluorosis":
      sigla = "Fluorosis"; // Se usará para mostrar en label si cabe, o solo en spec
      especificacion = "Fluorosis (Ver especificaciones)";
      break;
  }

  // Verificar si ya existe este DDE específico en el diente
  const exists = hallazgos.some(
    (h) =>
      h.diente === id &&
      h.hallazgo === "HIPOPLASIA_ESMALTE" &&
      h.sigla === sigla,
  );

  if (exists) {
    toast.error(`Ya existe el hallazgo ${sigla} en este diente.`);
    return true;
  }

  onHallazgoCreated({
    id: generateHallazgoId(),
    diente: id,
    hallazgo: "HIPOPLASIA_ESMALTE",
    estado: "malo", // Rojo
    sigla: sigla,
    // Para Fluorosis y otros DDE, el requerimiento dice: "Se colocan en el recuadro ... en mayúscula y color rojo las siglas"
    // Por tanto usamos 'sigla' para guardarlo.
    especificacion: especificacion,
    fecha: getCurrentDate(),
  });

  return true;
};
