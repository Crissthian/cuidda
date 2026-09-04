import { validacionCruzada } from "@/lib/estudioData";

export default function ValidacionCruzada() {
  return (
    <section
      className="flex flex-col rounded-xl bg-surface-default p-5 shadow-sm shadow-border-subtle"
      aria-labelledby="validacion-title"
    >
      <h2
        id="validacion-title"
        className="text-sm font-bold uppercase text-text-primary"
      >
        Validación cruzada (IA)
      </h2>
      <p className="text-xs text-muted">
        Coherencia entre línea base y evidencia
      </p>
      <div className="mt-4 flex flex-col gap-4">
        {validacionCruzada.map((item, idx) => (
          <div
            key={item.id}
            className={`flex flex-col gap-1.5 ${idx < validacionCruzada.length - 1 ? "border-b border-dashed border-border-subtle/40 pb-4" : ""}`}
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xs font-semibold text-text-primary">
                {item.titulo}
              </h3>
              <span
                className={`w-15 shrink-0 rounded-full px-3 py-0.5 text-center text-[10px] font-bold ${item.estadoClass}`}
              >
                {item.estado}
              </span>
            </div>
            <p className="w-10/12 text-xs leading-relaxed text-text-secondary">
              {item.descripcion}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
