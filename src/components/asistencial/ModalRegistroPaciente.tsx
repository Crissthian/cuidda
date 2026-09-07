import Modal from "@/components/ui/Modal";
import type { ModalSize } from "@/components/ui/modal.constants";
import {
  distritosMock,
  pacientesMock,
  provinciasMock,
  type PacienteMock,
  type TablaItem,
} from "@/lib/admisionData";
import { calcularEdad, convertirFechaParaInputDate } from "@/lib/fechaUtils";
import { useEffect, useState, type ChangeEvent } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import type { AdmisionInput } from "./admision/admision.types";
import ModalBusquedaPaciente from "./ModalBusquedaPaciente";

interface ModalRegistroPacienteProps {
  isOpen: boolean;
  onClose: () => void;
  catalogs: {
    tiposDocumento: TablaItem[];
    estadoCivil: TablaItem[];
    sexos: TablaItem[];
    gradoInstruccion: TablaItem[];
    departamentos: TablaItem[];
  };
  size?: ModalSize;
  mode?: "paciente" | "patrocinador";
}

interface IPacienteForm {
  cdg_per: string;
  codigoUnacem: string;
  tipoDocumento: string;
  numeroDocumento: string;
  apellidos: string;
  nombres: string;
  fechaNacimiento: string;
  edad: string;
  estadoCivil: string;
  sexo: string;
  gradoInstruccion: string;
  departamento: string;
  provincia: string;
  distrito: string;
  direccion: string;
  departamentoNacimiento: string;
  telefono: string;
  email: string;
  contactoEmergencia: string;
  parentescoPac: string;
  telefonoEmergencia: string;
}

const initialPacienteFormValues: IPacienteForm = {
  cdg_per: "",
  codigoUnacem: "",
  tipoDocumento: "",
  numeroDocumento: "",
  apellidos: "",
  nombres: "",
  fechaNacimiento: "",
  edad: "",
  estadoCivil: "",
  sexo: "",
  gradoInstruccion: "",
  departamento: "",
  provincia: "",
  distrito: "",
  direccion: "",
  departamentoNacimiento: "",
  telefono: "",
  email: "",
  contactoEmergencia: "",
  parentescoPac: "",
  telefonoEmergencia: "",
};

let siguienteCodigoPersona = 5001;

/**
 * Modal para registrar o editar pacientes (o patrocinadores) con catálogos mock.
 */
