import React, { useState } from "react";
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

// Registrar fuentes
Font.register({
  family: "Roboto",
  fonts: [
    { src: "/fonts/Roboto-Bold.ttf", fontWeight: "bold" },
    { src: "/fonts/Roboto-Regular.ttf", fontWeight: "normal" },
  ],
});

// Estilos del PDF idénticos a Lucemedic
const styles = StyleSheet.create({
  page: {
    padding: 40,
    paddingBottom: 100,
    fontFamily: "Roboto",
    backgroundColor: "#ffffff",
    position: "relative",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  logo: {
    width: 181,
    height: 40,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#0077B6",
    marginTop: 10,
    marginBottom: 20,
  },
  // Fondo decorativo
  sectionBackground: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 350,
    height: 350,
    marginTop: -175,
    marginLeft: -175,
    zIndex: -1,
  },
  // Fila de información general
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    fontSize: 9,
  },
  infoItem: {
    flexDirection: "row",
    gap: 4,
  },
  label: {
    fontWeight: "bold",
    color: "#333333",
  },
  value: {
    color: "#333333",
  },
  // Secciones
  sectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#333333",
    marginTop: 12,
    marginBottom: 6,
  },
  sectionContent: {
    fontSize: 9,
    color: "#333333",
    marginLeft: 10,
    lineHeight: 1.5,
  },
  // Datos del destino
  destinoRow: {
    flexDirection: "row",
    marginBottom: 5,
    fontSize: 9,
    flexWrap: "wrap",
    gap: 15,
  },
  destinoItem: {
    flexDirection: "row",
    gap: 5,
  },
  // Datos del paciente
  pacienteRow: {
    flexDirection: "row",
    marginBottom: 8,
    fontSize: 9,
    gap: 30,
    flexWrap: "wrap",
  },
  pacienteItem: {
    flexDirection: "row",
    gap: 5,
  },
  // Signos vitales
  signosRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 30,
    marginTop: 8,
    marginBottom: 12,
    fontSize: 9,
    marginLeft: 10,
  },
  signoItem: {
    flexDirection: "row",
    gap: 5,
  },
  signoLabel: {
    fontWeight: "bold",
    color: "#333333",
  },
  signoValue: {
    color: "#333333",
  },
  // Diagnósticos con viñetas
  diagnosticoItem: {
    fontSize: 9,
    color: "#333333",
    marginLeft: 15,
    marginBottom: 3,
  },
  bulletPoint: {
    fontSize: 9,
    color: "#333333",
    marginLeft: 10,
    marginBottom: 3,
  },
  // Tratamientos
  tratamientoItem: {
    fontSize: 9,
    color: "#333333",
    marginLeft: 15,
    marginBottom: 3,
  },
  // Antecedentes
  antecedentesContainer: {
    marginLeft: 10,
  },
  antecedenteItem: {
    fontSize: 9,
    color: "#333333",
    marginBottom: 2,
  },
  // Firma
  firmaContainer: {
    position: "absolute",
    bottom: 40,
    right: 40,
    alignItems: "center",
    width: 220,
  },
  firmaLinea: {
    width: 180,
    borderBottom: "1 solid #333",
    marginBottom: 8,
    height: 30,
  },
  firmaTexto: {
    fontSize: 8,
    color: "#333333",
    textAlign: "left",
    marginBottom: 2,
  },
  firmaNombre: {
    fontWeight: "bold",
  },
});

// Interface para los datos de referencia
export interface DatosReferenciaAPI {
  fecha_actual: string | Date;
  hora_actual: string | Date;
  id_referencia: string;
  departamento: string | null;
  provincia: string | null;
  distrito: string | null;
  ipress: string | null;
  NOMBRE_PERSONA: string | null;
  edad: number | null;
  sexo: string | null;
  natural: string | null;
  enfermedad_actual: string | null;
  patologicos: string | null;
  quirurgicos: string | null;
  traumaticos: string | null;
  toxicologicos: string | null;
  examen_fisico: string | null;
  alergias: string | null;
  medicamentos: string | null;
  otros_antecedentes: string | null;
  presion_sistolica: number | null;
  presion_diastolica: number | null;
  temperatura: number | null;
  frecuencia_respiratoria: number | null;
  frecuencia_cardiaca: number | null;
  saturacion_oxigeno: number | null;
  motivo_referencia: string | null;
  nombre_medico: string | null;
  cmp_medico: string | null;
  especialidad: string | null;
  Diagnosticos: string | null;
  Tratamiento_administrados: string | null;
}

