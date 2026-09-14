import GenerarDocumentoIaModal from "@/components/programas/GenerarDocumentoIaModal";
import { useEffect, useState } from "react";

export default function ProgramaDetalleModalHost() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const btn = document.querySelector<HTMLButtonElement>(
      '[data-modal-trigger="generar-documento-ia"]',
    );
    if (!btn) return;
    const handler = () => setIsOpen(true);
    btn.addEventListener("click", handler);
    return () => btn.removeEventListener("click", handler);
  }, []);

  return (
    <GenerarDocumentoIaModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
  );
}
