import { calcularEdad } from "@/lib/calcularEdad";
import {
    Document,
    Font,
    Image,
    Page,
    StyleSheet,
    Text,
    View,
    pdf,
} from "@react-pdf/renderer";
import { useState } from "react";
import { useAtencionOdontoStore } from "../store/useAtencionOdontoStore";

export interface DiagnosticoPdf {
    cie10: string;
    diagnostico: string;
}

export interface RecetaPdf {
    des_prod: string;
    cant: string;
    via_apli: string;
    frec: string;
    durac: string;
    comen: string;
}

interface DiagnosticoForm {
    cie10: string;
    diagnostico: string;
    des_dag?: string;
}

interface RecetaForm {
    CDG_ATE?: string;
    des_prod: string;
    cant: string | number;
    frec?: string;
    frecuencia?: string;
    durac?: string;
    via_apli?: string;
    via_aplicacion?: string;
    comen?: string;
}

interface MedicoForm {
    des_med?: string;
    cod_med?: string;
    nombre_medico: string;
    cmp: string;
}

interface FormData {
    codigo_unacem: string;
    codigoAtencion: string;
    nombresApellidos: string;
    especialidad: string;
    dni: string;
    edad: number;
    diagnosticos: DiagnosticoForm[];
    recetas: RecetaForm[];
    datosMedico: MedicoForm;
    alergias?: string;
    recomendaciones?: string;
}

interface PDFRecetaOdontoProps {
    codigoAtencion?: string;
    disabled?: boolean;
    diagnosticos?: DiagnosticoPdf[];
    recetas?: RecetaPdf[];
    alergias?: string;
    recomendaciones?: string;
}

Font.register({
    family: "Roboto",
    fonts: [
        { src: "/fonts/Roboto-Bold.ttf", fontWeight: "bold" },
        { src: "/fonts/Roboto-Regular.ttf", fontWeight: "normal" },
    ],
});

const formatDate = (date: Date) =>
    date.toLocaleDateString("es-PE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

const recetaStyles = StyleSheet.create({
    page: {
        padding: 30,
        paddingBottom: 60,
        fontFamily: "Roboto",
        backgroundColor: "#ffffff",
        position: "relative",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 12,
    },
    logo: {
        width: 150,
        height: 33,
    },
    dateInfo: {
        fontSize: 8,
        textAlign: "right",
        color: "#414D55",
    },
    title: {
        fontSize: 12,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 12,
        color: "#414D55",
    },
    patientInfo: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 10,
        paddingBottom: 8,
        borderBottom: "1.5 solid #ddd",
    },
    infoLabel: {
        fontWeight: "bold",
        color: "#414D55",
        fontSize: 8,
    },
    diagnosisRow: {
        width: "100%",
        marginTop: 2,
        fontSize: 7,
    },
    section: {
        marginTop: 4,
        paddingVertical: 4,
        position: "relative",
        minHeight: 180,
    },
    pageBackground: {
        position: "absolute",
        top: "50%",
        left: "50%",
        width: 300,
        height: 300,
        marginTop: -150,
        marginLeft: -150,
        zIndex: -1,
    },
    sectionTitle: {
        fontSize: 10,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#414D55",
    },
    medicationContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 16,
        position: "relative",
    },
    medicationColumn: {
        flexBasis: "48%",
    },
    medicationItem: {
        marginBottom: 8,
        color: "#414D55",
        textTransform: "uppercase",
        paddingBottom: 6,
    },
    medicationDetails: {
        fontSize: 7,
        marginBottom: 1,
    },
    medicationLabel: {
        fontWeight: "semibold",
        color: "#414D55",
    },
    notesContainer: {
        marginTop: 6,
        flexDirection: "row",
        gap: 8,
    },
    notesBox: {
        flex: 1,
    },
    notesTitle: {
        fontSize: 8,
        fontWeight: "bold",
        marginBottom: 3,
        color: "#414D55",
    },
    notesText: {
        fontSize: 7,
        color: "#414D55",
        minHeight: 26,
        padding: 4,
    },
    signatureContainer: {
        position: "absolute",
        bottom: 70,
        left: 30,
        right: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        textAlign: "center",
    },
    signatureLineWrapper: {
        width: 180,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        paddingVertical: 6,
    },
    signatureLine: {
        width: "100%",
        borderTop: "1 solid #333",
    },
    signatureText: {
        fontSize: 7,
        textAlign: "center",
        color: "#414D55",
        marginTop: 4,
    },
    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 30,
        fontSize: 7,
        backgroundColor: "#0064D2",
        color: "#ffffff",
        width: "100%",
    },
});

