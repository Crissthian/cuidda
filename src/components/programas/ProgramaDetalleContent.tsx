import { programaDetalle } from "@/lib/programasData";

type Props = { programaId: number };

export default function ProgramaDetalleContent({
  programaId: _programaId,
}: Props) {
  const detalle = programaDetalle;

  return (
    <div className="flex flex-col gap-5 text-xs">
      <div className="grid grid-cols-5 gap-6">
        {/* Resumen del programa */}
        <section
          className="col-span-3 flex flex-col rounded-xl bg-surface-default p-5 shadow-sm shadow-border-subtle"
          aria-labelledby="resumen-programa-title"
        >
          <h2 id="resumen-programa-title" className="sr-only">
            Resumen del programa
          </h2>

          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg bg-muted-20 px-4 py-3">
              <span className="block text-xs font-medium uppercase tracking-wider text-muted">
                Responsable
              </span>
              <span className="mt-0.5 block text-sm font-bold text-text-primary">
                {detalle.responsable}
              </span>
            </div>
            <div className="rounded-lg bg-muted-20 px-4 py-3">
              <span className="block text-xs font-medium uppercase tracking-wider text-muted">
                Enfoque
              </span>
              <span className="mt-0.5 block text-sm font-bold text-text-primary">
                {detalle.enfoque}
              </span>
            </div>
            <div className="rounded-lg bg-muted-20 px-4 py-3">
              <span className="block text-xs font-medium uppercase tracking-wider text-muted">
                Población
              </span>
              <span className="mt-0.5 block text-sm font-bold text-text-primary">
                {detalle.poblacion}
              </span>
            </div>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-text-secondary">
            {detalle.objetivo}
          </p>

          <div className="mt-4 flex items-center gap-4">
            <div className="flex-1">
              <div className="h-3 overflow-hidden rounded-full bg-surface-light">
                <div
                  className="h-full rounded-full bg-violet"
                  style={{ width: `${detalle.avance}%` }}
                  role="progressbar"
                  aria-valuenow={detalle.avance}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Avance del programa"
                />
              </div>
              <p className="mt-1.5 text-brand">
                {detalle.avanceDetalle} ·{" "}
                <span className="font-bold">{detalle.avanceCompletadas}</span>
              </p>
            </div>
            <span className="shrink-0 text-3xl font-bold leading-none text-brand">
              {detalle.avance}%
            </span>
          </div>
        </section>

        {/* Distribución por grupo de riesgo */}
        <section
          className="col-span-2 flex flex-col rounded-xl bg-surface-default p-5 shadow-sm shadow-border-subtle"
          aria-labelledby="distribucion-title"
        >
          <h2
            id="distribucion-title"
            className="text-xs font-bold uppercase tracking-wide text-text-primary"
          >
            Distribución por grupo de riesgo
          </h2>
          <p className="text-muted">
            Tomada de la clasificación existente
          </p>

          <div className="mt-4 flex flex-col gap-4">
            {detalle.distribucionRiesgo.map((g) => (
              <div key={g.id} className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold ${g.badgeClass}`}
                  >
                    <span
                      className={`size-1.5 rounded-full ${g.dotClass}`}
                      aria-hidden="true"
                    />
                    {g.id}
                  </span>
                  <span className="flex-1 text-text-secondary">
                    {g.descripcion}
                  </span>
                  <span className="text-xs font-bold text-text-primary">
                    {g.cantidad}{" "}
                    <span className="font-normal text-muted">
                      ({g.porcentaje}%)
                    </span>
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-surface-light">
                  <div
                    className={`h-full rounded-full ${g.barClass}`}
                    style={{ width: `${g.porcentaje}%` }}
                    role="progressbar"
                    aria-valuenow={g.porcentaje}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`Distribución ${g.id}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Plan de actividades */}
      <section
        className="flex flex-col rounded-xl bg-surface-default p-5 shadow-sm shadow-border-subtle"
        aria-labelledby="plan-actividades-title"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="plan-actividades-title"
              className="text-xs font-bold uppercase tracking-wide text-text-primary"
            >
              Plan de actividades
            </h2>
            <p className="mt-0.5 text-muted">
              Registre el cumplimiento; el avance del programa se recalcula
              automáticamente
            </p>
          </div>
          <button
            type="button"
            className="flex shrink-0 items-center gap-1.5 rounded-lg bg-muted-20 px-4 py-2 font-bold text-muted transition hover:bg-muted-30"
          >
            <i className="fa-solid fa-plus" aria-hidden="true" />
            AÑADIR ACTIVIDAD
          </button>
        </div>

        <div className="mt-4 overflow-hidden rounded-lg">
          <div className="grid grid-cols-[1.6fr_1fr_0.6fr_0.6fr_1fr_auto] items-center gap-4 rounded-lg bg-surface-light px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
            <span>Actividad</span>
            <span>Responsable</span>
            <span>Fecha</span>
            <span>Estado</span>
            <span>Cumplimiento</span>
            <span className="w-28" aria-hidden="true" />
          </div>
          <div className="divide-y divide-dashed divide-border-subtle">
            {detalle.planActividades.map((row) => (
              <div
                key={row.id}
                className="grid grid-cols-[1.6fr_1fr_0.6fr_0.6fr_1fr_auto] items-center gap-4 px-4 py-3 text-xs"
              >
                <span className="font-medium text-text-primary">
                  {row.actividad}
                </span>
                <span className="text-text-secondary">{row.responsable}</span>
                <span className="font-bold text-brand">{row.fecha}</span>
                <span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[9px] font-bold ${row.estadoClass}`}
                  >
                    {row.estado}
                  </span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-light">
                    <span
                      className="block h-full rounded-full bg-brand"
                      style={{ width: `${row.cumplimiento}%` }}
                      role="progressbar"
                      aria-valuenow={row.cumplimiento}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`Cumplimiento de ${row.actividad}`}
                    />
                  </span>
                  <span className="shrink-0 text-[11px] text-text-secondary">
                    {row.cumplimiento}%
                  </span>
                </span>
                <span className="flex w-28 items-center justify-end gap-2">
                  <button
                    type="button"
                    aria-label={`Actualizar ${row.actividad}`}
                    className="flex items-center gap-1 rounded-md bg-muted px-2.5 py-1.5 text-[9px] font-bold text-white transition hover:bg-muted-80"
                  >
                    <i
                      className="fa-solid fa-pen-to-square"
                      aria-hidden="true"
                    />
                    ACTUALIZAR
                  </button>
                  <button
                    type="button"
                    aria-label={`Eliminar ${row.actividad}`}
                    className="text-muted transition-colors hover:text-risk-red"
                  >
                    <i
                      className="fa-regular fa-trash-can text-xs"
                      aria-hidden="true"
                    />
                  </button>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
