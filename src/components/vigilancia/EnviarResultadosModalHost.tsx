import EnviarResultadosModal, {
  type EnviarResultadosData,
} from "@/components/vigilancia/EnviarResultadosModal";
import { useEffect, useState } from "react";

export default function EnviarResultadosModalHost() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<EnviarResultadosData | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-modal-enviar]",
      );
      if (!btn) return;
      e.preventDefault();
      setData({
        nombre: btn.dataset.nombre ?? "Trabajador",
        dni: btn.dataset.dni ?? "—",
        emo: btn.dataset.emo ?? "Periódico 2026",
        vencimiento: btn.dataset.vencimiento ?? "2026-12-31",
      });
      setIsOpen(true);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <EnviarResultadosModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      data={data}
    />
  );
}
