import { sedesProcesos } from "@/lib/estudioData";

export default function SedesProcesos() {
  return (
    <section
      className="flex flex-col rounded-xl bg-surface-default p-5 shadow-sm shadow-border-subtle"
      aria-labelledby="sedes-title"
    >
      <h2
        id="sedes-title"
        className="text-sm font-bold uppercase text-text-primary"
      >
        Sedes y procesos
      </h2>
      <p className="text-xs text-muted">
        Módulo sedes y procesos del sistema de vigilancia médica ocupacional
        CUIDDA.
      </p>
      <div className="mt-4 overflow-hidden rounded-lg">
        <div className="grid grid-cols-[1.2fr_0.7fr_0.6fr_0.8fr_1.2fr] gap-4 rounded-lg bg-surface-light p-3 text-[10px] font-semibold uppercase tracking-wider text-muted">
          <span>Sede</span>
          <span>Ubicación</span>
          <span className="text-center">Procesos</span>
          <span className="text-center">Trabajadores</span>
          <span>Riesgo dominante</span>
        </div>
        <div className="divide-y divide-dashed divide-border-subtle">
          {sedesProcesos.map((row) => (
            <div
              key={row.sede}
              className="grid grid-cols-[1.2fr_0.7fr_0.6fr_0.8fr_1.2fr] gap-4 px-3 py-3 text-xs"
            >
              <span className="font-medium text-text-primary">{row.sede}</span>
              <span className="text-text-secondary">{row.ubicacion}</span>
              <span className="text-center text-text-secondary">
                {row.procesos}
              </span>
              <span className="text-center text-text-secondary">
                {row.trabajadores}
              </span>
              <span className="text-text-secondary">{row.riesgo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
