import { useState, useMemo } from "react";
import {
  sedesFarmacia,
  stockActualRows,
  type StockActualRow,
} from "@/lib/farmaciaData";
import { toast } from "sonner";

export const StockActual = () => {
  const [selectedAlmacen, setSelectedAlmacen] = useState<string>("1");
  const [useFechaCorte, setUseFechaCorte] = useState<boolean>(false);
  const [selectedFechaCorte, setSelectedFechaCorte] = useState<string>(
    new Date().toISOString().split("T")[0],
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 100;

  const data: StockActualRow[] = useMemo(() => {
    return stockActualRows;
  }, []);

  const totalRegistros = data.length;
  const totalPages = Math.max(1, Math.ceil(totalRegistros / pageSize));
  const globalOffset = (currentPage - 1) * 100;
  const hasSelectedAlmacen = selectedAlmacen.length > 0;

  const currentRows = useMemo(() => {
    return data.slice(globalOffset, globalOffset + pageSize);
  }, [data, globalOffset, pageSize]);

  const costoTotalNum = useMemo(() => {
    return data.reduce((acc, row) => acc + row.costo, 0);
  }, [data]);

  const costoTotalStr = costoTotalNum.toLocaleString("es-PE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  const handleImprimir = () => {
    toast.success("Generando reporte de Stock Actual en PDF...");
  };

  return (
    <div className="max-w-full mx-auto space-y-8 pb-4">
      {/* Top Filter */}
      <div className="w-full">
        <div className="flex items-center gap-6 whitespace-nowrap">
          <span className="font-bold text-text-secondary">Almacén:</span>

          <div className="relative w-60">
            <select
              className="w-full uppercase bg-surface-light rounded-md py-2 px-4 appearance-none outline-none disabled:opacity-50 transition-colors cursor-pointer text-text-primary disabled:cursor-not-allowed"
              disabled={sedesFarmacia.length === 0}
              value={selectedAlmacen}
              onChange={(e) => setSelectedAlmacen(e.target.value)}
            >
              <option value="" disabled>
                SELECCIONE
              </option>
              {sedesFarmacia.map((sede) => (
                <option key={sede.num_item} value={sede.num_item}>
                  {sede.des_item}
                </option>
              ))}
            </select>
          </div>

          <span className="font-bold text-text-secondary">Fecha de corte:</span>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="checkbox bg-muted-30 checked:text-brand text-surface-light size-6 rounded"
              checked={useFechaCorte}
              onChange={(e) => setUseFechaCorte(e.target.checked)}
            />
          </label>

          <div className="relative w-52">
            <input
              type="date"
              className="w-full bg-surface-light rounded-md py-2 px-4 outline-none disabled:opacity-50 transition-colors cursor-pointer text-text-primary disabled:cursor-not-allowed"
              disabled={!useFechaCorte}
              value={selectedFechaCorte}
              onChange={(e) => setSelectedFechaCorte(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-surface-default border border-border-subtle/30 rounded-lg shadow-sm overflow-hidden p-6">
        <div className="w-full text-center">
          {/* Grid Header */}
          <div className="grid grid-cols-[64px_150px_minmax(0,1fr)_84px_110px_110px_110px_125px] text-xs bg-muted-20 rounded-md text-brand font-semibold uppercase tracking-wide">
            <div className="divisor py-4 flex items-center justify-center">
              ITEM
            </div>
            <div className="divisor py-4 flex items-center justify-center">
              CÓDIGO
            </div>
            <div className="divisor py-4 flex items-center justify-center">
              PRODUCTO
            </div>
            <div className="divisor py-4 flex items-center justify-center">
              UNID
            </div>
            <div className="divisor py-4 flex items-center justify-center">
              INGRESOS
            </div>
            <div className="divisor py-4 flex items-center justify-center">
              SALIDAS
            </div>
            <div className="divisor py-4 flex items-center justify-center">
              STOCK
            </div>
            <div className="divisor py-4 flex items-center justify-center">
              COSTO TOTAL
            </div>
          </div>

          {/* Grid Body */}
          <div className="flex flex-col text-text-secondary font-medium min-h-auto">
            {!hasSelectedAlmacen ? (
              <div className="flex items-center justify-center flex-1 py-12">
                <p>Seleccione una sede para consultar el stock actual.</p>
              </div>
            ) : currentRows.length === 0 ? (
              <div className="flex items-center justify-center flex-1 py-12">
                <p>
                  No se encontraron registros de inventario para el almacén
                  seleccionado.
                </p>
              </div>
            ) : (
              currentRows.map((row, index) => (
                <div
                  key={row.id}
                  className="grid grid-cols-[64px_150px_minmax(0,1fr)_84px_110px_110px_110px_125px] text-xs py-4 text-text-secondary hover:bg-surface-light/50 transition-colors rounded-lg"
                >
                  <div className="flex items-center justify-center">
                    {globalOffset + index + 1}.-
                  </div>
                  <div className="flex items-center justify-center">
                    {row.codigo}
                  </div>
                  <div className="flex items-center justify-center">
                    {row.producto}
                  </div>
                  <div
                    className="flex items-center justify-center tooltip"
                    title="Unidad genérica preventiva"
                  >
                    {row.unid}
                  </div>
                  <div className="flex items-center justify-center">
                    {row.ingresos}
                  </div>
                  <div className="flex items-center justify-center">
                    {row.salidas}
                  </div>
                  <div className="flex items-center justify-center">
                    {row.stock}
                  </div>
                  <div className="flex items-center justify-center">
                    {row.costo > 0 ? row.costo.toFixed(2) : "-"}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Paginación */}
          {totalRegistros > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 text-sm mb-4 border-t border-border-default">
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
        </div>

        {/* Footer Summary */}
        <div className="mt-6 pt-6 border-t-2 border-dotted border-border-subtle">
          <div className="flex justify-end items-center gap-12 pr-2">
            <span className="text-brand font-bold text-xl uppercase">
              COSTO TOTAL
            </span>
            <span className="text-brand font-bold text-lg w-32 text-right">
              S/. {costoTotalStr}
            </span>
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="flex justify-end pr-2">
        <button
          type="button"
          onClick={handleImprimir}
          className="px-8 py-2 rounded-lg font-semibold transition-all inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand/80 text-white"
        >
          <i className="fa-solid fa-file-pdf" />
          <span>IMPRIMIR</span>
        </button>
      </div>
    </div>
  );
};
export default StockActual;
