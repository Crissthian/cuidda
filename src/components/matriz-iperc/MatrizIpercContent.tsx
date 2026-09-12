import MatrizIpercTable from "@/components/matriz-iperc/MatrizIpercTable";
import MatrizKpis from "@/components/matriz-iperc/MatrizKpis";
import { SEDES } from "@/lib/sedes";

export default function MatrizIpercContent() {
  return (
    <div
      className="flex flex-col gap-6 text-xs px-10"
      aria-label="Matriz IPERC 001"
    >
      <div className="flex w-4/12 items-center gap-3">
        <label htmlFor="m-sede" className="sr-only">
          Sede
        </label>
        <div className="flex h-8 w-48 items-center gap-2 rounded-lg bg-surface-light px-3">
          <span
            aria-hidden="true"
            className="pointer-events-none select-none text-xs font-semibold text-muted"
          >
            Sede
          </span>
          <select
            id="m-sede"
            className="h-full flex-1 items-center uppercase cursor-pointer bg-transparent text-xs text-muted outline-none!"
            defaultValue=""
          >
            <option value="" />
            {SEDES.map((sede) => (
              <option key={sede} value={sede}>
                {sede}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          className="rounded-lg bg-brand px-8 py-2 text-xs font-bold tracking-wide text-white hover:bg-primary-hover"
        >
          BUSCAR
        </button>
      </div>
      <MatrizKpis />
      <MatrizIpercTable />
    </div>
  );
}
