import EdicionManualModal from "@/components/vigilancia/EdicionManualModal";
import FirmarInformeModal from "@/components/vigilancia/FirmarInformeModal";
import type { InformeRegulatorio } from "@/lib/informesRegulatoriosData";
import { useState } from "react";

type Props = { informe: InformeRegulatorio };

type FilaEdad = {
    categoria: string;
    m1829: number;
    f1829: number;
    m3059: number;
    f3059: number;
    total: number;
};

const datosAdmin = [
    { label: "Razón social", value: "UNACEM PERU S.A." },
    { label: "RUC", value: "20512347781" },
    {
        label: "Actividad económica",
        value: "Fabricación de productos metálicos.",
    },
    { label: "Dirección", value: "Av. Ferrocarril 1420" },
    { label: "Provincia", value: "Huancayo" },
    { label: "Departamento", value: "Junín" },
    {
        label: "Médico responsable",
        value: "Dra. M. Salcedo Quiroz - CMP 48231",
    },
    { label: "Correo", value: "sst@andinaindustrial.com.pe" },
];

const poblacion = [
    { label: "N.º total de trabajadores", m: 0, f: 0, t: 0 },
    { label: "N.º total de evaluaciones", m: 0, f: 0, t: 0 },
];

const saludTodas: FilaEdad[] = [
    {
        categoria: "Enfermedades infecciosas y parasitarias",
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 0,
        total: 0,
    },
    {
        categoria: "Neoplasias",
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 0,
        total: 0,
    },
    {
        categoria: "Enfermedades de la sangre",
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 0,
        total: 0,
    },
    {
        categoria: "Enfermedades endocrinas, nutricionales y metabólicas",
        m1829: 0,
        f1829: 1,
        m3059: 0,
        f3059: 0,
        total: 1,
    },
    {
        categoria: "Trastornos mentales y del comportamiento",
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 0,
        total: 0,
    },
    {
        categoria: "Enfermedades del sistema nervioso",
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 0,
        total: 0,
    },
    {
        categoria: "Enfermedades del ojo y sus anexos",
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 0,
        total: 0,
    },
    {
        categoria: "Enfermedades del oído",
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 1,
        total: 1,
    },
    {
        categoria: "Enfermedades del sistema circulatorio",
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 1,
        total: 1,
    },
    {
        categoria: "Enfermedades del sistema respiratorio",
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 0,
        total: 0,
    },
    {
        categoria: "Enfermedades del sistema digestivo",
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 0,
        total: 0,
    },
    {
        categoria: "Enfermedades de la piel",
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 0,
        total: 0,
    },
    {
        categoria: "Enfermedades osteomusculares",
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 0,
        total: 0,
    },
    {
        categoria: "Enfermedades genitourinarias",
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 0,
        total: 0,
    },
    {
        categoria: "Traumatismos",
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 0,
        total: 0,
    },
    {
        categoria: "Enfermedades odontológicas",
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 0,
        total: 0,
    },
    { categoria: "Otras", m1829: 0, f1829: 0, m3059: 0, f3059: 0, total: 0 },
];

