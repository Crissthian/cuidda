import { useEffect, useState } from "react";
import CargarMatrizModal from "@/components/emos-y-trabajadores/CargarMatrizModal";

export default function EmosModalHost() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const btn = document.querySelector<HTMLButtonElement>(
      '[data-modal-trigger="cargar-matriz"]',
    );
    if (!btn) return;
    const handler = () => setIsOpen(true);
    btn.addEventListener("click", handler);
    return () => btn.removeEventListener("click", handler);
  }, []);

  return <CargarMatrizModal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}
