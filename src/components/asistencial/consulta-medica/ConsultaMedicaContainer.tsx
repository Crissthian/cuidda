import React, { useState, useMemo } from "react";
import BuscadorConsultaMedica, {
  type ConsultaFiltros,
} from "./BuscadorConsultaMedica";
import ListaPacientesConsultaMedica from "./ListaPacientesConsultaMedica";
import ModalConsultaMedica from "./ModalConsultaMedica";
import {
  pacientesConsultaMock,
  type PacienteConsultaMedica,
} from "@/lib/consultaMedicaData";

const defaultFiltros: ConsultaFiltros = {
  apellidos: "",
  medico: "",
  estado: "",
};

export default function ConsultaMedicaContainer() {
  const [pacientes, setPacientes] = useState<PacienteConsultaMedica[]>(
    pacientesConsultaMock
  );
  const [filtros, setFiltros] = useState<ConsultaFiltros>(defaultFiltros);
  const [filtrosAplicados, setFiltrosAplicados] =
    useState<ConsultaFiltros>(defaultFiltros);
  const [loading, setLoading] = useState(false);

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Estado del modal
  const [modalAbierto, setModalAbierto] = useState(false);
  const [codigoSeleccionado, setCodigoSeleccionado] = useState("");
  const [estadoSeleccionado, setEstadoSeleccionado] = useState("1");

  const handleFiltrosChange = (field: keyof ConsultaFiltros, value: string) => {
    setFiltros((prev) => ({ ...prev, [field]: value }));
  };

  const handleBuscar = () => {
    setLoading(true);
    setFiltrosAplicados(filtros);
    setCurrentPage(1);
    setTimeout(() => {
      setLoading(false);
    }, 200);
  };

  const handleLimpiar = () => {
    setFiltros(defaultFiltros);
    setFiltrosAplicados(defaultFiltros);
    setCurrentPage(1);
  };

  // Filtrado reactivo sobre el mock
  const pacientesFiltrados = useMemo(() => {
    return pacientes.filter((p) => {
      const matchApellidos =
        !filtrosAplicados.apellidos.trim() ||
        p.apellido_paciente
          .toLowerCase()
          .includes(filtrosAplicados.apellidos.toLowerCase()) ||
        p.nombre_paciente
          .toLowerCase()
          .includes(filtrosAplicados.apellidos.toLowerCase());

      const matchMedico =
        !filtrosAplicados.medico.trim() ||
        p.nombre_medico
          .toLowerCase()
          .includes(filtrosAplicados.medico.toLowerCase());

      const matchEstado =
        !filtrosAplicados.estado || p.estado_atencion === filtrosAplicados.estado;

      return matchApellidos && matchMedico && matchEstado;
    });
  }, [pacientes, filtrosAplicados]);

  // Pacientes paginados
  const totalRecords = pacientesFiltrados.length;
  const totalPages = Math.ceil(totalRecords / pageSize) || 1;
  const paginatedPacientes = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return pacientesFiltrados.slice(start, start + pageSize);
  }, [pacientesFiltrados, currentPage, pageSize]);

  const handleIniciarConsulta = (codigo: string, estado: string) => {
    setCodigoSeleccionado(codigo);
    setEstadoSeleccionado(estado);
    setModalAbierto(true);
  };

  const handleCerrarModal = () => {
    setModalAbierto(false);
    setCodigoSeleccionado("");
  };

  return (
    <div className="flex flex-col">
      <div className="shrink-0">
        <div className="p-6">
          <BuscadorConsultaMedica
            filtros={filtros}
            onFiltrosChange={handleFiltrosChange}
            onBuscar={handleBuscar}
            onLimpiar={handleLimpiar}
          />
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-auto">
        <ListaPacientesConsultaMedica
          pacientes={paginatedPacientes}
          loading={loading}
          onIniciarConsulta={handleIniciarConsulta}
          currentPage={currentPage}
          totalPages={totalPages}
          totalRecords={totalRecords}
          onPageChange={setCurrentPage}
        />
      </div>

      <ModalConsultaMedica
        codigo={codigoSeleccionado}
        estado={estadoSeleccionado}
        abierto={modalAbierto}
        onClose={handleCerrarModal}
      />
    </div>
  );
}
