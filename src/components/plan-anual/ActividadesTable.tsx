import { actividadesPlan } from "@/lib/planAnualData";

export default function ActividadesTable() {
  return (
    <section
      className="col-span-7 flex flex-col rounded-xl bg-surface-default p-5 shadow-sm shadow-border-subtle"
      aria-labelledby="actividades-title"
    >
      <h2
        id="actividades-title"
        className="text-sm font-bold uppercase text-text-primary"
      >
        Actividades del plan anual
      </h2>
      <p className="text-xs text-muted">Aprobado por el Comité de SST</p>

      <div className="mt-4 overflow-hidden rounded-lg">
        <div className="grid grid-cols-[1.6fr_0.9fr_0.6fr_0.7fr_0.7fr] gap-4 rounded-lg bg-surface-light p-3 text-[10px] font-semibold uppercase tracking-wider text-muted">
          <span>Actividad</span>
          <span>Responsable</span>
          <span className="text-center">Trimestre</span>
          <span className="text-center">Inversión</span>
          <span className="text-center">Estado</span>
        </div>
        <div className="divide-y divide-dashed divide-border-subtle">
          {actividadesPlan.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-[1.6fr_0.9fr_0.6fr_0.7fr_0.7fr] gap-4 p-3 text-xs"
            >
              <span className="leading-tight text-text-primary">
                {row.actividad}
              </span>
              <span className="leading-tight text-text-secondary">
                {row.responsable}
              </span>
              <span className="self-center text-center text-text-secondary">
                {row.trimestre}
              </span>
              <span className="self-center text-center font-bold text-brand">
                {row.inversion}
              </span>
              <span className="flex justify-center self-center">
                <span
                  className={`rounded-full w-full mx-4 text-center px-2 py-1 text-[10px] font-bold ${row.estadoClass}`}
                >
                  {row.estado}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
