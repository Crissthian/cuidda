import type { HistorialAtencion } from "@/lib/triajeData";

interface HistorialAtencionesProps {
  historial: HistorialAtencion[];
  onEditar: (atencionId: string) => void;
}

const GRID_COLUMNS = "5% 15% 20% 25% 25% 10%";

/**
 * Tabla de historial de atenciones previas del paciente.
 */
export default function HistorialAtenciones({
  historial,
  onEditar,
}: HistorialAtencionesProps) {
  return (
    <section className="rounded-2xl shadow-md w-full font-sans text-text-primary p-4">
      <h2 className="text-xl font-semibold p-4">Historial de atenciones</h2>
      <div className="overflow-x-auto p-4">
        {/* Cabecera */}
        <div
          className="grid bg-muted-20 text-left uppercase text-sm"
          style={{ gridTemplateColumns: GRID_COLUMNS }}
        >
          <div className="py-4 px-3 font-normal divisor text-center">N°</div>
          <div className="py-4 px-3 font-normal divisor text-center">Fecha</div>
          <div className="py-4 px-3 font-normal divisor text-center">
            Código de atención
          </div>
          <div className="py-4 px-3 font-normal divisor text-center">
            Especialidad
          </div>
          <div className="py-4 px-3 font-normal divisor text-center">
            Responsable médico
          </div>
          <div className="py-4 px-3 font-normal text-center">Editar</div>
        </div>

        {/* Cuerpo */}
        {historial.length === 0 ? (
          <div className="py-4 text-center text-gray-500">
            No hay historial de atenciones
          </div>
        ) : (
          historial.map((atencion, i) => (
            <div
              key={atencion.id}
              className="grid border-t border-border-default text-sm"
              style={{ gridTemplateColumns: GRID_COLUMNS }}
            >
              <div className="py-2 text-center px-3 align-middle font-bold">
                {i + 1}.-
              </div>
              <div className="py-2 text-center px-3">
                {new Date(atencion.fecha).toLocaleDateString("es-PE")}
              </div>
              <div className="py-2 text-center px-3">{atencion.id}</div>
              <div className="py-2 text-center px-3">
                {atencion.especialidad}
              </div>
              <div className="py-2 text-center px-3">{atencion.medico}</div>
              <div className="py-2 text-center px-3">
                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    className="text-brand hover:text-primary-hover cursor-pointer"
                    onClick={() => onEditar(atencion.id)}
                  >
                    <i className="fa-solid fa-pen-to-square text-lg"></i>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
