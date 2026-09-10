export interface DistribucionItem {
    id: number;
    label: string;
    pct: number;
    color: string;
}

export interface CategoriaValor {
    id: number;
    categoria: string;
    valor: number;
}

export interface BarraHorizontalItem {
    id: number;
    pct: number;
    label: string;
    color: string;
}

export const poblacionGenero: DistribucionItem[] = [
    { id: 1, label: "HOMBRES", pct: 80, color: "#0064d2" },
    { id: 2, label: "MUJERES", pct: 20, color: "#8e3dba" },
];

export const poblacionEdad: DistribucionItem[] = [
    { id: 1, label: "18-29 AÑOS", pct: 80, color: "#0064d2" },
    { id: 2, label: "40-49 AÑOS", pct: 20, color: "#636d73" },
    { id: 3, label: "50 AÑOS A MÁS", pct: 10, color: "#a2c0d4" },
];

export const poblacionAptitud: DistribucionItem[] = [
    { id: 1, label: "APTO", pct: 80, color: "#b388eb" },
    { id: 2, label: "NO APTO", pct: 20, color: "#8993af" },
    { id: 3, label: "APTO CON RESTRICCIONES", pct: 10, color: "#d9c2f0" },
    { id: 4, label: "OBSERVADO", pct: 20, color: "#5b2d8e" },
];

export const presionArterial: DistribucionItem[] = [
    {
        id: 1,
        label: "DENTRO DE LOS LÍMITES NORMALES",
        pct: 80,
        color: "#38bdf8",
    },
    {
        id: 2,
        label: "FUERA DE LOS LÍMITES NORMALES",
        pct: 10,
        color: "#fe7e6b",
    },
];

export const perfilImc: CategoriaValor[] = [
    { id: 1, categoria: "NORMAL", valor: 42 },
    { id: 2, categoria: "SOBREPESO", valor: 15 },
    { id: 3, categoria: "OBESIDAD I", valor: 82 },
    { id: 4, categoria: "OBESIDAD II", valor: 41 },
    { id: 5, categoria: "OBESIDAD III", valor: 11 },
];

export const patologiasOsteomusculares: CategoriaValor[] = [
    { id: 1, categoria: "DOLOR ARTICULAR", valor: 42 },
    { id: 2, categoria: "LUMBALGIA", valor: 15 },
    { id: 3, categoria: "DORSALGIA", valor: 82 },
    { id: 4, categoria: "VARICES MIEMBROS INFERIORES", valor: 41 },
    { id: 5, categoria: "CONTRACTURA MUSCULAR", valor: 11 },
];

export const examenesLaboratorio: CategoriaValor[] = [
    { id: 1, categoria: "NORMALES", valor: 42 },
    { id: 2, categoria: "HIPERCOLESTEROLEMIA", valor: 15 },
    { id: 3, categoria: "HIPERTRIGLICERIDEMIA", valor: 82 },
    { id: 4, categoria: "DISLIPIDEMIA MIXTA", valor: 41 },
    { id: 5, categoria: "HIPERGLICEMIA", valor: 11 },
];

export const psaDistribucion: DistribucionItem[] = [
    {
        id: 1,
        label: "DENTRO DE LOS LÍMITES NORMALES",
        pct: 80,
        color: "#a2c0d4",
    },
    {
        id: 2,
        label: "FUERA DE LOS LÍMITES NORMALES",
        pct: 10,
        color: "#8993af",
    },
];

export const audiometriaItems: BarraHorizontalItem[] = [
    { id: 1, pct: 80, label: "AUDICIÓN NORMAL", color: "#0bbb8a" },
    { id: 2, pct: 24, label: "HIPOACUSIA CONDUCTIVA LEVE", color: "#38bdf8" },
    {
        id: 3,
        pct: 91,
        label: "HIPOACUSIA NEUROSENSORIAL LEVE",
        color: "#0064d2",
    },
    {
        id: 4,
        pct: 50,
        label: "HIPOACUSIA NEUROSENSORIAL MODERADA",
        color: "#6665dd",
    },
    { id: 5, pct: 72, label: "HIPOACUSIA MIXTA MODERADA", color: "#8e3dba" },
    { id: 6, pct: 72, label: "HIPOACUSIA MIXTA SEVERA", color: "#5b2d8e" },
    {
        id: 7,
        pct: 72,
        label: "HIPOACUSIA INDUCIDA POR EL RUIDO LEVE",
        color: "#fe7e6b",
    },
];

export const espirometriaItems: BarraHorizontalItem[] = [
    { id: 1, pct: 80, label: "NORMAL", color: "#0bbb8a" },
    { id: 2, pct: 24, label: "OBSTRUCCIÓN LEVE", color: "#38bdf8" },
    { id: 3, pct: 91, label: "OBSTRUCCIÓN MODERADA", color: "#0064d2" },
    { id: 4, pct: 50, label: "RESTRICCIÓN LEVE", color: "#6665dd" },
    { id: 5, pct: 72, label: "RESTRICCIÓN MODERADA", color: "#8e3dba" },
    { id: 6, pct: 72, label: "RESTRICCIÓN SEVERA", color: "#5b2d8e" },
];

export const agudezaVisual: DistribucionItem[] = [
    { id: 1, label: "EMÉTROPE", pct: 80, color: "#8993af" },
    { id: 2, label: "AMÉTROPE", pct: 20, color: "#d9c2f0" },
    { id: 3, label: "PRESBICIA", pct: 10, color: "#5b2d8e" },
];

export const otrasAfecciones: CategoriaValor[] = [
    { id: 1, categoria: "DISCROMATOPSIA", valor: 42 },
    { id: 2, categoria: "CICATRIZ CORNEAL CENTRAL", valor: 15 },
    { id: 3, categoria: "ESTEREOPSIS ANORMAL", valor: 82 },
    { id: 4, categoria: "PINGÜÉCULA", valor: 41 },
    { id: 5, categoria: "PTERIGIÓN", valor: 11 },
];

export const radiografiaTorax: DistribucionItem[] = [
    { id: 1, label: "NORMAL", pct: 80, color: "#fe7e6b" },
    { id: 2, label: "HALLAZGO", pct: 10, color: "#7c2d12" },
];

export const electrocardiograma: DistribucionItem[] = [
    { id: 1, label: "NORMAL", pct: 80, color: "#b388eb" },
    { id: 2, label: "HALLAZGO", pct: 10, color: "#5b2d8e" },
];

export const psicologiaDist: DistribucionItem[] = [
    { id: 1, label: "APTO", pct: 80, color: "#93c5fd" },
    { id: 2, label: "NO APTO", pct: 10, color: "#0064d2" },
];

export const alturaEstructural: DistribucionItem[] = [
    { id: 1, label: "APTO", pct: 80, color: "#0064d2" },
    { id: 2, label: "NO APTO", pct: 10, color: "#d9c2f0" },
];

export const odontologiaData: CategoriaValor[] = [
    { id: 1, categoria: "CON CARIES", valor: 42 },
    { id: 2, categoria: "SIN CARIES", valor: 15 },
    { id: 3, categoria: "GINGIVITIS", valor: 82 },
    { id: 4, categoria: "NECROSIS PULPAR", valor: 41 },
    { id: 5, categoria: "PULPITIS", valor: 11 },
];