export default function ModalRegistroPaciente({
  isOpen,
  onClose,
  catalogs,
  size = "2xl",
  mode = "paciente",
}: ModalRegistroPacienteProps) {
  const isPatrocinadorMode = mode === "patrocinador";
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [provincias, setProvincias] = useState<TablaItem[]>([]);
  const [distritos, setDistritos] = useState<TablaItem[]>([]);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [codigoPersona, setCodigoPersona] = useState("");

  // Extraer métodos de RHF desde el contexto si está disponible
  const fMethods = useFormContext<AdmisionInput>();

  const { register, handleSubmit, reset, setValue, watch } =
    useForm<IPacienteForm>({
      defaultValues: initialPacienteFormValues,
    });

  const fechaNacimiento = watch("fechaNacimiento");
  useEffect(() => {
    if (fechaNacimiento) {
      const edad = calcularEdad(fechaNacimiento);
      setValue("edad", edad.toString());
      return;
    }
    setValue("edad", "");
  }, [fechaNacimiento, setValue]);

  const handleDepartamentoChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const dep = e.target.value;
    setProvincias([]);
    setDistritos([]);
    setValue("provincia", "");
    setValue("distrito", "");

    if (dep) {
      setProvincias(provinciasMock[dep] ?? []);
    }
  };

  const handleProvinciaChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const prov = e.target.value;
    setDistritos([]);
    setValue("distrito", "");

    if (prov) {
      setDistritos(distritosMock[prov] ?? []);
    }
  };

  // Cuando se abre el modal en modo creación, asignamos el siguiente código disponible
  useEffect(() => {
    if (isOpen && !isEditing) {
      setCodigoPersona(String(siguienteCodigoPersona));
    }
  }, [isOpen, isEditing]);

  const onSubmit = (data: IPacienteForm) => {
    // Validación de campos requeridos
    const requiredFields = [
      { field: data.tipoDocumento, name: "Tipo de documento" },
      { field: data.numeroDocumento, name: "N° de documento" },
      { field: data.apellidos, name: "Apellidos" },
      { field: data.nombres, name: "Nombres" },
      { field: data.fechaNacimiento, name: "Fecha de nacimiento" },
      { field: data.edad, name: "Edad" },
      { field: data.estadoCivil, name: "Estado Civil" },
      { field: data.sexo, name: "Sexo" },
      { field: data.gradoInstruccion, name: "Grado de instrucción" },
    ];

    const emptyFields = requiredFields.filter(
      (f) => !f.field || (typeof f.field === "string" && f.field.trim() === ""),
    );
    if (emptyFields.length > 0) {
      toast.error(
        `Campos requeridos: ${emptyFields.map((f) => f.name).join(", ")}`,
      );
      return;
    }

    setLoading(true);
    // Simulación de guardado
    window.setTimeout(() => {
      setLoading(false);
      const successMessage = isPatrocinadorMode
        ? isEditing
          ? "Patrocinador actualizado"
          : "Patrocinador registrado"
        : isEditing
          ? "Paciente actualizado"
          : "Paciente registrado";
      toast.success(successMessage, { style: { color: "green" } });

      if (isPatrocinadorMode) {
        const nombreCompleto = `${data.nombres?.trim() || ""} ${data.apellidos?.trim() || ""}`;
        if (fMethods) {
          fMethods.setValue(
            "atencion.dni_patrocinador",
            data.numeroDocumento?.trim() || "",
          );
          fMethods.setValue("atencion.nombre_patrocinador", nombreCompleto);
        }
        handleClose();
      } else {
        if (!isEditing) {
          setCodigoPersona(String(siguienteCodigoPersona));
          setIsEditing(true);
        }
      }
    }, 600);
  };

  const handleSelectPaciente = (paciente: PacienteMock) => {
    setIsEditing(true);
    setCodigoPersona(paciente.NUM_DNI);

    setValue("codigoUnacem", paciente.WEB_PERSONA?.trim() || "");
    setValue("tipoDocumento", paciente.TIP_DOCU?.trim() || "");
    setValue("numeroDocumento", paciente.NUM_DNI?.trim() || "");
    setValue("apellidos", paciente.APELLIDO_PERSONA?.trim() || "");
    setValue("nombres", paciente.NOMBRE_PERSONA?.trim() || "");
    setValue("telefono", paciente.num_tel?.trim() || "");
    setValue("email", paciente.MAIL_PERSONA?.trim() || "");
    setValue("direccion", paciente.DIRECCION_PERSONA?.trim() || "");
    setValue("departamentoNacimiento", paciente.CDG_DEP2?.trim() || "");

    let fechaNacimientoStr = "";
    let edadCalculada = "";
    if (paciente.FECHA_NAC_PERSONA) {
      fechaNacimientoStr = convertirFechaParaInputDate(
        paciente.FECHA_NAC_PERSONA,
      );
      setValue("fechaNacimiento", fechaNacimientoStr);
      if (fechaNacimientoStr) {
        edadCalculada = calcularEdad(fechaNacimientoStr).toString();
        setValue("edad", edadCalculada);
      }
    } else {
      setValue("fechaNacimiento", "");
      setValue("edad", "");
    }

    setValue("estadoCivil", paciente.CDG_EST);
    setValue("sexo", paciente.CDG_SEX);
    setValue("gradoInstruccion", paciente.CDG_INSTR);
    setValue("contactoEmergencia", paciente.CONTACTO_EMERGENCIA?.trim() || "");
    setValue("parentescoPac", paciente.PARENTESCO_PAC?.trim() || "");
    setValue("telefonoEmergencia", paciente.TELEFONO_EMERGENCIA?.trim() || "");

    setProvincias([]);
    setDistritos([]);

    const dep = paciente.CDG_DEP2?.trim() || "";
    if (dep) {
      setValue("departamento", dep);
      const provinciasData = provinciasMock[dep] ?? [];
      setProvincias(provinciasData);
      if (provinciasData.length > 0) {
        setValue("provincia", provinciasData[0].num_item);
        const distritosData = distritosMock[provinciasData[0].num_item] ?? [];
        setDistritos(distritosData);
        if (distritosData.length > 0) {
          setValue("distrito", distritosData[0].num_item);
        }
      }
    } else {
      setValue("departamento", "");
      setValue("provincia", "");
      setValue("distrito", "");
    }

    // Actualizar campos del formulario principal de admisión
    if (!isPatrocinadorMode && fMethods) {
      const nombreCompleto = `${paciente.NOMBRE_PERSONA.trim()} ${paciente.APELLIDO_PERSONA.trim()}`;
      fMethods.setValue("atencion.dni_paciente", paciente.NUM_DNI.trim());
      fMethods.setValue("atencion.nombre_paciente", nombreCompleto);
      fMethods.setValue("atencion.dni_patrocinador", paciente.NUM_DNI.trim());
      fMethods.setValue("atencion.nombre_patrocinador", nombreCompleto);

      let lugarNacimiento = "";
      if (paciente.CDG_DEP2?.trim()) {
        const dep = catalogs.departamentos.find(
          (d) => d.num_item?.trim() === paciente.CDG_DEP2?.trim(),
        );
        lugarNacimiento = dep?.des_item?.trim() || "";
      }

      fMethods.setValue("paciente.codigo_unacem", paciente.WEB_PERSONA || "");
      fMethods.setValue(
        "paciente.tipo_documento",
        paciente.TIP_DOCU?.trim() || "",
      );
      fMethods.setValue(
        "paciente.numero_documento",
        paciente.NUM_DNI?.trim() || "",
      );
      fMethods.setValue(
        "paciente.apellido",
        paciente.APELLIDO_PERSONA?.trim() || "",
      );
      fMethods.setValue(
        "paciente.nombre",
        paciente.NOMBRE_PERSONA?.trim() || "",
      );
      fMethods.setValue("paciente.sexo", paciente.CDG_SEX || "");
      fMethods.setValue("paciente.fecha_nacimiento", fechaNacimientoStr);
      fMethods.setValue("paciente.edad", edadCalculada);
      fMethods.setValue("paciente.estado_civil", paciente.CDG_EST || "");
      fMethods.setValue("paciente.grado_instruccion", paciente.CDG_INSTR || "");
      fMethods.setValue("paciente.telefono", paciente.num_tel?.trim() || "");
      fMethods.setValue("paciente.correo", paciente.MAIL_PERSONA?.trim() || "");
      fMethods.setValue(
        "paciente.direccion",
        paciente.DIRECCION_PERSONA?.trim() || "",
      );
      fMethods.setValue("paciente.lugar_nacimiento", lugarNacimiento);
    }
  };

  const handleNew = () => {
    reset(initialPacienteFormValues);
    setIsEditing(false);
    setProvincias([]);
    setDistritos([]);

    if (fMethods) {
      fMethods.setValue("atencion.dni_paciente", "");
      fMethods.setValue("atencion.nombre_paciente", "");
      fMethods.setValue("atencion.dni_patrocinador", "");
      fMethods.setValue("atencion.nombre_patrocinador", "");
      fMethods.setValue("paciente.codigo_unacem", "");
      fMethods.setValue("paciente.tipo_documento", "");
      fMethods.setValue("paciente.numero_documento", "");
      fMethods.setValue("paciente.apellido", "");
      fMethods.setValue("paciente.nombre", "");
      fMethods.setValue("paciente.sexo", "");
      fMethods.setValue("paciente.fecha_nacimiento", "");
      fMethods.setValue("paciente.edad", "");
      fMethods.setValue("paciente.estado_civil", "");
      fMethods.setValue("paciente.grado_instruccion", "");
      fMethods.setValue("paciente.telefono", "");
      fMethods.setValue("paciente.correo", "");
      fMethods.setValue("paciente.direccion", "");
    }

    siguienteCodigoPersona += 1;
    setCodigoPersona(String(siguienteCodigoPersona));
  };

  const handleClose = () => {
    if (isPatrocinadorMode && fMethods) {
      const numeroDoc = watch("numeroDocumento");
      const nombres = watch("nombres");
      const apellidos = watch("apellidos");

      if (numeroDoc && nombres && apellidos) {
        const nombreCompleto = `${nombres.trim()} ${apellidos.trim()}`;
        fMethods.setValue("atencion.dni_patrocinador", numeroDoc.trim());
        fMethods.setValue("atencion.nombre_patrocinador", nombreCompleto);
      }
    }

    reset(initialPacienteFormValues);
    setIsEditing(false);
    setCodigoPersona("");
    setProvincias([]);
    setDistritos([]);
    setShowSearchModal(false);

    onClose();
  };

  const handleSearchByDocumento = () => {
    const ndoc = watch("numeroDocumento");
    if (!ndoc || ndoc.length < 8) return;

    setLoading(true);
    window.setTimeout(() => {
      const paciente = pacientesMock.find(
        (p) => p.NUM_DNI.trim() === ndoc.trim(),
      );
      if (paciente) {
        handleSelectPaciente(paciente);
        toast.info("Paciente encontrado", { style: { color: "blue" } });
      }
      setLoading(false);
    }, 300);
  };

  const handleSearchByCode = () => {
    if (!codigoPersona || codigoPersona.trim() === "") return;

    setLoading(true);
    window.setTimeout(() => {
      const paciente = pacientesMock.find(
        (p) => p.NUM_DNI.trim() === codigoPersona.trim(),
      );
      if (paciente) {
        handleSelectPaciente(paciente);
        toast.info("Paciente encontrado", { style: { color: "blue" } });
      } else {
        setShowSearchModal(true);
      }
      setLoading(false);
    }, 300);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title={
          isPatrocinadorMode
            ? isEditing
              ? "Editar Patrocinador"
              : "Registro de Patrocinador"
            : isEditing
              ? "Editar Paciente"
              : "Registro de Paciente"
        }
        size={size}
        className="h-[90vh] max-w-none"
      >
        <div className="flex flex-col h-full">
          {/* Toolbar */}
          <div className="flex justify-between items-center mb-4 pb-4">
            <h2 className="text-2xl font-bold text-brand ps-4">
              {isPatrocinadorMode
                ? isEditing
                  ? "Editar Patrocinador"
                  : "Registro de Patrocinador"
                : isEditing
                  ? "Editar Paciente"
                  : "Registro de Paciente"}
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
                className="flex items-center gap-2 rounded-lg bg-muted-80 px-5 py-1 text-white transition-colors hover:bg-muted"
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

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto pr-2">
            <div className="space-y-6">
              <div className="rounded-lg px-6">
                {/* Código y Fecha */}
                <div className="mb-2 grid grid-cols-4 gap-6">
                  <div>
                    <label className="mb-2 block font-semibold text-brand">
                      {isPatrocinadorMode
                        ? "Código de persona"
                        : "Código de paciente"}
                    </label>
                    <input
                      value={codigoPersona}
                      type="number"
                      min={0}
                      minLength={8}
                      maxLength={15}
                      readOnly={isEditing}
                      disabled={loading}
                      onChange={(e) =>
                        !isEditing && setCodigoPersona(e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Tab" && !isEditing) {
                          e.preventDefault();
                          handleSearchByCode();
                        }
                      }}
                      className={`w-full rounded-lg px-4 py-2  ${isEditing ? "bg-surface-light cursor-not-allowed" : "bg-muted-30"}`}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-normal text-text-primary">
                      Fecha de registro
                    </label>
                    <input
                      type="date"
                      value={new Date().toISOString().split("T")[0]}
                      readOnly
                      className="w-full rounded-lg  bg-surface-light px-4 py-2"
                    />
                  </div>
                </div>

                {/* Datos personales */}
                <h2 className="mb-4 text-lg font-semibold text-text-primary">
                  Datos personales
                </h2>

                <div className="mb-2 grid grid-cols-4 gap-6">
                  <div>
                    <label className="mb-2 block font-normal text-text-primary">
                      Código UNACEM
                    </label>
                    <input
                      {...register("codigoUnacem")}
                      className="w-full rounded-lg  bg-surface-light px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-normal text-text-primary">
                      Tipo de documento
                    </label>
                    <select
                      {...register("tipoDocumento")}
                      className="w-full appearance-none rounded-lg px-4 py-2 "
                    >
                      <option value="">SELECCIONE</option>
                      {catalogs.tiposDocumento.map((item) => (
                        <option
                          key={item.num_item}
                          value={item.num_item.trim()}
                        >
                          {item.des_item.trim()}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block font-normal text-text-primary">
                      N° de documento
                    </label>
                    <input
                      {...register("numeroDocumento")}
                      onBlur={handleSearchByDocumento}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleSearchByDocumento()
                      }
                      className="w-full rounded-lg  px-4 py-2 bg-surface-light"
                    />
                  </div>
                </div>

                <div className="mb-2 grid grid-cols-2 gap-6">
                  <div>
                    <label className="mb-2 block font-normal text-text-primary">
                      Apellidos
                    </label>
                    <input
                      {...register("apellidos")}
                      className="w-full rounded-lg  bg-surface-light px-4 py-2 uppercase"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-normal text-text-primary">
                      Nombres
                    </label>
                    <input
                      {...register("nombres")}
                      className="w-full rounded-lg  bg-surface-light px-4 py-2 uppercase"
                    />
                  </div>
                </div>

                <div className="mb-2 grid grid-cols-4 gap-6">
                  <div>
                    <label className="mb-2 block font-normal text-text-primary">
                      Fecha de nacimiento
                    </label>
                    <input
                      type="date"
                      {...register("fechaNacimiento")}
                      className="w-full rounded-lg  bg-surface-light px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-normal text-text-primary">
                      Edad
                    </label>
                    <input
                      {...register("edad")}
                      readOnly
                      className="w-full rounded-lg  bg-surface-light px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-normal text-text-primary">
                      Estado Civil
                    </label>
                    <select
                      {...register("estadoCivil")}
                      className="w-full appearance-none rounded-lg px-4 py-2 "
                    >
                      <option value="">SELECCIONE</option>
                      {catalogs.estadoCivil.map((item) => (
                        <option key={item.num_item} value={item.num_item}>
                          {item.des_item}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block font-normal text-text-primary">
                      Sexo
                    </label>
                    <select
                      {...register("sexo")}
                      className="w-full appearance-none rounded-lg px-4 py-2 "
                    >
                      <option value="">SELECCIONE</option>
                      {catalogs.sexos.map(
                        (item) =>
                          item.num_item !== "000" && (
                            <option key={item.num_item} value={item.num_item}>
                              {item.des_item}
                            </option>
                          ),
                      )}
                    </select>
                  </div>
                </div>

                <div className="mb-4 grid grid-cols-4 gap-6">
                  <div>
                    <label className="mb-2 block font-normal text-text-primary">
                      Grado de instrucción
                    </label>
                    <select
                      {...register("gradoInstruccion")}
                      className="w-full appearance-none rounded-lg px-4 py-2 "
                    >
                      <option value="">SELECCIONE</option>
                      {catalogs.gradoInstruccion.map((item) => (
                        <option key={item.num_item} value={item.num_item}>
                          {item.des_item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Dirección principal */}
                <h2 className="mb-4 text-lg font-semibold text-text-primary">
                  Dirección principal
                </h2>
                {/* UBIGEO */}
                <div className="mb-2 grid grid-cols-3 gap-6">
                  <div>
                    <label className="mb-2 block font-normal text-text-primary">
                      Departamento
                    </label>
                    <select
                      {...register("departamento", {
                        onChange: handleDepartamentoChange,
                      })}
                      className="w-full appearance-none rounded-lg px-4 py-2 "
                    >
                      <option value="">SELECCIONE</option>
                      {catalogs.departamentos.map((item) => (
                        <option
                          key={item.num_item}
                          value={item.num_item.trim()}
                        >
                          {item.des_item.trim()}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block font-normal text-text-primary">
                      Provincia
                    </label>
                    <select
                      {...register("provincia", {
                        onChange: handleProvinciaChange,
                      })}
                      className="w-full appearance-none rounded-lg px-4 py-2 "
                      disabled={!provincias.length}
                    >
                      <option value="">SELECCIONE</option>
                      {provincias.map((item) => (
                        <option
                          key={item.num_item}
                          value={item.num_item.trim()}
                        >
                          {item.des_item.trim()}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block font-normal text-text-primary">
                      Distrito
                    </label>
                    <select
                      {...register("distrito")}
                      className="w-full appearance-none rounded-lg px-4 py-2 "
                      disabled={!distritos.length}
                    >
                      <option value="">SELECCIONE</option>
                      {distritos.map((item) => (
                        <option
                          key={item.num_item}
                          value={item.num_item.trim()}
                        >
                          {item.des_item.trim()}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-2 grid grid-cols-[2fr_1fr] gap-6">
                  <div>
                    <label className="mb-2 block font-normal text-text-primary">
                      Direccion: Av. Cl. Jr. Pj.
                    </label>
                    <input
                      {...register("direccion")}
                      className="w-full rounded-lg  bg-surface-light px-4 py-2 uppercase"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-normal text-text-primary">
                      Departamento de nacimiento
                    </label>
                    <select
                      {...register("departamentoNacimiento")}
                      className="w-full appearance-none rounded-lg px-4 py-2 "
                    >
                      <option value="">SELECCIONE</option>
                      {catalogs.departamentos.map((item) => (
                        <option
                          key={item.num_item}
                          value={item.num_item.trim()}
                        >
                          {item.des_item.trim()}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-2 grid grid-cols-2 gap-6">
                  <div>
                    <label className="mb-2 block font-normal text-text-primary">
                      Número de teléfono
                    </label>
                    <input
                      {...register("telefono")}
                      className="w-full rounded-lg  bg-surface-light px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-normal text-text-primary">
                      Email
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      className="w-full rounded-lg  bg-surface-light px-4 py-2 uppercase"
                    />
                  </div>
                </div>

                {/* Contacto de emergencia */}
                <h2 className="my-4 text-lg font-semibold text-text-primary">
                  Contacto de emergencia
                </h2>

                <div className="mb-2 grid grid-cols-3 gap-6">
                  <div>
                    <label className="mb-2 block font-normal text-text-primary">
                      Nombre del contacto
                    </label>
                    <input
                      {...register("contactoEmergencia")}
                      className="w-full rounded-lg  bg-surface-light px-4 py-2 uppercase"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-normal text-text-primary">
                      Parentesco
                    </label>
                    <input
                      {...register("parentescoPac")}
                      className="w-full rounded-lg  bg-surface-light px-4 py-2 uppercase"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-normal text-text-primary">
                      Teléfono de emergencia
                    </label>
                    <input
                      {...register("telefonoEmergencia")}
                      className="w-full rounded-lg  bg-surface-light px-4 py-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Submodal for search */}
      <ModalBusquedaPaciente
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        onSelect={(paciente) => {
          handleSelectPaciente(paciente);
          setShowSearchModal(false);
        }}
      />
    </>
  );
}
