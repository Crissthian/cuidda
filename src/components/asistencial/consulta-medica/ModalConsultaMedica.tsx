import React, {
    useCallback,
    useEffect,
    useState,
    type ChangeEvent,
} from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import DatosGeneralesTab from "./tabs/DatosGeneralesTab";
import ExamenesAuxiliaresTab from "./tabs/ExamenesAuxiliaresTab";
import ExamenMedicoTab from "./tabs/ExamenMedicoTab";
import RecetaTab from "./tabs/RecetaTab";
import Referencia from "./tabs/ReferenciaTab";
import ArchivosTab from "./tabs/ArchivosTab";
import { sedesMock, pacientesConsultaMock } from "@/lib/consultaMedicaData";
import FechaHora from "@/components/FechaHora";
import Modal from "@/components/ui/Modal";

const preventSubmitOnEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") e.preventDefault();
};

type ModoEdicion = "crear" | "actualizar";

const createDefaultValues = () => ({
    hijos: "",
    hijos_cuantos: 0,
    hijos_fallecidos: "2",
    hijos_fallecidos_motivos: "",
    medicamento: "",
    medicamento_cual: "",
    tomaMedicamento: "2",
    tomaMedicamento_cual: "",
    patologicos_cual: "",
    quirurgicos_cual: "",
    traumatico_cual: "",
    toxicologicos_cual: "",
    padre_cual: "",
    madre_cual: "",
    hermanos_cual: "",
    esposa_cual: "",
    diagnosticos: [{ cie10: "", diagnostico: "", tipo: "", sistema: "" }],
    recetas: [
        {
            producto: "",
            cantidad: "",
            via: "",
            frecuencia: "",
            duracion: "",
            comentarios: "",
            cdg_medicamento: "",
        },
    ],
    indicaciones: "",
    alergias: "",
    nombresApellidos: "",
    edad: 0,
    dni: "",
    procedencia: "",
    razon_social: "",
    motivo_consulta: "",
    especialidad: "",
    codigoAtencion: "",
    codigoConsulta: "",
    talla: "",
    peso: "",
    imc: "",
    temperatura: "",
    frecuenciaRespiratoria: "",
    frecuenciaCardiaca: "",
    presionSistolica: "",
    presionDiastolica: "",
    nivelPresion: "",
    saturacionOxigeno: "",
    enfermedadComun: "2",
    accidenteTrabajo: "2",
    descansoMedico: "2",
    descansoMedico_dias: "0",
    enfermedadProfesional: "2",
    accidenteComun: "2",
    reincorporacionLaboral: "2",
    patologicos: "",
    quirurgicos: "",
    traumatico: "",
    toxicologicos: "",
    padre: "",
    madre: "",
    hermanos: "",
    esposa: "",
    examenFisico: "",
    anamnesis: "",
    medicacionHabitual: "",
    sufreAlergia: "2",
    sufreAlergia_cual: "",
    restricciones: "2",
    restricciones_tipo: "",
    restricciones_descripcion: "",
    otrosAntecedentes: "",
    vacuna_influenza: false,
    vacuna_neumococo: false,
    vacuna_tetano: false,
    vacuna_tetano_dosis: 0,
    vacuna_hepatitis_b: false,
    vacuna_hepatitis_b_dosis: 0,
    vacuna_covid: false,
    vacuna_covid_dosis: 0,
    vacuna_vph: false,
    vacuna_vph_dosis: 0,
    vacuna_esquema_completo: "2",
    vacuna_comentarios: "",
    recomendaciones: "",
    modoEdicion: "crear" as ModoEdicion,
});

interface ModalConsultaMedicaProps {
    codigo: string;
    estado: string;
    abierto: boolean;
    readOnly?: boolean;
    onClose?: () => void;
}

