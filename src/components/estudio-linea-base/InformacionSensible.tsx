import { informacionSensible } from "@/lib/estudioData";

export default function InformacionSensible() {
  return (
    <section
      className="flex flex-col rounded-xl bg-surface-default p-5 shadow-sm shadow-border-subtle"
      aria-labelledby="sensible-title"
    >
      <h2
        id="sensible-title"
        className="text-sm font-bold uppercase text-text-primary"
      >
        Información sensible
      </h2>
      <p className="text-muted">Acceso restringido y trazable</p>
      <div className="mt-5 flex flex-col">
        {informacionSensible.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between border-t border-dashed border-border-subtle/40 py-3 first:border-t-0 first:pt-0"
          >
            <span className="text-xs text-text-secondary">{row.label}</span>
            <span className="text-xs font-medium text-brand">{row.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
