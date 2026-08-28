import { casosPriorizados } from "@/lib/vigilanciaData";

export default function CasosPriorizadosTable() {
  return (
    <section
      className="col-span-7 flex flex-col rounded-xl p-5 shadow-sm shadow-border-default"
      aria-labelledby="casos-title"
    >
      <div className="flex items-start justify-between">
        <div>
          <h2
            id="casos-title"
            className="text-sm font-bold uppercase text-text-primary"
          >
            Casos priorizados para seguimiento
          </h2>
          <p className="text-xs text-muted">
            Trabajadores con hallazgos relevantes o alarmantes
          </p>
        </div>
        <a
          href="#"
          className="flex items-center gap-1.5 text-xs font-medium text-brand hover:text-primary-hover"
        >
          Ver matriz completa
          <i
            className="fa-solid fa-up-right-from-square text-[10px]"
            aria-hidden="true"
          />
        </a>
      </div>
      <div className="mt-4  rounded-lg border border-border-subtle/30">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="bg-surface-light text-[10px] font-semibold uppercase tracking-wider text-muted">
              <th scope="col" className="px-3 py-2 text-left font-semibold">
                Trabajador
              </th>
              <th scope="col" className="px-3 py-2 text-left font-semibold">
                Puesto / Sede
              </th>
              <th scope="col" className="px-3 py-2 text-left font-semibold">
                Hallazgos
              </th>
              <th scope="col" className="px-3 py-2 text-center font-semibold">
                Aptitud
              </th>
              <th scope="col" className="px-3 py-2 text-center font-semibold">
                Grupo
              </th>
            </tr>
          </thead>
          <tbody>
            {casosPriorizados.map((row) => (
              <tr
                key={row.id}
                className="border-t border-dashed border-border-subtle/40"
              >
                <td className="px-3 py-3 align-middle">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-medium leading-tight text-text-primary">
                      {row.trabajador}
                    </span>
                    <span className="text-[11px] text-muted">{row.dni}</span>
                  </div>
                </td>
                <td className="px-3 py-3 align-middle">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs leading-tight text-text-primary">
                      {row.puesto}
                    </span>
                    <span className="text-[11px] text-muted">{row.sede}</span>
                  </div>
                </td>
                <td className="px-3 py-3 align-middle">
                  <div className="flex flex-col gap-0.5">
                    {row.hallazgos.map((h, i) => (
                      <span
                        key={i}
                        className={`text-[11px] leading-tight ${(row as { hallazgosColor?: string }).hallazgosColor ?? "text-risk-red"}`}
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="whitespace-break-spaces px-3 py-3 align-middle text-center text-[10px] font-semibold uppercase leading-tight text-brand">
                  {row.aptitud}
                </td>
                <td className="px-3 py-3 align-middle">
                  <div className="flex justify-center">
                    <span
                      className={`flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold ${
                        row.grupo === "G3"
                          ? "bg-risk-red/10 text-risk-red"
                          : "bg-risk-salmon/15 text-risk-salmon"
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${row.grupo === "G3" ? "bg-risk-red" : "bg-risk-salmon"}`}
                        aria-hidden="true"
                      />
                      {row.grupo}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
