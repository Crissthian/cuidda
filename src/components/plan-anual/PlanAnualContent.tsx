import ActividadesTable from "@/components/plan-anual/ActividadesTable";
import AvanceMensual from "@/components/plan-anual/AvanceMensual";
import PlanAnualKpis from "@/components/plan-anual/PlanAnualKpis";
const TODAY = new Date();
const CURRENT_YEAR = TODAY.getFullYear();
const YEARS = Array.from({ length: 10 }, (_, i) => CURRENT_YEAR - i);

export default function PlanAnualContent() {
  return (
    <div className="flex flex-col gap-5 text-xs">
      <div className="pb-2">
        <div className="flex items-center gap-3 pb-6 w-4/12">
          <label htmlFor="pa-periodo" className="sr-only">
            Periodo
          </label>
          <div className="flex h-8 w-48 items-center gap-2 rounded-lg bg-surface-light px-3">
            <span
              aria-hidden="true"
              className="pointer-events-none select-none text-xs font-semibold text-muted uppercase"
            >
              Periodo
            </span>
            <select
              id="pa-periodo"
              defaultValue=""
              className="h-full flex-1 items-center cursor-pointer bg-transparent text-xs text-muted uppercase outline-none!"
            >
              <option value="" />
              {YEARS.map((periodo) => (
                <option key={periodo} value={periodo}>
                  {periodo}
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
          <PlanAnualKpis />
        </div>

        <div className="grid grid-cols-12 gap-6 pb-6">
          <ActividadesTable />
          <AvanceMensual />
        </div>
      </div>
    </div>
  );
}
