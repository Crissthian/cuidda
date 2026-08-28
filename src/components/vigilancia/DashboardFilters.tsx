export default function DashboardFilters() {
  return (
    <section className="flex items-center gap-3" aria-label="Filtros del dashboard">
      <div className="flex flex-1 items-center gap-6">
        <label htmlFor="f-periodo" className="sr-only">
          Periodo
        </label>
        <select
          id="f-periodo"
          className="form-select h-8 flex-1 rounded-lg bg-surface-light px-3 text-xs text-muted"
          defaultValue=""
        >
          <option value="" disabled>
            Periodo
          </option>
          <option>2023</option>
          <option>2024</option>
        </select>

        <label htmlFor="f-sede" className="sr-only">
          Sede
        </label>
        <div className="form-select-container flex-1">
          <select
            id="f-sede"
            className="form-select h-8 w-full bg-surface-light px-3 text-xs text-muted"
            defaultValue=""
          >
            <option value="" disabled>
              Sede
            </option>
            <option>Lima</option>
            <option>Arequipa</option>
          </select>
        </div>

        <label htmlFor="f-desde" className="sr-only">
          Desde
        </label>
        <div className="form-select-container flex-1">
          <select
            id="f-desde"
            className="form-select h-8 w-full bg-surface-light px-3 text-xs text-muted"
            defaultValue="2023-10-18"
          >
            <option>Desde: 18 /10/23</option>
            <option>Desde: 01 /01/24</option>
          </select>
        </div>

        <label htmlFor="f-hasta" className="sr-only">
          Hasta
        </label>
        <div className="form-select-container flex-1">
          <select
            id="f-hasta"
            className="form-select h-8 w-full bg-surface-light px-3 text-xs text-muted"
            defaultValue="2023-10-18"
          >
            <option>Hasta: 18 /10/23</option>
            <option>Hasta: 31 /12/24</option>
          </select>
        </div>
      </div>

      <button
        type="button"
        className="rounded-lg bg-brand px-10 py-2 text-xs font-bold tracking-wide text-white hover:bg-primary-hover"
      >
        BUSCAR
      </button>
    </section>
  );
}
