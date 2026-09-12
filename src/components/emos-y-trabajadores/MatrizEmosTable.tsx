import { matrizEmos } from "@/lib/emosData";
import { GRUPOS } from "@/lib/grupos";
import { SEDES } from "@/lib/sedes";

export default function MatrizEmosTable() {
  return (
    <section
      className="flex flex-col rounded-xl bg-surface-default p-5 shadow-sm shadow-border-default"
      aria-labelledby="matriz-title"
    >
      <div className="flex items-center justify-between gap-4">
        <h2
          id="matriz-title"
          className="text-sm font-bold uppercase text-text-primary"
        >
          Matriz de EMOs
        </h2>
      </div>
      {/* Filtros */}
      <div className="mt-4 flex w-7/12 items-center gap-3">
        <label htmlFor="f-sede" className="sr-only">
          Sede
        </label>
        <div className="flex h-9 w-48 items-center gap-2 rounded-lg bg-surface-light px-3">
          <span
            aria-hidden="true"
            className="pointer-events-none select-none text-xs font-semibold text-muted uppercase"
          >
            Sede
          </span>
          <select
            id="f-sede"
            className="h-full flex-1 items-center cursor-pointer bg-transparent text-xs text-muted uppercase outline-none!"
            defaultValue=""
          >
            <option value="" disabled />
            {SEDES.map((sede) => (
              <option key={sede} value={sede}>
                {sede}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="f-grupo" className="sr-only">
          Grupo de riesgo
        </label>
        <div className="flex h-8 w-48 items-center gap-2 rounded-lg bg-surface-light px-3">
          <span
            aria-hidden="true"
            className="pointer-events-none select-none text-xs font-semibold text-muted uppercase"
          >
            Grupo de riesgo
          </span>
          <select
            id="f-grupo"
            className="h-full flex-1 items-center cursor-pointer bg-transparent text-xs text-muted uppercase outline-none!"
            defaultValue=""
          >
            <option value="" disabled />
            {GRUPOS.map((grupo) => (
              <option key={grupo} value={grupo}>
                {grupo}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="f-estado" className="sr-only">
          Estado de lectura
        </label>
        <div className="flex h-8 w-60 items-center gap-2 rounded-lg bg-surface-light px-3">
          <span
            aria-hidden="true"
            className="pointer-events-none select-none text-xs font-semibold text-muted uppercase"
          >
            Estado de lectura
          </span>
          <select
            id="f-estado"
            className="h-full flex-1 items-center cursor-pointer bg-transparent text-xs text-muted uppercase outline-none!"
            defaultValue=""
          >
            <option value="" disabled />
            <option value="leido">Lecturado</option>
            <option value="no-leido">Pendiente</option>
          </select>
        </div>
        <button
          type="button"
          className="rounded-lg bg-brand px-8 py-2 text-xs font-bold tracking-wide text-white hover:bg-primary-hover"
        >
          BUSCAR
        </button>
      </div>
      <div className="mt-5 overflow-hidden rounded-lg">
        <div className="grid grid-cols-[1.1fr_1.1fr_0.8fr_0.8fr_1fr_1.4fr_1.2fr_0.6fr_0.9fr] gap-2 rounded-lg bg-surface-light p-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
          <span>Trabajador</span>
          <span>Puesto / Sede</span>
          <span>Antigüedad</span>
          <span>EMO</span>
          <span>Aptitud</span>
          <span>Hallazgos</span>
          <span>Factores de riesgo</span>
          <span className="text-center">Grupo</span>
          <span className="text-center">Estado de lectura</span>
        </div>

        <div className="divide-y divide-dashed divide-border-subtle">
          {matrizEmos.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-[1.1fr_1.1fr_0.8fr_0.8fr_1fr_1.4fr_1.2fr_0.6fr_0.9fr] gap-2 px-3 py-3 text-xs"
            >
              <div className="flex flex-col gap-0.5">
                <span className="font-medium leading-tight text-text-primary">
                  {row.trabajador}
                </span>
                <span className="text-xs text-muted">{row.dni}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="leading-tight text-text-primary">
                  {row.puesto}
                </span>
                <span className="text-xs text-muted">{row.sede}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-medium text-text-primary">
                  {row.antiguedad}
                </span>
                <span className="text-xs text-muted">ingreso</span>
                <span className="text-xs text-muted">{row.ingreso}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-text-primary">{row.emo}</span>
                <span className="text-xs text-muted">{row.emoFecha}</span>
              </div>
              <span className="self-center text-xs font-semibold uppercase leading-tight text-brand whitespace-break-spaces">
                {row.aptitud}
              </span>
              <div className="flex flex-col gap-0.5 self-center">
                {row.hallazgos.map((h, i) => (
                  <span
                    key={i}
                    className={`text-xs leading-tight ${row.hallazgosColor}`}
                  >
                    {h}
                  </span>
                ))}
              </div>
              <span className="self-center text-xs leading-tight text-text-secondary">
                {row.factores}
              </span>
              <span className="flex justify-center self-center">
                <span
                  className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
                    row.grupo === "G3"
                      ? "bg-risk-red/10 text-risk-red"
                      : row.grupo === "G2"
                        ? "bg-risk-salmon/15 text-risk-salmon"
                        : "bg-success/15 text-success-dark"
                  }`}
                >
                  <span
                    className={`size-1.5 rounded-full ${
                      row.grupo === "G3"
                        ? "bg-risk-red"
                        : row.grupo === "G2"
                          ? "bg-risk-salmon"
                          : "bg-success"
                    }`}
                    aria-hidden="true"
                  />
                  {row.grupo}
                </span>
              </span>
              <span className="flex justify-center self-center">
                <span
                  className={`rounded-full w-20 text-center px-2.5 py-1 text-xs font-bold ${
                    row.lectura === "lecturado"
                      ? "bg-success/15 text-success-dark"
                      : "bg-risk-salmon/15 text-risk-salmon"
                  }`}
                >
                  {row.lectura === "lecturado" ? "Lecturado" : "Pendiente"}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
