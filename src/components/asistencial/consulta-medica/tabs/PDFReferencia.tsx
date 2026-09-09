import React, { useState } from "react";
import { Document, Font, Page, StyleSheet, Text, View, pdf } from "@react-pdf/renderer";

Font.register({
  family: "Roboto",
  fonts: [
    { src: "/fonts/Roboto-Bold.ttf", fontWeight: "bold" },
    { src: "/fonts/Roboto-Regular.ttf", fontWeight: "normal" },
  ],
});

const pdfStyles = StyleSheet.create({
  page: {
    padding: 35,
    fontFamily: "Roboto",
    backgroundColor: "#ffffff",
    fontSize: 9,
    color: "#414D55",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#0064d2",
    paddingBottom: 8,
    marginBottom: 15,
  },
  title: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#0064d2",
  },
  box: {
    backgroundColor: "#f1f5f8",
    padding: 8,
    borderRadius: 5,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#0064d2",
    marginBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#a2c0d4",
    paddingBottom: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 35,
    right: 35,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
  },
});

interface PDFReferenciaProps {
  numeroReferencia?: string;
  pacienteNombre?: string;
  pacienteDni?: string;
  edad?: number;
  ipress?: string;
  departamento?: string;
  motivoReferencia?: string;
  enfermedadActual?: string;
  esAccidente?: string;
  tratamientos?: Array<{ producto: string; via: string; comentarios: string }>;
  codigoAtencion?: string;
  estado?: string;
}

export default function PDFReferencia(props: PDFReferenciaProps) {
  const {
    numeroReferencia = "00000042",
    pacienteNombre = "QUISPE ROJAS JUAN CARLOS",
    pacienteDni = "45892314",
    edad = 34,
    ipress = "HOSPITAL NACIONAL EDGARDO REBAGLIATI",
    departamento = "LIMA",
    motivoReferencia = "Evaluación y manejo especializado.",
    enfermedadActual = "Paciente presenta dolor torácico opresivo de inicio súbito.",
    esAccidente = "2",
    tratamientos = [],
  } = props;
  const [loading, setLoading] = useState(false);

  const handlePrint = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const doc = (
        <Document title={`Hoja_Referencia_${numeroReferencia}`}>
          <Page size="A4" style={pdfStyles.page}>
            <View style={pdfStyles.header}>
              <View>
                <Text style={pdfStyles.title}>HOJA DE REFERENCIA MÉDICA</Text>
                <Text style={{ fontSize: 8, color: "#636d73" }}>
                  SISTEMA DE REFERENCIA Y CONTRARREFERENCIA
                </Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ fontWeight: "bold" }}>N° Ref: {numeroReferencia}</Text>
                <Text style={{ fontSize: 8 }}>{new Date().toLocaleDateString("es-PE")}</Text>
              </View>
            </View>

            <View style={pdfStyles.box}>
              <Text style={pdfStyles.sectionTitle}>1. DATOS DEL PACIENTE</Text>
              <View style={pdfStyles.row}>
                <Text>
                  <Text style={{ fontWeight: "bold" }}>Nombres y Apellidos: </Text>
                  {pacienteNombre}
                </Text>
                <Text>
                  <Text style={{ fontWeight: "bold" }}>DNI: </Text>
                  {pacienteDni}
                </Text>
              </View>
              <View style={pdfStyles.row}>
                <Text>
                  <Text style={{ fontWeight: "bold" }}>Edad: </Text>
                  {edad ? `${edad} años` : "-"}
                </Text>
                <Text>
                  <Text style={{ fontWeight: "bold" }}>¿Es Accidente?: </Text>
                  {esAccidente === "1" ? "SÍ" : "NO"}
                </Text>
              </View>
            </View>

            <View style={pdfStyles.box}>
              <Text style={pdfStyles.sectionTitle}>2. DESTINO DE LA REFERENCIA</Text>
              <View style={pdfStyles.row}>
                <Text>
                  <Text style={{ fontWeight: "bold" }}>IPRESS de Destino: </Text>
                  {ipress || "CENTRO HOSPITALARIO DE REFERENCIA"}
                </Text>
                <Text>
                  <Text style={{ fontWeight: "bold" }}>Región / Dpto: </Text>
                  {departamento || "LIMA"}
                </Text>
              </View>
            </View>

            <View style={pdfStyles.box}>
              <Text style={pdfStyles.sectionTitle}>3. RESUMEN CLÍNICO Y MOTIVO</Text>
              <Text style={{ fontWeight: "bold", marginBottom: 2 }}>Enfermedad Actual:</Text>
              <Text style={{ marginBottom: 6 }}>
                {enfermedadActual || "Sin detalle registrado."}
              </Text>
              <Text style={{ fontWeight: "bold", marginBottom: 2 }}>Motivo de la Referencia:</Text>
              <Text>{motivoReferencia || "Evaluación y manejo especializado."}</Text>
            </View>

            <View style={pdfStyles.box}>
              <Text style={pdfStyles.sectionTitle}>4. TRATAMIENTO INICIAL ADMINISTRADO</Text>
              {tratamientos.length === 0 || !tratamientos[0]?.producto ? (
                <Text>Ningún fármaco administrado previo al traslado.</Text>
              ) : (
                tratamientos.map((t, i) => (
                  <Text key={i} style={{ marginBottom: 2 }}>
                    • {t.producto} - Vía: {t.via || "Oral"} ({t.comentarios})
                  </Text>
                ))
              )}
            </View>

            <View style={pdfStyles.footer}>
              <Text>Firma y Sello del Médico que Refiere</Text>
              <Text>Firma y Sello del Médico Receptor</Text>
            </View>
          </Page>
        </Document>
      );

      const blob = await pdf(doc).toBlob();
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank", "noopener,noreferrer");
      setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch (err) {
      console.error("Error generando PDF de referencia:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handlePrint}
      disabled={loading}
      className={`px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors ${
        loading
          ? "bg-brand text-white opacity-80 cursor-wait"
          : "bg-brand text-white hover:bg-primary-hover cursor-pointer"
      }`}
    >
      <i className={`fa-solid ${loading ? "fa-spinner fa-spin" : "fa-print"}`}></i>
      {loading ? "Generando PDF..." : "IMPRIMIR HOJA DE REFERENCIA"}
    </button>
  );
}
