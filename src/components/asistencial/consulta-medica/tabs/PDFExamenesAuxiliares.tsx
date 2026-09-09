import React, { useState } from "react";
import { Document, Font, Page, StyleSheet, Text, View, pdf } from "@react-pdf/renderer";
import { categoriasExamenesMock } from "@/lib/consultaMedicaData";

Font.register({
  family: "Roboto",
  fonts: [
    { src: "/fonts/Roboto-Bold.ttf", fontWeight: "bold" },
    { src: "/fonts/Roboto-Regular.ttf", fontWeight: "normal" },
  ],
});

const pdfStyles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Roboto",
    backgroundColor: "#ffffff",
    fontSize: 9,
    color: "#414D55",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1.5,
    borderBottomColor: "#0064d2",
    paddingBottom: 8,
    marginBottom: 15,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0064d2",
  },
  patientBox: {
    backgroundColor: "#f1f5f8",
    padding: 10,
    borderRadius: 6,
    marginBottom: 15,
    fontSize: 9,
  },
  patientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  categoryTitle: {
    fontSize: 10,
    fontWeight: "bold",
    backgroundColor: "#e7e9ef",
    padding: 4,
    marginTop: 8,
    marginBottom: 4,
    color: "#0064d2",
  },
  examItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
    paddingLeft: 8,
  },
  bullet: {
    width: 4,
    height: 4,
    backgroundColor: "#0064d2",
    borderRadius: 2,
    marginRight: 6,
  },
  footer: {
    position: "absolute",
    bottom: 25,
    left: 30,
    right: 30,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
    color: "#8993af",
  },
});

interface PDFExamenesAuxiliaresProps {
  selectedExamenes?: number[];
  codigoAtencion?: string;
  estado?: string;
  pacienteNombre?: string;
  pacienteDni?: string;
}

export default function PDFExamenesAuxiliares({
  selectedExamenes = [],
  codigoAtencion = "",
  estado = "1",
  pacienteNombre = "PACIENTE",
  pacienteDni = "",
}: PDFExamenesAuxiliaresProps) {
  const [generando, setGenerando] = useState(false);

  // Recopilar los exámenes seleccionados agrupados por categoría
  const examenesPorCategoria: {
    categoria: string;
    items: string[];
  }[] = [];

  categoriasExamenesMock.forEach((cat) => {
    const seleccionadosEnCat: string[] = [];
    cat.subcategorias.forEach((sub) => {
      sub.examenes.forEach((ex) => {
        if (selectedExamenes.includes(ex.numero_examen)) {
          seleccionadosEnCat.push(`${ex.descripcion} (${sub.nombre})`);
        }
      });
    });
    if (seleccionadosEnCat.length > 0) {
      examenesPorCategoria.push({
        categoria: cat.nombre,
        items: seleccionadosEnCat,
      });
    }
  });

  const handlePrintPdf = async () => {
    if (generando) return;
    setGenerando(true);

    try {
      const doc = (
        <Document title={`Examenes_Auxiliares_${codigoAtencion}`}>
          <Page size="A4" style={pdfStyles.page}>
            <View style={pdfStyles.header}>
              <View>
                <Text style={pdfStyles.title}>SOLICITUD DE EXÁMENES AUXILIARES</Text>
                <Text style={{ fontSize: 8, color: "#636d73" }}>
                  Lucemedic / Cuidda - Salud Ocupacional y Asistencial
                </Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ fontWeight: "bold" }}>Atención #{codigoAtencion}</Text>
                <Text style={{ fontSize: 8 }}>{new Date().toLocaleDateString("es-PE")}</Text>
              </View>
            </View>

            <View style={pdfStyles.patientBox}>
              <View style={pdfStyles.patientRow}>
                <Text>
                  <Text style={{ fontWeight: "bold" }}>Paciente: </Text>
                  {pacienteNombre}
                </Text>
                <Text>
                  <Text style={{ fontWeight: "bold" }}>DNI: </Text>
                  {pacienteDni}
                </Text>
              </View>
              <View style={pdfStyles.patientRow}>
                <Text>
                  <Text style={{ fontWeight: "bold" }}>Fecha Emisión: </Text>
                  {new Date().toLocaleString("es-PE")}
                </Text>
                <Text>
                  <Text style={{ fontWeight: "bold" }}>Total Solicitados: </Text>
                  {selectedExamenes.length}
                </Text>
              </View>
            </View>

            {examenesPorCategoria.length === 0 ? (
              <Text style={{ padding: 20, textAlign: "center", color: "#8993af" }}>
                No ha seleccionado ningún examen auxiliar para imprimir.
              </Text>
            ) : (
              examenesPorCategoria.map((grupo, idx) => (
                <View key={idx}>
                  <Text style={pdfStyles.categoryTitle}>{grupo.categoria}</Text>
                  {grupo.items.map((item, itemIdx) => (
                    <View key={itemIdx} style={pdfStyles.examItem}>
                      <View style={pdfStyles.bullet} />
                      <Text>{item}</Text>
                    </View>
                  ))}
                </View>
              ))
            )}

            <View style={pdfStyles.footer}>
              <Text>Firma del Médico Tratante / Sello</Text>
              <Text>Cuidda ERP - Hoja de Orden Médica</Text>
            </View>
          </Page>
        </Document>
      );

      const blob = await pdf(doc).toBlob();
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank", "noopener,noreferrer");
      setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch (err) {
      console.error("Error generando PDF de exámenes auxiliares:", err);
    } finally {
      setGenerando(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handlePrintPdf}
      disabled={generando || selectedExamenes.length === 0}
      className={`px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors ${
        selectedExamenes.length === 0
          ? "bg-muted text-white opacity-50 cursor-not-allowed"
          : generando
          ? "bg-brand text-white opacity-80 cursor-wait"
          : "bg-brand text-white hover:bg-primary-hover cursor-pointer"
      }`}
    >
      <i className={`fa-solid ${generando ? "fa-spinner fa-spin" : "fa-print"}`}></i>
      {generando ? "Generando PDF..." : "IMPRIMIR ORDEN DE EXÁMENES"}
    </button>
  );
}
