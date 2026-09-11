import {
  ArrowRight,
  ArrowUp,
  CircleDot,
  Combine,
  Loader2,
  Plus,
  RotateCcw,
  RotateCw,
  Scissors,
  Sparkles,
  Square,
  Triangle,
  Camera,
} from "lucide-react";
import React, { useState } from "react";
import type { SelectionMode, SelectionType, StatusType } from "../types";
import { ToolbarDropdownMenu, type ToolbarMenuSection } from "./toolbar";

interface OdontogramaToolbarProps {
  viewMode: "adult" | "child";
  setViewMode: (mode: "adult" | "child") => void;
  selectionMode: SelectionMode;
  crownLabelInput: string;
  setCrownLabelInput: (value: string) => void;
  startSelection: (type: SelectionType, status: StatusType) => void;
  cancelSelection: () => void;
  onDownload?: () => void | Promise<void>;
}

const getSelectionLabel = (type: SelectionType): string => {
  const labels: Record<SelectionType, string> = {
    fixed: "Aparato Fijo",
    removable: "Removible",
    crown: "Corona",
    corona_temporal: "Corona Temporal",
    caries: "Caries",
    diastema: "Diastema",
    edentulous_total: "Edéntulo Total",
    espigo_munon: "Espigo-Muñon",
    fracture_crown: "Fractura Corona",
    fracture_root: "Fractura Raíz",
    fusion: "Fusión",
    gemination: "Geminación",
    giroversion_mesial: "Giroversión Mesial",
    giroversion_distal: "Giroversión Distal",
    caries_mb: "Caries: Mancha Blanca",
    caries_ce: "Caries: Esmalte",
    caries_cd: "Caries: Dentina",
    caries_cdp: "Caries: Dentina/Pulpa",
    restoration_good: "Restauración Buena",
    restoration_bad: "Restauración Mala",
    extraction_indicated: "Extracción Indicada",
    extraction_performed: "Extracción Realizada",
    sealant_good: "Sellante Bueno",
    sealant_bad: "Sellante Malo",
    pieza_ausente: "Pieza Ausente",
    diente_en_clavija: "Diente en Clavija",
    pieza_erupcion: "Pieza en Erupción",
    pieza_extruida: "Pieza Extruida",
    pieza_intruida: "Pieza Intruida",
    pieza_supernumeraria: "Pieza Supernumeraria",
    pulpotomia: "Pulpotomía",
    protesis_fija: "Prótesis Fija",
    protesis_total: "Prótesis Total",
    protesis_removible: "Prótesis Removible",
    restauracion_definitiva: "Restauración Definitiva",
    restauracion_temporal: "Restauración Temporal",
    superficie_desgastada: "Superficie Desgastada",
    tratamiento_conducto: "Tratamiento de Conducto",
    pulpectomia: "Pulpectomía",
    transposicion: "Transposición",
    dde_opacidad: "Opacidad",
    dde_pigmentacion: "Pigmentación",
    dde_fluorosis: "Fluorosis",
    defectos_esmalte: "Hipoplasia del Esmalte",
    fosas_fisuras_profundas: "Fosas y Fisuras Profundas",
    impactacion: "Impactación",
    implante_dental: "Implante Dental",
    macrodoncia: "Macrodoncia",
    pieza_ectopica: "Pieza Ectópica",
    microdoncia: "Microdoncia",
    movilidad_1: "Movilidad Grado 1",
    movilidad_2: "Movilidad Grado 2",
    movilidad_3: "Movilidad Grado 3",
    posicion_anormal_mesial: "Posicion anormal: Mesializado",
    posicion_anormal_distal: "Posicion anormal: Distalizado",
    posicion_anormal_vestibular: "Posicion anormal: Vestibularizado",
    posicion_anormal_palatinizado: "Posicion anormal: Palatinizado",
    posicion_anormal_lingual: "Posicion anormal: Lingualizado",
    remanente_radicular: "Remanente Radicular",
  };
  return labels[type] || type;
};

