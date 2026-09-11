import SuccessModal from "@/components/ui/SuccessModal";
import { useState } from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

const labelClass = "mb-1 block text-xs text-text-secondary";
const inputClass = "form-input !py-2.5 text-xs";

export default function FirmarInformeModal({ isOpen, onClose }: Props) {
    const [nombres, setNombres] = useState("");
    const [documento, setDocumento] = useState("");
    const [cargo, setCargo] = useState("");
    const [cmp, setCmp] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    const resetForm = () => {
        setNombres("");
        setDocumento("");
        setCargo("");
        setCmp("");
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
                    aria-labelledby="modal-firmar-informe-title"
                    onClick={handleClose}
                >
                    <div
                        className="relative flex max-h-[95vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-surface-default shadow-xl"
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
                                id="modal-firmar-informe-title"
                                className="text-lg font-bold text-brand"
                            >
                                Firma
                            </h2>
                            <p className="mt-1 text-sm text-accent-muted">
                                Al firmar, el informe queda bloqueado. Para
                                modificarlo deberá crear una nueva versión.
                            </p>

                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    setShowSuccess(true);
                                }}
                                className="mt-8 flex flex-col gap-5"
                            >
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="firma-nombres"
                                            className={labelClass}
                                        >
                                            Nombres y Apellidos
                                        </label>
                                        <input
                                            id="firma-nombres"
                                            type="text"
                                            value={nombres}
                                            onChange={(e) =>
                                                setNombres(e.target.value)
                                            }
                                            className={inputClass}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="firma-documento"
                                            className={labelClass}
                                        >
                                            Documento de identidad
                                        </label>
                                        <input
                                            id="firma-documento"
                                            type="text"
                                            value={documento}
                                            onChange={(e) =>
                                                setDocumento(e.target.value)
                                            }
                                            className={inputClass}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="firma-cargo"
                                            className={labelClass}
                                        >
                                            Cargo
                                        </label>
                                        <input
                                            id="firma-cargo"
                                            type="text"
                                            value={cargo}
                                            onChange={(e) =>
                                                setCargo(e.target.value)
                                            }
                                            className={inputClass}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="firma-cmp"
                                            className={labelClass}
                                        >
                                            CMP (cuando corresponda)
                                        </label>
                                        <input
                                            id="firma-cmp"
                                            type="text"
                                            value={cmp}
                                            onChange={(e) =>
                                                setCmp(e.target.value)
                                            }
                                            className={inputClass}
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>

                                <p className="text-xs leading-relaxed text-risk-salmon">
                                    Según la configuración de la empresa, el
                                    informe puede presentarse únicamente con la
                                    firma médica.
                                </p>

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
                                            className="fa-solid fa-signature text-[11px]"
                                            aria-hidden="true"
                                        />
                                        FIRMAR
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
                title={"Firma registrada\ncorrectamente"}
            />
        </>
    );
}
