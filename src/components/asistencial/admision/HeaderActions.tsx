import { useState } from "react";
import { useFormContext } from "react-hook-form";
import type { AdmisionInput } from "./admision.types";
import { useAdmision } from "./AdmisionContext";

interface HeaderActionsProps {
  tipoAtencion: { num_item: string; des_item: string }[];
  onGuardar: () => void;
  onLimpiar: () => void;
  onCargarPorCodigo: (cdg_ate: string) => Promise<void>;
}

export default function HeaderActions({
  tipoAtencion,
  onGuardar,
  onLimpiar,
  onCargarPorCodigo,
}: HeaderActionsProps) {
  const { mode, isLoading } = useAdmision();
  const { setValue, watch } = useFormContext<AdmisionInput>();
  const [isSearchMode, setIsSearchMode] = useState(false);

  const cdg_ate = watch("atencion.cdg_ate");
  const tipo_atencion = watch("atencion.tipo_atencion");

  return (
    <div className="grid grid-cols-2 items-center gap-x-12 gap-y-3 px-6">
      <div className="w-full">
        <div className="flex items-center gap-3">
          <div className="w-1/2 flex justify-between">
            <span className="text-lg font-semibold text-brand w-2/5 place-content-center">
              N.º de admisión
            </span>

            <input
              type="text"
              className="rounded-lg px-4 py-2 text-xl font-bold text-brand appearance-none w-42 text-center transition-colors outline-brand border-brand bg-muted-30"
              value={cdg_ate || ""}
              readOnly={!isSearchMode}
              onChange={(e) => setValue("atencion.cdg_ate", e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Tab") {
                  e.preventDefault();
                  if (cdg_ate) {
                    onCargarPorCodigo(cdg_ate).then(() =>
                      setIsSearchMode(false),
                    );
                  }
                }
              }}
            />
          </div>
          <div className="w-1/2 flex">
            <span className="text-sm font-semibold text-brand flex-3 place-content-center ps-1">
              Tipo de atención
            </span>

            <select
              value={tipo_atencion || "001"}
              onChange={(e) =>
                setValue("atencion.tipo_atencion", e.target.value)
              }
              disabled={mode === "actualizar"}
              className={`rounded-lg bg-surface-light px-4 py-3 appearance-none flex-5 ${mode === "actualizar" ? "cursor-not-allowed opacity-70" : ""}`}
            >
              {tipoAtencion.map((item, i) => (
                <option key={i} value={item.num_item}>
                  {item.des_item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col items-end gap-3">
        <div className="flex items-center justify-end gap-3 absolute -top-26 right-6">
          <button
            type="button"
            onClick={onGuardar}
            disabled={isLoading}
            className="flex items-center gap-2 rounded-lg bg-muted-80 px-5 py-2 text-white transition-colors hover:bg-muted cursor-pointer disabled:opacity-50"
          >
            <i
              className={`fa-solid ${isLoading ? "fa-spinner fa-spin" : "fa-floppy-disk"}`}
            ></i>
            <span id="texto-guardar">
              {mode === "crear" ? "Guardar" : "Actualizar"}
            </span>
          </button>
          {mode === "crear" && !isSearchMode && (
            <button
              type="button"
              onClick={() => setIsSearchMode(true)}
              className="flex items-center gap-2 rounded-lg bg-muted-80 px-5 py-2 text-white transition-colors hover:bg-muted cursor-pointer"
            >
              <i className="fa-solid fa-pen"></i>
              <span className="font-normal">Editar</span>
            </button>
          )}
          <button
            type="button"
            onClick={onLimpiar}
            className="flex items-center gap-2 rounded-lg bg-muted-80 px-5 py-2 text-white transition-colors hover:bg-muted cursor-pointer"
          >
            <i className="fa-solid fa-forward"></i>
            <span className="font-normal">Siguiente</span>
          </button>

          <a
            href="/asistencial"
            className="flex items-center gap-2 rounded-lg bg-muted-80 px-5 py-2 text-white transition-colors hover:bg-muted cursor-pointer"
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            <span className="font-normal">Salir</span>
          </a>
        </div>
      </div>
    </div>
  );
}
