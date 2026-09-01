import MatrizIpercTable from "@/components/matriz-iperc/MatrizIpercTable";
import MatrizKpis from "@/components/matriz-iperc/MatrizKpis";

export default function MatrizIpercContent() {
  return (
    <div
      className="flex flex-col gap-6 text-xs px-10"
      aria-label="Matriz IPERC 001"
    >
      <div className="flex items-center gap-3 w-4/12">
        <label htmlFor="m-sede" className="sr-only">
          Sede
        </label>
        <select
          id="m-sede"
          className="form-select h-8 w-48 rounded-lg bg-surface-light text-xs text-muted"
          defaultValue=""
        >
          <option value="" disabled>
            Sede
          </option>
          <option>Todas</option>
          <option>Condorcocha</option>
          <option>Atocongo</option>
        </select>
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
