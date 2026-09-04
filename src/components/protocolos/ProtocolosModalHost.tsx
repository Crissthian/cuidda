import ActualizarProtocoloModal from "@/components/protocolos/ActualizarProtocoloModal";
import CargarProtocoloModal from "@/components/protocolos/CargarProtocoloModal";
import { useEffect, useState } from "react";

export default function ProtocolosModalHost() {
  const [isCargarOpen, setIsCargarOpen] = useState(false);
  const [isActualizarOpen, setIsActualizarOpen] = useState(false);

  useEffect(() => {
    const btnCargar = document.querySelector<HTMLButtonElement>(
      '[data-modal-trigger="cargar-protocolo"]',
    );
    const btnActualizar = document.querySelector<HTMLButtonElement>(
      '[data-modal-trigger="actualizar-protocolo"]',
    );

    const handlerCargar = () => setIsCargarOpen(true);
    const handlerActualizar = () => setIsActualizarOpen(true);

    btnCargar?.addEventListener("click", handlerCargar);
    btnActualizar?.addEventListener("click", handlerActualizar);

    return () => {
      btnCargar?.removeEventListener("click", handlerCargar);
      btnActualizar?.removeEventListener("click", handlerActualizar);
    };
  }, []);

  return (
    <>
      <CargarProtocoloModal
        isOpen={isCargarOpen}
        onClose={() => setIsCargarOpen(false)}
      />
      <ActualizarProtocoloModal
        isOpen={isActualizarOpen}
        onClose={() => setIsActualizarOpen(false)}
      />
    </>
  );
}
