import { protocolos } from "@/lib/protocolosData";

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

      <div className="mt-4 flex items-center gap-3">
        <label htmlFor="p-empresa" className="sr-only">
          Empresa
        </label>
        <select
          id="p-empresa"
          className="form-select h-8 flex-1 rounded-lg bg-surface-light px-3 text-xs text-muted"
          defaultValue=""
        >
          <option value="" disabled>
            Empresa
          </option>
          <option>Minera Andes Sur S.A.</option>
          <option>Transportes Vía Norte S.A.C.</option>
        </select>

        <label htmlFor="p-sede" className="sr-only">
          Sede
        </label>
        <select
          id="p-sede"
          className="form-select h-8 flex-1 rounded-lg bg-surface-light px-3 text-xs text-muted"
          defaultValue=""
        >
          <option value="" disabled>
            Sede
          </option>
          <option>Todas</option>
        </select>

        <label htmlFor="p-area" className="sr-only">
          Área
        </label>
        <select
          id="p-area"
          className="form-select h-8 flex-1 rounded-lg bg-surface-light px-3 text-xs text-muted"
          defaultValue=""
        >
          <option value="" disabled>
            Área
          </option>
          <option>Administración</option>
          <option>Operaciones</option>
        </select>

        <label htmlFor="p-tipo" className="sr-only">
          Tipo de EMO
        </label>
        <select
          id="p-tipo"
          className="form-select h-8 flex-1 rounded-lg bg-surface-light px-3 text-xs text-muted"
          defaultValue=""
        >
          <option value="" disabled>
            Tipo de EMO
          </option>
          <option>Periódico</option>
          <option>Ingreso</option>
        </select>

        <label htmlFor="p-estado" className="sr-only">
          Estado
        </label>
        <select
          id="p-estado"
          className="form-select h-8 flex-1 rounded-lg bg-surface-light px-3 text-xs text-muted"
          defaultValue=""
        >
          <option value="" disabled>
            Estado
          </option>
          <option>Vigente</option>
          <option>Por actualizar</option>
        </select>

        <button
          type="button"
          className="shrink-0 rounded-lg bg-brand px-8 py-2 text-xs font-bold tracking-wide text-white hover:bg-primary-hover"
        >
          BUSCAR
        </button>
      </div>

      <div className="mt-5 overflow-hidden rounded-lg">
        <div className="grid grid-cols-[1.2fr_1fr_0.9fr_0.7fr_1.3fr_0.5fr_0.7fr_0.7fr_0.6fr] gap-4 rounded-lg bg-surface-light p-3 text-[10px] font-semibold uppercase tracking-wider text-muted">
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
                <span className="rounded-full bg-success/15 px-3 py-1 text-[10px] font-bold text-success-dark">
                  {row.estado}
                </span>
              </span>
              <span className="flex justify-center self-center">
                <a
                  href={`/vigilancia-medica/protocolos-medicos/${row.id}`}
                  aria-label={`Ver detalles del protocolo ${row.protocolo}`}
                  className="flex w-18 place-content-center gap-1 rounded-lg bg-muted px-3 py-1 text-[10px] font-bold text-white hover:bg-muted-80"
                >
                  <i
                    className="fa-solid fa-eye text-[10px]"
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
