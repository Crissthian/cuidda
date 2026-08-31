import {
  kpisProgramas,
  programasCards,
  resultadosMonitoreoProgramas,
  tabsProgramas,
} from "@/lib/programasData";
import { useState } from "react";

type Tab = (typeof tabsProgramas)[number];

export default function ProgramasContent() {
  const [activeTab, setActiveTab] = useState<Tab>("TODOS");

  const filtered =
    activeTab === "TODOS"
      ? programasCards
      : programasCards.filter((p) => p.categoria === activeTab);

  const filteredResultados = resultadosMonitoreoProgramas.filter((row) =>
    filtered.some((prog) => prog.titulo === row.programa),
  );

  return (
    <div className="flex flex-col gap-5 text-xs">
      <div className="max-h-180 overflow-y-auto p-0.5 pb-2">
        {/* KPIs */}
        <div className="grid grid-cols-4 gap-6 pb-6">
          {kpisProgramas.map((kpi) => (
            <div
              key={kpi.id}
              className="flex items-center gap-4 rounded-xl bg-surface-default p-5 shadow-sm shadow-border-subtle"
            >
              <span
                className={`flex size-14 shrink-0 items-center justify-center rounded-lg ${kpi.iconBg}`}
                aria-hidden="true"
              >
                <i
                  className={`fa-solid ${kpi.icon} text-2xl ${kpi.iconColor}`}
                />
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-medium leading-tight text-text-secondary whitespace-break-spaces">
                  {kpi.label}
                </span>
                <span className="py-1 text-2xl font-bold leading-none text-brand">
                  {kpi.value}
                </span>
                <span className="text-xs text-success">{kpi.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 rounded-lg bg-muted-20 px-2 py-2">
          {tabsProgramas.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-md px-5 py-1.5 text-xs font-bold transition ${
                activeTab === tab
                  ? "bg-brand text-white shadow-sm"
                  : "bg-surface-default text-brand hover:bg-surface-light"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-4 gap-6 pb-6">
          {filtered.map((prog) => (
            <section
              key={prog.id}
              className="flex flex-col rounded-xl bg-surface-default p-4 shadow-sm shadow-border-subtle"
              aria-labelledby={`prog-${prog.id}`}
            >
              <div className="flex items-start justify-between gap-2">
                <h3
                  id={`prog-${prog.id}`}
                  className="text-xs font-bold leading-tight text-text-primary"
                >
                  {prog.titulo}
                </h3>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-[9px] font-bold ${prog.categoriaClass}`}
                >
                  {prog.categoria}
                </span>
              </div>
              <span className="text-[11px] text-text-secondary">
                {prog.responsable}
              </span>

              <div className="mt-3 flex items-center justify-between">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-light">
                  <div
                    className={`h-full rounded-full ${prog.barColor}`}
                    style={{ width: `${prog.avance}%` }}
                    role="progressbar"
                    aria-valuenow={prog.avance}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
                <span className="ml-3 shrink-0 text-xl font-bold leading-none text-brand">
                  {prog.avance}%
                </span>
              </div>

              <div className="mt-3 text-[11px] leading-tight">
                <span className="font-medium text-brand">
                  {prog.trabajadores}
                </span>
                <span className="text-muted"> · {prog.actividades}</span>
              </div>

              <div className="mt-2 flex gap-1.5">
                {prog.grupos.map((g) => (
                  <span
                    key={g}
                    className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      g === "G3"
                        ? "bg-risk-red/10 text-risk-red"
                        : g === "G2"
                          ? "bg-risk-salmon/15 text-risk-salmon"
                          : "bg-success/15 text-success-dark"
                    }`}
                  >
                    <span
                      className={`size-1.5 rounded-full ${g === "G3" ? "bg-risk-red" : g === "G2" ? "bg-risk-salmon" : "bg-success"}`}
                      aria-hidden="true"
                    />
                    {g}
                  </span>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Tabla resultados */}
        <section
          className="flex flex-col rounded-xl bg-surface-default p-5 shadow-sm shadow-border-subtle"
          aria-labelledby="resultados-title"
        >
          <h2
            id="resultados-title"
            className="text-sm font-bold uppercase text-text-primary"
          >
            Resultados de monitoreo
          </h2>
          <p className="text-xs text-muted">
            Comparados contra límite máximo permisible
          </p>

          <div className="mt-4 overflow-hidden rounded-lg">
            <div className="grid grid-cols-[1.1fr_1.5fr_0.9fr_0.7fr_0.7fr] gap-4 rounded-lg bg-surface-light px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-muted">
              <span>Programa</span>
              <span>Actividad</span>
              <span>Responsable</span>
              <span className="text-center">Vence</span>
              <span className="text-center">Estado</span>
            </div>
            <div className="divide-y divide-dashed divide-border-subtle">
              {filteredResultados.map((row) => (
                <div
                  key={row.id}
                  className="grid grid-cols-[1.1fr_1.5fr_0.9fr_0.7fr_0.7fr] gap-4 px-3 py-3 text-xs"
                >
                  <span className="font-medium text-text-primary">
                    {row.programa}
                  </span>
                  <span className="text-text-secondary">{row.actividad}</span>
                  <span className="text-text-secondary">{row.responsable}</span>
                  <span className="text-center text-text-secondary">
                    {row.vence}
                  </span>
                  <span className="flex justify-center">
                    <span
                      className={`rounded-full w-full mx-14 text-center px-2 py-1 text-[10px] font-bold ${row.estadoClass}`}
                    >
                      {row.estado}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
