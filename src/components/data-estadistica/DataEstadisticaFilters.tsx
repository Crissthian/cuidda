export default function DataEstadisticaFilters() {
    return (
        <section
            className="flex items-center gap-3"
            aria-label="Filtros de data estadística"
        >
            <div className="flex flex-1 items-center gap-4">
                <label htmlFor="de-tipo" className="sr-only">
                    Tipo de examen
                </label>
                <select
                    id="de-tipo"
                    className="form-select h-8 flex-1 rounded-lg bg-surface-light px-3 text-xs text-muted"
                    defaultValue=""
                >
                    <option value="" disabled>
                        Tipo de examen
                    </option>
                    <option value="emo">EMO</option>
                    <option value="medicina">Medicina</option>
                    <option value="laboratorio">Laboratorio</option>
                    <option value="audiometria">Audiometría</option>
                    <option value="espirometria">Espirometría</option>
                </select>

                <label htmlFor="de-sede" className="sr-only">
                    Sede
                </label>
                <select
                    id="de-sede"
                    className="form-select h-8 flex-1 rounded-lg bg-surface-light px-3 text-xs text-muted"
                    defaultValue=""
                >
                    <option value="" disabled>
                        Sede
                    </option>
                    <option value="lima">Lima</option>
                    <option value="arequipa">Arequipa</option>
                    <option value="condorcocha">Condorcocha</option>
                </select>

                <label htmlFor="de-desde" className="sr-only">
                    Desde
                </label>
                <select
                    id="de-desde"
                    className="form-select h-8 flex-1 rounded-lg bg-surface-light px-3 text-xs text-muted"
                    defaultValue=""
                >
                    <option value="" disabled>
                        Desde: dd/mm/aaaa
                    </option>
                    <option value="2026-01-01">Desde: 01/01/2026</option>
                    <option value="2026-06-01">Desde: 01/06/2026</option>
                </select>

                <label htmlFor="de-hasta" className="sr-only">
                    Hasta
                </label>
                <select
                    id="de-hasta"
                    className="form-select h-8 flex-1 rounded-lg bg-surface-light px-3 text-xs text-muted"
                    defaultValue=""
                >
                    <option value="" disabled>
                        Hasta: dd/mm/aaaa
                    </option>
                    <option value="2026-06-30">Hasta: 30/06/2026</option>
                    <option value="2026-12-31">Hasta: 31/12/2026</option>
                </select>
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
