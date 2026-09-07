import Skeleton from "@/components/ui/Skeleton";
import { pacientesMock, type PacienteRow } from "@/lib/pacientesData";
import { useState } from "react";

/**
 * Registro de pacientes: búsqueda por apellido y/o N° Historia Clínica con tabla de resultados.
 */
export default function RegistroPacientes() {
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [data, setData] = useState<PacienteRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const handleBuscar = () => {
    if (!apellido.trim() && !dni.trim()) return;

    setLoading(true);
    setError(null);

    window.setTimeout(() => {
      const filtered = pacientesMock.filter((row) => {
        const matchApellido =
          !apellido.trim() ||
          row.APELLIDO_NOMBRES.toLowerCase().includes(
            apellido.trim().toLowerCase(),
          );
        const matchDni =
          !dni.trim() ||
          row.NUMERO_HISTORIA_PERSONA.toLowerCase().includes(
            dni.trim().toLowerCase(),
          );
        return matchApellido && matchDni;
      });

      if (filtered.length === 0) {
        setError("No se encontraron pacientes.");
        setData([]);
      } else {
        setData(filtered);
        setError(null);
      }
      setLoading(false);
      setSearched(true);
    }, 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleBuscar();
  };

  return (
    <div className="space-y-6">
      {/* Título */}
      <h2 className="text-lg font-semibold text-text-primary">
        Registro de pacientes
      </h2>

      {/* Barra de búsqueda */}
      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="APELLIDOS"
          className="form-input max-w-xs"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <input
          type="text"
          placeholder="DNI"
          className="form-input max-w-xs"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          className="ml-auto px-8 py-2 rounded-lg bg-brand text-white font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
          onClick={handleBuscar}
          disabled={loading || (!apellido.trim() && !dni.trim())}
        >
          BUSCAR
        </button>
      </div>

      {/* Grid de resultados */}
      <div className="rounded-md bg-surface-default overflow-hidden mx-48 mt-8 shadow-md shadow-brand/20 border border-surface-light">
        <div className="p-12">
          {/* Cabecera del Grid */}
          <div
            className="grid bg-surface-light text-brand text-xs font-bold uppercase items-center tracking-wider"
            style={{ gridTemplateColumns: "1.5fr 1fr 180px" }}
          >
            <div className="flex items-center gap-2 ps-4 divisor p-4">
              <i className="fas fa-user text-brand" />
              APELLIDOS Y NOMBRES
            </div>
            <div className="flex items-center justify-center gap-2 divisor p-4">
              <i className="fas fa-file-medical text-brand" />
              N° HISTORIA CLÍNICA
            </div>
            <div className="flex items-center justify-center gap-2 p-4">
              <i className="fas fa-info-circle text-brand" />
              DETALLE
            </div>
          </div>

          {/* Cuerpo del Grid */}
          <div className="divide-y divide-surface-light divide-dashed min-h-50">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="grid items-center px-4 py-4"
                  style={{ gridTemplateColumns: "1.5fr 1fr 180px" }}
                >
                  <div className="px-4">
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                  <div className="flex justify-center">
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                  <div className="flex justify-center">
                    <Skeleton className="h-8 w-28 rounded-xl" />
                  </div>
                </div>
              ))
            ) : error ? (
              <div className="px-8 py-10 text-center text-sm text-warning flex flex-col items-center gap-2">
                <i className="fas fa-exclamation-circle text-2xl" />
                {error}
              </div>
            ) : data.length === 0 ? (
              <div className="px-8 py-10 text-center text-sm text-text-primary/60 flex flex-col items-center gap-2">
                <i className="fas fa-search text-2xl opacity-20" />
                {searched
                  ? "No se encontraron pacientes con los criterios indicados."
                  : "Ingrese apellido o N° de historia clínica y presione BUSCAR."}
              </div>
            ) : (
              data.map((row) => (
                <div
                  key={row.CDG_PER}
                  className="grid items-center py-2 hover:bg-surface-light transition-colors group border-b border-dashed border-brand"
                  style={{ gridTemplateColumns: "1.5fr 1fr 180px" }}
                >
                  <div className="ps-4 text-sm font-medium text-text-primary uppercase truncate">
                    {row.APELLIDO_NOMBRES}
                  </div>
                  <div className="text-center text-sm text-text-primary font-mono">
                    {row.NUMERO_HISTORIA_PERSONA}
                  </div>
                  <div className="flex justify-center">
                    <a
                      href={`/asistencial/pacientes/historia-clinica?historia=${row.NUMERO_HISTORIA_PERSONA}`}
                      className={`rounded-lg  p-1.5 font-semibold transition-opacity cursor-pointer hover:opacity-90 w-28 text-sm text-center bg-brand text-success hover:bg-brand/90`}
                    >
                      VER
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}