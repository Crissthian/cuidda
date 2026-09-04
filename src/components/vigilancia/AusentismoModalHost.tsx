import CargarDescansosModal from "@/components/vigilancia/CargarDescansosModal";
import { useEffect, useState } from "react";

export default function AusentismoModalHost() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const btn = document.querySelector<HTMLButtonElement>(
      '[data-modal-trigger="cargar-descansos"]',
    );
    if (!btn) return;
    const handler = () => setIsOpen(true);
    btn.addEventListener("click", handler);
    return () => btn.removeEventListener("click", handler);
  }, []);

  return (
    <CargarDescansosModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
  );
}
