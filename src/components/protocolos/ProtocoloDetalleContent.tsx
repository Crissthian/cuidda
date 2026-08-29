import type { protocolos } from "@/lib/protocolosData";
import DocumentoProtocoloCard from "@/components/protocolos/detail/DocumentoProtocoloCard";
import HistorialVersionesCard from "@/components/protocolos/detail/HistorialVersionesCard";
import PerfilEvaluacionCard from "@/components/protocolos/detail/PerfilEvaluacionCard";
import ProtocoloHeaderCard from "@/components/protocolos/detail/ProtocoloHeaderCard";
import PuestosIncluidosCard from "@/components/protocolos/detail/PuestosIncluidosCard";

type Props = { protocolo: (typeof protocolos)[number] };

export default function ProtocoloDetalleContent({ protocolo }: Props) {
  return (
    <div className="flex flex-col gap-6 p-0.5 text-xs">
      <ProtocoloHeaderCard protocolo={protocolo} />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <PerfilEvaluacionCard />
          <HistorialVersionesCard />
        </div>
        <div className="col-span-4 flex flex-col gap-6">
          <PuestosIncluidosCard />
          <DocumentoProtocoloCard
            codigo={protocolo.codigo}
            version={protocolo.version}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8"></div>
      </div>
    </div>
  );
}