const trabajoTodas: FilaEdad[] = [
    {
        categoria: "Asma profesional",
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 0,
        total: 0,
    },
    {
        categoria: "Enfermedades por agentes químicos",
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 0,
        total: 0,
    },
    {
        categoria: "Silicosis",
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 0,
        total: 0,
    },
    {
        categoria: "Asbestosis",
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 0,
        total: 0,
    },
    {
        categoria: "Neumoconiosis",
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 0,
        total: 0,
    },
    {
        categoria: "Hipoacusia provocada por el ruido",
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 1,
        total: 1,
    },
    {
        categoria: "Enfermedades por vibraciones",
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 0,
        total: 0,
    },
    {
        categoria: "Enfermedades por movimientos repetitivos",
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 0,
        total: 0,
    },
    {
        categoria: "Exposición a radiaciones",
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 0,
        total: 0,
    },
    { categoria: "Estrés", m1829: 0, f1829: 0, m3059: 0, f3059: 0, total: 0 },
    {
        categoria: "Depresión",
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 0,
        total: 0,
    },
    {
        categoria: "Hipertensión",
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 0,
        total: 0,
    },
    {
        categoria: "Dorsalgia",
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 0,
        total: 0,
    },
    {
        categoria: "Cervicalgia",
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 0,
        total: 0,
    },
    { categoria: "Ciática", m1829: 0, f1829: 0, m3059: 0, f3059: 0, total: 0 },
    {
        categoria: "Lumbalgia",
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 0,
        total: 0,
    },
    {
        categoria: "Enfermedades odontológicas",
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 0,
        total: 0,
    },
    {
        categoria: "Gastritis",
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 0,
        total: 0,
    },
    {
        categoria: "Dermatitis",
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 0,
        total: 0,
    },
    { categoria: "Otros", m1829: 0, f1829: 0, m3059: 0, f3059: 0, total: 0 },
];

type FilaProfesional = {
    grupo: string;
    agente: string;
    expuestos: number | null;
    m1829: number;
    f1829: number;
    m3059: number;
    f3059: number;
    total: number;
};

const profesionales: FilaProfesional[] = [
    {
        grupo: "Grupo 1 · Agentes químicos",
        agente: "Plomo",
        expuestos: null,
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 0,
        total: 0,
    },
    {
        grupo: "Grupo 1 · Agentes químicos",
        agente: "Arsénico",
        expuestos: null,
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 0,
        total: 0,
    },
    {
        grupo: "Grupo 1 · Agentes químicos",
        agente: "Cromo",
        expuestos: null,
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 0,
        total: 0,
    },
    {
        grupo: "Grupo 1 · Agentes químicos",
        agente: "Mercurio",
        expuestos: null,
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 0,
        total: 0,
    },
    {
        grupo: "Grupo 1 · Agentes químicos",
        agente: "Níquel",
        expuestos: null,
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 0,
        total: 0,
    },
    {
        grupo: "Grupo 1 · Agentes químicos",
        agente: "Humos metálicos",
        expuestos: 0,
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 0,
        total: 0,
    },
    {
        grupo: "Grupo 2 · Agentes físicos",
        agente: "Ruido",
        expuestos: 1,
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 1,
        total: 1,
    },
    {
        grupo: "Grupo 2 · Agentes físicos",
        agente: "Vibraciones",
        expuestos: 0,
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 0,
        total: 0,
    },
    {
        grupo: "Grupo 2 · Agentes físicos",
        agente: "Radiaciones",
        expuestos: null,
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 0,
        total: 0,
    },
    {
        grupo: "Grupo 3 · Agentes biológicos",
        agente: "Agentes biológicos",
        expuestos: 0,
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 0,
        total: 0,
    },
    {
        grupo: "Grupo 4 · Inhalación de sustancias y agentes",
        agente: "Sílice / polvo respirable",
        expuestos: 0,
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 0,
        total: 0,
    },
    {
        grupo: "Grupo 4 · Inhalación de sustancias y agentes",
        agente: "Amianto",
        expuestos: null,
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 0,
        total: 0,
    },
    {
        grupo: "Grupo 4 · Inhalación de sustancias y agentes",
        agente: "Polvo de carbón",
        expuestos: null,
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 0,
        total: 0,
    },
    {
        grupo: "Grupo 5 · Enfermedades de la piel",
        agente: "Agentes irritantes de la piel",
        expuestos: 1,
        m1829: 0,
        f1829: 0,
        m3059: 1,
        f3059: 0,
        total: 1,
    },
    {
        grupo: "Grupo 6 · Agentes carcinógenos",
        agente: "Agentes carcinógenos",
        expuestos: null,
        m1829: 0,
        f1829: 0,
        m3059: 0,
        f3059: 0,
        total: 0,
    },
];

