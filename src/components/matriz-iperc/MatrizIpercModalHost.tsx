import NuevaMatrizModal from "@/components/matriz-iperc/NuevaMatrizModal";
import { useEffect, useState } from "react";

export default function MatrizIpercModalHost() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const btn = document.querySelector<HTMLButtonElement>(
      '[data-modal-trigger="nueva-matriz"]',
    );
    if (!btn) return;
    const handler = () => setIsOpen(true);
    btn.addEventListener("click", handler);
    return () => btn.removeEventListener("click", handler);
  }, []);

  return <NuevaMatrizModal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}
