import type { KardexProductoRow } from "@/lib/farmaciaData";
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

interface PDFKardexProps {
  data: KardexProductoRow[];
  almacenNombre: string;
  fechaDesde?: string;
  fechaHasta?: string;
  productoNombre?: string;
  disabled?: boolean;
}

interface KardexPdfData {
  fechaEmision: string;
  horaEmision: string;
  almacenNombre: string;
  fechaDesde?: string;
  fechaHasta?: string;
  productoNombre?: string;
  rows: KardexProductoRow[];
  totalIngresos: number;
  totalSalidas: number;
  stockActualFinal: number;
}

Font.register({
  family: "Roboto",
  fonts: [
    { src: "/fonts/Roboto-Bold.ttf", fontWeight: "bold" },
    { src: "/fonts/Roboto-Regular.ttf", fontWeight: "normal" },
  ],
});

const ROWS_PER_PAGE = 14;

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

const toNumber = (value: number | "-") =>
  typeof value === "number" ? value : 0;

const chunkRows = (rows: KardexProductoRow[]) => {
  if (!rows.length) {
    return [[]] as KardexProductoRow[][];
  }

  const chunks: KardexProductoRow[][] = [];
  for (let i = 0; i < rows.length; i += ROWS_PER_PAGE) {
    chunks.push(rows.slice(i, i + ROWS_PER_PAGE));
  }
  return chunks;
};

const formatClienteProveedor = (value: string | null | undefined) => {
  if (!value || value.trim().length === 0) return "-";
  return value.trim().toUpperCase();
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 30,
    paddingHorizontal: 36,
    paddingBottom: 40,
    fontFamily: "Roboto",
    backgroundColor: "#ffffff",
    position: "relative",
  },
  pageBackground: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 380,
    height: 380,
    marginTop: -190,
    marginLeft: -190,
    zIndex: -1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  logo: { width: 160, height: 36 },
  headerInfo: {
    fontSize: 8,
    color: "#525E68",
    lineHeight: 1.8,
    textAlign: "right",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333333",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  metaBold: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
    textTransform: "uppercase",
    lineHeight: 1.6,
  },
  metaNormal: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: 14,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#8994B3",
    borderRadius: 5,
    paddingVertical: 7,
    paddingHorizontal: 4,
    marginBottom: 2,
    alignItems: "center",
  },
  headerText: {
    fontSize: 7,
    fontWeight: "bold",
    color: "#FFFFFF",
    textTransform: "uppercase",
    textAlign: "center",
    lineHeight: 1.4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderBottom: "0.5 solid #E0E6EE",
  },
  cell: {
    fontSize: 8,
    color: "#4C5861",
    textAlign: "center",
  },
  totalesRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    paddingTop: 10,
    borderTop: "1.5 dashed #C9D3DF",
    paddingHorizontal: 4,
  },
  totalesLabel: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#333333",
    textTransform: "uppercase",
    textAlign: "right",
  },
  totalesValue: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
  },
});

// Columnas — retrato A4 (~523pt ancho útil con márgenes de 36 c/u)
const COLS = {
  item: 38,
  codigo: 60,
  fecha: 56,
  tipo: 64,
  cliente: 118,
  docRef: 72,
  ingresos: 46,
  salidas: 42,
  stock: 52,
} as const;

const LABEL_WIDTH =
  COLS.item + COLS.codigo + COLS.fecha + COLS.tipo + COLS.cliente + COLS.docRef;

