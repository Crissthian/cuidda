import { kpisEmos } from "@/lib/emosData";

export default function EmosKpis() {
  return (
    <section aria-label="Indicadores EMOs">
      <div className="grid grid-cols-4 gap-6">
        {kpisEmos.map((kpi) => (
          <div
            key={kpi.id}
            className="flex items-center gap-4 rounded-xl bg-surface-default px-6 py-5 shadow-sm shadow-border-default"
          >
            <span
              className={`flex size-14 shrink-0 items-center justify-center rounded-lg ${kpi.iconBg}`}
              aria-hidden="true"
            >
              <i className={`fa-solid ${kpi.icon} text-2xl ${kpi.iconColor}`} />
            </span>
            <div className="flex flex-col">
              <span className="text-sm leading-tight text-text-secondary whitespace-break-spaces">
                {kpi.label}
              </span>
              <span className="py-1 text-2xl font-bold leading-none text-brand">
                {kpi.value}
              </span>
              {kpi.sub && (
                <span className="text-xs text-success">{kpi.sub}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
