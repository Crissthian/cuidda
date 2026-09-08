import {
  getAtencionesHistorial,
  getHistoriaClinica,
} from "@/lib/pacientesData";
import { useEffect, useState } from "react";
import ListaAtencionesHistorial from "./ListaAtencionesHistorial";

/**
 * Contenedor de historia clínica: lee ?historia= en el cliente
 * (la página es estática, Astro.url.searchParams no está disponible en build).
 */
export default function HistoriaClinicaContainer() {
  const [historia, setHistoria] = useState("");
  const [fechaFiltro, setFechaFiltro] = useState("");
  const [numeroFiltro, setNumeroFiltro] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setHistoria(params.get("historia") ?? "");
  }, []);

  const paciente = historia ? getHistoriaClinica(historia) : null;
  const todasAtenciones = historia ? getAtencionesHistorial(historia) : [];

  const atenciones = todasAtenciones.filter((a) => {
    const matchNumero =
      !numeroFiltro.trim() ||
      a.numero.toLowerCase().includes(numeroFiltro.trim().toLowerCase());
    const matchFecha =
      !fechaFiltro || a.fecha.split("/").reverse().join("-") === fechaFiltro;
    return matchNumero && matchFecha;
  });

  const errorPaciente = !historia
    ? "No se proporcionó un número de historia clínica."
    : !paciente
      ? `No se encontró ningún paciente con el N° de historia "${historia}".`
      : null;

  return (
    <>
      {/* ── CABECERA PACIENTE ── */}
      <div className="bg-surface-default rounded-xl mb-6 shadow-md shadow-brand/20">
        <div className="flex items-center gap-3 px-6 py-2 border-b border-surface-light">
          <div className="size-auto rounded-full flex items-center justify-center">
            <i className="fas fa-user text-text-primary text-2xl"></i>
          </div>
          <h1 className="text-2xl font-bold text-text-primary">
            Datos del paciente
          </h1>
        </div>

        {paciente ? (
          <div className="px-6 py-5">
            <div className="grid grid-cols-3 gap-x-12 gap-y-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-brand min-w-30">
                  N° de Historia
                </span>
                <span className="form-input text-sm text-text-primary flex-1">
                  {paciente.historia}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-brand min-w-30">
                  D.N.I
                </span>
                <span className="form-input text-sm text-text-primary flex-1">
                  {paciente.dni}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-brand min-w-30">
                  Nombres
                </span>
                <span className="form-input text-sm text-text-primary flex-1">
                  {paciente.nombres}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-brand min-w-30">
                  Apellidos
                </span>
                <span className="form-input text-sm text-text-primary flex-1">
                  {paciente.apellidos}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-brand min-w-30">
                  F. de nacimiento
                </span>
                <span className="form-input text-sm text-text-primary flex-1">
                  {paciente.fechaNacimiento}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-brand min-w-30">
                  Edad
                </span>
                <span className="form-input text-sm text-text-primary flex-1">
                  {paciente.edad}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-brand min-w-30">
                  Sexo
                </span>
                <span className="form-input text-sm text-text-primary flex-1">
                  {paciente.sexo}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-brand min-w-30">
                  Estado Civil
                </span>
                <span className="form-input text-sm text-text-primary flex-1">
                  {paciente.estadoCivil}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 px-6 py-5 text-sm text-text-secondary">
            <i className="fas fa-circle-exclamation text-brand/60 text-base" />
            <span>
              {errorPaciente ??
                "No se pudo cargar la información del paciente."}
            </span>
          </div>
        )}
      </div>

      {/* ── SECCIÓN ATENCIONES ── */}
      <div className="bg-surface-default rounded-xl shadow-md border border-surface-light mt-6">
        <div className="flex items-center gap-4 px-6 py-4 border-b border-surface-light">
          <div className="relative flex-1 max-w-xs">
            <i className="fas fa-calendar-alt absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm"></i>
            <input
              type="date"
              className="form-input pl-9 text-sm py-2.5"
              placeholder="Fecha de atención"
              value={fechaFiltro}
              onChange={(e) => setFechaFiltro(e.target.value)}
            />
          </div>
          <div className="flex-1 max-w-xs">
            <input
              type="text"
              className="form-input text-sm py-2.5"
              placeholder="N° de atención"
              value={numeroFiltro}
              onChange={(e) => setNumeroFiltro(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="ml-auto px-8 py-2.5 rounded-lg bg-brand text-white font-bold text-sm tracking-wide hover:opacity-90 transition-all"
            onClick={() => {
              setFechaFiltro("");
              setNumeroFiltro("");
            }}
          >
            LIMPIAR
          </button>
        </div>

        <ListaAtencionesHistorial
          atenciones={atenciones}
          datosPaciente={
            paciente
              ? {
                  apellidosNombres: paciente.nombreCompleto,
                  dni: paciente.dni,
                  fechaNacimiento: paciente.fechaNacimiento,
                  edad: paciente.edad,
                  sexo: paciente.sexo,
                }
              : undefined
          }
        />
      </div>
    </>
  );
}
