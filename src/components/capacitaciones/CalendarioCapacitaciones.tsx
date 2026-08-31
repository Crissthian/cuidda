import { calendarioCapacitaciones } from "@/lib/capacitacionesData";

const grupoStyle: Record<string, string> = {
  G3: "bg-risk-red/15 text-risk-red",
  G2: "bg-risk-salmon/15 text-risk-salmon",
  G1: "bg-success/15 text-success-dark",
  Todos: "text-text-primary font-medium",
  Brigadistas: "text-text-primary font-medium",
};

const estadoStyle: Record<string, string> = {
  CERRADO: "bg-success/15 text-success-dark",
  "EN CURSO": "bg-violet/15 text-violet",
  PROGRAMADO: "bg-muted-20 text-muted",
};

export default function CalendarioCapacitaciones() {
  return (
    <section
      className="flex flex-col rounded-xl bg-surface-default p-5 shadow-sm shadow-border-subtle"
      aria-labelledby="calendario-title"
    >
      <h2
        id="calendario-title"
        className="text-sm font-bold uppercase text-text-primary"
      >
        Calendario de capacitaciones
      </h2>
      <p className="text-xs text-muted">Cumplimiento por tema y grupo</p>

      <div className="mt-4 overflow-hidden rounded-lg">
        <div className="grid grid-cols-[1.4fr_0.7fr_0.9fr_0.7fr_0.7fr_1.2fr_0.6fr] gap-4 rounded-lg bg-surface-light p-3 text-[10px] font-semibold uppercase tracking-wider text-muted">
          <span>Tema</span>
          <span>Modalidad</span>
          <span>Grupo objetivo</span>
          <span>Fecha</span>
          <span className="text-center">Asistencia</span>
          <span>Cumplimiento</span>
          <span className="text-center">Estado</span>
        </div>

        <div className="divide-y divide-dashed divide-border-subtle">
          {calendarioCapacitaciones.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-[1.4fr_0.7fr_0.9fr_0.7fr_0.7fr_1.2fr_0.6fr] gap-4 p-3 text-xs"
            >
              <span className="font-medium leading-tight text-text-primary">
                {row.tema}
              </span>
              <span className="self-center text-text-secondary">
                {row.modalidad}
              </span>
              <span className="flex flex-wrap items-center gap-1.5 self-center">
                {row.grupo.map((g) => (
                  <span
                    key={g}
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      g === "Todos" || g === "Brigadistas"
                        ? "text-text-primary"
                        : (grupoStyle[g] ?? "bg-muted-20 text-muted")
                    }`}
                  >
                    {g !== "Todos" && g !== "Brigadistas" && (
                      <span
                        className={`size-1.5 rounded-full ${g === "G3" ? "bg-risk-red" : g === "G2" ? "bg-risk-salmon" : "bg-success"}`}
                        aria-hidden="true"
                      />
                    )}
                    {g}
                  </span>
                ))}
              </span>
              <span className="self-center text-text-secondary">
                {row.fecha}
              </span>
              <span className="self-center text-center font-bold text-brand">
                {row.asistencia}
              </span>
              <div className="flex items-center gap-2 self-center">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-light">
                  <div
                    className="h-full rounded-full bg-[#14b8a6]"
                    style={{ width: `${row.cumplimiento}%` }}
                    role="progressbar"
                    aria-valuenow={row.cumplimiento}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
                <span className="shrink-0 text-[11px] text-text-secondary">
                  {row.cumplimiento}%
                </span>
              </div>
              <span className="flex justify-center self-center">
                <span
                  className={`rounded-full w-full text-center mx-3 px-3 py-1 text-[10px] font-bold ${estadoStyle[row.estado] ?? "bg-muted-20 text-muted"}`}
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
