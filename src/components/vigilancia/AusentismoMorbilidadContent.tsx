const kpis = [
  {
    id: "dias",
    label: "DÍAS\nPERDIDOS",
    value: "1.653",
    icon: "fa-calendar-xmark",
    iconBg: "bg-[#e6f0ff]",
    iconColor: "text-brand",
  },
  {
    id: "casos",
    label: "CASOS",
    value: "258",
    icon: "fa-user-group",
    iconBg: "bg-risk-salmon/15",
    iconColor: "text-risk-salmon",
  },
  {
    id: "indice",
    label: "ÍNDICE DE\nFRECUENCIA",
    value: "3.2",
    icon: "fa-chart-line",
    iconBg: "bg-[#e0f8f0]",
    iconColor: "text-[#0bbb8a]",
  },
  {
    id: "costo",
    label: "COSTO\nESTIMADO",
    value: "S/ 412 K",
    icon: "fa-coins",
    iconBg: "bg-risk-red/10",
    iconColor: "text-risk-red",
  },
] as const;

const causas = [
  { causa: "Enfermedad común", casos: 190, dias: 842, pct: "51%" },
  { causa: "Maternidad", casos: 3, dias: 294, pct: "18%" },
  { causa: "Accidente común", casos: 27, dias: 210, pct: "13%" },
  { causa: "Accidente de trabajo", casos: 14, dias: 156, pct: "9%" },
  { causa: "Otros", casos: 21, dias: 88, pct: "5%" },
] as const;

export default function AusentismoMorbilidadContent() {
  return (
    <div className="flex flex-col gap-5 px-10">
      {/* ── KPIs ── */}
      <section aria-label="Indicadores de ausentismo">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <div
              key={kpi.id}
              className="flex items-center gap-4 rounded-xl bg-surface-default px-6 py-5 shadow-sm shadow-border-default"
            >
              <span
                className={`flex size-14 shrink-0 items-center justify-center rounded-xl ${kpi.iconBg}`}
                aria-hidden="true"
              >
                <i
                  className={`fa-solid ${kpi.icon} text-2xl ${kpi.iconColor}`}
                />
              </span>
              <div className="flex flex-col">
                <span className="whitespace-pre-line text-sm leading-tight tracking-wide text-text-secondary">
                  {kpi.label}
                </span>
                <span className="mt-1 text-2xl font-bold leading-none text-brand">
                  {kpi.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TABLA AUSENTISMO / MORBILIDAD ── */}
      <section
        aria-labelledby="ausentismo-title"
        className="rounded-xl bg-surface-default p-5 shadow-sm shadow-border-default"
      >
        <h2
          id="ausentismo-title"
          className="text-sm uppercase tracking-wide text-text-primary"
        >
          Ausentismo / Morbilidad
        </h2>

        <div className="mt-4 overflow-x-auto">
          <div
            className="min-w-130 text-xs"
            role="table"
            aria-label="Ausentismo por causa"
          >
            {/* header */}
            <div
              className="grid grid-cols-4 gap-0 rounded-lg bg-surface-light px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-muted"
              role="row"
            >
              <span role="columnheader">Causa</span>
              <span role="columnheader">Casos</span>
              <span role="columnheader">Días</span>
              <span role="columnheader">% del total</span>
            </div>
            {/* rows */}
            <div className="flex flex-col">
              {causas.map((row) => (
                <div
                  key={row.causa}
                  role="row"
                  className="grid grid-cols-4 items-center gap-0 border-b border-dashed border-border-default px-4 py-4 transition-colors hover:bg-surface-light/50 last:border-b-0"
                >
                  <span
                    role="cell"
                    className="text-xs font-medium text-text-primary"
                  >
                    {row.causa}
                  </span>
                  <span role="cell" className="text-xs font-bold text-brand">
                    {row.casos}
                  </span>
                  <span role="cell" className="text-xs text-text-secondary">
                    {row.dias}
                  </span>
                  <span role="cell" className="text-xs text-text-secondary">
                    {row.pct}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
