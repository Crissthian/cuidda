import SuccessModal from "@/components/ui/SuccessModal";
import { useState } from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

const periodos = ["2026", "2025", "2024"];
const empresas = ["UNACEM PERU S.A.", "Todas las empresas"];
const sedes = ["Condorcocha", "Atococongo", "Conchán", "Todas las sedes"];

const infoIzquierda = [
    "Población",
    "Aptitudes",
    "Enfermedades relacionadas al trabajo",
    "G1 / G2 / G3",
    "Conclusiones y recomendaciones",
];

const infoDerecha = [
    "EMO",
    "Diagnósticos / Epidemiología",
    "Riesgos y agentes de exposición",
    "Programas",
];

const labelClass = "mb-1 block text-xs text-text-secondary";
const inputClass = "form-input !py-2.5 text-xs";
const selectClass = "form-select appearance-none !py-2.5 text-xs";

function CheckItem({
    checked,
    onToggle,
    label,
}: {
    checked: boolean;
    onToggle: () => void;
    label: string;
}) {
    return (
        <button
            type="button"
            role="checkbox"
            aria-checked={checked}
            aria-label={label}
            onClick={onToggle}
            className="flex items-center gap-2.5 text-left"
        >
            <span
                className={`flex size-4 shrink-0 items-center justify-center rounded border ${
                    checked
                        ? "border-brand bg-brand"
                        : "border-muted-20 bg-surface-light"
                }`}
                aria-hidden="true"
            >
                {checked && (
                    <i
                        className="fa-solid fa-check text-[8px] text-white-custom"
                        aria-hidden="true"
                    />
                )}
            </span>
            <span className="text-sm leading-relaxed text-text-primary">
                {label}
            </span>
        </button>
    );
}

export default function GenerarDocumentoModal({ isOpen, onClose }: Props) {
    const [periodo, setPeriodo] = useState("");
    const [empresa, setEmpresa] = useState("");
    const [sede, setSede] = useState("");
    const [seleccion, setSeleccion] = useState<string[]>([]);
    const [objetivo, setObjetivo] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    const toggle = (item: string) =>
        setSeleccion((prev) =>
            prev.includes(item)
                ? prev.filter((i) => i !== item)
                : [...prev, item],
        );

    const resetForm = () => {
        setPeriodo("");
        setEmpresa("");
        setSede("");
        setSeleccion([]);
        setObjetivo("");
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleCloseSuccess = () => {
        setShowSuccess(false);
        resetForm();
        onClose();
    };

    if (!isOpen && !showSuccess) return null;

    return (
        <>
            {isOpen && !showSuccess && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-generar-documento-title"
                    onClick={handleClose}
                >
                    <div
                        className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-surface-default shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={handleClose}
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
                                id="modal-generar-documento-title"
                                className="text-lg font-bold text-brand"
                            >
                                Generar documento personalizado
                            </h2>
                            <p className="mt-1 text-sm text-accent-muted">
                                La IA redacta el documento utilizando
                                exclusivamente la información seleccionada.
                            </p>

                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    setShowSuccess(true);
                                }}
                                className="mt-6 flex flex-col gap-5"
                            >
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <div>
                                        <label
                                            htmlFor="doc-periodo"
                                            className={labelClass}
                                        >
                                            Periodo
                                        </label>
                                        <div className="form-select-container">
                                            <select
                                                id="doc-periodo"
                                                value={periodo}
                                                onChange={(e) =>
                                                    setPeriodo(e.target.value)
                                                }
                                                className={`${selectClass} ${periodo ? "text-text-primary" : "text-muted"}`}
                                            >
                                                <option
                                                    value=""
                                                    disabled
                                                    hidden
                                                >
                                                    Seleccionar
                                                </option>
                                                {periodos.map((p) => (
                                                    <option key={p} value={p}>
                                                        {p}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="doc-empresa"
                                            className={labelClass}
                                        >
                                            Empresa
                                        </label>
                                        <div className="form-select-container">
                                            <select
                                                id="doc-empresa"
                                                value={empresa}
                                                onChange={(e) =>
                                                    setEmpresa(e.target.value)
                                                }
                                                className={`${selectClass} ${empresa ? "text-text-primary" : "text-muted"}`}
                                            >
                                                <option
                                                    value=""
                                                    disabled
                                                    hidden
                                                >
                                                    Seleccionar
                                                </option>
                                                {empresas.map((e) => (
                                                    <option key={e} value={e}>
                                                        {e}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="doc-sede"
                                            className={labelClass}
                                        >
                                            Sede
                                        </label>
                                        <div className="form-select-container">
                                            <select
                                                id="doc-sede"
                                                value={sede}
                                                onChange={(e) =>
                                                    setSede(e.target.value)
                                                }
                                                className={`${selectClass} ${sede ? "text-text-primary" : "text-muted"}`}
                                            >
                                                <option
                                                    value=""
                                                    disabled
                                                    hidden
                                                >
                                                    Seleccionar
                                                </option>
                                                {sedes.map((s) => (
                                                    <option key={s} value={s}>
                                                        {s}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <fieldset>
                                    <legend className="text-xs font-semibold text-text-primary">
                                        Información a incorporar
                                    </legend>
                                    <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                                        <div className="flex flex-col gap-3">
                                            {infoIzquierda.map((item) => (
                                                <CheckItem
                                                    key={item}
                                                    label={item}
                                                    checked={seleccion.includes(
                                                        item,
                                                    )}
                                                    onToggle={() =>
                                                        toggle(item)
                                                    }
                                                />
                                            ))}
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            {infoDerecha.map((item) => (
                                                <CheckItem
                                                    key={item}
                                                    label={item}
                                                    checked={seleccion.includes(
                                                        item,
                                                    )}
                                                    onToggle={() =>
                                                        toggle(item)
                                                    }
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </fieldset>

                                <div>
                                    <label
                                        htmlFor="doc-objetivo"
                                        className={labelClass}
                                    >
                                        Objetivo del documento
                                    </label>
                                    <textarea
                                        id="doc-objetivo"
                                        rows={4}
                                        value={objetivo}
                                        onChange={(e) =>
                                            setObjetivo(e.target.value)
                                        }
                                        className={`${inputClass} resize-none`}
                                    />
                                </div>

                                <div className="flex justify-end gap-3 pb-2 pt-1">
                                    <button
                                        type="button"
                                        onClick={handleClose}
                                        className="flex items-center justify-center gap-2 rounded-lg bg-muted px-6 py-2.5 text-[11px] font-bold text-white hover:bg-muted-80"
                                    >
                                        <i
                                            className="fa-solid fa-trash text-[11px]"
                                            aria-hidden="true"
                                        />
                                        CANCELAR
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-2.5 text-[11px] font-bold text-white hover:bg-primary-hover"
                                    >
                                        <i
                                            className="fa-solid fa-robot text-[11px]"
                                            aria-hidden="true"
                                        />
                                        GENERAR
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <SuccessModal
                isOpen={showSuccess}
                onClose={handleCloseSuccess}
                title={"Documento generado\ncorrectamente"}
            />
        </>
    );
}
