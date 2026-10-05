import { useState, useMemo } from "react";
import { sedesFarmacia, semaforoVencimientosRows, type SemaforoVencimientoRow } from "@/lib/farmaciaData";
import { toast } from "sonner";

export const SemaforoVencimientos = () => {
  const [selectedAlmacen, setSelectedAlmacen] = useState<string>("1");
  const [selectedEstado, setSelectedEstado] = useState<"APTO" | "NO APTO" | "">("");
  const [selectedItem, setSelectedItem] = useState<SemaforoVencimientoRow | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 100;

  const hasSelectedAlmacen = selectedAlmacen.length > 0;

  const data = useMemo(() => {
    if (!selectedEstado) return semaforoVencimientosRows;
    return semaforoVencimientosRows.filter((item) => item.estado === selectedEstado);
  }, [selectedEstado]);

  const totalRegistros = data.length;
  const totalPages = Math.max(1, Math.ceil(totalRegistros / pageSize));
  const globalOffset = (currentPage - 1) * 100;

  const handlePreviousPage = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNextPage = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  const handleDarBajaLote = () => {
    if (!selectedItem || selectedItem.estado !== "NO APTO") return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      toast.success(
        `Lote ${selectedItem.numeroLote} del medicamento ${selectedItem.producto} dado de baja correctamente.`
      );
      setSelectedItem(null);
    }, 600);
  };

  const handleExport = () => {
    toast.success("Excel exportado correctamente");
  };

  return (
    <div className="flex flex-col gap-4 mx-6">
      {/* Filtros Superiores */}
      <div className="flex gap-8">
        <div className="flex items-center gap-4">
          <label className="font-medium text-text-secondary whitespace-nowrap">
            Almacén
          </label>
          <div className="relative w-64">
            <select
              className="w-full appearance-none rounded-md bg-surface-light border-none px-4 py-2 text-text-secondary outline-none cursor-pointer"
              value={selectedAlmacen}
              onChange={(e) => {
                setSelectedAlmacen(e.target.value);
                setSelectedItem(null);
              }}
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
        </div>
        <div className="flex items-center gap-4">
          <label className="font-medium text-text-secondary whitespace-nowrap">
            Estado
          </label>
          <div className="relative w-64">
            <select
              className="w-full appearance-none rounded-md bg-surface-light border-none px-4 py-2 text-text-secondary outline-none cursor-pointer"
              value={selectedEstado}
              onChange={(e) =>
                setSelectedEstado(e.target.value as "APTO" | "NO APTO" | "")
              }
            >
              <option value="">TODOS</option>
              <option value="APTO">APTO</option>
              <option value="NO APTO">NO APTO</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabla de Vencimientos */}
      <div className="flex-1 rounded-xl shadow shadow-border-default p-6 bg-surface-default flex flex-col">
        <div className="w-full">
          {/* Cabecera de Tabla */}
          <div className="flex w-full rounded-md bg-muted-20 list-none py-2 text-xs font-semibold text-brand uppercase">
            <div className="flex h-8 items-center w-16 justify-center divisor">ITEM</div>
            <div className="flex h-8 items-center w-28 justify-center divisor">CÓDIGO</div>
            <div className="flex h-8 items-center flex-1 justify-center divisor">PRODUCTO</div>
            <div className="flex h-8 items-center w-32 justify-center divisor">LOTE</div>
            <div className="flex h-8 items-center w-32 justify-center divisor">CANTIDAD</div>
            <div className="flex h-8 items-center w-40 justify-center divisor">FECHA DE VENC.</div>
            <div className="flex h-8 items-center w-32 justify-center divisor">DÍAS</div>
            <div className="flex h-8 items-center w-40 justify-center divisor">ESTADO</div>
            <div className="flex h-8 items-center w-36 justify-center">ACCIONES</div>
          </div>

          {/* Cuerpo de Tabla */}
          <div className="flex flex-col gap-2 min-h-auto">
            {!hasSelectedAlmacen ? (
              <div className="flex items-center justify-center flex-1 py-12">
                <p className="text-text-secondary font-semibold">
                  Seleccione una sede para consultar lotes.
                </p>
              </div>
            ) : data.length === 0 ? (
              <div className="flex items-center justify-center flex-1 py-12">
                <p className="text-text-secondary font-semibold">
                  No se encontraron registros de lotes.
                </p>
              </div>
            ) : (
              data.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex w-full items-center py-2 text-sm text-text-secondary transition-colors rounded-lg ${
                    selectedItem?.id === item.id
                      ? "bg-red-50 ring-1 ring-red-200"
                      : "hover:bg-surface-light/50"
                  }`}
                >
                  <div className="flex w-16 justify-center">{globalOffset + index + 1}.-</div>
                  <div className="flex w-28 justify-center px-2">{item.codigo}</div>
                  <div className="flex flex-1 justify-center px-2 truncate" title={item.producto}>
                    {item.producto}
                  </div>
                  <div className="flex w-32 justify-center">{item.numeroLote}</div>
                  <div className="flex w-32 justify-center">{item.cantidad}</div>
                  <div className="flex w-40 justify-center">{item.fechaVencimiento}</div>
                  <div className="flex w-32 justify-center">{item.diasRestantes}</div>
                  <div className="flex w-40 justify-center">
                    <div
                      className={`px-6 py-2 rounded-md text-white font-medium text-xs w-28 text-center ${
                        item.estado === "APTO" ? "bg-[#1DA906]" : "bg-[#FF5B45]"
                      }`}
                    >
                      {item.estado}
                    </div>
                  </div>
                  <div className="flex w-36 justify-center">
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedItem(selectedItem?.id === item.id ? null : item)
                      }
                      disabled={item.estado !== "NO APTO"}
                      className={`rounded-md w-28 px-4 py-2 text-xs font-semibold transition-all duration-200 outline-none ${
                        item.estado === "NO APTO"
                          ? selectedItem?.id === item.id
                            ? "bg-red-500 text-white border border-red-500 shadow-sm"
                            : "border border-red-400 text-red-500 hover:bg-red-400 hover:text-white hover:border-red-400"
                          : "border border-border-default text-text-muted opacity-40 cursor-not-allowed"
                      }`}
                    >
                      {selectedItem?.id === item.id ? "Seleccionado" : "Seleccionar"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {totalRegistros > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 text-sm mb-4 border-t border-border-default">
              <div className="text-sm text-text-primary-80">
                Mostrando <span className="font-semibold text-text-primary">{data.length}</span> de{" "}
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
        </div>
      </div>

      {/* Gestión de lotes vencidos */}
      <div className="rounded-xl shadow shadow-border-default p-6 bg-surface-default">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 className="text-lg font-semibold text-brand uppercase">
              Gestión de lotes vencidos
            </h2>
            <p className="mt-1.5 text-sm text-text-secondary max-w-2xl">
              SELECCIONE un lote NO APTO de la tabla para ver sus detalles y registrar la baja. Las
              unidades retiradas se descontarán del almacén y quedarán registradas en kardex.
            </p>
          </div>
          {selectedItem && selectedItem.estado === "NO APTO" ? (
            <button
              type="button"
              onClick={handleDarBajaLote}
              disabled={isProcessing}
              className="rounded-md bg-red-500 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isProcessing ? "Procesando baja..." : "Registrar baja del lote"}
            </button>
          ) : null}
        </div>

        {selectedItem && selectedItem.estado === "NO APTO" ? (
          <div className="mt-5 grid grid-cols-1 md:grid-cols-5 gap-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm">
            <div>
              <p className="text-red-400 uppercase text-xs font-medium tracking-wide">Código</p>
              <p className="font-semibold text-text-primary mt-0.5">{selectedItem.codigo}</p>
            </div>
            <div>
              <p className="text-red-400 uppercase text-xs font-medium tracking-wide">Producto</p>
              <p className="font-semibold text-text-primary mt-0.5">{selectedItem.producto}</p>
            </div>
            <div>
              <p className="text-red-400 uppercase text-xs font-medium tracking-wide">Lote</p>
              <p className="font-semibold text-text-primary mt-0.5">{selectedItem.numeroLote}</p>
            </div>
            <div>
              <p className="text-red-400 uppercase text-xs font-medium tracking-wide">
                Unidades a retirar
              </p>
              <p className="font-semibold text-red-600 mt-0.5 text-base">{selectedItem.cantidad}</p>
            </div>
            <div>
              <p className="text-red-400 uppercase text-xs font-medium tracking-wide">
                Fecha de vencimiento
              </p>
              <p className="font-semibold text-text-primary mt-0.5">{selectedItem.fechaVencimiento}</p>
            </div>
          </div>
        ) : (
          <div className="mt-5 rounded-lg border border-dashed border-border-default p-4 text-sm text-text-secondary flex items-center gap-3">
            <i className="fa-regular fa-hand-pointer text-text-muted text-base" />
            <span>
              SELECCIONE en la tabla un lote con estado{" "}
              <strong className="text-text-primary">NO APTO</strong> para revisar sus datos y registrar la
              baja.
            </span>
          </div>
        )}
      </div>

      {/* Botón Exportar */}
      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={handleExport}
          disabled={!hasSelectedAlmacen || data.length === 0}
          className="rounded-md bg-brand px-6 py-2 text-sm font-medium text-white hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          EXPORTAR
        </button>
      </div>
    </div>
  );
};
export default SemaforoVencimientos;
