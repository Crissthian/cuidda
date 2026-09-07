import { examenesLaboratorioMock } from "@/lib/admisionData";
import { FlaskConical, Loader2, Search, XCircle } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type OrigenExamen = "externo" | "interno";

export interface ExamenSeleccionado {
  codigo: number;
  numero_examen?: number;
  nombre: string;
  precio: number;
  origen?: "EXTERNA" | "INTERNA";
}

interface ExamenesListProps {
  enabled?: boolean;
  onSelectionChange?: (examenes: ExamenSeleccionado[]) => void;
  /** Exámenes pre-seleccionados al cargar una admisión existente */
  initialExamenes?: ExamenSeleccionado[];
  /** Modo solo lectura: no permite agregar ni quitar exámenes */
  readOnly?: boolean;
}

const currencyFormatter = new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "PEN",
  minimumFractionDigits: 2,
});

export default function ExamenesList({
  enabled = false,
  onSelectionChange,
  initialExamenes,
  readOnly = false,
}: ExamenesListProps) {
  const [examenes, setExamenes] = useState(examenesLaboratorioMock);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [codigoAtencion, setCodigoAtencion] = useState("");
  const [origen, setOrigen] = useState<OrigenExamen>("externo");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFetchMode, setLastFetchMode] = useState<OrigenExamen>("externo");
  const examenesRef = useRef(examenesLaboratorioMock);
  const initializedRef = useRef(false);

  const syncExamenes = useCallback((data: typeof examenesLaboratorioMock) => {
    setExamenes(data);
    examenesRef.current = data;
  }, []);

  // Cargar exámenes iniciales cuando se edita una admisión existente
  useEffect(() => {
    if (!enabled || !initialExamenes || initialExamenes.length === 0) return;
    if (initializedRef.current) return;
    if (examenesRef.current.length > 0) return;
    initializedRef.current = true;

    const primeraOrigen = initialExamenes[0]?.origen;
    const modoOrigen: OrigenExamen =
      primeraOrigen === "INTERNA" ? "interno" : "externo";
    setOrigen(modoOrigen);
    setLastFetchMode(modoOrigen);

    const comoDTO = initialExamenes.map((e) => ({
      id_examen: e.codigo,
      numero_examen: e.numero_examen ?? 0,
      examen: e.nombre,
      precio: e.precio,
    }));
    syncExamenes(comoDTO);
    setSelectedIds(initialExamenes.map((e) => e.codigo));
  }, [enabled, initialExamenes, syncExamenes]);

  // Resetear la bandera de inicialización cuando initialExamenes se vacía
  useEffect(() => {
    if (!initialExamenes || initialExamenes.length === 0) {
      initializedRef.current = false;
    }
  }, [initialExamenes]);

  // Al cambiar de origen, limpiar lista y selección
  useEffect(() => {
    if (!enabled) return;
    if (initializedRef.current && initialExamenes && initialExamenes.length > 0)
      return;
    setError(null);
    syncExamenes(examenesLaboratorioMock);
    setSelectedIds([]);
    setLastFetchMode(origen);
  }, [enabled, origen, syncExamenes]);

  // Notificar al padre cuando cambia la selección
  useEffect(() => {
    if (!onSelectionChange) return;

    const seleccionados: ExamenSeleccionado[] = selectedIds
      .map<ExamenSeleccionado | null>((id) => {
        const examen = examenesRef.current.find(
          (item) => item.id_examen === id,
        );
        if (!examen) return null;

        return {
          codigo: examen.id_examen,
          numero_examen: examen.numero_examen,
          nombre: examen.examen,
          precio: examen.precio ?? 0,
          origen: lastFetchMode === "interno" ? "INTERNA" : "EXTERNA",
        };
      })
      .filter((item): item is ExamenSeleccionado => item !== null);

    onSelectionChange(seleccionados);
  }, [selectedIds, lastFetchMode, onSelectionChange]);

  const fetchExamenesExternos = useCallback(
    (term: string = "") => {
      setIsLoading(true);
      setError(null);
      // Simulación de búsqueda sobre el catálogo mock
      window.setTimeout(() => {
        const data = examenesLaboratorioMock.filter((item) =>
          item.examen.toLowerCase().includes(term.toLowerCase()),
        );
        syncExamenes(data);
        setLastFetchMode("externo");
        const idsDisponibles = new Set(data.map((item) => item.id_examen));
        setSelectedIds((current) =>
          current.filter((id) => idsDisponibles.has(id)),
        );
        setIsLoading(false);
      }, 400);
    },
    [syncExamenes],
  );

  const fetchExamenesInternos = useCallback(
    (codigo: string) => {
      if (!codigo.trim()) {
        setError("Ingrese un codigo de atencion para buscar examenes internos");
        return;
      }
      setIsLoading(true);
      setError(null);
      // Simulación: devuelve los primeros exámenes del catálogo
      window.setTimeout(() => {
        const data = examenesLaboratorioMock.slice(0, 4);
        syncExamenes(data);
        setLastFetchMode("interno");
        const idsDisponibles = new Set(data.map((item) => item.id_examen));
        setSelectedIds((current) =>
          current.filter((id) => idsDisponibles.has(id)),
        );
        setIsLoading(false);
      }, 400);
    },
    [syncExamenes],
  );

  const toggleSelection = (idExamen: number) => {
    if (readOnly) return;
    setSelectedIds((current) =>
      current.includes(idExamen)
        ? current.filter((id) => id !== idExamen)
        : [...current, idExamen],
    );
  };

  const handleRefresh = () => {
    if (origen === "interno") {
      fetchExamenesInternos(codigoAtencion);
      return;
    }
    fetchExamenesExternos(searchTerm);
  };

  const emptyMessage = useMemo(() => {
    if (origen === "interno") {
      if (!codigoAtencion.trim())
        return "Ingrese un codigo de atencion para cargar examenes internos.";
      return "No se encontraron examenes de laboratorio para esa atencion.";
    }
    return "No hay examenes disponibles.";
  }, [codigoAtencion, origen]);

  const precioTotal = useMemo(() => {
    return selectedIds.reduce((sum, id) => {
      const examen = examenesRef.current.find((item) => item.id_examen === id);
      return sum + (examen?.precio ?? 0);
    }, 0);
  }, [selectedIds]);

  if (!enabled) {
    return null;
  }

  return (
    <div className="flex h-auto w-full flex-col rounded-md p-4 shadow-sm shadow-border-default">
      {/* Encabezado */}
      <div className="flex gap-4 flex-row items-center justify-between pb-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand ring-4 ring-brand/5">
            <FlaskConical className="size-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-text-primary">
              Examenes de Laboratorio
            </h2>
            <p className="text-sm text-text-secondary font-medium">
              {readOnly
                ? "Exámenes registrados"
                : "Seleccione los analisis requeridos"}
            </p>
          </div>
        </div>

        {/* Toggle Externo / Interno */}
        <div className="flex items-center gap-2 rounded-xl bg-surface-default p-1.5 border border-border-default shadow-sm">
          <span className="ml-2 mr-1 text-[10px] font-bold uppercase tracking-widest text-text-secondary">
            Origen:
          </span>
          <div className="flex items-center gap-1">
            <label
              className={`relative flex items-center ${readOnly ? "cursor-default" : "cursor-pointer"}`}
            >
              <input
                type="radio"
                name="tipo_examen"
                value="externo"
                className="peer sr-only"
                checked={origen === "externo"}
                onChange={() => setOrigen("externo")}
              />
              <div className="rounded-lg px-4 py-1.5 text-xs font-bold text-text-secondary transition-all peer-checked:bg-brand peer-checked:text-surface-default peer-checked:shadow-sm ring-1 ring-transparent peer-checked:ring-border-default/50">
                Externo
              </div>
            </label>
            <label
              className={`relative flex items-center ${readOnly ? "cursor-default" : "cursor-pointer"}`}
            >
              <input
                type="radio"
                name="tipo_examen"
                value="interno"
                className="peer sr-only"
                checked={origen === "interno"}
                onChange={() => setOrigen("interno")}
              />
              <div className="rounded-lg px-4 py-1.5 text-xs font-bold text-text-secondary transition-all peer-checked:bg-brand peer-checked:text-surface-default peer-checked:shadow-sm ring-1 ring-transparent peer-checked:ring-border-default/50">
                Interno
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Barra de búsqueda según origen */}
      {!readOnly &&
        (origen === "externo" ? (
          <div className="mb-4 flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Buscar por nombre de examen"
                className="w-full rounded-xl border border-border-default bg-surface-light py-2 pl-10 pr-4 text-sm text-text-primary outline-none transition focus:ring focus:ring-brand"
              />
            </div>
            <button
              type="button"
              onClick={() => fetchExamenesExternos(searchTerm)}
              className="inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2 text-sm font-medium text-surface-default transition hover:bg-brand/90"
            >
              Buscar
            </button>
          </div>
        ) : (
          <div className="mb-4 flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                value={codigoAtencion}
                onChange={(event) => setCodigoAtencion(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    fetchExamenesInternos(codigoAtencion);
                  }
                }}
                placeholder="Codigo de atencion"
                className="w-full rounded-xl border border-border-default bg-surface-light py-2 pl-10 pr-4 text-sm text-text-primary outline-none transition focus:ring focus:ring-brand"
              />
            </div>
            <button
              type="button"
              onClick={() => fetchExamenesInternos(codigoAtencion)}
              className="inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2 text-sm font-medium text-surface-default transition hover:bg-brand/90"
            >
              Obtener
            </button>
          </div>
        ))}

      {/* Tabla de exámenes */}
      <div className="min-h-0 flex-1 overflow-hidden rounded-2xl border border-border-default bg-surface-default">
        {/* Cabecera */}
        <div
          className="grid border-b border-border-default bg-surface-light text-xs font-semibold uppercase tracking-wider text-brand"
          style={{ gridTemplateColumns: "3.5rem 4.5rem 1fr 6rem" }}
        >
          <div className="divisor flex items-center justify-center py-3">
            Sel.
          </div>
          <div className="divisor flex items-center justify-center py-3">
            ID
          </div>
          <div className="divisor flex items-center px-4 py-3">Examen</div>
          <div className="flex items-center px-4 py-3">Precio</div>
        </div>

        {/* Cuerpo */}
        <div className="max-h-190 overflow-y-auto">
          {isLoading && (
            <div className="flex items-center justify-center min-h-120 p-6">
              <div className="flex flex-col items-center gap-3 text-sm text-text-secondary">
                <Loader2 className="size-6 animate-spin text-brand" />
                <span className="font-semibold text-text-primary">
                  Cargando examenes...
                </span>
              </div>
            </div>
          )}

          {!isLoading && error && (
            <div className="flex items-center justify-center min-h-120 p-6">
              <div className="flex flex-col items-center gap-4 text-center">
                <XCircle className="size-8 text-red-500" />
                <p className="text-sm text-red-600 max-w-md">{error}</p>
                <button
                  type="button"
                  onClick={handleRefresh}
                  className="mt-1 text-xs font-bold text-brand underline"
                >
                  Reintentar
                </button>
              </div>
            </div>
          )}

          {!isLoading && !error && examenes.length === 0 && (
            <div className="flex items-center justify-center p-6 text-xs text-text-secondary">
              {emptyMessage}
            </div>
          )}

          {!isLoading &&
            !error &&
            examenes.map((examen) => {
              const isSelected = selectedIds.includes(examen.id_examen);
              const isRowReadOnly = readOnly;

              return (
                <label
                  key={examen.id_examen}
                  className={`grid border-b border-dashed last:border-none border-border-default transition ${isRowReadOnly ? "cursor-default" : "cursor-pointer hover:bg-surface-light"} ${isSelected ? "text-brand" : "bg-surface-default"}`}
                  style={{ gridTemplateColumns: "3.5rem 4.5rem 1fr 6rem" }}
                >
                  <span className="flex justify-center py-2.5">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      disabled={readOnly}
                      onChange={() => toggleSelection(examen.id_examen)}
                      onClick={(event) => event.stopPropagation()}
                      className="checkbox size-5 rounded-md border-brand checked:bg-brand checked:text-surface-light bg-surface-light disabled:opacity-60"
                    />
                  </span>
                  <span className="text-center text-sm font-semibold py-2.5">
                    {examen.id_examen}
                  </span>
                  <span
                    className="truncate px-4 text-sm py-2.5"
                    title={examen.examen}
                  >
                    {examen.examen}
                  </span>
                  <span className="px-4 text-right text-sm font-semibold py-2.5">
                    {examen.precio == null
                      ? "—"
                      : currencyFormatter.format(examen.precio)}
                  </span>
                </label>
              );
            })}
        </div>
      </div>

      {/* Precio total */}
      {selectedIds.length > 0 && (
        <div className="mt-3 flex items-center justify-center gap-6 border-t border-dashed border-border-default pt-3">
          <span className="text-lg font-bold uppercase tracking-widest text-brand">
            Precio Total
          </span>
          <span className="text-lg font-extrabold tracking-tight text-brand">
            {currencyFormatter.format(precioTotal)}
          </span>
        </div>
      )}
    </div>
  );
}
