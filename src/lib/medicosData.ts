export type EstadoCertificado = "VIGENTE" | "POR VENCER" | "SIN CERTIFICADO";

export interface Medico {
  id: number;
  medico: string;
  dni: string;
  cmp: string;
  sede: string;
  especialidad: string;
  correo: string;
  certificado: EstadoCertificado;
  vigencia: string;
  ultimaFirma: string;
  proveedor: string;
  serie: string;
  inicio: string;
  vencimiento: string;
}

export const medicos: Medico[] = [
  {
    id: 1,
    medico: "Carlos Pérez Gómez",
    dni: "45879214",
    cmp: "12345",
    sede: "Atocongo",
    especialidad: "Medicina Ocupacional",
    correo: "cperez@lucemedic.com",
    certificado: "VIGENTE",
    vigencia: "15 mar. 2027",
    ultimaFirma: "Hoy, 11:52",
    proveedor: "Empresa certificadora",
    serie: "73A5F8B21C",
    inicio: "15-03-2026",
    vencimiento: "15-03-2027",
  },
  {
    id: 2,
    medico: "Ana Torres Ruiz",
    dni: "48210367",
    cmp: "25699",
    sede: "Condorcocha",
    especialidad: "Medicina Ocupacional",
    correo: "atorres@lucemedic.com",
    certificado: "POR VENCER",
    vigencia: "20 oct. 2026",
    ultimaFirma: "Ayer, 16:08",
    proveedor: "Empresa certificadora",
    serie: "91C2D4E77A",
    inicio: "20-10-2025",
    vencimiento: "20-10-2026",
  },
  {
    id: 3,
    medico: "María Gómez León",
    dni: "47129853",
    cmp: "25877",
    sede: "Condorcocha",
    especialidad: "Medicina Ocupacional",
    correo: "mgomez@lucemedic.com",
    certificado: "SIN CERTIFICADO",
    vigencia: "---",
    ultimaFirma: "---",
    proveedor: "Empresa certificadora",
    serie: "---",
    inicio: "---",
    vencimiento: "---",
  },
  {
    id: 4,
    medico: "Luis Ramírez Soto",
    dni: "40987123",
    cmp: "75841",
    sede: "Conchán",
    especialidad: "Medicina Ocupacional",
    correo: "lramirez@lucemedic.com",
    certificado: "VIGENTE",
    vigencia: "06 jul. 2027",
    ultimaFirma: "03 sep., 09:21",
    proveedor: "Empresa certificadora",
    serie: "55B8F1C03D",
    inicio: "06-07-2026",
    vencimiento: "06-07-2027",
  },
];

export const documentosFirmables = [
  "CAMO",
  "Certificado de aptitud",
  "Historia clínica",
  "Interconsultas",
  "Resultados de laboratorio",
] as const;
