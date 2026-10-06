import {
  medicamentoSchema,
  type MedicamentoFormValues,
} from "@/components/farmacia/compras/registro-medicamentos/schema";
import {
  medicamentosCatalogoData,
  type Medicamento,
} from "@/lib/medicamentosData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm, type FieldErrors, type Resolver } from "react-hook-form";
import { toast } from "sonner";

/** Normaliza texto para búsquedas: sin acentos y en minúsculas. */
const normalizar = (valor: string) =>
  valor
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const generarCodigoInterno = (correlativo: number) =>
  `MED${String(correlativo).padStart(6, "0")}`;

const CORRELATIVO_INICIAL = medicamentosCatalogoData.length + 1;

const VALORES_INICIALES: MedicamentoFormValues = {
  nombreProducto: "",
  laboratorio: "",
  principioActivo: "",
  presentacion: "",
  tipoMedicamento: "",
  codigoProductoDigemid: "",
  codigoGenericoDigemid: "",
  registroSanitario: "",
  requiereReceta: false,
  costoProducto: 0,
  precioUnidad: 0,
  precioBlister: 0,
  precioCaja: 0,
};

/**
 * Estado y comportamiento del formulario de registro/edición de medicamentos.
 * Versión mock (solo UI): los datos provienen de `medicamentosData.ts`.
 */
export const useRegistroMedicamentos = () => {
  const [correlativo, setCorrelativo] = useState(CORRELATIVO_INICIAL);
  const [codigoInterno, setCodigoInterno] = useState(
    generarCodigoInterno(CORRELATIVO_INICIAL),
  );
  const [isEditable, setIsEditable] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [searchResults, setSearchResults] = useState<Medicamento[]>([]);
  const [isSearchingName, setIsSearchingName] = useState(false);
  const [showNameDropdown, setShowNameDropdown] = useState(false);
  const lastSelectedNameRef = useRef("");

  const { register, handleSubmit, setValue, reset, watch, formState } =
    useForm<MedicamentoFormValues>({
      resolver: zodResolver(
        medicamentoSchema,
      ) as unknown as Resolver<MedicamentoFormValues>,
      mode: "onBlur",
      defaultValues: VALORES_INICIALES,
    });

  const requiereReceta = watch("requiereReceta");
  const nombreProductoForm = watch("nombreProducto");
  const nombreProductoRegister = register("nombreProducto");

  // Autocompletado por nombre (debounce 300ms, mínimo 3 caracteres)
  useEffect(() => {
    if (nombreProductoForm.trim().length < 3) {
      setSearchResults([]);
      setIsSearchingName(false);
      setShowNameDropdown(false);
      return;
    }

    if (nombreProductoForm.toUpperCase() === lastSelectedNameRef.current) {
      setIsSearchingName(false);
      setShowNameDropdown(false);
      return;
    }

    setShowNameDropdown(true);
    setIsSearchingName(true);

    const timer = setTimeout(() => {
      const term = normalizar(nombreProductoForm.trim());
      setSearchResults(
        medicamentosCatalogoData.filter((m) =>
          normalizar(m.nombreProducto).includes(term),
        ),
      );
      setIsSearchingName(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [nombreProductoForm]);

  const resetFormValues = () => reset(VALORES_INICIALES);

  const resetToCreateMode = () => {
    setIsEditable(false);
    setShowNameDropdown(false);
    setSearchResults([]);
    lastSelectedNameRef.current = "";
    resetFormValues();
    setCodigoInterno(generarCodigoInterno(correlativo));
  };

  const handleSelectMedicamento = (med: Medicamento) => {
    setIsEditable(true);
    setShowNameDropdown(false);
    lastSelectedNameRef.current = med.nombreProducto.toUpperCase();

    setValue("nombreProducto", med.nombreProducto);
    setValue("laboratorio", med.laboratorio);
    setValue("principioActivo", med.principioActivo);
    setValue("presentacion", med.presentacion);
    setValue("tipoMedicamento", med.tipoMedicamento);
    setValue("codigoProductoDigemid", med.codigoProductoDigemid);
    setValue("codigoGenericoDigemid", med.codigoGenericoDigemid);
    setValue("registroSanitario", med.registroSanitario);
    setValue("requiereReceta", med.requiereReceta);
    setValue("costoProducto", med.costoProducto);
    setValue("precioUnidad", med.precioUnidad);
    setValue("precioBlister", med.precioBlister);
    setValue("precioCaja", med.precioCaja);
    setCodigoInterno(med.codigoInterno);

    toast.success("Datos del medicamento cargados.");
  };

  const onSubmit = (formData: MedicamentoFormValues) => {
    if (isSaving) return;

    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);

      if (isEditable) {
        lastSelectedNameRef.current = formData.nombreProducto.toUpperCase();
        toast.success("Medicamento actualizado correctamente.");
        return;
      }

      const siguiente = correlativo + 1;
      setCorrelativo(siguiente);
      setIsEditable(false);
      setShowNameDropdown(false);
      setSearchResults([]);
      lastSelectedNameRef.current = "";
      resetFormValues();
      setCodigoInterno(generarCodigoInterno(siguiente));
      toast.success("Medicamento registrado correctamente.");
    }, 500);
  };

  const onError = (errors: FieldErrors<MedicamentoFormValues>) => {
    if (errors.nombreProducto) {
      toast.error("El nombre del producto es obligatorio");
      return;
    }

    const firstError = Object.values(errors).find((error) => error?.message);
    if (firstError?.message) {
      toast.error(String(firstError.message));
    }
  };

  const handleDelete = () => {
    if (!codigoInterno || isDeleting) return;

    setIsDeleting(true);

    setTimeout(() => {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
      toast.success("Medicamento eliminado correctamente.");

      setIsEditable(false);
      setShowNameDropdown(false);
      setSearchResults([]);
      lastSelectedNameRef.current = "";
      resetFormValues();
      setCodigoInterno(generarCodigoInterno(correlativo));
    }, 500);
  };

  const handleCancel = () => {
    if (isSaving || isDeleting) return;
    resetToCreateMode();
    toast.success("Operación cancelada.");
  };

  return {
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
    formState,
    setIsDeleteModalOpen,
    setShowNameDropdown,
    handleSelectMedicamento,
    onSubmit,
    onError,
    handleDelete,
    handleCancel,
  };
};
