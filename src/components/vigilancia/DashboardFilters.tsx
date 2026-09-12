const SEDES = ["Condorcocha", "Atocongo", "Conchán", "Villarán"];

const TODAY = new Date();
const CURRENT_YEAR = TODAY.getFullYear();
const YEARS = Array.from({ length: 10 }, (_, i) => CURRENT_YEAR - i);
const TODAY_ISO = `${CURRENT_YEAR}-${String(TODAY.getMonth() + 1).padStart(2, "0")}-${String(
    TODAY.getDate(),
).padStart(2, "0")}`;

export default function DashboardFilters() {
    return (
        <section
            className="flex items-center gap-3"
            aria-label="Filtros del dashboard"
        >
            <div className="flex flex-1 items-center gap-6">
                <label htmlFor="f-periodo" className="sr-only">
                    Periodo
                </label>
                <select
                    id="f-periodo"
                    className="form-select h-9 flex-1 items-center rounded-lg bg-surface-light px-3 text-xs text-muted"
                    defaultValue={String(CURRENT_YEAR)}
                >
                    {YEARS.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>

                <label htmlFor="f-sede" className="sr-only">
                    Sede
                </label>
                <div className="form-select-container flex-1">
                    <select
                        id="f-sede"
                        className="form-select h-9 flex-1 items-center w-full bg-surface-light px-3 text-xs text-muted uppercase"
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Sede
                        </option>
                        {SEDES.map((sede) => (
                            <option key={sede} value={sede}>
                                {sede}
                            </option>
                        ))}
                    </select>
                </div>

                <label htmlFor="f-desde" className="sr-only">
                    Desde
                </label>
                <input
                    id="f-desde"
                    type="date"
                    className="form-input h-9 flex-1 items-center rounded-lg bg-surface-light px-3 text-xs text-muted"
                    defaultValue={`${CURRENT_YEAR}-01-01`}
                    max={TODAY_ISO}
                />

                <label htmlFor="f-hasta" className="sr-only">
                    Hasta
                </label>
                <input
                    id="f-hasta"
                    type="date"
                    className="form-input h-9 flex-1 items-center rounded-lg bg-surface-light px-3 text-xs text-muted"
                    defaultValue={TODAY_ISO}
                    max={TODAY_ISO}
                />
            </div>

            <button
                type="button"
                className="rounded-lg bg-brand px-10 py-2 text-sm font-bold tracking-wide text-white hover:bg-primary-hover"
            >
                BUSCAR
            </button>
        </section>
    );
}
