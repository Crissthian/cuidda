import { Toaster } from "sonner";

/**
 * Proveedor de toasts (sonner) para la aplicación.
 */
export default function SonnerProvider() {
  return <Toaster position="top-right" richColors closeButton />;
}
