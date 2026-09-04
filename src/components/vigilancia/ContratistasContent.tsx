import { contratistas } from "@/lib/contratistasData";

const kpis = [
  {
    id: "empresas",
    label: "TOTAL DE\nEMPRESAS",
    value: "4",
    icon: "fa-building-user",
    iconBg: "bg-[#e6f0ff]",
    iconColor: "text-brand",
  },
  {
    id: "terceros",
    label: "TRABAJADORES\nTERCEROS",
    value: "258",
    icon: "fa-user-group",
    iconBg: "bg-risk-salmon/15",
    iconColor: "text-risk-salmon",
  },
  {
    id: "vigentes",
    label: "DOCUMENTOS\nVIGENTES",
    value: "83%",
    icon: "fa-file-circle-check",
    iconBg: "bg-[#e0f8f0]",
    iconColor: "text-[#0bbb8a]",
  },
  {
    id: "observacion",
    label: "CON\nOBSERVACIÓN",
    value: "4",
    icon: "fa-file-circle-question",
    iconBg: "bg-risk-red/10",
    iconColor: "text-risk-red",
  },
] as const;

function EstadoBadge({ estado }: { estado: "ACTIVO" }) {
  return (
    <span className="inline-flex min-w-20 items-center justify-center rounded-lg bg-[#dcfce7] px-4 py-1 text-[10px] font-bold leading-none tracking-wide text-[#16a34a]">
      {estado}
    </span>
  );
}

export default function ContratistasContent() {
  return (
    <div className="flex flex-col gap-5">
      {/* ── KPIs ── */}
      <section aria-label="Indicadores de contratistas">
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

      {/* ── DATA DE CONTRATISTAS ── */}
      <section
        aria-labelledby="contratistas-title"
        className="rounded-xl bg-surface-default p-5 shadow-sm shadow-border-default"
      >
        <h2
          id="contratistas-title"
          className="text-sm font-bold uppercase tracking-wide text-text-primary"
        >
          Data de contratistas
        </h2>

        <div className="mt-4 overflow-x-auto">
          <div
            className="min-w-260 text-sm"
            role="table"
            aria-label="Data de contratistas"
          >
            {/* header */}
            <div
              className="grid grid-cols-[1.3fr_1fr_1.3fr_1fr_0.8fr_0.7fr_1fr_0.9fr_0.9fr] gap-0 rounded-lg bg-surface-light px-4 py-3.5 text-xs font-medium uppercase tracking-wider text-text-secondary"
              role="row"
            >
              <span role="columnheader">Empresa</span>
              <span role="columnheader">RUC</span>
              <span role="columnheader">Rubro / Actividad</span>
              <span role="columnheader">Sede</span>
              <span role="columnheader">Trabajadores</span>
              <span role="columnheader">% EMO</span>
              <span role="columnheader">Actualización</span>
              <span role="columnheader" className="text-center">
                Estado
              </span>
              <span role="columnheader" className="text-center">
                Detalle
              </span>
            </div>
            {/* rows */}
            <div className="flex flex-col">
              {contratistas.map((row) => (
                <div
                  key={row.empresa}
                  role="row"
                  className="grid grid-cols-[1.3fr_1fr_1.3fr_1fr_0.8fr_0.7fr_1fr_0.9fr_0.9fr] items-center gap-0 border-b border-dashed border-border-default px-4 py-4 transition-colors hover:bg-surface-light/50 last:border-b-0"
                >
                  <span
                    role="cell"
                    className="pr-2 text-sm font-medium text-text-primary"
                  >
                    {row.empresa}
                  </span>
                  <span
                    role="cell"
                    className="pr-2 text-sm text-text-secondary"
                  >
                    {row.ruc}
                  </span>
                  <span
                    role="cell"
                    className="pr-2 text-sm text-text-secondary"
                  >
                    {row.servicio}
                  </span>
                  <span
                    role="cell"
                    className="pr-2 text-sm text-text-secondary"
                  >
                    {row.sede}
                  </span>
                  <span role="cell" className="text-sm text-text-secondary">
                    {row.trabajadores}
                  </span>
                  <span role="cell" className="text-sm font-bold text-brand">
                    {row.emoVigente}
                  </span>
                  <span role="cell" className="text-sm text-text-secondary">
                    {row.actualizacion}
                  </span>
                  <span role="cell" className="flex justify-center">
                    <EstadoBadge estado={row.estado} />
                  </span>
                  <span role="cell" className="flex justify-center">
                    <a
                      href={`/vigilancia-medica/contratistas/${row.id}`}
                      className="flex items-center gap-2 rounded-lg bg-muted px-4 py-1 text-[11px] font-bold tracking-wide text-white hover:bg-muted-80"
                    >
                      <i
                        className="fa-solid fa-eye text-xs"
                        aria-hidden="true"
                      />
                      VER
                    </a>
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