// Datos de prueba (Mock) realistas para Cuidda
export const datosReferenciaMock: DatosReferenciaAPI = {
  fecha_actual: new Date(),
  hora_actual: "10:30",
  id_referencia: "REF-2026-00042",
  departamento: "JUNIN",
  provincia: "TARMA",
  distrito: "TARMA",
  ipress: "HOSPITAL REGIONAL DE TARMA",
  NOMBRE_PERSONA: "MENDOZA FLORES CARLOS ALBERTO",
  edad: 35,
  sexo: "MASCULINO",
  natural: "TARMA",
  enfermedad_actual:
    "Paciente masculino de 35 años acude por cuadro clínico de aproximadamente 3 días de evolución caracterizado por dolor torácico opresivo de moderada intensidad que se irradia a miembro superior izquierdo, disnea progresiva a medianos esfuerzos y diaforesis profusa.",
  patologicos: "HIPERTENSIÓN ARTERIAL CRÓNICA EN TRATAMIENTO",
  quirurgicos: "APENDICECTOMÍA (2018)",
  traumaticos: "FRACTURA DE CLAVÍCULA IZQUIERDA (2015)",
  toxicologicos: "TABAQUISMO OCASIONAL (ÍNDICE PAQUETES/AÑO: 2)",
  alergias: "ALERGIA A LA PENICILINA Y DERIVADOS",
  medicamentos: "LOSARTÁN 50 MG VO CADA 24 HORAS",
  otros_antecedentes: "ANTECEDENTE FAMILIAR DE CARDIOPATÍA ISQUÉMICA EN PADRE",
  examen_fisico:
    "Paciente lúcido, orientado en las 3 esferas, en posición antálgica. Piel pálida y diaforética. Aparato respiratorio: Murmullo vesicular pasa bien en ambos campos pulmonares sin ruidos agregados. Aparato cardiovascular: Ruidos cardíacos rítmicos y regulares, taquicárdico, sin soplos audibles. Abdomen blando, depresible, no doloroso a la palpación.",
  presion_sistolica: 135,
  presion_diastolica: 85,
  temperatura: 36.6,
  frecuencia_respiratoria: 20,
  frecuencia_cardiaca: 88,
  saturacion_oxigeno: 97,
  motivo_referencia:
    "Paciente requiere evaluación cardiológica especializada de emergencia con electrocardiograma de 12 derivaciones, biomarcadores cardíacos seriados (Troponina I) y ecocardiograma doppler para descarte de síndrome coronario agudo.",
  nombre_medico: "DR. JORGE LUIS MONTALVO",
  cmp_medico: "CMP-48921",
  especialidad: "MEDICINA GENERAL / OCUPACIONAL",
  Diagnosticos:
    "[I20.0] ANGINA INESTABLE / [I10] HIPERTENSIÓN ARTERIAL ESENCIAL / [R07.4] DOLOR TORÁCICO NO ESPECIFICADO",
  Tratamiento_administrados:
    "1. Ácido Acetilsalicílico (AAS) 100 mg VO - Dosis de carga administrada.\n2. Monitoreo continuo de signos vitales y reposo absoluto en cama.\n3. Vía periférica permeable con Cloruro de Sodio 0.9% a goteo lento.",
};

// Rangos de presión arterial
const PRESION_RANGES = [
  {
    predicate: (sis: number, dia: number) => sis < 120 && dia < 80,
    label: "Presión Normal",
  },
  {
    predicate: (sis: number, dia: number) =>
      sis >= 120 && sis <= 129 && dia < 80,
    label: "Presión Elevada",
  },
  {
    predicate: (sis: number, dia: number) =>
      (sis >= 130 && sis <= 139) || (dia >= 80 && dia <= 89),
    label: "Hipertensión Etapa 1",
  },
  {
    predicate: (sis: number, dia: number) => sis >= 140 || dia >= 90,
    label: "Hipertensión Etapa 2",
  },
];

const calcularNivelPresion = (
  sistolica: number | null,
  diastolica: number | null,
): string => {
  if (!sistolica || !diastolica || sistolica <= 0 || diastolica <= 0) {
    return "";
  }
  const categoria = PRESION_RANGES.find(({ predicate }) =>
    predicate(sistolica, diastolica),
  );
  return categoria?.label || "";
};

