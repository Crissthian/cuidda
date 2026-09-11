export interface InformeRegulatorio {
  id: string;
  periodo: string;
  sede: string;
  titulo: string;
  codigo: string;
  autoridad: string;
  medico: string;
  estado: string;
  empresa: string;
  alcance: string;
  version: string;
  insignia: string;
  generado: string;
  medicoDetalle: string;
  observaciones: number;
}

export const informesRegulatorios: InformeRegulatorio[] = [
  {
    id: "IR-2026-VN4P",
    periodo: "2026",
    sede: "Condorcocha",
    titulo: "Informe Técnico de Vigilancia de la Salud de los Trabajadores",
    codigo: "IR-2026-VN4P · v 1",
    autoridad: "DIGESA",
    medico: "Dr. M. Salcedo Quiroz",
    estado: "BORRADOR",
    empresa: "UNACEM PERU S.A.",
    alcance: "Consolidado",
    version: "v1",
    insignia: "VALIDADO",
    generado: "Generado el 9/9/2026, 11:49:43 am",
    medicoDetalle: "Médico Dr. M. Salcedo Quiroz ( CMP 48231 )",
    observaciones: 1,
  },
];
