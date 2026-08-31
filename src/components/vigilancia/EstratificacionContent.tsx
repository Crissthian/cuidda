const grupos = [
  {
    id: "G1",
    pct: "62% de la población",
    title: "Sin hallazgos relevantes",
    subtitle:
      "Sin hallazgos o hallazgos no relevantes en EMO de ingreso / periódico",
    count: "467",
    border: "border-success",
    badgeBg: "bg-success/15",
    badgeDot: "bg-success",
    badgeText: "text-success-dark",
    pctColor: "text-success",
    actividadesGenerales: ["Capacitación anual", "Examen médico anual"],
    actividadesEspeciales: null as string[] | null,
    especialesLabel: "No aplica",
  },
  {
    id: "G2",
    pct: "33% de la población",
    title: "Riesgo (hallazgos relevantes no alarmantes)",
    subtitle:
      "Hallazgos relevantes sin criterio de alarma: requiere reevaluación",
    count: "221",
    border: "border-risk-salmon",
    badgeBg: "bg-risk-salmon/15",
    badgeDot: "bg-risk-salmon",
    badgeText: "text-risk-salmon",
    pctColor: "text-risk-salmon",
    actividadesGenerales: ["Capacitación anual", "Examen médico anual"],
    actividadesEspeciales: [
      "Reevaluación semestral",
      "Ingreso a programa específico",
    ],
    especialesLabel: null,
  },
  {
    id: "G3",
    pct: "4.9% de la población",
    title: "Riesgo importante / alarmante",
    subtitle: "Hallazgos importantes o alarmantes: posible origen ocupacional",
    count: "29",
    border: "border-risk-red",
    badgeBg: "bg-risk-red/10",
    badgeDot: "bg-risk-red",
    badgeText: "text-risk-red",
    pctColor: "text-risk-red",
    actividadesGenerales: ["Capacitación anual", "Examen médico anual"],
    actividadesEspeciales: [
      "Reevaluación semestral",
      "Consulta con especialista",
      "Determinación de origen ocupacional",
      "Comité de reubicación laboral",
    ],
    especialesLabel: null,
  },
] as const;

const reglas = [
  {
    id: "R-01",
    condicion: "Sin hallazgos o hallazgos no relevantes",
    grupo: "G1" as const,
    accion: "Capacitación y examen anual",
  },
  {
    id: "R-02",
    condicion: "Hallazgo relevante sin criterio de alarma",
    grupo: "G2" as const,
    accion: "Ingreso a programa + reevaluación semestral",
  },
  {
    id: "R-03",
    condicion: "Hallazgo relevante con exposición sobre LMP",
    grupo: "G2" as const,
    accion: "Programa específico según agente",
  },
  {
    id: "R-04",
    condicion: "Hallazgo alarmante o sospecha de origen ocupacional",
    grupo: "G3" as const,
    accion: "Especialista, calificación de origen y comité",
  },
  {
    id: "R-05",
    condicion: "Aptitud «no apto» o restricción permanente",
    grupo: "G3" as const,
    accion: "Comité de reubicación laboral",
  },
] as const;

