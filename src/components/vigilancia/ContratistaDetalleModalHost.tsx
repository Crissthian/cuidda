import ActualizarCumplimientoModal from "@/components/vigilancia/ActualizarCumplimientoModal";
import { useEffect, useState } from "react";

export default function ContratistaDetalleModalHost() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const btn = document.querySelector<HTMLButtonElement>(
      '[data-modal-trigger="actualizar-cumplimiento"]',
    );
    if (!btn) return;
    const handler = () => setIsOpen(true);
    btn.addEventListener("click", handler);
    return () => btn.removeEventListener("click", handler);
  }, []);

  return (
    <ActualizarCumplimientoModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    />
  );
}
