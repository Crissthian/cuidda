import { objetivos } from "@/lib/estudioData";

export default function ObjetivosSistema() {
  return (
    <section
      className="flex flex-col rounded-xl bg-surface-default p-5 shadow-sm shadow-border-subtle"
      aria-labelledby="objetivos-title"
    >
      <h2
        id="objetivos-title"
        className="text-sm font-bold uppercase text-text-primary"
      >
        Objetivos del sistema de vigilancia
      </h2>
      <p className="text-xs text-muted">
        Se validan contra hallazgos y monitoreos
      </p>
      <div className="mt-4 overflow-hidden rounded-lg">
        <div className="grid grid-cols-[1.6fr_1fr_0.6fr_0.8fr] gap-4 rounded-lg bg-surface-light p-3 text-[10px] font-semibold uppercase tracking-wider text-muted">
          <span>Objetivo</span>
          <span>Indicador</span>
          <span className="text-center">Meta</span>
          <span className="text-center">Estado</span>
        </div>
        <div className="divide-y divide-dashed divide-border-subtle">
          {objetivos.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-[1.6fr_1fr_0.6fr_0.8fr] items-center gap-4 p-3 text-xs"
            >
              <span className="flex items-start gap-2 font-medium text-text-primary">
                <i
                  className="fa-regular fa-circle-dot mt-0.5 text-brand"
                  aria-hidden="true"
                />
                {row.objetivo}
              </span>
              <span className="text-text-secondary">{row.indicador}</span>
              <span className="text-center text-text-secondary">
                {row.meta}
              </span>
              <span className="flex justify-center">
                <span
                  className={`mx-4 flex h-5 w-full items-center justify-center rounded-full px-3 py-1 text-[10px] font-bold ${row.estadoClass}`}
                >
                  {row.estado}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
