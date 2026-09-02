import type { consultasTecnicas } from "@/lib/consultasTecnicasData";

type Consulta = (typeof consultasTecnicas)[number];

type Props = {
  consulta: Consulta;
};

function EstadoBadge({ estado }: { estado: Consulta["estado"] }) {
  const isPendiente = estado === "PENDIENTE";
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-6 py-1.5 text-[11px] font-bold tracking-wide ${
        isPendiente
          ? "bg-risk-salmon/10 text-risk-salmon"
          : "bg-success/10 text-success-dark"
      }`}
    >
      {estado}
    </span>
  );
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] font-medium uppercase tracking-wider text-muted">
        {label}
      </span>
      <span className="text-sm font-semibold leading-tight text-text-primary">
        {value}
      </span>
    </div>
  );
}

function DocumentoItem({ nombre }: { nombre: string; archivo: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex flex-1 items-center gap-3 rounded-lg border border-dashed border-brand/40 bg-surface-light/50 px-3 py-3">
        <i
          className="fa-regular fa-file-pdf text-[22px] text-risk-salmon shrink-0"
          aria-hidden="true"
        />
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-xs font-semibold text-text-secondary">
            {nombre}
          </span>
          <span className="text-[11px] text-muted">PDF · 412 KB</span>
        </div>
      </div>
      <div className="flex shrink-0 flex-col gap-1.5">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-lg bg-muted-20 px-3 py-1.5 text-[11px] font-medium text-muted transition-colors hover:bg-muted-30 hover:text-text-secondary"
        >
          <i className="fa-solid fa-eye text-[10px]" aria-hidden="true" />
          Ver archivo
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-lg bg-muted-20 px-3 py-1.5 text-[11px] font-medium text-muted transition-colors hover:bg-muted-30 hover:text-text-secondary"
        >
          <i className="fa-solid fa-download text-[10px]" aria-hidden="true" />
          Descargar
        </button>
      </div>
    </div>
  );
}

export default function ConsultaTecnicaDetalleContent({ consulta }: Props) {
  const isPendiente = consulta.estado === "PENDIENTE";

  return (
    <div className="flex flex-col gap-5 px-10 pb-8">
      {/* ── Información del caso ── */}
      <section
        className="rounded-xl bg-surface-default p-5 shadow-sm shadow-border-default"
        aria-labelledby="info-caso-title"
      >
        <div className="flex items-center justify-between gap-4">
          <h2
            id="info-caso-title"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand"
          >
            <i
              className="fa-solid fa-file-circle-plus text-[15px]"
              aria-hidden="true"
            />
            Información del caso
          </h2>
          <EstadoBadge estado={consulta.estado} />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <InfoField label="Trabajador" value={consulta.trabajador} />
          <InfoField label="Empresa" value={consulta.empresa} />
          <InfoField label="Puesto" value={consulta.cargo} />
          <InfoField
            label="Médico solicitante"
            value={consulta.medicoSolicitante}
          />
        </div>
      </section>

      {/* ── Grid: Motivo + Pregunta | Documentos ── */}
      <div className="grid grid-cols-12 gap-5">
        {/* Col izquierda */}
        <div className="flex flex-col gap-5 col-span-9">
          {/* Motivo de consulta */}
          <section
            className="rounded-xl bg-surface-default p-5 shadow-sm shadow-border-default"
            aria-labelledby="motivo-title"
          >
            <h2
              id="motivo-title"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand"
            >
              <i
                className="fa-solid fa-comment-medical text-[15px]"
                aria-hidden="true"
              />
              Motivo de consulta
            </h2>
            <ul className="mt-3 list-disc pl-8 marker:text-text-primary">
              <li className="text-sm leading-relaxed text-text-primary">
                {consulta.motivo}
              </li>
            </ul>
          </section>
          {/* Pregunta realizada */}
          <section
            className="rounded-xl bg-surface-default p-5 shadow-sm shadow-border-default"
            aria-labelledby="pregunta-title"
          >
            <h2
              id="pregunta-title"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand"
            >
              <i
                className="fa-solid fa-circle-question text-[15px]"
                aria-hidden="true"
              />
              Pregunta realizada
            </h2>
            <ul className="mt-3 list-disc pl-8 marker:text-text-primary">
              <li className="text-sm leading-relaxed text-text-primary">
                {consulta.pregunta}
              </li>
            </ul>
          </section>
        </div>
        {/* Col derecha — Documentos relacionados */}
        <div className="col-span-3">
          <section
            className="flex h-full flex-col rounded-xl bg-surface-default p-5 shadow-sm shadow-border-default"
            aria-labelledby="docs-title"
          >
            <h2
              id="docs-title"
              className="text-xs font-bold uppercase tracking-wider text-text-primary"
            >
              Documentos relacionados
            </h2>

            <div className="mt-4 flex flex-col gap-4">
              {consulta.documentos.map((doc) => (
                <DocumentoItem
                  key={doc.archivo}
                  nombre={doc.nombre}
                  archivo={doc.archivo}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
      {consulta.segundaOpinion && (
        <section
          className="rounded-xl border border-success/20 bg-surface-default p-5"
          style={{
            boxShadow: "-4px 6px 12px -4px rgb(30 230 125 / 0.8)",
          }}
          aria-labelledby="segunda-opinion-title"
        >
          <h2
            id="segunda-opinion-title"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand"
          >
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-success text-[10px] text-white">
              <i className="fa-solid fa-question" aria-hidden="true" />
            </span>
            Segunda opinión técnica
          </h2>
          <div className="ms-8">
            <p className="mt-1.5 text-xs leading-relaxed text-text-secondary">
              <span className="font-medium text-text-primary">
                Especialidad:
              </span>{" "}
              {consulta.segundaOpinion.especialidad} ·{" "}
              <span className="font-medium text-text-primary">
                Especialista:
              </span>{" "}
              {consulta.segundaOpinion.especialista} ·{" "}
              <span className="font-medium text-text-primary">Fecha:</span>{" "}
              {consulta.segundaOpinion.fecha}
            </p>

            <div className="mt-4 flex flex-col gap-4">
              <div>
                <h3 className="text-sm font-semibold text-text-primary">
                  Opinión técnica
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                  {consulta.segundaOpinion.opinion}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-text-primary">
                  Recomendaciones
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                  {consulta.segundaOpinion.recomendaciones}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
      {isPendiente ? (
        <p className="text-xs font-medium text-risk-salmon">
          La consulta está pendiente de respuesta del especialista Lucemedic.
        </p>
      ) : null}
    </div>
  );
}
