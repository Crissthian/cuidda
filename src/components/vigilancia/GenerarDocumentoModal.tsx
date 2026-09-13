import SuccessModal from "@/components/ui/SuccessModal";
import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type DocTabId = "programa" | "avance" | "final";

const docTabs: { id: DocTabId; label: string }[] = [
  { id: "programa", label: "Documento del Programa" },
  { id: "avance", label: "Informe de avance" },
  { id: "final", label: "Informes final" },
];

type DocumentoPreview = {
  titulo: string;
  empresa: string;
  sede: string;
  periodo: string;
  responsable: string;
  tipo: string;
  introduccion: string;
  exposicion: string;
  hallazgos: string[];
  poblacion: string;
};

const documentos: Record<DocTabId, DocumentoPreview> = {
  programa: {
    titulo: "PROGRAMA DE CONSERVACIÓN AUDITIVA",
    empresa: "UNACEM PERU S.A.",
    sede: "UM Concepción",
    periodo: "2026",
    responsable: "Dr. A. Manrique",
    tipo: "Programa Ocupacional · Enfoque: Audiología",
    introduccion:
      "El presente documento corresponde al programa “Conservación auditiva”, ejecutado en el marco del Sistema de Vigilancia Médica Ocupacional de Minera Andes Sur S.A.. La información utilizada proviene de los registros existentes en la plataforma: EMO, Línea Base, Vigilancia Médica.",
    exposicion:
      "Exposición principal identificada: Ruido ocupacional (GES perforación, planta concentradora).",
    hallazgos: [
      "17 hallazgos audiométricos en el EMO periódico",
      "5 casos requieren seguimiento especializado",
      "76 trabajadores con desplazamiento de umbral > 25 dB",
    ],
    poblacion: "Total: 218 trabajadores",
  },
  avance: {
    titulo: "INFORME DE AVANCE — CONSERVACIÓN AUDITIVA",
    empresa: "Minera Andes Sur S.A.",
    sede: "UM Concepción",
    periodo: "2026",
    responsable: "Dr. A. Manrique",
    tipo: "Programa Ocupacional · Enfoque: Audiología",
    introduccion:
      "El presente documento corresponde al programa “Conservación auditiva”, ejecutado en el marco del Sistema de Vigilancia Médica Ocupacional de Minera Andes Sur S.A.. La información utilizada proviene de los registros existentes en la plataforma: EMO, Línea Base, Vigilancia Médica.",
    exposicion:
      "Exposición principal identificada: Ruido ocupacional (GES perforación, planta concentradora).",
    hallazgos: [
      "17 hallazgos audiométricos en el EMO periódico",
      "5 casos requieren seguimiento especializado",
      "76 trabajadores con desplazamiento de umbral > 25 dB",
    ],
    poblacion: "Total: 218 trabajadores",
  },
  final: {
    titulo: "INFORME FINAL — CONSERVACIÓN AUDITIVA",
    empresa: "Minera Andes Sur S.A.",
    sede: "UM Concepción",
    periodo: "2026",
    responsable: "Dr. A. Manrique",
    tipo: "Programa Ocupacional · Enfoque: Audiología",
    introduccion:
      "El presente documento corresponde al programa “Conservación auditiva”, ejecutado en el marco del Sistema de Vigilancia Médica Ocupacional de Minera Andes Sur S.A.. La información utilizada proviene de los registros existentes en la plataforma: EMO, Línea Base, Vigilancia Médica.",
    exposicion:
      "Exposición principal identificada: Ruido ocupacional (GES perforación, planta concentradora).",
    hallazgos: [
      "17 hallazgos audiométricos en el EMO periódico",
      "5 casos requieren seguimiento especializado",
      "76 trabajadores con desplazamiento de umbral > 25 dB",
    ],
    poblacion: "Total: 218 trabajadores",
  },
};

export default function GenerarDocumentoModal({ isOpen, onClose }: Props) {
  const [tab, setTab] = useState<DocTabId>("programa");
  const [showSuccess, setShowSuccess] = useState(false);

  const doc = documentos[tab];

  const resetForm = () => {
    setTab("programa");
  };

  const handleClose = () => {
    resetForm();
    onClose();
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
          aria-labelledby="modal-generar-documento-title"
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
                id="modal-generar-documento-title"
                className="text-lg font-bold text-brand"
              >
                Generar documento con IA
              </h2>
              <p className="mt-1 text-sm text-accent-muted">
                Se utiliza únicamente la información registrada en la
                plataforma. Los datos no disponibles se marcan como pendientes.
              </p>

              <div
                className="mt-4 flex gap-2 rounded-lg bg-muted-20 p-2"
                role="tablist"
                aria-label="Tipos de documento"
              >
                {docTabs.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={tab === t.id}
                    onClick={() => setTab(t.id)}
                    className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${
                      tab === t.id
                        ? "bg-brand text-white-custom shadow-sm"
                        : "bg-surface-default text-brand hover:bg-surface-light"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <p className="mt-3 text-xs text-brand">
                Vista previa editable — la aprobación final corresponde al
                médico ocupacional
              </p>

              <div
                className="mt-2 rounded-lg bg-surface-light p-5 text-xs leading-relaxed text-text-secondary"
                role="tabpanel"
                aria-label={`Vista previa de ${docTabs.find((t) => t.id === tab)?.label}`}
              >
                <p className="font-medium uppercase">{doc.titulo}</p>

                <p className="mt-4 font-medium uppercase">1. Datos generales</p>
                <p>Empresa: {doc.empresa}</p>
                <p>Sede: {doc.sede}</p>
                <p>Periodo: {doc.periodo}</p>
                <p>Responsable: {doc.responsable}</p>
                <p>Tipo: {doc.tipo}</p>

                <p className="mt-4 font-medium uppercase">2. Introducción</p>
                <p>{doc.introduccion}</p>

                <p className="mt-4 font-medium uppercase">3. Justificación</p>
                <p>{doc.exposicion}</p>
                {doc.hallazgos.map((h) => (
                  <p key={h}>- {h}</p>
                ))}

                <p className="mt-4 font-medium uppercase">
                  4. Población objetivo
                </p>
                <p>{doc.poblacion}</p>
              </div>

              <div className="mt-5 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex items-center gap-2 rounded-lg bg-muted px-6 py-2.5 text-[11px] font-bold text-white transition hover:bg-muted-80"
                >
                  <i
                    className="fa-solid fa-trash text-[11px]"
                    aria-hidden="true"
                  />
                  CANCELAR
                </button>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-lg bg-muted px-6 py-2.5 text-[11px] font-bold text-white transition hover:bg-muted-80"
                >
                  <i
                    className="fa-solid fa-download text-[11px]"
                    aria-hidden="true"
                  />
                  DESCARGAR
                </button>
                <button
                  type="button"
                  onClick={() => setShowSuccess(true)}
                  className="flex items-center gap-2 rounded-lg bg-brand px-6 py-2.5 text-[11px] font-bold text-white transition hover:bg-primary-hover"
                >
                  <i
                    className="fa-solid fa-floppy-disk text-[11px]"
                    aria-hidden="true"
                  />
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
        title={"Documento generado\ncorrectamente"}
      />
    </>
  );
}
