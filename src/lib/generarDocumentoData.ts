/**
 * Opciones para el modal "Generar documento personalizado" (solo UI).
 * Datos determinísticos para el prototipo, sin llamadas de red.
 */

export interface InfoIncorporarOpcion {
  id: string;
  label: string;
}

export const infoIncorporarOpciones: InfoIncorporarOpcion[] = [
  { id: "poblacion", label: "Población" },
  { id: "emo", label: "EMO" },
  { id: "aptitudes", label: "Aptitudes" },
  { id: "diagnosticos", label: "Diagnósticos / Epidemiología" },
  {
    id: "enfermedades-trabajo",
    label: "Enfermedades relacionadas al trabajo",
  },
  {
    id: "riesgos-agentes",
    label: "Riesgos y agentes de exposición",
  },
  { id: "g1-g2-g3", label: "G1 / G2 / G3" },
  { id: "programas", label: "Programas" },
  {
    id: "conclusiones",
    label: "Conclusiones y recomendaciones",
  },
];
