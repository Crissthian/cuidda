import { medicos, type EstadoCertificado } from "@/lib/medicosData";

const kpis = [
  {
    id: "registrados",
    label: "MÉDICOS\nREGISTRADOS",
    value: "24",
    icon: "fa-user-doctor",
    bg: "bg-[#e6f0ff]",
    color: "text-brand",
  },
  {
    id: "vigentes",
    label: "CERTIFICADOS\nVIGENTES",
    value: "19",
    icon: "fa-file-signature",
    bg: "bg-risk-salmon/15",
    color: "text-risk-salmon",
  },
  {
    id: "renovar",
    label: "POR RENOVAR",
    value: "3",
    icon: "fa-file-circle-exclamation",
    bg: "bg-[#e0f8f0]",
    color: "text-[#0bbb8a]",
  },
  {
    id: "sin-certificado",
    label: "SIN CERTIFICADO",
    value: "2",
    icon: "fa-file-circle-xmark",
    bg: "bg-risk-red/10",
    color: "text-risk-red",
  },
] as const;

const badge: Record<EstadoCertificado, string> = {
  VIGENTE: "bg-success/15 text-success-dark",
  "POR VENCER": "bg-risk-salmon/15 text-risk-salmon",
  "SIN CERTIFICADO": "bg-risk-red/10 text-risk-red",
};

export default function FirmasContent() {
  return (
    <div className="flex flex-col gap-6 pb-6">
      {/* KPIs */}
      <section aria-label="Indicadores de firmas">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <div
              key={kpi.id}
              className="flex items-center gap-4 rounded-xl bg-surface-default px-6 py-5 shadow-sm shadow-border-default"
            >
              <span
                className={`flex size-14 shrink-0 items-center justify-center rounded-xl ${kpi.bg}`}
                aria-hidden="true"
              >
                <i className={`fa-solid ${kpi.icon} text-2xl ${kpi.color}`} />
              </span>
              <div className="flex flex-col gap-1">
                <span className="whitespace-pre-line text-sm uppercase leading-tight tracking-wide text-text-secondary">
                  {kpi.label}
                </span>
                <span className="text-2xl font-bold leading-none text-brand">
                  {kpi.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lista de médicos */}
      <section
        className="rounded-xl bg-surface-default p-6 shadow-sm shadow-border-default"
        aria-labelledby="medicos-title"
      >
        <h2
          id="medicos-title"
          className="text-sm font-bold uppercase tracking-wide text-text-primary"
        >
          Lista médicos
        </h2>

        <form
          role="search"
          aria-label="Filtros de médicos"
          className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center w-8/12"
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="f-apellidos" className="sr-only">
            Apellidos
          </label>
          <input
            id="f-apellidos"
            type="text"
            placeholder="Apellidos"
            autoComplete="off"
            className="form-input h-9 min-w-0 flex-1 bg-surface-light px-3 text-xs text-text-primary placeholder:text-muted-50 focus:ring-1 focus:ring-brand"
          />
          <label htmlFor="f-dni" className="sr-only">
            DNI
          </label>
          <input
            id="f-dni"
            type="text"
            placeholder="DNI"
            autoComplete="off"
            inputMode="numeric"
            className="form-input h-9 min-w-0 flex-1 bg-surface-light px-3 text-xs text-text-primary placeholder:text-muted-50 focus:ring-1 focus:ring-brand"
          />
          <label htmlFor="f-cmp" className="sr-only">
            CMP
          </label>
          <input
            id="f-cmp"
            type="text"
            placeholder="CMP"
            autoComplete="off"
            inputMode="numeric"
            className="form-input h-9 min-w-0 flex-1 bg-surface-light px-3 text-xs text-text-primary placeholder:text-muted-50 focus:ring-1 focus:ring-brand"
          />
          <button
            type="submit"
            className="inline-flex h-9 shrink-0 items-center justify-center rounded-lg bg-brand px-10 text-xs font-bold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            Buscar
          </button>
        </form>

        <div className="mt-5 overflow-x-auto">
          <div
            className="min-w-260 text-xs"
            role="table"
            aria-label="Lista de médicos"
          >
            <div
              className="grid grid-cols-[1.2fr_0.6fr_0.9fr_1fr_0.8fr_0.8fr_0.7fr] gap-0 rounded-lg bg-surface-light px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-text-secondary"
              role="row"
            >
              <span role="columnheader">Médico</span>
              <span role="columnheader">CMP</span>
              <span role="columnheader">Sede</span>
              <span role="columnheader" className="text-center">
                Certificado
              </span>
              <span role="columnheader">Vigencia</span>
              <span role="columnheader">Última firma</span>
              <span role="columnheader" className="text-center">
                Detalle
              </span>
            </div>
            <div className="divide-y divide-dashed divide-border-subtle">
              {medicos.map((row) => {
                const deshabilitado = row.certificado === "SIN CERTIFICADO";
                return (
                  <div
                    key={row.id}
                    role="row"
                    className="grid grid-cols-[1.2fr_0.6fr_0.9fr_1fr_0.8fr_0.8fr_0.7fr] items-center gap-0 px-4 py-4 transition-colors hover:bg-surface-light/50"
                  >
                    <span
                      role="cell"
                      className="pr-2 text-xs font-semibold text-text-primary"
                    >
                      {row.medico}
                    </span>
                    <span
                      role="cell"
                      className="pr-2 text-xs text-text-secondary"
                    >
                      {row.cmp}
                    </span>
                    <span
                      role="cell"
                      className="pr-2 text-xs text-text-secondary"
                    >
                      {row.sede}
                    </span>
                    <span role="cell" className="flex justify-center px-2">
                      <span
                        className={`inline-flex w-full max-w-36 items-center justify-center rounded-full px-3 py-1 text-center text-[10px] font-semibold leading-tight tracking-wide ${badge[row.certificado]}`}
                      >
                        {row.certificado}
                      </span>
                    </span>
                    <span
                      role="cell"
                      className="pr-2 text-xs text-text-secondary"
                    >
                      {row.vigencia}
                    </span>
                    <span
                      role="cell"
                      className="pr-2 text-xs text-text-secondary"
                    >
                      {row.ultimaFirma}
                    </span>
                    <span role="cell" className="flex justify-center">
                      {deshabilitado ? (
                        <button
                          type="button"
                          disabled
                          aria-label={`Ver detalle de ${row.medico}`}
                          className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-lg bg-muted-30 px-4 py-1.5 text-[11px] font-bold tracking-wide text-white"
                        >
                          <i
                            className="fa-regular fa-eye text-xs"
                            aria-hidden="true"
                          />
                          VER
                        </button>
                      ) : (
                        <a
                          href={`/vigilancia-medica/firmas/${row.id}`}
                          aria-label={`Ver detalle de ${row.medico}`}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-muted px-4 py-1.5 text-[11px] font-bold tracking-wide text-white transition-colors hover:bg-muted-80"
                        >
                          <i
                            className="fa-regular fa-eye text-xs"
                            aria-hidden="true"
                          />
                          VER
                        </a>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
