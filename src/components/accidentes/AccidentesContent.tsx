import AccidentesKpis from "@/components/accidentes/AccidentesKpis";
import RegistroEventosTable from "@/components/accidentes/RegistroEventosTable";

export default function AccidentesContent() {
  return (
    <div className="flex flex-col gap-5 text-xs">
      <div className="p-0.5 pb-2">
        <div className="flex items-center gap-3 pb-6 max-w-6/12">
          <label htmlFor="acc-periodo" className="sr-only">
            Periodo
          </label>
          <select
            id="acc-periodo"
            className="form-select h-8 w-48 rounded-lg bg-surface-light px-3 text-xs text-muted"
            defaultValue=""
          >
            <option value="" disabled>
              Periodo
            </option>
            <option>2026</option>
            <option>2025</option>
          </select>
          <label htmlFor="acc-sede" className="sr-only">
            Sede
          </label>
          <select
            id="acc-sede"
            className="form-select h-8 w-48 rounded-lg bg-surface-light px-3 text-xs text-muted"
            defaultValue=""
          >
            <option value="" disabled>
              Sede
            </option>
            <option>Todas</option>
            <option>Condorcocha</option>
          </select>
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