export const OdontogramaToolbar: React.FC<OdontogramaToolbarProps> = ({
  viewMode,
  setViewMode,
  selectionMode,
  crownLabelInput,
  setCrownLabelInput,
  startSelection,
  cancelSelection,
  onDownload,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!onDownload || isDownloading) return;
    setIsDownloading(true);
    try {
      await onDownload();
    } finally {
      setIsDownloading(false);
    }
  };
  // ============================================
  // DEFINICIÓN DE MENÚS POR CATEGORÍA
  // ============================================

  // --- RESTAURACIONES ---
  const coronaSections: ToolbarMenuSection[] = [
    {
      title: "Corona",
      items: [
        {
          id: "crown-bueno",
          label: "Corona ",
          icon: Plus,
          variant: "bueno",
          onClick: () => startSelection("crown", "bueno"),
        },
        {
          id: "crown-malo",
          label: "Corona ",
          icon: Plus,
          variant: "malo",
          onClick: () => startSelection("crown", "malo"),
        },
        {
          id: "crown-temporal",
          label: "Corona Temporal",
          icon: Plus,
          variant: "malo",
          onClick: () => {
            setCrownLabelInput("CT");
            startSelection("corona_temporal", "malo");
          },
        },
      ],
    },
    {
      title: "Espigo-Muñon",
      items: [
        {
          id: "espigo-bueno",
          label: "Espigo-Muñon ",
          icon: Plus,
          variant: "bueno",
          onClick: () => startSelection("espigo_munon", "bueno"),
        },
        {
          id: "espigo-malo",
          label: "Espigo-Muñon ",
          icon: Plus,
          variant: "malo",
          onClick: () => startSelection("espigo_munon", "malo"),
        },
      ],
    },
  ];

  const restauracionesSections: ToolbarMenuSection[] = [
    {
      title: "Restauración Definitiva",
      items: [
        {
          id: "rest-def-bueno",
          label: "Definitiva ",
          icon: Plus,
          variant: "bueno",
          onClick: () => startSelection("restauracion_definitiva", "bueno"),
        },
        {
          id: "rest-def-malo",
          label: "Definitiva ",
          icon: Plus,
          variant: "malo",
          onClick: () => startSelection("restauracion_definitiva", "malo"),
        },
      ],
    },
    {
      title: "Restauración Temporal",
      items: [
        {
          id: "rest-temp",
          label: "Temporal - Aplicar",
          icon: Plus,
          variant: "malo",
          onClick: () => startSelection("restauracion_temporal", "malo"),
        },
      ],
    },
    {
      title: "Sellantes",
      items: [
        {
          id: "sellante-bueno",
          label: "Sellante ",
          icon: Sparkles,
          variant: "bueno",
          onClick: () => startSelection("sealant_good", "bueno"),
        },
        {
          id: "sellante-malo",
          label: "Sellante ",
          icon: Sparkles,
          variant: "malo",
          onClick: () => startSelection("sealant_bad", "malo"),
        },
        {
          id: "fosas-fisuras",
          label: "Fosas y Fisuras Profundas",
          icon: CircleDot,
          variant: "bueno",
          onClick: () => startSelection("fosas_fisuras_profundas", "bueno"),
        },
      ],
    },
    {
      title: "Superficie Desgastada",
      items: [
        {
          id: "sup-desgastada",
          label: "Superficie Desgastada",
          icon: Plus,
          variant: "malo",
          onClick: () => startSelection("superficie_desgastada", "malo"),
        },
      ],
    },
  ];

  const cariesSections: ToolbarMenuSection[] = [
    {
      title: "Tipos de Caries",
      items: [
        {
          id: "caries-mb",
          label: "MB - Mancha Blanca",
          variant: "malo",
          onClick: () => startSelection("caries_mb", "malo"),
        },
        {
          id: "caries-ce",
          label: "CE - Caries Esmalte",
          variant: "malo",
          onClick: () => startSelection("caries_ce", "malo"),
        },
        {
          id: "caries-cd",
          label: "CD - Caries Dentina",
          variant: "malo",
          onClick: () => startSelection("caries_cd", "malo"),
        },
        {
          id: "caries-cdp",
          label: "CDP - Caries Pulpa",
          variant: "malo",
          onClick: () => startSelection("caries_cdp", "malo"),
        },
      ],
    },
  ];

  const endodonciaSections: ToolbarMenuSection[] = [
    {
      title: "Tratamiento de Conducto",
      items: [
        {
          id: "tc-bueno",
          label: "Tratamiento de Conducto ",
          icon: Plus,
          variant: "bueno",
          onClick: () => startSelection("tratamiento_conducto", "bueno"),
        },
        {
          id: "tc-malo",
          label: "Tratamiento de Conducto ",
          icon: Plus,
          variant: "malo",
          onClick: () => startSelection("tratamiento_conducto", "malo"),
        },
      ],
    },
    {
      title: "Pulpectomía",
      items: [
        {
          id: "pc-bueno",
          label: "Pulpectomía ",
          icon: Plus,
          variant: "bueno",
          onClick: () =>
            startSelection("pulpectomia" as SelectionType, "bueno"),
        },
        {
          id: "pc-malo",
          label: "Pulpectomía ",
          icon: Plus,
          variant: "malo",
          onClick: () => startSelection("pulpectomia" as SelectionType, "malo"),
        },
      ],
    },
    {
      title: "Pulpotomía",
      items: [
        {
          id: "pulpotomia-bueno",
          label: "Pulpotomía ",
          icon: Plus,
          variant: "bueno",
          onClick: () => startSelection("pulpotomia", "bueno"),
        },
        {
          id: "pulpotomia-malo",
          label: "Pulpotomía ",
          icon: Plus,
          variant: "malo",
          onClick: () => startSelection("pulpotomia", "malo"),
        },
      ],
    },
  ];

  const protesisSections: ToolbarMenuSection[] = [
    {
      title: "Prótesis Fija",
      items: [
        {
          id: "pf-bueno",
          label: "Prótesis Fija ",
          icon: Plus,
          variant: "bueno",
          onClick: () => startSelection("protesis_fija", "bueno"),
        },
        {
          id: "pf-malo",
          label: "Prótesis Fija ",
          icon: Plus,
          variant: "malo",
          onClick: () => startSelection("protesis_fija", "malo"),
        },
      ],
    },
    {
      title: "Prótesis Removible",
      items: [
        {
          id: "pr-bueno",
          label: "Prótesis Removible ",
          variant: "bueno",
          onClick: () => startSelection("protesis_removible", "bueno"),
        },
        {
          id: "pr-malo",
          label: "Prótesis Removible ",
          variant: "malo",
          onClick: () => startSelection("protesis_removible", "malo"),
        },
      ],
    },
    {
      title: "Prótesis Total",
      items: [
        {
          id: "pt-bueno",
          label: "Prótesis Total ",
          variant: "bueno",
          onClick: () => startSelection("protesis_total", "bueno"),
        },
        {
          id: "pt-malo",
          label: "Prótesis Total ",
          variant: "malo",
          onClick: () => startSelection("protesis_total", "malo"),
        },
      ],
    },
    {
      title: "Implante Dental",
      items: [
        {
          id: "implante-bueno",
          label: "Implante ",
          icon: Plus,
          variant: "bueno",
          onClick: () => startSelection("implante_dental", "bueno"),
        },
        {
          id: "implante-malo",
          label: "Implante ",
          icon: Plus,
          variant: "malo",
          onClick: () => startSelection("implante_dental", "malo"),
        },
      ],
    },
  ];

  // --- ORTODONCIA ---
  const ortodonciaSections: ToolbarMenuSection[] = [
    {
      title: "Aparato Fijo",
      items: [
        {
          id: "fixed-bueno",
          label: "Aparato Fijo ",
          icon: Plus,
          variant: "bueno",
          onClick: () => startSelection("fixed", "bueno"),
        },
        {
          id: "fixed-malo",
          label: "Aparato Fijo ",
          icon: Plus,
          variant: "malo",
          onClick: () => startSelection("fixed", "malo"),
        },
      ],
    },
    {
      title: "Removible",
      items: [
        {
          id: "removable-bueno",
          label: "Removible ",
          icon: Plus,
          variant: "bueno",
          onClick: () => startSelection("removable", "bueno"),
        },
        {
          id: "removable-malo",
          label: "Removible ",
          icon: Plus,
          variant: "malo",
          onClick: () => startSelection("removable", "malo"),
        },
      ],
    },
    {
      title: "Diastema",
      items: [
        {
          id: "diastema",
          label: "Seleccionar Diastema",
          icon: ArrowRight,
          variant: "bueno",
          onClick: () => startSelection("diastema", "bueno"),
        },
      ],
    },
    {
      title: "Giroversión",
      items: [
        {
          id: "giro-mesial",
          label: "Giroversión Mesial",
          icon: RotateCcw,
          variant: "bueno",
          onClick: () => startSelection("giroversion_mesial", "bueno"),
        },
        {
          id: "giro-distal",
          label: "Giroversión Distal",
          icon: RotateCw,
          variant: "bueno",
          onClick: () => startSelection("giroversion_distal", "bueno"),
        },
      ],
    },
  ];

  // --- ESTRUCTURAL ---
  const fracturaSections: ToolbarMenuSection[] = [
    {
      title: "Fracturas",
      items: [
        {
          id: "frac-corona",
          label: "Fractura de Corona",
          icon: Scissors,
          variant: "malo",
          onClick: () => startSelection("fracture_crown", "malo"),
        },
        {
          id: "frac-raiz",
          label: "Fractura de Raíz",
          icon: Scissors,
          variant: "malo",
          onClick: () => startSelection("fracture_root", "malo"),
        },
      ],
    },
    {
      title: "Anomalías",
      items: [
        {
          id: "fusion",
          label: "Fusión",
          icon: Combine,
          variant: "bueno",
          onClick: () => startSelection("fusion", "malo"),
        },
        {
          id: "gemination",
          label: "Geminación",
          icon: Combine,
          variant: "bueno",
          onClick: () => startSelection("gemination", "malo"),
        },
        {
          id: "transposicion",
          label: "Transposición",
          icon: Combine,
          variant: "bueno",
          onClick: () => startSelection("transposicion", "bueno"),
        },
      ],
    },
  ];

  const piezaAusenteSections: ToolbarMenuSection[] = [
    {
      title: "Pieza Ausente",
      items: [
        {
          id: "dne",
          label: "DNE - Diente No Erupcionado",
          variant: "bueno",
          onClick: () => {
            setCrownLabelInput("DNE");
            startSelection("pieza_ausente", "bueno");
          },
        },
        {
          id: "dex",
          label: "DEX - Diente Extraído",
          variant: "bueno",
          onClick: () => {
            setCrownLabelInput("DEX");
            startSelection("pieza_ausente", "bueno");
          },
        },
        {
          id: "dao",
          label: "DAO - Diente Ausente Otro",
          variant: "bueno",
          onClick: () => {
            setCrownLabelInput("DAO");
            startSelection("pieza_ausente", "bueno");
          },
        },
        {
          id: "rr",
          label: "RR - Remanente Radicular",
          variant: "malo",
          onClick: () => startSelection("remanente_radicular", "malo"),
        },
      ],
    },
    {
      title: "Edéntulo Total",
      items: [
        {
          id: "edentulo-sup",
          label: "Edéntulo Superior",
          icon: Square,
          variant: "bueno",
          onClick: () => startSelection("edentulous_total", "bueno"),
        },
        {
          id: "edentulo-inf",
          label: "Edéntulo Inferior",
          icon: Square,
          variant: "bueno",
          onClick: () => startSelection("edentulous_total", "malo"),
        },
      ],
    },
  ];

  const posicionDentariaSections: ToolbarMenuSection[] = [
    {
      title: "Posición Dentaria",
      items: [
        {
          id: "clavija",
          label: "Diente en Clavija",
          variant: "bueno",
          onClick: () => startSelection("diente_en_clavija", "bueno"),
          children: <Triangle size={14} className="rotate-180" />,
        },
        {
          id: "erupcion",
          label: "Pieza en Erupción",
          variant: "bueno",
          onClick: () => startSelection("pieza_erupcion", "bueno"),
          children: <ArrowRight size={14} className="rotate-90" />,
        },
        {
          id: "extruida",
          label: "Pieza Extruida",
          variant: "bueno",
          onClick: () => startSelection("pieza_extruida", "bueno"),
          children: <ArrowUp size={14} className="rotate-180" />,
        },
        {
          id: "intruida",
          label: "Pieza Intruida",
          variant: "bueno",
          onClick: () => startSelection("pieza_intruida", "bueno"),
          children: <ArrowUp size={14} />,
        },
        {
          id: "supernumeraria",
          label: "Pieza Supernumeraria",
          variant: "bueno",
          onClick: () => startSelection("pieza_supernumeraria", "bueno"),
          children: <span className="font-bold text-xs">S</span>,
        },
        {
          id: "impactacion",
          label: "Impactación",
          variant: "bueno",
          onClick: () => startSelection("impactacion", "bueno"),
          children: <span className="font-bold text-xs">I</span>,
        },
        {
          id: "macrodoncia",
          label: "Macrodoncia",
          variant: "bueno",
          onClick: () => startSelection("macrodoncia", "bueno"),
          children: <span className="font-bold text-xs">MAC</span>,
        },
        {
          id: "pieza-ectopica",
          label: "Pieza Ectópica",
          variant: "bueno",
          onClick: () => startSelection("pieza_ectopica", "bueno"),
          children: <span className="font-bold text-xs">E</span>,
        },
        {
          id: "microdoncia",
          label: "Microdoncia",
          variant: "bueno",
          onClick: () => startSelection("microdoncia", "bueno"),
          children: <span className="font-bold text-xs">MIC</span>,
        },
      ],
    },
    {
      title: "Posicion Anormal Dentaria",
      items: [
        {
          id: "posicion-anormal-m",
          label: "Mesializado",
          variant: "bueno",
          onClick: () => startSelection("posicion_anormal_mesial", "bueno"),
          children: <span className="font-bold text-xs">M</span>,
        },
        {
          id: "posicion-anormal-d",
          label: "Distalizado",
          variant: "bueno",
          onClick: () => startSelection("posicion_anormal_distal", "bueno"),
          children: <span className="font-bold text-xs">D</span>,
        },
        {
          id: "posicion-anormal-v",
          label: "Vestibularizado",
          variant: "bueno",
          onClick: () => startSelection("posicion_anormal_vestibular", "bueno"),
          children: <span className="font-bold text-xs">V</span>,
        },
        {
          id: "posicion-anormal-p",
          label: "Palatinizado",
          variant: "bueno",
          onClick: () =>
            startSelection("posicion_anormal_palatinizado", "bueno"),
          children: <span className="font-bold text-xs">P</span>,
        },
        {
          id: "posicion-anormal-l",
          label: "Lingualizado",
          variant: "bueno",
          onClick: () => startSelection("posicion_anormal_lingual", "bueno"),
          children: <span className="font-bold text-xs">L</span>,
        },
      ],
    },
    {
      title: "Movilidad",
      items: [
        {
          id: "movilidad-1",
          label: "Movilidad Grado 1",
          variant: "malo",
          onClick: () => startSelection("movilidad_1", "malo"),
          children: <span className="font-bold text-xs text-red-600">M1</span>,
        },
        {
          id: "movilidad-2",
          label: "Movilidad Grado 2",
          variant: "malo",
          onClick: () => startSelection("movilidad_2", "malo"),
          children: <span className="font-bold text-xs text-red-600">M2</span>,
        },
        {
          id: "movilidad-3",
          label: "Movilidad Grado 3",
          variant: "malo",
          onClick: () => startSelection("movilidad_3", "malo"),
          children: <span className="font-bold text-xs text-red-600">M3</span>,
        },
      ],
    },
  ];

  const ddeSections: ToolbarMenuSection[] = [
    {
      title: "Hipoplasia del Esmalte",
      items: [
        {
          id: "dde-opacidad",
          label: "O - Opacidad",
          variant: "malo",
          onClick: () => startSelection("dde_opacidad", "malo"),
        },
        {
          id: "dde-pigmentacion",
          label: "PE - Pigmentación",
          variant: "malo",
          onClick: () => startSelection("dde_pigmentacion", "malo"),
        },
        {
          id: "dde-fluorosis",
          label: "Fluorosis",
          variant: "malo",
          onClick: () => startSelection("dde_fluorosis", "malo"),
        },
      ],
    },
  ];

  // ============================================
  // CONTENIDO PERSONALIZADO PARA MATERIALES
  // ============================================
  const MaterialSelector = () => (
    <div className="mb-2 pb-2 border-b border-border-subtle">
      <div className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 text-brand">
        Material (Etiqueta)
      </div>
      <div className="px-2">
        <div className="flex gap-1 mb-2">
          <input
            type="text"
            value={crownLabelInput}
            onChange={(e) => setCrownLabelInput(e.target.value.toUpperCase())}
            className="w-12 h-7 text-xs text-center border border-border-default rounded focus:ring-2 focus:ring-blue-500 outline-none font-bold uppercase bg-surface-light shadow-sm"
            placeholder="SIG"
            aria-label="Etiqueta para corona"
          />
        </div>
        <div className="grid grid-cols-3 gap-1">
          {["AM", "R", "IV", "IM", "IE", "C"].map((mat) => (
            <button
              key={mat}
              onClick={() => setCrownLabelInput(mat)}
              className={`text-[10px] px-1.5 py-1 rounded border transition-colors ${
                crownLabelInput === mat
                  ? "bg-surface-light border-border-default text-blue-700 font-bold"
                  : "bg-surface-light border-border-default text-text-secondary hover:bg-surface-light"
              }`}
              title={`Seleccionar material: ${mat}`}
            >
              {mat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col w-full gap-4 text-sm">
      {/* Fila superior: Control de Vista e Indicador de Selección */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* Toggle Vista Adulto/Niño */}
          <div className="flex bg-muted-20 p-1 rounded-xl shadow-inner border border-border-subtle/30">
            <button
              type="button"
              onClick={() => setViewMode("adult")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                viewMode === "adult"
                  ? "bg-brand text-white shadow-md transform scale-105"
                  : "text-text-secondary hover:text-brand hover:bg-muted-50"
              }`}
            >
              ADULTO
            </button>
            <button
              type="button"
              onClick={() => setViewMode("child")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                viewMode === "child"
                  ? "bg-brand text-white shadow-md transform scale-105"
                  : "text-text-secondary hover:text-brand hover:bg-muted-50"
              }`}
            >
              NIÑO
            </button>
          </div>

          {/* Botón Descargar Captura */}
          {onDownload && (
            <button
              type="button"
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center gap-1.5 p-2 rounded-md text-xs text-white font-bold bg-brand border border-border-default hover:bg-brand/90 transition-colors shadow-sm ml-2 disabled:opacity-60 disabled:cursor-not-allowed"
              title="Descargar imagen del odontograma"
            >
              {isDownloading ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Camera size={14} />
              )}
              <span>
                {isDownloading ? "Descargando..." : "Descargar captura"}
              </span>
            </button>
          )}
        </div>

        {/* Indicador de Selección Activa */}
        {selectionMode.isActive && (
          <div className="flex items-center gap-3 bg-yellow-50 px-3 py-1.5 rounded-lg border border-yellow-200 animate-in fade-in slide-in-from-right-4 duration-300">
            <span className="text-xs font-bold text-yellow-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
              Seleccionando: {getSelectionLabel(selectionMode.type)} (
              {selectionMode.status === "bueno" ? "Bueno" : "Malo"})
            </span>
            <button
              onClick={cancelSelection}
              className="text-xs text-red-600 font-bold hover:text-red-800 hover:underline px-2 border-l border-yellow-200"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>

      {/* Panel de Herramientas - Menús Dropdown */}
      <div className="bg-surface-light p-3 rounded-lg border border-border-default">
        <div className="flex flex-wrap gap-2">
          {/* === RESTAURACIÓN === */}
          <div className="flex items-center gap-1 pr-3 border-r border-border-subtle">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider mr-1">
              Restauración
            </span>
          </div>

          <ToolbarDropdownMenu
            label="Coronas"
            color="blue"
            sections={coronaSections}
            customContent={<MaterialSelector />}
          />

          <ToolbarDropdownMenu
            label="Restauraciones"
            color="blue"
            sections={restauracionesSections}
            customContent={<MaterialSelector />}
          />

          <ToolbarDropdownMenu
            label="Caries"
            color="red"
            sections={cariesSections}
          />

          <ToolbarDropdownMenu
            label="Endodoncia"
            color="blue"
            sections={endodonciaSections}
          />

          <ToolbarDropdownMenu
            label="Prótesis"
            color="blue"
            sections={protesisSections}
          />
          {/* === ORTODONCIA === */}
          <div className="flex items-center gap-1 px-3 border-r border-border-subtle">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider mr-1">
              Ortodoncia
            </span>
          </div>

          <ToolbarDropdownMenu
            label="Ortodoncia"
            color="purple"
            sections={ortodonciaSections}
          />
          <div className="w-full h-0"></div>
          {/* === ESTRUCTURAL === */}
          <div className="flex items-center gap-1 pr-3 border-r border-border-subtle">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider mr-1">
              Estructural
            </span>
          </div>

          <ToolbarDropdownMenu
            label="Fracturas/Anomalías"
            color="red"
            sections={fracturaSections}
          />

          <ToolbarDropdownMenu
            label="Piezas Ausentes"
            color="amber"
            sections={piezaAusenteSections}
          />

          <ToolbarDropdownMenu
            label="Posición Dentaria"
            color="green"
            sections={posicionDentariaSections}
          />

          <ToolbarDropdownMenu
            label="Hipoplasia del esmalte"
            color="red"
            sections={ddeSections}
          />
        </div>
      </div>
    </div>
  );
};
