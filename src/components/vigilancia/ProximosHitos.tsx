import { proximosHitos } from "@/lib/vigilanciaData";

export default function ProximosHitos() {
  return (
    <section
      className="col-span-5 flex flex-col rounded-xl p-5 shadow-sm shadow-border-default"
      aria-labelledby="hitos-title"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 id="hitos-title" className="text-sm font-bold uppercase text-text-primary">
            Próximos hitos
          </h2>
          <p className="text-xs text-muted">Agenda operativa de las siguientes semanas</p>
        </div>
        <a href="#" className="flex items-center gap-1 text-xs font-medium text-brand hover:text-primary-hover">
          Ver total de pendientes
          <i className="fa-solid fa-up-right-from-square text-[10px]" aria-hidden="true" />
        </a>
      </div>

      <div className="mt-5 flex flex-col">
        {proximosHitos.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 border-t border-dashed border-border-subtle/40 py-3 first:border-t-0 first:pt-0"
          >
            <span className="mt-0.5 shrink-0 rounded-full bg-brand px-3 py-1 text-[11px] font-bold text-white">
              {item.fecha}
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-medium leading-tight text-text-primary">{item.titulo}</span>
              <span className="text-[11px] text-muted">{item.subtitulo}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
