const kpis = [
  {
    label: "DOCUMENTOS\nFIRMADOS",
    value: "1.482",
    icon: "fa-file-signature",
    bg: "bg-[#e8f0fe]",
    color: "text-brand",
  },
  {
    label: "FIRMANTES",
    value: "9",
    icon: "fa-user-tie",
    bg: "bg-[#ffe9e6]",
    color: "text-risk-salmon",
  },
  {
    label: "CERTIFICADOS\nVIGENTES",
    value: "8",
    icon: "fa-file-lines",
    bg: "bg-[#dcfce7]",
    color: "text-success",
  },
  {
    label: "POR RENOVAR",
    value: "1",
    icon: "fa-file-circle-exclamation",
    bg: "bg-[#fee2e2]",
    color: "text-risk-red",
  },
] as const;

const firmas = [
  {
    firmante: "Dr. M. Salcedo",
    rol: "Médico ocupacional",
    certificado: "Digital (RENIEC)",
    vence: "12/03/2027",
    documentos: 842,
  },
  {
    firmante: "Enfermería ocupacional",
    rol: "Médico ocupacional",
    certificado: "Digital (RENIEC)",
    vence: "08/09/2026",
    documentos: 316,
  },
  {
    firmante: "SST",
    rol: "Enfermería",
    certificado: "Digital (RENIEC)",
    vence: "20/01/2027",
    documentos: 204,
  },
  {
    firmante: "RRHH",
    rol: "SST",
    certificado: "Digital (RENIEC)",
    vence: "01/12/2026",
    documentos: 120,
  },
] as const;

export default function FirmasContent() {
  return (
    <div className="flex flex-col gap-6 pb-6">
      {/* KPIs */}
      <section aria-label="Indicadores de firmas">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
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

      {/* Tabla */}
      <section
        className="rounded-xl bg-surface-default p-6 shadow-sm shadow-border-default"
        aria-labelledby="firmas-title"
      >
        <h2
          id="firmas-title"
          className="text-sm font-bold uppercase tracking-wide text-text-primary"
        >
          Firmas
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-muted">
          Módulo firma del sistema de vigilancia médica ocupacional CUIDDA.
        </p>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-surface-light text-[11px] font-semibold uppercase tracking-wider text-muted">
                <th
                  scope="col"
                  className="rounded-l-lg px-4 py-3 text-left font-semibold"
                >
                  Firmante
                </th>
                <th scope="col" className="px-4 py-3 text-left font-semibold">
                  Rol
                </th>
                <th scope="col" className="px-4 py-3 text-left font-semibold">
                  Certificado
                </th>
                <th scope="col" className="px-4 py-3 text-left font-semibold">
                  Vence
                </th>
                <th
                  scope="col"
                  className="rounded-r-lg px-4 py-3 text-left font-semibold"
                >
                  Documentos firmados
                </th>
              </tr>
            </thead>
            <tbody>
              {firmas.map((row) => (
                <tr
                  key={row.firmante}
                  className="border-t border-dashed border-border-subtle/40"
                >
                  <td className="px-4 py-4 align-middle text-xs font-semibold text-text-primary">
                    {row.firmante}
                  </td>
                  <td className="px-4 py-4 align-middle text-xs text-text-secondary">
                    {row.rol}
                  </td>
                  <td className="px-4 py-4 align-middle text-xs text-text-secondary">
                    {row.certificado}
                  </td>
                  <td className="px-4 py-4 align-middle text-xs text-text-secondary">
                    {row.vence}
                  </td>
                  <td className="px-4 py-4 align-middle text-xs font-bold text-brand">
                    {row.documentos}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