const formatearFecha = (fecha: string | Date | null): string => {
  if (!fecha) return "--";
  try {
    if (fecha instanceof Date) {
      const day = String(fecha.getUTCDate()).padStart(2, "0");
      const month = String(fecha.getUTCMonth() + 1).padStart(2, "0");
      const year = fecha.getUTCFullYear();
      return `${day}/${month}/${year}`;
    }
    const match = fecha.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (match) {
      const [, year, month, day] = match;
      return `${day}/${month}/${year}`;
    }
    const date = new Date(fecha);
    if (!isNaN(date.getTime())) {
      const day = String(date.getUTCDate()).padStart(2, "0");
      const month = String(date.getUTCMonth() + 1).padStart(2, "0");
      const year = date.getUTCFullYear();
      return `${day}/${month}/${year}`;
    }
    return String(fecha);
  } catch {
    return String(fecha);
  }
};

const formatearHora = (hora: string | Date | null): string => {
  if (!hora) return "--";
  try {
    let hours: number;
    let minutes: number;

    if (hora instanceof Date) {
      hours = hora.getUTCHours();
      minutes = hora.getUTCMinutes();
    } else {
      const horaString = String(hora);
      const parts = horaString.split(":");
      if (parts.length < 2) return horaString;

      hours = parseInt(parts[0], 10);
      minutes = parseInt(parts[1], 10);
    }

    if (isNaN(hours) || isNaN(minutes)) return String(hora);

    const ampm = hours >= 12 ? "pm" : "am";
    const hour12 = hours % 12 || 12;
    const minStr = String(minutes).padStart(2, "0");

    return `${hour12}:${minStr} ${ampm}`;
  } catch {
    return String(hora);
  }
};

const esAntecedenteValido = (valor: string | null): boolean => {
  if (!valor) return false;
  const valorLimpio = valor.trim().toUpperCase();
  return (
    valorLimpio !== "" && valorLimpio !== "NINGUNA" && valorLimpio !== "NINGUNO"
  );
};

// Componente del documento PDF con diseño idéntico a Lucemedic
interface PDFReferenciaDocumentProps {
  datos: DatosReferenciaAPI;
}

