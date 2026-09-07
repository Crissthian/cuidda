import Skeleton from "@/components/ui/Skeleton";
import { sedesMock, type ParteDiarioEmpresaRow } from "@/lib/parteDiarioData";
import { useState } from "react";

interface TablaEmpresasProps {
  data?: ParteDiarioEmpresaRow[];
  onFilter?: (filters: {
    sede: string;
    empresa: string;
    fechaInicio: string;
    fechaFin: string;
  }) => void;
  onPageChange?: (page: number) => void;
  loading?: boolean;
  error?: string | null;
  total?: number;
  currentPage?: number;
  totalPages?: number;
}

const GRID_COLUMNS =
  "60px 220px 160px 120px 380px 80px 110px 120px 110px 260px 360px 140px 140px";
const PAGE_SIZE = 20;

/**
 * Tabla de empresas del parte diario con filtros y paginación (mock).
 */
export default function TablaEmpresas({
  data = [],
  onFilter,
  onPageChange,
  loading = false,
  error = null,
  total = 0,
  currentPage = 1,
  totalPages = 1,
}: TablaEmpresasProps) {
  const [filters, setFilters] = useState({
    sede: "",
    empresa: "",
    fechaInicio: "",
    fechaFin: "",
  });

  const handleSearch = () => {
    onFilter?.(filters);
  };

  const startRecord = total > 0 ? (currentPage - 1) * PAGE_SIZE + 1 : 0;
  const endRecord = Math.min(currentPage * PAGE_SIZE, total);

  return (
    <>
      {/* Filtros */}
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
            className="form-input "
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
            htmlFor="empresa-input"
            className="block text-sm font-medium text-text-primary mb-1"
          >
            Empresa
          </label>
          <input
            id="empresa-input"
            type="text"
            placeholder="Empresa"
            className="form-input "
            value={filters.empresa}
            onChange={(e) =>
              setFilters({ ...filters, empresa: e.target.value })
            }
          />
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
            className="form-input "
            value={filters.fechaInicio}
            onChange={(e) =>
              setFilters({ ...filters, fechaInicio: e.target.value })
            }
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
            className="form-input "
            value={filters.fechaFin}
            onChange={(e) =>
              setFilters({ ...filters, fechaFin: e.target.value })
            }
          />
        </div>
        <div className="col-span-2 flex flex-col items-end justify-end">
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
            onClick={handleSearch}
          >
            BUSCAR
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
          className="grid w-full min-w-400 bg-surface-light text-xs uppercase text-center"
          style={{ gridTemplateColumns: GRID_COLUMNS }}
        >
          <div className="p-2 text-text-primary text-center divisor">N°</div>
          <div className="p-2 text-text-primary text-center divisor">EMPRESA</div>
          <div className="p-2 text-text-primary text-center divisor">FECHA DE ATENCIÓN</div>
          <div className="p-2 text-text-primary text-center divisor">HORA DE ATENCIÓN</div>
          <div className="p-2 text-text-primary text-center divisor">APELLIDOS Y NOMBRES</div>
          <div className="p-2 text-text-primary text-center divisor">EDAD</div>
          <div className="p-2 text-text-primary text-center divisor">CÓDIGO</div>
          <div className="p-2 text-text-primary text-center divisor">PROCEDENCIA</div>
          <div className="p-2 text-text-primary text-center divisor">PLANILLA</div>
          <div className="p-2 text-text-primary text-center divisor">DIAGNÓSTICO</div>
          <div className="p-2 text-text-primary text-center divisor">TRATAMIENTO</div>
          <div className="p-2 text-text-primary text-left divisor">FIRMA PACIENTE</div>
          <div className="p-2 text-text-primary text-left divisor">FIRMA MÉDICO</div>
        </div>

        {/* Cuerpo */}
        {loading ? (
          Array.from({ length: 8 }).map((_, rowIdx) => (
            <div
              key={rowIdx}
              className={rowIdx < 7 ? "grid w-full border-b-2" : "grid w-full"}
              style={{
                gridTemplateColumns: GRID_COLUMNS,
                borderColor: "var(--color-surface-light)",
                borderStyle: "dashed",
              }}
            >
              {Array.from({ length: 13 }).map((__, cellIdx) => (
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
              className={`grid w-full text-sm text-text-primary ${index < data.length - 1 ? "border-b-2" : ""}`}
              style={{
                gridTemplateColumns: GRID_COLUMNS,
                borderColor: "var(--color-surface-light)",
                borderStyle: "dashed",
              }}
            >
              <div className="p-2 text-center">{row.id}</div>
              <div className="p-2 text-left indent-4">{row.empresa}</div>
              <div className="p-2 text-center">{row.fechaAtencion}</div>
              <div className="p-2 text-center">{row.horaAtencion}</div>
              <div className="p-2 text-left indent-4">{row.apellidosNombres}</div>
              <div className="p-2 text-center">{row.edad}</div>
              <div className="p-2 text-center">{row.codigo}</div>
              <div className="p-2 text-center">{row.procedencia}</div>
              <div className="p-2 text-center">{row.planilla}</div>
              <div className="p-2 text-left">{row.diagnostico}</div>
              <div className="p-2 text-left">{row.tratamiento}</div>
              <div className="p-2 text-left"></div>
              <div className="p-2 text-left"></div>
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
            onClick={() => onPageChange?.(currentPage - 1)}
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
                    onClick={() => onPageChange?.(page)}
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
            onClick={() => onPageChange?.(currentPage + 1)}
            disabled={currentPage === totalPages || loading}
          >
            Siguiente
          </button>
        </div>
      )}
    </>
  );
}
