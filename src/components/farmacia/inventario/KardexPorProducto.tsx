import PDFKardexPorProducto from "@/components/farmacia/inventario/PDFKardexPorProducto";
import {
  kardexRowsData,
  medicamentosBusquedaData,
  type KardexProductoRow,
  type MedicamentoBusquedaOption,
} from "@/lib/farmaciaData";
import { SEDES } from "@/lib/sedes";
import { Loader2, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

/** Normaliza texto para búsquedas: sin acentos y en minúsculas. */
const normalizar = (valor: string) =>
  valor
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

/** Convierte una fecha "DD/MM/YYYY" a "YYYY-MM-DD" para compararla con los inputs date. */
const aFechaIso = (fecha: string) => {
  const [dia, mes, anio] = fecha.split("/");
  return `${anio}-${mes}-${dia}`;
};

export const KardexPorProducto = () => {
  const [productoFiltro, setProductoFiltro] = useState<"todos" | "seleccionar">(
    "todos",
  );
  const [almacenFiltro, setAlmacenFiltro] = useState<string>("");
  const [fechaDesde, setFechaDesde] = useState<string>("2026-09-01");
  const [fechaHasta, setFechaHasta] = useState<string>("2026-09-30");

  const [kardexRows, setKardexRows] = useState<KardexProductoRow[]>([]);
  const [totalRegistros, setTotalRegistros] = useState<number>(0);
  const [isLoadingKardex, setIsLoadingKardex] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedMedicamento, setSelectedMedicamento] =
    useState<MedicamentoBusquedaOption | null>(null);
  const [searchResults, setSearchResults] = useState<
    MedicamentoBusquedaOption[]
  >([]);
  const [isSearchingName, setIsSearchingName] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const lastSelectedNameRef = useRef<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 100;

  const totalPages = Math.max(1, Math.ceil(totalRegistros / pageSize));
  const globalOffset = (currentPage - 1) * pageSize;

  // Autocompletado de productos (debounce 300ms, mínimo 3 caracteres)
  useEffect(() => {
    if (searchTerm.trim().length < 3) {
      setSearchResults([]);
      setIsSearchingName(false);
      setShowDropdown(false);
      return;
    }

    if (searchTerm.toUpperCase() === lastSelectedNameRef.current) {
      setIsSearchingName(false);
      setShowDropdown(false);
      return;
    }

    setShowDropdown(true);
    setIsSearchingName(true);

    const timer = setTimeout(() => {
      const term = normalizar(searchTerm.trim());
      const results = medicamentosBusquedaData.filter(
        (m) =>
          normalizar(m.nombre).includes(term) ||
          normalizar(m.codigo).includes(term),
      );
      setSearchResults(results);
      setIsSearchingName(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const currentRows = useMemo(() => {
    return kardexRows.slice(globalOffset, globalOffset + pageSize);
  }, [kardexRows, globalOffset, pageSize]);

  const totals = useMemo(() => {
    let ingresos = 0;
    let salidas = 0;
    const stockAnterior =
      currentRows.length > 0 ? currentRows[0].stockAnterior : 0;
    const stockActual =
      currentRows.length > 0
        ? currentRows[currentRows.length - 1].stockActual
        : 0;

    currentRows.forEach((r) => {
      if (typeof r.ingresos === "number") ingresos += r.ingresos;
      if (typeof r.salidas === "number") salidas += r.salidas;
    });

    return { ingresos, salidas, stockAnterior, stockActual };
  }, [currentRows]);

  const handleSelectMedicamento = (med: MedicamentoBusquedaOption) => {
    lastSelectedNameRef.current = med.nombre.toUpperCase();
    setSelectedMedicamento(med);
    setSearchTerm(med.nombre);
    setShowDropdown(false);
    setKardexRows([]);
    setTotalRegistros(0);
    setCurrentPage(1);
    setHasSearched(false);
  };

  const handleBuscarKardex = (forceMode?: "todos" | "seleccionar") => {
    const currentMode = forceMode ?? productoFiltro;

    if (!almacenFiltro) {
      toast.error("Debe seleccionar una sede para consultar el kardex");
      return;
    }

    if (currentMode === "seleccionar" && !selectedMedicamento) {
      toast.error("Debe seleccionar un producto para consultar el kardex");
      return;
    }

    if (fechaDesde && fechaHasta && fechaDesde > fechaHasta) {
      toast.error("La fecha desde no puede ser mayor que la fecha hasta");
      return;
    }

    setIsLoadingKardex(true);
    setCurrentPage(1);

    setTimeout(() => {
      const rows = kardexRowsData.filter((row) => {
        if (
          currentMode === "seleccionar" &&
          selectedMedicamento &&
          row.codigo !== selectedMedicamento.codigo
        ) {
          return false;
        }

        const fechaIso = aFechaIso(row.fecha);
        if (fechaDesde && fechaIso < fechaDesde) return false;
        if (fechaHasta && fechaIso > fechaHasta) return false;

        return true;
      });

      setKardexRows(rows);
      setTotalRegistros(rows.length);
      setHasSearched(true);
      setIsLoadingKardex(false);
    }, 300);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  const almacenNombre = almacenFiltro || "Seleccione una sede";

  return (
    <div className="w-full pb-8 space-y-5">
      {/* ── Filtros ── */}
      <div className="bg-surface-default px-8 py-2 flex flex-col gap-6">
        {/* Fila 1: Producto */}
        <div className="flex items-center gap-6">
          <span className="font-bold text-text-primary text-base shrink-0">
            Producto:
          </span>

          <div className="flex items-center gap-8">
            <label className="flex cursor-pointer items-center gap-3">
              <span className="text-text-primary">Todos</span>
              <input
                type="radio"
                name="producto_filtro"
                value="todos"
                checked={productoFiltro === "todos"}
                onChange={() => {
                  setProductoFiltro("todos");
                  setSearchTerm("");
                  setSelectedMedicamento(null);
                  setKardexRows([]);
                  setTotalRegistros(0);
                  setCurrentPage(1);
                  setHasSearched(false);
                  if (almacenFiltro) handleBuscarKardex("todos");
                }}
                className="radio size-6 align-middle text-surface-light checked:accent-brand checked:text-brand bg-muted-30"
              />
            </label>

            <label className="flex cursor-pointer items-center gap-3">
              <span className="text-text-primary">Seleccionar</span>
              <input
                type="radio"
                name="producto_filtro"
                value="seleccionar"
                checked={productoFiltro === "seleccionar"}
                onChange={() => {
                  setProductoFiltro("seleccionar");
                  setKardexRows([]);
                  setTotalRegistros(0);
                  setCurrentPage(1);
                  setHasSearched(false);
                }}
                className="radio size-6 align-middle text-surface-light checked:accent-brand checked:text-brand bg-muted-30"
              />
            </label>
          </div>

          <div className="relative flex-1 max-w-100">
            <div className="relative flex items-center">
              <input
                type="text"
                autoComplete="off"
                placeholder={
                  productoFiltro === "todos"
                    ? "TODOS LOS PRODUCTOS"
                    : "BUSCAR PRODUCTO..."
                }
                disabled={productoFiltro === "todos"}
                value={productoFiltro === "todos" ? "" : searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setSelectedMedicamento(null);
                  setKardexRows([]);
                  setTotalRegistros(0);
                  setCurrentPage(1);
                  setHasSearched(false);
                }}
                onFocus={() => {
                  if (
                    searchTerm.trim().length >= 3 &&
                    searchTerm.toUpperCase() !== lastSelectedNameRef.current
                  ) {
                    setShowDropdown(true);
                  }
                }}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                className="w-full form-input rounded-md py-2 bg-surface-light px-4 text-text-primary outline-none disabled:opacity-50 transition-colors uppercase pl-4 pr-10 disabled:cursor-not-allowed"
              />
              <div className="absolute right-3 text-text-secondary disabled:opacity-50">
                {isSearchingName ? (
                  <Loader2 className="size-5 animate-spin text-brand" />
                ) : (
                  <Search
                    className={`size-5 ${
                      productoFiltro === "todos" ? "opacity-50" : ""
                    }`}
                  />
                )}
              </div>
            </div>

            {/* Dropdown de Autocompletado */}
            {showDropdown &&
              searchResults.length > 0 &&
              productoFiltro === "seleccionar" && (
                <div className="absolute z-50 top-full mt-2 w-full bg-white border border-border-default rounded-lg shadow-lg overflow-hidden max-h-80 overflow-y-auto">
                  <ul className="flex flex-col">
                    {searchResults.map((item, index) => (
                      <li
                        key={`${item.codigo}-${index}`}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleSelectMedicamento(item);
                        }}
                        className="p-2 hover:bg-brand/10 cursor-pointer border-b border-border-default last:border-b-0 transition-colors"
                      >
                        <div className="font-bold text-brand truncate uppercase">
                          {item.nombre}
                          <span className="px-2 py-0.5 rounded text-text-secondary">
                            - {item.codigo}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        </div>

        {/* Fila 2: Almacén + Fechas + Buscar */}
        <div className="flex items-center gap-6">
          <span className="font-bold text-text-primary text-base shrink-0">
            Almacén
          </span>
          <div className="relative w-52">
            <select
              className="w-full form-input rounded-md py-2 bg-surface-light px-4 text-text-primary outline-none cursor-pointer"
              value={almacenFiltro}
              onChange={(e) => {
                setAlmacenFiltro(e.target.value);
                setKardexRows([]);
                setTotalRegistros(0);
                setCurrentPage(1);
                setHasSearched(false);
              }}
            >
              <option value="" disabled>
                SELECCIONE
              </option>
              {SEDES.map((sede) => (
                <option key={sede} value={sede}>
                  {sede}
                </option>
              ))}
            </select>
          </div>

          <span className="font-bold text-text-primary text-base shrink-0 ml-3">
            Desde:
          </span>
          <div className="relative w-48">
            <input
              type="date"
              value={fechaDesde}
              onChange={(e) => {
                setFechaDesde(e.target.value);
                setKardexRows([]);
                setTotalRegistros(0);
                setCurrentPage(1);
                setHasSearched(false);
              }}
              className="w-full py-2 rounded-md bg-surface-light px-2 text-text-secondary outline-none"
            />
          </div>

          <span className="font-bold text-text-primary text-base shrink-0 ml-1">
            Hasta:
          </span>
          <div className="relative w-48">
            <input
              type="date"
              value={fechaHasta}
              onChange={(e) => {
                setFechaHasta(e.target.value);
                setKardexRows([]);
                setTotalRegistros(0);
                setCurrentPage(1);
                setHasSearched(false);
              }}
              className="w-full py-2 rounded-md bg-surface-light px-2 text-text-secondary outline-none"
            />
          </div>

          <div className="ml-auto">
            <button
              type="button"
              onClick={() => handleBuscarKardex()}
              disabled={
                isLoadingKardex ||
                !almacenFiltro ||
                (productoFiltro === "seleccionar" && !selectedMedicamento)
              }
              className="px-8 py-2 rounded-md text-sm bg-brand hover:bg-brand/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold transition-colors"
            >
              BUSCAR
            </button>
          </div>
        </div>
      </div>

      {/* ── Tabla ── */}
      <div className="bg-surface-default border border-border-subtle/30 rounded-lg shadow-sm p-6 mx-6">
        {/* Header */}
        <div className="grid grid-cols-[50px_0.5fr_0.5fr_0.6fr_1.5fr_150px_80px_80px_100px_100px] bg-muted-20 rounded-md text-brand text-xs text-center font-bold uppercase">
          <div className="divisor py-2 flex items-center justify-center">
            ITEM
          </div>
          <div className="divisor py-2 flex items-center justify-center">
            CÓDIGO
          </div>
          <div className="divisor py-2 flex items-center justify-center">
            FECHA
          </div>
          <div className="divisor py-2 flex items-center justify-center">
            TIPO DE MOVIMIENTO
          </div>
          <div className="divisor py-2 flex items-center justify-center">
            CLIENTE / PROVEEDOR
          </div>
          <div className="divisor py-2 flex items-center justify-center">
            DOC DE REF.
          </div>
          <div className="divisor py-2 flex items-center justify-center">
            INGRESOS
          </div>
          <div className="divisor py-2 flex items-center justify-center">
            SALIDAS
          </div>
          <div className="divisor py-2 flex items-center justify-center">
            STOCK <br /> ANTERIOR
          </div>
          <div className="divisor py-2 flex items-center justify-center">
            STOCK <br /> ACTUAL
          </div>
        </div>

        {/* Rows */}
        <div className="flex flex-col text-text-secondary font-medium min-h-auto">
          {isLoadingKardex ? (
            <div className="flex items-center justify-center flex-1 py-12">
              <Loader2 className="size-7 animate-spin text-brand mr-2" />
              <p>Cargando movimientos de kardex...</p>
            </div>
          ) : !almacenFiltro ? (
            <div className="flex items-center justify-center flex-1 py-12">
              <p>Seleccione una sede para consultar el kardex.</p>
            </div>
          ) : productoFiltro === "seleccionar" && !selectedMedicamento ? (
            <div className="flex items-center justify-center flex-1 py-12">
              <p>Seleccione un producto para listar su kardex.</p>
            </div>
          ) : !hasSearched ? (
            <div className="flex items-center justify-center flex-1 py-12">
              <p>Presione BUSCAR para consultar el kardex.</p>
            </div>
          ) : currentRows.length === 0 ? (
            <div className="flex items-center justify-center flex-1 py-12">
              <p>
                No se encontraron movimientos para los filtros seleccionados.
              </p>
            </div>
          ) : (
            currentRows.map((row, index) => (
              <div
                key={`${row.idKardex}-${index}`}
                className="grid grid-cols-[50px_0.5fr_0.5fr_0.6fr_1.5fr_150px_80px_80px_100px_100px] text-center justify-items-center text-sm py-3.5 border-b border-border-default border-dashed last:border-b-0 hover:bg-surface-light transition-colors"
              >
                <span className="flex items-center px-2">
                  {globalOffset + index + 1}.-
                </span>
                <span className="flex items-center px-2">{row.codigo}</span>
                <span className="flex items-center px-2">{row.fecha}</span>
                <span className="flex items-center px-2 font-semibold text-text-primary">
                  {row.tipoMovimiento}
                </span>
                <span
                  className="flex items-center px-2 truncate"
                  title={row.clienteProveedor}
                >
                  {row.clienteProveedor}
                </span>
                <span className="flex items-center px-2">{row.docRef}</span>
                <span className="flex items-center px-2">{row.ingresos}</span>
                <span className="flex items-center px-2">{row.salidas}</span>
                <span className="flex items-center px-2">
                  {row.stockAnterior}
                </span>
                <span className="flex items-center px-2">
                  {row.stockActual}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Paginación */}
        {!isLoadingKardex && totalRegistros > 0 && (
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
                  disabled={currentPage === 1 || isLoadingKardex}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors border focus:ring-2 focus:ring-offset-1 focus:ring-brand ${
                    currentPage === 1 || isLoadingKardex
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
                  disabled={currentPage === totalPages || isLoadingKardex}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors border focus:ring-2 focus:ring-offset-1 focus:ring-brand ${
                    currentPage === totalPages || isLoadingKardex
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

        {/* Totales */}
        <div className="mt-6 pt-6 border-t-2 border-dashed border-border-subtle/50">
          <div className="grid grid-cols-[50px_110px_80px_minmax(130px,1fr)_minmax(160px,1.2fr)_100px_80px_80px_100px_100px] items-center text-brand">
            <span className="col-span-6 text-right pr-6 font-bold tracking-widest uppercase text-lg">
              TOTALES (PAGINA)
            </span>
            <span className="flex items-center justify-center font-bold text-lg">
              {totals.ingresos}
            </span>
            <span className="flex items-center justify-center font-bold text-lg">
              {totals.salidas}
            </span>
            <span className="flex items-center justify-center font-bold text-lg">
              {totals.stockAnterior}
            </span>
            <span className="flex items-center justify-center font-bold text-lg">
              {totals.stockActual}
            </span>
          </div>
        </div>
      </div>

      {/* ── Imprimir ── */}
      <div className="flex justify-end pr-2">
        <PDFKardexPorProducto
          data={kardexRows}
          almacenNombre={almacenNombre}
          fechaDesde={fechaDesde || undefined}
          fechaHasta={fechaHasta || undefined}
          productoNombre={
            productoFiltro === "seleccionar" ? searchTerm : undefined
          }
          disabled={
            isLoadingKardex || !almacenFiltro || kardexRows.length === 0
          }
        />
      </div>
    </div>
  );
};
export default KardexPorProducto;
