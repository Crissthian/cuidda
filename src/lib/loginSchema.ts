import { z } from "zod";

export const loginSchema = z.object({
  usuario: z
    .string()
    .min(1, "Ingresa tu usuario")
    .max(50, "Usuario demasiado largo"),
  password: z
    .string()
    .min(1, "Ingresa tu contraseña")
    .max(100, "Contraseña demasiado larga"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