const MedicalPrescriptionPage = ({ formData }: { formData: FormData }) => {
    const MAX_PER_COLUMN = 6;
    const MAX_PER_PAGE = MAX_PER_COLUMN * 2;
    const recetaPages: Array<{
        leftColumn: typeof formData.recetas;
        rightColumn: typeof formData.recetas;
    }> = [];

    if (formData.recetas && formData.recetas.length > 0) {
        const recetasValidas = formData.recetas.filter(
            (receta) => receta.des_prod && receta.des_prod.trim() !== "",
        );

        for (let i = 0; i < recetasValidas.length; i += MAX_PER_PAGE) {
            const pageRecetas = recetasValidas.slice(i, i + MAX_PER_PAGE);
            const leftColumn = pageRecetas.filter(
                (_, index) => index % 2 === 0,
            );
            const rightColumn = pageRecetas.filter(
                (_, index) => index % 2 === 1,
            );
            recetaPages.push({ leftColumn, rightColumn });
        }
    } else {
        recetaPages.push({ leftColumn: [], rightColumn: [] });
    }

    return (
        <>
            {recetaPages.map((page, pageIndex) => (
                <Page key={pageIndex} size="A4" style={recetaStyles.page}>
                    <View style={recetaStyles.header}>
                        <View>
                            <Image
                                src="/images/logopdf.png"
                                style={recetaStyles.logo}
                            />
                        </View>
                        <View style={recetaStyles.dateInfo}>
                            <Text>Fecha: {formatDate(new Date())}</Text>
                            <Text>
                                Hora:{" "}
                                {new Date().toLocaleTimeString("es-PE", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </Text>
                        </View>
                    </View>

                    <Text style={recetaStyles.title}>RECETA ODONTOLÓGICA</Text>

                    <View style={recetaStyles.patientInfo}>
                        <View
                            style={{
                                width: "45%",
                                marginBottom: 6,
                                fontSize: 7,
                            }}
                        >
                            <Text>
                                <Text style={recetaStyles.infoLabel}>
                                    Código de atención:{" "}
                                </Text>
                                {formData.codigoAtencion}
                            </Text>
                        </View>
                        <View
                            style={{
                                width: "30%",
                                marginBottom: 6,
                                fontSize: 7,
                            }}
                        >
                            <Text>
                                <Text style={recetaStyles.infoLabel}>
                                    Código:{" "}
                                </Text>
                                {formData.codigo_unacem}
                            </Text>
                        </View>
                        <View
                            style={{
                                width: "25%",
                                marginBottom: 6,
                                fontSize: 7,
                            }}
                        >
                            <Text>
                                <Text style={recetaStyles.infoLabel}>
                                    Fecha:{" "}
                                </Text>
                                {formatDate(new Date())}
                            </Text>
                        </View>
                        <View
                            style={{
                                width: "45%",
                                marginBottom: 6,
                                fontSize: 7,
                            }}
                        >
                            <Text>
                                <Text style={recetaStyles.infoLabel}>
                                    Paciente:{" "}
                                </Text>
                                {formData.nombresApellidos}
                            </Text>
                        </View>
                        <View
                            style={{
                                width: "30%",
                                marginBottom: 6,
                                fontSize: 7,
                            }}
                        >
                            <Text>
                                <Text style={recetaStyles.infoLabel}>
                                    DNI:{" "}
                                </Text>
                                {formData.dni}
                            </Text>
                        </View>
                        <View
                            style={{
                                width: "25%",
                                marginBottom: 6,
                                fontSize: 7,
                            }}
                        >
                            <Text>
                                <Text style={recetaStyles.infoLabel}>
                                    Edad:{" "}
                                </Text>
                                {formData.edad} años
                            </Text>
                        </View>
                        <View
                            style={{
                                width: "45%",
                                marginBottom: 6,
                                fontSize: 7,
                            }}
                        >
                            <Text>
                                <Text style={recetaStyles.infoLabel}>
                                    Especialidad:{" "}
                                </Text>
                                {formData.especialidad}
                            </Text>
                        </View>
                        <View
                            style={{
                                width: "30%",
                                marginBottom: 6,
                                fontSize: 7,
                            }}
                        >
                            <Text>
                                <Text style={recetaStyles.infoLabel}>
                                    Médico:{" "}
                                </Text>
                                {formData.datosMedico.nombre_medico}
                            </Text>
                        </View>
                        <View
                            style={{
                                width: "25%",
                                marginBottom: 6,
                                fontSize: 7,
                            }}
                        >
                            <Text>
                                <Text style={recetaStyles.infoLabel}>
                                    C.O.P.:{" "}
                                </Text>
                                {formData.datosMedico.cmp}
                            </Text>
                        </View>

                        {/* Diagnósticos */}
                        {formData.diagnosticos &&
                            formData.diagnosticos.length > 0 && (
                                <View style={recetaStyles.diagnosisRow}>
                                    <Text style={recetaStyles.infoLabel}>
                                        Diagnósticos:{" "}
                                    </Text>
                                    {formData.diagnosticos.map((diag, i) => (
                                        <Text key={i}>
                                            • [{diag.cie10}] {diag.diagnostico}
                                        </Text>
                                    ))}
                                </View>
                            )}
                    </View>

                    {/* Medicamentos */}
                    <View style={recetaStyles.section}>
                        <Text style={recetaStyles.sectionTitle}>
                            MEDICAMENTOS PRESCRITOS
                        </Text>
                        <View style={recetaStyles.medicationContainer}>
                            <View style={recetaStyles.medicationColumn}>
                                {page.leftColumn.map((item, idx) => (
                                    <View
                                        key={idx}
                                        style={recetaStyles.medicationItem}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 8,
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {idx * 2 + 1}. {item.des_prod} -
                                            Cant: {item.cant}
                                        </Text>
                                        <Text
                                            style={
                                                recetaStyles.medicationDetails
                                            }
                                        >
                                            Vía: {item.via_apli} | Frecuencia:{" "}
                                            {item.frec} | Duración: {item.durac}{" "}
                                            días
                                        </Text>
                                        {item.comen ? (
                                            <Text
                                                style={
                                                    recetaStyles.medicationDetails
                                                }
                                            >
                                                Indicaciones: {item.comen}
                                            </Text>
                                        ) : null}
                                    </View>
                                ))}
                            </View>
                            <View style={recetaStyles.medicationColumn}>
                                {page.rightColumn.map((item, idx) => (
                                    <View
                                        key={idx}
                                        style={recetaStyles.medicationItem}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 8,
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {idx * 2 + 2}. {item.des_prod} -
                                            Cant: {item.cant}
                                        </Text>
                                        <Text
                                            style={
                                                recetaStyles.medicationDetails
                                            }
                                        >
                                            Vía: {item.via_apli} | Frecuencia:{" "}
                                            {item.frec} | Duración: {item.durac}{" "}
                                            días
                                        </Text>
                                        {item.comen ? (
                                            <Text
                                                style={
                                                    recetaStyles.medicationDetails
                                                }
                                            >
                                                Indicaciones: {item.comen}
                                            </Text>
                                        ) : null}
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>

                    {/* Alergias y Recomendaciones */}
                    <View style={recetaStyles.notesContainer}>
                        {formData.alergias ? (
                            <View style={recetaStyles.notesBox}>
                                <Text style={recetaStyles.notesTitle}>
                                    Alergias:
                                </Text>
                                <Text style={recetaStyles.notesText}>
                                    {formData.alergias}
                                </Text>
                            </View>
                        ) : null}
                        {formData.recomendaciones ? (
                            <View style={recetaStyles.notesBox}>
                                <Text style={recetaStyles.notesTitle}>
                                    Recomendaciones:
                                </Text>
                                <Text style={recetaStyles.notesText}>
                                    {formData.recomendaciones}
                                </Text>
                            </View>
                        ) : null}
                    </View>

                    {/* Firma */}
                    <View style={recetaStyles.signatureContainer}>
                        <View style={recetaStyles.signatureLineWrapper}>
                            <View style={recetaStyles.signatureLine} />
                            <Text style={recetaStyles.signatureText}>
                                Firma del Odontólogo
                            </Text>
                            <Text style={{ fontSize: 6, color: "#666" }}>
                                {formData.datosMedico.nombre_medico}
                            </Text>
                        </View>
                        <View style={recetaStyles.signatureLineWrapper}>
                            <View style={recetaStyles.signatureLine} />
                            <Text style={recetaStyles.signatureText}>
                                Firma del Paciente
                            </Text>
                            <Text style={{ fontSize: 6, color: "#666" }}>
                                DNI: {formData.dni}
                            </Text>
                        </View>
                    </View>

                    {/* Footer */}
                    <View style={recetaStyles.footer}>
                        <Text>
                            Lucemedic Salud Ocupacional - Área de Odontología
                        </Text>
                        <Text>
                            Pág. {pageIndex + 1} de {recetaPages.length}
                        </Text>
                    </View>
                </Page>
            ))}
        </>
    );
};

export default function PDFRecetaOdonto({
    codigoAtencion,
    disabled = false,
    diagnosticos = [],
    recetas = [],
    alergias = "",
    recomendaciones = "",
}: PDFRecetaOdontoProps) {
    const [loadingData, setLoadingData] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { datosEvento } = useAtencionOdontoStore();

    const handleGeneratePdf = async () => {
        if (!codigoAtencion && !datosEvento) return;
        setLoadingData(true);
        setError(null);

        try {
            const formData: FormData = {
                codigo_unacem: "ODON-2026",
                codigoAtencion:
                    codigoAtencion || datosEvento?.codigoAtencion || "00000000",
                especialidad: "ODONTOLOGÍA",
                nombresApellidos:
                    datosEvento?.nombrePaciente || "PACIENTE ODONTOLÓGICO",
                dni: datosEvento?.dniPaciente || "--",
                edad: calcularEdad(datosEvento?.fechaNacimiento),
                diagnosticos,
                recetas,
                datosMedico: {
                    nombre_medico:
                        datosEvento?.nombreMedico || "DRA. ODONTÓLOGA",
                    cmp: "COP-12845",
                },
                alergias,
                recomendaciones,
            };

            const blob = await pdf(
                <Document>
                    <MedicalPrescriptionPage formData={formData} />
                </Document>,
            ).toBlob();

            const blobUrl = URL.createObjectURL(blob);
            window.open(blobUrl, "_blank", "noopener,noreferrer");
            setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
        } catch (err) {
            const message =
                err instanceof Error
                    ? err.message
                    : "Error inesperado al generar la receta en PDF.";
            setError(message);
        } finally {
            setLoadingData(false);
        }
    };

    const isDisabled = disabled || loadingData;
    const buttonClasses = `btn w-full border-none rounded-lg text-white font-medium px-4 py-2 shadow-md flex items-center gap-2 transition-colors ${
        loadingData
            ? "bg-brand opacity-80 cursor-wait"
            : isDisabled
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-brand hover:bg-brand/90 cursor-pointer"
    }`;

    return (
        <div className="flex w-44 flex-col items-end gap-2">
            <button
                type="button"
                className={buttonClasses}
                onClick={handleGeneratePdf}
                disabled={isDisabled}
            >
                {loadingData ? (
                    <>
                        <i className="fa-solid fa-spinner fa-spin"></i>
                        Generando PDF...
                    </>
                ) : (
                    <>
                        <i className="fa-solid fa-file-pdf"></i>
                        IMPRIMIR
                    </>
                )}
            </button>
            {error && (
                <span className="text-sm text-red-600 text-right max-w-xs">
                    No se pudo generar el PDF: {error}
                </span>
            )}
        </div>
    );
}
