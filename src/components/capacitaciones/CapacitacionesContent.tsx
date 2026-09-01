import CalendarioCapacitaciones from "@/components/capacitaciones/CalendarioCapacitaciones";
import CapacitacionesKpis from "@/components/capacitaciones/CapacitacionesKpis";

export default function CapacitacionesContent() {
  return (
    <div className="flex flex-col gap-5 text-xs">
      <div className="px-10 pb-2">
        <div className="grid grid-cols-1 gap-6 pb-6">
          <CapacitacionesKpis />
        </div>
        <div className="pb-6">
          <CalendarioCapacitaciones />
        </div>
      </div>
    </div>
  );
}
