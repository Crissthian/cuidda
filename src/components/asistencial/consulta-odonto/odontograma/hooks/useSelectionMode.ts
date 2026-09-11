/**
 * Hook para manejar el estado de selección del Odontograma.
 * Centraliza la lógica de activación, cancelación y edéntulo total.
 */

import { useState, useCallback } from "react";
import type {
  SelectionMode,
  SelectionType,
  StatusType,
  HallazgoClinico,
} from "../types";

/** Estado inicial del modo de selección */
const INITIAL_SELECTION_MODE: SelectionMode = {
  isActive: false,
  type: "fixed",
  status: "bueno",
  startId: null,
};

/** Opciones para el hook useSelectionMode */
interface UseSelectionModeOptions {
  hallazgos: HallazgoClinico[];
  onHallazgoCreated: (hallazgo: HallazgoClinico) => void;
  onHallazgoDeleted?: (id: string) => void;
  /** Opcional: estado externo de selección (para integración incremental) */
  selectionMode?: SelectionMode;
  /** Opcional: setter externo de selección (para integración incremental) */
  setSelectionMode?: React.Dispatch<React.SetStateAction<SelectionMode>>;
  /** Modo de vista actual (Adulto/Niño) */
  viewMode: "adult" | "child";
}

/** Retorno del hook useSelectionMode */
interface UseSelectionModeReturn {
  selectionMode: SelectionMode;
  setSelectionMode: React.Dispatch<React.SetStateAction<SelectionMode>>;
  startSelection: (type: SelectionType, status: StatusType) => void;
  cancelSelection: () => void;
  resetSelection: () => void;
}

/**
 * Hook personalizado para gestionar el estado de selección del odontograma.
 * Maneja la activación de herramientas, cancelación y el caso especial de edéntulo total.
 * Soporta tanto estado interno como externo para facilitar la migración incremental.
 *
 * @param options - Configuración del hook con hallazgos y callbacks
 * @returns Estado y funciones de control de selección
 */
export function useSelectionMode({
  hallazgos,
  onHallazgoCreated,
  onHallazgoDeleted,
  selectionMode: externalSelectionMode,
  setSelectionMode: externalSetSelectionMode,
  viewMode,
}: UseSelectionModeOptions): UseSelectionModeReturn {
  // Usar estado interno solo si no se proporciona estado externo
  const [internalSelectionMode, internalSetSelectionMode] =
    useState<SelectionMode>(INITIAL_SELECTION_MODE);

  // Usar estado externo si está disponible, de lo contrario usar interno
  const selectionMode = externalSelectionMode ?? internalSelectionMode;
  const setSelectionMode = externalSetSelectionMode ?? internalSetSelectionMode;

  /**
   * Inicia un modo de selección. Para edéntulo total, crea o elimina el hallazgo directamente.
   */
  const startSelection = useCallback(
    (type: SelectionType, status: StatusType) => {
      // Caso especial: Edéntulo Total no requiere selección de dientes
      if (type === "edentulous_total") {
        const arch = status === "bueno" ? "Superior" : "Inferior";
        const existing = hallazgos.find(
          (h) => h.hallazgo === "EDENTULO_TOTAL" && h.especificacion === arch,
        );

        // Si ya existe, lo eliminamos (toggle)
        if (existing) {
          if (onHallazgoDeleted && existing.id) {
            onHallazgoDeleted(existing.id);
          }
          return;
        }

        // Si no existe, lo creamos
        const newHallazgo: HallazgoClinico = {
          id: Date.now().toString(),
          diente: null,
          hallazgo: "EDENTULO_TOTAL",
          estado: "malo",
          especificacion: arch,
          fecha: new Date().toLocaleDateString("es-PE"),
          viewMode, // Guardar el modo en que se creó
        };
        onHallazgoCreated(newHallazgo);
        return;
      }

      // Para todos los demás tipos, activamos el modo de selección
      setSelectionMode({
        isActive: true,
        type,
        status,
        startId: null,
      });
    },
    [hallazgos, onHallazgoCreated, onHallazgoDeleted],
  );

  /**
   * Cancela el modo de selección activo.
   */
  const cancelSelection = useCallback(() => {
    setSelectionMode(INITIAL_SELECTION_MODE);
  }, []);

  /**
   * Reinicia el estado de selección al estado inicial.
   */
  const resetSelection = useCallback(() => {
    setSelectionMode(INITIAL_SELECTION_MODE);
  }, []);

  return {
    selectionMode,
    setSelectionMode,
    startSelection,
    cancelSelection,
    resetSelection,
  };
}
