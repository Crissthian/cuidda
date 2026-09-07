import type { AtencionItem } from "@/lib/pacientesData";

interface ListaAtencionesHistorialProps {
  atenciones: AtencionItem[];
  datosPaciente?: {
    apellidosNombres: string;
    dni: string;
    fechaNacimiento: string;
    edad: string;
    sexo: string;
  };
}

const GRID_COLUMNS = "1.2fr 1.2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr";

/**
 * Historial de atenciones del paciente con accesos a cada área (solo UI).
 */
export default function ListaAtencionesHistorial({
  atenciones,
}: ListaAtencionesHistorialProps) {
  return (
    <div className="px-4">
      {/* Header */}
      <div
        className="grid bg-surface-light text-text-secondary text-xs font-semibold uppercase tracking-wider border-b border-surface-light"
        style={{ gridTemplateColumns: GRID_COLUMNS }}
      >
        <div className="px-6 py-3 divisor">FECHA DE ATENCIÓN</div>
        <div className="px-4 py-3 text-center divisor">N° DE ATENCIÓN</div>
        <div className="px-2 py-3 text-center divisor text-brand font-bold">
          TRIAJE
        </div>
        <div className="px-2 py-3 text-center divisor text-brand font-bold">
          MEDICINA
        </div>
        <div className="px-2 py-3 text-center divisor text-brand font-bold">
          RECETA
        </div>
        <div className="px-2 py-3 text-center divisor text-brand font-bold">
          LAB.
        </div>
        <div className="px-2 py-3 text-center divisor text-brand font-bold">
          RX
        </div>
        <div className="px-2 py-3 text-center divisor text-brand font-bold">
          ODONTO.
        </div>
        <div className="px-2 py-3 text-center text-brand font-bold">OTROS</div>
      </div>

      {/* Filas */}
      <div className="divide-y divide-dashed divide-brand/20">
        {atenciones.map((a, i) => (
          <div
            key={`${a.cdgAtencion}-${i}`}
            className="grid items-center hover:bg-surface-light/60 transition-colors"
            style={{ gridTemplateColumns: GRID_COLUMNS }}
          >
            <div className="px-6 py-3 text-center text-sm text-text-primary font-medium">
              {a.fecha}
            </div>
            <div className="px-4 py-3 text-center text-sm text-text-primary">
              {a.numero}
            </div>

            {/* Triaje */}
            <div className="py-4 flex justify-center">
              {a.triaje ? (
                <button
                  type="button"
                  className="hover:scale-110 transition-transform focus:outline-none"
                  title="Ver detalles de Triaje"
                >
                  <i className="fas fa-stethoscope text-brand text-2xl" />
                </button>
              ) : (
                <i className="fas fa-stethoscope text-muted/30 text-2xl" />
              )}
            </div>

            {/* Medicina */}
            <div className="py-4 flex justify-center">
              {a.medicina ? (
                <button
                  type="button"
                  className="hover:scale-110 transition-transform focus:outline-none"
                  title="Ver detalles de Medicina"
                >
                  <i className="fas fa-user-md text-brand text-2xl" />
                </button>
              ) : (
                <i className="fas fa-user-md text-muted/30 text-2xl" />
              )}
            </div>

            {/* Receta */}
            <div className="py-4 flex justify-center">
              {a.receta ? (
                <button
                  type="button"
                  className="hover:scale-110 transition-transform focus:outline-none"
                  title="Ver receta médica"
                >
                  <i className="fas fa-file-medical text-brand text-2xl" />
                </button>
              ) : (
                <i className="fas fa-file-medical text-muted/30 text-2xl" />
              )}
            </div>

            {/* Laboratorio */}
            <div className="py-4 flex justify-center">
              {a.lab ? (
                <button
                  type="button"
                  className="hover:scale-110 transition-transform focus:outline-none"
                  title="Ver detalles de Laboratorio"
                >
                  <i className="fas fa-flask-vial text-brand text-2xl" />
                </button>
              ) : (
                <i className="fas fa-flask-vial text-muted/30 text-2xl" />
              )}
            </div>

            {/* RX */}
            <div className="py-4 flex justify-center">
              {a.rx ? (
                <button
                  type="button"
                  className="hover:scale-110 transition-transform focus:outline-none"
                  title="Ver detalles de Rayos X"
                >
                  <i className="fas fa-x-ray text-brand text-2xl" />
                </button>
              ) : (
                <i className="fas fa-x-ray text-muted/30 text-2xl" />
              )}
            </div>

            {/* Odontología */}
            <div className="py-4 flex justify-center">
              {a.odonto ? (
                <button
                  type="button"
                  className="hover:scale-110 transition-transform focus:outline-none"
                  title="Ver detalles de Odontología"
                >
                  <i className="fas fa-tooth text-brand text-2xl" />
                </button>
              ) : (
                <i className="fas fa-tooth text-muted/30 text-2xl" />
              )}
            </div>

            {/* Otros */}
            <div className="py-4 flex justify-center">
              {a.otros ? (
                <a
                  href="/examenes-auxiliares/otros-examenes"
                  className="hover:scale-110 transition-transform focus:outline-none"
                  title="Ir a Otros Exámenes"
                >
                  <i className="fas fa-file-circle-plus text-brand text-2xl" />
                </a>
              ) : (
                <i className="fas fa-file-circle-plus text-muted/30 text-2xl" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}