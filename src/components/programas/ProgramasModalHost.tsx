import NuevoProgramaModal from "@/components/programas/NuevoProgramaModal";
import { useEffect, useState } from "react";

export default function ProgramasModalHost() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const btn = document.querySelector<HTMLButtonElement>(
      '[data-modal-trigger="nuevo-programa"]',
    );
    if (!btn) return;
    const handler = () => setIsOpen(true);
    btn.addEventListener("click", handler);
    return () => btn.removeEventListener("click", handler);
  }, []);

  return <NuevoProgramaModal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}
