import {
  LECTURA_SELECCIONADA_KEY,
  lecturasResultados,
} from "@/lib/lecturaResultadosData";
import { YEARS } from "@/lib/periodos";
import { useMemo, useState } from "react";

interface Filtros {
  apellidos: string;
  dni: string;
  sede: string;
  grupo: string;
  periodo: string;
  modalidad: string;
  estado: string;
}

const FILTROS_VACIOS: Filtros = {
  apellidos: "",
  dni: "",
  sede: "",
  grupo: "",
  periodo: "",
  modalidad: "",
  estado: "",
};

/** Los selects usan etiquetas cortas; aquí se mapean al estado del registro. */
const ESTADO_POR_VALOR: Record<string, string> = {
  completada: "COMPLETADA",
  requiere: "PENDIENTE",
};

const grupoStyles: Record<string, { badge: string; dot: string }> = {
  G1: { badge: "bg-success/15 text-success-dark", dot: "bg-success" },
  G2: { badge: "bg-risk-salmon/15 text-risk-salmon", dot: "bg-risk-salmon" },
  G3: { badge: "bg-risk-red/10 text-risk-red", dot: "bg-risk-red" },
};

/** Sedes tomadas de la propia data para que los filtros siempre coincidan. */
const SEDES_DISPONIBLES = Array.from(
  new Set(lecturasResultados.map((l) => l.sede)),
);

const GRUPOS_DISPONIBLES = ["G1", "G2", "G3"];
const MODALIDADES_DISPONIBLES = ["Presencial", "Remota"];