export const PDFReferenciaDocument = ({
  datos,
}: PDFReferenciaDocumentProps) => {
  const diagnosticos = datos.Diagnosticos
    ? datos.Diagnosticos.split(" / ")
        .map((d) => d.trim())
        .filter(Boolean)
    : [];
  const tratamientosTexto = (datos.Tratamiento_administrados || "").trim();

  const antecedentes: { label: string; valor: string }[] = [];

  if (esAntecedenteValido(datos.patologicos)) {
    antecedentes.push({
      label: "Patológicos",
      valor: datos.patologicos!.trim(),
    });
  }
  if (esAntecedenteValido(datos.quirurgicos)) {
    antecedentes.push({
      label: "Quirúrgicos",
      valor: datos.quirurgicos!.trim(),
    });
  }
  if (esAntecedenteValido(datos.traumaticos)) {
    antecedentes.push({
      label: "Traumáticos",
      valor: datos.traumaticos!.trim(),
    });
  }
  if (esAntecedenteValido(datos.toxicologicos)) {
    antecedentes.push({
      label: "Toxicológicos",
      valor: datos.toxicologicos!.trim(),
    });
  }
  if (esAntecedenteValido(datos.alergias)) {
    antecedentes.push({ label: "Alergias", valor: datos.alergias!.trim() });
  }
  if (esAntecedenteValido(datos.medicamentos)) {
    antecedentes.push({
      label: "Medicamentos",
      valor: datos.medicamentos!.trim(),
    });
  }
  if (esAntecedenteValido(datos.otros_antecedentes)) {
    antecedentes.push({
      label: "Otros",
      valor: datos.otros_antecedentes!.trim(),
    });
  }

  const paText =
    datos.presion_sistolica && datos.presion_diastolica
      ? `${datos.presion_sistolica}/${datos.presion_diastolica}`
      : "--";
  const nivelPresion = calcularNivelPresion(
    datos.presion_sistolica,
    datos.presion_diastolica,
  );
  const paCompleto = nivelPresion ? `${paText} (${nivelPresion})` : paText;

  return (
    <Document title={`Hoja_Referencia_${datos.id_referencia}`}>
      <Page size="A4" style={styles.page}>
        {/* Fondo decorativo de Lucemedic */}
        <Image src="/images/fondopdf.png" style={styles.sectionBackground} />

        {/* Header con logo oficial */}
        <View style={styles.header}>
          <Image src="/images/logopdf.png" style={styles.logo} />
        </View>

        {/* Título */}
        <Text style={styles.title}>HOJA DE REFERENCIA</Text>

        {/* Información general */}
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.label}>N° de referencia: </Text>
            <Text style={styles.value}>
              {datos.id_referencia?.trim() || "--"}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Fecha de atención: </Text>
            <Text style={styles.value}>
              {formatearFecha(datos.fecha_actual)}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Hora de atención: </Text>
            <Text style={styles.value}>{formatearHora(datos.hora_actual)}</Text>
          </View>
        </View>

        {/* I. Datos del destino */}
        <Text style={styles.sectionTitle}>I. DATOS DEL DESTINO:</Text>
        <View style={{ marginLeft: 10 }}>
          <View style={styles.destinoRow}>
            <View style={styles.destinoItem}>
              <Text style={styles.label}>Departamento:</Text>
              <Text style={styles.value}>
                {datos.departamento?.trim() || "--"}
              </Text>
            </View>
            <View style={styles.destinoItem}>
              <Text style={styles.label}>Provincia:</Text>
              <Text style={styles.value}>
                {datos.provincia?.trim() || "--"}
              </Text>
            </View>
            <View style={styles.destinoItem}>
              <Text style={styles.label}>Distrito:</Text>
              <Text style={styles.value}>{datos.distrito?.trim() || "--"}</Text>
            </View>
            <View style={styles.destinoItem}>
              <Text style={styles.label}>IPRESS:</Text>
              <Text style={styles.value}>{datos.ipress?.trim() || "--"}</Text>
            </View>
          </View>
        </View>

        {/* II. Datos del paciente */}
        <Text style={styles.sectionTitle}>II. DATOS DEL PACIENTE:</Text>
        <View style={{ marginLeft: 10 }}>
          <View style={styles.pacienteRow}>
            <View style={styles.pacienteItem}>
              <Text style={styles.label}>Apellidos y Nombres:</Text>
              <Text style={styles.value}>
                {datos.NOMBRE_PERSONA?.trim() || "--"}
              </Text>
            </View>
            <View style={styles.pacienteItem}>
              <Text style={styles.label}>Edad:</Text>
              <Text style={styles.value}>
                {datos.edad != null ? `${datos.edad} años` : "--"}
              </Text>
            </View>
            <View style={styles.pacienteItem}>
              <Text style={styles.label}>Sexo:</Text>
              <Text style={styles.value}>{datos.sexo?.trim() || "--"}</Text>
            </View>
          </View>
          <View style={styles.pacienteRow}>
            <View style={styles.pacienteItem}>
              <Text style={styles.label}>Natural:</Text>
              <Text style={styles.value}>{datos.natural?.trim() || "--"}</Text>
            </View>
          </View>
        </View>

        {/* III. Enfermedad actual */}
        <Text style={styles.sectionTitle}>III. ENFERMEDAD ACTUAL:</Text>
        <Text style={styles.sectionContent}>
          {datos.enfermedad_actual?.trim() || "--"}
        </Text>

        {/* IV. Antecedentes */}
        {antecedentes.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>IV. ANTECEDENTES:</Text>
            <View style={styles.antecedentesContainer}>
              {antecedentes.map((ant, index) => (
                <Text key={index} style={styles.antecedenteItem}>
                  <Text style={styles.label}>{ant.label}: </Text>
                  <Text>{ant.valor}</Text>
                </Text>
              ))}
            </View>
          </>
        )}

        {/* V. Examen físico */}
        {esAntecedenteValido(datos.examen_fisico) && (
          <>
            <Text style={styles.sectionTitle}>V. EXÁMEN FÍSICO:</Text>
            <Text style={styles.sectionContent}>
              {datos.examen_fisico?.trim()}
            </Text>
          </>
        )}

        {/* Signos vitales */}
        <View style={styles.signosRow}>
          <View style={styles.signoItem}>
            <Text style={styles.signoLabel}>P.A:</Text>
            <Text style={styles.signoValue}>{paCompleto}</Text>
          </View>
          {datos.temperatura != null && (
            <View style={styles.signoItem}>
              <Text style={styles.signoLabel}>T:</Text>
              <Text style={styles.signoValue}>{datos.temperatura} C°</Text>
            </View>
          )}
          {datos.frecuencia_respiratoria != null && (
            <View style={styles.signoItem}>
              <Text style={styles.signoLabel}>F.R:</Text>
              <Text style={styles.signoValue}>
                {datos.frecuencia_respiratoria}x'
              </Text>
            </View>
          )}
          {datos.frecuencia_cardiaca != null && (
            <View style={styles.signoItem}>
              <Text style={styles.signoLabel}>F.C:</Text>
              <Text style={styles.signoValue}>
                {datos.frecuencia_cardiaca}x'
              </Text>
            </View>
          )}
          {datos.saturacion_oxigeno != null && (
            <View style={styles.signoItem}>
              <Text style={styles.signoLabel}>SAT O₂:</Text>
              <Text style={styles.signoValue}>{datos.saturacion_oxigeno}%</Text>
            </View>
          )}
        </View>

        {/* VI. Diagnósticos presuntivos */}
        {diagnosticos.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>
              VI. DIAGNÓSTICOS PRESUNTIVOS:
            </Text>
            {diagnosticos.map((diagnostico, index) => (
              <Text key={index} style={styles.bulletPoint}>
                • {diagnostico}
              </Text>
            ))}
          </>
        )}

        {/* VII. Tratamientos administrados */}
        {tratamientosTexto && (
          <>
            <Text style={styles.sectionTitle}>
              VII. TRATAMIENTOS ADMINISTRADOS:
            </Text>
            <Text style={styles.sectionContent}>{tratamientosTexto}</Text>
          </>
        )}

        {/* VIII. Motivo de referencia */}
        {datos.motivo_referencia && (
          <>
            <Text style={styles.sectionTitle}>VIII. MOTIVO DE REFERENCIA:</Text>
            <Text style={styles.sectionContent}>
              {datos.motivo_referencia.trim()}
            </Text>
          </>
        )}

        {/* Firma del médico */}
        <View style={styles.firmaContainer} wrap={false}>
          <View style={styles.firmaLinea} />
          <Text style={styles.firmaTexto}>
            <Text style={styles.firmaNombre}>Firmado por: </Text>
            {datos.nombre_medico?.trim() || "--"}
          </Text>
          {datos.especialidad && (
            <Text style={styles.firmaTexto}>
              <Text style={styles.firmaNombre}>Especialidad: </Text>
              {datos.especialidad.trim()}
            </Text>
          )}
          <Text style={styles.firmaTexto}>
            <Text style={styles.firmaNombre}>C.M.P: </Text>
            {datos.cmp_medico?.trim() || "--"}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export interface PDFReferenciaProps {
  codigoAtencion?: string;
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
  estado?: string;
}

