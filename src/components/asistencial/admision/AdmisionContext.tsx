import { catalogsAdmision, type Catalogs } from "@/lib/admisionData";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  ExamenEspecialidadSeleccionado,
  ExamenSeleccionado,
} from "./admision.types";

export type AdmisionMode = "crear" | "actualizar";

export interface AdmisionModals {
  busquedaClientes: boolean;
  registroPaciente: boolean;
  registroPatrocinador: boolean;
  registroMedico: boolean;
}

interface AdmisionContextValue {
  catalogs: Catalogs;
  mode: AdmisionMode;
  setMode: (mode: AdmisionMode) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  modals: AdmisionModals;
  toggleModal: (key: keyof AdmisionModals, open: boolean) => void;
  examenesLaboratorio: ExamenSeleccionado[];
  setExamenesLaboratorio: (examenes: ExamenSeleccionado[]) => void;
  examenEspecialidadSeleccionado: ExamenEspecialidadSeleccionado | null;
  setExamenEspecialidadSeleccionado: (
    examen: ExamenEspecialidadSeleccionado | null,
  ) => void;
}

const AdmisionContext = createContext<AdmisionContextValue | null>(null);

const initialModals: AdmisionModals = {
  busquedaClientes: false,
  registroPaciente: false,
  registroPatrocinador: false,
  registroMedico: false,
};

/**
 * Contexto local de Admisión (reemplaza el store Zustand de Lucemedic).
 * Estado local con useState, sin lógica de servidor.
 */
export function AdmisionProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AdmisionMode>("crear");
  const [isLoading, setIsLoading] = useState(false);
  const [modals, setModals] = useState<AdmisionModals>(initialModals);
  const [examenesLaboratorio, setExamenesLaboratorio] = useState<
    ExamenSeleccionado[]
  >([]);
  const [examenEspecialidadSeleccionado, setExamenEspecialidadSeleccionado] =
    useState<ExamenEspecialidadSeleccionado | null>(null);

  const toggleModal = useCallback(
    (key: keyof AdmisionModals, open: boolean) => {
      setModals((prev) => ({ ...prev, [key]: open }));
    },
    [],
  );

  const value = useMemo<AdmisionContextValue>(
    () => ({
      catalogs: catalogsAdmision,
      mode,
      setMode,
      isLoading,
      setIsLoading,
      modals,
      toggleModal,
      examenesLaboratorio,
      setExamenesLaboratorio,
      examenEspecialidadSeleccionado,
      setExamenEspecialidadSeleccionado,
    }),
    [
      mode,
      isLoading,
      modals,
      toggleModal,
      examenesLaboratorio,
      examenEspecialidadSeleccionado,
    ],
  );

  return (
    <AdmisionContext.Provider value={value}>
      {children}
    </AdmisionContext.Provider>
  );
}

export function useAdmision(): AdmisionContextValue {
  const ctx = useContext(AdmisionContext);
  if (!ctx) {
    throw new Error("useAdmision debe usarse dentro de <AdmisionProvider>");
  }
  return ctx;
}
