type Props = {
    isOpen: boolean;
    onClose: () => void;
};

interface DocumentoItem {
    nombre: string;
    formato: string | null;
    icono: string;
}

const documentos: DocumentoItem[] = [
    {
        nombre: "Excel oficial DIGESA / DIRESA",
        formato: "(xlxs)",
        icono: "fa-file-excel",
    },
    {
        nombre: "Carta de presentación",
        formato: "(docx / pdf)",
        icono: "fa-file-word",
    },
    {
        nombre: "Informe ejecutivo anual",
        formato: "(pdf)",
        icono: "fa-file-pdf",
    },
    {
        nombre: "Informe epidemiológico",
        formato: "(pdf)",
        icono: "fa-file-pdf",
    },
    {
        nombre: "Informe de aptitud medico ocupacional compilado",
        formato: "(pdf)",
        icono: "fa-file-pdf",
    },
    {
        nombre: "Informe de enfermedades y hallazgos",
        formato: "(pdf)",
        icono: "fa-file-pdf",
    },
    {
        nombre: "Informe de programas de vigilancia",
        formato: "(pdf)",
        icono: "fa-file-pdf",
    },
    {
        nombre: "Informe de población G1/G2/G3",
        formato: "(pdf)",
        icono: "fa-file-pdf",
    },
    {
        nombre: "Documento personalizado",
        formato: "(pdf)",
        icono: "fa-file-pdf",
    },
    {
        nombre: "Generar paquete de presentación",
        formato: null,
        icono: "fa-box-archive",
    },
];

export default function GenerarDocumentoInformeModal({
    isOpen,
    onClose,
}: Props) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-generar-documento-informe-title"
            onClick={onClose}
        >
            <div
                className="relative flex max-h-[95vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-surface-default shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-6 top-5 flex size-8 items-center justify-center rounded-full text-brand hover:bg-surface-light"
                    aria-label="Cerrar modal"
                >
                    <i
                        className="fa-solid fa-right-from-bracket text-lg"
                        aria-hidden="true"
                    />
                </button>

                <div className="overflow-y-auto px-8 py-6">
                    <h2
                        id="modal-generar-documento-informe-title"
                        className="text-lg font-bold text-brand"
                    >
                        Generar documento
                    </h2>
                    <p className="mt-1 text-sm text-accent-muted">
                        Todos los documentos se generan desde la misma
                        información consolidada.
                    </p>

                    <div
                        className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
                        role="list"
                        aria-label="Documentos disponibles"
                    >
                        {documentos.map((doc) => (
                            <button
                                key={doc.nombre}
                                type="button"
                                role="listitem"
                                aria-label={`Generar ${doc.nombre}`}
                                onClick={onClose}
                                className="flex items-center gap-3 rounded-xl bg-surface-light px-4 py-3.5 text-left shadow-sm shadow-border-subtle/30 transition-colors hover:bg-muted-20"
                            >
                                <i
                                    className={`fa-regular ${doc.icono} shrink-0 text-lg text-muted`}
                                    aria-hidden="true"
                                />
                                <span className="text-sm leading-snug text-text-secondary">
                                    {doc.nombre}{" "}
                                    {doc.formato && (
                                        <span className="text-brand">
                                            {doc.formato}
                                        </span>
                                    )}
                                </span>
                            </button>
                        ))}
                    </div>

                    <p className="mt-6 text-xs leading-relaxed text-risk-salmon">
                        El paquete reúne el Excel oficial, la carta de
                        presentación y el informe ejecutivo. No se realiza envío
                        automático a la autoridad sanitaria.
                    </p>
                </div>
            </div>
        </div>
    );
}