const KardexDocument = ({ data }: { data: KardexPdfData }) => {
  const pages = chunkRows(data.rows);

  const rangoFecha =
    data.fechaDesde && data.fechaHasta
      ? `DESDE ${data.fechaDesde} HASTA ${data.fechaHasta}`
      : data.fechaDesde
        ? `DESDE ${data.fechaDesde}`
        : data.fechaHasta
          ? `HASTA ${data.fechaHasta}`
          : null;

  return (
    <Document>
      {pages.map((rows, pageIndex) => {
        const startIndex = pageIndex * ROWS_PER_PAGE;
        const isLastPage = pageIndex === pages.length - 1;

        return (
          <Page key={`kardex-page-${pageIndex}`} size="A4" style={styles.page}>
            <Image src="/images/fondopdf.png" style={styles.pageBackground} />

            <View style={styles.header}>
              <Image src="/images/logopdf.png" style={styles.logo} />
              <View style={styles.headerInfo}>
                <Text>Fecha: {data.fechaEmision}</Text>
                <Text>Hora: {data.horaEmision}</Text>
                <Text
                  render={({ pageNumber }) =>
                    `Página: ${String(pageNumber).padStart(2, "0")}`
                  }
                />
              </View>
            </View>

            <Text style={styles.title}>KARDEX</Text>
            <Text style={styles.metaBold}>
              {`ALMACEN ${data.almacenNombre.toUpperCase()}`}
              {rangoFecha ? `\n${rangoFecha}` : ""}
              {data.productoNombre
                ? `\n${data.productoNombre.toUpperCase()}`
                : ""}
            </Text>
            <Text style={styles.metaNormal}> </Text>

            <View style={styles.tableHeader}>
              <Text style={[styles.headerText, { width: COLS.item }]}>
                ÍTEM
              </Text>
              <Text style={[styles.headerText, { width: COLS.codigo }]}>
                CÓDIGO
              </Text>
              <Text style={[styles.headerText, { width: COLS.fecha }]}>
                FECHA DE{"\n"}INGRESO
              </Text>
              <Text style={[styles.headerText, { width: COLS.tipo }]}>
                TIPO DE{"\n"}MOV
              </Text>
              <Text style={[styles.headerText, { width: COLS.cliente }]}>
                CLIENTE
              </Text>
              <Text style={[styles.headerText, { width: COLS.docRef }]}>
                DOC. DE REF.
              </Text>
              <Text style={[styles.headerText, { width: COLS.ingresos }]}>
                INGRESOS
              </Text>
              <Text style={[styles.headerText, { width: COLS.salidas }]}>
                SALIDAS
              </Text>
              <Text style={[styles.headerText, { width: COLS.stock }]}>
                STOCK{"\n"}ACTUAL
              </Text>
            </View>

            {rows.map((row, index) => (
              <View key={`kdx-${row.idKardex}-${index}`} style={styles.row}>
                <Text style={[styles.cell, { width: COLS.item }]}>
                  {startIndex + index + 1}.-
                </Text>
                <Text style={[styles.cell, { width: COLS.codigo }]}>
                  {row.codigo}
                </Text>
                <Text style={[styles.cell, { width: COLS.fecha }]}>
                  {row.fecha}
                </Text>
                <Text style={[styles.cell, { width: COLS.tipo }]}>
                  {row.tipoMovimiento}
                </Text>
                <Text
                  style={[
                    styles.cell,
                    { width: COLS.cliente, textAlign: "left" },
                  ]}
                >
                  {formatClienteProveedor(row.clienteProveedor)}
                </Text>
                <Text style={[styles.cell, { width: COLS.docRef }]}>
                  {row.docRef || "-"}
                </Text>
                <Text style={[styles.cell, { width: COLS.ingresos }]}>
                  {row.ingresos}
                </Text>
                <Text style={[styles.cell, { width: COLS.salidas }]}>
                  {row.salidas}
                </Text>
                <Text style={[styles.cell, { width: COLS.stock }]}>
                  {row.stockActual}
                </Text>
              </View>
            ))}

            {isLastPage ? (
              <View style={styles.totalesRow}>
                <Text style={[styles.totalesLabel, { width: LABEL_WIDTH }]}>
                  TOTALES
                </Text>
                <Text style={[styles.totalesValue, { width: COLS.ingresos }]}>
                  {data.totalIngresos}
                </Text>
                <Text style={[styles.totalesValue, { width: COLS.salidas }]}>
                  {data.totalSalidas}
                </Text>
                <Text style={[styles.totalesValue, { width: COLS.stock }]}>
                  {data.stockActualFinal}
                </Text>
              </View>
            ) : null}
          </Page>
        );
      })}
    </Document>
  );
};

export default function PDFKardexPorProducto({
  data,
  almacenNombre,
  fechaDesde,
  fechaHasta,
  productoNombre,
  disabled = false,
}: PDFKardexProps) {
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePdf = async () => {
    if (disabled || loadingPdf || !data.length) return;

    setLoadingPdf(true);
    setError(null);

    try {
      const now = new Date();
      const totalIngresos = data.reduce(
        (acc, r) => acc + toNumber(r.ingresos),
        0,
      );
      const totalSalidas = data.reduce(
        (acc, r) => acc + toNumber(r.salidas),
        0,
      );
      const stockActualFinal =
        data.length > 0 ? data[data.length - 1].stockActual : 0;

      const blob = await pdf(
        <KardexDocument
          data={{
            fechaEmision: formatDate(now),
            horaEmision: formatTime(now),
            almacenNombre,
            fechaDesde,
            fechaHasta,
            productoNombre,
            rows: data,
            totalIngresos,
            totalSalidas,
            stockActualFinal,
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

  const buttonClasses = `bg-brand hover:bg-brand/90 text-white font-bold py-2 px-8 text-sm rounded-lg transition-colors inline-flex items-center gap-2 ${
    loadingPdf
      ? "opacity-80 cursor-wait"
      : disabled || !data.length
        ? "opacity-50 cursor-not-allowed"
        : ""
  }`;

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={handleGeneratePdf}
        disabled={disabled || loadingPdf || !data.length}
        className={buttonClasses}
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
