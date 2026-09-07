import { catalogsAdmision, pacientesMock } from "@/lib/admisionData";
import { calcularEdad, convertirFechaParaInputDate } from "@/lib/fechaUtils";
import React from "react";
import { useFormContext } from "react-hook-form";
import type { AdmisionInput } from "./admision.types";
import { useAdmision } from "./AdmisionContext";

export default function PatientSearch() {
  const { toggleModal } = useAdmision();
  const { setValue, watch, register } = useFormContext<AdmisionInput>();

  const nombre_paciente = watch("atencion.nombre_paciente");
  const dni_patrocinador = watch("atencion.dni_patrocinador");
  const nombre_patrocinador = watch("atencion.nombre_patrocinador");

  const buildNombreCompleto = (data: (typeof pacientesMock)[number]) =>
    `${data.NOMBRE_PERSONA?.trim() ?? ""} ${data.APELLIDO_PERSONA?.trim() ?? ""}`;

  const obtenerDepartamentoPorCodigo = (codigo?: string) => {
    if (!codigo) return "";
    const departamento = catalogsAdmision.departamentos.find(
      (d) => d.num_item?.trim() === codigo.trim(),
    );
    return departamento?.des_item?.trim() || "";
  };

  /**
   * Busca paciente o patrocinador por documento y sincroniza la UI (mock).
   */
  const handleSearch = (type: "paciente" | "patrocinador", ndoc: string) => {
    if (!ndoc || ndoc.length < 3) return;

    const data = pacientesMock.find((p) => p.NUM_DNI.trim() === ndoc.trim());

    if (!data) {
      // Open modal if not found
      if (type === "paciente") {
        toggleModal("registroPaciente", true);
      } else {
        toggleModal("registroPatrocinador", true);
      }
      return;
    }

    const nombreCompleto = buildNombreCompleto(data);

    if (type === "paciente") {
      setValue("atencion.dni_paciente", data.NUM_DNI.trim());
      setValue("atencion.nombre_paciente", nombreCompleto);

      if (!dni_patrocinador) {
        setValue("atencion.dni_patrocinador", data.NUM_DNI.trim());
        setValue("atencion.nombre_patrocinador", nombreCompleto);
      }

      const fechaNacimiento = convertirFechaParaInputDate(
        data.FECHA_NAC_PERSONA,
      );
      const edadCalculada = fechaNacimiento
        ? calcularEdad(fechaNacimiento).toString()
        : "";
      const lugarNacimiento = obtenerDepartamentoPorCodigo(data.CDG_DEP2);

      setValue("paciente.codigo_unacem", data.WEB_PERSONA || "");
      setValue("paciente.tipo_documento", data.TIP_DOCU?.trim() || "");
      setValue("paciente.numero_documento", data.NUM_DNI?.trim() || "");
      setValue("paciente.apellido", data.APELLIDO_PERSONA?.trim() || "");
      setValue("paciente.nombre", data.NOMBRE_PERSONA?.trim() || "");
      setValue("paciente.sexo", data.CDG_SEX || "");
      setValue("paciente.fecha_nacimiento", fechaNacimiento);
      setValue("paciente.edad", edadCalculada);
      setValue("paciente.estado_civil", data.CDG_EST || "");
      setValue("paciente.grado_instruccion", data.CDG_INSTR || "");
      setValue("paciente.telefono", data.num_tel?.trim() || "");
      setValue("paciente.correo", data.MAIL_PERSONA?.trim() || "");
      setValue("paciente.direccion", data.DIRECCION_PERSONA?.trim() || "");
      setValue("paciente.lugar_nacimiento", lugarNacimiento || "");
      setValue(
        "paciente.contacto_emergencia_nombre",
        data.CONTACTO_EMERGENCIA?.trim() || "",
      );
      setValue(
        "paciente.contacto_emergencia_parentesco",
        data.PARENTESCO_PAC?.trim() || "",
      );
      setValue(
        "paciente.contacto_emergencia_telefono",
        data.TELEFONO_EMERGENCIA?.trim() || "",
      );
    } else {
      setValue("atencion.dni_patrocinador", data.NUM_DNI.trim());
      setValue("atencion.nombre_patrocinador", nombreCompleto);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    type: "paciente" | "patrocinador",
  ) => {
    if (e.key === "Tab") {
      const val = (e.target as HTMLInputElement).value;
      handleSearch(type, val);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-12 px-6 py-3">
      <div>
        <label className="mb-2 block text-sm font-medium text-brand">
          N.º de documento del paciente
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-2 rounded-lg border-none  px-4 py-1 bg-surface-light"
            {...register("atencion.dni_paciente")}
            onKeyDown={(e) => handleKeyDown(e, "paciente")}
          />
          <input
            type="text"
            className="flex-5 rounded-lg border-none  px-4 py-1 bg-surface-light uppercase"
            value={nombre_paciente || ""}
            readOnly
          />
          <button
            name="registroPaciente"
            type="button"
            onClick={() => toggleModal("registroPaciente", true)}
            className="flex text-xl items-center justify-center transition-colors cursor-pointer text-brand"
          >
            <i className="fa-solid fa-user-plus p-2.5"></i>
          </button>
        </div>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-brand">
          N.º de documento del patrocinador
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-2 rounded-lg border-none  px-4 py-1 bg-surface-light"
            {...register("atencion.dni_patrocinador")}
            onKeyDown={(e) => handleKeyDown(e, "patrocinador")}
          />
          <input
            type="text"
            className="flex-5 rounded-lg border-none  px-4 py-1 bg-surface-light uppercase"
            value={nombre_patrocinador || ""}
            readOnly
          />
          <button
            name="registroPatrocinador"
            type="button"
            onClick={() => toggleModal("registroPatrocinador", true)}
            className="flex text-xl items-center justify-center transition-colors cursor-pointer text-brand"
          >
            <i className="fa-solid fa-user-plus p-2.5"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
