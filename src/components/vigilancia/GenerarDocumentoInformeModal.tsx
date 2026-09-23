import CartaPresentacionModal from "@/components/vigilancia/CartaPresentacionModal";
import JSZip from "jszip";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

interface DocumentoItem {
  nombre: string;
  formato: string | null;
  icono: string;
  /** Nombre(s) de archivo en `public/docs`. Proviene del comentario original. */
  archivo: string | string[];
  modal?: "carta";
  /** Si es true, los archivos se comprimen en un ZIP. */
  zip?: boolean;
}

const documentos: DocumentoItem[] = [
  {
    nombre: "Excel oficial DIGESA / DIRESA",
    formato: "(xls)",
    icono: "fa-regular fa-file-excel",
    archivo: "Informe Tecnico DIGESA 2026.xls",
  },
  {
    nombre: "Carta de presentación",
    formato: "(doc / pdf)",
    icono: "fa-regular fa-file-word",
    archivo: ["Carta de Presentacion 2026.doc", "Carta de presentación.pdf"],
    modal: "carta",
  },
  {
    nombre: "Informe ejecutivo anual",
    formato: "(pdf)",
    icono: "fa-regular fa-file-pdf",
    archivo: "Informe ejecutivo anual.pdf",
  },
  {
    nombre: "Informe epidemiológico",
    formato: "(pdf)",
    icono: "fa-regular fa-file-pdf",
    archivo: "Informe epidemiológico.pdf",
  },
  {
    nombre: "Informe de aptitud medico ocupacional consolidado",
    formato: "(pdf)",
    icono: "fa-regular fa-file-pdf",
    archivo: "Informe de aptitud médico ocupacional consolidado.pdf",
  },
  {
    nombre: "Informe de enfermedades y hallazgos",
    formato: "(pdf)",
    icono: "fa-regular fa-file-pdf",
    archivo: "Informe de enfermedades y hallazgos.pdf",
  },
  {
    nombre: "Informe de programas de vigilancia",
    formato: "(pdf)",
    icono: "fa-regular fa-file-pdf",
    archivo: "Informe de programas de vigilancia.pdf",
  },
  {
    nombre: "Informe de población G1/G2/G3",
    formato: "(pdf)",
    icono: "fa-regular fa-file-pdf",
    archivo: "Informe de población G1_G2_G3.pdf",
  },
  {
    nombre: "Documento personalizado",
    formato: "(pdf)",
    icono: "fa-regular fa-file-pdf",
    archivo: "Documento personalizado.pdf",
  },
  {
    nombre: "Generar paquete de presentación",
    formato: "(zip)",
    icono: "fa-solid fa-box",
    archivo: [
      "Informe Tecnico DIGESA 2026.xls",
      "Carta de presentación.pdf",
      "Informe ejecutivo anual.pdf",
    ],
    zip: true,
  },
];

export default function GenerarDocumentoInformeModal({
  isOpen,
  onClose,
}: Props) {
  const [descargando, setDescargando] = useState<string | null>(null);
  const [showCarta, setShowCarta] = useState(false);

  if (!isOpen && !showCarta) return null;

  const descargarArchivo = async (nombreArchivo: string) => {
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
  };

  const descargarZip = async (doc: DocumentoItem, archivos: string[]) => {
    const zip = new JSZip();
    for (const archivo of archivos) {
      const url = `/docs/${encodeURIComponent(archivo)}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`No se encontró ${archivo}`);
      const blob = await response.blob();
      zip.file(archivo, blob);
    }
    const contenido = await zip.generateAsync({ type: "blob" });
    const blobUrl = URL.createObjectURL(contenido);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = "Paquete de presentación.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  };

  const handleDescargar = async (doc: DocumentoItem) => {
    if (descargando) return;
    // La carta se configura y descarga desde su propio modal.
    if (doc.modal === "carta") {
      setShowCarta(true);
      return;
    }
    setDescargando(doc.nombre);
    try {
      const archivos = Array.isArray(doc.archivo) ? doc.archivo : [doc.archivo];
      if (doc.zip) {
        await descargarZip(doc, archivos);
        toast.success(
          `Paquete "${doc.nombre}" descargado (${archivos.length} archivos en ZIP).`,
        );
        return;
      }
      for (const archivo of archivos) {
        await descargarArchivo(archivo);
        // Pausa para que el navegador procese descargas múltiples.
        await new Promise((resolve) => setTimeout(resolve, 400));
      }
      toast.success(
        archivos.length > 1
          ? `Paquete "${doc.nombre}" descargado (${archivos.length} archivos).`
          : `"${doc.nombre}" descargado.`,
      );
    } catch {
      toast.error(
        `No se pudo descargar "${doc.nombre}". Verifique que el archivo exista en /docs.`,
      );
    } finally {
      setDescargando(null);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-generar-documento-informe-title"
          onClick={onClose}
        >
          <div
            className="relative flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-surface-default shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-6 top-5 flex size-8 items-center justify-center rounded-full text-brand hover:bg-surface-light"
              aria-label="Cerrar modal"
            >
              <i
                className="fa-solid fa-right-from-bracket text-lg"
                aria-hidden="true"
              />
            </button>

            <div className="overflow-y-auto px-8 py-6">
              <h2
                id="modal-generar-documento-informe-title"
                className="text-lg font-bold text-brand"
              >
                Generar documento
              </h2>
              <p className="mt-1 text-sm text-accent-muted">
                Todos los documentos se generan desde la misma información
                consolidada.
              </p>

              <div
                className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
                role="list"
                aria-label="Documentos disponibles"
              >
                {documentos.map((doc) => {
                  const enCurso = descargando === doc.nombre;
                  return (
                    <button
                      key={doc.nombre}
                      type="button"
                      role="listitem"
                      aria-label={`Descargar ${doc.nombre}`}
                      title={
                        Array.isArray(doc.archivo)
                          ? doc.archivo.join(", ")
                          : doc.archivo
                      }
                      onClick={() => handleDescargar(doc)}
                      disabled={descargando !== null}
                      className="flex items-center gap-3 rounded-xl bg-surface-light px-4 py-3.5 text-left shadow-sm shadow-border-subtle/30 transition-colors hover:bg-muted-20 disabled:cursor-wait disabled:opacity-70"
                    >
                      <i
                        className={`shrink-0 text-lg text-muted ${enCurso ? "fa-solid fa-spinner fa-spin" : doc.icono}`}
                        aria-hidden="true"
                      />
                      <span className="text-sm leading-snug text-text-secondary">
                        {enCurso ? "Descargando..." : doc.nombre}{" "}
                        {doc.formato && (
                          <span className="text-brand">{doc.formato}</span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="mt-6 text-xs leading-relaxed text-risk-salmon">
                El paquete reúne el Excel oficial, la carta de presentación y el
                informe ejecutivo. No se realiza envío automático a la autoridad
                sanitaria.
              </p>
            </div>
          </div>
        </div>
      )}
      <CartaPresentacionModal
        isOpen={showCarta}
        onClose={() => setShowCarta(false)}
      />
    </>
  );
}
