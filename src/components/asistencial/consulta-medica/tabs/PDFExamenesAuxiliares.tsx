import React, { useState, type ReactElement } from "react";
import {
  Document,
  Font,
  Image,
  Page,
  Path,
  StyleSheet,
  Svg,
  Text,
  View,
  pdf,
} from "@react-pdf/renderer";
import { categoriasExamenesMock } from "@/lib/consultaMedicaData";

interface ExamColumn {
  title?: string;
  items: string[];
}

interface ExamRequestData {
  titulo: string;
  fechaEmision: string;
  horaEmision: string;
  codigoAtencion: string;
  numeroHistoria: string;
  paciente: string;
  dni: string;
  edad: string;
  seccionIzquierda: ExamColumn[];
  seccionDerecha: ExamColumn[];
}

export interface DetalleDiagnosticoPdf {
  cod_dag?: string;
  des_dag: string;
}

export interface DetalleMedicamentoPdf {
  CDG_ATE?: string;
  des_prod: string;
  cant: string;
  frecuencia?: string;
  frec?: string;
  durac?: string;
  via_aplicacion?: string;
  via_apli?: string;
  comen?: string;
}

interface FormData {
  codigo_unacem: string;
  codigoAtencion: string;
  nombresApellidos: string;
  especialidad: string;
  dni: string;
  edad: number;
  diagnosticos: Array<DetalleDiagnosticoPdf>;
  recetas: Array<DetalleMedicamentoPdf>;
  datosMedico: {
    des_med: string;
    cod_med: string;
  };
  recomendaciones?: string;
}

const TITULO_PDF = "SOLICITUD DE EXÁMENES AUXILIARES";
const TITULO_INTERCONSULTAS = "SOLICITUD DE INTERCONSULTAS";
const TITULO_EXAMENES_AUXILIARES = "SOLICITUD DE EXÁMENES AUXILIARES";
const INTERCONSULTAS_KEYWORDS = ["INTERCONSULT"];
const OTROS_EXAMENES_KEYWORDS = ["ECOGRAF", "LABORATOR", "PROCEDIM", "RADIO"];

Font.register({
  family: "Roboto",
  fonts: [
    { src: "/fonts/Roboto-Bold.ttf", fontWeight: "bold" },
    { src: "/fonts/Roboto-Regular.ttf", fontWeight: "normal" },
  ],
});

const sanitizeText = (value?: string | null) => value?.trim() || "";

const formatDate = (date: Date) =>
  date.toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

const formatTime = (date: Date) =>
  date.toLocaleTimeString("es-PE", {
    hour: "2-digit",
    minute: "2-digit",
  });

// Estilos de la Receta Médica idénticos a Lucemedic
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
    minHeight: 200,
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
    fontWeight: "thin",
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
  recommendationsSection: {
    marginTop: 24,
    paddingTop: 24,
  },
  recommendationsTitle: {
    fontSize: 9,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#414D55",
  },
  recommendationsText: {
    fontSize: 9,
    color: "#414D55",
    minHeight: 40,
    padding: 6,
    borderRadius: 4,
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
  signature: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});

