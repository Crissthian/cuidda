import LecturaResultadoDetalleContent from "@/components/vigilancia/LecturaResultadoDetalleContent";
import LecturaResultadoModalHost from "@/components/vigilancia/LecturaResultadoModalHost";
import {
  LECTURA_SELECCIONADA_KEY,
  type LecturaResultado,
  lecturasResultados,
  obtenerLecturaPorId,
} from "@/lib/lecturaResultadosData";
import { useEffect, useState } from "react";

type Props = { lectura?: LecturaResultado };

/**
 * Cabecera + detalle del módulo. La URL es estática
 * (`/vigilancia-medica/lectura-de-resultados/unacem`), por lo que el trabajador
 * se resuelve al montar desde sessionStorage; sin selección previa se usa el
 * primer registro del dataset.
 */
export default function LecturaResultadoDetallePage({ lectura }: Props) {
  const [actual, setActual] = useState<LecturaResultado | null>(
    lectura ?? null,
  );

  // Se resuelve en un efecto (no en el inicializador de useState) porque el
  // island se pre-renderiza en SSR sin acceso a sessionStorage. Mientras no se
  // resuelva no se renderiza ficha alguna, para no mostrar por un instante los
  // datos de otro trabajador.
  useEffect(() => {
    if (lectura) return;
    const id = window.sessionStorage.getItem(LECTURA_SELECCIONADA_KEY);
    setActual(obtenerLecturaPorId(id) ?? lecturasResultados[0]);
  }, [lectura]);

  if (!actual) {
    return (
      <p className="px-10 pb-6 text-sm text-muted">
        Cargando lectura de resultados…
      </p>
    );
  }

  const esPendiente = actual.estado === "PENDIENTE";

  return (
    <>
      <section
        className="flex flex-1 flex-row justify-between px-10 pb-4"
        aria-labelledby="vigilancia-page-title"
      >
        <div>
          <h1
            id="vigilancia-page-title"
            className="text-lg font-bold uppercase tracking-wide text-brand"
          >
            {actual.nombre.toUpperCase()}
          </h1>
          <p className="mt-1 max-w-5xl text-sm leading-relaxed text-muted">
            {`Lectura de resultados • ${actual.emo} (${actual.fecha}) • ${actual.empresa}`}
          </p>
        </div>
        {esPendiente && (
          <div className="flex flex-row gap-2 no-print">
            <button
              type="button"
              data-modal-trigger="registrar-lectura"
              className="flex h-10 items-center gap-2 rounded-lg bg-muted-20 px-4 text-xs font-semibold text-muted shadow-sm hover:bg-muted-30"
            >
              <i
                className="fa-solid fa-user-doctor text-[11px]"
                aria-hidden="true"
              />
              REGISTRAR LECTURA PRESENCIAL
            </button>
          </div>
        )}
      </section>

      <LecturaResultadoDetalleContent lectura={actual} />

      {esPendiente && (
        <LecturaResultadoModalHost trabajadorNombre={actual.nombre} />
      )}
    </>
  );
}
