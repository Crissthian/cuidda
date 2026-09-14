import {
  areasProtocolo,
  estadosProtocolo,
  protocolos,
} from "@/lib/protocolosData";

export default function BibliotecaProtocolosTable() {
  return (
    <section
      className="flex flex-col rounded-xl bg-surface-default p-5 shadow-sm shadow-border-default"
      aria-labelledby="biblioteca-title"
    >
      <h2
        id="biblioteca-title"
        className="text-sm font-bold uppercase text-text-primary"
      >
        Biblioteca de protocolos
      </h2>

      <div className="mt-4 flex max-w-5/12 items-center gap-3">
        <label htmlFor="p-area" className="sr-only">
          Área
        </label>
        <div className="flex h-9 flex-1 items-center gap-2 rounded-lg bg-surface-light ps-3">
          <span
            aria-hidden="true"
            className="pointer-events-none select-none text-xs text-muted capitalize"
          >
            Área
          </span>
          <select
            id="p-area"
            defaultValue=""
            className="h-9 flex-1 items-center cursor-pointer bg-transparent text-xs text-muted capitalize outline-none! pe-3 rounded-lg"
          >
            <option value="" />
            {areasProtocolo.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="p-estado" className="sr-only">
          Estado
        </label>
        <div className="flex h-9 flex-1 items-center gap-2 rounded-lg bg-surface-light ps-3">
          <span
            aria-hidden="true"
            className="pointer-events-none select-none text-xs text-muted capitalize"
          >
            Estado
          </span>
          <select
            id="p-estado"
            defaultValue=""
            className="h-9 flex-1 items-center cursor-pointer bg-transparent text-xs text-muted capitalize outline-none! pe-3 rounded-lg"
          >
            <option value="" />
            {estadosProtocolo.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          className="shrink-0 rounded-lg bg-brand px-8 py-2 text-sm font-bold tracking-wide text-white hover:bg-primary-hover"
        >
          BUSCAR
        </button>
      </div>

      <div className="mt-5 overflow-hidden rounded-lg">
        <div className="grid grid-cols-[1.2fr_1fr_0.9fr_0.7fr_1.3fr_0.5fr_0.7fr_0.7fr_0.6fr] gap-4 rounded-lg bg-surface-light p-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
          <span>Protocolo</span>
          <span>Empresa</span>
          <span>Área</span>
          <span className="text-center">Puestos</span>
          <span>Tipos de EMO</span>
          <span className="text-center">Versión</span>
          <span className="text-center">Actualización</span>
          <span className="text-center">Estado</span>
          <span className="text-center">Detalle</span>
        </div>

        <div className="divide-y divide-dashed divide-border-subtle">
          {protocolos.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-[1.2fr_1fr_0.9fr_0.7fr_1.3fr_0.5fr_0.7fr_0.7fr_0.6fr] gap-4 p-3 text-xs"
            >
              <div className="flex flex-col gap-0.5">
                <span className="font-semibold leading-tight text-text-primary">
                  {row.protocolo}
                </span>
                <span className="text-[11px] text-muted">{row.codigo}</span>
              </div>
              <span className="leading-tight text-text-secondary">
                {row.empresa}
              </span>
              <span className="leading-tight text-text-secondary">
                {row.area}
              </span>
              <span className="self-center text-center text-text-secondary">
                {row.puestos}
              </span>
              <span className="leading-tight text-brand">{row.tipos}</span>
              <span className="self-center text-center text-text-secondary">
                {row.version}
              </span>
              <span className="self-center text-center text-text-secondary">
                {row.actualizacion}
              </span>
              <span className="flex justify-center self-center">
                <span className="rounded-full bg-success/15 px-3 py-1 text-[11px] font-bold text-success-dark">
                  {row.estado}
                </span>
              </span>
              <span className="flex justify-center self-center">
                <a
                  href={`/vigilancia-medica/protocolos-medicos/${row.slug}`}
                  aria-label={`Ver detalles del protocolo ${row.protocolo}`}
                  className="flex w-18 items-center text-center gap-1 rounded-lg bg-muted px-3 py-1 text-[11px] font-bold text-white hover:bg-muted-80"
                >
                  <i
                    className="fa-solid fa-eye text-[11px]"
                    aria-hidden="true"
                  />
                  VER
                </a>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
