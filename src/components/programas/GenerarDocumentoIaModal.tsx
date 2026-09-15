import SuccessModal from "@/components/ui/SuccessModal";
import {
  documentoIaContenido,
  tiposDocumentoIa,
  type TipoDocumentoIaId,
} from "@/lib/documentoIaData";
import { useDocumentoIaStore } from "@/lib/documentoIaStore";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const NOMBRE_TIPO: Record<TipoDocumentoIaId, string> = {
  programa: "Programa",
  avance: "Avance",
  final: "Final",
};

export default function GenerarDocumentoIaModal({ isOpen, onClose }: Props) {
  const documentos = useDocumentoIaStore((state) => state.documentos);
  const guardarDocumento = useDocumentoIaStore(
    (state) => state.guardarDocumento,
  );

  const [tipo, setTipo] = useState<TipoDocumentoIaId>("programa");
  const [contenido, setContenido] = useState(documentos.programa);
  const [showSuccess, setShowSuccess] = useState(false);

  // Al abrir, se recupera el texto guardado en memoria de cada tipo de documento.
  useEffect(() => {
    if (!isOpen) return;
    const guardados = useDocumentoIaStore.getState().documentos;
    setTipo("programa");
    setContenido(guardados.programa);
  }, [isOpen]);

  const seleccionarTipo = (id: TipoDocumentoIaId) => {
    setTipo(id);
    setContenido(documentos[id]);
  };

  const resetForm = () => {
    setTipo("programa");
    setContenido(useDocumentoIaStore.getState().documentos.programa);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleGuardar = () => {
    if (!contenido.trim()) {
      toast.error("No hay contenido para guardar.");
      return;
    }
    guardarDocumento(tipo, contenido);
    setShowSuccess(true);
  };

  /**
   * Descarga el documento en formato de texto plano (.txt) usando el
   * contenido editable de la vista previa.
   */
  const handleDescargar = () => {
    const cuerpo = contenido.trim();
    if (!cuerpo) {
      toast.error("No hay contenido para descargar.");
      return;
    }

    const documento = `${documentoIaContenido[tipo].titulo}\n\n${cuerpo}\n`;
    // El BOM permite que Windows detecte UTF-8 y muestre bien las tildes.
    const blob = new Blob(["\uFEFF", documento], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Documento_IA_${NOMBRE_TIPO[tipo]}_${
      new Date().toISOString().split("T")[0]
    }.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Documento descargado.");
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    resetForm();
    onClose();
  };

  if (!isOpen && !showSuccess) return null;

  return (
    <>
      {isOpen && !showSuccess && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-generar-documento-ia-title"
          onClick={handleClose}
        >
          <div
            className="relative flex max-h-[95vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-surface-default shadow-xl"
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

            <div className="overflow-y-auto px-8 py-6">
              <h2
                id="modal-generar-documento-ia-title"
                className="text-lg font-bold text-brand"
              >
                Generar documento con IA
              </h2>
              <p className="mt-1 text-xs text-accent-muted">
                Se utiliza únicamente la información registrada en la
                plataforma.
                <br />
                Los datos no disponibles se marcan como pendientes.
              </p>

              {/* Tabs de tipo de documento */}
              <div
                className="mt-5 flex items-center gap-2 rounded-xl bg-surface-light p-1.5"
                role="tablist"
                aria-label="Tipo de documento"
              >
                {tiposDocumentoIa.map((item) => {
                  const activo = tipo === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={activo}
                      onClick={() => seleccionarTipo(item.id)}
                      className={`flex-1 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                        activo
                          ? "bg-brand text-white shadow-sm"
                          : "bg-surface-default text-brand hover:bg-surface-default/70"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>

              <p className="mt-4 text-xs text-brand">
                Vista previa editable — la aprobación final corresponde al
                médico ocupacional
              </p>

              {/* Vista previa editable */}
              <div className="mt-2 rounded-xl bg-surface-light p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-text-secondary">
                  {documentoIaContenido[tipo].titulo}
                </p>
                <label htmlFor="doc-ia-contenido" className="sr-only">
                  Contenido editable del documento
                </label>
                <textarea
                  id="doc-ia-contenido"
                  value={contenido}
                  onChange={(e) => setContenido(e.target.value)}
                  rows={20}
                  className="mt-3 w-full resize-y bg-transparent text-xs leading-relaxed text-text-secondary outline-none!"
                />
              </div>

              {/* Acciones */}
              <div className="mt-5 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex items-center gap-2 rounded-lg bg-muted px-6 py-2.5 text-xs font-bold text-white hover:bg-muted-80"
                >
                  <i className="fa-solid fa-trash text-xs" aria-hidden="true" />
                  CANCELAR
                </button>
                <button
                  type="button"
                  onClick={handleDescargar}
                  className="flex items-center gap-2 rounded-lg bg-muted px-6 py-2.5 text-xs font-bold text-white hover:bg-muted-80"
                >
                  <i
                    className="fa-solid fa-download text-xs"
                    aria-hidden="true"
                  />
                  DESCARGAR
                </button>
                <button
                  type="button"
                  onClick={handleGuardar}
                  className="flex items-center gap-2 rounded-lg bg-brand px-6 py-2.5 text-xs font-bold text-white hover:bg-primary-hover"
                >
                  <i className="fa-solid fa-save text-xs" aria-hidden="true" />
                  GUARDAR
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <SuccessModal
        isOpen={showSuccess}
        onClose={handleCloseSuccess}
        title={"Documento guardado\ncorrectamente"}
      />
    </>
  );
}
