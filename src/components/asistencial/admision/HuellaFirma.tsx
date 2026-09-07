import { useRef, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import type { AdmisionInput } from "./admision.types";

// Imagen placeholder simulada (SVG data URL) para huella/firma capturadas.
const PLACEHOLDER_HUELLA =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="120" viewBox="0 0 200 120"><rect width="200" height="120" fill="#ffffff"/><g fill="none" stroke="#0064d2" stroke-width="3" stroke-linecap="round"><path d="M60 30 C 40 50, 40 90, 70 100 C 100 110, 130 90, 120 60"/><path d="M80 20 C 60 60, 70 100, 100 105"/><path d="M100 15 C 90 55, 110 95, 130 90"/><path d="M120 25 C 110 60, 130 85, 150 70"/></g><text x="100" y="112" font-family="Arial" font-size="9" fill="#8993af" text-anchor="middle">HUELLA CAPTURADA (SIMULADA)</text></svg>`,
  );

const PLACEHOLDER_FIRMA =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="120" viewBox="0 0 200 120"><rect width="200" height="120" fill="#ffffff"/><g fill="none" stroke="#0064d2" stroke-width="2.5" stroke-linecap="round"><path d="M20 80 C 40 40, 60 90, 80 60 C 100 30, 110 90, 130 70 C 150 50, 160 80, 180 55"/><path d="M30 90 C 50 70, 70 95, 90 80"/><path d="M120 60 C 135 45, 150 65, 165 50"/></g><text x="100" y="112" font-family="Arial" font-size="9" fill="#8993af" text-anchor="middle">FIRMA CAPTURADA (SIMULADA)</text></svg>`,
  );

