import { historialVersiones } from "@/lib/protocoloDetalleData";

export default function HistorialVersionesCard() {
  return (
    <section
      className="flex flex-col rounded-xl bg-surface-default p-5 shadow-sm mt-6 shadow-border-default"
      aria-labelledby="historial-title"
    >
      <h2
        id="historial-title"
        className="text-sm font-bold uppercase text-text-primary"
      >
        Historial de versiones
      </h2>
      <p className="text-xs text-muted">
        Solo una versión vigente por periodo de aplicación.
      </p>

      <div className="mt-4 overflow-hidden rounded-lg">
        <div className="grid grid-cols-[0.5fr_0.7fr_0.9fr_1.4fr_0.8fr_0.6fr] gap-4 rounded-lg bg-surface-light p-3 text-xs uppercase tracking-wider text-muted">
          <span>Versión</span>
          <span>Fecha</span>
          <span>Responsable</span>
          <span>Condición</span>
          <span>Vigencia</span>
          <span className="text-center">Estado</span>
        </div>
        <div className="divide-y divide-dashed divide-border-subtle">
          {historialVersiones.map((row) => (
            <div
              key={row.version}
              className="grid grid-cols-[0.5fr_0.7fr_0.9fr_1.4fr_0.8fr_0.6fr] gap-4 p-3 text-xs"
            >
              <span className="font-medium text-text-primary">
                {row.version}
              </span>
              <span className="text-text-secondary">{row.fecha}</span>
              <span className="text-text-secondary">{row.responsable}</span>
              <span className="text-text-secondary">{row.condicion}</span>
              <span className="text-text-secondary">{row.vigencia}</span>
              <span className="flex justify-center items-center">
                <span
                  className={`rounded-lg h-5 w-10/12 text-center px-3 py-1 text-[10px] font-bold ${
                    row.estado === "VIGENTE"
                      ? "bg-success/15 text-success-dark"
                      : "bg-muted-20 text-muted"
                  }`}
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
