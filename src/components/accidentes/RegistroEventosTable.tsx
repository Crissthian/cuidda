import { registroEventos } from "@/lib/accidentesData";

export default function RegistroEventosTable() {
  return (
    <section
      className="flex flex-col rounded-xl bg-surface-default p-5 shadow-sm shadow-border-subtle"
      aria-labelledby="registro-title"
    >
      <h2
        id="registro-title"
        className="text-sm font-bold uppercase text-text-primary"
      >
        Registro de eventos
      </h2>
      <p className="text-xs text-muted">
        Trazabilidad completa para investigación
      </p>

      <div className="mt-4 overflow-hidden rounded-lg">
        <div className="grid grid-cols-[0.7fr_0.9fr_0.7fr_0.9fr_0.8fr_0.8fr_0.7fr_1.1fr_0.7fr] gap-4 rounded-lg bg-surface-light p-3 text-[10px] font-semibold uppercase tracking-wider text-muted">
          <span>Tipo</span>
          <span>Código</span>
          <span>Fecha</span>
          <span>Trabajador</span>
          <span>Área</span>
          <span>Severidad</span>
          <span className="text-center">Días perdidos</span>
          <span>Causa raíz</span>
          <span className="text-center">Estado</span>
        </div>
        <div className="divide-y divide-dashed divide-border-subtle">
          {registroEventos.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-[0.7fr_0.9fr_0.7fr_0.9fr_0.8fr_0.8fr_0.7fr_1.1fr_0.7fr] gap-4 p-3 text-xs"
            >
              <span className="self-center text-text-secondary">
                {row.tipo}
              </span>
              <span className="self-center font-bold text-brand">
                {row.codigo}
              </span>
              <span className="self-center text-text-secondary">
                {row.fecha}
              </span>
              <span className="self-center font-medium leading-tight text-text-primary">
                {row.trabajador}
              </span>
              <span className="self-center text-text-secondary">
                {row.area}
              </span>
              <span className="self-center font-semibold text-brand">
                {row.severidad}
              </span>
              <span className="self-center text-center font-medium text-text-primary">
                {row.dias}
              </span>
              <span className="self-center leading-tight text-text-secondary">
                {row.causa}
              </span>
              <span className="flex justify-center self-center">
                <span
                  className={`rounded-full w-full text-center mx-4 px-2 py-1 text-[10px] font-bold ${row.estadoClass}`}
                >
                  {row.estado}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
