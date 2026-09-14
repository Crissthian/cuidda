import { CURRENT_YEAR, TODAY_ISO, YEARS } from "@/lib/periodos";
import { SEDES } from "@/lib/sedes";

export default function DashboardFilters() {
  return (
    <section
      className="flex items-center gap-3"
      aria-label="Filtros del dashboard"
    >
      <div className="flex flex-1 items-center gap-6">
        <label htmlFor="f-periodo" className="sr-only">
          Periodo
        </label>
        <div className="flex h-9 flex-1 items-center gap-2 rounded-lg bg-surface-light ps-3">
          <span
            aria-hidden="true"
            className="pointer-events-none select-none text-xs text-muted capitalize"
          >
            Periodo
          </span>
          <select
            id="f-periodo"
            className="h-full flex-1 ps-4 items-center cursor-pointer bg-transparent text-xs text-muted capitalize outline-none! pe-3 rounded-lg"
          >
            <option value="" />
            {YEARS.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="f-sede" className="sr-only">
          Sede
        </label>
        <div className="flex h-9 flex-1 items-center gap-2 rounded-lg bg-surface-light ps-3">
          <span
            aria-hidden="true"
            className="pointer-events-none select-none text-xs text-muted capitalize"
          >
            Sede
          </span>
          <select
            id="f-sede"
            className="h-full flex-1 ps-4 items-center cursor-pointer bg-transparent text-xs text-muted capitalize outline-none! pe-3 rounded-lg"
            defaultValue=""
          >
            <option value="" />
            {SEDES.map((sede) => (
              <option key={sede} value={sede}>
                {sede}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="f-desde" className="sr-only">
          Desde
        </label>
        <div className="flex h-9 flex-1 items-center gap-2 rounded-lg bg-surface-light px-3">
          <span
            aria-hidden="true"
            className="pointer-events-none select-none text-xs text-muted"
          >
            Desde
          </span>
          <input
            id="f-desde"
            type="date"
            className="h-full flex-1 bg-transparent text-xs text-muted outline-none!"
            defaultValue={`${CURRENT_YEAR}-01-01`}
            max={TODAY_ISO}
          />
        </div>

        <label htmlFor="f-hasta" className="sr-only">
          Hasta
        </label>
        <div className="flex h-9 flex-1 items-center gap-2 rounded-lg bg-surface-light px-3">
          <span
            aria-hidden="true"
            className="pointer-events-none select-none text-xs text-muted"
          >
            Hasta
          </span>
          <input
            id="f-hasta"
            type="date"
            className="h-full flex-1 bg-transparent text-xs text-muted outline-none!"
            defaultValue={TODAY_ISO}
            max={TODAY_ISO}
          />
        </div>
      </div>

      <button
        type="button"
        className="rounded-lg bg-brand px-10 py-2 text-sm font-bold tracking-wide text-white hover:bg-primary-hover"
      >
        BUSCAR
      </button>
    </section>
  );
}
