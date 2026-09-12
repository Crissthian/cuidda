import RegistrarLecturaModal from "@/components/vigilancia/RegistrarLecturaModal";
import { useEffect, useState } from "react";

type Props = { trabajadorNombre?: string };

export default function LecturaResultadoModalHost({ trabajadorNombre }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const btn = document.querySelector<HTMLButtonElement>(
      '[data-modal-trigger="registrar-lectura"]',
    );
    if (!btn) return;
    const handler = () => setIsOpen(true);
    btn.addEventListener("click", handler);
    return () => btn.removeEventListener("click", handler);
  }, []);

  return (
    <RegistrarLecturaModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      trabajadorNombre={trabajadorNombre}
    />
  );
}
