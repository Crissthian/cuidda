import Skeleton from "@/components/ui/Skeleton";
import { atencionesTriajeMock, type AtencionTriaje } from "@/lib/triajeData";
import { useCallback, useEffect, useState } from "react";
import type { FiltrosTriaje } from "./triaje.types";

interface ListaPacientesTriajeProps {
  filtros: FiltrosTriaje;
  refreshKey: number;
  onAbrirModal: (atencionID: string, estado: string) => void;
}

const GRID_COLUMNS = "8% 25% 12% 20% 10% 8% 10% 7%";
const itemsPerPage = 20;

/**
 * Lista de pacientes en espera de triaje con filtros y paginación (mock).
 */
export default function ListaPacientesTriaje({
  filtros,
  refreshKey,
  onAbrirModal,
}: ListaPacientesTriajeProps) {
  const [pacientes, setPacientes] = useState<AtencionTriaje[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatFecha = (fecha: string) => {
    if (!fecha) return "";
    return fecha.split("T")[0]?.split("-").reverse().join("/") ?? "";
  };

  const cargarPacientesTriaje = useCallback(
    (page: number, f: FiltrosTriaje) => {
      setIsLoading(true);
      setError(null);

      window.setTimeout(() => {
        const filtered = atencionesTriajeMock.filter((p) => {
          const matchApellido =
            !f.apellidoPaciente ||
            p.apellido_paciente
              .toLowerCase()
              .includes(f.apellidoPaciente.toLowerCase());
          const matchMedico =
            !f.nombreMedico ||
            p.nombre_medico
              .toLowerCase()
              .includes(f.nombreMedico.toLowerCase());
          const matchEstado = !f.estado || p.estado_atencion === f.estado;
          return matchApellido && matchMedico && matchEstado;
        });

        const total = filtered.length;
        const pages = Math.max(1, Math.ceil(total / itemsPerPage));
        const safePage = Math.min(page, pages);

        setCurrentPage(safePage);
        setTotalRecords(total);
        setTotalPages(pages);
        setPacientes(
          filtered.slice(
            (safePage - 1) * itemsPerPage,
            safePage * itemsPerPage,
          ),
        );
        setIsLoading(false);
      }, 400);
    },
    [],
  );

  useEffect(() => {
    cargarPacientesTriaje(1, filtros);
  }, [filtros, refreshKey, cargarPacientesTriaje]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      cargarPacientesTriaje(newPage, filtros);
    }
  };

  return (
    <div>
      <div className="border-collapse text-sm shadow-lg px-6 pb-4 relative">
        <div className="flex justify-between items-center pr-4 pt-4 min-h-10 mb-2">
          <div id="totalRecords" className="text-text-primary font-medium">
            Total registros: {totalRecords}
          </div>
          <div className="w-10 opacity-0"></div>
        </div>

        {/* Cabecera */}
        <div
          className="grid bg-surface-light text-brand text-xs items-center"
          style={{ gridTemplateColumns: GRID_COLUMNS }}
        >
          <div className="p-2 divisor text-center font-normal">
            <i className="fas fa-file-alt mr-1"></i> CÓDIGO
          </div>
          <div className="p-2 divisor text-center font-normal">
            <i className="fas fa-file-alt mr-1"></i> APELLIDOS Y NOMBRES
          </div>
          <div className="p-2 divisor text-center font-normal">
            <i className="fas fa-file-alt mr-1"></i> ÁREA DE ATENCIÓN
          </div>
          <div className="p-2 divisor text-center font-normal">
            <i className="fas fa-user-md mr-1"></i> MÉDICO
          </div>
          <div className="p-2 divisor text-center font-normal">
            <i className="fas fa-calendar mr-1"></i> FECHA DE <br /> INGRESO
          </div>
          <div className="p-2 divisor text-center font-normal">
            <i className="fas fa-clock mr-1"></i> HORA DE <br /> INGRESO
          </div>
          <div className="p-2 divisor text-center font-normal">
            <i className="fas fa-file-medical mr-1"></i> TRIAJE
          </div>
          <div className="p-2 text-center font-normal">
            <i className="fas fa-info-circle mr-1"></i> ESTADO
          </div>
        </div>

        {/* Cuerpo */}
        {isLoading ? (
          Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className="grid border-b border-dashed border-brand"
              style={{ gridTemplateColumns: GRID_COLUMNS }}
            >
              <div className="p-2">
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="p-2">
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="p-2">
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="p-2">
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="p-2">
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="p-2">
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="p-2">
                <Skeleton className="h-8 w-20 mx-auto" />
              </div>
              <div className="p-2">
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))
        ) : error ? (
          <div className="py-8 text-center">
            <div className="flex flex-col items-center justify-center text-warning">
              <i className="fas fa-exclamation-triangle text-3xl mb-2"></i>
              <p className="font-medium">{error}</p>
              <button
                type="button"
                onClick={() => cargarPacientesTriaje(currentPage, filtros)}
                className="mt-2 text-brand hover:underline"
              >
                Intentar nuevamente
              </button>
            </div>
          </div>
        ) : pacientes.length === 0 ? (
          <div className="p-2 text-center text-gray-500">
            No se encontraron pacientes para los filtros seleccionados
          </div>
        ) : (
          pacientes.map((p) => {
            const estado = p.estado_atencion?.trim();
            const esEstadoCulminado = estado === "1" || estado === "2";

            return (
              <div
                key={p.codigo_atencion}
                className="grid hover:bg-muted-20 border-b border-dashed border-brand cursor-pointer text-text-primary items-center"
                style={{ gridTemplateColumns: GRID_COLUMNS }}
              >
                <div className="text-center p-2">#{p.codigo_atencion}</div>
                <div className="p-2 uppercase ps-4">
                  {p.apellido_paciente} {p.nombre_paciente}
                </div>
                <div className="text-center p-2">
                  {p.descripcion_especialidad}
                </div>
                <div className="p-2 uppercase ps-4">{p.nombre_medico}</div>
                <div className="text-center p-2">
                  {formatFecha(p.fecha_atencion)}
                </div>
                <div className="text-center p-2">
                  {p.hora_atencion?.trim() || ""}
                </div>
                <div className="p-2 text-center">
                  <button
                    type="button"
                    onClick={() => onAbrirModal(p.codigo_atencion, estado)}
                    className={`rounded-lg p-2 font-semibold transition-opacity cursor-pointer hover:opacity-90 w-28 ${
                      esEstadoCulminado
                        ? "bg-muted text-white"
                        : "bg-brand text-success"
                    }`}
                  >
                    {esEstadoCulminado ? "Ver" : "Iniciar"}
                  </button>
                </div>
                <div
                  className={`p-2 text-center text-sm ${
                    esEstadoCulminado ? "" : "text-warning"
                  }`}
                >
                  {esEstadoCulminado ? "Culminado" : "En espera"}
                </div>
              </div>
            );
          })
        )}

        {/* Botones Paginación */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-6 pt-4 text-sm my-4 border-t border-border-default">
          <div className="text-sm text-text-primary-80">
            Mostrando{" "}
            <span className="font-semibold text-text-primary">
              {pacientes.length}
            </span>{" "}
            de{" "}
            <span className="font-semibold text-text-primary">
              {totalRecords}
            </span>{" "}
            registros
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2  rounded-md p-1 shadow-sm">
              <button
                type="button"
                aria-label="Anterior"
                title="Anterior"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors border   ${
                  currentPage === 1
                    ? "bg-card-bg text-accent-content cursor-not-allowed opacity-60 border-border-default"
                    : "bg-card-bg border-border-default text-accent-content"
                }`}
              >
                <i className="fas fa-chevron-left"></i>
                <span className="hidden sm:inline">Anterior</span>
              </button>

              <div className="px-3 text-sm font-medium text-text-primary select-none">
                Página {currentPage} de {totalPages}
              </div>

              <button
                type="button"
                aria-label="Siguiente"
                title="Siguiente"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors border  ${
                  currentPage === totalPages || totalPages === 0
                    ? "bg-card-bg text-accent-content cursor-not-allowed opacity-60 border-border-default"
                    : "bg-card-bg border-border-default text-accent-content"
                }`}
              >
                <span className="hidden sm:inline">Siguiente</span>
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}