export default function PDFReferencia(props: PDFReferenciaProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePdf = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      // Combinar datos recibidos con el mock de prueba oficial
      const datosCompletos: DatosReferenciaAPI = {
        ...datosReferenciaMock,
        id_referencia:
          props.numeroReferencia ||
          props.codigoAtencion ||
          datosReferenciaMock.id_referencia,
        NOMBRE_PERSONA:
          props.pacienteNombre || datosReferenciaMock.NOMBRE_PERSONA,
        edad: props.edad ?? datosReferenciaMock.edad,
        ipress: props.ipress || datosReferenciaMock.ipress,
        departamento: props.departamento || datosReferenciaMock.departamento,
        enfermedad_actual:
          props.enfermedadActual || datosReferenciaMock.enfermedad_actual,
        motivo_referencia:
          props.motivoReferencia || datosReferenciaMock.motivo_referencia,
        Tratamiento_administrados:
          props.tratamientos &&
          props.tratamientos.length > 0 &&
          props.tratamientos[0]?.producto
            ? props.tratamientos
                .map(
                  (t, i) =>
                    `${i + 1}. ${t.producto} - Vía: ${t.via || "Oral"} (${t.comentarios})`,
                )
                .join("\n")
            : datosReferenciaMock.Tratamiento_administrados,
      };

      const blob = await pdf(
        <PDFReferenciaDocument datos={datosCompletos} />,
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
      setLoading(false);
    }
  };

  const buttonClasses = `flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-colors cursor-pointer ${
    loading
      ? "bg-brand text-white opacity-80 cursor-wait"
      : "bg-brand hover:bg-brand/80 text-white"
  }`;

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={handleGeneratePdf}
        className={buttonClasses}
        disabled={loading}
      >
        {loading ? (
          <>
            <i className="fa-solid fa-spinner fa-spin"></i>
            Generando PDF...
          </>
        ) : (
          <>
            <i className="fa-solid fa-print"></i>
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
