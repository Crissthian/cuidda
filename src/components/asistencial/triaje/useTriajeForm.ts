import { useForm } from "react-hook-form";
import { emptyTriajeForm, type TriajeFormDTO } from "./triaje.types";

/**
 * Hook de formulario de Triaje (solo UI, sin servidor).
 */
export const useTriajeForm = () => {
  const form = useForm<TriajeFormDTO>({
    defaultValues: emptyTriajeForm,
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  return form;
};