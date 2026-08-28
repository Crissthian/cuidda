import { estratificacion } from "@/lib/vigilanciaData";

export default function EstratificacionCard() {
  return (
    <section
      className="col-span-5 flex flex-col rounded-xl p-5 shadow-sm shadow-border-default"
      aria-labelledby="estrat-title"
    >
      <div className="flex items-start justify-between">
        <div>
          <h2 id="estrat-title" className="text-sm uppercase text-text-primary">
            Estratificación por grupo de riesgo
          </h2>
          <p className="text-xs text-muted">
            Segmentación automática según hallazgos de los EMOs
          </p>
        </div>
        <a
          href="#"
          className="flex items-center gap-2 text-sm text-brand hover:text-primary-hover"
        >
          Ver detalle
          <i
            className="fa-solid fa-up-right-from-square text-[10px]"
            aria-hidden="true"
          />
        </a>
      </div>

      <div className="mt-8 flex flex-col gap-8 text-sm">
        {estratificacion.map((item) => (
          <div key={item.id} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`flex items-center gap-1.5 rounded-full px-2 py-0.5 ${item.badgeBg}`}
                >
                  <span
                    className={`size-2 rounded-full ${item.dot}`}
                    aria-hidden="true"
                  />
                  <span className="text-xs font-bold text-text-primary">
                    {item.id}
                  </span>
                </span>
                <span className="text-xs text-text-secondary">
                  {item.label}
                </span>
              </div>
              <span className="text-xs">
                <span className="font-bold text-text-primary">
                  {item.value}
                </span>
                <span className="text-muted"> ({item.pct}%)</span>
              </span>
            </div>
            <div className="h-2 w-full  rounded-full bg-surface-light">
              <div
                className={`h-full rounded-full ${item.color}`}
                style={{ width: `${item.pct}%` }}
                role="progressbar"
                aria-valuenow={item.pct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${item.id} ${item.pct}%`}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
