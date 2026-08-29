import { resultadosMonitoreo } from "@/lib/monitoreosData";

export default function ResultadosMonitoreoTable() {
  return (
    <section
      className="flex flex-col rounded-xl bg-surface-default p-5 shadow-sm shadow-border-default"
      aria-labelledby="resultados-title"
    >
      <div className="flex flex-col">
        <h2
          id="resultados-title"
          className="text-sm font-bold uppercase text-text-primary"
        >
          Resultados de monitoreo
        </h2>
        <p className="text-xs text-muted">
          Comparados contra límite máximo permisible
        </p>
      </div>

      <div className="mt-4 overflow-hidden rounded-lg">
        <div className="grid grid-cols-[1.2fr_0.8fr_1.1fr_0.8fr_0.9fr_0.7fr_0.7fr] gap-4 rounded-lg bg-surface-light p-3 text-[10px] font-semibold uppercase tracking-wider text-muted">
          <span>Agente</span>
          <span>Tipo</span>
          <span>Área evaluada</span>
          <span>Fecha</span>
          <span>Resultado</span>
          <span>LMP</span>
          <span className="text-center">Estado</span>
        </div>

        <div className="divide-y divide-dashed divide-border-subtle">
          {resultadosMonitoreo.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-[1.2fr_0.8fr_1.1fr_0.8fr_0.9fr_0.7fr_0.7fr] gap-4 px-3 py-3 text-xs"
            >
              <span className="font-medium leading-tight text-text-primary">
                {row.agente}
              </span>
              <span className="leading-tight text-text-secondary">
                {row.tipo}
              </span>
              <span className="leading-tight text-text-secondary">
                {row.area}
              </span>
              <span className="text-text-secondary">{row.fecha}</span>
              <span className="font-medium text-brand">{row.resultado}</span>
              <span className="text-text-secondary">{row.lmp}</span>
              <span className="flex justify-center self-center">
                <span
                  className={`rounded-full w-full h-5 mx-8 text-center px-3 py-1 text-[10px] font-bold ${row.estadoClass}`}
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
