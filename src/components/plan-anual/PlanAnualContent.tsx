import ActividadesTable from "@/components/plan-anual/ActividadesTable";
import AvanceMensual from "@/components/plan-anual/AvanceMensual";
import PlanAnualKpis from "@/components/plan-anual/PlanAnualKpis";

export default function PlanAnualContent() {
  return (
    <div className="flex flex-col gap-5 text-xs">
      <div className="p-0.5 pb-2">
        <div className="flex items-center gap-3 pb-6 w-4/12">
          <label htmlFor="pa-periodo" className="sr-only">
            Periodo
          </label>
          <select
            id="pa-periodo"
            className="form-select h-8 w-48 rounded-lg bg-surface-light px-3 text-xs text-muted"
            defaultValue=""
          >
            <option value="" disabled>
              Periodo
            </option>
            <option>2026</option>
            <option>2025</option>
          </select>
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
