import type { LecturaResultado } from "@/lib/lecturaResultadosData";

type Props = { lectura: LecturaResultado };

function FichaField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium uppercase tracking-wide text-text-secondary">
        {label}
      </span>
      <span className="text-sm font-semibold leading-tight text-text-primary">
        {value}
      </span>
    </div>
  );
}

function GrupoBadge({ grupo }: { grupo: "G1" | "G2" | "G3" }) {
  const map = {
    G1: "bg-success/15 text-success-dark",
    G2: "bg-risk-salmon/15 text-risk-salmon",
    G3: "bg-risk-red/10 text-risk-red",
  } as const;
  const dot = {
    G1: "bg-success",
    G2: "bg-risk-salmon",
    G3: "bg-risk-red",
  } as const;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold leading-none ${map[grupo]}`}
    >
      <span className={`size-2 rounded-full ${dot[grupo]}`} aria-hidden="true" />
      {grupo}
    </span>
  );
}

export default function LecturaResultadoDetalleContent({ lectura }: Props) {
  const isCompletada = lectura.estado === "COMPLETADA";
  const constancia = lectura.constancia;

  return (
    <div className="flex flex-col gap-5 px-10 pb-6 text-xs">
      {/* ── FICHA SUPERIOR ── */}
      <section
        aria-label="Ficha del trabajador"
        className="rounded-xl bg-surface-default p-6 shadow-sm shadow-border-default"
      >
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`inline-flex min-w-36 items-center justify-center rounded-full px-4 py-1 text-[11px] font-semibold tracking-wide ${
              isCompletada
                ? "bg-[#dcfce7] text-[#16a34a]"
                : "bg-risk-red/10 text-risk-red"
            }`}
          >
            {lectura.estadoLabel}
          </span>
          <GrupoBadge grupo={lectura.grupo} />
          <span className="inline-flex items-center justify-center rounded-full bg-surface-light px-4 py-1 text-[11px] font-medium tracking-wide text-text-secondary">
            MODALIDAD {lectura.modalidad.toUpperCase()}
          </span>
        </div>

        <div className="my-5 border-t border-dashed border-border-subtle" aria-hidden="true" />

        <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-5">
          <FichaField label="Documento" value={`DNI ${lectura.dni}`} />
          <FichaField label="Puesto" value={lectura.puesto} />
          <FichaField label="Sede" value={lectura.sede} />
          <FichaField label="Fecha del EMO" value={lectura.fechaCorta} />
          <FichaField label="Tipo de EMO" value={lectura.emo} />
          <FichaField label="Médico responsable" value={lectura.medico} />
          <FichaField label="EMO de referencia" value={lectura.emoRef} />
          <FichaField label="Expiración del enlace" value={lectura.expiracionCorta} />
        </div>
      </section>

      {/* ── INFORME + CONSTANCIA ── */}
      <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2">
        {/* Informe médico resumido */}
        <section
          aria-labelledby="informe-title"
          className="flex flex-col rounded-xl bg-surface-default p-6 shadow-sm shadow-border-default"
        >
          <h2
            id="informe-title"
            className="text-sm font-medium uppercase tracking-wide text-text-primary"
          >
            Informe médico resumido
          </h2>
          <p className="mt-1 text-sm text-accent-muted">
            Contenido autorizado que visualiza el trabajador
          </p>

          <p className="mt-8 text-base leading-relaxed text-brand">
            <span className="font-bold">{lectura.conclusionTitulo}</span>
            {" — "}
            {lectura.conclusionDetalle}
          </p>

          <h3 className="mt-8 text-xs font-medium uppercase tracking-wide text-text-secondary">
            Principales resultados
          </h3>
          <ul className="mt-2 list-disc space-y-1 pl-6 marker:text-text-primary">
            {lectura.resultados.map((r) => (
              <li
                key={r}
                className="text-sm leading-relaxed text-text-primary"
              >
                {r}
              </li>
            ))}
          </ul>

          <h3 className="mt-8 text-xs font-medium uppercase tracking-wide text-text-secondary">
            Recomendaciones
          </h3>
          <ul className="mt-2 list-disc space-y-1 pl-6 marker:text-text-primary">
            {lectura.recomendaciones.map((r) => (
              <li
                key={r}
                className="text-sm leading-relaxed text-text-primary"
              >
                {r}
              </li>
            ))}
          </ul>

          <p className="mt-auto pt-10 text-xs leading-relaxed text-risk-salmon">
            Este módulo referencia el EMO original ({lectura.emoRef}); no
            duplica los resultados médicos.
          </p>
        </section>

        {/* Constancia de lectura */}
        <section
          aria-labelledby="constancia-title"
          className="flex flex-col rounded-xl bg-surface-default p-6 shadow-sm shadow-border-default"
        >
          <h2
            id="constancia-title"
            className="text-sm font-medium uppercase tracking-wide text-text-primary"
          >
            Constancia de lectura
          </h2>

          {constancia ? (
            <>
              <div className="mt-8 grid grid-cols-3 gap-x-6 gap-y-5">
                <FichaField label="Nombre" value={constancia.nombre} />
                <FichaField label="DNI" value={constancia.dni} />
                <FichaField label="Fecha" value={constancia.fecha} />
                <FichaField label="Transacción" value={constancia.transaccion} />
                <FichaField label="Modalidad" value={constancia.modalidad} />
                <FichaField label="Hora" value={constancia.hora} />
                <div className="col-span-3">
                  <FichaField
                    label="Médico responsable"
                    value={constancia.medico}
                  />
                </div>
                <div className="col-span-3">
                  <FichaField
                    label="Observaciones"
                    value={constancia.observaciones}
                  />
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-violet/15 p-4">
                <p className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                  <i
                    className="fa-solid fa-fingerprint text-2xl text-violet"
                    aria-hidden="true"
                  />
                  Validación biométrica
                </p>
                <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                  Validada · Referencia {constancia.bioRef} · Lector{" "}
                  {constancia.lector} · {constancia.registroFechaHora} ·
                  Registró {constancia.medico}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-text-secondary">
                  No se almacenan imágenes de huellas; solo la referencia
                  segura de validación.
                </p>
              </div>
            </>
          ) : (
            <div className="mt-8 flex flex-col gap-4">
              <p className="text-sm leading-relaxed text-text-primary">
                Aún no se registra constancia de lectura.
              </p>
              <p className="text-sm leading-relaxed text-text-primary">
                {lectura.grupo === "G1"
                  ? "Este trabajador es G1: la entrega puede realizarse de forma remota con confirmación de recepción."
                  : `Este trabajador es ${lectura.grupo}: la lectura debe realizarse presencialmente en la UME con firma digital y validación biométrica.`}
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
