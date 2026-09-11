import SuccessModal from "@/components/ui/SuccessModal";
import { useState } from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

const labelClass = "mb-1 block text-xs text-text-secondary";
const inputClass = "form-input !py-2.5 text-xs";

export default function EdicionManualModal({ isOpen, onClose }: Props) {
    const [expuestos, setExpuestos] = useState("");
    const [observacion, setObservacion] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    const resetForm = () => {
        setExpuestos("");
        setObservacion("");
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
                    aria-labelledby="modal-edicion-manual-title"
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
                                id="modal-edicion-manual-title"
                                className="text-lg font-bold text-brand"
                            >
                                Edición manual controlada
                            </h2>
                            <p className="mt-1 text-sm text-accent-muted">
                                El cambio quedará registrado con datos
                                originales, datos modificados, usuario y fecha.
                            </p>

                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    setShowSuccess(true);
                                }}
                                className="mt-8 flex flex-col gap-5"
                            >
                                <div>
                                    <label
                                        htmlFor="edicion-expuestos"
                                        className={labelClass}
                                    >
                                        Trabajadores expuestos
                                    </label>
                                    <input
                                        id="edicion-expuestos"
                                        type="text"
                                        value={expuestos}
                                        onChange={(e) =>
                                            setExpuestos(e.target.value)
                                        }
                                        className={inputClass}
                                        autoComplete="off"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="edicion-observacion"
                                        className={labelClass}
                                    >
                                        Observación / justificación
                                    </label>
                                    <textarea
                                        id="edicion-observacion"
                                        rows={4}
                                        value={observacion}
                                        onChange={(e) =>
                                            setObservacion(e.target.value)
                                        }
                                        className={`${inputClass} resize-none`}
                                    />
                                </div>

                                <div className="flex justify-center gap-4 pb-2 pt-1">
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
                                        className="flex items-center justify-center gap-2 rounded-lg bg-brand px-8 py-2.5 text-[11px] font-bold text-white hover:bg-primary-hover"
                                    >
                                        <i
                                            className="fa-regular fa-floppy-disk text-[11px]"
                                            aria-hidden="true"
                                        />
                                        GUARDAR
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
                title={"Registro guardado\ncorrectamente"}
            />
        </>
    );
}
