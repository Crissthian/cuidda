import { hallazgosFrecuentes } from "@/lib/vigilanciaData";

export default function HallazgosFrecuentes() {
  return (
    <section
      className="col-span-5 flex flex-col rounded-xl p-5 shadow-sm shadow-border-default"
      aria-labelledby="hallazgos-title"
    >
      <div>
        <h2
          id="hallazgos-title"
          className="text-sm font-bold uppercase text-text-primary"
        >
          Hallazgos más frecuentes
        </h2>
        <p className="text-xs text-muted">Base de EMOs 2026</p>
      </div>

      <div className="mt-5 flex flex-col gap-4">
        {hallazgosFrecuentes.map((item) => (
          <div key={item.id} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-secondary">{item.label}</span>
              <span className="text-xs">
                <span className="font-bold text-text-primary">
                  {item.value}
                </span>
                <span
                  className={`ml-1 text-[11px] font-medium ${item.delta.startsWith("+") ? "text-success-dark" : item.delta.startsWith("-") ? "text-risk-salmon" : "text-muted"}`}
                >
                  {item.delta}
                </span>
              </span>
            </div>
            <div className="h-1.5 w-full  rounded-full bg-surface-light">
              <div
                className="h-full rounded-full bg-[#14b8a6]"
                style={{ width: `${item.pct}%` }}
                role="progressbar"
                aria-valuenow={item.pct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={item.label}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
