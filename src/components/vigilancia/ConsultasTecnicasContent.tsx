const consultas = [
  {
    id: 1,
    fechaHora: "2026-08-18 09:24",
    sede: "Lima",
    trabajador: "Carlos Aliaga Ríos",
    cargo: "Supervisor de mina",
    especialidad: "Neumología",
    motivo: "Patrón restrictivo en espirometría de EMO periódico.",
    estado: "RESPONDIDO" as const,
  },
  {
    id: 2,
    fechaHora: "2026-08-20 11:40",
    sede: "Junín",
    trabajador: "Rosa Quispe Mamani",
    cargo: "Operario de planta",
    especialidad: "Otorrinolaringología",
    motivo:
      "Hipoacusia neurosensorial bilateral en trabajadora con GES de ruido.",
    estado: "PENDIENTE" as const,
  },
] as const;

function EstadoBadge({ estado }: { estado: "RESPONDIDO" | "PENDIENTE" }) {
  const isRespondido = estado === "RESPONDIDO";
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-[10px] font-bold leading-none tracking-wide ${
        isRespondido
          ? "bg-[#dcfce7] text-[#16a34a]"
          : "bg-[#fee2e2] text-[#f87171]"
      }`}
    >
      {estado}
    </span>
  );
}

export default function ConsultasTecnicasContent() {
  return (
    <div className="flex flex-col gap-5 p-0.5">
      <section
        aria-labelledby="consultas-title"
        className="rounded-xl bg-surface-default p-5 shadow-sm shadow-border-default"
      >
        <h2
          id="consultas-title"
          className="text-xs font-bold uppercase tracking-wide text-text-primary"
        >
          Historial de consultas
        </h2>
        <p className="mt-1 text-xs leading-snug text-muted">
          Consultas enviadas por el médico ocupacional a especialistas de
          Lucemedic.
        </p>

        {/* ── Filtros ── */}
        <div className="mt-5 flex flex-wrap items-end gap-3">
          <label className="flex flex-col gap-1.5">
            <div className="relative">
              <select
                defaultValue=""
                className="form-select min-w-40 appearance-none rounded-lg border border-transparent bg-surface-light px-3 py-2  text-xs text-muted outline-none focus:border-brand focus:ring-1 focus:ring-brand"
              >
                <option value="" disabled>
                  Sede
                </option>
                <option value="lima">Lima</option>
                <option value="junin">Junín</option>
                <option value="condorcocha">Condorcocha</option>
              </select>
            </div>
          </label>

          <label className="flex flex-col gap-1.5">
            <div className="relative">
              <select
                defaultValue=""
                className="form-select min-w-40 appearance-none rounded-lg border border-transparent bg-surface-light px-3 py-2  text-xs text-muted outline-none focus:border-brand focus:ring-1 focus:ring-brand"
              >
                <option value="" disabled>
                  Área
                </option>
                <option value="mina">Mina</option>
                <option value="planta">Planta</option>
                <option value="administracion">Administración</option>
              </select>
            </div>
          </label>

          <label className="flex flex-col gap-1.5">
            <div className="relative">
              <select
                defaultValue=""
                className="form-select min-w-40 appearance-none rounded-lg border border-transparent bg-surface-light px-3 py-2  text-xs text-muted outline-none focus:border-brand focus:ring-1 focus:ring-brand"
              >
                <option value="" disabled>
                  Tipo de EMO
                </option>
                <option value="ingreso">Ingreso</option>
                <option value="periodico">Periódico</option>
                <option value="retiro">Retiro</option>
              </select>
            </div>
          </label>

          <label className="flex flex-col gap-1.5">
            <div className="relative">
              <select
                defaultValue=""
                className="form-select min-w-40 appearance-none rounded-lg border border-transparent bg-surface-light px-3 py-2  text-xs text-muted outline-none focus:border-brand focus:ring-1 focus:ring-brand"
              >
                <option value="" disabled>
                  Estado
                </option>
                <option value="respondido">Respondido</option>
                <option value="pendiente">Pendiente</option>
              </select>
            </div>
          </label>

          <button
            type="button"
            className="inline-flex h-9 items-center justify-center rounded-lg bg-brand px-8 text-xs font-bold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            Buscar
          </button>
        </div>

        {/* ── Grid ── */}
        <div className="mt-6 overflow-x-auto">
          <div
            className="min-w-215 text-xs"
            role="table"
            aria-label="Historial de consultas"
          >
            {/* header */}
            <div
              className="grid grid-cols-[1.1fr_0.7fr_1.4fr_1.2fr_2.2fr_0.9fr_0.7fr] gap-0 rounded-lg bg-surface-light p-3 text-xs font-bold uppercase tracking-wider text-muted"
              role="row"
            >
              <span role="columnheader">Fecha y hora</span>
              <span role="columnheader">Sede</span>
              <span role="columnheader">Trabajador / Cargo</span>
              <span role="columnheader">Especialidad</span>
              <span role="columnheader">Motivo</span>
              <span role="columnheader" className="text-center">
                Estado
              </span>
              <span role="columnheader" className="text-center">
                Detalle
              </span>
            </div>

            {/* rows */}
            <div className="flex flex-col">
              {consultas.map((row) => (
                <div
                  key={row.id}
                  role="row"
                  className="grid grid-cols-[1.1fr_0.7fr_1.4fr_1.2fr_2.2fr_0.9fr_0.7fr] items-center gap-0 border-b border-dashed border-border-default p-3 transition-colors hover:bg-surface-light/50 last:border-b-0"
                >
                  <span
                    role="cell"
                    className="pr-2 text-xs text-text-secondary"
                  >
                    {row.fechaHora}
                  </span>
                  <span
                    role="cell"
                    className="pr-2 text-xs text-text-secondary"
                  >
                    {row.sede}
                  </span>
                  <span role="cell" className="pr-3">
                    <span className="flex flex-col gap-0.5">
                      <span className="text-xs font-semibold leading-tight text-text-primary">
                        {row.trabajador}
                      </span>
                      <span className="text-[11px] leading-tight text-muted">
                        {row.cargo}
                      </span>
                    </span>
                  </span>
                  <span
                    role="cell"
                    className="pr-2 text-xs text-text-secondary"
                  >
                    {row.especialidad}
                  </span>
                  <span
                    role="cell"
                    className="pr-4 text-xs leading-snug text-text-secondary"
                  >
                    {row.motivo}
                  </span>
                  <span role="cell" className="flex justify-center">
                    <EstadoBadge estado={row.estado} />
                  </span>
                  <span role="cell" className="flex justify-center">
                    <a
                      href={`/vigilancia-medica/consultas-tecnicas/${row.id}`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-accent-muted px-3.5 py-1.5 text-[11px] font-bold leading-none text-white transition-colors hover:bg-[#7a96a8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1"
                    >
                      <i
                        className="fa-solid fa-eye text-[11px]"
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
