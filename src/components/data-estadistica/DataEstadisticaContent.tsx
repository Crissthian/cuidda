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
import { useRef, useState, type ReactNode } from "react";
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
import { toast } from "sonner";

function slugArchivo(texto: string) {
    const slug =
        texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "") || "grafico";
    return slug;
}

async function descargarNodoComoPng(
    nodo: HTMLElement | null,
    nombreBase: string,
) {
    if (!nodo) {
        toast.error("No se pudo encontrar el gráfico para descargar.");
        return;
    }
    const id = toast.loading("Generando imagen del gráfico...");
    const excluidos = Array.from(
        nodo.querySelectorAll<HTMLElement>("[data-excluir-descarga]"),
    );
    const estilosOriginales = excluidos.map((el) => el.style.display);
    excluidos.forEach((el) => {
        el.style.display = "none";
    });
    try {
        const { default: domToImage } = await import("dom-to-image-more");
        const { saveAs } = await import("file-saver");
        // Dar un frame para que recharts termine de pintar y se oculten los botones
        await new Promise((r) => setTimeout(r, 200));
        const blob: Blob | null = await domToImage.toBlob(nodo, {
            bgcolor: "#ffffff",
            cacheBust: true,
            width: nodo.offsetWidth,
            height: nodo.offsetHeight,
            style: {
                transform: "scale(1)",
                transformOrigin: "top left",
            },
        });
        if (!blob) throw new Error("No se pudo generar la imagen.");
        saveAs(blob, `${slugArchivo(nombreBase)}_${Date.now()}.png`);
        toast.success("Imagen del gráfico descargada.", { id });
    } catch (error) {
        console.error("Error al descargar gráfico:", error);
        toast.error("No se pudo generar la imagen del gráfico.", { id });
    } finally {
        excluidos.forEach((el, i) => {
            el.style.display = estilosOriginales[i];
        });
    }
}

function useDescargaGrafico(nombreBase: string) {
    const ref = useRef<HTMLDivElement | null>(null);
    const sectionRef = useRef<HTMLElement | null>(null);
    const [descargando, setDescargando] = useState(false);

    const descargarConNodo = async (nodo: HTMLElement | null) => {
        if (!nodo || descargando) return;
        setDescargando(true);
        try {
            await descargarNodoComoPng(nodo, nombreBase);
        } finally {
            setDescargando(false);
        }
    };

    const descargarDiv = () => descargarConNodo(ref.current);
    const descargarSeccion = () => descargarConNodo(sectionRef.current);

    return { ref, sectionRef, descargando, descargarDiv, descargarSeccion };
}

function IconoDescarga({
    descargando,
    className = "text-sm",
}: {
    descargando: boolean;
    className?: string;
}) {
    return (
        <i
            className={`fa-solid ${descargando ? "fa-spinner fa-spin" : "fa-download"} ${className}`}
            aria-hidden="true"
        />
    );
}

function BotonDescarga({
    label,
    onDescargar,
    descargando,
    sizeClass = "size-7",
    iconClass = "text-sm",
}: {
    label: string;
    onDescargar: () => void;
    descargando: boolean;
    sizeClass?: string;
    iconClass?: string;
}) {
    return (
        <button
            type="button"
            aria-label={label}
            title={label}
            onClick={onDescargar}
            disabled={descargando}
            data-excluir-descarga="true"
            className={`flex ${sizeClass} shrink-0 items-center justify-center text-brand transition-colors hover:text-primary-hover disabled:cursor-wait disabled:opacity-60`}
        >
            <IconoDescarga descargando={descargando} className={iconClass} />
        </button>
    );
}

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
    const { sectionRef, descargando, descargarSeccion } =
        useDescargaGrafico(title);
    return (
        <section
            ref={sectionRef}
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
                    <BotonDescarga
                        label={downloadLabel}
                        onDescargar={descargarSeccion}
                        descargando={descargando}
                    />
                )}
            </div>
            <div className="mt-4">{children}</div>
        </section>
    );
}

function SubChartHeader({
    title,
    label,
    onDescargar,
    descargando,
}: {
    title: string;
    label: string;
    onDescargar: () => void;
    descargando: boolean;
}) {
    return (
        <div className="flex items-center gap-2">
            <h3 className="flex-1 text-center text-xs font-medium text-text-secondary">
                {title}
            </h3>
            <BotonDescarga
                label={label}
                onDescargar={onDescargar}
                descargando={descargando}
            />
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
    const { ref, descargando, descargarDiv } = useDescargaGrafico(title);
    return (
        <div
            ref={ref}
            className="flex flex-1 flex-col rounded-lg bg-surface-default p-3 shadow shadow-border-default"
        >
            <SubChartHeader
                title={title}
                label={downloadLabel}
                onDescargar={descargarDiv}
                descargando={descargando}
            />
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
    const descarga = useDescargaGrafico(title || downloadLabel || "grafico");
    return (
        <div
            ref={descarga.ref}
            className="flex flex-1 flex-col rounded-lg bg-surface-default shadow shadow-border-default p-3"
        >
            {title && (
                <SubChartHeader
                    title={title}
                    label={downloadLabel ?? title}
                    onDescargar={descarga.descargarDiv}
                    descargando={descarga.descargando}
                />
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
            downloadLabel={downloadLabel}
        >
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
                        downloadLabel="Descargar audiometría"
                    >
                        <BarrasHorizontalesList items={audiometriaItems} />
                    </SectionCard>

                    <SectionCard
                        id="espirometria"
                        title="Espirometría"
                        icon="fa-lungs"
                        downloadLabel="Descargar espirometría"
                    >
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