const trabajadores = [
  {
    id: 1,
    grupo: "G3" as const,
    nombre: "Luis Quispe Ramos",
    cargo: "Operador de perforadora",
    tipo: "Interno",
    sede: "Condorcocha",
    hallazgos: "Hipoacusia neurosensorial bilateral · IMC 33.1",
    actividades:
      "Capacitación anual / Examen médico anual / Reevaluación semestral / Consulta con especialista / Determinación de origen ocupacional / Comité de reubicación laboral",
  },
  {
    id: 2,
    grupo: "G2" as const,
    nombre: "María Chávez Loayza",
    cargo: "Analista de laboratorio",
    tipo: "Interno",
    sede: "Condorcocha",
    hallazgos: "Espirometría restrictiva leve",
    actividades:
      "Capacitación anual / Examen médico anual / Reevaluación semestral / Ingreso a programa específico",
  },
  {
    id: 3,
    grupo: "G3" as const,
    nombre: "Jorge Tito Ayala",
    cargo: "Soldador",
    tipo: "Interno",
    sede: "Condorcocha",
    hallazgos: "Pterigión OD · Dermatitis de contacto",
    actividades:
      "Capacitación anual / Examen médico anual / Reevaluación semestral / Consulta con especialista / Determinación de origen ocupacional / Comité de reubicación laboral",
  },
  {
    id: 4,
    grupo: "G1" as const,
    nombre: "Ana Ruiz Mendoza",
    cargo: "Supervisora de planta",
    tipo: "Interno",
    sede: "Condorcocha",
    hallazgos: "Sin hallazgos relevantes",
    actividades: "Capacitación anual / Examen médico anual",
  },
  {
    id: 5,
    grupo: "G2" as const,
    nombre: "Pedro Salas Ninahuanca",
    cargo: "Conductor de volquete",
    tipo: "Externo",
    sede: "Condorcocha",
    hallazgos: "HTA estadio 1 · Somnolencia diurna",
    actividades:
      "Capacitación anual / Examen médico anual / Reevaluación semestral / Ingreso a programa específico",
  },
  {
    id: 6,
    grupo: "G1" as const,
    nombre: "Rosa Huamán Ccapa",
    cargo: "Asistente administrativo",
    tipo: "Externo",
    sede: "Condorcocha",
    hallazgos: "Sin hallazgos relevantes",
    actividades: "Capacitación anual / Examen médico anual",
  },
  {
    id: 7,
    grupo: "G3" as const,
    nombre: "Carlos Bravo Rios",
    cargo: "Mecánico de mina",
    tipo: "Interno",
    sede: "Condorcocha",
    hallazgos: "Neumoconiosis 0/1 1/1 · Lumbalgia crónica",
    actividades:
      "Capacitación anual / Examen médico anual / Reevaluación semestral / Consulta con especialista / Determinación de origen ocupacional / Comité de reubicación laboral",
  },
  {
    id: 8,
    grupo: "G1" as const,
    nombre: "Elena Paredes Vilchez",
    cargo: "Enfermera ocupacional",
    tipo: "Interno",
    sede: "Condorcocha",
    hallazgos: "Sin hallazgos relevantes",
    actividades: "Capacitación anual / Examen médico anual",
  },
  {
    id: 9,
    grupo: "G2" as const,
    nombre: "Victor Anco Flores",
    cargo: "Operador de chancado",
    tipo: "Externo",
    sede: "Condorcocha",
    hallazgos: "Hipoacusia inicial (4 kHz)",
    actividades:
      "Capacitación anual / Examen médico anual / Reevaluación semestral / Ingreso a programa específico",
  },
  {
    id: 10,
    grupo: "G1" as const,
    nombre: "Diana Ocampo Sifuentes",
    cargo: "Practicante de SST",
    tipo: "Externo",
    sede: "Condorcocha",
    hallazgos: "Sin hallazgos relevantes",
    actividades: "Capacitación anual / Examen médico anual",
  },
] as const;

