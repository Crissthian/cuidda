import type { StockActualRow } from "@/lib/farmaciaData";
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

interface PDFStockActualProps {
  data: StockActualRow[];
  costoTotalStr: string;
  almacenNombre: string;
  fechaCorte?: string;
  disabled?: boolean;
}

interface StockActualPdfData {
  fechaEmision: string;
  horaEmision: string;
  almacenNombre: string;
  fechaCorte?: string;
  rows: StockActualRow[];
  costoTotalStr: string;
}

Font.register({
  family: "Roboto",
  fonts: [
    { src: "/fonts/Roboto-Bold.ttf", fontWeight: "bold" },
    { src: "/fonts/Roboto-Regular.ttf", fontWeight: "normal" },
  ],
});

const ROWS_PER_PAGE = 15;

const formatDate = (date: Date) =>
  date.toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

const formatTime = (date: Date) =>
  date.toLocaleTimeString("es-PE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

const chunkRows = (rows: StockActualRow[]) => {
  if (!rows.length) {
    return [[]];
  }

  const chunks: StockActualRow[][] = [];
  for (let i = 0; i < rows.length; i += ROWS_PER_PAGE) {
    chunks.push(rows.slice(i, i + ROWS_PER_PAGE));
  }
  return chunks;
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 32,
    paddingHorizontal: 38,
    paddingBottom: 58,
    fontFamily: "Roboto",
    backgroundColor: "#ffffff",
    position: "relative",
  },
  pageBackground: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 400,
    height: 400,
    marginTop: -200,
    marginLeft: -200,
    zIndex: -1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 22,
  },
  logo: {
    width: 178,
    height: 40,
  },
  headerInfo: {
    fontSize: 8,
    color: "#525E68",
    lineHeight: 1.7,
    textAlign: "right",
  },
  title: {
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
    color: "#414D55",
    marginBottom: 10,
    textTransform: "uppercase",
  },
  meta: {
    fontSize: 10,
    color: "#5A6770",
    textAlign: "center",
    marginBottom: 12,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#8994B3",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 6,
    marginBottom: 8,
    alignItems: "center",
  },
  headerText: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#FFFFFF",
    textTransform: "uppercase",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 7,
    paddingHorizontal: 6,
    fontSize: 8,
    color: "#4C5861",
  },
  bodyText: {
    fontSize: 8,
    color: "#4C5861",
  },
  footerSummary: {
    marginTop: 18,
    paddingTop: 14,
    borderTop: "1.5 dashed #C9D3DF",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 24,
    alignItems: "center",
  },
  footerSummaryLabel: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#414D55",
  },
  footerSummaryValue: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#414D55",
    minWidth: 80,
    textAlign: "right",
  },
});

const COLS = {
  item: 42,
  codigo: 76,
  descripcion: 195,
  und: 38,
  ingresos: 56,
  salidas: 52,
  stock: 46,
  costo: 58,
} as const;

