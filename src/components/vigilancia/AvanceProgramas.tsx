import { avanceProgramas } from "@/lib/vigilanciaData";

export default function AvanceProgramas() {
  return (
    <section
      className="col-span-7 flex flex-col rounded-xl p-5 shadow-sm shadow-border-default"
      aria-labelledby="programas-title"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2
            id="programas-title"
            className="text-sm font-bold uppercase text-text-primary"
          >
            Avance de programas de salud
          </h2>
          <p className="text-xs text-muted">
            Seguimiento de actividades por programa
          </p>
        </div>
        <a
          href="#"
          className="flex items-center gap-1 text-xs font-medium text-brand hover:text-primary-hover"
        >
          Ir a programas
          <i
            className="fa-solid fa-up-right-from-square text-[10px]"
            aria-hidden="true"
          />
        </a>
      </div>

      <div className="mt-5 flex flex-col gap-4">
        {avanceProgramas.map((item) => (
          <div key={item.id} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-secondary">{item.label}</span>
              <span className="flex items-center gap-2 text-[11px]">
                <span className="font-bold text-text-primary">
                  {item.actividades}
                </span>
                <span className="text-muted">{item.pct}%</span>
              </span>
            </div>
            <div className="h-2 w-full  rounded-full bg-surface-light">
              <div
                className="h-full rounded-full bg-violet"
                style={{ width: `${item.pct}%` }}
                role="progressbar"
                aria-valuenow={item.pct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${item.label} ${item.pct}%`}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
