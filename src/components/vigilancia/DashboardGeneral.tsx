import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Datos estáticos para mockup (skill §4: .map con key)
const kpis = [
  {
    id: 1,
    label: "TRABAJADORES EN \nVIGILANCIA",
    value: "1,284",
    sub: "+42 este mes",
    subColor: "text-success",
    icon: "fa-user-shield",
    iconBg: "bg-[#e6f0ff]",
    iconColor: "text-brand",
  },
  {
    id: 2,
    label: "APTITUD VIGENTE",
    value: "91.4%",
    sub: "117 EMOs por vencer",
    subColor: "text-success",
    icon: "fa-user-check",
    iconBg: "bg-risk-salmon/15",
    iconColor: "text-risk-salmon",
  },
  {
    id: 3,
    label: "CUMPLIMIENTO DEL \nPLAN ANUAL",
    value: "78%",
    sub: "meta trimestral 85%",
    subColor: "text-success",
    icon: "fa-file-circle-plus",
    iconBg: "bg-[#e0f8f0]",
    iconColor: "text-[#0bbb8a]",
  },
  {
    id: 4,
    label: "CASOS EN \nSEGUIMIENTO (G3)",
    value: "63",
    sub: "9 pendientes de comité",
    subColor: "text-success",
    icon: "fa-people-group",
    iconBg: "bg-risk-red/10",
    iconColor: "text-risk-red",
  },
];

const planData = [
  { mes: "ENE", plan: 100, ejecutado: 60 },
  { mes: "FEB", plan: 80, ejecutado: 50 },
  { mes: "MAR", plan: 90, ejecutado: 60 },
  { mes: "ABR", plan: 80, ejecutado: 50 },
  { mes: "MAY", plan: 90, ejecutado: 40 },
  { mes: "JUN", plan: 80, ejecutado: 70 },
  { mes: "JUL", plan: 100, ejecutado: 60 },
  { mes: "AGO", plan: 100, ejecutado: 60 },
  { mes: "SET", plan: 90, ejecutado: 60 },
  { mes: "OCT", plan: 80, ejecutado: 50 },
  { mes: "NOV", plan: 100, ejecutado: 60 },
  { mes: "DIC", plan: 90, ejecutado: 60 },
];

const estratificacion = [
  {
    id: "G1",
    label: "Sin hallazgos o hallazgos no relevantes",
    value: 742,
    pct: 60,
    color: "bg-success",
    dot: "bg-success",
    badgeBg: "bg-success/15",
  },
  {
    id: "G2",
    label: "Riesgo con hallazgos relevantes no alarmantes",
    value: 356,
    pct: 29,
    color: "bg-risk-salmon",
    dot: "bg-risk-salmon",
    badgeBg: "bg-risk-salmon/15",
  },
  {
    id: "G3",
    label: "Riesgo con hallazgos importantes / alarmantes",
    value: 142,
    pct: 11,
    color: "bg-risk-red",
    dot: "bg-risk-red",
    badgeBg: "bg-risk-red/10",
  },
];

