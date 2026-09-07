import { Toaster } from "sonner";

/**
 * Proveedor de toasts (sonner) para la aplicación.
 */
export default function SonnerProvider() {
  return (
    <Toaster
      position="top-center"
      richColors
      duration={2000}
      toastOptions={{
        className: "!w-max !max-w-none !left-1/2 !-translate-x-1/2",
      }}
    />
  );
}
