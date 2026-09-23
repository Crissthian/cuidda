import { SEDES } from "@/lib/sedes";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const labelClass = "mb-1.5 block text-[15px] text-text-primary";
const inputClass = "form-input rounded-lg! bg-surface-light! py-3! text-sm";

const CARTA_DOCX = "Carta de Presentacion 2026.doc";
const CARTA_PDF = "Carta de presentación.pdf";

async function descargarCarta(nombreArchivo: string) {
  const url = `/docs/${encodeURIComponent(nombreArchivo)}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`No se encontró ${nombreArchivo}`);
  const blob = await response.blob();
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = nombreArchivo;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(blobUrl);
}

export default function CartaPresentacionModal({ isOpen, onClose }: Props) {
  const [sede, setSede] = useState("");
  const [vencimiento, setVencimiento] = useState("");
  const [autoridad, setAutoridad] = useState("");
  const [cargo, setCargo] = useState("");
  const [entidad, setEntidad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [asunto, setAsunto] = useState("");
  const [descargando, setDescargando] = useState<"docx" | "pdf" | null>(null);

  if (!isOpen) return null;

  const resetForm = () => {
    setSede("");
    setVencimiento("");
    setAutoridad("");
    setCargo("");
    setEntidad("");
    setDireccion("");
    setAsunto("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleDescargarDocx = async () => {
    if (descargando) return;
    setDescargando("docx");
    try {
      await descargarCarta(CARTA_DOCX);
      toast.success(`"${CARTA_DOCX}" descargado.`);
    } catch {
      toast.error(
        `No se pudo descargar "${CARTA_DOCX}". Verifique que el archivo exista en /docs.`,
      );
    } finally {
      setDescargando(null);
    }
  };

  const handleGenerarPdf = async () => {
    if (descargando) return;
    setDescargando("pdf");
    try {
      await descargarCarta(CARTA_PDF);
      toast.success(`"${CARTA_PDF}" descargado.`);
    } catch {
      toast.error(
        `No se pudo descargar "${CARTA_PDF}". Verifique que el archivo exista en /docs.`,
      );
    } finally {
      setDescargando(null);
    }
  };

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-carta-presentacion-title"
      onClick={handleClose}
    >
      <div
        className="relative flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-surface-default shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-6 top-5 flex size-8 items-center justify-center rounded-full text-brand hover:bg-surface-light"
          aria-label="Cerrar modal"
        >
          <i
            className="fa-solid fa-right-from-bracket text-lg"
            aria-hidden="true"
          />
        </button>

        <div className="overflow-y-auto px-8 py-6 sm:px-10 sm:py-8">
          <h2
            id="modal-carta-presentacion-title"
            className="text-xl font-bold text-brand"
          >
            Carta de presentación
          </h2>
          <p className="mt-1 text-[15px] text-accent-muted">
            La autoridad destinataria y la dirección pueden variar según la
            jurisdicción.
          </p>

          <form
            className="mt-8 flex flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              handleGenerarPdf();
            }}
          >
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-3">
              <div>
                <label htmlFor="carta-sede" className={labelClass}>
                  Sede
                </label>
                <div className="form-select-container">
                  <select
                    id="carta-sede"
                    value={sede}
                    onChange={(e) => setSede(e.target.value)}
                    className={`form-select appearance-none rounded-lg! bg-surface-light! py-3! pr-10 text-sm ${sede ? "text-text-primary" : "text-muted"}`}
                  >
                    <option value="">Seleccionar</option>
                    {SEDES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <i
                    className="fa-solid fa-chevron-down form-select-icon text-sm"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="carta-vencimiento" className={labelClass}>
                  Próximo vencimiento
                </label>
                <input
                  id="carta-vencimiento"
                  type="date"
                  value={vencimiento}
                  onChange={(e) => setVencimiento(e.target.value)}
                  className={`${inputClass} [&::-webkit-calendar-picker-indicator]:cursor-pointer`}
                />
              </div>

              <div>
                <label htmlFor="carta-autoridad" className={labelClass}>
                  Autoridad destinataria
                </label>
                <input
                  id="carta-autoridad"
                  type="text"
                  value={autoridad}
                  onChange={(e) => setAutoridad(e.target.value)}
                  className={inputClass}
                  autoComplete="off"
                />
              </div>

              <div>
                <label htmlFor="carta-cargo" className={labelClass}>
                  Cargo
                </label>
                <input
                  id="carta-cargo"
                  type="text"
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                  className={inputClass}
                  autoComplete="off"
                />
              </div>

              <div>
                <label htmlFor="carta-entidad" className={labelClass}>
                  Entidad
                </label>
                <input
                  id="carta-entidad"
                  type="text"
                  value={entidad}
                  onChange={(e) => setEntidad(e.target.value)}
                  className={inputClass}
                  autoComplete="off"
                />
              </div>

              <div>
                <label htmlFor="carta-direccion" className={labelClass}>
                  Dirección
                </label>
                <input
                  id="carta-direccion"
                  type="text"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  className={inputClass}
                  autoComplete="off"
                />
              </div>
            </div>

            <div>
              <label htmlFor="carta-asunto" className={labelClass}>
                Asunto
              </label>
              <input
                id="carta-asunto"
                type="text"
                value={asunto}
                onChange={(e) => setAsunto(e.target.value)}
                className={inputClass}
                autoComplete="off"
              />
            </div>

            <div className="mt-4 flex flex-col justify-end gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleDescargarDocx}
                disabled={descargando !== null}
                className="flex items-center justify-center gap-2 rounded-lg bg-muted px-6 py-3 text-xs font-bold text-white transition hover:bg-muted-80 disabled:cursor-wait disabled:opacity-70"
              >
                <i
                  className={`text-sm ${descargando === "docx" ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-file-word"}`}
                  aria-hidden="true"
                />
                {descargando === "docx" ? "DESCARGANDO..." : "DESCARGAR DOCX"}
              </button>
              <button
                type="submit"
                disabled={descargando !== null}
                className="flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3 text-xs font-bold text-white transition hover:bg-primary-hover disabled:cursor-wait disabled:opacity-70"
              >
                <i
                  className={`text-sm ${descargando === "pdf" ? "fa-solid fa-spinner fa-spin" : "fa-solid fa-file-pdf"}`}
                  aria-hidden="true"
                />
                {descargando === "pdf" ? "DESCARGANDO..." : "GENERAR PDF"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