export default function LecturaResultadosContent() {
  const [filtros, setFiltros] = useState<Filtros>(FILTROS_VACIOS);
  const [aplicados, setAplicados] = useState<Filtros>(FILTROS_VACIOS);

  // El detalle vive en una ruta estática, así que el trabajador seleccionado
  // viaja en sessionStorage antes de navegar.
  const seleccionar = (id: number) =>
    window.sessionStorage.setItem(LECTURA_SELECCIONADA_KEY, String(id));

  const actualizar = (campo: keyof Filtros, valor: string) =>
    setFiltros((prev) => ({ ...prev, [campo]: valor }));

  const filas = useMemo(() => {
    const apellidos = aplicados.apellidos.trim().toLowerCase();
    const dni = aplicados.dni.trim();
    const estado = ESTADO_POR_VALOR[aplicados.estado];

    return lecturasResultados.filter((l) => {
      if (apellidos && !l.nombre.toLowerCase().includes(apellidos))
        return false;
      if (dni && !l.dni.includes(dni)) return false;
      if (aplicados.sede && l.sede !== aplicados.sede) return false;
      if (aplicados.grupo && l.grupo !== aplicados.grupo) return false;
      if (aplicados.periodo && !l.fecha.startsWith(aplicados.periodo))
        return false;
      if (aplicados.modalidad && l.modalidad !== aplicados.modalidad)
        return false;
      if (estado && l.estado !== estado) return false;
      return true;
    });
  }, [aplicados]);

  return (
    <section
      aria-labelledby="lectura-title"
      className="rounded-xl bg-surface-default p-5 shadow-sm shadow-border-default"
    >
      <h2 id="lectura-title" className="sr-only">
        Lectura de resultados por trabajador
      </h2>

      {/* Filtros */}
      <form
        role="search"
        aria-label="Filtros de lectura de resultados"
        className="flex items-center gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          setAplicados({ ...filtros });
        }}
      >
        <label htmlFor="f-apellidos" className="sr-only">
          Apellidos
        </label>
        <input
          id="f-apellidos"
          type="text"
          placeholder="Apellidos"
          autoComplete="off"
          value={filtros.apellidos}
          onChange={(e) => actualizar("apellidos", e.target.value)}
          className="form-input h-9 min-w-0 flex-1 bg-surface-light px-3 text-xs text-text-primary placeholder:text-muted-50 focus:ring-1 focus:ring-brand"
        />

        <label htmlFor="f-dni" className="sr-only">
          DNI
        </label>
        <input
          id="f-dni"
          type="text"
          placeholder="DNI"
          autoComplete="off"
          inputMode="numeric"
          value={filtros.dni}
          onChange={(e) => actualizar("dni", e.target.value)}
          className="form-input h-9 min-w-0 flex-1 bg-surface-light px-3 text-xs text-text-primary placeholder:text-muted-50 focus:ring-1 focus:ring-brand"
        />

        <label htmlFor="f-sede" className="sr-only">
          Sede
        </label>
        <span className="relative min-w-0 flex-1">
          <select
            id="f-sede"
            aria-label="Sede"
            value={filtros.sede}
            onChange={(e) => actualizar("sede", e.target.value)}
            className="form-select h-9 w-full items-center appearance-none bg-surface-light pl-3 text-xs text-muted-50 outline-none focus:ring-1 focus:ring-brand"
          >
            <option value="">Sede</option>
            {SEDES_DISPONIBLES.map((sede) => (
              <option key={sede} value={sede}>
                {sede}
              </option>
            ))}
          </select>
        </span>

        <label htmlFor="f-grupo" className="sr-only">
          Grupo de riesgo
        </label>
        <span className="relative min-w-0 flex-1">
          <select
            id="f-grupo"
            aria-label="Grupo de riesgo"
            value={filtros.grupo}
            onChange={(e) => actualizar("grupo", e.target.value)}
            className="form-select h-9 w-full items-center appearance-none bg-surface-light pl-3 text-xs text-muted-50 outline-none focus:ring-1 focus:ring-brand"
          >
            <option value="">Grupo de riesgo</option>
            {GRUPOS_DISPONIBLES.map((grupo) => (
              <option key={grupo} value={grupo}>
                {grupo}
              </option>
            ))}
          </select>
        </span>

        <label htmlFor="f-periodo" className="sr-only">
          Periodo
        </label>
        <span className="relative min-w-0 flex-1">
          <select
            id="f-periodo"
            aria-label="Periodo"
            value={filtros.periodo}
            onChange={(e) => actualizar("periodo", e.target.value)}
            className="form-select h-9 w-full items-center appearance-none bg-surface-light pl-3 text-xs text-muted-50 outline-none focus:ring-1 focus:ring-brand"
          >
            <option value="">Periodo</option>
            {YEARS.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </span>

        <label htmlFor="f-modalidad" className="sr-only">
          Modalidad
        </label>
        <span className="relative min-w-0 flex-1">
          <select
            id="f-modalidad"
            aria-label="Modalidad"
            value={filtros.modalidad}
            onChange={(e) => actualizar("modalidad", e.target.value)}
            className="form-select h-9 w-full items-center appearance-none bg-surface-light pl-3 text-xs text-muted-50 outline-none focus:ring-1 focus:ring-brand"
          >
            <option value="">Modalidad</option>
            {MODALIDADES_DISPONIBLES.map((modalidad) => (
              <option key={modalidad} value={modalidad}>
                {modalidad}
              </option>
            ))}
          </select>
        </span>

        <label htmlFor="f-estado" className="sr-only">
          Estado
        </label>
        <span className="relative min-w-0 w-56">
          <select
            id="f-estado"
            aria-label="Estado"
            value={filtros.estado}
            onChange={(e) => actualizar("estado", e.target.value)}
            className="form-select h-9 w-full items-center appearance-none bg-surface-light pl-3 text-xs text-muted-50 outline-none focus:ring-1 focus:ring-brand"
          >
            <option value="">Estado</option>
            <option value="completada">Lectura completada</option>
            <option value="requiere">Requiere atención presencial</option>
          </select>
        </span>

        <button
          type="submit"
          className="inline-flex h-9 shrink-0 items-center justify-center rounded-lg bg-brand px-8 text-xs font-bold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          Buscar
        </button>
      </form>

      <p className="mt-3 text-xs text-muted" role="status">
        Mostrando {filas.length} de {lecturasResultados.length} registros
      </p>

      {/* Tabla */}
      <div className="mt-2 overflow-x-auto">
        <div
          className="min-w-300 text-xs"
          role="table"
          aria-label="Lectura de resultados por trabajador"
        >
          <div
            className="grid grid-cols-[1.4fr_0.8fr_1fr_0.9fr_0.5fr_0.7fr_1.3fr_1fr] gap-0 rounded-lg bg-surface-light px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-text-secondary"
            role="row"
          >
            <span role="columnheader">Trabajador</span>
            <span role="columnheader">Sede</span>
            <span role="columnheader">Puesto</span>
            <span role="columnheader">EMO</span>
            <span role="columnheader">Grupo</span>
            <span role="columnheader">Modalidad</span>
            <span role="columnheader" className="text-center">
              Estado
            </span>
            <span role="columnheader" className="text-center">
              Acción
            </span>
          </div>

          <div className="flex flex-col">
            {filas.length === 0 ? (
              <p className="border-b border-dashed border-border-default px-4 py-8 text-center text-xs text-muted">
                Ningún registro coincide con los filtros aplicados.
              </p>
            ) : (
              filas.map((row) => {
                const estadoClasses =
                  row.estado === "COMPLETADA"
                    ? "bg-[#dcfce7] text-[#16a34a]"
                    : "bg-risk-red/10 text-risk-red";
                const accion =
                  row.id === 5
                    ? "ENVIAR_VER"
                    : row.estado === "COMPLETADA"
                      ? "VER"
                      : "REGISTRAR";

                return (
                  <div
                    key={row.id}
                    role="row"
                    className="grid grid-cols-[1.4fr_0.8fr_1fr_0.9fr_0.5fr_0.7fr_1.3fr_1fr] items-center gap-0 border-b border-dashed border-border-default px-4 py-4 transition-colors last:border-b-0 hover:bg-surface-light/50"
                  >
                    <span role="cell" className="pr-2">
                      <span className="block text-xs font-semibold leading-tight text-text-primary">
                        {row.nombre}
                      </span>
                      <span className="mt-0.5 block text-xs leading-tight text-muted">
                        DNI: {row.dni}
                      </span>
                    </span>
                    <span
                      role="cell"
                      className="pr-2 text-xs text-text-secondary"
                    >
                      {row.sede}
                    </span>
                    <span
                      role="cell"
                      className="pr-2 text-xs leading-snug text-text-secondary"
                    >
                      {row.puesto}
                    </span>
                    <span role="cell" className="pr-2">
                      <span className="block text-xs font-semibold leading-tight text-text-primary">
                        {row.emo}
                      </span>
                      <span className="mt-0.5 block text-xs leading-tight text-muted">
                        {row.fecha}
                      </span>
                    </span>
                    <span role="cell" className="pr-2">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold leading-none ${grupoStyles[row.grupo]?.badge ?? "bg-muted-20 text-muted"}`}
                      >
                        <span
                          className={`size-2 rounded-full ${grupoStyles[row.grupo]?.dot ?? "bg-muted"}`}
                          aria-hidden="true"
                        />
                        {row.grupo}
                      </span>
                    </span>
                    <span
                      role="cell"
                      className="pr-2 text-xs text-text-secondary"
                    >
                      {row.modalidad}
                    </span>
                    <span role="cell" className="flex justify-center px-2">
                      <span
                        className={`inline-flex w-full max-w-55 items-center justify-center rounded-full px-3 py-1 text-center text-[10px] font-semibold leading-tight tracking-wide ${estadoClasses}`}
                      >
                        {row.estadoLabel}
                      </span>
                    </span>
                    <span
                      role="cell"
                      className="flex items-center justify-center gap-2"
                    >
                      {accion === "ENVIAR_VER" ? (
                        <>
                          <button
                            type="button"
                            data-modal-enviar={row.id}
                            data-nombre={row.nombre}
                            data-dni={row.dni}
                            data-emo={row.emo}
                            data-vencimiento={row.expiracion}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-[#22c55e] px-3 py-1.5 text-[11px] font-bold tracking-wide text-white transition-colors hover:brightness-95"
                            aria-label={`Enviar por WhatsApp a ${row.nombre}`}
                          >
                            <i
                              className="fa-brands fa-whatsapp text-xs"
                              aria-hidden="true"
                            />
                            ENVIAR
                          </button>
                          <a
                            href="/vigilancia-medica/lectura-de-resultados/unacem"
                            onClick={() => seleccionar(row.id)}
                            className="inline-flex min-w-16 items-center justify-center rounded-lg bg-muted px-4 py-1.5 text-[11px] font-bold tracking-wide text-white transition-colors hover:bg-muted-80"
                            aria-label={`Ver lectura de ${row.nombre}`}
                          >
                            VER
                          </a>
                        </>
                      ) : (
                        <a
                          href="/vigilancia-medica/lectura-de-resultados/unacem"
                          onClick={() => seleccionar(row.id)}
                          className="inline-flex min-w-24 items-center justify-center rounded-lg bg-muted px-4 py-1.5 text-[11px] font-bold tracking-wide text-white transition-colors hover:bg-muted-80"
                          aria-label={`${accion === "VER" ? "Ver lectura de" : "Registrar lectura de"} ${row.nombre}`}
                        >
                          {accion}
                        </a>
                      )}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
