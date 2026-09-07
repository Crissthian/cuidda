import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MODAL_SIZE_CLASSES, type ModalSize } from "./modal.constants";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon?: string;
  children: React.ReactNode;
  className?: string;
  zIndex?: number;
  size?: ModalSize;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
}

/**
 * Contenedor modal genérico que utiliza el elemento nativo <dialog> y portaliza su contenido.
 */
export default function Modal({
  isOpen,
  onClose,
  children,
  className = "",
  zIndex = 50,
  size = "lg",
  closeOnBackdrop = true,
  closeOnEscape = true,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        try {
          dialog.showModal();
        } catch (err) {
          console.error("Error al abrir el modal:", err);
        }
      }
    } else {
      if (dialog.open) {
        try {
          dialog.close();
        } catch (err) {
          console.error("Error al cerrar el modal:", err);
        }
      }
    }
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      className={`backdrop:bg-black/40 backdrop:backdrop-blur-sm bg-transparent p-0 m-auto rounded-2xl shadow-2xl border-none outline-none ${MODAL_SIZE_CLASSES[size]} ${className}`}
      onClick={(e) => {
        if (closeOnBackdrop && e.target === dialogRef.current) {
          onClose();
        }
      }}
      onCancel={(e) => {
        // Evitar que eventos 'cancel' de elementos hijos (como <input type="file">) cierren el modal
        if (e.target === dialogRef.current) {
          e.preventDefault();
          if (closeOnEscape) {
            onClose();
          }
        }
      }}
      style={{ zIndex }}
    >
      <div className="w-full h-full bg-surface-default flex flex-col overflow-hidden">
        {/* Contenido principal */}
        <div className="p-6 flex flex-col gap-4 overflow-auto">{children}</div>
      </div>
    </dialog>,
    document.body,
  );
}
