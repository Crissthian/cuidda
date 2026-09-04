import { fichaEmpresa } from "@/lib/estudioData";

export default function FichaEmpresa() {
  return (
    <section
      className="flex flex-col rounded-xl bg-surface-default p-5 shadow-sm shadow-border-subtle"
      aria-labelledby="ficha-title"
    >
      <h2
        id="ficha-title"
        className="text-sm font-bold uppercase text-text-primary"
      >
        Ficha de la empresa
      </h2>
      <p className="text-xs text-muted">
        Datos maestros del cliente en vigilancia
      </p>
      <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4">
        {fichaEmpresa.map((item) => (
          <div key={item.label} className="flex flex-col gap-0.5">
            <span className="text-sm uppercase text-text-primary">
              {item.label}
            </span>
            <span className="text-xs leading-tight text-text-secondary">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