const conclusionesIniciales = [
    "Cobertura y cumplimiento de vigilancia: durante el periodo 2026 se registró una población laboral de 2 trabajadores (0 masculino / 2 femenino), de los cuales 2 contaron con evaluación médica ocupacional, equivalente al 100 % de cobertura.",
    "Principales hallazgos de salud: la categoría con mayor número de casos fue “Enfermedades del oído” con 1 caso(s). La aptitud médica ocupacional se distribuyó en 1 apto(s), 1 apto(s) con restricciones y 0 no apto(s).",
    "Enfermedades relacionadas al trabajo: se identificaron 1 caso(s) con clasificación previamente validada por el médico ocupacional. No se atribuye causalidad laboral a diagnósticos sin dicha validación.",
    "Enfermedades profesionales: se registraron 1 caso(s) asociados a agentes de exposición con población expuesta identificada. Los agentes sin población validada figuran como información pendiente de validación.",
    "Programas de vigilancia: se ejecutaron 7 programas de salud, 4 presentan un avance igual o mayor al 70 %. La población clasificada corresponde a 0 en G1, 1 en G2 y 1 en G3.",
];

const recomendacionesIniciales = [
    "Continuar las evaluaciones médicas ocupacionales según el protocolo vigente por puesto de trabajo.",
    "Mantener el seguimiento clínico de la población de riesgo (1 trabajadores G2 y 1 G3), con reevaluación según periodicidad establecida.",
    "Fortalecer el programa de conservación auditiva y verificar la eficacia de la protección auditiva en los GES con exposición a ruido.",
    "Reforzar la intervención cardiometabólica y nutricional en la población con dislipidemia, obesidad e hipertensión.",
    "Desarrollar capacitación anual en salud ocupacional dirigida a la población evaluada y a los responsables de línea.",
];

function ToggleVista({
    expandido,
    onToggle,
    etiqueta,
}: {
    expandido: boolean;
    onToggle: () => void;
    etiqueta: string;
}) {
    return (
        <button
            type="button"
            onClick={onToggle}
            aria-expanded={expandido}
            aria-label={etiqueta}
            className="flex shrink-0 items-center gap-1.5 text-[11px] font-bold tracking-wide text-muted transition-colors hover:text-brand"
        >
            {expandido ? "VER SOLO CASOS" : "VER TODAS LAS CATEGORÍAS"}
            <i
                className="fa-solid fa-up-right-and-down-left-from-center text-[9px]"
                aria-hidden="true"
            />
        </button>
    );
}

