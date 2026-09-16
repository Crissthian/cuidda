import RegistrarLecturaModal from "@/components/vigilancia/RegistrarLecturaModal";
import { useEffect, useState } from "react";

type Props = { trabajadorNombre?: string };

export default function LecturaResultadoModalHost({ trabajadorNombre }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  // Delegación en document: el botón lo renderiza la isla del detalle después
  // de resolver la lectura seleccionada, así que puede no existir al montar.
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target?.closest('[data-modal-trigger="registrar-lectura"]')) return;
      setIsOpen(true);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <RegistrarLecturaModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      trabajadorNombre={trabajadorNombre}
    />
  );
}
