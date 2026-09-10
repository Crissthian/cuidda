import { z } from "zod";

// 2 = No seleccionado / No
export const ANTECEDENTE_NO = "2";

/**
 * Esquema de validación para la Consulta Odontológica.
 */
export const consultaOdontoSchema = z.object({
  doctor: z.string().min(1, "El nombre del doctor es obligatorio"),
  motivo_consulta: z.string().optional(),

  tiempo_enfermedad: z.string().optional(),
  signos_sintomas: z.string().optional(),

  comentarios_generales: z.string().optional(),

  padre_cual: z.string().optional(),
  madre_cual: z.string().optional(),
  hermanos_cual: z.string().optional(),
  esposa_cual: z.string().optional(),

  ant_patologicos: z.string().optional(),
  patologicos_cual: z.string().optional(),

  ant_quirurgicos: z.string().optional(),
  quirurgicos_cual: z.string().optional(),

  ant_traumatico: z.string().optional(),
  traumatico_cual: z.string().optional(),

  ant_toxicologicos: z.string().optional(),
  toxicologicos_cual: z.string().optional(),

  ant_alergia: z.string().optional(),
  sufreAlergia_cual: z.string().optional(),

  ant_medicamento: z.string().optional(),
  tomaMedicamento_cual: z.string().optional(),

  otros_antecedentes: z.string().optional(),
  recomendaciones: z.string().optional(),
});

export type ConsultaOdontoDTO = z.infer<typeof consultaOdontoSchema>;

export const VALORES_INICIALES_CONSULTA: Partial<ConsultaOdontoDTO> = {
  ant_patologicos: ANTECEDENTE_NO,
  ant_quirurgicos: ANTECEDENTE_NO,
  ant_traumatico: ANTECEDENTE_NO,
  ant_toxicologicos: ANTECEDENTE_NO,
  ant_alergia: ANTECEDENTE_NO,
  ant_medicamento: ANTECEDENTE_NO,
};
