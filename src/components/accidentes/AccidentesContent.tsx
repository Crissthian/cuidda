import AccidentesKpis from "@/components/accidentes/AccidentesKpis";
import RegistroEventosTable from "@/components/accidentes/RegistroEventosTable";
import { sedesAccidentes } from "@/lib/accidentesData";
import { YEARS } from "@/lib/periodos";

export default function AccidentesContent() {
  return (
    <div className="flex flex-col gap-5 text-xs">
      <div className="px-10 pb-2">
        <div className="flex max-w-6/12 items-center gap-3 pb-6">
          <label htmlFor="acc-periodo" className="sr-only">
            Periodo
          </label>
          <div className="flex h-8 w-48 items-center gap-2 rounded-lg bg-surface-light ps-3">
            <span
              aria-hidden="true"
              className="pointer-events-none select-none text-xs capitalize text-muted"
            >
              Periodo
            </span>
            <select
              id="acc-periodo"
              defaultValue=""
              className="h-full flex-1 items-center cursor-pointer bg-transparent text-xs capitalize text-muted outline-none! pe-3 rounded-lg"
            >
              <option value="" />
              {YEARS.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <label htmlFor="acc-sede" className="sr-only">
            Sede
          </label>
          <div className="flex h-8 w-48 items-center gap-2 rounded-lg bg-surface-light ps-3">
            <span
              aria-hidden="true"
              className="pointer-events-none select-none text-xs capitalize text-muted"
            >
              Sede
            </span>
            <select
              id="acc-sede"
              defaultValue=""
              className="h-full flex-1 items-center cursor-pointer bg-transparent text-xs capitalize text-muted outline-none! pe-3 rounded-lg"
            >
              <option value="" />
              {sedesAccidentes.map((sede) => (
                <option key={sede} value={sede}>
                  {sede}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            className="rounded-lg bg-brand px-8 py-2 text-xs font-bold tracking-wide text-white hover:bg-primary-hover"
          >
            BUSCAR
          </button>
        </div>

        <div className="pb-6">
          <AccidentesKpis />
        </div>

        <div className="pb-6">
          <RegistroEventosTable />
        </div>
      </div>
    </div>
  );
}
