import CargarPlanModal from "@/components/plan-anual/CargarPlanModal";
import { useEffect, useState } from "react";

export default function PlanAnualModalHost() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const btn = document.querySelector<HTMLButtonElement>(
      '[data-modal-trigger="cargar-plan"]',
    );
    if (!btn) return;
    const handler = () => setIsOpen(true);
    btn.addEventListener("click", handler);
    return () => btn.removeEventListener("click", handler);
  }, []);

  return <CargarPlanModal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}
