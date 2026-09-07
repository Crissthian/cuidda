import { useCallback, type KeyboardEvent } from "react";
import type { FiltrosTriaje } from "./triaje.types";

interface BuscadorTriajeProps {
  filtros: FiltrosTriaje;
  onFieldChange: (field: keyof FiltrosTriaje, value: string) => void;
  onBuscar: () => void;
  onLimpiar: () => void;
}

export default function BuscadorTriaje({
  filtros,
  onFieldChange,
  onBuscar,
  onLimpiar,
}: BuscadorTriajeProps) {
  const handleEnterKey = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        onBuscar();
      }
    },
    [onBuscar],
  );

  const estadoOptions = [
    { value: "", label: "Todos" },
    { value: "0", label: "Pendiente" },
    { value: "1", label: "Atendido" },
  ];

  return (
    <div className="px-6">
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <label htmlFor="apellidos" className="form-label">
            Apellidos del Paciente
          </label>
          <input
            id="apellidos"
            type="text"
            className="form-input uppercase h-10 items-center"
            value={filtros.apellidoPaciente}
            onChange={(e) => onFieldChange("apellidoPaciente", e.target.value)}
            onKeyDown={handleEnterKey}
          />
        </div>
        <div className="flex-1">
          <label htmlFor="medico" className="form-label">
            Nombre del Médico
          </label>
          <input
            id="medico"
            type="text"
            className="form-input uppercase h-10 items-center"
            value={filtros.nombreMedico}
            onChange={(e) => onFieldChange("nombreMedico", e.target.value)}
            onKeyDown={handleEnterKey}
          />
        </div>
        <div className="flex-1">
          <label htmlFor="estadoAtencion" className="form-label">
            Estado de Atención
          </label>
          <select
            id="estadoAtencion"
            className="form-input uppercase h-10 items-center"
            value={filtros.estado}
            onChange={(e) => onFieldChange("estado", e.target.value)}
          >
            {estadoOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <button
          id="btnBuscarAtenciones"
          type="button"
          onClick={onBuscar}
          className="p-3 w-30 bg-brand text-white rounded-lg font-medium hover:bg-primary-hover cursor-pointer"
        >
          BUSCAR
        </button>
        <button
          id="btnLimpiarAtenciones"
          type="button"
          onClick={onLimpiar}
          className="p-3 w-30 bg-muted text-white rounded-lg font-medium hover:bg-neutral-400 cursor-pointer"
        >
          LIMPIAR
        </button>
      </div>
    </div>
  );
}