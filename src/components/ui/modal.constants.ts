/**
 * Tipos y constantes reutilizables para modales.
 */

export type ModalSize =
  "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";

export const MODAL_SIZE_CLASSES: Record<ModalSize, string> = {
  sm: "w-[30%]",
  md: "w-[40%]",
  lg: "w-[50%]",
  xl: "w-[60%]",
  "2xl": "w-[70%]",
  "3xl": "w-[80%]",
  "4xl": "w-[90%]",
  "5xl": "w-[95%]",
  full: "w-full",
};
