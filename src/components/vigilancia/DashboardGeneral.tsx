import AvanceProgramas from "@/components/vigilancia/AvanceProgramas";
import CasosPriorizadosTable from "@/components/vigilancia/CasosPriorizadosTable";
import DashboardFilters from "@/components/vigilancia/DashboardFilters";
import EstratificacionCard from "@/components/vigilancia/EstratificacionCard";
import HallazgosFrecuentes from "@/components/vigilancia/HallazgosFrecuentes";
import KpiCards from "@/components/vigilancia/KpiCards";
import PlanAnualChart from "@/components/vigilancia/PlanAnualChart";
import ProximosHitos from "@/components/vigilancia/ProximosHitos";

export default function DashboardGeneral() {
  return (
    <div className="flex flex-col gap-5 px-10 pt-6 text-xs">
      <DashboardFilters />
      <div className="max-h-165 flex flex-col gap-6 overflow-y-scroll px-1 pt-1">
        <KpiCards />

        <div className="grid grid-cols-12 gap-6">
          <PlanAnualChart />
          <EstratificacionCard />
        </div>

        <div className="grid grid-cols-12 gap-6">
          <CasosPriorizadosTable />
          <HallazgosFrecuentes />
        </div>

        <div className="grid grid-cols-12 gap-6 pb-4">
          <AvanceProgramas />
          <ProximosHitos />
        </div>
      </div>
    </div>
  );
}
