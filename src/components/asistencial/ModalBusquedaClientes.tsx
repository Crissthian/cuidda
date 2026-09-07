import Modal from "@/components/ui/Modal";
import type { ModalSize } from "@/components/ui/modal.constants";
import { empresasMock, type Empresa } from "@/lib/admisionData";
import { useState } from "react";

const MIN_SEARCH_LENGTH = 3;

interface ModalBusquedaClientesProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (cliente: Empresa) => void;
  size?: ModalSize;
}

/**
 * Modal de búsqueda de empresas con listado seleccionable (mock).
 */
export default function ModalBusquedaClientes({
  isOpen,
  onClose,
  onSelect,
  size = "xl",
}: ModalBusquedaClientesProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("nombre");
  const [resultados, setResultados] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim().length < MIN_SEARCH_LENGTH) {
      setResultados([]);
      return;
    }

    setLoading(true);
    // Simulación de búsqueda sobre empresas mock
    window.setTimeout(() => {
      const filtered = empresasMock.filter((emp) =>
        emp.des_cli.toLowerCase().includes(term.toLowerCase()),
      );
      setResultados(filtered);
      setLoading(false);
    }, 300);
  };

  const handleClose = () => {
    setSearchTerm("");
    setResultados([]);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Búsqueda de Empresas"
      size={size}
      className="max-w-none"
    >
      <div className="flex flex-col max-h-[80vh]">
        {/* Toolbar */}
        <div className="flex justify-between items-center mb-4 pb-4">
          <h2 className="text-2xl font-bold text-brand">
            <i className="fa-solid fa-building mr-3"></i>
            Búsqueda de Empresas
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="flex items-center justify-center size-8 rounded-lg bg-brand text-white transition-colors hover:bg-primary-hover"
            aria-label="Cerrar modal"
          >
            <i className="fa-solid fa-sign-out-alt text-lg"></i>
          </button>
        </div>

        {/* Búsqueda */}
        <div className="rounded-lg p-4 border border-border-default mb-4">
          <div className="flex items-center gap-3">
            {/* Selector */}
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="px-3 py-2 bg-surface-light border-none rounded-lg text-text-primary text-sm focus:ring-2 focus:ring-brand"
            >
              <option value="nombre">Descripción</option>
            </select>

            {/* Input búsqueda */}
            <div className="flex-1 relative">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-text-primary"></i>
              <input
                type="text"
                placeholder="Buscar empresa..."
                className="w-full pl-10 pr-3 py-2 bg-surface-light border-none rounded-lg text-text-primary text-sm focus:ring-2 focus:ring-brand placeholder:text-text-primary uppercase"
                autoComplete="off"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                autoFocus
              />
            </div>
          </div>
        </div>

        {/* Tabla */}
        <div className="flex-1 rounded-xl p-4 shadow-sm border border-border-default overflow-hidden flex flex-col">
          <h3 className="mb-3 text-sm font-semibold text-text-primary">
            Empresas encontradas
          </h3>
          <div className="flex-1 overflow-y-auto border border-border-default rounded-lg">
            {/* Cabecera de tabla */}
            <div className="flex items-center gap-4 bg-surface-light px-4 py-3 sticky top-0">
              <div className="w-1/4 text-xs font-semibold text-text-primary">
                RUC
              </div>
              <div className="w-2/5 text-xs font-semibold text-text-primary">
                DESCRIPCIÓN
              </div>
              <div className="flex-1 text-xs font-semibold text-text-primary">
                DIRECCIÓN
              </div>
            </div>

            {/* Cuerpo de tabla */}
            <div className="divide-y divide-dashed divide-border-default">
              {loading ? (
                <div className="p-4 text-center text-text-primary">
                  <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                  Cargando...
                </div>
              ) : resultados.length === 0 ? (
                <div className="p-4 text-center text-text-primary text-sm">
                  {searchTerm.length > 2
                    ? "No se encontraron resultados."
                    : "Ingrese al menos 3 caracteres para buscar."}
                </div>
              ) : (
                resultados.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 px-4 py-3 hover:bg-surface-light cursor-pointer transition-colors"
                    onClick={() => {
                      onSelect(item);
                      handleClose();
                    }}
                  >
                    <div className="w-1/4 text-sm text-text-primary font-medium">
                      {item.ruc_cli.trim()}
                    </div>
                    <div className="w-2/5 text-sm text-text-primary">
                      {item.des_cli.trim()}
                    </div>
                    <div className="flex-1 text-sm text-text-primary">
                      {item.dir_cli.trim()}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
