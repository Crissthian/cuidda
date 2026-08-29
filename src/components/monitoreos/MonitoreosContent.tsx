import MonitoreosKpis from "@/components/monitoreos/MonitoreosKpis";
import ResultadosMonitoreoTable from "@/components/monitoreos/ResultadosMonitoreoTable";

export default function MonitoreosContent() {
  return (
    <div className="flex flex-col gap-6 p-0.5 text-xs">
      <div className="flex items-center gap-3 w-4/12">
        <label htmlFor="mon-sede" className="sr-only">
          Sede
        </label>
        <select
          id="mon-sede"
          className="form-select h-8 w-48 rounded-lg bg-surface-light px-3 text-xs text-muted"
          defaultValue=""
        >
          <option value="" disabled>
            Sede
          </option>
          <option>Todas</option>
          <option>Condorcocha</option>
          <option>Atocongo</option>
        </select>
        <button
          type="button"
          className="rounded-lg bg-brand px-8 py-2 text-xs font-bold tracking-wide text-white hover:bg-primary-hover"
        >
          BUSCAR
        </button>
      </div>
      <MonitoreosKpis />
      <ResultadosMonitoreoTable />
    </div>
  );
}
