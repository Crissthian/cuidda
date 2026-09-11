import GenerarDocumentoInformeModal from "@/components/vigilancia/GenerarDocumentoInformeModal";
import { useEffect, useState } from "react";

export default function InformeDocumentoModalHost() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const btn = document.querySelector<HTMLButtonElement>(
            '[data-modal-trigger="generar-documento-informe"]',
        );
        if (!btn) return;
        const handler = () => setIsOpen(true);
        btn.addEventListener("click", handler);
        return () => btn.removeEventListener("click", handler);
    }, []);

    return (
        <GenerarDocumentoInformeModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
        />
    );
}