const StockActualDocument = ({ data }: { data: StockActualPdfData }) => {
  const pages = chunkRows(data.rows);

  return (
    <Document>
      {pages.map((rows, pageIndex) => {
        const startIndex = pageIndex * ROWS_PER_PAGE;
        const isLastPage = pageIndex === pages.length - 1;

        return (
          <Page key={`stock-page-${pageIndex}`} size="A4" style={styles.page}>
            <Image src="/images/fondopdf.png" style={styles.pageBackground} />

            <View style={styles.header}>
              <Image src="/images/logopdf.png" style={styles.logo} />
              <View style={styles.headerInfo}>
                <Text>Fecha: {data.fechaEmision}</Text>
                <Text>Hora: {data.horaEmision}</Text>
                <Text
                  render={({ pageNumber, totalPages }) =>
                    `Página: ${String(pageNumber).padStart(2, "0")}${
                      totalPages > 1
                        ? ` / ${String(totalPages).padStart(2, "0")}`
                        : ""
                    }`
                  }
                />
              </View>
            </View>

            <Text style={styles.title}>STOCK ACTUAL</Text>
            <Text style={styles.meta}>Almacén: {data.almacenNombre}</Text>
            {data.fechaCorte ? (
              <Text style={styles.meta}>Fecha de corte: {data.fechaCorte}</Text>
            ) : null}

            <View style={styles.tableHeader}>
              <Text style={[styles.headerText, { width: COLS.item }]}>
                ÍTEM
              </Text>
              <Text style={[styles.headerText, { width: COLS.codigo }]}>
                CÓDIGO
              </Text>
              <Text style={[styles.headerText, { width: COLS.descripcion }]}>
                DESCRIPCIÓN
              </Text>
              <Text style={[styles.headerText, { width: COLS.und }]}>UND</Text>
              <Text style={[styles.headerText, { width: COLS.ingresos }]}>
                INGRESOS
              </Text>
              <Text style={[styles.headerText, { width: COLS.salidas }]}>
                SALIDAS
              </Text>
              <Text style={[styles.headerText, { width: COLS.stock }]}>
                STOCK
              </Text>
              <Text style={[styles.headerText, { width: COLS.costo }]}>
                COSTO
              </Text>
            </View>

            {rows.map((row, index) => (
              <View
                key={`stock-row-${row.id}-${index}`}
                style={index % 2 === 1 ? [styles.row] : styles.row}
              >
                <Text
                  style={[
                    styles.bodyText,
                    { width: COLS.item, textAlign: "center" },
                  ]}
                >
                  {startIndex + index + 1}.-
                </Text>
                <Text
                  style={[
                    styles.bodyText,
                    { width: COLS.codigo, textAlign: "center" },
                  ]}
                >
                  {row.codigo}
                </Text>
                <Text
                  style={[
                    styles.bodyText,
                    { width: COLS.descripcion, textAlign: "left" },
                  ]}
                >
                  {String(row.producto || "").toUpperCase()}
                </Text>
                <Text
                  style={[
                    styles.bodyText,
                    { width: COLS.und, textAlign: "center" },
                  ]}
                >
                  {row.unid}
                </Text>
                <Text
                  style={[
                    styles.bodyText,
                    { width: COLS.ingresos, textAlign: "center" },
                  ]}
                >
                  {row.ingresos}
                </Text>
                <Text
                  style={[
                    styles.bodyText,
                    { width: COLS.salidas, textAlign: "center" },
                  ]}
                >
                  {row.salidas}
                </Text>
                <Text
                  style={[
                    styles.bodyText,
                    { width: COLS.stock, textAlign: "center" },
                  ]}
                >
                  {row.stock}
                </Text>
                <Text
                  style={[
                    styles.bodyText,
                    { width: COLS.costo, textAlign: "right" },
                  ]}
                >
                  {row.costo > 0 ? row.costo.toFixed(2) : "-"}
                </Text>
              </View>
            ))}

            {isLastPage ? (
              <View style={styles.footerSummary}>
                <Text style={styles.footerSummaryLabel}>COSTO TOTAL</Text>
                <Text style={styles.footerSummaryValue}>
                  {data.costoTotalStr}
                </Text>
              </View>
            ) : null}
          </Page>
        );
      })}
    </Document>
  );
};

export default function PDFStockActual({
  data,
  costoTotalStr,
  almacenNombre,
  fechaCorte,
  disabled = false,
}: PDFStockActualProps) {
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePdf = async () => {
    if (disabled || loadingPdf || !data.length) {
      return;
    }

    setLoadingPdf(true);
    setError(null);

    try {
      const now = new Date();
      const blob = await pdf(
        <StockActualDocument
          data={{
            fechaEmision: formatDate(now),
            horaEmision: formatTime(now),
            almacenNombre,
            fechaCorte,
            rows: data,
            costoTotalStr,
          }}
        />,
      ).toBlob();

      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, "_blank", "noopener,noreferrer");
      setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "No se pudo generar el PDF.",
      );
    } finally {
      setLoadingPdf(false);
    }
  };

  const buttonClasses = `px-8 py-2 text-sm rounded-lg font-semibold transition-all inline-flex items-center justify-center gap-2 ${
    loadingPdf
      ? "bg-brand text-white opacity-80 cursor-wait"
      : disabled || !data.length
        ? "bg-gray-300 text-text-primary cursor-not-allowed"
        : "bg-brand hover:bg-brand/80 text-white"
  }`;

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={handleGeneratePdf}
        className={buttonClasses}
        disabled={disabled || loadingPdf || !data.length}
      >
        {loadingPdf ? (
          <>
            <i className="fa-solid fa-spinner fa-spin" />
            Generando PDF...
          </>
        ) : (
          <>
            <i className="fa-solid fa-file-pdf" />
            IMPRIMIR
          </>
        )}
      </button>
      {error ? (
        <span className="text-sm text-red-600 text-right max-w-xs">
          No se pudo generar el PDF: {error}
        </span>
      ) : null}
    </div>
  );
}
