import { antecedentes } from "@/lib/estudioData";

export default function AntecedentesOrganizacion() {
  return (
    <section
      className="flex flex-col rounded-xl bg-surface-default p-5 shadow-sm shadow-border-subtle"
      aria-labelledby="antecedentes-title"
    >
      <h2
        id="antecedentes-title"
        className="text-sm font-bold uppercase text-text-primary"
      >
        Antecedentes de la organización
      </h2>
      <p className="text-xs text-muted">Insumo del motor de validación</p>

      <div className="mt-4 overflow-hidden rounded-lg">
        <div className="grid grid-cols-[1.1fr_1.4fr] gap-4 rounded-lg bg-surface-light p-3 text-[10px] font-semibold uppercase tracking-wider text-muted">
          <span>Campo</span>
          <span>Registro</span>
        </div>
        <div className="divide-y divide-dashed divide-border-subtle">
          {antecedentes.map((row) => (
            <div
              key={row.campo}
              className="grid grid-cols-[1.1fr_1.4fr] gap-4 p-3 text-xs"
            >
              <span className="flex items-start gap-2 text-text-secondary">
                <i
                  className="fa-regular fa-building mt-0.5 text-xs text-muted"
                  aria-hidden="true"
                />
                {row.campo}
              </span>
              <span className="text-brand">{row.registro}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