export default function ModalConsultaMedica({
    codigo,
    estado,
    abierto,
    readOnly = false,
    onClose,
}: ModalConsultaMedicaProps) {
    const [errorInput] = useState<string | null>(null);
    const [sedes, setSedes] = useState<
        { des_item: string; num_item: string }[]
    >([]);
    const [isSaving, setIsSaving] = useState(false);
    const [tipoAtencion, setTipoAtencion] = useState<string>("001");

    const [activeTab, setActiveTab] = useState<
        | "datos-generales"
        | "examen-medico"
        | "receta"
        | "examenes-aux"
        | "referencia"
        | "archivos"
    >("datos-generales");
    const methods = useForm({
        defaultValues: createDefaultValues(),
    });
    const [puedeImprimir, setPuedeImprimir] = useState<boolean>(estado === "2");
    const [examenesSeleccionados, setExamenesSeleccionados] = useState<
        number[]
    >([1, 5, 12]);
    const codigoAtencionActual =
        methods.watch("codigoAtencion") || codigo?.trim();
    const modoEdicion =
        methods.watch("modoEdicion") ||
        (estado === "2" ? "actualizar" : "crear");
    const razonSocial =
        methods.getValues("razon_social")?.toString().trim() || "";
    const esEmergencia = tipoAtencion === "002";
    const isReadOnlyMode = readOnly;
    const allTabs = [
        { id: "datos-generales", label: "Datos Generales" },
        { id: "examen-medico", label: "Examen médico" },
        { id: "receta", label: "Receta" },
        { id: "examenes-aux", label: "Exámenes Aux." },
        { id: "referencia", label: "Referencia" },
        { id: "archivos", label: "Archivos" },
    ] as const;
    const tabs = esEmergencia
        ? allTabs
        : allTabs.filter((tab) => tab.id !== "referencia");

    const resetFormulario = useCallback(
        (
            options: {
                modoEdicion?: ModoEdicion;
                puedeImprimir?: boolean;
            } = {},
        ) => {
            const initialValues = createDefaultValues();
            if (options.modoEdicion) {
                initialValues.modoEdicion = options.modoEdicion;
            }
            methods.reset(initialValues);
            setActiveTab("datos-generales");
            setExamenesSeleccionados([1, 5, 12]);
            setPuedeImprimir(options.puedeImprimir ?? false);
        },
        [methods],
    );

    useEffect(() => {
        if (!abierto) return;

        setPuedeImprimir(estado === "2");
        setSedes(sedesMock);

        const pac = pacientesConsultaMock.find(
            (p) => p.codigo_atencion === codigo?.trim(),
        );
        if (pac) {
            setTipoAtencion(pac.tipo_atencion || "001");
            methods.setValue(
                "nombresApellidos",
                `${pac.apellido_paciente} ${pac.nombre_paciente}`,
            );
            methods.setValue("edad", pac.edad || 30);
            methods.setValue("dni", pac.numero_doc);
            methods.setValue("procedencia", pac.procedencia || "1");
            methods.setValue("codigoAtencion", pac.codigo_atencion);
            methods.setValue("razon_social", pac.razon_social || "");
            methods.setValue("motivo_consulta", pac.motivo_consulta || "");
            methods.setValue("especialidad", pac.descripcion_especialidad);
            methods.setValue(
                "codigoConsulta",
                `0000${pac.codigo_atencion.slice(-4)}`,
            );
            methods.setValue("talla", pac.talla || "1.70");
            methods.setValue("peso", pac.peso || "70");
            methods.setValue("temperatura", pac.temperatura || "36.6");
            methods.setValue(
                "frecuenciaRespiratoria",
                pac.frecuenciaRespiratoria || "18",
            );
            methods.setValue(
                "frecuenciaCardiaca",
                pac.frecuenciaCardiaca || "72",
            );
            methods.setValue("presionSistolica", pac.presionSistolica || "120");
            methods.setValue(
                "presionDiastolica",
                pac.presionDiastolica || "80",
            );
            methods.setValue(
                "saturacionOxigeno",
                pac.saturacionOxigeno || "98",
            );
            methods.setValue(
                "modoEdicion",
                estado === "2" ? "actualizar" : "crear",
            );
        }
    }, [abierto, codigo, estado, methods]);

    const handleCloseModal = useCallback(() => {
        resetFormulario();
        onClose?.();
    }, [onClose, resetFormulario]);

    const onSubmit = async (ev: ChangeEvent<HTMLFormElement>) => {
        ev.preventDefault();
        if (isReadOnlyMode) return;

        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setPuedeImprimir(true);
            methods.setValue("modoEdicion", "actualizar");
            toast.success(
                modoEdicion === "actualizar"
                    ? "Consulta médica actualizada con éxito"
                    : "Consulta médica registrada con éxito",
            );
            handleCloseModal();
        }, 500);
    };

    const handleExamenesAuxiliaresLoaded = (examenes: number[]) => {
        setExamenesSeleccionados(examenes);
    };

    return (
        <Modal
            isOpen={abierto}
            onClose={handleCloseModal}
            title="Consulta médica"
            size="5xl"
            closeOnBackdrop={!isReadOnlyMode}
            closeOnEscape={!isReadOnlyMode}
        >
            <FormProvider {...methods}>
                {errorInput && (
                    <p className="text-red-500 mb-4">{errorInput}</p>
                )}
                <form
                    className="w-full min-h-[95vh] overflow-y-auto pr-4"
                    onSubmit={onSubmit}
                    onKeyDown={preventSubmitOnEnter}
                >
                    <div className="flex flex-row justify-end top-0 z-50 p-0 h-0 gap-2">
                        {!isReadOnlyMode ? (
                            <button
                                type="submit"
                                disabled={isSaving}
                                className={`btn sticky -left-96  top-0 z-50 bg-muted border-none rounded-lg text-white font-medium px-4 py-2 shadow-md flex items-center gap-2 cursor-pointer ${
                                    isSaving
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                }`}
                            >
                                <i
                                    className={`fa-solid ${isSaving ? "fa-spinner fa-spin" : "fa-floppy-disk"}`}
                                ></i>
                                {isSaving
                                    ? "Guardando..."
                                    : modoEdicion === "actualizar"
                                      ? "Actualizar"
                                      : "Guardar"}
                            </button>
                        ) : null}
                        <button
                            type="button"
                            onClick={handleCloseModal}
                            className="btn sticky left-full top-0 z-50 bg-muted border-none rounded-lg text-white font-medium px-4 py-2 shadow-md flex items-center gap-2 cursor-pointer"
                        >
                            <i className="fa-solid fa-sign-out-alt text-lg"></i>
                            Cerrar
                        </button>
                    </div>
                    <div>
                        <div className="flex flex-row items-center mb-4 ms-6 gap-8">
                            <div className="flex items-center gap-3">
                                <h1 className="text-xl font-bold text-brand">
                                    Consulta médica
                                </h1>
                                {isReadOnlyMode ? (
                                    <span className="rounded-full bg-brand/10 px-3 py-1 text-sm font-medium text-brand">
                                        Solo lectura
                                    </span>
                                ) : null}
                            </div>
                            <div className="flex-1 max-w-xl">
                                <input
                                    type="text"
                                    {...methods.register("codigoConsulta")}
                                    readOnly
                                    className="max-w-40 p-2 text-center text-xl font-semibold bg-muted-30 text-brand rounded-lg"
                                />
                            </div>
                        </div>
                        <div className="mb-4 p-4">
                            <div className="flex flex-row justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-text-primary mb-4">
                                    Datos generales del paciente
                                </h2>
                                {!isReadOnlyMode ? (
                                    <div className="relative -top-5">
                                        <FechaHora />
                                    </div>
                                ) : null}
                            </div>
                            <div className="grid grid-cols-12 gap-4">
                                <div className="flex flex-col col-span-4">
                                    <label
                                        className="form-label"
                                        htmlFor="nombresApellidos"
                                    >
                                        Nombres y Apellidos
                                    </label>
                                    <input
                                        type="text"
                                        readOnly
                                        className="form-input uppercase"
                                        {...methods.register(
                                            "nombresApellidos",
                                        )}
                                    />
                                </div>

                                <div className="flex flex-col col-span-2">
                                    <label
                                        className="form-label"
                                        htmlFor="edad"
                                    >
                                        Edad
                                    </label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        readOnly
                                        {...methods.register("edad")}
                                    />
                                </div>

                                <div className="flex flex-col col-span-2">
                                    <label className="form-label" htmlFor="dni">
                                        D.N.I.
                                    </label>
                                    <input
                                        type="text"
                                        readOnly
                                        className="form-input"
                                        {...methods.register("dni")}
                                    />
                                </div>

                                <div className="flex flex-col col-span-2">
                                    <label className="form-label">
                                        Procedencia
                                    </label>
                                    <select
                                        className="form-input bg-muted-30 text-primary"
                                        {...methods.register("procedencia")}
                                        defaultValue={""}
                                        disabled
                                    >
                                        <option value="" disabled>
                                            SELECCIONE
                                        </option>
                                        {sedes.map((sede) => (
                                            <option
                                                key={sede.num_item}
                                                value={sede.num_item}
                                            >
                                                {sede.des_item}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col col-span-2">
                                    <label className="form-label">
                                        Código de atención
                                    </label>
                                    <input
                                        type="text"
                                        readOnly
                                        className="form-input bg-muted-30 text-text-primary"
                                        {...methods.register("codigoAtencion")}
                                    />
                                </div>
                                {razonSocial ? (
                                    <div className="flex flex-col col-span-4">
                                        <label className="form-label">
                                            Razon Social
                                        </label>
                                        <input
                                            type="text"
                                            readOnly
                                            className="form-input uppercase"
                                            {...methods.register(
                                                "razon_social",
                                            )}
                                        />
                                    </div>
                                ) : null}
                                <div className="flex flex-col col-span-2">
                                    <label className="form-label">
                                        Especialidad
                                    </label>
                                    <input
                                        type="text"
                                        readOnly
                                        className="form-input  uppercase"
                                        {...methods.register("especialidad")}
                                    />
                                </div>
                                <div className="flex flex-col col-span-4">
                                    <label className="form-label">
                                        Motivo de consulta
                                    </label>
                                    <input
                                        type="text"
                                        readOnly
                                        className="form-input  uppercase"
                                        {...methods.register("motivo_consulta")}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="w-full">
                            <div
                                className={`bg-card-bg rounded-2xl py-2 px-3 m-4 gap-4 grid ${tabs.length === 6 ? "grid-cols-6" : "grid-cols-5"}`}
                            >
                                {tabs.map((tab) => (
                                    <button
                                        type="button"
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`
                            px-4 py-2 rounded-xl transition-all cursor-pointer font-semibold text-sm
                            ${
                                activeTab === tab.id
                                    ? "bg-brand text-success shadow-lg"
                                    : "bg-surface-default text-brand"
                            }
                        `}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="rounded-lg shadow-lg p-4 mx-4 text-sm">
                            <div className="text-center">
                                <div
                                    className={
                                        activeTab === "datos-generales"
                                            ? "block"
                                            : "hidden"
                                    }
                                >
                                    <DatosGeneralesTab
                                        onExamenesAuxiliaresLoaded={
                                            handleExamenesAuxiliaresLoaded
                                        }
                                        readOnly={isReadOnlyMode}
                                    />
                                </div>
                                <div
                                    className={
                                        activeTab === "examen-medico"
                                            ? "block"
                                            : "hidden"
                                    }
                                >
                                    <ExamenMedicoTab
                                        esEmergencia={esEmergencia}
                                        readOnly={isReadOnlyMode}
                                    />
                                </div>
                                <div
                                    className={
                                        activeTab === "receta"
                                            ? "block"
                                            : "hidden"
                                    }
                                >
                                    <RecetaTab
                                        codigo={codigoAtencionActual}
                                        estado={estado}
                                        puedeImprimir={puedeImprimir}
                                        abierto={abierto}
                                        readOnly={isReadOnlyMode}
                                    />
                                </div>
                                <div
                                    className={
                                        activeTab === "examenes-aux"
                                            ? "block"
                                            : "hidden"
                                    }
                                >
                                    <ExamenesAuxiliaresTab
                                        estado={estado}
                                        codigoAtencion={codigoAtencionActual}
                                        selectedExamenes={examenesSeleccionados}
                                        onSelectionChange={
                                            setExamenesSeleccionados
                                        }
                                        readOnly={isReadOnlyMode}
                                    />
                                </div>
                                <div
                                    className={
                                        activeTab === "referencia"
                                            ? "block"
                                            : "hidden"
                                    }
                                >
                                    <Referencia
                                        codigoAtencion={codigoAtencionActual}
                                        estado={estado}
                                        readOnly={isReadOnlyMode}
                                    />
                                </div>
                                <div
                                    className={
                                        activeTab === "archivos"
                                            ? "block"
                                            : "hidden"
                                    }
                                >
                                    <ArchivosTab
                                        codigoAtencion={codigoAtencionActual}
                                        readOnly={isReadOnlyMode}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Modal>
    );
}