// Estilos de la Solicitud de Exámenes idénticos a Lucemedic
const examStyles = StyleSheet.create({
  page: {
    padding: 30,
    paddingBottom: 60,
    fontFamily: "Roboto",
    backgroundColor: "#ffffff",
    position: "relative",
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
  infoRow45: {
    width: "45%",
    marginBottom: 6,
    fontSize: 7,
  },
  infoRowRest: {
    width: "27.5%",
    marginBottom: 6,
    fontSize: 7,
  },
  infoLabel: {
    fontWeight: "bold",
    color: "#414D55",
    fontSize: 8,
  },
  examContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    position: "relative",
    minHeight: 200,
    paddingTop: 4,
  },
  column: {
    flexBasis: "48%",
  },
  columnTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#414D55",
    marginBottom: 8,
  },
  examItem: {
    fontSize: 7,
    color: "#414D55",
    marginBottom: 6,
    textTransform: "uppercase",
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
  signature: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
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
      const leftColumn = pageRecetas.filter((_, index) => index % 2 === 0);
      const rightColumn = pageRecetas.filter((_, index) => index % 2 === 1);
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
              <Image src="/images/logopdf.png" style={recetaStyles.logo} />
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

          <Text style={recetaStyles.title}>RECETA MÉDICA</Text>

          <View style={recetaStyles.patientInfo}>
            <View style={{ width: "45%", marginBottom: 6, fontSize: 7 }}>
              <Text>
                <Text style={recetaStyles.infoLabel}>Código de atención: </Text>
                {formData.codigoAtencion}
              </Text>
            </View>
            <View style={{ width: "30%", marginBottom: 6, fontSize: 7 }}>
              <Text>
                <Text style={recetaStyles.infoLabel}>Codigo: </Text>
                {formData.codigo_unacem}
              </Text>
            </View>
            <View style={{ width: "25%", marginBottom: 6, fontSize: 7 }}>
              <Text>
                <Text style={recetaStyles.infoLabel}>Fecha: </Text>
                {formatDate(new Date())}
              </Text>
            </View>
            <View style={{ width: "45%", marginBottom: 6, fontSize: 7 }}>
              <Text>
                <Text style={recetaStyles.infoLabel}>Paciente: </Text>
                {formData.nombresApellidos}
              </Text>
            </View>
            <View style={{ width: "30%", marginBottom: 6, fontSize: 7 }}>
              <Text>
                <Text style={recetaStyles.infoLabel}>DNI: </Text>
                {formData.dni}
              </Text>
            </View>
            <View style={{ width: "25%", marginBottom: 6, fontSize: 7 }}>
              <Text>
                <Text style={recetaStyles.infoLabel}>Edad: </Text>
                {formData.edad} años
              </Text>
            </View>
            <View style={{ width: "45%", marginBottom: 6, fontSize: 7 }}>
              <Text>
                <Text style={recetaStyles.infoLabel}>Especialidad: </Text>
                {formData.especialidad}
              </Text>
            </View>
            <View style={{ width: "30%", marginBottom: 6, fontSize: 7 }}>
              <Text>
                <Text style={recetaStyles.infoLabel}>Médico: </Text>
                {formData.datosMedico.des_med.split(" ").slice(0, 2).join(" ")}
              </Text>
            </View>
            <View style={{ width: "25%", marginBottom: 6, fontSize: 7 }}>
              <Text>
                <Text style={recetaStyles.infoLabel}>CMP: </Text>
                {formData.datosMedico.cod_med}
              </Text>
            </View>
            <View style={recetaStyles.diagnosisRow}>
              <Text
                style={[
                  recetaStyles.infoLabel,
                  { paddingTop: 1, marginBottom: 2 },
                ]}
              >
                Diagnóstico(s):
              </Text>
              {formData.diagnosticos && formData.diagnosticos.length > 0 ? (
                formData.diagnosticos.map((diagnostico, index) => (
                  <Text
                    key={index}
                    style={{ paddingTop: 2, paddingBottom: 2, fontSize: 8 }}
                  >
                    • {diagnostico.des_dag}
                  </Text>
                ))
              ) : (
                <Text style={{ paddingTop: 2, paddingBottom: 2, fontSize: 7 }}>
                  Sin diagnóstico registrado
                </Text>
              )}
            </View>
          </View>

          {/* Background image centered on full page */}
          <Image
            src="/images/fondopdf.png"
            style={recetaStyles.pageBackground}
          />

          <View style={recetaStyles.section}>
            <Text style={recetaStyles.sectionTitle}>MEDICACIÓN</Text>

            <View style={recetaStyles.medicationContainer}>
              {/* Columna izquierda */}
              <View style={recetaStyles.medicationColumn}>
                {page.leftColumn.length > 0 ? (
                  page.leftColumn.map((receta, index) => (
                    <View
                      key={(receta.CDG_ATE || "rec") + "-left-" + index}
                      style={recetaStyles.medicationItem}
                    >
                      <Text style={recetaStyles.medicationDetails}>
                        <Text style={recetaStyles.medicationLabel}>
                          {pageIndex * MAX_PER_PAGE + index * 2 + 1}.{" "}
                        </Text>
                        <Text style={{ fontWeight: "bold", fontSize: 8 }}>
                          {receta.des_prod?.toUpperCase()?.trim() || "-"}
                        </Text>
                      </Text>
                      <Text style={recetaStyles.medicationDetails}>
                        <Text style={recetaStyles.medicationLabel}>Frec: </Text>
                        {receta.frecuencia?.trim() ||
                          receta.frec?.trim() ||
                          "CADA 8 HORAS"}
                        {"  |  "}
                        <Text style={recetaStyles.medicationLabel}>Dur: </Text>
                        {receta.durac?.trim() || "3"} días
                        {"  |  "}
                        <Text style={recetaStyles.medicationLabel}>Cant: </Text>
                        {receta.cant || "10"}
                        {"  |  "}
                        <Text style={recetaStyles.medicationLabel}>Vía: </Text>
                        {receta.via_aplicacion?.trim() ||
                          receta.via_apli?.trim() ||
                          "ORAL"}
                      </Text>
                      {receta.comen && receta.comen.trim() && (
                        <Text style={recetaStyles.medicationDetails}>
                          <Text style={recetaStyles.medicationLabel}>
                            Ind:{" "}
                          </Text>
                          {receta.comen.toUpperCase()}
                        </Text>
                      )}
                    </View>
                  ))
                ) : (
                  <Text style={recetaStyles.medicationDetails}>
                    No se han registrado medicamentos
                  </Text>
                )}
              </View>

              {/* Columna derecha */}
              <View style={[recetaStyles.medicationColumn, { paddingLeft: 8 }]}>
                {page.rightColumn.map((receta, index) => (
                  <View
                    key={(receta.CDG_ATE || "rec") + "-right-" + index}
                    style={recetaStyles.medicationItem}
                  >
                    <Text style={recetaStyles.medicationDetails}>
                      <Text style={recetaStyles.medicationLabel}>
                        {pageIndex * MAX_PER_PAGE + index * 2 + 2}.{" "}
                      </Text>
                      <Text style={{ fontWeight: "bold", fontSize: 8 }}>
                        {receta.des_prod?.toUpperCase()}
                      </Text>
                    </Text>
                    <Text style={recetaStyles.medicationDetails}>
                      <Text style={recetaStyles.medicationLabel}>Frec: </Text>
                      {receta.frecuencia?.trim() ||
                        receta.frec?.trim() ||
                        "CADA 12 HORAS"}
                      {"  |  "}
                      <Text style={recetaStyles.medicationLabel}>Dur: </Text>
                      {receta.durac?.trim() || "5"} días
                      {"  |  "}
                      <Text style={recetaStyles.medicationLabel}>Cant: </Text>
                      {receta.cant || "5"}
                      {"  |  "}
                      <Text style={recetaStyles.medicationLabel}>Vía: </Text>
                      {receta.via_aplicacion?.trim() ||
                        receta.via_apli?.trim() ||
                        "ORAL"}
                    </Text>
                    {receta.comen && receta.comen.trim() && (
                      <Text style={recetaStyles.medicationDetails}>
                        <Text style={recetaStyles.medicationLabel}>Ind: </Text>
                        {receta.comen.toUpperCase()}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Sección de Recomendaciones Médicas */}
          <View style={recetaStyles.recommendationsSection}>
            <Text style={recetaStyles.recommendationsTitle}>
              RECOMENDACIONES MÉDICAS
            </Text>
            <View style={recetaStyles.recommendationsText}>
              <Text>
                {formData.recomendaciones ||
                  "Reposo relativo por 48 horas. Ingesta abundante de líquidos tibios. Control y seguimiento médico en 7 días."}
              </Text>
            </View>
          </View>

          <View style={recetaStyles.signatureContainer}>
            <View style={recetaStyles.signature}>
              <View style={recetaStyles.signatureLineWrapper}>
                <View style={recetaStyles.signatureLine} />
                <Text style={recetaStyles.signatureText}>
                  Firma del médico tratante
                </Text>
              </View>
            </View>
            <View style={recetaStyles.signature}>
              <View style={recetaStyles.signatureLineWrapper}>
                <View style={recetaStyles.signatureLine} />
                <Text style={recetaStyles.signatureText}>
                  Firma del paciente
                </Text>
              </View>
            </View>
          </View>

          <View style={recetaStyles.footer}>
            <View style={recetaStyles.iconRow}>
              <Svg viewBox="0 0 640 640" style={{ width: 14, height: 14 }}>
                <Path
                  fill={"#ffffff"}
                  d="M224.2 89C216.3 70.1 195.7 60.1 176.1 65.4L170.6 66.9C106 84.5 50.8 147.1 66.9 223.3C104 398.3 241.7 536 416.7 573.1C493 589.3 555.5 534 573.1 469.4L574.6 463.9C580 444.2 569.9 423.6 551.1 415.8L453.8 375.3C437.3 368.4 418.2 373.2 406.8 387.1L368.2 434.3C297.9 399.4 241.3 341 208.8 269.3L253 233.3C266.9 222 271.6 202.9 264.8 186.3L224.2 89z"
                />
              </Svg>
              <Text>{"  "}Sede Tarma: +51 941 386 746</Text>
            </View>
            <View style={recetaStyles.iconRow}>
              <Svg viewBox="0 0 640 640" style={{ width: 14, height: 14 }}>
                <Path
                  fill={"#ffffff"}
                  d="M415.9 344L225 344C227.9 408.5 242.2 467.9 262.5 511.4C273.9 535.9 286.2 553.2 297.6 563.8C308.8 574.3 316.5 576 320.5 576C324.5 576 332.2 574.3 343.4 563.8C354.8 553.2 367.1 535.8 378.5 511.4C398.8 467.9 413.1 408.5 416 344zM224.9 296L415.8 296C413 231.5 398.7 172.1 378.4 128.6C367 104.2 354.7 86.8 343.3 76.2C332.1 65.7 324.4 64 320.4 64C316.4 64 308.7 65.7 297.5 76.2C286.1 86.8 273.8 104.2 262.4 128.6C242.1 172.1 227.8 231.5 224.9 296zM176.9 296C180.4 210.4 202.5 130.9 234.8 78.7C142.7 111.3 74.9 195.2 65.5 296L176.9 296zM65.5 344C74.9 444.8 142.7 528.7 234.8 561.3C202.5 509.1 180.4 429.6 176.9 344L65.5 344zM463.9 344C460.4 429.6 438.3 509.1 406 561.3C498.1 528.6 565.9 444.8 575.3 344L463.9 344zM575.3 296C565.9 195.2 498.1 111.3 406 78.7C438.3 130.9 460.4 210.4 463.9 296L575.3 296z"
                />
              </Svg>
              <Text>{"  "}www.lucemedic.com</Text>
            </View>
          </View>
        </Page>
      ))}
    </>
  );
};

const AuxiliarExamRequest = ({ data }: { data: ExamRequestData }) => (
  <Page size="A4" style={examStyles.page}>
    <Image src="/images/fondopdf.png" style={examStyles.pageBackground} />

    <View style={examStyles.header}>
      <View>
        <Image src="/images/logopdf.png" style={examStyles.logo} />
      </View>
      <View style={examStyles.dateInfo}>
        <Text>Fecha: {data.fechaEmision}</Text>
        <Text>Hora: {data.horaEmision}</Text>
      </View>
    </View>

    <Text style={examStyles.title}>{data.titulo}</Text>

    <View style={examStyles.patientInfo}>
      <View style={examStyles.infoRow45}>
        <Text>
          <Text style={examStyles.infoLabel}>Código de atención: </Text>
          {data.codigoAtencion}
        </Text>
      </View>
      <View style={examStyles.infoRowRest}>
        <Text>
          <Text style={examStyles.infoLabel}>N° de historia: </Text>
          {data.numeroHistoria}
        </Text>
      </View>
      <View style={examStyles.infoRowRest}>
        <Text>
          <Text style={examStyles.infoLabel}>Fecha: </Text>
          {data.fechaEmision}
        </Text>
      </View>
      <View style={examStyles.infoRow45}>
        <Text>
          <Text style={examStyles.infoLabel}>Paciente: </Text>
          {data.paciente}
        </Text>
      </View>
      <View style={examStyles.infoRowRest}>
        <Text>
          <Text style={examStyles.infoLabel}>DNI: </Text>
          {data.dni}
        </Text>
      </View>
      <View style={examStyles.infoRowRest}>
        <Text>
          <Text style={examStyles.infoLabel}>Edad: </Text>
          {data.edad}
        </Text>
      </View>
    </View>

    <View style={examStyles.examContainer}>
      <View style={examStyles.column}>
        {data.seccionIzquierda.map((seccion, idx) => (
          <View key={`left-${idx}`} style={{ marginBottom: 12 }}>
            {seccion.title && (
              <Text style={examStyles.columnTitle}>{seccion.title}</Text>
            )}
            {seccion.items.map((item, itemIdx) => (
              <Text key={`left-item-${itemIdx}`} style={examStyles.examItem}>
                • {item}
              </Text>
            ))}
          </View>
        ))}
      </View>

      <View style={examStyles.column}>
        {data.seccionDerecha.map((seccion, idx) => (
          <View key={`right-${idx}`} style={{ marginBottom: 12 }}>
            {seccion.title && (
              <Text style={examStyles.columnTitle}>{seccion.title}</Text>
            )}
            {seccion.items.map((item, itemIdx) => (
              <Text key={`right-item-${itemIdx}`} style={examStyles.examItem}>
                • {item}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </View>

    <View style={examStyles.signatureContainer}>
      <View style={examStyles.signature}>
        <View style={examStyles.signatureLineWrapper}>
          <View style={examStyles.signatureLine} />
          <Text style={examStyles.signatureText}>
            Firma del médico tratante
          </Text>
        </View>
      </View>
      <View style={examStyles.signature}>
        <View style={examStyles.signatureLineWrapper}>
          <View style={examStyles.signatureLine} />
          <Text style={examStyles.signatureText}>Firma del paciente</Text>
        </View>
      </View>
    </View>

    <View style={examStyles.footer}>
      <View style={examStyles.iconRow}>
        <Svg viewBox="0 0 640 640" style={{ width: 14, height: 14 }}>
          <Path
            fill={"#ffffff"}
            d="M224.2 89C216.3 70.1 195.7 60.1 176.1 65.4L170.6 66.9C106 84.5 50.8 147.1 66.9 223.3C104 398.3 241.7 536 416.7 573.1C493 589.3 555.5 534 573.1 469.4L574.6 463.9C580 444.2 569.9 423.6 551.1 415.8L453.8 375.3C437.3 368.4 418.2 373.2 406.8 387.1L368.2 434.3C297.9 399.4 241.3 341 208.8 269.3L253 233.3C266.9 222 271.6 202.9 264.8 186.3L224.2 89z"
          />
        </Svg>
        <Text>{"  "}Sede Tarma: +51 941 386 746</Text>
      </View>
      <View style={examStyles.iconRow}>
        <Svg viewBox="0 0 640 640" style={{ width: 14, height: 14 }}>
          <Path
            fill={"#ffffff"}
            d="M415.9 344L225 344C227.9 408.5 242.2 467.9 262.5 511.4C273.9 535.9 286.2 553.2 297.6 563.8C308.8 574.3 316.5 576 320.5 576C324.5 576 332.2 574.3 343.4 563.8C354.8 553.2 367.1 535.8 378.5 511.4C398.8 467.9 413.1 408.5 416 344zM224.9 296L415.8 296C413 231.5 398.7 172.1 378.4 128.6C367 104.2 354.7 86.8 343.3 76.2C332.1 65.7 324.4 64 320.4 64C316.4 64 308.7 65.7 297.5 76.2C286.1 86.8 273.8 104.2 262.4 128.6C242.1 172.1 227.8 231.5 224.9 296zM176.9 296C180.4 210.4 202.5 130.9 234.8 78.7C142.7 111.3 74.9 195.2 65.5 296L176.9 296zM65.5 344C74.9 444.8 142.7 528.7 234.8 561.3C202.5 509.1 180.4 429.6 176.9 344L65.5 344zM463.9 344C460.4 429.6 438.3 509.1 406 561.3C498.1 528.6 565.9 444.8 575.3 344L463.9 344zM575.3 296C565.9 195.2 498.1 111.3 406 78.7C438.3 130.9 460.4 210.4 463.9 296L575.3 296z"
          />
        </Svg>
        <Text>{"  "}www.lucemedic.com</Text>
      </View>
    </View>
  </Page>
);

// Particionado de categorías de exámenes
const partitionExamCategories = (
  categories: {
    nombre: string;
    subcategorias: {
      nombre: string;
      examenes: { descripcion: string; orden: number }[];
    }[];
  }[],
) => {
  const auxiliares: typeof categories = [];
  const interconsultas: typeof categories = [];
  const otros: typeof categories = [];

  categories.forEach((categoria) => {
    const nombre = sanitizeText(categoria.nombre).toUpperCase();
    if (INTERCONSULTAS_KEYWORDS.some((k) => nombre.includes(k))) {
      interconsultas.push(categoria);
    } else if (OTROS_EXAMENES_KEYWORDS.some((k) => nombre.includes(k))) {
      otros.push(categoria);
    } else {
      auxiliares.push(categoria);
    }
  });

  return { auxiliares, interconsultas, otros };
};

const buildColumns = (
  categorias: {
    nombre: string;
    subcategorias: {
      nombre: string;
      examenes: { descripcion: string; orden: number }[];
    }[];
  }[],
): { left: ExamColumn[]; right: ExamColumn[]; hasItems: boolean } => {
  if (!categorias.length) {
    return { left: [], right: [], hasItems: false };
  }

  const columns: ExamColumn[] = categorias
    .map((categoria): ExamColumn | null => {
      const todosLosExamenes = categoria.subcategorias
        .flatMap((s) => s.examenes)
        .map((e) => sanitizeText(e.descripcion).toUpperCase())
        .filter(Boolean);

      if (!todosLosExamenes.length) return null;

      return {
        title: sanitizeText(categoria.nombre).toUpperCase(),
        items: todosLosExamenes,
      };
    })
    .filter((col): col is ExamColumn => col !== null);

  if (!columns.length) {
    return { left: [], right: [], hasItems: false };
  }

  const midpoint = Math.ceil(columns.length / 2);
  return {
    left: columns.slice(0, midpoint),
    right: columns.slice(midpoint),
    hasItems: true,
  };
};

export interface PDFExamenesAuxiliaresProps {
  selectedExamenes?: number[];
  codigoAtencion?: string;
  estado?: string;
  pacienteNombre?: string;
  pacienteDni?: string;
}

export default function PDFExamenesAuxiliares({
  selectedExamenes = [],
  codigoAtencion = "00000101",
  estado: _estado = "1",
  pacienteNombre = "MENDOZA FLORES CARLOS ALBERTO",
  pacienteDni = "45892134",
}: PDFExamenesAuxiliaresProps) {
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePdf = async () => {
    setLoadingData(true);
    setError(null);

    try {
      const now = new Date();
      const edadStr = "35 años";

      // 1. Datos de prueba completos para la Receta Médica
      const recetaFormData: FormData = {
        codigo_unacem: "MED-2026-089",
        codigoAtencion: codigoAtencion || "00000101",
        nombresApellidos: pacienteNombre.toUpperCase(),
        especialidad: "MEDICINA GENERAL",
        dni: pacienteDni || "45892134",
        edad: 35,
        diagnosticos: [
          { cod_dag: "J01.0", des_dag: "SINUSITIS MAXILAR AGUDA" },
          { cod_dag: "J00", des_dag: "RINITIS AGUDA (RESFRIADO COMÚN)" },
          { cod_dag: "I10", des_dag: "HIPERTENSIÓN ARTERIAL ESENCIAL" },
        ],
        recetas: [
          {
            des_prod: "AMOXICILINA + ACIDO CLAVULANICO 500/125 MG TABLETA",
            cant: "14",
            via_apli: "ORAL",
            frec: "CADA 8 HORAS",
            durac: "7",
            comen: "TOMAR DESPUÉS DE LOS ALIMENTOS",
          },
          {
            des_prod: "IBUPROFENO 400 MG TABLETA RECUBIERTA",
            cant: "10",
            via_apli: "ORAL",
            frec: "CADA 8 HORAS",
            durac: "3",
            comen: "CONDICIONAL AL DOLOR",
          },
          {
            des_prod: "PARACETAMOL 500 MG TABLETA",
            cant: "10",
            via_apli: "ORAL",
            frec: "CADA 8 HORAS",
            durac: "3",
            comen: "EN CASO DE FIEBRE MAYOR A 38°C",
          },
          {
            des_prod: "CETIRIZINA 10 MG TABLETA",
            cant: "5",
            via_apli: "ORAL",
            frec: "CADA 24 HORAS",
            durac: "5",
            comen: "TOMAR ANTES DE DORMIR",
          },
          {
            des_prod: "CLORURO DE SODIO 0.9% SOLUCION NASAL",
            cant: "1",
            via_apli: "NASAL",
            frec: "CADA 12 HORAS",
            durac: "7",
            comen: "2 APLICACIONES EN CADA FOSA NASAL",
          },
        ],
        datosMedico: {
          des_med: "DR. JORGE LUIS MONTALVO",
          cod_med: "CMP-48921",
        },
        recomendaciones:
          "Reposo relativo por 48 horas. Ingesta abundante de líquidos tibios. Evitar exposición a polvos y cambios bruscos de temperatura. Acudir por emergencia ante signos de alarma.",
      };

      // 2. Filtrar o agrupar exámenes según los seleccionados
      const examenesActivos = categoriasExamenesMock.map((cat) => ({
        nombre: cat.nombre,
        subcategorias: cat.subcategorias.map((sub) => ({
          nombre: sub.nombre,
          examenes: sub.examenes.filter(
            (ex) =>
              selectedExamenes.length === 0 ||
              selectedExamenes.includes(ex.numero_examen),
          ),
        })),
      }));

      // Si no seleccionó ninguno, usar exámenes de prueba completos
      const categoriasAUsar =
        selectedExamenes.length === 0
          ? [
              {
                nombre: "LABORATORIO CLÍNICO",
                subcategorias: [
                  {
                    nombre: "HEMATOLOGÍA",
                    examenes: [
                      {
                        descripcion: "HEMOGRAMA COMPLETO AUTOMATIZADO",
                        orden: 1,
                      },
                      {
                        descripcion:
                          "VELOCIDAD DE SEDIMENTACIÓN GLOBULAR (VSG)",
                        orden: 2,
                      },
                      {
                        descripcion: "PROTEÍNA C REACTIVA CUANTITATIVA",
                        orden: 3,
                      },
                    ],
                  },
                  {
                    nombre: "BIOQUÍMICA",
                    examenes: [
                      { descripcion: "GLUCOSA EN AYUNAS", orden: 4 },
                      { descripcion: "PERFIL LIPÍDICO COMPLETO", orden: 5 },
                      { descripcion: "CREATININA SÉRICA", orden: 6 },
                    ],
                  },
                ],
              },
              {
                nombre: "DIAGNÓSTICO POR IMÁGENES",
                subcategorias: [
                  {
                    nombre: "RADIOLOGÍA",
                    examenes: [
                      { descripcion: "RADIOGRAFÍA DE TÓRAX PA", orden: 7 },
                      {
                        descripcion: "RADIOGRAFÍA DE SENOS PARANASALES",
                        orden: 8,
                      },
                    ],
                  },
                ],
              },
              {
                nombre: "SOLICITUD DE INTERCONSULTAS",
                subcategorias: [
                  {
                    nombre: "ESPECIALIDADES MÉDICAS",
                    examenes: [
                      {
                        descripcion: "EVALUACIÓN POR OTORRINOLARINGOLOGÍA",
                        orden: 9,
                      },
                      { descripcion: "EVALUACIÓN POR CARDIOLOGÍA", orden: 10 },
                    ],
                  },
                ],
              },
            ]
          : examenesActivos;

      const { auxiliares, interconsultas, otros } =
        partitionExamCategories(categoriasAUsar);
      const auxiliaresColumns = buildColumns(auxiliares);
      const interconsultasColumns = buildColumns(interconsultas);
      const otrosColumns = buildColumns(otros);

      const baseRequestData = {
        fechaEmision: formatDate(now),
        horaEmision: formatTime(now),
        codigoAtencion: codigoAtencion || "00000101",
        numeroHistoria: codigoAtencion || "00000101",
        paciente: pacienteNombre.toUpperCase(),
        dni: pacienteDni || "45892134",
        edad: edadStr,
      };

      const paginas: ReactElement[] = [];

      // 1. Receta Médica
      paginas.push(
        <MedicalPrescriptionPage key="receta" formData={recetaFormData} />,
      );

      // 2. Solicitud de Exámenes Auxiliares
      if (auxiliaresColumns.hasItems) {
        paginas.push(
          <AuxiliarExamRequest
            key="auxiliares"
            data={{
              titulo: TITULO_PDF,
              ...baseRequestData,
              seccionIzquierda: auxiliaresColumns.left,
              seccionDerecha: auxiliaresColumns.right,
            }}
          />,
        );
      }

      // 3. Solicitud de Interconsultas
      if (interconsultasColumns.hasItems) {
        paginas.push(
          <AuxiliarExamRequest
            key="interconsultas"
            data={{
              titulo: TITULO_INTERCONSULTAS,
              ...baseRequestData,
              seccionIzquierda: interconsultasColumns.left,
              seccionDerecha: interconsultasColumns.right,
            }}
          />,
        );
      }

      // 4. Otros Exámenes
      if (otrosColumns.hasItems) {
        paginas.push(
          <AuxiliarExamRequest
            key="otros"
            data={{
              titulo: TITULO_EXAMENES_AUXILIARES,
              ...baseRequestData,
              seccionIzquierda: otrosColumns.left,
              seccionDerecha: otrosColumns.right,
            }}
          />,
        );
      }

      const blob = await pdf(
        <Document title={`Documento_Medico_${codigoAtencion}`}>
          {paginas}
        </Document>,
      ).toBlob();
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, "_blank", "noopener,noreferrer");
      setTimeout(() => URL.revokeObjectURL(blobUrl), 60000);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Error inesperado al generar el PDF.";
      setError(message);
    } finally {
      setLoadingData(false);
    }
  };

  const buttonClasses = `px-8 py-2 rounded-lg font-semibold transition-all inline-flex items-center justify-center gap-2 cursor-pointer ${
    loadingData
      ? "bg-brand text-white opacity-80 cursor-wait"
      : "bg-brand hover:bg-brand/80 text-white"
  }`;

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={handleGeneratePdf}
        className={buttonClasses}
        disabled={loadingData}
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
