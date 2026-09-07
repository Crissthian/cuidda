import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { emptyAdmisionInput, type AdmisionInput } from "./admision.types";
import { useAdmision } from "./AdmisionContext";

let siguienteCodigo = 4789;

const generarSiguienteCodigo = () => {
  const codigo = String(siguienteCodigo).padStart(10, "0");
  siguienteCodigo += 1;
  return codigo;
};

/**
 * Hook de formulario de Admisión (solo UI, sin servidor).
 */
export function useAdmisionForm() {
  const { setMode, setIsLoading, setExamenesLaboratorio } = useAdmision();
  const form = useForm<AdmisionInput>({
    defaultValues: emptyAdmisionInput,
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const cargarSiguienteCodigo = () => {
    form.setValue("atencion.cdg_ate", generarSiguienteCodigo());
  };

  const onSubmit = form.handleSubmit((data) => {
    setIsLoading(true);
    // Simulación de guardado
    window.setTimeout(() => {
      setIsLoading(false);
      setMode("actualizar");
      toast.success(`Admisión ${data.atencion.cdg_ate} guardada correctamente`);
    }, 800);
  });

  const limpiarFormulario = () => {
    form.reset(emptyAdmisionInput);
    setExamenesLaboratorio([]);
    setMode("crear");
    cargarSiguienteCodigo();
  };

  const cargarAdmisionPorCodigo = async (cdg_ate: string) => {
    // Simulación: carga una admisión existente con datos de ejemplo
    form.reset({
      ...emptyAdmisionInput,
      atencion: {
        ...emptyAdmisionInput.atencion,
        cdg_ate,
        tipo_atencion: "001",
        sede: "001",
        procedencia: "001",
        planilla: "001",
        especialidad: "010",
        dni_paciente: "4412896",
        nombre_paciente: "LUIS QUISPE RAMOS",
        dni_patrocinador: "4412896",
        nombre_patrocinador: "LUIS QUISPE RAMOS",
      },
      paciente: {
        ...emptyAdmisionInput.paciente,
        codigo_unacem: "UNACEM-001",
        tipo_documento: "001",
        numero_documento: "4412896",
        apellido: "QUISPE RAMOS",
        nombre: "LUIS",
        sexo: "001",
        estado_civil: "002",
        grado_instruccion: "004",
        telefono: "987654321",
        correo: "luis.quispe@correo.com",
        direccion: "AV. LOS ALAMOS 123, ATE",
      },
    });
    setMode("actualizar");
  };

  return {
    form,
    onSubmit,
    limpiarFormulario,
    cargarSiguienteCodigo,
    cargarAdmisionPorCodigo,
  };
}
