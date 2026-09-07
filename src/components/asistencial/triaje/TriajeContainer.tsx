import { useState } from "react";
import BuscadorTriaje from "./BuscadorTriaje";
import ListaPacientesTriaje from "./ListaPacientesTriaje";
import ModalTriaje from "./ModalTriaje";
import {
  defaultFiltrosTriaje,
  type FiltrosTriaje,
  type TriajeModalMode,
} from "./triaje.types";

interface ModalState {
  isOpen: boolean;
  mode: TriajeModalMode;
  atencionID: string;
  idTriaje: string;
}

const modalInicial: ModalState = {
  isOpen: false,
  mode: "create",
  atencionID: "",
  idTriaje: "",
};

/**
 * Orquesta la pantalla de triaje: buscador, lista y modal (solo UI, datos mock).
 */
export default function TriajeContainer() {
  const [filtros, setFiltros] = useState<FiltrosTriaje>(defaultFiltrosTriaje);
  const [refreshKey, setRefreshKey] = useState(0);
  const [modal, setModal] = useState<ModalState>(modalInicial);

  const handleFieldChange = (field: keyof FiltrosTriaje, value: string) => {
    setFiltros((current) => ({ ...current, [field]: value }));
  };

  const handleBuscar = () => {
    setRefreshKey((key) => key + 1);
  };

  const handleLimpiar = () => {
    setFiltros(defaultFiltrosTriaje);
    setRefreshKey((key) => key + 1);
  };

  const abrirModal = (atencionID: string, estado: string) => {
    const mode: TriajeModalMode =
      estado === "1" || estado === "2" ? "update" : "create";
    // El N° de triaje muestra el id del item seleccionado del listado
    setModal({ isOpen: true, mode, atencionID, idTriaje: atencionID });
  };

  const cerrarModal = () => {
    setModal(modalInicial);
    setRefreshKey((key) => key + 1);
  };

  const editarDesdeHistorial = (triajeID: string) => {
    setModal((current) => ({ ...current, idTriaje: triajeID, mode: "update" }));
  };

  return (
    <div className="flex flex-col">
      <div className="shrink-0">
        <BuscadorTriaje
          filtros={filtros}
          onFieldChange={handleFieldChange}
          onBuscar={handleBuscar}
          onLimpiar={handleLimpiar}
        />
      </div>
      <div className="flex-1 min-h-0 overflow-auto">
        <ListaPacientesTriaje
          filtros={filtros}
          refreshKey={refreshKey}
          onAbrirModal={abrirModal}
        />
      </div>
      <ModalTriaje
        isOpen={modal.isOpen}
        mode={modal.mode}
        atencionID={modal.atencionID}
        idTriaje={modal.idTriaje}
        onClose={cerrarModal}
        onEditarHistorial={editarDesdeHistorial}
      />
    </div>
  );
}