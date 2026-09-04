import ProgramarCapacitacionModal from "@/components/capacitaciones/ProgramarCapacitacionModal";
import RegistrarCumplimientoModal from "@/components/capacitaciones/RegistrarCumplimientoModal";
import { useEffect, useState } from "react";

export default function CapacitacionesModalHost() {
  const [isProgramarOpen, setIsProgramarOpen] = useState(false);
  const [isCumplimientoOpen, setIsCumplimientoOpen] = useState(false);

  useEffect(() => {
    const btnProgramar = document.querySelector<HTMLButtonElement>(
      '[data-modal-trigger="programar-capacitacion"]',
    );
    const btnCumplimiento = document.querySelector<HTMLButtonElement>(
      '[data-modal-trigger="registrar-cumplimiento"]',
    );

    const handlerProgramar = () => setIsProgramarOpen(true);
    const handlerCumplimiento = () => setIsCumplimientoOpen(true);

    btnProgramar?.addEventListener("click", handlerProgramar);
    btnCumplimiento?.addEventListener("click", handlerCumplimiento);

    return () => {
      btnProgramar?.removeEventListener("click", handlerProgramar);
      btnCumplimiento?.removeEventListener("click", handlerCumplimiento);
    };
  }, []);

  return (
    <>
      <ProgramarCapacitacionModal
        isOpen={isProgramarOpen}
        onClose={() => setIsProgramarOpen(false)}
      />
      <RegistrarCumplimientoModal
        isOpen={isCumplimientoOpen}
        onClose={() => setIsCumplimientoOpen(false)}
      />
    </>
  );
}
