import AnalisisCausaRaizModal from "@/components/accidentes/AnalisisCausaRaizModal";
import NuevoRegistroModal from "@/components/accidentes/NuevoRegistroModal";
import { useEffect, useState } from "react";

export default function AccidentesModalHost() {
  const [isRegistroOpen, setIsRegistroOpen] = useState(false);
  const [isCausaOpen, setIsCausaOpen] = useState(false);

  useEffect(() => {
    const btnRegistro = document.querySelector<HTMLButtonElement>(
      '[data-modal-trigger="nuevo-registro"]',
    );
    const btnCausa = document.querySelector<HTMLButtonElement>(
      '[data-modal-trigger="analisis-causa-raiz"]',
    );

    const handlerRegistro = () => setIsRegistroOpen(true);
    const handlerCausa = () => setIsCausaOpen(true);

    btnRegistro?.addEventListener("click", handlerRegistro);
    btnCausa?.addEventListener("click", handlerCausa);

    return () => {
      btnRegistro?.removeEventListener("click", handlerRegistro);
      btnCausa?.removeEventListener("click", handlerCausa);
    };
  }, []);

  return (
    <>
      <NuevoRegistroModal
        isOpen={isRegistroOpen}
        onClose={() => setIsRegistroOpen(false)}
      />
      <AnalisisCausaRaizModal
        isOpen={isCausaOpen}
        onClose={() => setIsCausaOpen(false)}
      />
    </>
  );
}
