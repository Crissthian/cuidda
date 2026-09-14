export const kpisProtocolos = [
  {
    id: 1,
    label: "PROTOCOLOS",
    value: "6",
    icon: "fa-book-medical",
    iconBg: "bg-[#e6f0ff]",
    iconColor: "text-brand",
  },
  {
    id: 2,
    label: "VIGENTES",
    value: "3",
    icon: "fa-calendar-check",
    iconBg: "bg-risk-salmon/15",
    iconColor: "text-risk-salmon",
  },
  {
    id: 3,
    label: "POR ACTUALIZAR",
    value: "1",
    icon: "fa-file-pen",
    iconBg: "bg-success/15",
    iconColor: "text-success-dark",
  },
  {
    id: 4,
    label: "EXÁMENES DEFINIDOS",
    value: "5",
    icon: "fa-file-circle-plus",
    iconBg: "bg-risk-red/10",
    iconColor: "text-risk-red",
  },
] as const;

export const protocolos = [
  {
    id: 1,
    slug: "administrativos",
    protocolo: "EMO ADMINISTRATIVOS",
    codigo: "PRT-ADM-01",
    empresa: "UNACEM PERU S.A.",
    area: "Administración",
    puestos: "12 puestos",
    tipos: "Ingreso / Periódico / Retiro / Reubicación",
    version: "V03",
    actualizacion: "15/07/2026",
    estado: "VIGENTE",
  },
  {
    id: 2,
    slug: "operarios",
    protocolo: "EMO OPERARIOS",
    codigo: "PRT-OPE-02",
    empresa: "UNACEM PERU S.A.",
    area: "Operaciones",
    puestos: "18 puestos",
    tipos: "Ingreso / Periódico / Retiro / Reubicación / Otros",
    version: "V05",
    actualizacion: "02/08/2026",
    estado: "VIGENTE",
  },
  {
    id: 3,
    slug: "conductores",
    protocolo: "EMO CONDUCTORES",
    codigo: "PRT-CON-03",
    empresa: "TRANSPORTE VIA NORTE S.A.C.",
    area: "Logística / Transporte",
    puestos: "4 puestos",
    tipos: "Ingreso / Periódico / Retiro /Reubicación",
    version: "V02",
    actualizacion: "10/06/2026",
    estado: "VIGENTE",
  },
  {
    id: 4,
    slug: "soldadores",
    protocolo: "EMO SOLDADORES",
    codigo: "PRT-SOL-04",
    empresa: "UNACEM PERU S.A.",
    area: "Operaciones / Mantenimiento",
    puestos: "4 puestos",
    tipos: "Ingreso / Periódico / Retiro /Reubicación / Otros",
    version: "V04",
    actualizacion: "01/08/2026",
    estado: "VIGENTE",
  },
  {
    id: 5,
    slug: "personal-de-altura",
    protocolo: "EMO PERSONAL DE ALTURA",
    codigo: "PRT-ALT-05",
    empresa: "UNACEM PERU S.A.",
    area: "Transversal",
    puestos: "5 puestos",
    tipos: "Ingreso / Periódico / Retiro / Reubicación",
    version: "V03",
    actualizacion: "05/05/2026",
    estado: "VIGENTE",
  },
  {
    id: 6,
    slug: "personal-expuesto-a-ruido",
    protocolo: "EMO PERSONAL EXPUESTO A RUIDO",
    codigo: "PRT-RUI-06",
    empresa: "UNACEM PERU S.A.",
    area: "Producción",
    puestos: "6 puestos",
    tipos: "Ingreso / Periódico / Retiro / Reubicación",
    version: "V02",
    actualizacion: "20/02/2026",
    estado: "VIGENTE",
  },
] as const;

/** Nombre corto del protocolo sin el prefijo "EMO " inicial, en formato capitalizado. */
export function nombreCortoProtocolo(protocolo: string): string {
  const sinPrefijo = protocolo
    .replace(/^EMO\s+/i, "")
    .trim()
    .toLowerCase();
  return sinPrefijo.replace(/(?:^|\s)\S/g, (c) => c.toUpperCase());
}

export const areasProtocolo = [
  "Administración",
  "Operaciones",
  "Logistica",
  "Transporte",
  "Mantenimiento",
  "Producción",
] as const;

export const estadosProtocolo = ["Vigente", "No vigente"] as const;