export default function HuellaFirma() {
  const { setValue } = useFormContext<AdmisionInput>();
  const formFirmaImage = useWatch({ name: "atencion.firma_imagen" });
  const formHuellaImage = useWatch({ name: "atencion.huella_imagen" });

  // Huella states (simulados)
  const huellaCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isCapturingHuella, setIsCapturingHuella] = useState(false);

  // Firma states (simulados)
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCapturingFirma, setIsCapturingFirma] = useState(false);
  const [isSavingFirma, setIsSavingFirma] = useState(false);

  const startHuellaCapture = () => {
    setIsCapturingHuella(true);
    setValue("atencion.huella_imagen", "");
    // Simular captura con un pequeño retraso
    window.setTimeout(() => {
      setValue("atencion.huella_imagen", PLACEHOLDER_HUELLA);
      setIsCapturingHuella(false);
    }, 1200);
  };

  const cancelHuella = () => {
    if (isCapturingHuella) {
      setIsCapturingHuella(false);
    }
    setValue("atencion.huella_imagen", "");
    const canvas = huellaCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const startCapture = () => {
    setIsCapturingFirma(true);
    setValue("atencion.firma_imagen", "");
  };

  const clearFirma = () => {
    setValue("atencion.firma_imagen", "");
    setIsCapturingFirma(false);
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx && canvasRef.current) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const saveFirma = () => {
    if (isSavingFirma) return;
    if (!isCapturingFirma) {
      alert("No hay firma para guardar o inicie la captura.");
      return;
    }
    setIsSavingFirma(true);
    // Simular procesamiento de firma
    window.setTimeout(() => {
      setValue("atencion.firma_imagen", PLACEHOLDER_FIRMA);
      setIsCapturingFirma(false);
      setIsSavingFirma(false);
    }, 800);
  };

  return (
    <div className="flex flex-row gap-6 mt-6 max-w-6/12">
      <div className="flex-1">
        <div
          onClick={
            !isCapturingHuella && !formHuellaImage
              ? startHuellaCapture
              : undefined
          }
          className={`relative flex flex-col items-center justify-center h-48 rounded-lg border-2 border-dashed border-brand bg-surface-default overflow-hidden transition-colors ${!isCapturingHuella && !formHuellaImage ? "cursor-pointer hover:bg-surface-light" : ""}`}
        >
          {/* Canvas oculto para iterar array de bytes de huella */}
          <canvas ref={huellaCanvasRef} className="hidden" />

          {/* Huella capturada */}
          {formHuellaImage && (
            <img
              src={formHuellaImage}
              className="absolute inset-0 w-full h-full object-contain p-2 bg-white"
              alt="Huella capturada"
            />
          )}

          {/* Animación "Esperando huella" */}
          {isCapturingHuella && !formHuellaImage && (
            <div className="flex flex-col items-center gap-2">
              <svg
                className="animate-spin h-8 w-8 text-brand"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              <span className="text-md font-bold text-brand">
                Esperando huella...
              </span>
            </div>
          )}

          {/* Placeholder por defecto */}
          {!isCapturingHuella && !formHuellaImage && (
            <>
              <i className="fa-solid fa-fingerprint mb-2 text-4xl text-brand"></i>
              <span className="text-lg font-bold text-text-secondary">
                Capturar huella
              </span>
              <span className="text-sm text-text-secondary p-2">
                Presione para capturar
              </span>
            </>
          )}
        </div>

        <div className="flex gap-2 mt-3">
          {isCapturingHuella ? (
            <button
              type="button"
              onClick={cancelHuella}
              className="w-full py-2 rounded-lg bg-red-100 text-red-600 font-bold hover:bg-red-200 transition-colors"
            >
              Cancelar Captura
            </button>
          ) : formHuellaImage ? (
            <>
              <button
                type="button"
                onClick={startHuellaCapture}
                className="flex-1 py-2 rounded-lg bg-brand/10 text-brand font-bold hover:bg-brand/20 transition-colors"
              >
                <i className="fa-solid fa-pencil mr-1" />
                Editar
              </button>
              <button
                type="button"
                onClick={cancelHuella}
                className="flex-1 py-2 rounded-lg bg-card-bg text-text-secondary font-bold hover:bg-gray-300 transition-colors"
              >
                Eliminar
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={cancelHuella}
              disabled={!formHuellaImage}
              className="w-full py-2 rounded-lg bg-card-bg font-bold text-gray-400 cursor-not-allowed opacity-60"
            >
              Eliminar
            </button>
          )}
        </div>
      </div>
      <div className="flex-2">
        <div
          onClick={
            !isCapturingFirma && !formFirmaImage ? startCapture : undefined
          }
          className={`relative flex flex-col items-center justify-center h-48 rounded-lg border-2 border-dashed border-brand bg-surface-default overflow-hidden transition-colors ${!isCapturingFirma && !formFirmaImage ? "cursor-pointer hover:bg-surface-light" : ""}`}
        >
          {/* Canvas para dibujar (se muestra solo cuando se está capturando) */}
          <canvas
            ref={canvasRef}
            width={500}
            height={200}
            className={`absolute inset-0 w-full h-full object-contain ${isCapturingFirma && !formFirmaImage ? "block bg-white" : "hidden"}`}
          />

          {/* Loader al procesar firma */}
          {isSavingFirma && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-10 gap-2">
              <svg
                className="animate-spin h-8 w-8 text-brand"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              <span className="text-sm font-bold text-brand">
                Procesando firma...
              </span>
            </div>
          )}

          {/* Firma capturada */}
          {formFirmaImage && !isCapturingFirma && (
            <img
              src={formFirmaImage}
              className="absolute inset-0 w-full h-full object-contain p-2 bg-white"
              alt="Firma capturada"
            />
          )}

          {/* Placeholder por defecto */}
          {!isCapturingFirma && !formFirmaImage && (
            <>
              <i className="fa-solid fa-signature mb-2 text-4xl text-brand"></i>
              <span className="text-lg font-bold text-text-secondary">
                Capturar firma
              </span>
              <span className="text-sm text-text-secondary p-2">
                Presione para firmar
              </span>
            </>
          )}
        </div>

        <div className="flex gap-2 mt-3">
          {isCapturingFirma ? (
            <>
              <button
                type="button"
                onClick={saveFirma}
                disabled={isSavingFirma}
                className={`flex-1 py-2 rounded-lg font-bold transition-colors ${isSavingFirma ? "bg-brand/50 text-white cursor-not-allowed" : "bg-brand text-white hover:bg-brand-dark"}`}
              >
                {isSavingFirma ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Guardando...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <i className="fa-solid fa-floppy-disk" />
                    Guardar
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={clearFirma}
                className="flex-1 py-2 rounded-lg bg-card-bg text-text-secondary font-bold hover:bg-gray-300 transition-colors"
              >
                Limpiar
              </button>
            </>
          ) : formFirmaImage ? (
            <>
              <button
                type="button"
                onClick={startCapture}
                className="flex-1 py-2 rounded-lg bg-brand/10 text-brand font-bold hover:bg-brand/20 transition-colors"
              >
                <i className="fa-solid fa-pencil mr-1" />
                Editar
              </button>
              <button
                type="button"
                onClick={clearFirma}
                className="flex-1 py-2 rounded-lg bg-card-bg text-text-secondary font-bold hover:bg-gray-300 transition-colors"
              >
                Eliminar
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={clearFirma}
              disabled={!formFirmaImage}
              className="w-full py-2 rounded-lg bg-card-bg font-bold text-gray-400 cursor-not-allowed opacity-60"
            >
              Eliminar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
