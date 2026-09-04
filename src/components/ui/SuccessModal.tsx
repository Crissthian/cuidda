type Props = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
};

export default function SuccessModal({
  isOpen,
  onClose,
  title = "Archivo cargado correctamente",
}: Props) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-title"
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-[420px] flex-col items-center gap-5 rounded-2xl bg-white px-10 py-12 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <span
          className="flex size-16 items-center justify-center rounded-full border-[3px] border-success"
          aria-hidden="true"
        >
          <i className="fa-solid fa-check text-2xl text-success" />
        </span>
        <h2
          id="success-title"
          className="text-center text-xl font-medium leading-tight text-brand"
        >
          {title.split("\n").map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h2>
      </div>
    </div>
  );
}