function GrupoBadge({ grupo }: { grupo: "G1" | "G2" | "G3" }) {
  const map = {
    G1: "bg-success/15 text-success-dark",
    G2: "bg-risk-salmon/15 text-risk-salmon",
    G3: "bg-risk-red/10 text-risk-red",
  } as const;
  const dot = {
    G1: "bg-success",
    G2: "bg-risk-salmon",
    G3: "bg-risk-red",
  } as const;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold leading-none ${map[grupo]}`}
    >
      <span
        className={`size-2 rounded-full ${dot[grupo]}`}
        aria-hidden="true"
      />
      {grupo}
    </span>
  );
}

export default function EstratificacionContent() {
  return (
    <div className="flex flex-col gap-5 p-0.5">
      {/* ── 3 CARDS SUPERIORES ── */}
      <section
        aria-label="Grupos de estratificación"
        className="grid grid-cols-1 gap-4 lg:grid-cols-3"
      >
        {grupos.map((g) => (
          <div
            key={g.id}
            className={`flex flex-col overflow-hidden rounded-xl bg-surface-default shadow-sm shadow-border-default border-t-8 ${g.border}`}
          >
            <div className="flex flex-1 flex-col p-5">
              {/* header badge + pct */}
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold leading-none ${g.badgeBg} ${g.badgeText}`}
                >
                  <span
                    className={`size-2 rounded-full ${g.badgeDot}`}
                    aria-hidden="true"
                  />
                  {g.id}
                </span>
                <span className={`text-[11px] font-medium ${g.pctColor}`}>
                  {g.pct}
                </span>
              </div>

              <h3 className="mt-3 text-sm font-bold leading-tight text-text-primary">
                {g.title}
              </h3>
              <p className="mt-1 text-[11px] leading-snug text-muted">
                {g.subtitle}
              </p>

              <div className="mt-4">
                <span className="text-[28px] font-bold leading-none text-brand">
                  {g.count}
                </span>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-brand">
                  trabajadores clasificados
                </p>
              </div>

              <div className="mt-5 border-t border-dashed border-border-subtle/40 pt-4">
                <p className="text-sm font-bold uppercase tracking-widest text-muted">
                  Actividades generales
                </p>
                <ul className="mt-2.5 flex flex-col gap-2">
                  {g.actividadesGenerales.map((act) => (
                    <li
                      key={act}
                      className="flex items-center gap-2 text-xs leading-none text-text-secondary"
                    >
                      <i
                        className="fa-regular fa-circle-check text-xs text-success"
                        aria-hidden="true"
                      />
                      {act}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <p className="text-sm font-bold uppercase tracking-widest text-muted">
                  Actividades especiales
                </p>
                {g.actividadesEspeciales ? (
                  <ul className="mt-2.5 flex flex-col gap-2">
                    {g.actividadesEspeciales.map((act) => (
                      <li
                        key={act}
                        className="flex items-center gap-2 text-xs leading-none text-text-secondary"
                      >
                        <i
                          className={`fa-regular fa-circle-check text-xs shrink-0 ${
                            g.id === "G2" ? "text-risk-salmon" : "text-risk-red"
                          }`}
                          aria-hidden="true"
                        />
                        {act}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-xs text-muted">No aplica</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── REGLAS DE CLASIFICACIÓN ── */}
      <section
        aria-labelledby="reglas-title"
        className="rounded-xl bg-surface-default p-5 shadow-sm shadow-border-default"
      >
        <h2
          id="reglas-title"
          className="text-sm font-semibold uppercase tracking-wide text-text-primary"
        >
          Reglas de clasificación automática
        </h2>
        <p className="mt-0.5 text-xs text-muted">
          Se ejecutan al cargar la data de EMOs o los resultados de monitoreo
        </p>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-surface-light text-xs font-bold uppercase tracking-wider text-muted">
                <th
                  scope="col"
                  className="whitespace-nowrap px-4 py-3 text-left font-bold rounded-l-lg"
                >
                  Regla
                </th>
                <th scope="col" className="px-4 py-3 text-left font-bold">
                  Condición
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-4 py-3 text-center font-bold"
                >
                  Grupo asignado
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left font-bold rounded-r-lg"
                >
                  Acción disparada
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dashed divide-border-default/60">
              {reglas.map((r) => (
                <tr
                  key={r.id}
                  className="transition-colors hover:bg-surface-light/50"
                >
                  <td className="whitespace-nowrap px-4 py-3.5 text-xs font-bold text-text-primary">
                    {r.id}
                  </td>
                  <td className="px-4 py-3.5 text-xs leading-snug text-text-secondary">
                    {r.condicion}
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <GrupoBadge grupo={r.grupo} />
                  </td>
                  <td className="px-4 py-3.5 text-xs leading-snug text-text-secondary">
                    {r.accion}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── TRABAJADORES POR GRUPO ── */}
      <section
        aria-labelledby="trabajadores-title"
        className="rounded-xl bg-surface-default p-5 shadow-sm shadow-border-default"
      >
        <div className="flex flex-col gap-4">
          <div>
            <h2
              id="trabajadores-title"
              className="text-sm font-bold uppercase tracking-wide text-text-primary"
            >
              Trabajadores por grupo
            </h2>
            <p className="mt-0.5 text-xs text-muted">
              Resultado de la última clasificación
            </p>
          </div>

          {/* filtros */}
          <div className="flex flex-wrap items-end gap-3">
            <label className="flex flex-col gap-1.5">
              <div className="relative">
                <select
                  defaultValue="todas"
                  className="form-select min-w-40 appearance-none rounded-lg border border-border-subtle/40 bg-surface-light px-3 py-2 text-xs text-text-secondary outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                >
                  <option value="todas" disabled>
                    Sede
                  </option>
                  <option value="condorcocha">Condorcocha</option>
                  <option value="lima">Lima</option>
                </select>
              </div>
            </label>

            <label className="flex flex-col gap-1.5">
              <div className="relative">
                <select
                  defaultValue="todos"
                  className="form-select min-w-45 appearance-none rounded-lg border border-border-subtle/40 bg-surface-light px-3 py-2 text-xs text-text-secondary outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                >
                  <option value="todos" disabled>
                    Grupo de riesgo
                  </option>
                  <option value="G1">G1 — Sin hallazgos</option>
                  <option value="G2">G2 — Riesgo no alarmante</option>
                  <option value="G3">G3 — Riesgo importante</option>
                </select>
              </div>
            </label>

            <button
              type="button"
              className="inline-flex h-8 items-center justify-center rounded-lg bg-brand px-7 text-xs font-bold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              Buscar
            </button>
          </div>
        </div>

        <div className="mt-5 overflow-x-auto rounded-lg">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-surface-light text-xs font-bold uppercase tracking-wider text-muted">
                <th
                  scope="col"
                  className="whitespace-nowrap px-3 py-3 text-left font-bold w-28 rounded-l-lg"
                >
                  Grupo
                </th>
                <th
                  scope="col"
                  className="min-w-45 px-3 py-3 text-left font-bold w-60"
                >
                  Trabajador / Cargo
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-3 py-3 text-left font-bold w-28"
                >
                  Tipo
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-3 py-3 text-left font-bold w-28"
                >
                  Sede
                </th>
                <th
                  scope="col"
                  className="min-w-45 px-3 py-3 text-left font-bold w-60"
                >
                  Hallazgos determinantes
                </th>
                <th
                  scope="col"
                  className="min-w-65 px-3 py-3 text-left font-bold w-auto rounded-r-lg"
                >
                  Actividades asignadas
                </th>
              </tr>
            </thead>
            <tbody>
              {trabajadores.map((t) => (
                <tr
                  key={t.id}
                  className="divide-y divide-dashed divide-border-default/60"
                >
                  <td className="px-3 py-3 flex items-center justify-evenly">
                    <i
                      className="fa-solid fa-pen-to-square text-sm text-brand"
                      aria-hidden="true"
                    />
                    <GrupoBadge grupo={t.grupo} />
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-semibold leading-tight text-text-primary">
                        {t.nombre}
                      </span>
                      <span className="text-xs leading-tight text-muted">
                        {t.cargo}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-xs text-text-secondary">
                    {t.tipo}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-xs text-text-secondary">
                    {t.sede}
                  </td>
                  <td className="px-3 py-3 text-xs leading-snug text-text-secondary">
                    {t.hallazgos}
                  </td>
                  <td className="px-3 py-3 text-xs leading-snug text-brand border-b border-dashed border-border-default/60">
                    {t.actividades}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* footer paginación sutil */}
        <div className="mt-4 flex items-center justify-between text-xs text-muted">
          <span>Mostrando 10 de 717 trabajadores</span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="rounded-lg border border-border-subtle/40 px-3 py-1.5 text-xs font-medium text-muted hover:bg-surface-light hover:text-text-primary disabled:opacity-40"
              disabled
            >
              Anterior
            </button>
            <span className="rounded-lg bg-brand px-3 py-1.5 text-xs font-bold text-white">
              1
            </span>
            <button
              type="button"
              className="rounded-lg border border-border-subtle/40 px-3 py-1.5 text-xs font-medium text-muted hover:bg-surface-light hover:text-text-primary"
            >
              2
            </button>
            <button
              type="button"
              className="rounded-lg border border-border-subtle/40 px-3 py-1.5 text-xs font-medium text-muted hover:bg-surface-light hover:text-text-primary"
            >
              Siguiente
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
