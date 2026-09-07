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

Font.register({
  family: "Roboto",
  fonts: [
    { src: "/fonts/Roboto-Bold.ttf", fontWeight: "bold" },
    { src: "/fonts/Roboto-Regular.ttf", fontWeight: "normal" },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Roboto",
    backgroundColor: "#ffffff",
    fontSize: 8,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 1,
  },
  logo: {
    width: 120,
    height: 27,
    marginBottom: 8,
  },
  empresaNombre: {
    fontSize: 9,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 2,
  },
  empresaDato: {
    fontSize: 7,
    textAlign: "center",
    color: "#333",
    marginBottom: 4,
  },
  tituloComprobante: {
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 2,
  },
  numeroComprobante: {
    fontSize: 9,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  clienteNombre: {
    fontSize: 9,
    textAlign: "center",
    marginBottom: 1,
  },
  clienteDocumento: {
    fontSize: 9,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  fechaHoraRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  fechaHoraText: {
    fontSize: 8,
  },
  fechaHoraLabel: {
    fontWeight: "bold",
    fontSize: 8,
  },
  separador: {
    borderBottom: "1 solid #333",
    marginVertical: 4,
  },
  separadorPunteado: {
    borderBottom: "1 dashed #999",
    marginVertical: 4,
  },
  tablaHeader: {
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  tablaHeaderText: {
    fontSize: 7,
    fontWeight: "bold",
  },
  colCant: {
    width: "12%",
  },
  colDescripcion: {
    width: "48%",
  },
  colPrecio: {
    width: "20%",
    textAlign: "right",
  },
  colTotal: {
    width: "20%",
    textAlign: "right",
  },
  tablaRow: {
    flexDirection: "row",
    paddingVertical: 3,
    paddingHorizontal: 2,
  },
  tablaRowText: {
    fontSize: 8,
  },
  totalesSection: {
    marginTop: 6,
    paddingHorizontal: 2,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 2,
  },
  totalLabel: {
    fontSize: 8,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 8,
    textAlign: "right",
  },
  totalFinal: {
    fontSize: 12,
    fontWeight: "bold",
  },
  totalFinalLabel: {
    fontSize: 12,
    fontWeight: "bold",
  },
  pagoSection: {
    marginTop: 8,
    paddingHorizontal: 2,
  },
  pagoText: {
    fontSize: 7,
    marginBottom: 2,
  },
  pagoLabel: {
    fontWeight: "bold",
    fontSize: 7,
  },
  footerSection: {
    marginTop: 12,
    alignItems: "center",
  },
  footerText: {
    fontSize: 6,
    textAlign: "center",
    color: "#555",
    marginBottom: 1,
  },
  footerGracias: {
    fontSize: 7,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 6,
  },
});

export interface ComprobanteEmpresaData {
  nombre: string;
  ruc: string;
  direccion: string;
  urbanizacion: string;
  telefono: string;
  correo: string;
  web: string;
}

export interface ComprobanteHeaderData {
  tipo: string;
  numero: string;
}

export interface ComprobanteClienteData {
  nombre: string;
  tipoDocumento: string;
  numeroDocumento: string;
  direccion?: string;
}

export interface ComprobanteFechaHoraData {
  fecha: string;
  hora: string;
}

export interface ComprobanteItemData {
  cantidad: number;
  descripcion: string;
  precio: number;
  total: number;
}

export interface ComprobanteTotalesData {
  subTotal: number;
  igv: number;
  total: number;
  monedaSimbolo?: string;
}

export interface ComprobantePagoData {
  montoLetras: string;
  formaPago: string;
  condVenta: string;
  cajero: string;
  observaciones: string;
}

export interface ComprobantePDFData {
  empresa?: ComprobanteEmpresaData;
  comprobante: ComprobanteHeaderData;
  cliente: ComprobanteClienteData;
  fechaHora: ComprobanteFechaHoraData;
  items: ComprobanteItemData[];
  totales: ComprobanteTotalesData;
  pago: ComprobantePagoData;
}

const defaultEmpresaData: ComprobanteEmpresaData = {
  nombre: "CUIDDA SALUD OCUPACIONAL S.A.C.",
  ruc: "20342440143",
  direccion: "AV. LOS ALAMOS 123",
  urbanizacion: "Urb. Santa Catalina - La Victoria",
  telefono: "Telf: 01 2505 777",
  correo: "Correo: contacto@cuidda.com",
  web: "Web: www.cuidda.com",
};

export const ComprobantePDFDocument = ({
  data,
}: {
  data: ComprobantePDFData;
}) => {
  const empresa = data.empresa || defaultEmpresaData;
  const monedaSimbolo = data.totales.monedaSimbolo || "S/. ";

  return (
    <Document>
      <Page size={[226, 620]} style={styles.page}>
        <View style={styles.headerSection}>
          <Image src="/images/logopdf.png" style={styles.logo} />
        </View>

        <View style={styles.headerSection}>
          <Text style={styles.empresaNombre}>{empresa.nombre}</Text>
          <Text style={styles.empresaDato}>RUC: {empresa.ruc}</Text>
          <Text style={styles.empresaDato}>{empresa.direccion}</Text>
          <Text style={styles.empresaDato}>{empresa.urbanizacion}</Text>
          <Text style={styles.empresaDato}>{empresa.telefono}</Text>
          <Text style={styles.empresaDato}>{empresa.correo}</Text>
          <Text style={styles.empresaDato}>{empresa.web}</Text>
        </View>

        <Text style={styles.tituloComprobante}>{data.comprobante.tipo}</Text>
        <Text style={styles.numeroComprobante}>
          {data.comprobante.numero.toUpperCase()}
        </Text>

        {data.cliente.nombre.trim() && data.cliente.numeroDocumento.trim() ? (
          <>
            <Text style={styles.clienteNombre}>
              {data.cliente.nombre.toUpperCase()}
            </Text>
            <Text style={styles.clienteDocumento}>
              {data.cliente.tipoDocumento.toUpperCase()}:{" "}
              {data.cliente.numeroDocumento.toUpperCase()}
            </Text>
            {data.comprobante.tipo.toUpperCase().includes("FACTURA") &&
              data.cliente.direccion?.trim() && (
                <Text style={styles.empresaDato}>
                  DIRECCION: {data.cliente.direccion.toUpperCase()}
                </Text>
              )}
          </>
        ) : null}

        <View style={styles.fechaHoraRow}>
          <Text style={styles.fechaHoraText}>
            <Text style={styles.fechaHoraLabel}>FECHA: </Text>
            {data.fechaHora.fecha}
          </Text>
          <Text style={styles.fechaHoraText}>
            <Text style={styles.fechaHoraLabel}>HORA: </Text>
            {data.fechaHora.hora}
          </Text>
        </View>

        <View style={styles.separador} />
        <View style={styles.tablaHeader}>
          <Text style={[styles.tablaHeaderText, styles.colCant]}>CANT.</Text>
          <Text style={[styles.tablaHeaderText, styles.colDescripcion]}>
            DESCRIPCION
          </Text>
          <Text style={[styles.tablaHeaderText, styles.colPrecio]}>PRECIO</Text>
          <Text style={[styles.tablaHeaderText, styles.colTotal]}>TOTAL</Text>
        </View>
        <View style={styles.separador} />

        {data.items.map((item, index) => (
          <View key={`${item.descripcion}-${index}`} style={styles.tablaRow}>
            <Text style={[styles.tablaRowText, styles.colCant]}>
              {item.cantidad}
            </Text>
            <Text style={[styles.tablaRowText, styles.colDescripcion]}>
              {item.descripcion}
            </Text>
            <Text style={[styles.tablaRowText, styles.colPrecio]}>
              {item.precio.toFixed(2)}
            </Text>
            <Text style={[styles.tablaRowText, styles.colTotal]}>
              {item.total.toFixed(2)}
            </Text>
          </View>
        ))}

        <View style={styles.separadorPunteado} />

        <View style={styles.totalesSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>SUB TOTAL</Text>
            <Text style={styles.totalValue}>
              {monedaSimbolo}
              {data.totales.subTotal.toFixed(2)}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>IGV (18%)</Text>
            <Text style={styles.totalValue}>
              {monedaSimbolo}
              {data.totales.igv.toFixed(2)}
            </Text>
          </View>
          <View style={[styles.totalRow, { marginTop: 2 }]}>
            <Text style={styles.totalFinalLabel}>TOTAL</Text>
            <Text style={styles.totalFinal}>
              {monedaSimbolo}
              {data.totales.total.toFixed(2)}
            </Text>
          </View>
        </View>

        <View style={styles.separador} />

        <View style={styles.pagoSection}>
          <Text style={styles.pagoText}>
            <Text style={styles.pagoLabel}>SON: </Text>
            {data.pago.montoLetras}
          </Text>
          <Text style={styles.pagoText}>
            <Text style={styles.pagoLabel}>FORMA DE PAGO: </Text>
            {data.pago.formaPago}
          </Text>
          <Text style={styles.pagoText}>
            <Text style={styles.pagoLabel}>COND. VENTA: </Text>
            {data.pago.condVenta}
          </Text>
          <Text style={styles.pagoText}>
            <Text style={styles.pagoLabel}>CAJERO: </Text>
            {data.pago.cajero}
          </Text>
          <Text style={styles.pagoText}>
            <Text style={styles.pagoLabel}>OBSERVACIONES:</Text>
            {data.pago.observaciones
              ? ` ${data.pago.observaciones.toUpperCase()}`
              : ""}
          </Text>
        </View>

        <View style={styles.footerSection}>
          <Text style={styles.footerText}>
            Representacion impresa del comprobante electronico.
          </Text>
          <Text style={styles.footerGracias}>
            *** GRACIAS POR SU VISITA ***
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export const generarPDFComprobante = async (data: ComprobantePDFData) => {
  const blob = await pdf(<ComprobantePDFDocument data={data} />).toBlob();
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank", "noopener,noreferrer");
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
};

export default ComprobantePDFDocument;
