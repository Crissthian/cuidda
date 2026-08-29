import BibliotecaProtocolosTable from "@/components/protocolos/BibliotecaProtocolosTable";
import ProtocolosKpis from "@/components/protocolos/ProtocolosKpis";

export default function ProtocolosContent() {
  return (
    <div className="flex flex-col gap-6 p-0.5 text-xs">
      <ProtocolosKpis />
      <BibliotecaProtocolosTable />
    </div>
  );
}
