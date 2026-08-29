import { puestosIncluidos } from "@/lib/protocoloDetalleData";

export default function PuestosIncluidosCard() {
  return (
    <section
      className="flex flex-col rounded-xl bg-surface-default p-5 shadow-sm shadow-border-default"
      aria-labelledby="puestos-title"
    >
      <h2
        id="puestos-title"
        className="text-sm font-bold uppercase text-text-primary"
      >
        Puestos incluidos
      </h2>
      <ul className="mt-3 flex flex-col gap-1.5">
        {puestosIncluidos.map((puesto) => (
          <li
            key={puesto}
            className="flex items-center gap-2 text-sm text-text-secondary"
          >
            <i
              className="fa-solid fa-briefcase text-sm text-muted"
              aria-hidden="true"
            />
            {puesto}
          </li>
        ))}
      </ul>
    </section>
  );
}
