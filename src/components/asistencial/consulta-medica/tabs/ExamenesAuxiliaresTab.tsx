import React, { useMemo, useState, lazy, Suspense } from "react";
import {
  categoriasExamenesMock,
  type CategoriaExamen,
} from "@/lib/consultaMedicaData";

const PDFExamenesAuxiliares = lazy(() => import("./PDFExamenesAuxiliares"));

interface ExamenesAuxiliaresTabProps {
  estado?: string;
  codigoAtencion?: string;
  selectedExamenes?: number[];
  onSelectionChange?: (examenes: number[]) => void;
  readOnly?: boolean;
}

export default function ExamenesAuxiliaresTab({
  estado = "1",
  codigoAtencion,
  selectedExamenes = [1, 5, 12],
  onSelectionChange,
  readOnly = false,
}: ExamenesAuxiliaresTabProps) {
  const [categorias] = useState<CategoriaExamen[]>(categoriasExamenesMock);
  const [categoriasAbiertas, setCategoriasAbiertas] = useState<Set<number>>(
    new Set([1]),
  );

  const examenesSeleccionados = useMemo(
    () => new Set(selectedExamenes ?? []),
    [selectedExamenes],
  );

  const toggleCategoria = (idCategoria: number) => {
    setCategoriasAbiertas((prev) => {
      const nuevo = new Set(prev);
      if (nuevo.has(idCategoria)) {
        nuevo.delete(idCategoria);
      } else {
        nuevo.add(idCategoria);
      }
      return nuevo;
    });
  };

  const toggleExamen = (numeroExamen: number) => {
    if (readOnly || !onSelectionChange) {
      return;
    }

    const updated = new Set(examenesSeleccionados);
    if (updated.has(numeroExamen)) {
      updated.delete(numeroExamen);
    } else {
      updated.add(numeroExamen);
    }

    onSelectionChange(Array.from(updated));
  };

  return (
    <div className="space-y-1">
      {categorias.map((categoria) => (
        <div
          key={categoria.id_categoria}
          className="border-none text-surface-light rounded-lg overflow-hidden transition-all duration-300 ease-in-out"
        >
          <div
            className="font-semibold bg-brand p-4 rounded-md ps-12 pe-4 cursor-pointer flex items-center justify-between relative transition-all duration-300 hover:bg-opacity-90"
            onClick={() => toggleCategoria(categoria.id_categoria)}
          >
            <span>{categoria.nombre.toUpperCase()}</span>
            <svg
              className={`w-5 h-5 transition-transform duration-300 ease-in-out absolute inset-s-5 ${
                categoriasAbiertas.has(categoria.id_categoria)
                  ? "rotate-90"
                  : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              categoriasAbiertas.has(categoria.id_categoria)
                ? "max-h-1250 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="pb-4 px-4 mt-2 text-xs">
              <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
                {categoria.subcategorias.map((subcategoria) => (
                  <div
                    key={subcategoria.id_subcategoria}
                    className="bg-muted-20 rounded-lg mb-4 break-inside-avoid transition-all duration-300 ease-in-out"
                  >
                    <h4 className="font-semibold bg-muted text-white p-4 rounded-b-none rounded-t-lg uppercase">
                      {subcategoria.nombre}
                    </h4>
                    <div className="space-y-2 p-4">
                      {subcategoria.examenes.map((examen) => (
                        <label
                          key={examen.id_examen}
                          className="flex items-center text-start gap-2 cursor-pointer text-text-primary"
                        >
                          <input
                            type="checkbox"
                            checked={examenesSeleccionados.has(
                              examen.numero_examen,
                            )}
                            onChange={() => toggleExamen(examen.numero_examen)}
                            disabled={readOnly}
                            className="checkbox size-5 border-brand border rounded-sm text-brand checked:bg-brand checked:text-surface-light align-middle"
                          />
                          <span>{examen.descripcion}</span>
                        </label>
                      ))}
                      {subcategoria.examenes.length === 0 && (
                        <p className="text-gray-500 italic">
                          No hay exámenes disponibles
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      {categorias.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No hay categorías de exámenes auxiliares configuradas
        </div>
      )}

      <div className="flex justify-end items-center pt-4">
        <Suspense
          fallback={
            <button
              type="button"
              className="bg-brand text-white px-8 py-2 rounded-lg font-semibold cursor-not-allowed opacity-50"
              disabled
            >
              <i className="fa-solid fa-spinner fa-spin mr-2"></i>
              Cargando PDF...
            </button>
          }
        >
          <PDFExamenesAuxiliares
            estado={estado}
            codigoAtencion={codigoAtencion}
            selectedExamenes={Array.from(examenesSeleccionados)}
          />
        </Suspense>
      </div>
    </div>
  );
}
