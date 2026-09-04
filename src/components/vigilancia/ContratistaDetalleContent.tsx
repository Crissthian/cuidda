import DocumentoRespaldoModal from "@/components/vigilancia/DocumentoRespaldoModal";
import type { contratistas } from "@/lib/contratistasData";
import { useState } from "react";

type Props = { contratista: (typeof contratistas)[number] };

function Field({
  label,
  value,
  badge,
}: {
  label: string;
  value: string;
  badge?: string;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs font-medium uppercase tracking-wide text-muted">
        {label}
      </span>
      <span className="text-xs font-semibold text-text-primary">
        {value}{" "}
        {badge && (
          <span className="ml-1 rounded-md bg-success/15 px-2 py-0.5 align-middle text-[9px] font-bold text-success-dark">
            {badge}
          </span>
        )}
      </span>
    </div>
  );
}

function ProgressBar({
  value,
  color = "bg-brand",
}: {
  value: number;
  color?: string;
}) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-light">
      <div
        className={`h-full rounded-full ${color}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

const responsables = [
  {
    nombre: "Ing. Raúl Quispe",
    principal: true,
    cargo: "Jefe de SST",
    tipo: "Responsable de SST",
    telefono: "987 456 129",
    correo: "rquispe@semeco.com.pe",
  },
  {
    nombre: "Dra. Elena Ríos",
    principal: false,
    cargo: "Médico ocupacional",
    tipo: "Médico ocupacional",
    telefono: "981 220 774",
    correo: "erios@semeco.com.pe",
  },
] as const;

const historial = [
  {
    fecha: "2026-08-15",
    personal: "25",
    emo: "22",
    cumplimiento: 88,
    fuente:
      "Listado recibido\n3 trabajadores nuevos pendientes de EMO de ingreso.",
    registrado: "Gestión Médica",
  },
  {
    fecha: "2026-07-01",
    personal: "24",
    emo: "20",
    cumplimiento: 90,
    fuente: "Declaración del contratista",
    registrado: "Gestión Médica",
  },
] as const;

const documentos = [
  {
    fecha: "2026-09-02",
    tipo: "Listado de trabajadores",
    archivo: "Listado de personal agosto 2026.xlsx",
  },
  {
    fecha: "2026-08-15",
    tipo: "Reporte de cumplimiento",
    archivo: "Reporte de cumplimiento_VASA.pdf",
  },
  {
    fecha: "2026-08-15",
    tipo: "Constancia de EMO",
    archivo: "Constancias EMO VASA.pdf",
  },
] as const;

export default function ContratistaDetalleContent({ contratista }: Props) {
  const [isRespaldoOpen, setIsRespaldoOpen] = useState(false);

  return (
    <div className="flex flex-col gap-5 px-10 pb-6">
      {/* ── Fila superior ── */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* INFORMACIÓN GENERAL */}
        <section
          aria-labelledby="info-general"
          className="rounded-xl bg-surface-default p-5 shadow-sm shadow-border-default"
        >
          <h2
            id="info-general"
            className="text-xs font-bold uppercase tracking-wide text-text-primary"
          >
            Información general
          </h2>
          <p className="text-xs text-muted">Del contratista</p>
          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4">
            <Field label="Razón social" value={`${contratista.empresa} S.A.`} />
            <Field label="Nombre comercial" value={contratista.empresa} />
            <Field label="RUC" value="20481239876" />
            <Field
              label="Actividad económica"
              value="Fabricación y montaje de estructuras metálicas"
            />
            <Field
              label="Servicio contratado"
              value="Montaje de estructuras y soldadura"
            />
            <Field label="Sede(s)" value="Condorcocha - Conchán" />
            <Field label="Responsable principal" value="Ing. Raúl Quispe" />
            <Field
              label="Personal reportado / Estado"
              value={`${contratista.trabajadores} trabajadores`}
              badge={contratista.estado}
            />
            <Field label="Dirección" value="Av. Ferrocarril 1240, Huancayo" />
            <Field label="Teléfono" value="064 231455" />
            <Field label="Correo corporativo" value="contacto@semeco.com.pe" />
            <Field label="Inicio de actividades" value="2025-03-01" />
            <div className="col-span-2">
              <Field
                label="Observaciones"
                value="Trabajos en caliente y espacios confinados."
              />
            </div>
          </div>
        </section>

        {/* CUMPLIMIENTO */}
        <section
          aria-labelledby="cumplimiento"
          className="rounded-xl bg-surface-default p-5 shadow-sm shadow-border-default"
        >
          <h2
            id="cumplimiento"
            className="text-xs font-bold uppercase tracking-wide text-text-primary"
          >
            Cumplimiento de vigilancia médica
          </h2>
          <p className="text-xs text-muted">
            Registro manual del cumplimiento declarado o verificado.
          </p>

          <div className="px-4 py-2 my-4 shadow-sm shadow-border-default rounded-lg">
            <p className="text-sm font-semibold text-brand">Cumplimiento EMO</p>
            <p className="text-xl font-bold text-brand">88%</p>
            <p className="mt-1 text-xs text-brand">
              22 de 25 trabajadores con EMO vigente
            </p>
            <div className="mt-2">
              <ProgressBar value={88} color="bg-risk-salmon" />
            </div>
            <p className="mt-2 text-[11px] text-muted">
              Última actualización 2026-08-15
            </p>

            <div className="mt-3 flex items-center gap-2 rounded-lg bg-risk-salmon/15 px-3 py-2 text-[10px] uppercase tracking-wide text-risk-salmon">
              <i
                className="fa-solid fa-triangle-exclamation text-xs"
                aria-hidden="true"
              />
              3 trabajadores pendientes de EMO vigente
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4">
            <Field label="Fecha de última validación" value="2026-08-15" />
            <Field
              label="Próximo vencimiento identificado"
              value="2026-10-02"
            />
            <Field
              label="Responsable que proporcionó la información"
              value="Ing. Raúl Quispe"
            />
          </div>
          <div className="mt-4">
            <Field
              label="Observaciones"
              value="3 trabajadores nuevos pendientes de EMO de ingreso."
            />
          </div>
        </section>
      </div>

      {/* ── RESPONSABLES ── */}
      <section
        aria-labelledby="responsables"
        className="rounded-xl bg-surface-default p-5 shadow-sm shadow-border-default"
      >
        <h2
          id="responsables"
          className="text-xs font-bold uppercase tracking-wide text-text-primary"
        >
          Responsables
        </h2>
        <p className="text-xs text-muted">
          Contactos para coordinar información pendiente o incumplimientos.
        </p>
        <div className="mt-4 overflow-x-auto">
          <div
            className="min-w-200 text-xs"
            role="table"
            aria-label="Responsables"
          >
            <div
              className="grid grid-cols-[1.4fr_1fr_1.2fr_0.9fr_1.3fr] gap-4 rounded-lg bg-surface-light p-3 text-[10px] font-bold uppercase tracking-wider text-muted"
              role="row"
            >
              <span role="columnheader">Nombre</span>
              <span role="columnheader">Cargo</span>
              <span role="columnheader">Tipo</span>
              <span role="columnheader">Teléfono</span>
              <span role="columnheader">Correo</span>
            </div>
            <div className="divide-y divide-dashed divide-border-subtle">
              {responsables.map((r) => (
                <div
                  key={r.nombre}
                  className="grid grid-cols-[1.4fr_1fr_1.2fr_0.9fr_1.3fr] items-center gap-4 p-3"
                  role="row"
                >
                  <span role="cell" className="font-semibold text-text-primary">
                    {r.nombre}{" "}
                    {r.principal && (
                      <span className="ml-1 rounded-md bg-violet/15 px-2 py-0.5 text-[9px] font-bold text-violet">
                        PRINCIPAL
                      </span>
                    )}
                  </span>
                  <span role="cell" className="text-text-secondary">
                    {r.cargo}
                  </span>
                  <span role="cell" className="text-text-secondary">
                    {r.tipo}
                  </span>
                  <span role="cell" className="text-text-secondary">
                    {r.telefono}
                  </span>
                  <span role="cell" className="text-text-secondary">
                    {r.correo}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HISTORIAL ── */}
      <section
        aria-labelledby="historial"
        className="rounded-xl bg-surface-default p-5 shadow-sm shadow-border-default"
      >
        <h2
          id="historial"
          className="text-xs font-bold uppercase tracking-wide text-text-primary"
        >
          Historial de actualizaciones
        </h2>
        <p className="text-xs text-muted">
          Cada actualización se registra sin sobrescribir la anterior.
        </p>
        <div className="mt-4 overflow-x-auto">
          <div
            className="min-w-220 text-xs"
            role="table"
            aria-label="Historial"
          >
            <div
              className="grid grid-cols-[0.7fr_0.6fr_0.7fr_1.2fr_1.6fr_1fr] gap-4 rounded-lg bg-surface-light p-3 text-[10px] font-bold uppercase tracking-wider text-muted"
              role="row"
            >
              <span role="columnheader">Fecha</span>
              <span role="columnheader">Personal</span>
              <span role="columnheader">EMO vigente</span>
              <span role="columnheader">Cumplimiento</span>
              <span role="columnheader">Fuente</span>
              <span role="columnheader">Registrado por</span>
            </div>
            <div className="divide-y divide-dashed divide-border-subtle">
              {historial.map((h) => (
                <div
                  key={h.fecha}
                  className="grid grid-cols-[0.7fr_0.6fr_0.7fr_1.2fr_1.6fr_1fr] items-center gap-4 p-3"
                  role="row"
                >
                  <span role="cell" className="font-semibold text-text-primary">
                    {h.fecha}
                  </span>
                  <span role="cell" className="text-text-secondary">
                    {h.personal}
                  </span>
                  <span role="cell" className="font-bold text-brand">
                    {h.emo}
                  </span>
                  <span role="cell">
                    <span className="flex items-center gap-2">
                      <span className="w-24">
                        <ProgressBar
                          value={h.cumplimiento}
                          color="bg-success-dark"
                        />
                      </span>
                      <span className="text-[11px] text-text-secondary">
                        {h.cumplimiento}%
                      </span>
                    </span>
                  </span>
                  <span
                    role="cell"
                    className="whitespace-pre-line text-text-secondary"
                  >
                    {h.fuente}
                  </span>
                  <span
                    role="cell"
                    className="flex items-center gap-1.5 text-text-secondary"
                  >
                    {h.registrado}
                    <i
                      className="fa-regular fa-circle-check text-success-dark"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DOCUMENTOS ── */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <section
          aria-labelledby="documentos"
          className="rounded-xl bg-surface-default p-5 shadow-sm shadow-border-default"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2
                id="documentos"
                className="text-xs font-bold uppercase tracking-wide text-text-primary"
              >
                Documentos de respaldo
              </h2>
              <p className="text-xs text-muted">
                PDF, XLSX, XLS, JPG o PNG remitidos por el contratista.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsRespaldoOpen(true)}
              className="flex shrink-0 items-center gap-2 rounded-lg bg-muted-20 px-4 py-2 text-[10px] font-bold tracking-wide text-muted hover:bg-muted-30"
            >
              <i className="fa-solid fa-plus text-[10px]" aria-hidden="true" />
              CARGAR DOCUMENTO
            </button>
          </div>
          <div className="mt-4 overflow-x-auto">
            <div
              className="min-w-140 text-xs"
              role="table"
              aria-label="Documentos"
            >
              <div
                className="grid grid-cols-[0.7fr_1fr_1.4fr_0.5fr] gap-4 rounded-lg bg-surface-light p-3 text-[10px] font-bold uppercase tracking-wider text-muted"
                role="row"
              >
                <span role="columnheader">Fecha</span>
                <span role="columnheader">Tipo</span>
                <span role="columnheader">Archivo</span>
                <span role="columnheader">
                  <span className="sr-only">Acciones</span>
                </span>
              </div>
              <div className="divide-y divide-dashed divide-border-subtle">
                {documentos.map((d) => (
                  <div
                    key={d.archivo}
                    className="grid grid-cols-[0.7fr_1fr_1.4fr_0.5fr] items-center gap-4 p-3"
                    role="row"
                  >
                    <span role="cell" className="text-text-secondary">
                      {d.fecha}
                    </span>
                    <span role="cell" className="text-text-secondary">
                      {d.tipo}
                    </span>
                    <span role="cell" className="font-medium text-brand">
                      {d.archivo}
                    </span>
                    <span
                      role="cell"
                      className="flex items-center justify-end gap-3 text-brand"
                    >
                      <button
                        type="button"
                        aria-label={`Ver ${d.archivo}`}
                        className="hover:text-primary-hover"
                      >
                        <i className="fa-regular fa-eye" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        aria-label={`Descargar ${d.archivo}`}
                        className="hover:text-primary-hover"
                      >
                        <i
                          className="fa-solid fa-download"
                          aria-hidden="true"
                        />
                      </button>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <DocumentoRespaldoModal
        isOpen={isRespaldoOpen}
        onClose={() => setIsRespaldoOpen(false)}
      />
    </div>
  );
}