export default function DashboardGeneral() {
  return (
    <div className="flex flex-col gap-5 text-xs px-8 pt-8">
      {/* Header */}
      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-lg font-bold uppercase tracking-wide text-brand">
            Dashboard General
          </h1>
          <p className="mt-1 max-w-4xl text-sm leading-relaxed text-muted">
            Estado consolidado del sistema de vigilancia: población, aptitud,
            grupos de riesgo, cumplimiento de programas y hallazgos priorizados.
          </p>
        </div>
        <button
          type="button"
          className="flex shrink-0 items-center gap-2 rounded-lg bg-muted-20 px-4 py-2 text-xs font-semibold text-muted shadow-sm hover:bg-muted-30"
        >
          <i className="fa-solid fa-download text-[11px]" aria-hidden="true" />
          EXPORTAR INFORME
        </button>
      </header>

      {/* Filtros */}
      <section
        className="flex items-center gap-3"
        aria-label="Filtros del dashboard"
      >
        <div className="flex flex-1 items-center gap-6">
          <label htmlFor="f-periodo" className="sr-only">
            Periodo
          </label>
          <select
            id="f-periodo"
            className="form-select h-8 rounded-lg bg-surface-light px-3 text-xs text-muted flex-1"
            defaultValue=""
          >
            <option value="" disabled>
              Periodo
            </option>
            <option>2023</option>
            <option>2024</option>
          </select>

          <label htmlFor="f-sede" className="sr-only">
            Sede
          </label>
          <div className="form-select-container flex-1">
            <select
              id="f-sede"
              className="form-select h-8 w-full bg-surface-light px-3 text-xs text-muted"
              defaultValue=""
            >
              <option value="" disabled>
                Sede
              </option>
              <option>Lima</option>
              <option>Arequipa</option>
            </select>
          </div>

          <label htmlFor="f-desde" className="sr-only">
            Desde
          </label>
          <div className="form-select-container flex-1">
            <select
              id="f-desde"
              className="form-select h-8 w-full bg-surface-light px-3 text-xs text-muted"
              defaultValue="2023-10-18"
            >
              <option>Desde: 18 /10/23</option>
              <option>Desde: 01 /01/24</option>
            </select>
          </div>

          <label htmlFor="f-hasta" className="sr-only">
            Hasta
          </label>
          <div className="form-select-container flex-1">
            <select
              id="f-hasta"
              className="form-select h-8 w-full bg-surface-light px-3 text-xs text-muted"
              defaultValue="2023-10-18"
            >
              <option>Hasta: 18 /10/23</option>
              <option>Hasta: 31 /12/24</option>
            </select>
          </div>
        </div>

        <button
          type="button"
          className="rounded-lg bg-brand px-10 py-2 text-xs font-bold tracking-wide text-white hover:bg-primary-hover"
        >
          BUSCAR
        </button>
      </section>

      {/* KPIs */}
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
                <i
                  className={`fa-solid ${kpi.icon} text-lg ${kpi.iconColor}`}
                />
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-medium leading-tight text-text-secondary whitespace-break-spaces">
                  {kpi.label}
                </span>
                <span className="text-xl font-bold leading-none text-brand py-1">
                  {kpi.value}
                </span>
                <span className={`text-xs ${kpi.subColor}`}>{kpi.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gráficos */}
      <div className="grid grid-cols-12 gap-6 overflow-visible">
        {/* Plan anual */}
        <section
          className="col-span-7 flex flex-col rounded-xl p-5 shadow-sm shadow-border-default"
          aria-labelledby="plan-title"
        >
          <div className="flex items-start justify-between">
            <div>
              <h2
                id="plan-title"
                className="text-sm uppercase text-text-primary"
              >
                Cumplimiento del plan anual
              </h2>
              <p className="text-xs text-muted">
                Planificado vs. ejecutado (acumulado mensual)
              </p>
            </div>
            <div className="flex items-center gap-4 text-[10px]">
              <span className="flex items-center gap-1.5">
                <span className="size-3 rounded-full bg-violet"></span>
                <span className="font-semibold text-text-secondary">PLAN</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-3 rounded-full bg-[#2dd4bf]"></span>
                <span className="font-semibold text-text-secondary">
                  EJECUTADO
                </span>
              </span>
            </div>
          </div>

          <div className="mt-4 h-56 w-full ps-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={planData}
                barGap={6}
                margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e7e9ef"
                />
                <XAxis
                  dataKey="mes"
                  tick={{ fontSize: 10, fill: "#8993af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 100]}
                  ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                  tick={{ fontSize: 10, fill: "#8993af" }}
                  axisLine={false}
                  tickLine={false}
                  width={28}
                />
                <Tooltip
                  cursor={{ fill: "#f1f5f8", opacity: 0.5 }}
                  contentStyle={{
                    fontSize: 11,
                    borderRadius: 8,
                    border: "1px solid #a2c0d4",
                  }}
                />
                <Bar
                  dataKey="plan"
                  fill="#6665DD"
                  radius={[4, 4, 0, 0]}
                  barSize={18}
                  label={{
                    position: "top",
                    fontSize: 9,
                    fill: "#636d73",
                  }}
                />
                <Bar
                  dataKey="ejecutado"
                  fill="#2dd4bf"
                  radius={[4, 4, 0, 0]}
                  barSize={18}
                  label={{
                    position: "top",
                    fontSize: 9,
                    fill: "#636d73",
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Estratificación */}
        <section
          className="col-span-5 flex flex-col rounded-xl p-5 shadow-sm shadow-border-default"
          aria-labelledby="estrat-title"
        >
          <div className="flex items-start justify-between">
            <div>
              <h2
                id="estrat-title"
                className="text-sm uppercase text-text-primary"
              >
                Estratificación por grupo de riesgo
              </h2>
              <p className="text-xs text-muted">
                Segmentación automática según hallazgos de los EMOs
              </p>
            </div>
            <a
              href="#"
              className="flex items-center gap-2 text-sm text-brand hover:text-primary-hover"
            >
              Ver detalle
              <i
                className="fa-solid fa-up-right-from-square text-[10px]"
                aria-hidden="true"
              />
            </a>
          </div>

          <div className="mt-8 flex flex-col gap-8 text-sm">
            {estratificacion.map((item) => (
              <div key={item.id} className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`flex items-center gap-1.5 rounded-full px-2 py-0.5 ${item.badgeBg}`}
                    >
                      <span
                        className={`size-2 rounded-full ${item.dot}`}
                        aria-hidden="true"
                      />
                      <span className="text-xs font-bold text-text-primary">
                        {item.id}
                      </span>
                    </span>
                    <span className="text-xs text-text-secondary">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-xs">
                    <span className="font-bold text-text-primary">
                      {item.value}
                    </span>
                    <span className="text-muted"> ({item.pct}%)</span>
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-surface-light">
                  <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{ width: `${item.pct}%` }}
                    role="progressbar"
                    aria-valuenow={item.pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${item.id} ${item.pct}%`}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
