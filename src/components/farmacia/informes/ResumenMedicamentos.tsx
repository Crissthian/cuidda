import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { resumenMedicamentosData } from "@/lib/farmaciaData";
import { toast } from "sonner";

export const ResumenMedicamentos = () => {
  const [textProducto, setTextProducto] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 100;

  const filteredData = useMemo(() => {
    if (!textProducto.trim()) return resumenMedicamentosData;
    return resumenMedicamentosData.filter(
      (m) =>
        m.producto.toLowerCase().includes(textProducto.toLowerCase()) ||
        m.codigoInterno.toLowerCase().includes(textProducto.toLowerCase()) ||
        m.codigoDigemid.toLowerCase().includes(textProducto.toLowerCase())
    );
  }, [textProducto]);

  const totalRegistros = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalRegistros / pageSize));
  const globalOffset = (currentPage - 1) * pageSize;

  const currentRows = useMemo(() => {
    return filteredData.slice(globalOffset, globalOffset + pageSize);
  }, [filteredData, globalOffset, pageSize]);

  const handlePreviousPage = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNextPage = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  const handleSearch = () => {
    setCurrentPage(1);
    toast.success("Búsqueda de medicamentos actualizada.");
  };

  const handleExport = () => {
    toast.success("Excel exportado correctamente");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Filters Section */}
      <div className="flex flex-col text-text-secondary gap-6">
        <div className="flex items-end gap-6">
          <div className="flex items-center gap-4 flex-1">
            <label className="text-text-primary font-medium whitespace-nowrap min-w-max">
              Nombre de producto
            </label>
            <div className="flex-1 max-w-75">
              <input
                type="text"
                value={textProducto}
                onChange={(e) => setTextProducto(e.target.value)}
                className="form-input w-full bg-surface-light border-0 ring-0 focus:ring-0 uppercase"
                placeholder="Buscar producto..."
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleSearch}
            className="bg-brand hover:bg-primary-hover text-white font-semibold py-2 px-8 rounded-lg uppercase transition-colors disabled:opacity-70 flex items-center gap-2"
          >
            BUSCAR
          </button>
        </div>
      </div>

      {/* Table Card container */}
      <div className="bg-white border-2 border-surface-light rounded-xl overflow-hidden shadow-sm mt-4 min-w-250">
        <div className="overflow-x-auto">
          <table className="w-full text-center text-sm">
            <thead className="bg-card-bg text-brand">
              <tr>
                <th className="py-4 px-2" />
                <th className="py-4 px-2 text-xs font-bold uppercase tracking-wider divisor">
                  <div>
                    CÓDIGO
                    <br />
                    INTERNO
                  </div>
                </th>
                <th className="py-4 px-2 text-xs font-bold uppercase tracking-wider divisor">
                  <div>
                    CÓDIGO
                    <br />
                    DIGEMID
                  </div>
                </th>
                <th className="py-4 px-2 text-xs font-bold uppercase tracking-wider divisor">
                  PRODUCTO
                </th>
                <th className="py-4 px-2 text-xs font-bold uppercase tracking-wider divisor">
                  PRINCIPIO ACTIVO
                </th>
                <th className="py-4 px-2 text-xs font-bold uppercase tracking-wider divisor">
                  PRESENTACIÓN
                </th>
                <th className="py-4 px-2 text-xs font-bold uppercase tracking-wider divisor">
                  <div>
                    TIPO DE
                    <br />
                    MEDICAMENTO
                  </div>
                </th>
                <th className="py-4 px-2 text-xs font-bold uppercase tracking-wider divisor">
                  <div>
                    REQUIERE
                    <br />
                    RECETA
                  </div>
                </th>
                <th className="py-4 px-2 text-xs font-bold uppercase tracking-wider divisor">
                  <div>
                    PRECIO
                    <br />
                    UNIT
                  </div>
                </th>
                <th className="py-4 px-2 text-xs font-bold uppercase tracking-wider divisor">
                  <div>
                    PRECIO
                    <br />
                    BLISTER
                  </div>
                </th>
                <th className="py-4 px-2 text-xs font-bold uppercase tracking-wider">
                  <div>
                    PRECIO
                    <br />
                    CAJA
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y bg-surface-default divide-surface-light text-text-secondary">
              {currentRows.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-8 text-center">
                    No se encontraron medicamentos
                  </td>
                </tr>
              ) : (
                currentRows.map((row) => (
                  <tr key={row.id} className="hover:bg-surface-light text-xs transition-colors">
                    <td className="py-3 px-2">
                      <button type="button" className="text-brand hover:text-primary-hover">
                        <Search size={18} strokeWidth={2.5} />
                      </button>
                    </td>
                    <td className="py-3 px-2 font-medium">{row.codigoInterno}</td>
                    <td className="py-3 px-2">{row.codigoDigemid}</td>
                    <td className="py-3 px-2 truncate font-semibold text-text-primary">
                      {row.producto}
                    </td>
                    <td className="py-3 px-2">{row.principioActivo}</td>
                    <td className="py-3 px-2">{row.presentacion}</td>
                    <td className="py-3 px-2">{row.tipoMedicamento}</td>
                    <td className="py-3 px-2">{row.requiereReceta}</td>
                    <td className="py-3 px-2">{row.precioUnit}</td>
                    <td className="py-3 px-2">{row.precioBlister}</td>
                    <td className="py-3 px-2">{row.precioCaja}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {totalRegistros > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 text-sm border-t border-border-default">
          <div className="text-sm text-text-primary-80">
            Mostrando <span className="font-semibold text-text-primary">{currentRows.length}</span> de{" "}
            <span className="font-semibold text-text-primary">{totalRegistros}</span> registros
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-md p-1 shadow-sm">
              <button
                type="button"
                aria-label="Página anterior"
                title="Anterior"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors border focus:ring-2 focus:ring-offset-1 focus:ring-brand ${
                  currentPage === 1
                    ? "bg-card-bg text-accent-content cursor-not-allowed opacity-60 border-border-default"
                    : "bg-card-bg border-border-default text-accent-content"
                }`}
              >
                <i className="fas fa-chevron-left" />
                <span className="hidden sm:inline">Anterior</span>
              </button>

              <div className="px-3 text-sm font-medium text-text-primary select-none">
                Página {currentPage} de {totalPages}
              </div>

              <button
                type="button"
                aria-label="Página siguiente"
                title="Siguiente"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors border focus:ring-2 focus:ring-offset-1 focus:ring-brand ${
                  currentPage === totalPages
                    ? "bg-card-bg text-accent-content cursor-not-allowed opacity-60 border-border-default"
                    : "bg-card-bg border-border-default text-accent-content"
                }`}
              >
                <span className="hidden sm:inline">Siguiente</span>
                <i className="fas fa-chevron-right" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Buttons */}
      <div className="flex justify-between items-center mt-2">
        <a href="/farmacia/compras/registro-medicamentos">
          <button
            type="button"
            className="bg-muted text-white font-semibold py-2 px-6 rounded-lg uppercase hover:bg-muted/90 text-sm text-center min-w-40"
          >
            AGREGAR
            <br />
            MEDICAMENTO
          </button>
        </a>
        <button
          type="button"
          onClick={handleExport}
          disabled={currentRows.length === 0}
          className="bg-brand hover:bg-primary-hover text-white font-semibold py-2.5 px-8 rounded-lg uppercase transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          EXPORTAR
        </button>
      </div>
    </div>
  );
};
export default ResumenMedicamentos;
