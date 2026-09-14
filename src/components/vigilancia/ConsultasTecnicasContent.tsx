import {
  especialidadesConsulta,
  estadosConsulta,
} from "@/lib/consultasTecnicasData";
import { SEDES } from "@/lib/sedes";

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
        <div className="mt-5 flex max-w-7/12 items-center gap-3">
          <label htmlFor="ct-sede" className="sr-only">
            Sede
          </label>
          <div className="flex h-9 flex-1 items-center gap-2 rounded-lg bg-surface-light ps-3">
            <span
              aria-hidden="true"
              className="pointer-events-none select-none text-xs capitalize text-muted"
            >
              Sede
            </span>
            <select
              id="ct-sede"
              defaultValue=""
              className="h-full flex-1 items-center cursor-pointer rounded-lg bg-transparent pe-3 text-xs capitalize text-muted outline-none!"
            >
              <option value="" />
              {SEDES.map((sede) => (
                <option key={sede} value={sede}>
                  {sede}
                </option>
              ))}
            </select>
          </div>

          <label htmlFor="ct-especialidad" className="sr-only">
            Especialidad
          </label>
          <div className="flex h-9 w-65 items-center gap-2 rounded-lg bg-surface-light ps-3">
            <span
              aria-hidden="true"
              className="pointer-events-none select-none text-xs capitalize text-muted"
            >
              Especialidad
            </span>
            <select
              id="ct-especialidad"
              defaultValue=""
              className="h-full flex-1 items-center cursor-pointer rounded-lg bg-transparent pe-3 text-xs capitalize text-muted outline-none!"
            >
              <option value="" />
              {especialidadesConsulta.map((especialidad) => (
                <option key={especialidad} value={especialidad}>
                  {especialidad}
                </option>
              ))}
            </select>
          </div>

          <label htmlFor="ct-estado" className="sr-only">
            Estado
          </label>
          <div className="flex h-9 flex-1 items-center gap-2 rounded-lg bg-surface-light ps-3">
            <span
              aria-hidden="true"
              className="pointer-events-none select-none text-xs capitalize text-muted"
            >
              Estado
            </span>
            <select
              id="ct-estado"
              defaultValue=""
              className="h-full flex-1 items-center cursor-pointer rounded-lg bg-transparent pe-3 text-xs capitalize text-muted outline-none!"
            >
              <option value="" />
              {estadosConsulta.map((estado) => (
                <option key={estado} value={estado}>
                  {estado}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            className="inline-flex h-9 shrink-0 items-center justify-center rounded-lg bg-brand px-10 text-xs font-bold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
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
