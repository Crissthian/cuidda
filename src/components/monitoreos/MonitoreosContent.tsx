import MonitoreosKpis from "@/components/monitoreos/MonitoreosKpis";
import ResultadosMonitoreoTable from "@/components/monitoreos/ResultadosMonitoreoTable";
import { YEARS } from "@/lib/periodos";
import { SEDES } from "@/lib/sedes";

export default function MonitoreosContent() {
  return (
    <div className="flex flex-col gap-6 px-10 text-xs pb-0.5">
      <div className="flex items-center gap-3 w-4/12">
        <label htmlFor="mon-sede" className="sr-only">
          Periodo
        </label>
        <div className="flex h-9 items-center w-50 gap-2 rounded-lg bg-surface-light px-3">
          <span
            aria-hidden="true"
            className="pointer-events-none items-center select-none text-xs font-semibold text-muted uppercase"
          >
            Periodo
          </span>
          <select
            id="mon-periodo"
            defaultValue=""
            className="h-9 flex-1 items-center cursor-pointer bg-transparent text-xs text-muted uppercase outline-none!"
          >
            <option value="" />
            {YEARS.map((periodo) => (
              <option key={periodo} value={periodo}>
                {periodo}
              </option>
            ))}
          </select>
        </div>
        <label htmlFor="mon-sede" className="sr-only">
          Sede
        </label>
        <div className="flex h-9 items-center w-50 gap-2 rounded-lg bg-surface-light px-3">
          <span
            aria-hidden="true"
            className="pointer-events-none items-center select-none text-xs font-semibold text-muted uppercase"
          >
            Sede
          </span>
          <select
            id="mon-sede"
            defaultValue=""
            className="h-9 flex-1 items-center cursor-pointer bg-transparent text-xs text-muted uppercase outline-none!"
          >
            <option value="" />
            {SEDES.map((sede) => (
              <option key={sede} value={sede}>
                {sede}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          className="rounded-lg bg-brand px-8 py-2 text-sm font-bold tracking-wide text-white hover:bg-primary-hover"
        >
          BUSCAR
        </button>
      </div>
      <MonitoreosKpis />
      <ResultadosMonitoreoTable />
    </div>
  );
}
