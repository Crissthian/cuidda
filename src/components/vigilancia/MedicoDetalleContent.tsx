import { documentosFirmables, type Medico } from "@/lib/medicosData";
import { useState } from "react";

function Campo({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col gap-1">
            <span className="text-[11px] font-medium uppercase tracking-wide text-text-secondary">
                {label}
            </span>
            <span className="text-sm font-bold leading-snug text-text-primary">
                {value}
            </span>
        </div>
    );
}

function Interruptor({
    label,
    activo,
    onToggle,
}: {
    label: string;
    activo: boolean;
    onToggle: () => void;
}) {
    return (
        <div className="flex items-center justify-between gap-4 px-4 py-4">
            <span className="text-xs text-text-primary">{label}</span>
            <button
                type="button"
                role="switch"
                aria-checked={activo}
                aria-label={`Autorizar firma de ${label}`}
                onClick={onToggle}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                    activo ? "bg-brand" : "bg-muted-30"
                }`}
            >
                <span
                    aria-hidden="true"
                    className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition-all ${
                        activo ? "left-5.5" : "left-0.5"
                    }`}
                />
            </button>
        </div>
    );
}

export default function MedicoDetalleContent({ medico }: { medico: Medico }) {
    const [autorizados, setAutorizados] = useState<Record<string, boolean>>({});
    const vigente = medico.certificado === "VIGENTE";

    const toggle = (doc: string) =>
        setAutorizados((prev) => ({ ...prev, [doc]: !prev[doc] }));

    return (
        <div className="grid grid-cols-1 items-start gap-5 px-10 pb-6 lg:grid-cols-2">
            {/* Columna izquierda */}
            <div className="flex flex-col gap-5">
                <section
                    aria-labelledby="info-general-title"
                    className="rounded-xl bg-surface-default p-6 shadow-sm shadow-border-default"
                >
                    <h2
                        id="info-general-title"
                        className="text-sm font-medium uppercase tracking-wide text-text-primary"
                    >
                        Información general
                    </h2>
                    <p className="mt-1 text-sm text-accent-muted">Del médico</p>

                    <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                        <Campo
                            label="Nombres y apellidos"
                            value={medico.medico}
                        />
                        <Campo
                            label="Especialidad"
                            value={medico.especialidad}
                        />
                        <Campo label="DNI" value={medico.dni} />
                        <Campo label="CMP" value={medico.cmp} />
                        <Campo label="Correo" value={medico.correo} />
                        <Campo label="Sede principal" value={medico.sede} />
                    </div>
                </section>

                <section
                    aria-labelledby="docs-title"
                    className="rounded-xl bg-surface-default p-6 shadow-sm shadow-border-default"
                >
                    <h2
                        id="docs-title"
                        className="text-sm font-medium uppercase tracking-wide text-text-primary"
                    >
                        Documentos que puede firmar
                    </h2>
                    <div className="mt-2 divide-y divide-dashed divide-border-subtle">
                        {documentosFirmables.map((doc) => (
                            <Interruptor
                                key={doc}
                                label={doc}
                                activo={!!autorizados[doc]}
                                onToggle={() => toggle(doc)}
                            />
                        ))}
                    </div>
                </section>
            </div>

            {/* Columna derecha */}
            <section
                aria-labelledby="cert-title"
                className="flex flex-col rounded-xl bg-surface-default p-6 shadow-sm shadow-border-default"
            >
                <h2 id="cert-title" className="sr-only">
                    Certificado digital
                </h2>

                <div className="rounded-xl bg-surface-light p-5">
                    <p className="text-xs font-medium uppercase tracking-wide text-text-primary">
                        Estado del certificado
                    </p>
                    <p
                        className={`mt-2 flex items-center gap-2 text-base font-bold tracking-wide ${
                            vigente ? "text-success" : "text-risk-salmon"
                        }`}
                    >
                        <i
                            className={`${vigente ? " fa-regular fa-circle-check" : "fa-solid fa-triangle-exclamation"} text-xl`}
                            aria-hidden="true"
                        />
                        {medico.certificado}
                    </p>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                    <Campo label="Titular" value={medico.medico} />
                    <Campo label="Proveedor" value={medico.proveedor} />
                    <Campo label="Número de serie" value={medico.serie} />
                    <Campo label="Fecha de inicio" value={medico.inicio} />
                    <Campo label="Vencimiento" value={medico.vencimiento} />
                </div>

                <div className="mt-6 flex flex-col gap-4">
                    <button
                        type="button"
                        className="w-full rounded-xl bg-surface-light py-3.5 text-xs font-semibold tracking-wide text-text-secondary shadow-sm shadow-border-subtle/30 transition-colors hover:bg-muted-20"
                    >
                        VALIDAR CERTIFICADO
                    </button>
                    <button
                        type="button"
                        className="w-full rounded-xl bg-surface-light py-3.5 text-xs font-semibold tracking-wide text-text-secondary shadow-sm shadow-border-subtle/30 transition-colors hover:bg-muted-20"
                    >
                        REEMPLAZAR CERTIFICADO
                    </button>
                </div>

                <p className="mt-auto pt-8 text-xs leading-relaxed text-risk-salmon">
                    El administrador configura el certificado, pero solo el
                    médico puede autorizar una firma con su credencial personal.
                </p>
            </section>
        </div>
    );
}
