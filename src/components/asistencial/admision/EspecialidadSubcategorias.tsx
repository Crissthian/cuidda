import { subcategoriasMock, type Subcategoria } from "@/lib/admisionData";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import type { AdmisionInput } from "./admision.types";
import { useAdmision } from "./AdmisionContext";

interface EspecialidadSubcategoriasProps {
  idCategoria: number;
  titulo: string;
  fieldName: "atencion.subcategoria_ecografia" | "atencion.subcategoria_esp011";
  readOnly?: boolean;
}

export default function EspecialidadSubcategorias({
  idCategoria,
  titulo,
  fieldName,
  readOnly = false,
}: EspecialidadSubcategoriasProps) {
  const { register, watch } = useFormContext<AdmisionInput>();
  const { setExamenEspecialidadSeleccionado } = useAdmision();
  const [subcategorias, setSubcategorias] = useState<Subcategoria[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const selectedSubcategoriaId = watch(fieldName);

  useEffect(() => {
    setIsLoading(true);
    // Simulación de carga de subcategorías por categoría
    window.setTimeout(() => {
      setSubcategorias(subcategoriasMock[idCategoria] ?? []);
      setIsLoading(false);
    }, 300);
  }, [idCategoria]);

  useEffect(() => {
    const selectedSubcategoria = subcategorias.find(
      (subcategoria) =>
        String(subcategoria.id_subcategoria) ===
        String(selectedSubcategoriaId || ""),
    );

    if (!selectedSubcategoria) {
      setExamenEspecialidadSeleccionado(null);
      return;
    }

    setExamenEspecialidadSeleccionado({
      id: String(selectedSubcategoria.id_subcategoria),
      nombre: selectedSubcategoria.nombre.trim(),
      precio: Number(selectedSubcategoria.precio ?? 0),
      especialidad:
        fieldName === "atencion.subcategoria_ecografia" ? "009" : "011",
    });
  }, [
    fieldName,
    selectedSubcategoriaId,
    setExamenEspecialidadSeleccionado,
    subcategorias,
  ]);

  return (
    <div className="flex flex-2 w-full flex-col min-h-0">
      <div className="rounded-md shadow bg-surface-default p-4 shadow-border-default">
        <h3 className="mb-3 text-base font-semibold text-brand">{titulo}</h3>
        {isLoading ? (
          <div className="h-10 animate-pulse rounded-xl bg-surface-light" />
        ) : (
          <select
            required
            disabled={readOnly}
            className={`w-full appearance-none rounded-lg border-none bg-surface-light py-2 px-4 uppercase ${readOnly ? "cursor-not-allowed opacity-70" : ""}`}
            {...register(fieldName)}
          >
            <option value="" disabled>
              SELECCIONE
            </option>
            {subcategorias.map((sub) => (
              <option
                key={sub.id_subcategoria}
                value={String(sub.id_subcategoria)}
              >
                {sub.nombre}{" "}
                {sub.precio != null
                  ? `- S/ ${Number(sub.precio).toFixed(2)}`
                  : ""}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}
