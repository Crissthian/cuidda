import Skeleton from "@/components/ui/Skeleton";
import {
  parteDiarioOtrosMock,
  sedesMock,
  type ParteDiarioOtrosRow,
} from "@/lib/parteDiarioData";
import { useEffect, useState } from "react";

const GRID_COLUMNS = "7% 7% 7% 15% 7% 10% 15% 10% 9% 13%";
const PAGE_SIZE = 20;

/**
 * Tabla para atenciones varias del parte diario con filtros por sede y rango de fechas (mock).
 */
export default function OtrosTabla() {
  const [filters, setFilters] = useState({
    sede: "",
    fechaInicio: "",
    fechaFin: "",
  });
  const [data, setData] = useState<ParteDiarioOtrosRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [activeFilters, setActiveFilters] = useState({
    sede: "",
    fechaInicio: "",
    fechaFin: "",
  });

  const fetchPage = (page: number, f: typeof activeFilters) => {
    setLoading(true);
    setError(null);

    window.setTimeout(() => {
      const filtered = parteDiarioOtrosMock.filter((row) => {
        const matchSede =
          !f.sede ||
          (f.sede === "001" &&
            ["QUISPE RAMOS LUIS", "CHAVEZ LOAYZA MARIA"].includes(
              row.apellidosNombres,
            ));
        const matchFechaInicio =
          !f.fechaInicio ||
          row.fechaAtencion.split("/").reverse().join("-") >= f.fechaInicio;
        const matchFechaFin =
          !f.fechaFin ||
          row.fechaAtencion.split("/").reverse().join("-") <= f.fechaFin;
        return matchSede && matchFechaInicio && matchFechaFin;
      });

      const totalRows = filtered.length;
      const pages = Math.max(1, Math.ceil(totalRows / PAGE_SIZE));
      const safePage = Math.min(page, pages);

      setData(
        filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
      );
      setTotal(totalRows);
      setTotalPages(pages);
      setCurrentPage(safePage);
      setLoading(false);
    }, 400);
  };

  useEffect(() => {
    fetchPage(1, { sede: "", fechaInicio: "", fechaFin: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBuscar = () => {
    setActiveFilters(filters);
    fetchPage(1, filters);
  };

  const handlePageChange = (page: number) => {
    fetchPage(page, activeFilters);
  };

  const startRecord = total > 0 ? (currentPage - 1) * PAGE_SIZE + 1 : 0;
  const endRecord = Math.min(currentPage * PAGE_SIZE, total);

  return (
    <>
      <div className="grid grid-cols-10 gap-4 mb-6">
        <div className="col-span-2">
          <label
            htmlFor="sede-select"
            className="block text-sm font-medium text-text-primary mb-1"
          >
            Sede
          </label>
          <select
            id="sede-select"
            className="form-input py-2.5"
            value={filters.sede}
            onChange={(e) => setFilters({ ...filters, sede: e.target.value })}
          >
            <option value="">SELECCIONE</option>
            {sedesMock.map((sede) => (
              <option key={sede.id} value={sede.id}>
                {sede.sede}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-2">
          <label
            htmlFor="fecha-inicio"
            className="block text-sm font-medium text-text-primary mb-1"
          >
            Fecha inicio
          </label>
          <input
            id="fecha-inicio"
            type="date"
            className="form-input py-2.5"
            value={filters.fechaInicio}
            onChange={(e) =>
              setFilters({ ...filters, fechaInicio: e.target.value })
            }
            max={filters.fechaFin || undefined}
          />
        </div>
        <div className="col-span-2">
          <label
            htmlFor="fecha-fin"
            className="block text-sm font-medium text-text-primary mb-1"
          >
            Fecha fin
          </label>
          <input
            id="fecha-fin"
            type="date"
            className="form-input py-2.5"
            value={filters.fechaFin}
            onChange={(e) => setFilters({ ...filters, fechaFin: e.target.value })}
            min={filters.fechaInicio || undefined}
          />
        </div>
        <div className="col-span-2 col-start-9 flex flex-col items-end justify-end">
          <label
            htmlFor="buscar-btn"
            className="block text-sm font-medium text-text-primary mb-1 text-center"
          >
            &nbsp;&nbsp;
          </label>
          <button
            id="buscar-btn"
            type="button"
            className="w-38 py-2 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90 cursor-pointer"
            style={{ backgroundColor: "var(--color-brand)" }}
            onClick={handleBuscar}
            disabled={loading}
          >
            {loading ? "BUSCANDO..." : "BUSCAR"}
          </button>
        </div>
      </div>

      {/* Información de paginación */}
      {total > 0 && (
        <div className="mb-4 text-sm text-text-primary">
          Mostrando {startRecord} - {endRecord} de {total} registros
        </div>
      )}

      {/* Tabla */}
      <div className="overflow-x-auto">
        {/* Cabecera */}
        <div
          className="grid bg-surface-light text-xs uppercase text-center items-center"
          style={{ gridTemplateColumns: GRID_COLUMNS }}
        >
          <div className="p-2.5 divisor">FECHA DE ATENCIÓN</div>
          <div className="p-2.5 divisor">HORA DE ATENCIÓN</div>
          <div className="p-2.5 divisor">DNI</div>
          <div className="p-2.5 divisor">APELLIDOS Y NOMBRES</div>
          <div className="p-2.5 divisor">EDAD</div>
          <div className="p-2.5 divisor">ÁREA DE ATENCIÓN</div>
          <div className="p-2.5 divisor">DETALLE DE ATENCIÓN</div>
          <div className="p-2.5 divisor">CELULAR</div>
          <div className="p-2.5 divisor">COSTO</div>
          <div className="p-2.5 divisor">NRO DE COMPROBANTE</div>
        </div>

        {/* Cuerpo */}
        {loading ? (
          Array.from({ length: 8 }).map((_, rowIdx) => (
            <div
              key={rowIdx}
              className="grid border-b-2"
              style={{
                gridTemplateColumns: GRID_COLUMNS,
                borderColor: "var(--color-surface-light)",
                borderStyle: "dashed",
              }}
            >
              {Array.from({ length: 10 }).map((__, cellIdx) => (
                <div key={cellIdx} className="p-2">
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          ))
        ) : error ? (
          <div className="px-16 py-6 text-sm text-warning">{error}</div>
        ) : data.length === 0 ? (
          <div className="px-16 py-6 text-sm text-text-primary">
            Utilice los filtros y presione BUSCAR para mostrar resultados
          </div>
        ) : (
          data.map((row, index) => (
            <div
              key={index}
              className="grid text-sm text-text-primary hover:bg-surface-light"
              style={{
                gridTemplateColumns: GRID_COLUMNS,
                borderColor: "var(--color-surface-light)",
                borderStyle: "dashed",
                borderBottomWidth: index < data.length - 1 ? 2 : 0,
              }}
            >
              <div className="p-2.5 text-center">{row.fechaAtencion}</div>
              <div className="p-2.5 text-center">{row.horaAtencion}</div>
              <div className="p-2.5 text-center">{row.dni}</div>
              <div className="p-2.5 text-left ">{row.apellidosNombres}</div>
              <div className="p-2.5 text-center">{row.edad}</div>
              <div className="p-2.5 text-center">{row.areaAtencion}</div>
              <div className="p-2.5 text-left">{row.detalleAtencion}</div>
              <div className="p-2.5 text-center">{row.celular}</div>
              <div className="p-2.5 text-center">{row.costo}</div>
              <div className="p-2.5 text-center">{row.nroComprobante}</div>
            </div>
          ))
        )}
      </div>

      {/* Controles de paginación */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            type="button"
            className="px-4 py-2 rounded-lg bg-surface-light text-text-primary text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand hover:text-white transition-all"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || loading}
          >
            Anterior
          </button>

          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    type="button"
                    key={page}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      page === currentPage
                        ? "bg-brand text-white"
                        : "bg-surface-light text-text-primary hover:bg-brand hover:text-white"
                    }`}
                    onClick={() => handlePageChange(page)}
                    disabled={loading}
                  >
                    {page}
                  </button>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <span key={page} className="px-2 py-2 text-text-primary">
                    ...
                  </span>
                );
              }
              return null;
            })}
          </div>

          <button
            type="button"
            className="px-4 py-2 rounded-lg bg-surface-light text-text-primary text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand hover:text-white transition-all"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || loading}
          >
            Siguiente
          </button>
        </div>
      )}
    </>
  );
}