import { getDetalle } from "@/lib/protocoloDetalleData";
import type { protocolos } from "@/lib/protocolosData";

type Props = { protocolo: (typeof protocolos)[number] };

export default function ProtocoloHeaderCard({ protocolo }: Props) {
  const d = getDetalle(protocolo);
  return (
    <section
      className="rounded-xl bg-surface-default p-5 shadow-sm shadow-border-default"
      aria-labelledby="header-protocolo"
    >
      <h2 id="header-protocolo" className="sr-only">
        Resumen del protocolo
      </h2>
      <div className="grid grid-cols-4 gap-x-6 gap-y-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs uppercase text-muted">Empresa</span>
          <span className="text-sm font-semibold text-text-primary">
            {d.empresa}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs uppercase text-muted">Sede</span>
          <span className="text-sm font-semibold text-text-primary">
            {d.sede}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs uppercase text-muted">
            Grupo ocupacional
          </span>
          <span className="text-sm font-semibold text-text-primary">
            {d.grupo}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs uppercase text-muted">Área</span>
          <span className="text-sm font-semibold text-text-primary">
            {d.area}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs uppercase text-muted">Versión</span>
          <span className="text-sm font-semibold text-text-primary">
            {d.version}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs uppercase text-muted">Vigencia desde</span>
          <span className="text-sm font-semibold text-text-primary">
            {d.vigencia}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs uppercase text-muted">
            Última actualización
          </span>
          <span className="text-sm font-semibold text-text-primary">
            {d.ultima}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs uppercase text-muted">Responsable</span>
          <span className="text-sm font-semibold leading-tight text-text-primary">
            {d.responsable}
          </span>
        </div>
      </div>

      <div className="mt-5 border-t border-dashed border-border-subtle pt-4">
        <div className="w-4/12 flex gap-4">
          <span className="rounded-lg bg-success/15 px-3 py-1 text-[10px] font-bold text-success-dark w-full text-center">
            VIGENTE
          </span>
          <span className="rounded-lg bg-[#e6f0ff] px-3 py-1 text-[10px] font-bold text-brand w-full text-center">
            10 EVALUACIONES
          </span>
          <span className="rounded-lg bg-risk-salmon/15 px-3 py-1 text-[10px] font-bold text-risk-salmon w-full text-center">
            4 CONDICIONALES
          </span>
          <span className="rounded-lg bg-muted-20 px-3 py-1 text-[10px] font-bold text-muted w-full text-center">
            12 ASOCIADOS
          </span>
        </div>
      </div>
    </section>
  );
}
