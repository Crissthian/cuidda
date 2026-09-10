import DataEstadisticaFilters from "@/components/data-estadistica/DataEstadisticaFilters";
import {
    agudezaVisual,
    alturaEstructural,
    audiometriaItems,
    electrocardiograma,
    espirometriaItems,
    examenesLaboratorio,
    odontologiaData,
    otrasAfecciones,
    patologiasOsteomusculares,
    perfilImc,
    poblacionAptitud,
    poblacionEdad,
    poblacionGenero,
    presionArterial,
    psaDistribucion,
    psicologiaDist,
    radiografiaTorax,
    type BarraHorizontalItem,
    type CategoriaValor,
    type DistribucionItem,
} from "@/lib/dataEstadisticaData";
import type { ReactNode } from "react";
import {
    Area,
    Bar,
    CartesianGrid,
    ComposedChart,
    LabelList,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

function SectionCard({
    id,
    title,
    icon,
    children,
    className = "",
    downloadLabel,
}: {
    id: string;
    title: string;
    icon: string;
    children: ReactNode;
    className?: string;
    downloadLabel?: string;
}) {
    return (
        <section
            aria-labelledby={id}
            className={`rounded-xl bg-surface-default p-5 shadow-sm shadow-border-default ${className}`}
        >
            <div className="flex items-center gap-2">
                <span
                    className="flex size-8 shrink-0 items-center justify-center rounded-md bg-success"
                    aria-hidden="true"
                >
                    <i
                        className={`fa-solid ${icon} text-sm text-white-custom`}
                    />
                </span>
                <h2
                    id={id}
                    className="flex-1 text-sm font-medium text-text-primary"
                >
                    {title}
                </h2>
                {downloadLabel && (
                    <button
                        type="button"
                        aria-label={downloadLabel}
                        className="flex size-7 shrink-0 items-center justify-center text-brand hover:text-primary-hover"
                    >
                        <i
                            className="fa-solid fa-download text-sm"
                            aria-hidden="true"
                        />
                    </button>
                )}
            </div>
            <div className="mt-4">{children}</div>
        </section>
    );
}

function SubChartHeader({ title, label }: { title: string; label: string }) {
    return (
        <div className="flex items-center gap-2">
            <h3 className="flex-1 text-center text-xs font-medium text-text-secondary">
                {title}
            </h3>
            <button
                type="button"
                aria-label={label}
                className="flex size-7 shrink-0 items-center justify-center text-brand hover:text-primary-hover"
            >
                <i
                    className="fa-solid fa-download text-sm"
                    aria-hidden="true"
                />
            </button>
        </div>
    );
}

function DistribucionBarras({
    title,
    items,
    downloadLabel,
}: {
    title: string;
    items: DistribucionItem[];
    downloadLabel: string;
}) {
    return (
        <div className="flex flex-1 flex-col rounded-lg bg-surface-default p-3 shadow shadow-border-default">
            <SubChartHeader title={title} label={downloadLabel} />
            <div className="mt-4 flex items-end justify-center gap-2">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="flex w-20 flex-col items-center"
                    >
                        <div
                            className="flex h-36 w-8 items-end overflow-hidden rounded bg-surface-light"
                            role="img"
                            aria-label={`${item.label} ${item.pct}%`}
                        >
                            <div
                                className="w-full rounded-b"
                                style={{
                                    height: `${item.pct}%`,
                                    backgroundColor: item.color,
                                }}
                            />
                        </div>
                        <span className="mt-2 text-lg font-bold leading-none text-text-primary">
                            {item.pct}%
                        </span>
                        <span className="mt-1 max-w-24 text-center text-[11px] font-medium uppercase leading-tight text-muted">
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function CategoriaChart({
    title,
    data,
    downloadLabel,
}: {
    title?: string;
    data: CategoriaValor[];
    downloadLabel?: string;
}) {
    return (
        <div className="flex flex-1 flex-col rounded-lg bg-surface-default shadow shadow-border-default p-3">
            {title && (
                <SubChartHeader title={title} label={downloadLabel ?? title} />
            )}
            <div className="mt-2 h-56 w-full ps-12">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                        data={[...data]}
                        margin={{ top: 16, right: 8, left: -12, bottom: 0 }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="#e7e9ef"
                        />
                        <XAxis
                            dataKey="categoria"
                            tick={{ fontSize: 9, fill: "#8993af" }}
                            axisLine={{ stroke: "#e7e9ef" }}
                            tickLine={false}
                            interval={0}
                            height={36}
                        />
                        <YAxis
                            domain={[0, 100]}
                            ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                            tick={{ fontSize: 9, fill: "#8993af" }}
                            axisLine={false}
                            tickLine={false}
                            width={28}
                        />
                        <Tooltip
                            cursor={{ fill: "#f1f5f8", opacity: 0.5 }}
                            contentStyle={{
                                fontSize: 11,
                                borderRadius: 8,
                                border: "1px solid #a2c0d4",
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="valor"
                            fill="#e6f0ff"
                            stroke="#bfdbfe"
                            strokeWidth={1}
                            fillOpacity={1}
                        />
                        <Bar
                            dataKey="valor"
                            fill="#0064d2"
                            barSize={30}
                            radius={[4, 4, 0, 0]}
                        >
                            <LabelList
                                dataKey="valor"
                                position="top"
                                style={{ fontSize: 9, fill: "#636d73" }}
                            />
                        </Bar>
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

function BarrasHorizontalesList({ items }: { items: BarraHorizontalItem[] }) {
    return (
        <div className="mt-4 flex flex-col gap-3">
            {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                    <span className="w-12 shrink-0 text-xs font-medium text-text-secondary">
                        {item.pct} %
                    </span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-light">
                        <div
                            className="h-full rounded-full"
                            style={{
                                width: `${item.pct}%`,
                                backgroundColor: item.color,
                            }}
                            role="progressbar"
                            aria-valuenow={item.pct}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label={`${item.label} ${item.pct}%`}
                        />
                    </div>
                    <span className="w-64 shrink-0 text-right text-[11px] font-medium uppercase leading-tight text-muted">
                        {item.label}
                    </span>
                </div>
            ))}
        </div>
    );
}

function MiniDistribucion({
    title,
    items,
    downloadLabel,
}: {
    title: string;
    items: DistribucionItem[];
    downloadLabel: string;
}) {
    return (
        <SectionCard
            id={title.toLowerCase().replace(/\s+/g, "-")}
            title={title}
            icon="fa-file-lines"
        >
            <div className="flex items-start justify-end">
                <button
                    type="button"
                    aria-label={downloadLabel}
                    className="flex size-6 items-center justify-center text-brand hover:text-primary-hover"
                >
                    <i
                        className="fa-solid fa-download text-xs"
                        aria-hidden="true"
                    />
                </button>
            </div>
            <div className="flex items-end justify-center gap-8">
                {items.map((item) => (
                    <div key={item.id} className="flex flex-col items-center">
                        <div
                            className="flex h-36 w-8 items-end overflow-hidden rounded bg-surface-light"
                            role="img"
                            aria-label={`${item.label} ${item.pct}%`}
                        >
                            <div
                                className="w-full"
                                style={{
                                    height: `${item.pct}%`,
                                    backgroundColor: item.color,
                                }}
                            />
                        </div>
                        <span className="mt-2 text-sm font-bold leading-none text-text-primary">
                            {item.pct}%
                        </span>
                        <span className="mt-1 max-w-24 text-center text-[10px] font-medium uppercase leading-tight text-muted">
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>
        </SectionCard>
    );
}

export default function DataEstadisticaContent() {
    return (
        <div className="flex flex-col gap-5 text-xs">
            <DataEstadisticaFilters />

            <div className="flex flex-col gap-5 pb-4">
                {/* ── Población evaluada ── */}
                <SectionCard
                    id="poblacion-evaluada"
                    title="Población evaluada"
                    icon="fa-users"
                >
                    <div className="grid grid-cols-3 gap-12">
                        <DistribucionBarras
                            title="Según género"
                            items={poblacionGenero}
                            downloadLabel="Descargar según género"
                        />
                        <DistribucionBarras
                            title="Según edad"
                            items={poblacionEdad}
                            downloadLabel="Descargar según edad"
                        />
                        <DistribucionBarras
                            title="Según aptitud médica"
                            items={poblacionAptitud}
                            downloadLabel="Descargar según aptitud médica"
                        />
                    </div>
                </SectionCard>

                {/* ── Medicina ── */}
                <SectionCard
                    id="medicina"
                    title="Medicina"
                    icon="fa-briefcase-medical"
                >
                    <div className="grid grid-cols-12 gap-12">
                        <div className="col-span-3">
                            <DistribucionBarras
                                title="Presión arterial"
                                items={presionArterial}
                                downloadLabel="Descargar presión arterial"
                            />
                        </div>
                        <div className="col-span-9">
                            <CategoriaChart
                                title="Perfil Nutricional (IMC)"
                                data={perfilImc}
                                downloadLabel="Descargar perfil nutricional"
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <CategoriaChart
                            title="Patologías osteo musculares"
                            data={patologiasOsteomusculares}
                            downloadLabel="Descargar patologías osteo musculares"
                        />
                    </div>
                </SectionCard>

                {/* ── Laboratorio ── */}
                <SectionCard
                    id="laboratorio"
                    title="Laboratorio"
                    icon="fa-flask-vial"
                >
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-9">
                            <CategoriaChart
                                title="Exámenes"
                                data={examenesLaboratorio}
                                downloadLabel="Descargar exámenes de laboratorio"
                            />
                        </div>
                        <div className="col-span-3">
                            <DistribucionBarras
                                title="PSA"
                                items={psaDistribucion}
                                downloadLabel="Descargar PSA"
                            />
                        </div>
                    </div>
                </SectionCard>

                {/* ── Audiometría / Espirometría ── */}
                <div className="grid grid-cols-2 gap-5">
                    <SectionCard
                        id="audiometria"
                        title="Audiometría"
                        icon="fa-ear-listen"
                    >
                        <div className="flex items-start justify-end">
                            <button
                                type="button"
                                aria-label="Descargar audiometría"
                                className="flex size-6 items-center justify-center text-brand hover:text-primary-hover"
                            >
                                <i
                                    className="fa-solid fa-download text-xs"
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                        <BarrasHorizontalesList items={audiometriaItems} />
                    </SectionCard>

                    <SectionCard
                        id="espirometria"
                        title="Espirometría"
                        icon="fa-lungs"
                    >
                        <div className="flex items-start justify-end">
                            <button
                                type="button"
                                aria-label="Descargar espirometría"
                                className="flex size-6 items-center justify-center text-brand hover:text-primary-hover"
                            >
                                <i
                                    className="fa-solid fa-download text-xs"
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                        <BarrasHorizontalesList items={espirometriaItems} />
                    </SectionCard>
                </div>

                {/* ── Oftalmología ── */}
                <SectionCard
                    id="oftalmologia"
                    title="Oftalmología"
                    icon="fa-eye"
                >
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-3">
                            <DistribucionBarras
                                title="Agudeza visual"
                                items={agudezaVisual}
                                downloadLabel="Descargar agudeza visual"
                            />
                        </div>
                        <div className="col-span-9">
                            <CategoriaChart
                                title="Otras afecciones"
                                data={otrasAfecciones}
                                downloadLabel="Descargar otras afecciones"
                            />
                        </div>
                    </div>
                </SectionCard>

                {/* ── Fila 4 mini cards ── */}
                <div className="grid grid-cols-4 gap-5">
                    <SectionCard
                        id="radiografia-torax"
                        title="Radiografía de tórax"
                        icon="fa-x-ray"
                        downloadLabel="Descargar radiografía de tórax"
                    >
                        <div className="flex items-end justify-center gap-8">
                            {radiografiaTorax.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex flex-col items-center"
                                >
                                    <div
                                        className="flex h-36 w-8 items-end overflow-hidden rounded bg-surface-light"
                                        role="img"
                                        aria-label={`${item.label} ${item.pct}%`}
                                    >
                                        <div
                                            className="w-full"
                                            style={{
                                                height: `${item.pct}%`,
                                                backgroundColor: item.color,
                                            }}
                                        />
                                    </div>
                                    <span className="mt-2 text-sm font-bold leading-none text-text-primary">
                                        {item.pct}%
                                    </span>
                                    <span className="mt-1 max-w-24 text-center text-[10px] font-medium uppercase leading-tight text-muted">
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </SectionCard>

                    <SectionCard
                        id="electrocardiograma"
                        title="Electrocardiograma"
                        icon="fa-heart-pulse"
                        downloadLabel="Descargar electrocardiograma"
                    >
                        <div className="flex items-end justify-center gap-8">
                            {electrocardiograma.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex flex-col items-center"
                                >
                                    <div
                                        className="flex h-36 w-8 items-end overflow-hidden rounded bg-surface-light"
                                        role="img"
                                        aria-label={`${item.label} ${item.pct}%`}
                                    >
                                        <div
                                            className="w-full"
                                            style={{
                                                height: `${item.pct}%`,
                                                backgroundColor: item.color,
                                            }}
                                        />
                                    </div>
                                    <span className="mt-2 text-sm font-bold leading-none text-text-primary">
                                        {item.pct}%
                                    </span>
                                    <span className="mt-1 max-w-24 text-center text-[10px] font-medium uppercase leading-tight text-muted">
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </SectionCard>

                    <SectionCard
                        id="psicologia"
                        title="Psicología"
                        icon="fa-brain"
                        downloadLabel="Descargar psicología"
                    >
                        <div className="flex items-end justify-center gap-8">
                            {psicologiaDist.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex flex-col items-center"
                                >
                                    <div
                                        className="flex h-36 w-8 items-end overflow-hidden rounded bg-surface-light"
                                        role="img"
                                        aria-label={`${item.label} ${item.pct}%`}
                                    >
                                        <div
                                            className="w-full"
                                            style={{
                                                height: `${item.pct}%`,
                                                backgroundColor: item.color,
                                            }}
                                        />
                                    </div>
                                    <span className="mt-2 text-sm font-bold leading-none text-text-primary">
                                        {item.pct}%
                                    </span>
                                    <span className="mt-1 max-w-24 text-center text-[10px] font-medium uppercase leading-tight text-muted">
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </SectionCard>

                    <SectionCard
                        id="altura-estructural"
                        title="Altura estructural"
                        icon="fa-helmet-safety"
                        downloadLabel="Descargar altura estructural"
                    >
                        <div className="flex items-end justify-center gap-8">
                            {alturaEstructural.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex flex-col items-center"
                                >
                                    <div
                                        className="flex h-36 w-8 items-end overflow-hidden rounded bg-surface-light"
                                        role="img"
                                        aria-label={`${item.label} ${item.pct}%`}
                                    >
                                        <div
                                            className="w-full"
                                            style={{
                                                height: `${item.pct}%`,
                                                backgroundColor: item.color,
                                            }}
                                        />
                                    </div>
                                    <span className="mt-2 text-sm font-bold leading-none text-text-primary">
                                        {item.pct}%
                                    </span>
                                    <span className="mt-1 max-w-24 text-center text-[10px] font-medium uppercase leading-tight text-muted">
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </SectionCard>
                </div>

                {/* ── Odontología ── */}
                <div className="w-8/12">
                    <SectionCard
                        id="odontologia"
                        title="Odontología"
                        icon="fa-tooth"
                        downloadLabel="Descargar odontología"
                    >
                        <CategoriaChart
                            title=""
                            data={odontologiaData}
                            downloadLabel="Descargar odontología"
                        />
                    </SectionCard>
                </div>

                {/* ── Uso interno para validación ── */}
                <span className="hidden">
                    <MiniDistribucion
                        title="reserva"
                        items={psaDistribucion}
                        downloadLabel="reserva"
                    />
                </span>
            </div>
        </div>
    );
}
