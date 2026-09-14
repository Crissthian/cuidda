type Grupo = "G1" | "G2" | "G3";

type Trabajador = {
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

type CambioGrupo = {
  id: number;
  grupo: Grupo;
  realizadoPor: string;
  fechaHora: string;
  justificacion: string;
};

/** Datos de prueba: cada fila es el grupo resultante de un cambio real. */
const historialPorTrabajador: Record<string, CambioGrupo[]> = {
  "Luis Quispe Ramos": [
    {
      id: 1,
      grupo: "G3",
      realizadoPor: "Dr. M. Salcedo",
      fechaHora: "11/09/2026 01:15",
      justificacion: "Confirmación de hallazgo alarmante (desde G2)",
    },
    {
      id: 2,
      grupo: "G2",
      realizadoPor: "Sistema",
      fechaHora: "14/03/2016 00:00",
      justificacion: "Registro inicial",
    },
  ],
  "María Chávez Loayza": [
    {
      id: 1,
      grupo: "G2",
      realizadoPor: "Dra. L. Peña",
      fechaHora: "02/08/2026 10:40",
      justificacion:
        "Espirometría restrictiva leve en EMO periódico (desde G1)",
    },
    {
      id: 2,
      grupo: "G1",
      realizadoPor: "Sistema",
      fechaHora: "20/01/2026 09:00",
      justificacion: "Registro inicial",
    },
  ],
  "Ana Ruiz Mendoza": [
    {
      id: 1,
      grupo: "G1",
      realizadoPor: "Dr. M. Salcedo",
      fechaHora: "11/09/2026 01:15",
      justificacion: "Sin hallazgos en reevaluación (desde G2)",
    },
    {
      id: 2,
      grupo: "G2",
      realizadoPor: "Sistema",
      fechaHora: "14/03/2016 00:00",
      justificacion: "Registro inicial",
    },
  ],
  "Pedro Salas Ninahuanca": [
    {
      id: 1,
      grupo: "G2",
      realizadoPor: "Dr. J. Núñez",
      fechaHora: "28/07/2026 16:20",
      justificacion: "HTA controlada, se retira criterio de alarma (desde G3)",
    },
    {
      id: 2,
      grupo: "G3",
      realizadoPor: "Dr. M. Salcedo",
      fechaHora: "05/05/2026 11:05",
      justificacion: "Somnolencia diurna severa con riesgo vial (desde G2)",
    },
    {
      id: 3,
      grupo: "G2",
      realizadoPor: "Sistema",
      fechaHora: "10/02/2026 08:30",
      justificacion: "Registro inicial",
    },
  ],
  "Carlos Bravo Rios": [
    {
      id: 1,
      grupo: "G3",
      realizadoPor: "Dr. M. Salcedo",
      fechaHora: "19/08/2026 09:50",
      justificacion: "Progresión radiológica a neumoconiosis 1/1 (desde G2)",
    },
    {
      id: 2,
      grupo: "G2",
      realizadoPor: "Sistema",
      fechaHora: "03/03/2026 12:00",
      justificacion: "Registro inicial",
    },
  ],
  "Elena Paredes Vilchez": [
    {
      id: 1,
      grupo: "G1",
      realizadoPor: "Dra. L. Peña",
      fechaHora: "30/06/2026 14:10",
      justificacion: "Hallazgos no relevantes en control anual (desde G2)",
    },
    {
      id: 2,
      grupo: "G2",
      realizadoPor: "Sistema",
      fechaHora: "12/01/2026 10:15",
      justificacion: "Registro inicial",
    },
  ],
};

export default function HistorialCambiosModal({ trabajador, onClose }: Props) {
  if (!trabajador) return null;

  const historial = historialPorTrabajador[trabajador.nombre] ?? [];

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
