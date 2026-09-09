import React from "react";
import Skeleton from "@/components/ui/Skeleton";
import type { PacienteConsultaMedica } from "@/lib/consultaMedicaData";

interface ListaPacientesConsultaMedicaProps {
  pacientes: PacienteConsultaMedica[];
  loading?: boolean;
  onIniciarConsulta: (codigo: string, estado: string) => void;
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  onPageChange: (page: number) => void;
}

export default function ListaPacientesConsultaMedica({
  pacientes,
  loading = false,
  onIniciarConsulta,
  currentPage,
  totalPages,
  totalRecords,
  onPageChange,
}: ListaPacientesConsultaMedicaProps) {
  const handleStartConsultation = (ev: React.MouseEvent<HTMLButtonElement>) => {
    const codigoSeleccionado = ev.currentTarget.dataset.codigo || "";
    const estadoSeleccionado = ev.currentTarget.dataset.estado || "1";
    onIniciarConsulta(codigoSeleccionado, estadoSeleccionado);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getAccionTexto = (tipoAtencion: string | undefined, estadoAtencion: string) => {
    if (tipoAtencion === "002") return "Emergencia";
    if (estadoAtencion === "1") return "Iniciar";
    return "Ver";
  };

  const getAccionClase = (tipoAtencion: string | undefined, estadoAtencion: string) => {
    if (estadoAtencion === "2" && tipoAtencion === "002") return "bg-muted text-white";
    if (tipoAtencion === "002") return "bg-red-500 text-white";
    if (estadoAtencion === "1") return "bg-brand text-success";
    return "bg-muted text-white";
  };

  const getEstadoBadge = (estadoAtencion: string) =>
    estadoAtencion === "1" ? "text-warning" : "text-text-primary";

  const getEstadoTexto = (estadoAtencion: string) =>
    estadoAtencion === "1" ? "En espera" : "Culminado";

  const formatearFecha = (fechaStr: string) => {
    if (!fechaStr) return "";
    return fechaStr.split("-").reverse().join("/");
  };

  return (
    <div className="px-6 border-collapse text-sm shadow-lg pb-4">
      <div className="flex justify-between items-center pr-4 pt-4 min-h-10 mb-2">
        <div className="text-text-primary font-medium">
          Total registros: {totalRecords}
        </div>
        <div className="w-10 opacity-0"></div>
      </div>

      <div className="relative">
        <table className="w-full">
          <thead className="bg-surface-light text-brand text-xs">
            <tr>
              <th className="p-2 divisor text-center font-normal w-[8%]">
                <i className="fa-solid fa-file-lines mr-1"></i> CÓDIGO
              </th>
              <th className="p-2 divisor text-center font-normal w-[25%]">
                <i className="fa-solid fa-file-lines mr-1"></i> APELLIDOS Y NOMBRES
              </th>
              <th className="p-2 divisor text-center font-normal w-[12%]">
                <i className="fa-solid fa-file-lines mr-1"></i> ÁREA DE ATENCIÓN
              </th>
              <th className="p-2 divisor text-center font-normal w-[20%]">
                <i className="fa-solid fa-user-doctor mr-1"></i> MÉDICO
              </th>
              <th className="p-2 divisor text-center font-normal w-[10%]">
                <i className="fa-solid fa-calendar mr-1"></i> FECHA DE <br /> INGRESO
              </th>
              <th className="p-2 divisor text-center font-normal w-[8%]">
                <i className="fa-solid fa-clock mr-1"></i> HORA DE <br /> INGRESO
              </th>
              <th className="p-2 divisor text-center font-normal w-[10%]">
                <i className="fa-solid fa-file-lines mr-1"></i> CONSULTA
              </th>
              <th className="p-2 text-center font-normal w-[7%]">
                <i className="fa-solid fa-circle-info mr-1"></i> ESTADO
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-default text-text-primary">
            {loading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <tr key={idx} className="border-dashed border-brand">
                  <td className="p-2">
                    <Skeleton className="h-4 w-full" />
                  </td>
                  <td className="p-2">
                    <Skeleton className="h-4 w-full" />
                  </td>
                  <td className="p-2">
                    <Skeleton className="h-4 w-full" />
                  </td>
                  <td className="p-2">
                    <Skeleton className="h-4 w-full" />
                  </td>
                  <td className="p-2">
                    <Skeleton className="h-4 w-full" />
                  </td>
                  <td className="p-2">
                    <Skeleton className="h-4 w-full" />
                  </td>
                  <td className="p-2">
                    <Skeleton className="h-8 w-20 mx-auto" />
                  </td>
                  <td className="p-2">
                    <Skeleton className="h-4 w-full" />
                  </td>
                </tr>
              ))
            ) : pacientes.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-6 text-center text-text-primary">
                  No se encontraron pacientes para los filtros seleccionados.
                </td>
              </tr>
            ) : (
              pacientes.map((patient, index) => (
                <tr
                  key={patient.codigo_atencion + index}
                  className="hover:bg-muted-20 border-dashed border-brand"
                >
                  <td className="p-2 cursor-pointer text-center">
                    #{patient.codigo_atencion}
                  </td>
                  <td className="p-2 cursor-pointer ps-4 uppercase">
                    {patient.apellido_paciente} {patient.nombre_paciente}
                  </td>
                  <td className="p-2 cursor-pointer text-center">
                    {patient.descripcion_especialidad}
                  </td>
                  <td className="p-2 cursor-pointer ps-4">{patient.nombre_medico}</td>
                  <td className="p-2 cursor-pointer text-center">
                    {formatearFecha(patient.fecha_atencion)}
                  </td>
                  <td className="p-2 cursor-pointer text-center">
                    {patient.hora_atencion}
                  </td>
                  <td className="p-2 cursor-pointer text-center">
                    <button
                      type="button"
                      onClick={handleStartConsultation}
                      data-estado={patient.estado_atencion}
                      data-codigo={patient.codigo_atencion}
                      className={`rounded-lg p-2 font-semibold transition-opacity cursor-pointer hover:opacity-90 w-28 ${getAccionClase(
                        patient.tipo_atencion,
                        patient.estado_atencion
                      )}`}
                    >
                      {getAccionTexto(patient.tipo_atencion, patient.estado_atencion)}
                    </button>
                  </td>
                  <td className="p-2 text-center">
                    <span
                      className={`p-2 rounded-full text-sm font-medium ${getEstadoBadge(
                        patient.estado_atencion
                      )}`}
                    >
                      {getEstadoTexto(patient.estado_atencion)}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Paginación */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-6 pt-4 text-sm my-4 border-t border-border-default">
          <div className="text-sm text-text-primary-80">
            Mostrando <span className="font-semibold text-text-primary">{pacientes.length}</span> de{" "}
            <span className="font-semibold text-text-primary">{totalRecords}</span> registros
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-md p-1 shadow-sm">
              <button
                type="button"
                aria-label="Página anterior"
                title="Anterior"
                onClick={handlePrevPage}
                disabled={currentPage === 1 || loading}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors border focus:ring-2 focus:ring-offset-1 focus:ring-brand disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <i className="fa-solid fa-chevron-left"></i>
                <span className="hidden sm:inline">Anterior</span>
              </button>

              <div className="px-3 text-sm font-medium text-text-primary select-none">
                Página {currentPage} de {totalPages || 1}
              </div>

              <button
                type="button"
                aria-label="Página siguiente"
                title="Siguiente"
                onClick={handleNextPage}
                disabled={currentPage === totalPages || totalPages === 0 || loading}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors border focus:ring-2 focus:ring-offset-1 focus:ring-brand disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <span className="hidden sm:inline">Siguiente</span>
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
