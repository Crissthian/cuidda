type Props = { codigo: string; version: string };

export default function DocumentoProtocoloCard({ codigo, version }: Props) {
  const filename = `${codigo}_${version}.pdf`;
  return (
    <section
      className="flex flex-col rounded-xl bg-surface-default p-5 shadow-sm shadow-border-default"
      aria-labelledby="doc-title"
    >
      <h2
        id="doc-title"
        className="text-sm font-bold uppercase text-text-primary"
      >
        Documento del protocolo
      </h2>
      <p className="text-xs text-muted">
        Archivo fuente aprobado por Gestión Médica.
      </p>

      <div className="mt-4 rounded-lg bg-surface-light">
        <div className="relative flex flex-col items-center gap-4 rounded-md p-6">
          <div
            className="pointer-events-none absolute inset-0 rounded-md"
            aria-hidden="true"
            style={{
              backgroundImage: `
                linear-gradient(to right, color-mix(in srgb, var(--color-brand) 50%, transparent) 50%, transparent 50%),
                linear-gradient(to right, color-mix(in srgb, var(--color-brand) 50%, transparent) 50%, transparent 50%),
                linear-gradient(to bottom, color-mix(in srgb, var(--color-brand) 50%, transparent) 50%, transparent 50%),
                linear-gradient(to bottom, color-mix(in srgb, var(--color-brand) 50%, transparent) 50%, transparent 50%)`,
              backgroundSize: "12px 1px, 12px 1px, 1px 12px, 1px 12px",
              backgroundPosition: "top, bottom, left, right",
              backgroundRepeat: "repeat-x, repeat-x, repeat-y, repeat-y",
            }}
          />
          <div className="flex items-center gap-3">
            <i
              className="fa-regular fa-file-pdf text-2xl text-risk-salmon"
              aria-hidden="true"
            />
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-text-secondary">
                {filename}
              </span>
              <span className="text-[11px] text-muted">PDF · 412 KB</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-lg bg-muted-20 px-6 py-2 text-xs font-semibold text-muted hover:bg-muted-30"
        >
          <i className="fa-solid fa-eye text-[10px]" aria-hidden="true" /> Ver
          archivo
        </button>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-lg bg-muted-20 px-6 py-2 text-xs font-semibold text-muted hover:bg-muted-30"
        >
          <i className="fa-solid fa-download text-[10px]" aria-hidden="true" />{" "}
          Descargar
        </button>
      </div>
    </section>
  );
}
