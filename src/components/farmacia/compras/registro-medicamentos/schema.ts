import { z } from "zod";

/**
 * Esquema de validación para el registro de medicamentos.
 */
export const medicamentoSchema = z.object({
  nombreProducto: z.string().min(1, "El nombre del producto es obligatorio"),
  laboratorio: z.string().min(1, "El laboratorio es obligatorio"),
  principioActivo: z.string().min(1, "El principio activo es obligatorio"),
  presentacion: z.string().min(1, "La presentación es obligatoria"),
  tipoMedicamento: z.string().min(1, "El tipo de medicamento es obligatorio"),
  codigoProductoDigemid: z
    .string()
    .min(1, "El código de producto DIGEMID es obligatorio"),
  codigoGenericoDigemid: z
    .string()
    .min(1, "El código genérico DIGEMID es obligatorio"),
  registroSanitario: z.string().min(1, "El registro sanitario es obligatorio"),
  requiereReceta: z.boolean(),
  costoProducto: z.coerce
    .number()
    .min(0, "El costo debe ser mayor o igual a 0"),
  precioUnidad: z.coerce
    .number()
    .min(0, "El precio por unidad debe ser mayor o igual a 0"),
  precioBlister: z.coerce
    .number()
    .min(0, "El precio por blister debe ser mayor o igual a 0"),
  precioCaja: z.coerce
    .number()
    .min(0, "El precio por caja debe ser mayor o igual a 0"),
});

export type MedicamentoFormValues = z.infer<typeof medicamentoSchema>;
