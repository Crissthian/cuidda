import Modal from "@/components/ui/Modal";
import type { ModalSize } from "@/components/ui/modal.constants";
import { pacientesMock, type PacienteMock } from "@/lib/admisionData";
import { useEffect, useState } from "react";

const MIN_SEARCH_AUTO = 4;
const MIN_SEARCH_MANUAL = 2;
const DEBOUNCE_MS = 500;

interface ModalBusquedaPacienteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (paciente: PacienteMock) => void;
  size?: ModalSize;
}

/**
 * Modal para buscar pacientes por apellido con búsqueda automática por debounce (mock).
 */
export default function ModalBusquedaPaciente({
  isOpen,
  onClose,
  onSelect,
  size = "lg",
}: ModalBusquedaPacienteProps) {
  const [apellido, setApellido] = useState("");
  const [resultados, setResultados] = useState<PacienteMock[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (apellido.length < MIN_SEARCH_MANUAL) return;

    setLoading(true);
    // Simulación de búsqueda sobre pacientes mock
    window.setTimeout(() => {
      const res = pacientesMock.filter((p) =>
        p.APELLIDO_PERSONA.toLowerCase().includes(apellido.toLowerCase()),
      );
      setResultados(res);
      setLoading(false);
    }, 300);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (apellido.length >= MIN_SEARCH_AUTO) {
        handleSearch();
      }
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apellido]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Buscar Paciente"
      icon="fa-solid fa-magnifying-glass"
      zIndex={60}
      size={size}
    >
      {/* Header with close button */}
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-border-default">
        <h2 className="text-xl font-bold text-brand flex items-center gap-2">
          <i className="fa-solid fa-magnifying-glass"></i>
          Buscar Paciente
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="flex items-center justify-center size-8 rounded-lg bg-brand text-white hover:bg-primary-hover transition-colors"
          aria-label="Cerrar modal"
        >
          <i className="fa-solid fa-sign-out-alt text-lg"></i>
        </button>
      </div>

      {/* Campo de búsqueda */}
      <div>
        <label
          htmlFor="buscarApellido"
          className="block text-sm font-medium text-text-primary mb-1"
        >
          Buscar por Apellido
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            autoFocus
            placeholder="Ingrese 4 letras o más..."
            className="w-full rounded-lg border border-border-default px-3 py-2 text-text-primary placeholder:text-text-primary focus:border-brand focus:ring-2 focus:ring-border-subtle  transition-all"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            type="button"
            className="rounded-lg bg-brand px-4 py-2 text-white hover:bg-primary-hover transition-all cursor-pointer flex items-center gap-2"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              <i className="fa-solid fa-search"></i>
            )}
            Buscar
          </button>
        </div>
      </div>

      {/* Resultados */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-3">
          Resultados:
        </h3>
        <div className="border border-border-default rounded-lg overflow-hidden max-h-96 overflow-y-auto">
          <div className="bg-brand text-white sticky top-0 grid grid-cols-3 gap-2 px-4 py-3">
            <span className="font-medium">Nombre</span>
            <span className="font-medium">Apellido</span>
            <span className="font-medium">DNI</span>
          </div>
          <div className="text-text-primary divide-y divide-border-default">
            {loading ? (
              <div className="px-4 py-8 text-center">
                <div className="flex flex-col items-center gap-3">
                  <i className="fa-solid fa-spinner fa-spin text-3xl text-brand"></i>
                  <span className="text-text-primary">
                    Buscando pacientes...
                  </span>
                </div>
              </div>
            ) : resultados.length === 0 ? (
              <div className="px-4 py-3 text-center text-gray-500">
                No se encontraron resultados
              </div>
            ) : (
              resultados.map((paciente, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 gap-2 px-4 py-2 hover:bg-primary-hover hover:text-white cursor-pointer transition-colors"
                  onClick={() => {
                    onSelect(paciente);
                    onClose();
                  }}
                >
                  <span>{paciente.NOMBRE_PERSONA}</span>
                  <span>{paciente.APELLIDO_PERSONA}</span>
                  <span>{paciente.NUM_DNI}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
