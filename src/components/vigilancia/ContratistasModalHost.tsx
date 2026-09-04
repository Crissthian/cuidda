import RegistrarContratistaModal from "@/components/vigilancia/RegistrarContratistaModal";
import { useEffect, useState } from "react";

export default function ContratistasModalHost() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const btn = document.querySelector<HTMLButtonElement>(
      '[data-modal-trigger="registrar-contratista"]',
    );
    if (!btn) return;
    const handler = () => setIsOpen(true);
    btn.addEventListener("click", handler);
    return () => btn.removeEventListener("click", handler);
  }, []);

  return (
    <RegistrarContratistaModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    />
  );
}
