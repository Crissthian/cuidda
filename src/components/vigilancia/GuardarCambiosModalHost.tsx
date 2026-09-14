import SuccessModal from "@/components/ui/SuccessModal";
import { useEffect, useState } from "react";

export default function GuardarCambiosModalHost() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const btn = document.querySelector<HTMLButtonElement>(
      '[data-modal-trigger="guardar-cambios"]',
    );
    if (!btn) return;

    const handler = () => setIsOpen(true);
    btn.addEventListener("click", handler);
    return () => btn.removeEventListener("click", handler);
  }, []);

  return (
    <SuccessModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title={"Cambios guardados\ncorrectamente"}
    />
  );
}
