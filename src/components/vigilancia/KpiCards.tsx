import { kpis } from "@/lib/vigilanciaData";

export default function KpiCards() {
  return (
    <section aria-label="Indicadores principales">
      <div className="grid grid-cols-4 gap-6">
        {kpis.map((kpi) => (
          <div
            key={kpi.id}
            className="flex items-center gap-4 rounded-xl px-6 py-4 shadow-sm shadow-border-default"
          >
            <span
              className={`flex size-12 shrink-0 items-center justify-center rounded-lg ${kpi.iconBg}`}
              aria-hidden="true"
            >
              <i className={`fa-solid ${kpi.icon} text-2xl ${kpi.iconColor}`} />
            </span>
            <div className="flex flex-col">
              <span className="whitespace-break-spaces text-sm font-medium leading-tight text-text-secondary">
                {kpi.label}
              </span>
              <span className="py-1 text-xl font-bold leading-none text-brand">
                {kpi.value}
              </span>
              <span className={`text-xs ${kpi.subColor}`}>{kpi.sub}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
