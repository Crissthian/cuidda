import type { Grupo } from "@/lib/estratificacionData";
import { useEstratificacionStore } from "@/lib/estratificacionStore";

type Trabajador = {
  id: number;
  nombre: string;
  cargo: string;
  sede: string;
  grupo: Grupo;
};

type Props = {
  trabajador: Trabajador | null;
  onClose: () => void;
};

const badgeMap: Record<Grupo, string> = {
  G1: "bg-success/15 text-success-dark",
  G2: "bg-risk-salmon/15 text-risk-salmon",
  G3: "bg-risk-red/10 text-risk-red",
};

const dotMap: Record<Grupo, string> = {
  G1: "bg-success",
  G2: "bg-risk-salmon",
  G3: "bg-risk-red",
};

function GrupoBadge({ grupo }: { grupo: Grupo }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold leading-none ${badgeMap[grupo]}`}
    >
      <span
        className={`size-2 rounded-full ${dotMap[grupo]}`}
        aria-hidden="true"
      />
      {grupo}
    </span>
  );
}

export default function HistorialCambiosModal({ trabajador, onClose }: Props) {
  const historiales = useEstratificacionStore((state) => state.historiales);

  if (!trabajador) return null;

  const historial = historiales[trabajador.id] ?? [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-historial-title"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[95vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-surface-default shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-6 flex size-8 items-center justify-center rounded-full text-brand hover:bg-surface-light"
          aria-label="Cerrar modal"
        >
          <i
            className="fa-solid fa-right-from-bracket text-lg"
            aria-hidden="true"
          />
        </button>

        <div className="overflow-y-auto px-8 py-8">
          <h2
            id="modal-historial-title"
            className="text-xl font-bold text-brand"
          >
            Historial de cambios de grupo
          </h2>
          <p className="mt-1 text-sm text-accent-muted">
            {trabajador.nombre} • {trabajador.cargo} • {trabajador.sede}
          </p>

          <div className="mt-6 flex items-center gap-3">
            <span className="text-sm text-text-primary">Grupo actual:</span>
            <GrupoBadge grupo={trabajador.grupo} />
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-surface-light text-[11px] font-bold uppercase tracking-wider text-muted">
                  <th
                    scope="col"
                    className="whitespace-nowrap px-4 py-3 text-left font-bold rounded-l-lg w-28"
                  >
                    Grupo
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-4 py-3 text-left font-bold"
                  >
                    Realizado por
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-4 py-3 text-left font-bold"
                  >
                    Fecha y hora
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left font-bold rounded-r-lg"
                  >
                    Justificación
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dashed divide-border-default/60">
                {historial.map((h) => (
                  <tr key={h.id}>
                    <td className="px-4 py-4">
                      <GrupoBadge grupo={h.grupo} />
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-xs font-medium text-text-primary">
                      {h.realizadoPor}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-xs text-text-secondary">
                      {h.fechaHora}
                    </td>
                    <td className="px-4 py-4 text-xs font-medium text-text-primary">
                      {h.justificacion}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
