import { matrizIperc } from "@/lib/matrizData";

export default function MatrizIpercTable() {
  return (
    <section
      className="flex flex-col rounded-xl bg-surface-default p-5 shadow-sm shadow-border-default"
      aria-labelledby="matriz-title"
    >
      <div className="flex flex-col">
        <h2
          id="matriz-title"
          className="text-sm font-bold uppercase text-text-primary"
        >
          Matriz IPERC 2026
        </h2>
        <p className="text-xs text-muted">Actualizada el 30 de junio de 2026</p>
      </div>

      <div className="mt-4 overflow-hidden rounded-lg">
        <div className="grid grid-cols-[1.1fr_1fr_1.1fr_0.55fr_0.55fr_0.55fr_0.75fr_1.2fr_1fr] gap-4 rounded-lg bg-surface-light p-3 text-[10px] font-semibold uppercase tracking-wider text-muted">
          <span>Proceso</span>
          <span>Peligro</span>
          <span>Riesgo a la salud</span>
          <span className="text-center">Expuestos</span>
          <span className="text-center">Prob.</span>
          <span className="text-center">Sev.</span>
          <span className="text-center">Nivel</span>
          <span>Control</span>
          <span>Programa asociado</span>
        </div>

        <div className="divide-y divide-dashed divide-border-subtle">
          {matrizIperc.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-[1.1fr_1fr_1.1fr_0.55fr_0.55fr_0.55fr_0.75fr_1.2fr_1fr] gap-4 px-3 py-3 text-xs items-center"
            >
              <span className="font-medium leading-tight text-text-primary">
                {row.proceso}
              </span>
              <span className="leading-tight text-text-secondary">
                {row.peligro}
              </span>
              <span className="leading-tight text-text-secondary">
                {row.riesgo}
              </span>
              <span className="self-center text-center font-bold text-brand">
                {row.expuestos}
              </span>
              <span className="self-center text-center text-text-secondary">
                {row.prob}
              </span>
              <span className="self-center text-center text-text-secondary">
                {row.sev}
              </span>
              <span className="flex justify-center self-center">
                <span
                  className={`rounded-full flex place-content-center h-5 w-full text-center mx-6 py-1 text-[10px] font-bold ${row.nivelClass}`}
                >
                  {row.nivel}
                </span>
              </span>
              <span className="leading-tight text-text-secondary">
                {row.control}
              </span>
              <span className="font-medium leading-tight text-text-primary">
                {row.programa}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