function TablaEdad({ filas }: { filas: FilaEdad[] }) {
    return (
        <div className="overflow-x-auto">
            <div
                className="min-w-180 text-xs"
                role="table"
                aria-label="Distribución por edad y sexo"
            >
                <div
                    className="grid grid-cols-[2.2fr_repeat(4,0.5fr)_0.5fr] gap-0 rounded-lg bg-surface-light px-4 py-2.5 text-[10px] font-medium uppercase tracking-wider text-text-secondary"
                    role="row"
                >
                    <span role="columnheader">Categoría</span>
                    <span role="columnheader" className="text-center">
                        18-29 M
                    </span>
                    <span role="columnheader" className="text-center">
                        18-29 F
                    </span>
                    <span role="columnheader" className="text-center">
                        30-59 M
                    </span>
                    <span role="columnheader" className="text-center">
                        30-59 F
                    </span>
                    <span role="columnheader" className="text-center">
                        Total
                    </span>
                </div>
                <div className="divide-y divide-dashed divide-border-subtle">
                    {filas.map((f) => (
                        <div
                            key={f.categoria}
                            role="row"
                            className="grid grid-cols-[2.2fr_repeat(4,0.5fr)_0.5fr] items-center gap-0 px-4 py-2.5 transition-colors hover:bg-surface-light/50"
                        >
                            <span
                                role="cell"
                                className="pr-2 text-xs text-text-primary"
                            >
                                {f.categoria}
                            </span>
                            <span
                                role="cell"
                                className="text-center text-xs text-muted"
                            >
                                {f.m1829}
                            </span>
                            <span
                                role="cell"
                                className="text-center text-xs text-muted"
                            >
                                {f.f1829}
                            </span>
                            <span
                                role="cell"
                                className="text-center text-xs text-muted"
                            >
                                {f.m3059}
                            </span>
                            <span
                                role="cell"
                                className="text-center text-xs text-muted"
                            >
                                {f.f3059}
                            </span>
                            <span
                                role="cell"
                                className="text-center text-xs font-bold text-brand"
                            >
                                {f.total}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function InformeRegulatorioDetalleContent({ informe }: Props) {
    const [saludExpandida, setSaludExpandida] = useState(false);
    const [trabajoExpandida, setTrabajoExpandida] = useState(false);
    const [firmaAbierta, setFirmaAbierta] = useState(false);
    const [edicionAbierta, setEdicionAbierta] = useState(false);
    const [conclusiones, setConclusiones] = useState(conclusionesIniciales);
    const [recomendaciones, setRecomendaciones] = useState(
        recomendacionesIniciales,
    );

    const eliminarConclusion = (index: number) => {
        setConclusiones((prev) => prev.filter((_, i) => i !== index));
    };

    const agregarConclusion = () => {
        setConclusiones((prev) => [...prev, ""]);
    };

    const actualizarConclusion = (index: number, valor: string) => {
        setConclusiones((prev) =>
            prev.map((c, i) => (i === index ? valor : c)),
        );
    };

    const eliminarRecomendacion = (index: number) => {
        setRecomendaciones((prev) => prev.filter((_, i) => i !== index));
    };

    const agregarRecomendacion = () => {
        setRecomendaciones((prev) => [...prev, ""]);
    };

    const actualizarRecomendacion = (index: number, valor: string) => {
        setRecomendaciones((prev) =>
            prev.map((r, i) => (i === index ? valor : r)),
        );
    };

    const filasSalud = saludExpandida
        ? saludTodas
        : saludTodas.filter((f) => f.total > 0);
    const filasTrabajo = trabajoExpandida
        ? trabajoTodas
        : trabajoTodas.filter((f) => f.total > 0);

    return (
        <div className="flex flex-col gap-5 px-10 pb-6 text-xs">
            {/* ── Línea de trazabilidad ── */}
            <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex min-w-20 items-center justify-center rounded-full bg-[#e6f0ff] px-4 py-1 text-[11px] font-semibold tracking-wide text-brand">
                    {informe.insignia}
                </span>
                <p className="text-sm text-muted">
                    {informe.generado} · {informe.medicoDetalle}
                </p>
            </div>

            {/* ── Alerta de consistencia ── */}
            <section
                aria-label="Observaciones de consistencia"
                className="flex items-stretch overflow-hidden rounded-xl bg-surface-default shadow-sm shadow-border-default"
            >
                <span
                    className="w-2 shrink-0 bg-risk-red"
                    aria-hidden="true"
                ></span>
                <div className="flex flex-1 items-start gap-4 px-6 py-5">
                    <i
                        className="fa-solid fa-triangle-exclamation text-3xl text-risk-salmon"
                        aria-hidden="true"
                    ></i>
                    <div className="flex flex-col gap-1">
                        <p className="text-sm leading-relaxed text-text-primary">
                            {informe.observaciones} observación(es) de
                            consistencia deben resolverse o justificarse antes
                            de la firma.
                        </p>
                        <a
                            href="#auditoria"
                            className="w-fit text-sm text-brand underline underline-offset-2 hover:text-primary-hover"
                        >
                            Ver auditoría
                        </a>
                    </div>
                </div>
            </section>

            {/* ── Acciones ── */}
            <div className="flex items-center justify-end gap-4">
                <button
                    type="button"
                    disabled
                    aria-label="Validar informe"
                    className="flex items-center gap-2 rounded-lg bg-muted-20 disabled:bg-muted/10 disabled:text-muted/50 px-4 py-2.5 text-xs font-semibold tracking-wide text-muted transition-colors"
                >
                    <i
                        className="fa-regular fa-circle-check text-sm"
                        aria-hidden="true"
                    ></i>
                    VALIDAR
                </button>
                <button
                    type="button"
                    aria-label="Firmar informe"
                    onClick={() => setFirmaAbierta(true)}
                    className="flex items-center gap-2 rounded-lg bg-muted-20 px-4 py-2.5 text-xs font-semibold tracking-wide text-muted transition-colors hover:text-brand"
                >
                    <i
                        className="fa-solid fa-file-signature text-sm"
                        aria-hidden="true"
                    ></i>
                    FIRMAR
                </button>
            </div>

            {/* ── Epidemiología laboral ── */}
            <section
                aria-labelledby="epidemio-title"
                className="rounded-xl bg-surface-default p-5 shadow-sm shadow-border-default"
            >
                <h2
                    id="epidemio-title"
                    className="text-xs font-bold uppercase tracking-wide text-text-primary"
                >
                    Epidemiología laboral
                </h2>
                <p className="mt-0.5 text-xs text-muted">
                    Datos administrativos y población del periodo.
                </p>

                <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
                    {datosAdmin.map((d) => (
                        <div key={d.label} className="flex flex-col gap-0.5">
                            <span className="text-[10px] font-medium uppercase tracking-wide text-muted">
                                {d.label}
                            </span>
                            <span className="text-xs font-semibold leading-snug text-text-primary">
                                {d.value}
                            </span>
                        </div>
                    ))}
                </div>

                <h3 className="mt-5 border-t border-dashed border-border-subtle pt-4 text-[11px] font-bold uppercase tracking-wide text-text-primary">
                    Población laboral
                </h3>
                <div className="mt-2 overflow-x-auto">
                    <div
                        className="max-w-260 text-xs"
                        role="table"
                        aria-label="Población laboral"
                    >
                        <div
                            className="grid grid-cols-[2.2fr_repeat(3,0.6fr)] gap-0 rounded-lg bg-surface-light px-4 py-2.5 text-[10px] font-medium uppercase tracking-wider text-text-secondary"
                            role="row"
                        >
                            <span role="columnheader">
                                <span className="sr-only">Indicador</span>
                            </span>
                            <span role="columnheader" className="text-center">
                                Masculino
                            </span>
                            <span role="columnheader" className="text-center">
                                Femenino
                            </span>
                            <span role="columnheader" className="text-center">
                                Total
                            </span>
                        </div>
                        <div className="divide-y divide-dashed divide-border-subtle">
                            {poblacion.map((p) => (
                                <div
                                    key={p.label}
                                    role="row"
                                    className="grid grid-cols-[2.2fr_repeat(3,0.6fr)] items-center gap-0 px-4 py-2.5"
                                >
                                    <span
                                        role="cell"
                                        className="pr-2 text-xs text-text-primary"
                                    >
                                        {p.label}
                                    </span>
                                    <span
                                        role="cell"
                                        className="text-center text-xs text-muted"
                                    >
                                        {p.m}
                                    </span>
                                    <span
                                        role="cell"
                                        className="text-center text-xs text-muted"
                                    >
                                        {p.f}
                                    </span>
                                    <span
                                        role="cell"
                                        className="text-center text-xs font-bold text-brand"
                                    >
                                        {p.t}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Enfermedades y problemas relacionados a la salud ── */}
            <section
                aria-labelledby="salud-title"
                className="rounded-xl bg-surface-default p-5 shadow-sm shadow-border-default"
            >
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2
                            id="salud-title"
                            className="text-xs font-bold uppercase tracking-wide text-text-primary"
                        >
                            Enfermedades y problemas relacionados a la salud
                        </h2>
                        <p className="mt-0.5 text-xs text-muted">
                            Distribución epidemiológica calculada desde fecha de
                            nacimiento, sexo, diagnóstico y fecha de EMO.
                        </p>
                    </div>
                    <ToggleVista
                        expandido={saludExpandida}
                        onToggle={() => setSaludExpandida((v) => !v)}
                        etiqueta={
                            saludExpandida
                                ? "Ver solo casos de salud"
                                : "Ver todas las categorías de salud"
                        }
                    />
                </div>
                <div className="mt-4">
                    <TablaEdad filas={filasSalud} />
                </div>
            </section>

            {/* ── Enfermedades relacionadas al trabajo ── */}
            <section
                aria-labelledby="trabajo-title"
                className="rounded-xl bg-surface-default p-5 shadow-sm shadow-border-default"
            >
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2
                            id="trabajo-title"
                            className="text-xs font-bold uppercase tracking-wide text-text-primary"
                        >
                            Enfermedades relacionadas al trabajo
                        </h2>
                        <p className="mt-0.5 text-xs text-muted">
                            Solo se incluyen diagnósticos con clasificación
                            previamente validada por el médico ocupacional.
                        </p>
                    </div>
                    <ToggleVista
                        expandido={trabajoExpandida}
                        onToggle={() => setTrabajoExpandida((v) => !v)}
                        etiqueta={
                            trabajoExpandida
                                ? "Ver solo casos de trabajo"
                                : "Ver todas las categorías de trabajo"
                        }
                    />
                </div>
                <div className="mt-4">
                    <TablaEdad filas={filasTrabajo} />
                </div>
            </section>

            {/* ── Enfermedades profesionales detectadas ── */}
            <section
                aria-labelledby="prof-title"
                className="rounded-xl bg-surface-default p-5 shadow-sm shadow-border-default"
            >
                <h2
                    id="prof-title"
                    className="text-xs font-bold uppercase tracking-wide text-text-primary"
                >
                    Enfermedades profesionales detectadas
                </h2>
                <p className="mt-0.5 text-xs text-muted">
                    Agrupadas por grupo de agente de exposición. La población
                    expuesta proviene del GES / matriz de riesgos.
                </p>
                <div className="mt-4 overflow-x-auto">
                    <div
                        className="min-w-220 text-xs"
                        role="table"
                        aria-label="Enfermedades profesionales por agente"
                    >
                        <div
                            className="grid grid-cols-[1.5fr_1.2fr_1.3fr_repeat(4,0.45fr)_0.5fr] gap-0 rounded-lg bg-surface-light px-4 py-2.5 text-[10px] font-medium uppercase tracking-wider text-text-secondary"
                            role="row"
                        >
                            <span role="columnheader">Grupo</span>
                            <span role="columnheader">Agente</span>
                            <span role="columnheader" className="text-center">
                                Expuestos
                            </span>
                            <span role="columnheader" className="text-center">
                                18-29 M
                            </span>
                            <span role="columnheader" className="text-center">
                                18-29 F
                            </span>
                            <span role="columnheader" className="text-center">
                                30-59 M
                            </span>
                            <span role="columnheader" className="text-center">
                                30-59 F
                            </span>
                            <span role="columnheader" className="text-center">
                                Total
                            </span>
                        </div>
                        <div className="divide-y divide-dashed divide-border-subtle">
                            {profesionales.map((f) => (
                                <div
                                    key={`${f.grupo}-${f.agente}`}
                                    role="row"
                                    className="grid grid-cols-[1.5fr_1.2fr_1.3fr_repeat(4,0.45fr)_0.5fr] items-center gap-0 px-4 py-2.5 transition-colors hover:bg-surface-light/50"
                                >
                                    <span
                                        role="cell"
                                        className="pr-2 text-xs text-text-secondary"
                                    >
                                        {f.grupo}
                                    </span>
                                    <span
                                        role="cell"
                                        className="pr-2 text-xs text-text-primary"
                                    >
                                        {f.agente}
                                    </span>
                                    <span
                                        role="cell"
                                        className="pr-2 text-center text-[11px] text-text-secondary"
                                    >
                                        {f.expuestos === null ? (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setEdicionAbierta(true)
                                                }
                                                aria-label={`Editar manualmente expuestos de ${f.agente}`}
                                                className="text-risk-salmon transition-colors hover:text-risk-salmon/80 hover:underline"
                                            >
                                                Información pendiente de
                                                validación
                                            </button>
                                        ) : (
                                            f.expuestos
                                        )}
                                    </span>
                                    <span
                                        role="cell"
                                        className="text-center text-xs text-muted"
                                    >
                                        {f.m1829}
                                    </span>
                                    <span
                                        role="cell"
                                        className="text-center text-xs text-muted"
                                    >
                                        {f.f1829}
                                    </span>
                                    <span
                                        role="cell"
                                        className="text-center text-xs text-muted"
                                    >
                                        {f.m3059}
                                    </span>
                                    <span
                                        role="cell"
                                        className="text-center text-xs text-muted"
                                    >
                                        {f.f3059}
                                    </span>
                                    <span
                                        role="cell"
                                        className="text-center text-xs font-bold text-brand"
                                    >
                                        {f.total}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Conclusiones y recomendaciones ── */}
            <section
                aria-labelledby="concl-title"
                className="rounded-xl bg-surface-default p-5 shadow-sm shadow-border-default"
            >
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2
                            id="concl-title"
                            className="text-xs font-bold uppercase tracking-wide text-text-primary"
                        >
                            Conclusiones y recomendaciones
                        </h2>
                        <p className="mt-0.5 text-xs text-muted">
                            Textos redactados automáticamente con cifras
                            provenientes de la base de datos. Editables por el
                            médico.
                        </p>
                    </div>
                    <button
                        type="button"
                        aria-label="Regenerar conclusiones con IA"
                        className="flex shrink-0 items-center gap-1.5 rounded-lg bg-linear-to-r from-[#1EE67D] to-[#0064D2] p-3 text-xs font-bold text-white transition-opacity hover:opacity-90"
                    >
                        <i
                            className="fa-solid fa-robot text-[11px]"
                            aria-hidden="true"
                        />
                        REGENERAR CON IA
                    </button>
                </div>

                <div className="mt-4 flex items-center gap-2">
                    <h3 className="text-[11px] font-bold uppercase tracking-wide text-brand">
                        Conclusiones
                    </h3>
                    <span className="rounded-full bg-[#32A9FD]/20 px-2 py-1 text-[9px] font-bold tracking-wide text-[#0496FF]">
                        SUGERENCIA PARA VALIDACIÓN MÉDICA
                    </span>
                </div>
                <div className="mt-2 flex flex-col gap-2">
                    {conclusiones.map((c, i) => (
                        <div
                            key={`conclusion-${i}`}
                            className="flex items-start gap-3 rounded-lg bg-surface-light px-3 py-2.5"
                        >
                            <span
                                className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-brand"
                                aria-hidden="true"
                            >
                                {i + 1}
                            </span>
                            <textarea
                                value={c}
                                onChange={(e) =>
                                    actualizarConclusion(i, e.target.value)
                                }
                                placeholder="Escriba la conclusión..."
                                rows={1}
                                aria-label={`Conclusión ${i + 1}`}
                                className="flex-1 resize-none bg-transparent text-xs leading-relaxed text-text-secondary outline-none placeholder:text-muted/60 focus:text-text-primary"
                            />
                            <button
                                type="button"
                                onClick={() => eliminarConclusion(i)}
                                aria-label={`Eliminar conclusión ${i + 1}`}
                                className="shrink-0 text-muted transition-colors hover:text-brand"
                            >
                                <i
                                    className="fa-regular fa-trash-can text-xs"
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={agregarConclusion}
                        aria-label="Agregar conclusión"
                        className="flex w-fit items-center gap-1.5 rounded-lg bg-muted-20 px-3 py-2 text-[11px] text-muted transition-colors hover:bg-muted-30"
                    >
                        <i
                            className="fa-solid fa-plus text-[10px]"
                            aria-hidden="true"
                        />
                        AGREGAR
                    </button>
                </div>

                <div className="mt-5 flex items-center gap-2">
                    <h3 className="text-[11px] font-bold uppercase tracking-wide text-text-primary">
                        Recomendaciones
                    </h3>
                    <span className="rounded-full bg-[#32A9FD]/20 px-2 py-1 text-[9px] font-bold tracking-wide text-[#0496FF]">
                        SUGERENCIA PARA VALIDACIÓN MÉDICA
                    </span>
                </div>
                <div className="mt-2 flex flex-col gap-2">
                    {recomendaciones.map((r, i) => (
                        <div
                            key={`recomendacion-${i}`}
                            className="flex items-start gap-3 rounded-lg bg-surface-light px-3 py-2.5"
                        >
                            <span
                                className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-brand"
                                aria-hidden="true"
                            >
                                {i + 1}
                            </span>
                            <textarea
                                value={r}
                                onChange={(e) =>
                                    actualizarRecomendacion(i, e.target.value)
                                }
                                placeholder="Escriba la recomendación..."
                                rows={1}
                                aria-label={`Recomendación ${i + 1}`}
                                className="flex-1 resize-none bg-transparent text-xs leading-relaxed text-text-secondary outline-none placeholder:text-muted/60 focus:text-text-primary"
                            />
                            <button
                                type="button"
                                onClick={() => eliminarRecomendacion(i)}
                                aria-label={`Eliminar recomendación ${i + 1}`}
                                className="shrink-0 text-muted transition-colors hover:text-brand"
                            >
                                <i
                                    className="fa-regular fa-trash-can text-xs"
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={agregarRecomendacion}
                        aria-label="Agregar recomendación"
                        className="flex w-fit items-center gap-1.5 rounded-lg bg-muted-20 px-3 py-2 text-[11px] text-muted transition-colors hover:bg-muted-30"
                    >
                        <i
                            className="fa-solid fa-plus text-[10px]"
                            aria-hidden="true"
                        />
                        AGREGAR
                    </button>
                </div>
            </section>

            {/* ── Empresas + Historial ── */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <section
                    aria-labelledby="empresas-title"
                    className="rounded-xl bg-surface-default p-5 shadow-sm shadow-border-default"
                >
                    <h2
                        id="empresas-title"
                        className="text-xs font-bold uppercase tracking-wide text-text-primary"
                    >
                        Empresas
                    </h2>
                    <p className="mt-0.5 text-xs text-muted">
                        Firma del médico responsable y del representante
                        autorizado de la empresa.
                    </p>
                    <p className="mt-4 text-xs text-muted">
                        Sin firmas registradas.
                    </p>
                </section>

                <section
                    aria-labelledby="historial-title"
                    className="rounded-xl bg-surface-default p-5 shadow-sm shadow-border-default"
                >
                    <h2
                        id="historial-title"
                        className="text-xs font-bold uppercase tracking-wide text-text-primary"
                    >
                        Historial y trazabilidad
                    </h2>
                    <p className="mt-0.5 text-xs text-muted">
                        Versiones, cambios de estado y ediciones manuales.
                    </p>
                    <ul className="mt-4 flex flex-col gap-2">
                        <li className="text-xs leading-relaxed text-text-secondary">
                            <span className="font-semibold text-text-primary">
                                V1 Borrador
                            </span>
                            {
                                " • 9/7/2026, 14:32:01 • Consolidación automática inicial"
                            }
                        </li>
                        <li className="text-xs leading-relaxed text-text-secondary">
                            <span className="font-semibold text-text-primary">
                                V1 Validado
                            </span>
                            {
                                " • 9/9/2026, 7:05:52 pm • Informe validado por el médico ocupacional"
                            }
                        </li>
                    </ul>
                </section>
            </div>

            <FirmarInformeModal
                isOpen={firmaAbierta}
                onClose={() => setFirmaAbierta(false)}
            />
            <EdicionManualModal
                isOpen={edicionAbierta}
                onClose={() => setEdicionAbierta(false)}
            />
        </div>
    );
}
