import CargarDocumentoModal from "@/components/estudio-linea-base/CargarDocumentoModal";
import ImportarPlanillaModal from "@/components/estudio-linea-base/ImportarPlanillaModal";
import { useEffect, useState } from "react";

export default function EstudioLineaBaseModalHost() {
  const [isDocumentoOpen, setIsDocumentoOpen] = useState(false);
  const [isPlanillaOpen, setIsPlanillaOpen] = useState(false);

  useEffect(() => {
    const btnDocumento = document.querySelector<HTMLButtonElement>(
      '[data-modal-trigger="cargar-documento"]',
    );
    const btnPlanilla = document.querySelector<HTMLButtonElement>(
      '[data-modal-trigger="importar-planilla"]',
    );

    const handlerDocumento = () => setIsDocumentoOpen(true);
    const handlerPlanilla = () => setIsPlanillaOpen(true);

    btnDocumento?.addEventListener("click", handlerDocumento);
    btnPlanilla?.addEventListener("click", handlerPlanilla);

    return () => {
      btnDocumento?.removeEventListener("click", handlerDocumento);
      btnPlanilla?.removeEventListener("click", handlerPlanilla);
    };
  }, []);

  return (
    <>
      <CargarDocumentoModal
        isOpen={isDocumentoOpen}
        onClose={() => setIsDocumentoOpen(false)}
      />
      <ImportarPlanillaModal
        isOpen={isPlanillaOpen}
        onClose={() => setIsPlanillaOpen(false)}
      />
    </>
  );
}
