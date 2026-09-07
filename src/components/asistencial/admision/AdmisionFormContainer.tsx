import { Suspense, lazy, useCallback, useEffect } from "react";
import { FormProvider, useWatch } from "react-hook-form";
import ModalBusquedaClientes from "../ModalBusquedaClientes";
import ModalRegistroMedico from "../ModalRegistroMedico";
import ModalRegistroPaciente from "../ModalRegistroPaciente";
import { AdmisionProvider, useAdmision } from "./AdmisionContext";
import ContactoEmergencia from "./ContactoEmergencia";
import EspecialidadMedico from "./EspecialidadMedico";
import EspecialidadSubcategorias from "./EspecialidadSubcategorias";
import type { ExamenSeleccionado } from "./ExamenesList";
import FiliacionForm from "./FiliacionForm";
import HeaderActions from "./HeaderActions";
import HuellaFirma from "./HuellaFirma";
import LugarResidencia from "./LugarResidencia";
import PatientSearch from "./PatientSearch";
import SedeProcedencia from "./SedeProcedencia";
import { useAdmisionForm } from "./useAdmisionForm";

const ExamenesList = lazy(() => import("./ExamenesList"));

/**
 * Orquesta el flujo de admisión con catálogos mock, renders y manejo de modales.
 * Incluye el provider para que funcione con client:only en Astro.
 */
export default function AdmisionFormContainer() {
  return (
    <AdmisionProvider>
      <AdmisionFormInner />
    </AdmisionProvider>
  );
}

function AdmisionFormInner() {
  const {
    catalogs,
    setMode,
    setExamenesLaboratorio,
    setExamenEspecialidadSeleccionado,
    examenEspecialidadSeleccionado,
    examenesLaboratorio,
    mode,
    modals,
    toggleModal,
  } = useAdmision();
  const {
    form,
    onSubmit,
    limpiarFormulario,
    cargarSiguienteCodigo,
    cargarAdmisionPorCodigo,
  } = useAdmisionForm();
  const especialidad = useWatch({
    control: form.control,
    name: "atencion.especialidad",
  });

  useEffect(() => {
    setMode("crear");
    cargarSiguienteCodigo();

    return () => {
      setMode("crear");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleExamenesChange = useCallback(
    (examenes: ExamenSeleccionado[]) => {
      setExamenesLaboratorio(examenes);
    },
    [setExamenesLaboratorio],
  );

  useEffect(() => {
    if (especialidad !== "010") {
      setExamenesLaboratorio([]);
    }

    if (especialidad !== "009") {
      form.setValue("atencion.subcategoria_ecografia", "");
    }

    if (especialidad !== "011") {
      form.setValue("atencion.subcategoria_esp011", "");
    }

    if (
      examenEspecialidadSeleccionado &&
      examenEspecialidadSeleccionado.especialidad !== especialidad
    ) {
      setExamenEspecialidadSeleccionado(null);
    }
  }, [
    especialidad,
    examenEspecialidadSeleccionado,
    form,
    setExamenEspecialidadSeleccionado,
    setExamenesLaboratorio,
  ]);

  return (
    <FormProvider {...form}>
      <div className="relative flex flex-col h-full min-h-0 pb-6">
        <HeaderActions
          tipoAtencion={catalogs.tipoAtencion}
          onGuardar={onSubmit}
          onLimpiar={limpiarFormulario}
          onCargarPorCodigo={cargarAdmisionPorCodigo}
        />
        <form onSubmit={onSubmit} className="flex-1 min-h-0 overflow-auto">
          <SedeProcedencia />
          <PatientSearch />
          <div className="rounded-lg px-6 py-3">
            <EspecialidadMedico />
          </div>
          <div className="flex gap-6 min-h-0 m-2">
            <div className="rounded-md flex-3 w-full p-4 ms-4 shadow-sm shadow-border-default">
              <h2 className="text-lg font-bold text-brand">Filiación</h2>
              <FiliacionForm />

              <div className="gap-6">
                <LugarResidencia />
              </div>

              <ContactoEmergencia />
              <HuellaFirma />
            </div>
            {especialidad === "010" && (
              <div className="flex flex-2 w-full flex-col min-h-0">
                <Suspense
                  fallback={
                    <div className="flex min-h-120 flex-col gap-3 rounded-2xl border border-border-default/70 bg-surface-default p-4 shadow-sm shadow-border-default">
                      <div className="h-10 animate-pulse rounded-xl bg-surface-light" />
                      <div className="h-14 animate-pulse rounded-xl bg-surface-light" />
                      <div className="flex-1 animate-pulse rounded-2xl bg-surface-light" />
                    </div>
                  }
                >
                  <ExamenesList
                    enabled
                    onSelectionChange={handleExamenesChange}
                    initialExamenes={examenesLaboratorio}
                    readOnly={mode === "actualizar"}
                  />
                </Suspense>
              </div>
            )}
            {especialidad === "009" && (
              <div className="flex flex-2 w-full flex-col min-h-0">
                <Suspense
                  fallback={
                    <div className="flex min-h-120 flex-col gap-3 rounded-2xl border border-border-default/70 bg-surface-default p-4 shadow-sm shadow-border-default">
                      <div className="h-10 animate-pulse rounded-xl bg-surface-light" />
                      <div className="h-14 animate-pulse rounded-xl bg-surface-light" />
                      <div className="flex-1 animate-pulse rounded-2xl bg-surface-light" />
                    </div>
                  }
                >
                  <EspecialidadSubcategorias
                    idCategoria={2}
                    titulo="Tipo de Examen"
                    fieldName="atencion.subcategoria_ecografia"
                    readOnly={mode === "actualizar"}
                  />
                </Suspense>
              </div>
            )}
            {especialidad === "011" && (
              <div className="flex flex-2 w-full flex-col min-h-0">
                <Suspense
                  fallback={
                    <div className="flex min-h-120 flex-col gap-3 rounded-2xl border border-border-default/70 bg-surface-default p-4 shadow-sm shadow-border-default">
                      <div className="h-10 animate-pulse rounded-xl bg-surface-light" />
                      <div className="h-14 animate-pulse rounded-xl bg-surface-light" />
                      <div className="flex-1 animate-pulse rounded-2xl bg-surface-light" />
                    </div>
                  }
                >
                  <EspecialidadSubcategorias
                    idCategoria={5}
                    titulo="Tipo de Examen"
                    fieldName="atencion.subcategoria_esp011"
                    readOnly={mode === "actualizar"}
                  />
                </Suspense>
              </div>
            )}
          </div>
        </form>
        <ModalBusquedaClientes
          isOpen={modals.busquedaClientes}
          onClose={() => toggleModal("busquedaClientes", false)}
          onSelect={(cliente) => {
            form.setValue(
              "atencion.ruc_cliente",
              cliente.ruc_cli?.trim() ?? "",
            );
            form.setValue(
              "atencion.nombre_empresa",
              cliente.des_cli?.trim() ?? "",
            );
          }}
        />

        <ModalRegistroPaciente
          isOpen={modals.registroPaciente}
          onClose={() => toggleModal("registroPaciente", false)}
          catalogs={catalogs}
          mode="paciente"
        />

        <ModalRegistroPaciente
          isOpen={modals.registroPatrocinador}
          onClose={() => toggleModal("registroPatrocinador", false)}
          catalogs={catalogs}
          mode="patrocinador"
        />

        <ModalRegistroMedico
          isOpen={modals.registroMedico}
          onClose={() => toggleModal("registroMedico", false)}
          especialidades={catalogs.especialidades}
        />
      </div>
    </FormProvider>
  );
}
