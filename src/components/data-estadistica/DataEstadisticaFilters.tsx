import { CURRENT_YEAR, TODAY_ISO } from "@/lib/periodos";
import { SEDES } from "@/lib/sedes";

const tiposExamen = [
  { id: "anual", label: "Anual" },
  { id: "retiro", label: "Retiro" },
  { id: "pre-ocupacional", label: "Pre ocupacional" },
  { id: "reincorporacion", label: "Reincorporación" },
  { id: "temporal", label: "Temporal" },
];

export default function DataEstadisticaFilters() {
  return (
    <section
      className="flex items-center gap-3 max-w-10/12"
      aria-label="Filtros de data estadística"
    >
      <div className="flex flex-1 items-center gap-3">
        <label htmlFor="de-tipo" className="sr-only">
          Tipo de examen
        </label>
        <div className="flex h-9 flex-1 items-center gap-2 rounded-lg bg-surface-light ps-3">
          <span
            aria-hidden="true"
            className="pointer-events-none select-none text-xs capitalize text-muted"
          >
            Tipo de examen
          </span>
          <select
            id="de-tipo"
            defaultValue=""
            className="h-full flex-1 items-center cursor-pointer rounded-lg bg-transparent pe-3 text-xs capitalize text-muted outline-none!"
          >
            <option value="" />
            {tiposExamen.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.label}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="de-sede" className="sr-only">
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
            id="de-sede"
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

        <label htmlFor="de-desde" className="sr-only">
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
            id="de-desde"
            type="date"
            defaultValue={`${CURRENT_YEAR}-01-01`}
            max={TODAY_ISO}
            className="h-full flex-1 bg-transparent text-xs text-muted outline-none!"
          />
        </div>

        <label htmlFor="de-hasta" className="sr-only">
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
            id="de-hasta"
            type="date"
            defaultValue={TODAY_ISO}
            max={TODAY_ISO}
            className="h-full flex-1 bg-transparent text-xs text-muted outline-none!"
          />
        </div>
      </div>

      <button
        type="button"
        className="rounded-lg bg-brand px-10 py-2 text-xs font-bold tracking-wide text-white hover:bg-primary-hover"
      >
        BUSCAR
      </button>
    </section>
  );
}
