import type { protocolos } from "@/lib/protocolosData";

type Protocolo = (typeof protocolos)[number];

export const puestosIncluidos = [
  "Asistente administrativo",
  "Analista de RR.HH.",
  "Contador",
  "Coordinador de logística",
  "Recepcionista",
  "Analista de sistemas",
  "Jefe de área",
  "Asistente contable",
  "Practicante administrativo",
  "Community manager",
  "Analista de compras",
  "Secretaria de gerencia",
] as const;

export const perfilTabs = [
  "INGRESO",
  "PERIÓDICO",
  "RETIRO",
  "REUBICACIÓN",
] as const;

export const perfilEvaluaciones = {
  INGRESO: [
    {
      evaluacion: "Evaluación médica ocupacional",
      tipo: "BASE",
      condicion: "Siempre",
    },
    { evaluacion: "Hemograma completo", tipo: "BASE", condicion: "Siempre" },
    {
      evaluacion: "Examen completo de orina",
      tipo: "BASE",
      condicion: "Siempre",
    },
    {
      evaluacion: "Evaluación oftalmológica básica",
      tipo: "BASE",
      condicion: "Siempre",
    },
    {
      evaluacion: "Perfil lipídico y glucosa",
      tipo: "BASE",
      condicion: "Siempre",
    },
    {
      evaluacion: "Evaluación musculoesquelética",
      tipo: "CONDICIONAL",
      condicion: "Trabajo prolongado en pantalla de visualización de datos",
    },
    {
      evaluacion: "Evaluación psicológica",
      tipo: "CONDICIONAL",
      condicion: "Puestos con alta carga mental o atención al público",
    },
  ],
  PERIÓDICO: [
    {
      evaluacion: "Evaluación médica ocupacional",
      tipo: "BASE",
      condicion: "Siempre",
    },
    { evaluacion: "Hemograma completo", tipo: "BASE", condicion: "Siempre" },
    {
      evaluacion: "Examen completo de orina",
      tipo: "BASE",
      condicion: "Siempre",
    },
    {
      evaluacion: "Evaluación oftalmológica básica",
      tipo: "BASE",
      condicion: "Siempre",
    },
    {
      evaluacion: "Perfil lipídico y glucosa",
      tipo: "BASE",
      condicion: "Siempre",
    },
    {
      evaluacion: "Evaluación musculoesquelética",
      tipo: "CONDICIONAL",
      condicion: "Sintomatología ergonómica reportada o >6 h en PVD",
    },
  ],
  RETIRO: [
    {
      evaluacion: "Evaluación médica ocupacional de retiro",
      tipo: "BASE",
      condicion: "Siempre",
    },
    { evaluacion: "Hemograma completo", tipo: "BASE", condicion: "Siempre" },
    {
      evaluacion: "Evaluación oftalmológica",
      tipo: "CONDICIONAL",
      condicion: "Antecedente de vigilancia visual durante el vínculo laboral",
    },
  ],
  REUBICACIÓN: [
    {
      evaluacion: "Evaluación médica ocupacional",
      tipo: "BASE",
      condicion: "Siempre",
    },
    {
      evaluacion: "Exámenes del puesto de destino",
      tipo: "CONDICIONAL",
      condicion: "Según protocolo del nuevo puesto y riesgos asociados",
    },
  ],
} as const;

export const historialVersiones = [
  {
    version: "V03",
    fecha: "15/07/2026",
    responsable: "Dra. Carmen Ríos",
    condicion: "Incorporación de vigilancia ergonómica en PVD",
    vigencia: "Desde 15/07/2026",
    estado: "VIGENTE",
  },
  {
    version: "V02",
    fecha: "10/03/2025",
    responsable: "Dra. Carmen Ríos",
    condicion: "Revisión anual",
    vigencia: "2025 – 2026",
    estado: "HISTÓRICO",
  },
  {
    version: "V01",
    fecha: "02/02/2024",
    responsable: "Dr. Luis Bermúdez",
    condicion: "Creación del protocolo",
    vigencia: "2024 – 2025",
    estado: "HISTÓRICO",
  },
] as const;

export function getDetalle(protocolo: Protocolo) {
  // Mapeo coherente con MatrizIperc – usa datos del protocolo + defaults del mockup
  const grupoMap: Record<string, string> = {
    "EMO ADMINISTRATIVOS": "Administrativo",
    "EMO OPERARIOS": "Operativo",
    "EMO CONDUCTORES": "Conductores",
    "EMO SOLDADORES": "Soldadura",
    "EMO PERSONAL DE ALTURA": "Altura",
    "EMO PERSONAL EXPUESTO A RUIDO": "Ruido",
  };
  return {
    empresa: protocolo.empresa,
    sede: "Sede Lima",
    grupo: grupoMap[protocolo.protocolo] ?? "Administrativo",
    area: protocolo.area,
    version: protocolo.version,
    vigencia: protocolo.actualizacion,
    ultima: protocolo.actualizacion,
    responsable: "Dra. Carmen Ríos — Médico Ocupacional",
    codigo: protocolo.codigo,
  };
}
