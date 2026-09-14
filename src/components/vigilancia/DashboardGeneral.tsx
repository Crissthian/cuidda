import AvanceProgramas from "@/components/vigilancia/AvanceProgramas";
import CasosPriorizadosTable from "@/components/vigilancia/CasosPriorizadosTable";
import DashboardFilters from "@/components/vigilancia/DashboardFilters";
import EstratificacionCard from "@/components/vigilancia/EstratificacionCard";
import HallazgosFrecuentes from "@/components/vigilancia/HallazgosFrecuentes";
import KpiCards from "@/components/vigilancia/KpiCards";
import PlanAnualChart from "@/components/vigilancia/PlanAnualChart";
import ProximosHitos from "@/components/vigilancia/ProximosHitos";

export default function DashboardGeneral() {
  const fechaHoy = new Date().toLocaleDateString("es-PE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col gap-5 text-xs px-10 print:px-2 print:gap-4">
      {/* ── Cabecera de informe para impresión / PDF ── */}
      <div className="print-only mb-2 border-b-2 border-brand pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo-cuidda.png"
              alt="Cuidda"
              className="h-11 w-auto object-contain"
            />
            <div>
              <h1 className="text-base font-bold uppercase tracking-wide text-brand leading-tight">
                Informe de Vigilancia Médica Ocupacional
              </h1>
              <p className="text-xs font-medium text-text-secondary">
                Dashboard General · Estado Consolidado del Sistema de Vigilancia
              </p>
            </div>
          </div>
          <div className="text-right text-[10px] text-text-secondary leading-tight">
            <p className="font-bold text-text-primary">
              LUCEMEDIC SALUD OCUPACIONAL
            </p>
            <p className="capitalize">Emisión: {fechaHoy}</p>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-4 gap-3 rounded-lg bg-surface-light px-4 py-2 text-[10px]">
          <div>
            <span className="font-bold text-text-primary">Empresa: </span>
            <span className="text-text-secondary">UNACEM PERÚ S.A.</span>
          </div>
          <div>
            <span className="font-bold text-text-primary">Sede: </span>
            <span className="text-text-secondary">Planta Condorcocha</span>
          </div>
          <div>
            <span className="font-bold text-text-primary">Período: </span>
            <span className="text-text-secondary">2026 (Anual)</span>
          </div>
          <div>
            <span className="font-bold text-text-primary">Alcance: </span>
            <span className="text-text-secondary">1,284 Colaboradores</span>
          </div>
        </div>
      </div>

      <div className="no-print">
        <DashboardFilters />
      </div>

      <div className="flex flex-col gap-6 print:gap-4 p-0.5">
        <div className="break-inside-avoid">
          <KpiCards />
        </div>

        <div className="grid grid-cols-12 gap-6 print:gap-4 break-inside-avoid">
          <PlanAnualChart />
          <EstratificacionCard />
        </div>

        <div className="grid grid-cols-12 gap-6 print:gap-4 break-inside-avoid">
          <CasosPriorizadosTable />
          <HallazgosFrecuentes />
        </div>

        <div className="grid grid-cols-12 gap-6 print:gap-4 pb-4 break-inside-avoid">
          <AvanceProgramas />
          <ProximosHitos />
        </div>
      </div>

      {/* ── Pie de página solo para impresión ── */}
      <footer className="print-only border-t border-dashed border-border-default pt-2 text-[9px] text-muted">
        <div className="flex items-center justify-between">
          <span>Cuidda · Sistema Médico de Salud Ocupacional</span>
          <span>Informe Técnico de Vigilancia Médica — Confidencial</span>
          <span>Población: 1,284 trabajadores</span>
        </div>
      </footer>
    </div>
  );
}
