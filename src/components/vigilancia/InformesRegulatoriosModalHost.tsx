import GenerarDocumentoModal from "@/components/vigilancia/GenerarDocumentoModal";
import { useEffect, useState } from "react";

export default function InformesRegulatoriosModalHost() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const btn = document.querySelector<HTMLButtonElement>(
      '[data-modal-trigger="generar-documento"]',
    );
    if (!btn) return;
    const handler = () => setIsOpen(true);
    btn.addEventListener("click", handler);
    return () => btn.removeEventListener("click", handler);
  }, []);

  return (
    <GenerarDocumentoModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
  );
}
