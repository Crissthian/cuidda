import { avanceMensual } from "@/lib/planAnualData";

export default function AvanceMensual() {
  return (
    <section className="col-span-5 flex flex-col rounded-xl bg-surface-default p-5 shadow-sm shadow-border-subtle" aria-labelledby="avance-title">
      <h2 id="avance-title" className="text-xs font-bold uppercase text-text-primary">
        Avance mensual
      </h2>
      <p className="text-[11px] text-muted">Planificado vs. ejecutado</p>

      <div className="mt-5 flex flex-col gap-4">
        {avanceMensual.map((row) => (
          <div key={row.mes} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-text-primary">{row.mes}</span>
              <span className="flex items-center gap-2 text-[11px]">
                <span className="font-bold text-text-primary">plan {row.plan}%</span>
                <span className="text-muted">ejec {row.ejec}%</span>
              </span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-surface-light">
              <div className="absolute inset-y-0 left-0 rounded-full bg-[#2dd4bf]" style={{ width: `${row.plan}%` }} aria-hidden="true" />
              <div className="absolute inset-y-0 left-0 rounded-full bg-violet opacity-90" style={{ width: `${row.ejec}%` }} role="progressbar" aria-valuenow={row.ejec} aria-valuemin={0} aria-valuemax={100} aria-label={`${row.mes} ejecutado ${row.ejec}%`} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
