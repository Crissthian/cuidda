import { resumenVentasData } from "@/lib/farmaciaData";
import { SEDES } from "@/lib/sedes";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export const ResumenVentas = () => {
  const [cliente, setCliente] = useState<string>("");
  const [fechaDesde, setFechaDesde] = useState<string>("2026-09-01");
  const [fechaHasta, setFechaHasta] = useState<string>("2026-09-30");
  const [sede, setSede] = useState<string>(SEDES[0] ?? "");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 100;

  const renderCliente = (value: string | null | undefined) => {
    if (!value || value.trim().length === 0) return "__";
    return value;
  };

  const filteredData = useMemo(() => {
    return resumenVentasData.filter((item) => {
      const matchCliente =
        !cliente.trim() ||
        item.cliente.toLowerCase().includes(cliente.toLowerCase()) ||
        item.numeroComprobante.toLowerCase().includes(cliente.toLowerCase());

      const matchSede = !sede || item.sede === sede;

      return matchCliente && matchSede;
    });
  }, [cliente, sede]);

  const totalRegistros = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalRegistros / pageSize));
  const globalOffset = (currentPage - 1) * pageSize;

  const currentRows = useMemo(() => {
    return filteredData.slice(globalOffset, globalOffset + pageSize);
  }, [filteredData, globalOffset, pageSize]);

  const handlePreviousPage = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNextPage = () =>
    setCurrentPage((p) => Math.min(totalPages, p + 1));

  const handleSearch = () => {
    setCurrentPage(1);
    toast.success("Búsqueda de ventas actualizada.");
  };

  const handleExport = () => {
    toast.success("Excel exportado correctamente");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Filters Section */}
      <div className="flex flex-col gap-4">
        {/* Top Row Inputs */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4 flex-1 max-w-100">
            <label className="text-text-primary font-medium whitespace-nowrap min-w-15">
              Cliente
            </label>
            <input
              type="text"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              className="form-input w-full bg-surface-light border-0 ring-0 focus:ring-0 uppercase"
              placeholder="Buscar cliente..."
            />
          </div>

          <div className="flex items-center gap-12 flex-1">
            <div className="flex items-center gap-4 flex-1">
              <label className="text-text-primary font-medium whitespace-nowrap">
                Desde:
              </label>
              <input
                type="date"
                value={fechaDesde}
                onChange={(e) => setFechaDesde(e.target.value)}
                className="form-input w-full bg-surface-light border-0 ring-0 focus:ring-0 text-text-secondary"
              />
            </div>
            <div className="flex items-center gap-4 flex-1">
              <label className="text-text-primary font-medium whitespace-nowrap">
                Hasta:
              </label>
              <input
                type="date"
                value={fechaHasta}
                onChange={(e) => setFechaHasta(e.target.value)}
                className="form-input w-full bg-surface-light border-0 ring-0 focus:ring-0 text-text-secondary"
              />
            </div>
          </div>
        </div>

        {/* Bottom Row Inputs */}
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-4 w-full max-w-100">
            <label className="text-text-primary font-medium whitespace-nowrap min-w-15">
              Sede
            </label>
            <select
              value={sede}
              onChange={(e) => {
                setSede(e.target.value);
                setCurrentPage(1);
              }}
              className="form-input w-full bg-surface-light border-0 ring-0 focus:ring-0 cursor-pointer"
            >
              <option value="" disabled>
                SELECCIONE
              </option>
              {SEDES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={handleSearch}
            disabled={!sede}
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
                <th className="py-4 px-2 w-12.5" />
                <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider divisor">
                  N° COMPROBANTE
                </th>
                <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider divisor">
                  FECHA DE VENTA
                </th>
                <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider divisor">
                  CLIENTE
                </th>
                <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider divisor">
                  SUB TOTAL
                </th>
                <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider divisor">
                  I.G.V.
                </th>
                <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider">
                  TOTAL
                </th>
              </tr>
            </thead>
            <tbody className="divide-y bg-surface-default divide-border-default text-text-secondary">
              {!sede ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center">
                    Seleccione una sede para consultar ventas
                  </td>
                </tr>
              ) : currentRows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center">
                    No se encontraron ventas
                  </td>
                </tr>
              ) : (
                currentRows.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-surface-light/50 transition-colors"
                  >
                    <td className="py-3 px-2">
                      <button
                        type="button"
                        className="text-brand hover:text-primary-hover"
                      >
                        <Search size={18} strokeWidth={2.5} />
                      </button>
                    </td>
                    <td className="py-3 px-4 font-medium">
                      {row.numeroComprobante}
                    </td>
                    <td className="py-3 px-4">{row.fechaVenta}</td>
                    <td className="py-3 px-4">{renderCliente(row.cliente)}</td>
                    <td className="py-3 px-4">
                      {typeof row.subTotal === "number"
                        ? row.subTotal.toFixed(2)
                        : row.subTotal}
                    </td>
                    <td className="py-3 px-4">
                      {typeof row.igv === "number"
                        ? row.igv.toFixed(2)
                        : row.igv}
                    </td>
                    <td className="py-3 px-4 font-bold text-text-primary">
                      {typeof row.total === "number"
                        ? row.total.toFixed(2)
                        : row.total}
                    </td>
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
            Mostrando{" "}
            <span className="font-semibold text-text-primary">
              {currentRows.length}
            </span>{" "}
            de{" "}
            <span className="font-semibold text-text-primary">
              {totalRegistros}
            </span>{" "}
            registros
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
      <div className="flex justify-end items-center mt-2">
        <button
          type="button"
          onClick={handleExport}
          disabled={!sede || currentRows.length === 0}
          className="bg-brand hover:bg-primary-hover text-white font-semibold py-2.5 px-8 rounded-lg uppercase transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          EXPORTAR
        </button>
      </div>
    </div>
  );
};
export default ResumenVentas;
