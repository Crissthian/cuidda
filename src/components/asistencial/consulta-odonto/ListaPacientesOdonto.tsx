import React, { useMemo, useState } from "react";
import { ModalIniciarAtencion } from "./ModalAtencionOdonto";
import Skeleton from "@/components/ui/Skeleton";
import {
  pacientesOdontoMock,
  type PacienteOdonto,
} from "@/lib/consultaOdontoData";

export function ListaPacientesOdonto() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPaciente, setSelectedPaciente] =
    useState<PacienteOdonto | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const allPacientes = pacientesOdontoMock;
  const [filteredPacientes, setFilteredPacientes] =
    useState<PacienteOdonto[]>(pacientesOdontoMock);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [searchApellidos, setSearchApellidos] = useState("");
  const [searchMedico, setSearchMedico] = useState("");
  const [searchEstado, setSearchEstado] = useState("");

  const totalRecords = filteredPacientes.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));

  const triggerSearch = () => {
    setIsLoading(true);
    setTimeout(() => {
      let filtered = [...allPacientes];
      if (searchApellidos.trim()) {
        const q = searchApellidos.toLowerCase().trim();
        filtered = filtered.filter((p) =>
          p.apellidosNombres.toLowerCase().includes(q),
        );
      }
      if (searchMedico.trim()) {
        const q = searchMedico.toLowerCase().trim();
        filtered = filtered.filter((p) => p.medico.toLowerCase().includes(q));
      }
      if (searchEstado !== "") {
        filtered = filtered.filter((p) => p.estadoAtencion === searchEstado);
      }
      setFilteredPacientes(filtered);
      setCurrentPage(1);
      setIsLoading(false);
    }, 250);
  };

  const handleResetFilters = () => {
    setSearchApellidos("");
    setSearchMedico("");
    setSearchEstado("");
    setIsLoading(true);
    setTimeout(() => {
      setFilteredPacientes(allPacientes);
      setCurrentPage(1);
      setIsLoading(false);
    }, 200);
  };

  const datosEvento = useMemo(
    () => ({
      nombrePaciente: selectedPaciente?.apellidosNombres || "",
      fechaNacimiento: selectedPaciente?.fechaNacimiento || new Date(),
      fechaAtencion: selectedPaciente?.fechaIngreso || new Date(),
      codigoAtencion: selectedPaciente?.codigoAtencion || "",
      codigoOdontologia: selectedPaciente?.codigoOdontologia || "",
      nombreMedico: selectedPaciente?.medico || "",
      motivoConsulta: selectedPaciente?.motivoConsulta || "",
      dniPaciente: selectedPaciente?.dni || "",
      estadoAtencion: selectedPaciente?.estadoAtencion || "0",
    }),
    [selectedPaciente],
  );

  const handleOpenModal = (paciente: PacienteOdonto) => {
    setSelectedPaciente(paciente);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((p) => p - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((p) => p + 1);
    }
  };

  const displayedPacientes = filteredPacientes.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <div className="flex flex-col gap-6 p-1">
      {selectedPaciente && (
        <ModalIniciarAtencion
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          datosEvento={datosEvento}
        />
      )}

      <h2 className="text-lg font-medium text-text-primary">
        Lista de pacientes Odontología
      </h2>

      <div className="flex items-end gap-4 bg-transparent">
        <div className="flex-1">
          <label htmlFor="apellidos" className="form-label">
            Apellidos del Paciente
          </label>
          <input
            id="apellidos"
            type="text"
            placeholder="Apellidos"
            value={searchApellidos}
            onChange={(e) => setSearchApellidos(e.target.value)}
            className="w-full rounded-lg border-none bg-surface-light px-4 py-2 text-text-primary placeholder-gray-400 outline-none focus:ring-1 focus:ring-brand"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="medico" className="form-label">
            Médico
          </label>
          <input
            id="medico"
            type="text"
            placeholder="Médico"
            value={searchMedico}
            onChange={(e) => setSearchMedico(e.target.value)}
            className="w-full rounded-lg border-none bg-surface-light px-4 py-2 text-text-primary placeholder-gray-400 outline-none focus:ring-1 focus:ring-brand"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="estado" className="form-label">
            Estado
          </label>
          <div className="relative">
            <select
              id="estado"
              value={searchEstado}
              onChange={(e) => setSearchEstado(e.target.value)}
              className="w-full appearance-none rounded-lg border-none bg-surface-light px-4 py-2 text-text-secondary outline-none focus:ring-1 focus:ring-brand cursor-pointer"
            >
              <option value="">Todos</option>
              <option value="0">En espera</option>
              <option value="2">Culminado</option>
            </select>
            <i className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-muted-50 pointer-events-none text-xs"></i>
          </div>
        </div>
        <button
          type="button"
          onClick={triggerSearch}
          className="rounded-lg bg-brand px-10 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover shadow-sm cursor-pointer"
        >
          BUSCAR
        </button>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleResetFilters}
            className="rounded-lg bg-muted px-10 py-2.5 text-sm font-medium text-white transition-colors hover:bg-muted/90 shadow-sm cursor-pointer"
          >
            LIMPIAR
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-auto">
        <div className="border-collapse text-sm shadow-lg pb-4">
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
                    <i className="fas fa-file-alt mr-1"></i> CÓDIGO
                  </th>
                  <th className="p-2 divisor text-center font-normal w-[25%]">
                    <i className="fas fa-file-alt mr-1"></i> APELLIDOS Y NOMBRES
                  </th>
                  <th className="p-2 divisor text-center font-normal w-[12%]">
                    <i className="fas fa-file-alt mr-1"></i> ÁREA DE ATENCIÓN
                  </th>
                  <th className="p-2 divisor text-center font-normal w-[20%]">
                    <i className="fas fa-user-md mr-1"></i> MÉDICO
                  </th>
                  <th className="p-2 divisor text-center font-normal w-[10%]">
                    <i className="fas fa-calendar mr-1"></i> FECHA DE <br />{" "}
                    INGRESO
                  </th>
                  <th className="p-2 divisor text-center font-normal w-[8%]">
                    <i className="fas fa-clock mr-1"></i> HORA DE <br /> INGRESO
                  </th>
                  <th className="p-2 divisor text-center font-normal w-[10%]">
                    <i className="fas fa-file-alt mr-1"></i>ODONTOLOGIA
                  </th>
                  <th className="p-2 text-center font-normal w-[7%]">
                    <i className="fas fa-info-circle mr-1"></i> ESTADO
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default text-text-primary">
                {isLoading
                  ? Array.from({ length: 5 }).map((_, idx) => (
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
                  : displayedPacientes.map((paciente) => {
                      return (
                        <tr
                          key={paciente.id}
                          className="hover:bg-muted-20 border-dashed border-brand cursor-pointer"
                        >
                          <td className="p-2 text-center">
                            {paciente.codigoAtencion}
                          </td>
                          <td className="p-2 uppercase">
                            {paciente.apellidosNombres}
                          </td>
                          <td className="p-2 text-center">
                            {paciente.areaAtencion}
                          </td>
                          <td className="p-2 uppercase">{paciente.medico}</td>
                          <td className="p-2 text-center">
                            {paciente.fechaIngreso
                              ?.toISOString()
                              .split("T")[0]
                              .split("-")
                              .reverse()
                              .join("/")}
                          </td>
                          <td className="p-2 text-center">
                            {paciente.horaIngreso}
                          </td>
                          <td className="p-2 text-center">
                            <button
                              type="button"
                              onClick={() => handleOpenModal(paciente)}
                              className={`rounded-lg p-2 font-semibold transition-opacity cursor-pointer hover:opacity-90 w-28 text-center ${
                                paciente.estadoAtencion === "0"
                                  ? "bg-brand text-success hover:bg-brand/90"
                                  : "bg-muted text-white hover:bg-muted/90"
                              }`}
                            >
                              {paciente.estadoAtencion === "0"
                                ? "INICIAR"
                                : "VER"}
                            </button>
                          </td>
                          <td className="p-2 text-center">
                            <span
                              className={`font-medium ${
                                paciente.estadoAtencion === "0"
                                  ? "text-warning"
                                  : "text-text-secondary"
                              }`}
                            >
                              {paciente.estadoAtencion === "0"
                                ? "En espera"
                                : "Culminado"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-6 pt-4 text-sm my-4 border-t border-border-default">
            <div className="text-sm text-text-secondary">
              Mostrando{" "}
              <span className="font-semibold text-text-primary">
                {displayedPacientes.length}
              </span>{" "}
              de{" "}
              <span className="font-semibold text-text-primary">
                {totalRecords}
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
                  disabled={currentPage === 1 || isLoading}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors border focus:ring-2 focus:ring-offset-1 focus:ring-brand ${
                    currentPage === 1 || isLoading
                      ? "bg-card-bg text-accent-content cursor-not-allowed opacity-60 border-border-default"
                      : "bg-card-bg border-border-default text-accent-content hover:bg-muted-20 cursor-pointer"
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
                  aria-label="Página siguiente"
                  title="Siguiente"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages || isLoading}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors border focus:ring-2 focus:ring-offset-1 focus:ring-brand ${
                    currentPage === totalPages || isLoading
                      ? "bg-card-bg text-accent-content cursor-not-allowed opacity-60 border-border-default"
                      : "bg-card-bg border-border-default text-accent-content hover:bg-muted-20 cursor-pointer"
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
    </div>
  );
}
