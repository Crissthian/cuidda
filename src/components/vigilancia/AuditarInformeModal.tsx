type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const correctos = [
  "Población laboral: 0 M + 2 F = 2 frente a un total declarado de 2.",
  "Trabajadores evaluados: 0 M + 2 F = 2 frente a un total declarado de 2.",
  "Aptitud: 1 aptos + 1 con restricciones + 0 no aptos = 2 frente a 2 evaluados.",
  "Tipo de EMO: I 0 + P 2 + R 0 = 2 frente a 2 EMO del período.",
  "Los 2 trabajadores evaluados corresponden a 2 EMO cerrados en el período.",
  "Epidemiología: la suma por edad y sexo coinciden con el total de casos por categoría.",
  "Enfermedades profesionales: la suma de casos coincide con los totales declarados.",
];

export default function AuditarInformeModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-auditar-informe-title"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[95vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-surface-default shadow-xl"
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
            id="modal-auditar-informe-title"
            className="text-lg font-bold text-brand"
          >
            Auditoría del informe
          </h2>
          <p className="mt-1 text-sm text-accent-muted">
            Verificación automática de consistencia antes de la firma.
          </p>

          <ul
            className="mt-6 flex flex-col gap-2.5"
            aria-label="Resultados de la verificación"
          >
            {correctos.map((item) => (
              <li key={item.slice(0, 32)} className="flex items-start gap-2.5">
                <i
                  className="fa-regular fa-circle-check mt-0.5 shrink-0 text-base text-success"
                  aria-hidden="true"
                />
                <p className="text-sm leading-relaxed text-text-primary">
                  <span className="font-semibold text-success">Correcto</span>
                  {" - "}
                  {item}
                </p>
              </li>
            ))}
            <li className="flex items-start gap-2.5">
              <i
                className="fa-solid fa-triangle-exclamation mt-0.5 shrink-0 text-base text-risk-red"
                aria-hidden="true"
              />
              <p className="text-sm leading-relaxed text-text-primary">
                <span className="font-semibold text-risk-red">
                  Requiere revisión
                </span>
                {
                  " - 9 agente(s) de exposición sin población expuesta validada (Plomo, Arsénico, Cromo...). Registre el dato manualmente antes de la firma."
                }
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
