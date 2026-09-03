const kpis = [
  {
    label: "USUARIOS",
    value: "34",
    icon: "fa-users",
    bg: "bg-[#e8f0fe]",
    color: "text-brand",
  },
  {
    label: "PERFILES",
    value: "6",
    icon: "fa-user-gear",
    bg: "bg-[#ffe9e6]",
    color: "text-risk-salmon",
  },
  {
    label: "CON MFA",
    value: "31",
    icon: "fa-chart-line",
    bg: "bg-[#dcfce7]",
    color: "text-success",
  },
  {
    label: "INACTIVOS 90 DÍAS",
    value: "2",
    icon: "fa-user-slash",
    bg: "bg-[#fee2e2]",
    color: "text-risk-red",
  },
] as const;

const perfiles = [
  {
    perfil: "Médico ocupacional",
    usuarios: 3,
    datos: "COMPLETO",
    edicion: "Si",
    alcance: "Todas las sedes",
  },
  {
    perfil: "Enfermería ocupacional",
    usuarios: 5,
    datos: "COMPLETO",
    edicion: "Si",
    alcance: "Sede asignada",
  },
  {
    perfil: "SST",
    usuarios: 8,
    datos: "Aptitud y restricciones en solitario",
    edicion: "Parcial",
    alcance: "Sede asignada",
  },
  {
    perfil: "RRHH",
    usuarios: 6,
    datos: "Sin acceso clínico",
    edicion: "No",
    alcance: "Todas las sedes",
  },
  {
    perfil: "Gerencia",
    usuarios: 4,
    datos: "Agregado / anonimizado",
    edicion: "No",
    alcance: "Corporativo",
  },
  {
    perfil: "Contratista",
    usuarios: 8,
    datos: "Solo su personal",
    edicion: "Carga",
    alcance: "Empresa propia",
  },
] as const;

export default function PerfilesPermisosContent() {
  return (
    <div className="flex flex-col gap-6 pb-6">
      {/* KPIs */}
      <section aria-label="Indicadores de perfiles y permisos">
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
                <span className="text-sm uppercase tracking-wide text-text-secondary">
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
        aria-labelledby="perfiles-title"
      >
        <h2
          id="perfiles-title"
          className="text-sm font-bold uppercase tracking-wide text-text-primary"
        >
          Perfiles y permisos
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-muted">
          Módulo perfiles y permisos del sistema de vigilancia médica
          ocupacional CUIDDA.
        </p>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-surface-light text-[11px] font-semibold uppercase tracking-wider text-muted">
                <th
                  scope="col"
                  className="rounded-l-lg px-4 py-3 text-left font-semibold"
                >
                  Perfil
                </th>
                <th scope="col" className="px-4 py-3 text-left font-semibold">
                  Usuarios
                </th>
                <th scope="col" className="px-4 py-3 text-left font-semibold">
                  Datos clínicos
                </th>
                <th scope="col" className="px-4 py-3 text-left font-semibold">
                  Edición
                </th>
                <th
                  scope="col"
                  className="rounded-r-lg px-4 py-3 text-left font-semibold"
                >
                  Alcance
                </th>
              </tr>
            </thead>
            <tbody>
              {perfiles.map((row) => (
                <tr
                  key={row.perfil}
                  className="border-t border-dashed border-border-subtle/40"
                >
                  <td className="px-4 py-4 align-middle text-xs font-semibold text-text-primary">
                    {row.perfil}
                  </td>
                  <td className="px-4 py-4 align-middle text-xs font-bold text-brand">
                    {row.usuarios}
                  </td>
                  <td className="px-4 py-4 align-middle">
                    {row.datos === "COMPLETO" ? (
                      <span className="inline-flex items-center justify-center rounded-full bg-[#dcfce7] px-3 py-1 text-[10px] font-bold leading-none text-success-dark">
                        COMPLETO
                      </span>
                    ) : (
                      <span className="text-xs leading-tight text-text-secondary">
                        {row.datos}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 align-middle text-xs text-text-secondary">
                    {row.edicion}
                  </td>
                  <td className="px-4 py-4 align-middle text-xs text-text-secondary">
                    {row.alcance}
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
