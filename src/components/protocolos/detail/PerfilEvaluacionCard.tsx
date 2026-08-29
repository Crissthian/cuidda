import { useState } from "react";
import { perfilEvaluaciones, perfilTabs } from "@/lib/protocoloDetalleData";

type Tab = (typeof perfilTabs)[number];

export default function PerfilEvaluacionCard() {
  const [tab, setTab] = useState<Tab>("INGRESO");
  const data = perfilEvaluaciones[tab];

  return (
    <section
      className="flex flex-col rounded-xl bg-surface-default p-5 shadow-sm shadow-border-default"
      aria-labelledby="perfil-title"
    >
      <h2
        id="perfil-title"
        className="text-sm font-bold uppercase text-text-primary"
      >
        Perfil por tipo de evaluación
      </h2>
      <p className="text-xs text-muted">
        Cada tipo de EMO tiene su propio perfil de exámenes.
      </p>

      <div
        className="mt-4 flex gap-2 rounded-lg bg-surface-light p-2"
        role="tablist"
        aria-label="Tipos de evaluación"
      >
        {perfilTabs.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition ${
              tab === t
                ? "bg-brand text-white shadow-sm"
                : "bg-surface-default text-brand hover:bg-surface-light"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-5 overflow-hidden rounded-lg">
        <div className="grid grid-cols-[1fr_0.7fr_1.2fr] gap-4 rounded-lg bg-surface-light p-3 text-xs uppercase tracking-wider text-muted">
          <span>Evaluación / Examen</span>
          <span>Tipo</span>
          <span>Condición</span>
        </div>
        <div className="divide-y divide-dashed divide-border-subtle">
          {data.map((row) => (
            <div
              key={row.evaluacion}
              className="grid grid-cols-[1fr_0.7fr_1.2fr] gap-4 px-3 py-2.5 text-xs"
            >
              <span className="text-text-secondary">{row.evaluacion}</span>
              <span
                className={`font-semibold ${row.tipo === "BASE" ? "text-brand" : "text-brand"}`}
              >
                {row.tipo}
              </span>
              <span className="text-text-secondary">{row.condicion}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
