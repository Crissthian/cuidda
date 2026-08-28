import EmosKpis from "@/components/emos-y-trabajadores/EmosKpis";
import MatrizEmosTable from "@/components/emos-y-trabajadores/MatrizEmosTable";

export default function EmosTrabajadoresContent() {
  return (
    <div className="flex flex-col gap-6 text-xs p-0.5">
      <EmosKpis />
      <MatrizEmosTable />
    </div>
  );
}
