import AuditarInformeModal from "@/components/vigilancia/AuditarInformeModal";
import { useEffect, useState } from "react";

export default function AuditarInformeModalHost() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const btn = document.querySelector<HTMLButtonElement>(
            '[data-modal-trigger="auditar-informe"]',
        );
        if (!btn) return;
        const handler = () => setIsOpen(true);
        btn.addEventListener("click", handler);
        return () => btn.removeEventListener("click", handler);
    }, []);

    return (
        <AuditarInformeModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
        />
    );
}
