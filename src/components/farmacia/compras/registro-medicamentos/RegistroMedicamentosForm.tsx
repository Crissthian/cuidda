import { useRegistroMedicamentos } from "@/components/farmacia/compras/registro-medicamentos/hooks/useRegistroMedicamentos";
import Modal from "@/components/ui/Modal";
import { useAuthStore } from "@/lib/authStore";
import {
  laboratoriosMedicamento,
  presentacionesMedicamento,
  tiposMedicamento,
} from "@/lib/medicamentosData";
import { AlertCircle, ArrowRight, Loader2, Search } from "lucide-react";
import type { KeyboardEvent } from "react";

/** Evita que Enter envíe el formulario (salvo en textareas). */
const preventSubmitOnEnter = (e: KeyboardEvent<HTMLFormElement>) => {
  if (e.key === "Enter" && (e.target as HTMLElement).tagName !== "TEXTAREA") {
    e.preventDefault();
  }
};

export const RegistroMedicamentosForm = () => {
  const username = useAuthStore((state) => state.username) ?? "ADMINISTRADOR";

  const {
    codigoInterno,
    isEditable,
    isDeleteModalOpen,
    isSaving,
    isDeleting,
    searchResults,
    isSearchingName,
    showNameDropdown,
    lastSelectedNameRef,
    nombreProductoForm,
    nombreProductoRegister,
    register,
    handleSubmit,
    setValue,
    requiereReceta,
    formState: { errors },
    setIsDeleteModalOpen,
    setShowNameDropdown,
    handleSelectMedicamento,
    onSubmit,
    onError,
    handleDelete,
    handleCancel,
  } = useRegistroMedicamentos();

  return (
    <div className="shadow-md shadow-border-default/60 rounded-lg h-full">
      <header className="my-2">
        <h1 className="text-2xl font-bold text-brand mx-6">
          {isEditable ? "Editar Medicamento" : "Registro de Medicamentos"}
        </h1>
        <p className="mx-6 mt-3 text-sm text-text-primary">
          {isEditable
            ? "Modifique los datos del medicamento en el formulario y presione ACTUALIZAR."
            : "Complete los datos del medicamento en el formulario y presione GUARDAR."}
        </p>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        onKeyDown={preventSubmitOnEnter}
        className="flex flex-col gap-6 p-6"
      >
        <div className="grid grid-cols-12 gap-10 mx-auto w-full group/form">
          {/* Columna Izquierda: Datos del Medicamento */}
          <div className="col-span-7 flex flex-col gap-5">
            <div className="grid grid-cols-12 gap-4 items-center">
              <label
                htmlFor="codigo-interno"
                className="col-span-4 text-text-primary text-sm"
              >
                Código interno
              </label>
              <div className="col-span-8">
                <input
                  id="codigo-interno"
                  type="text"
                  value={codigoInterno}
                  readOnly
                  placeholder="Generando..."
                  className="h-10 rounded-lg w-full px-4 text-text-primary outline-none border border-transparent transition-colors font-semibold bg-surface-light caret-transparent cursor-default"
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-center">
              <label
                htmlFor="nombre-producto"
                className="col-span-4 text-text-primary text-sm"
              >
                Nombre del producto
              </label>
              <div className="col-span-8 relative">
                <div className="relative flex items-center h-10">
                  <input
                    id="nombre-producto"
                    type="text"
                    autoComplete="off"
                    {...nombreProductoRegister}
                    aria-invalid={!!errors.nombreProducto}
                    onFocus={() => {
                      if (
                        nombreProductoForm.trim().length >= 3 &&
                        nombreProductoForm.toUpperCase() !==
                          lastSelectedNameRef.current
                      ) {
                        setShowNameDropdown(true);
                      }
                    }}
                    onBlur={(e) => {
                      nombreProductoRegister.onBlur(e);
                      setTimeout(() => setShowNameDropdown(false), 200);
                    }}
                    className={`bg-surface-light h-10 rounded-lg w-full text-sm text-text-primary outline-none outline-1 border border-transparent transition-colors uppercase pl-4 pr-10 ${
                      errors.nombreProducto ? "ring-1 ring-red-500" : ""
                    }`}
                  />
                  <div className="absolute right-3 text-text-secondary">
                    {isSearchingName ? (
                      <Loader2 className="size-5 animate-spin text-brand" />
                    ) : (
                      <Search className="size-5" />
                    )}
                  </div>
                </div>
                {errors.nombreProducto ? (
                  <span className="text-red-500 text-xs mt-1 block px-1">
                    {errors.nombreProducto.message}
                  </span>
                ) : null}

                {/* Dropdown de Autocompletado */}
                {showNameDropdown && searchResults.length > 0 ? (
                  <div className="absolute z-50 top-full mt-3 w-full bg-surface-light border border-border-default/50 rounded-lg shadow-md overflow-hidden max-h-112.5 overflow-y-auto ring-1 ring-black/5">
                    <ul className="flex flex-col divide-y divide-border-default">
                      {searchResults.map((item) => (
                        <li
                          key={item.codigoInterno}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            handleSelectMedicamento(item);
                          }}
                          className="group relative px-5 py-2 hover:bg-brand/3 cursor-pointer transition-all duration-200"
                        >
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand scale-y-0 group-hover:scale-y-100 transition-transform origin-center" />

                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1.5">
                                <span className="font-semibold text-text-primary text-sm truncate group-hover:text-brand transition-colors uppercase leading-tight">
                                  {item.nombreProducto}
                                </span>
                                <span className="shrink-0 px-2 py-0.5 rounded-lg bg-surface-light text-text-secondary text-[10px] font-mono border border-border-default/30 shadow-sm">
                                  {item.codigoInterno}
                                </span>
                              </div>

                              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-text-secondary">
                                {item.laboratorio ? (
                                  <span className="flex items-center gap-1.5 bg-surface-default px-2 py-0.5 rounded border border-border-default">
                                    <span className="size-1.5 rounded-full bg-brand/40" />
                                    <span className="uppercase">
                                      {item.laboratorio}
                                    </span>
                                  </span>
                                ) : null}
                                {item.presentacion ? (
                                  <span className="flex items-center gap-1.5 bg-surface-default px-2 py-0.5 rounded border border-border-default">
                                    <span className="size-1.5 rounded-full bg-success/40" />
                                    <span className="uppercase">
                                      {item.presentacion}
                                    </span>
                                  </span>
                                ) : null}
                              </div>
                            </div>

                            <div className="shrink-0 flex items-center h-full pt-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                              <div className="p-2 rounded-full bg-brand/10 group-hover:bg-brand/20 transition-colors">
                                <ArrowRight className="size-4 text-brand" />
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-center">
              <label
                htmlFor="laboratorio"
                className="col-span-4 text-text-primary text-sm"
              >
                Laboratorio
              </label>
              <div className="col-span-8">
                <select
                  id="laboratorio"
                  {...register("laboratorio")}
                  className="w-full appearance-none rounded-lg border-none bg-surface-light px-4 py-2 outline-none focus:ring-1 focus:ring-brand uppercase"
                >
                  <option value="">Seleccionar</option>
                  {laboratoriosMedicamento.map((laboratorio) => (
                    <option key={laboratorio} value={laboratorio}>
                      {laboratorio}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-center">
              <label
                htmlFor="principio-activo"
                className="col-span-4 text-text-primary text-sm"
              >
                Principio activo
              </label>
              <div className="col-span-8">
                <input
                  id="principio-activo"
                  type="text"
                  {...register("principioActivo")}
                  className="bg-surface-light h-10 rounded-lg w-full px-4 text-sm text-text-primary outline-none border border-transparent transition-colors uppercase"
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-center">
              <label
                htmlFor="presentacion"
                className="col-span-4 text-text-primary text-sm"
              >
                Presentación
              </label>
              <div className="col-span-8">
                <select
                  id="presentacion"
                  {...register("presentacion")}
                  className="w-full appearance-none rounded-lg border-none bg-surface-light px-4 py-2 outline-none focus:ring-1 focus:ring-brand uppercase"
                >
                  <option value="">Seleccionar</option>
                  {presentacionesMedicamento.map((presentacion) => (
                    <option key={presentacion} value={presentacion}>
                      {presentacion}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-center">
              <label
                htmlFor="tipo-medicamento"
                className="col-span-4 text-text-primary text-sm"
              >
                Tipo de medicamento
              </label>
              <div className="col-span-8">
                <select
                  id="tipo-medicamento"
                  {...register("tipoMedicamento")}
                  className="w-full appearance-none rounded-lg border-none bg-surface-light px-4 py-2 outline-none focus:ring-1 focus:ring-brand uppercase"
                >
                  <option value="">Seleccionar</option>
                  {tiposMedicamento.map((tipo) => (
                    <option key={tipo} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-center">
              <label
                htmlFor="codigo-producto-digemid"
                className="col-span-4 text-text-primary text-sm"
              >
                Código Producto DIGEMID
              </label>
              <div className="col-span-8">
                <input
                  id="codigo-producto-digemid"
                  type="text"
                  {...register("codigoProductoDigemid")}
                  className="bg-surface-light h-10 rounded-lg w-full px-4 text-sm text-text-primary outline-none border border-transparent transition-colors uppercase"
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-center">
              <label
                htmlFor="codigo-generico-digemid"
                className="col-span-4 text-text-primary text-sm"
              >
                Código Genérico DIGEMID
              </label>
              <div className="col-span-8">
                <input
                  id="codigo-generico-digemid"
                  type="text"
                  {...register("codigoGenericoDigemid")}
                  className="bg-surface-light h-10 rounded-lg w-full px-4 text-sm text-text-primary outline-none border border-transparent transition-colors uppercase"
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-center">
              <label
                htmlFor="registro-sanitario"
                className="col-span-4 text-text-primary text-sm"
              >
                Registro sanitario
              </label>
              <div className="col-span-8">
                <input
                  id="registro-sanitario"
                  type="text"
                  {...register("registroSanitario")}
                  className="bg-surface-light h-10 rounded-lg w-full px-4 text-sm text-text-primary outline-none border border-transparent transition-colors uppercase"
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-center">
              <span className="col-span-4 text-text-primary text-sm">
                Requiere receta
              </span>
              <div className="col-span-8">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="requiere-receta"
                      value="true"
                      checked={requiereReceta === true}
                      onChange={() =>
                        setValue("requiereReceta", true, {
                          shouldValidate: true,
                          shouldDirty: true,
                        })
                      }
                      className="size-6 checked:accent-brand radio bg-muted-30 checked:text-brand text-surface-light align-middle"
                    />
                    <span className="text-text-primary text-sm">Sí</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="requiere-receta"
                      value="false"
                      checked={requiereReceta === false}
                      onChange={() => setValue("requiereReceta", false)}
                      className="size-6 checked:accent-brand radio bg-muted-30 checked:text-brand text-surface-light align-middle"
                    />
                    <span className="text-text-primary text-sm">No</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Costos y Precios */}
          <div className="col-span-5 flex flex-col gap-5 px-6 h-fit">
            <h2 className="text-brand font-bold text-lg mb-2 flex items-center gap-2">
              Costos y precio de venta
            </h2>

            <div className="grid grid-cols-12 gap-4 items-center">
              <label
                htmlFor="costo-producto"
                className="col-span-4 text-brand text-sm"
              >
                Costo de producto
              </label>
              <div className="col-span-8">
                <input
                  id="costo-producto"
                  type="number"
                  step="0.01"
                  min={0}
                  {...register("costoProducto")}
                  className="bg-surface-light h-10 rounded-lg w-full px-4 text-sm text-text-primary outline-none border border-transparent transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-center">
              <label
                htmlFor="precio-unidad"
                className="col-span-4 text-brand text-sm"
              >
                Precio por unidad
              </label>
              <div className="col-span-8">
                <input
                  id="precio-unidad"
                  type="number"
                  step="0.01"
                  min={0}
                  {...register("precioUnidad")}
                  className="bg-surface-light h-10 rounded-lg w-full px-4 text-sm text-text-primary outline-none border border-transparent transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-center">
              <label
                htmlFor="precio-blister"
                className="col-span-4 text-brand text-sm"
              >
                Precio por blister
              </label>
              <div className="col-span-8">
                <input
                  id="precio-blister"
                  type="number"
                  step="0.01"
                  min={0}
                  {...register("precioBlister")}
                  className="bg-surface-light h-10 rounded-lg w-full px-4 text-sm text-text-primary outline-none border border-transparent transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 items-center">
              <label
                htmlFor="precio-caja"
                className="col-span-4 text-brand text-sm"
              >
                Precio por caja
              </label>
              <div className="col-span-8">
                <input
                  id="precio-caja"
                  type="number"
                  step="0.01"
                  min={0}
                  {...register("precioCaja")}
                  className="bg-surface-light h-10 rounded-lg w-full px-4 text-sm text-text-primary outline-none border border-transparent transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="flex justify-end gap-3 mt-12 mx-auto w-full">
          <button
            type="submit"
            disabled={isSaving || isDeleting}
            className="bg-brand hover:bg-brand/90 text-white px-8 py-2 rounded-lg font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSaving ? "PROCESANDO..." : isEditable ? "ACTUALIZAR" : "GUARDAR"}
          </button>

          {username === "ADMINISTRADOR" && isEditable ? (
            <button
              type="button"
              disabled={isSaving || isDeleting}
              onClick={() => setIsDeleteModalOpen(true)}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-2 rounded-lg font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              ELIMINAR
            </button>
          ) : null}

          <button
            type="button"
            disabled={isSaving || isDeleting}
            onClick={handleCancel}
            className="bg-text-primary hover:bg-text-primary/90 text-card-bg px-8 py-2 rounded-lg font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isEditable ? "NUEVO" : "CANCELAR"}
          </button>
        </div>
      </form>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmar Eliminación"
        size="sm"
      >
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="text-red-500 bg-red-100 p-4 rounded-full">
            <AlertCircle size={48} />
          </div>
          <h3 className="text-xl font-bold text-text-primary">
            ¿Estás seguro?
          </h3>
          <p className="text-text-secondary">
            Esta acción eliminará el medicamento{" "}
            <strong>{nombreProductoForm || "seleccionado"}</strong>. Esta acción
            no se puede deshacer.
          </p>
          <div className="flex gap-4 w-full justify-center mt-4">
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(false)}
              className="bg-muted hover:bg-muted/80 text-white px-6 py-2 rounded-lg font-medium transition-colors w-full"
            >
              CANCELAR
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors w-full disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isDeleting ? "ELIMINANDO..." : "ELIMINAR"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RegistroMedicamentosForm;
