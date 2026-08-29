import { useEffect, useState } from "react";
import CargarDocumentoModal from "@/components/estudio-linea-base/CargarDocumentoModal";

export default function EstudioLineaBaseModalHost() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const btn = document.querySelector<HTMLButtonElement>('[data-modal-trigger="cargar-documento"]');
    if (!btn) return;
    const handler = () => setIsOpen(true);
    btn.addEventListener("click", handler);
    return () => btn.removeEventListener("click", handler);
  }, []);

  return <CargarDocumentoModal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}
