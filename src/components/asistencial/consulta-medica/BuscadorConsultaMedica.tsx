import { useCallback, useMemo, type KeyboardEvent } from "react";

export interface ConsultaFiltros {
    apellidos: string;
    medico: string;
    estado: string;
}

interface BuscadorConsultaMedicaProps {
    filtros: ConsultaFiltros;
    onFiltrosChange: (field: keyof ConsultaFiltros, value: string) => void;
    onBuscar: () => void;
    onLimpiar: () => void;
}

const BuscadorConsultaMedica = ({
    filtros,
    onFiltrosChange,
    onBuscar,
    onLimpiar,
}: BuscadorConsultaMedicaProps) => {
    const handleEnterKey = useCallback(
        (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter") {
                event.preventDefault();
                onBuscar();
            }
        },
        [onBuscar],
    );

    const estadoOptions = useMemo(
        () => [
            { value: "", label: "Todos" },
            { value: "2", label: "Culminado" },
            { value: "1", label: "En espera" },
        ],
        [],
    );

    return (
        <div className="flex gap-4 items-end">
            <div className="flex-1">
                <label htmlFor="apellidos" className="form-label">
                    Apellidos del Paciente
                </label>
                <input
                    id="apellidos"
                    type="text"
                    value={filtros.apellidos}
                    onChange={(e) =>
                        onFiltrosChange("apellidos", e.target.value)
                    }
                    onKeyDown={handleEnterKey}
                    className="form-input uppercase h-10"
                />
            </div>

            <div className="flex-1">
                <label htmlFor="medico" className="form-label">
                    Nombre del Médico
                </label>
                <input
                    id="medico"
                    type="text"
                    value={filtros.medico}
                    onChange={(e) => onFiltrosChange("medico", e.target.value)}
                    onKeyDown={handleEnterKey}
                    className="form-input uppercase h-10"
                />
            </div>

            <div className="flex-1">
                <label htmlFor="estado" className="form-label">
                    Estado de Atención
                </label>
                <select
                    id="estado"
                    value={filtros.estado}
                    onChange={(e) => onFiltrosChange("estado", e.target.value)}
                    className="form-input uppercase h-10 flex items-center"
                >
                    {estadoOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            <button
                type="button"
                onClick={onBuscar}
                className="px-6 py-2 h-10 w-30 text-sm bg-brand text-white rounded-lg font-medium hover:bg-primary-hover cursor-pointer"
            >
                BUSCAR
            </button>

            <button
                type="button"
                onClick={onLimpiar}
                className="px-6 py-2 h-10 w-30 text-sm bg-muted text-white rounded-lg font-medium hover:bg-neutral-400 cursor-pointer"
            >
                LIMPIAR
            </button>
        </div>
    );
};

export default BuscadorConsultaMedica;
