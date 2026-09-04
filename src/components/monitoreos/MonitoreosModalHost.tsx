import CargarInformeModal from "@/components/monitoreos/CargarInformeModal";
import ProgramarMonitoreoModal from "@/components/monitoreos/ProgramarMonitoreoModal";
import { useEffect, useState } from "react";

export default function MonitoreosModalHost() {
  const [isProgramarOpen, setIsProgramarOpen] = useState(false);
  const [isInformeOpen, setIsInformeOpen] = useState(false);

  useEffect(() => {
    const btnProgramar = document.querySelector<HTMLButtonElement>(
      '[data-modal-trigger="programar-monitoreo"]',
    );
    const btnInforme = document.querySelector<HTMLButtonElement>(
      '[data-modal-trigger="cargar-informe"]',
    );

    const handlerProgramar = () => setIsProgramarOpen(true);
    const handlerInforme = () => setIsInformeOpen(true);

    btnProgramar?.addEventListener("click", handlerProgramar);
    btnInforme?.addEventListener("click", handlerInforme);

    return () => {
      btnProgramar?.removeEventListener("click", handlerProgramar);
      btnInforme?.removeEventListener("click", handlerInforme);
    };
  }, []);

  return (
    <>
      <ProgramarMonitoreoModal
        isOpen={isProgramarOpen}
        onClose={() => setIsProgramarOpen(false)}
      />
      <CargarInformeModal
        isOpen={isInformeOpen}
        onClose={() => setIsInformeOpen(false)}
      />
    </>
  );
}
