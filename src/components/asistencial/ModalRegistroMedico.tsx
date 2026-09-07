import Modal from "@/components/ui/Modal";
import type { ModalSize } from "@/components/ui/modal.constants";
import {
  medicosMock,
  type MedicoMock,
  type TablaItem,
} from "@/lib/admisionData";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ModalRegistroMedicoProps {
  isOpen: boolean;
  onClose: () => void;
  especialidades: TablaItem[];
  size?: ModalSize;
}

interface MedicoFormInputs {
  cdg_med: string;
  fec_registro: string;
  swt_med: boolean;
  des_med: string;
  cod_med: string;
  ruc_med: string;
  especialidad: string;
  dir_med: string;
  tel_med: string;
}

let siguienteCodigoMedico = 4;

/**
 * Modal de registro/edición de médicos con formulario y listado filtrable (mock).
 */
export default function ModalRegistroMedico({
  isOpen,
  onClose,
  especialidades,
  size = "3xl",
}: ModalRegistroMedicoProps) {
  const [medicos, setMedicos] = useState<MedicoMock[]>(medicosMock);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("des_med");

  const { register, handleSubmit, reset, setValue } = useForm<MedicoFormInputs>(
    {
      defaultValues: {
        fec_registro: new Date().toISOString().split("T")[0],
        swt_med: true,
      },
    },
  );

  const fetchMedicos = () => {
    setMedicos(medicosMock);
  };

  const fetchLastCode = () => {
    setValue("cdg_med", String(siguienteCodigoMedico).padStart(3, "0"));
  };

  useEffect(() => {
    if (isOpen) {
      fetchMedicos();
      if (!isEditing) {
        fetchLastCode();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, isEditing]);

  const onSubmit = (data: MedicoFormInputs) => {
    if (!data.des_med || !data.cod_med) {
      toast.error("Por favor complete los campos requeridos");
      return;
    }

    setLoading(true);
    // Simulación de guardado
    window.setTimeout(() => {
      setLoading(false);
      const duplicado = medicos.find(
        (m) => m.cod_med.toUpperCase() === data.cod_med.toUpperCase(),
      );
      if (!isEditing && duplicado) {
        toast.error(`El CMP ${data.cod_med} ya está registrado`);
        return;
      }

      const nuevoMedico: MedicoMock = {
        cdg_med: data.cdg_med,
        des_med: data.des_med.toUpperCase(),
        dir_med: data.dir_med?.toUpperCase() || "",
        tel_med: data.tel_med || "",
        ruc_med: data.ruc_med || "",
        cod_med: data.cod_med.toUpperCase(),
        swt_med: Number(data.especialidad) || 1,
      };

      if (isEditing) {
        setMedicos((prev) =>
          prev.map((m) =>
            m.cdg_med === nuevoMedico.cdg_med ? nuevoMedico : m,
          ),
        );
      } else {
        setMedicos((prev) => [...prev, nuevoMedico]);
        siguienteCodigoMedico += 1;
      }

      toast.success(isEditing ? "Médico actualizado" : "Médico registrado");
      reset();
      setIsEditing(false);
      fetchLastCode();
    }, 500);
  };

  const handleSearch = () => {
    if (!searchTerm) {
      fetchMedicos();
      return;
    }
    const filtered = medicosMock.filter((m) =>
      m[searchType as keyof MedicoMock]
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );
    setMedicos(filtered);
  };

  const handleEdit = (medico: MedicoMock) => {
    setIsEditing(true);
    setValue("cdg_med", medico.cdg_med);
    setValue("des_med", medico.des_med);
    setValue("dir_med", medico.dir_med || "");
    setValue("tel_med", medico.tel_med || "");
    setValue("ruc_med", medico.ruc_med || "");
    setValue("cod_med", medico.cod_med);
    setValue("especialidad", medico.swt_med.toString());
  };

  const handleNew = () => {
    reset({
      cdg_med: "",
      fec_registro: new Date().toISOString().split("T")[0],
      swt_med: true,
      des_med: "",
      cod_med: "",
      ruc_med: "",
      especialidad: "",
      dir_med: "",
      tel_med: "",
    });
    setIsEditing(false);
    fetchLastCode();
  };

  const handleClose = () => {
    reset();
    setIsEditing(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditing ? "Editar Médico" : "Registro de médicos"}
      size={size}
      className="h-[90vh] max-w-none"
    >
      <div className="flex flex-col h-full">
        {/* Toolbar */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-brand">
            {isEditing ? "Editar Médico" : "Registro de Médicos"}
          </h2>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleNew}
              className="flex items-center gap-2 rounded-lg bg-muted-80 px-5 py-1 text-white transition-colors hover:bg-muted"
            >
              <i className="fa-solid fa-file"></i>
              <span>NUEVO</span>
            </button>
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-muted-80 px-5 py-1 text-white transition-colors hover:bg-muted disabled:opacity-50"
            >
              {loading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                <i className="fa-solid fa-floppy-disk"></i>
              )}
              <span>{isEditing ? "ACTUALIZAR" : "GUARDAR"}</span>
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="flex items-center justify-center size-8 rounded-lg bg-brand text-white transition-colors hover:bg-primary-hover"
              aria-label="Cerrar modal"
            >
              <i className="fa-solid fa-sign-out-alt text-lg"></i>
            </button>
          </div>
        </div>

        <div className="flex flex-row gap-6 py-2 h-full overflow-hidden">
          {/* Form */}
          <div className="w-3/5 overflow-y-auto pr-2">
            {/* Código y Fecha */}
            <div className="rounded-lg p-6 shadow shadow-border-subtle mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-brand">
                    Código de médico
                  </label>
                  <input
                    {...register("cdg_med")}
                    readOnly
                    className="w-full rounded-lg border-none bg-surface-light px-4 py-2 font-semibold uppercase text-text-primary cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-text-primary">
                    Fecha de registro
                  </label>
                  <input
                    type="date"
                    {...register("fec_registro")}
                    className="w-full rounded-lg border-none bg-surface-light px-4 py-2 uppercase text-text-primary"
                  />
                </div>
              </div>
            </div>

            {/* Datos personales */}
            <div className="rounded-xl p-6 shadow shadow-border-subtle mb-6">
              <h2 className="mb-4 text-lg font-semibold text-text-primary">
                Datos personales
              </h2>

              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-text-primary">
                  Nombres y Apellidos
                </label>
                <input
                  {...register("des_med", { required: true })}
                  className="w-full rounded-lg border-none bg-surface-light px-4 py-2 uppercase focus:ring-2 focus:ring-brand/20"
                  placeholder="Ingrese nombres y apellidos completos"
                />
              </div>

              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-text-primary">
                    C.M.P.
                  </label>
                  <input
                    {...register("cod_med", { required: true })}
                    className="w-full rounded-lg border-none bg-surface-light px-4 py-2 uppercase focus:ring-2 focus:ring-brand/20"
                    placeholder="Ej: CMP-12345"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-text-primary">
                    R.U.C.
                  </label>
                  <input
                    {...register("ruc_med")}
                    className="w-full rounded-lg border-none bg-surface-light px-4 py-2 uppercase focus:ring-2 focus:ring-brand/20"
                    placeholder="Ej: 20123456789"
                    maxLength={11}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-text-primary">
                  Especialidad
                </label>
                <select
                  {...register("especialidad")}
                  className="w-full appearance-none rounded-lg border-none bg-surface-light px-4 py-3 text-text-primary focus:ring-2 focus:ring-brand/20"
                >
                  <option value="">SELECCIONE UNA ESPECIALIDAD</option>
                  {especialidades.map((esp) => (
                    <option key={esp.num_item} value={esp.num_item}>
                      {esp.des_item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-text-primary">
                  Dirección
                </label>
                <input
                  {...register("dir_med")}
                  className="w-full rounded-lg border-none bg-surface-light px-4 py-2 uppercase focus:ring-2 focus:ring-brand/20"
                  placeholder="Ingrese dirección completa"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-text-primary">
                  Teléfono
                </label>
                <input
                  {...register("tel_med")}
                  className="w-full rounded-lg border-none bg-surface-light px-4 py-2 focus:ring-2 focus:ring-brand/20"
                  placeholder=""
                />
              </div>
            </div>
          </div>

          {/* List */}
          <div className="w-2/5 flex flex-col gap-6 h-full">
            {/* Search */}
            <div className="rounded-xl p-6 shadow shadow-border-subtle">
              <h2 className="mb-4 text-lg font-semibold text-text-primary">
                Consultar médico
              </h2>
              <div className="mb-4 grid grid-cols-12 gap-3">
                <div className="col-span-4">
                  <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="w-full appearance-none rounded-lg border-none bg-surface-light px-3 py-2 text-sm text-text-primary"
                  >
                    <option value="cdg_med">Código</option>
                    <option value="des_med">Nombre</option>
                    <option value="cod_med">CMP</option>
                  </select>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Buscar..."
                  className="col-span-7 rounded-lg border-none bg-surface-light px-4 py-2 text-sm text-text-primary"
                />
                <button
                  type="button"
                  onClick={handleSearch}
                  className="col-span-1 flex items-center justify-center rounded-lg bg-brand text-white hover:bg-primary-hover transition-colors"
                >
                  <i className="fa-solid fa-magnifying-glass text-sm"></i>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="rounded-xl p-6 shadow shadow-border-subtle flex-1 overflow-hidden flex flex-col">
              <h3 className="mb-3 text-sm font-semibold text-text-primary">
                Médicos registrados
              </h3>
              <div className="flex-1 overflow-y-auto border border-border-default rounded-lg">
                <div className="flex items-center gap-4 bg-surface-light px-4 py-3 sticky top-0">
                  <div className="w-1/4 text-center text-xs font-semibold text-text-primary">
                    CÓDIGO
                  </div>
                  <div className="flex-1 text-xs font-semibold text-text-primary">
                    NOMBRE
                  </div>
                </div>
                <div className="divide-y divide-dashed divide-brand">
                  {medicos.map((medico) => (
                    <div
                      key={medico.cdg_med}
                      onClick={() => handleEdit(medico)}
                      className="flex items-center gap-4 px-4 py-3 hover:bg-surface-light cursor-pointer transition-colors"
                    >
                      <div className="w-1/4 text-center text-sm text-text-primary font-medium">
                        {medico.cdg_med}
                      </div>
                      <div className="flex-1 text-sm text-text-primary">
                        {medico.des_med}
                      </div>
                    </div>
                  ))}
                  {medicos.length === 0 && (
                    <div className="p-4 text-center text-text-primary text-sm">
                      No hay médicos registrados
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
