export interface ModuloAcceso {
  id: number;
  label: string;
  href: string;
  icon: string;
  ariaLabel: string;
  description?: string;
}

export const modulosFarmacia: ModuloAcceso[] = [
  {
    id: 1,
    label: "Compras",
    href: "/farmacia/compras",
    icon: "fa-cart-shopping",
    ariaLabel: "Ir a Compras",
    description: "Registro de compras y catálogo de medicamentos.",
  },
  {
    id: 2,
    label: "Ventas",
    href: "/farmacia/ventas",
    icon: "fa-money-bill",
    ariaLabel: "Ir a Ventas",
    description: "Ventas internas y ventas externas con comprobante.",
  },
  {
    id: 3,
    label: "Inventario",
    href: "/farmacia/inventario",
    icon: "fa-warehouse",
    ariaLabel: "Ir a Inventario",
    description:
      "Stock actual, kardex por producto y semáforo de vencimientos.",
  },
  {
    id: 4,
    label: "Informes",
    href: "/farmacia/informes",
    icon: "fa-file-lines",
    ariaLabel: "Ir a Informes",
    description: "Resúmenes consolidados de compras, ventas y medicamentos.",
  },
];

export const submodulosInventario: ModuloAcceso[] = [
  {
    id: 1,
    label: "Stock actual",
    href: "/farmacia/inventario/stock-actual",
    icon: "fa-id-card-clip",
    ariaLabel: "Ir a Stock Actual",
    description: "Consulta de saldos de existencias valorizadas por almacén.",
  },
  {
    id: 2,
    label: "Kardex por Producto",
    href: "/farmacia/inventario/kardex-por-producto",
    icon: "fa-file-lines",
    ariaLabel: "Ir a Kardex por Producto",
    description:
      "Historial cronológico de ingresos, salidas y saldos por ítem.",
  },
  {
    id: 3,
    label: "Semáforo de vencimientos",
    href: "/farmacia/inventario/semaforo-de-vencimientos",
    icon: "fa-traffic-light",
    ariaLabel: "Ir a Semáforo de Vencimientos",
    description: "Control preventivo de lotes por caducar y dados de baja.",
  },
];

export const submodulosInformes: ModuloAcceso[] = [
  {
    id: 1,
    label: "Resumen de compras",
    href: "/farmacia/informes/resumen-compras",
    icon: "fa-cart-shopping",
    ariaLabel: "Ir a Resumen de Compras",
    description: "Reporte de ingresos por proveedor y compras por producto.",
  },
  {
    id: 2,
    label: "Resumen de medicamentos",
    href: "/farmacia/informes/resumen-medicamentos",
    icon: "fa-pills",
    ariaLabel: "Ir a Resumen de Medicamentos",
    description: "Listado maestro con códigos DIGEMID y presentaciones.",
  },
  {
    id: 3,
    label: "Resumen de ventas",
    href: "/farmacia/informes/resumen-ventas",
    icon: "fa-money-bill",
    ariaLabel: "Ir a Resumen de Ventas",
    description:
      "Consolidado de boletas y facturas emitidas por fecha y cliente.",
  },
];

// ──────────────────────────────────────────────
// INVENTARIO - STOCK ACTUAL
// ──────────────────────────────────────────────
export interface StockActualRow {
  id: number;
  codigo: string;
  producto: string;
  unid: string;
  ingresos: number;
  salidas: number;
  stock: number;
  costo: number;
}

export const stockActualRows: StockActualRow[] = [
  {
    id: 1,
    codigo: "MED-00102",
    producto: "PARACETAMOL 500 MG TABLETA",
    unid: "TAB",
    ingresos: 2500,
    salidas: 1200,
    stock: 1300,
    costo: 325.0,
  },
  {
    id: 2,
    codigo: "MED-00105",
    producto: "IBUPROFENO 400 MG TABLETA",
    unid: "TAB",
    ingresos: 1800,
    salidas: 950,
    stock: 850,
    costo: 297.5,
  },
  {
    id: 3,
    codigo: "MED-00140",
    producto: "AMOXICILINA 500 MG CÁPSULA",
    unid: "CAP",
    ingresos: 1200,
    salidas: 750,
    stock: 450,
    costo: 247.5,
  },
  {
    id: 4,
    codigo: "MED-00210",
    producto: "OMEPRAZOL 20 MG CÁPSULA",
    unid: "CAP",
    ingresos: 900,
    salidas: 420,
    stock: 480,
    costo: 216.0,
  },
  {
    id: 5,
    codigo: "MED-00330",
    producto: "LORATADINA 10 MG TABLETA",
    unid: "TAB",
    ingresos: 650,
    salidas: 310,
    stock: 340,
    costo: 153.0,
  },
  {
    id: 6,
    codigo: "MED-00412",
    producto: "AZITROMICINA 500 MG TABLETA RECUBIERTA",
    unid: "TAB",
    ingresos: 400,
    salidas: 210,
    stock: 190,
    costo: 285.0,
  },
  {
    id: 7,
    codigo: "MED-00508",
    producto: "CLORFENAMINA 4 MG TABLETA",
    unid: "TAB",
    ingresos: 1500,
    salidas: 890,
    stock: 610,
    costo: 91.5,
  },
  {
    id: 8,
    codigo: "MED-00620",
    producto: "DEXAMETASONA 4 MG / 2 ML INYECTABLE",
    unid: "AMP",
    ingresos: 350,
    salidas: 180,
    stock: 170,
    costo: 187.0,
  },
];

// ──────────────────────────────────────────────
// INVENTARIO - KARDEX POR PRODUCTO
// ──────────────────────────────────────────────
export interface KardexProductoRow {
  idKardex: number;
  codigo: string;
  fecha: string;
  tipoMovimiento: string;
  clienteProveedor: string;
  docRef: string;
  ingresos: number | "-";
  salidas: number | "-";
  stockAnterior: number;
  stockActual: number;
}

export interface MedicamentoBusquedaOption {
  id: number;
  codigo: string;
  nombre: string;
}

export const medicamentosBusquedaData: MedicamentoBusquedaOption[] = [
  { id: 1, codigo: "MED-00102", nombre: "PARACETAMOL 500 MG TABLETA" },
  { id: 2, codigo: "MED-00105", nombre: "IBUPROFENO 400 MG TABLETA" },
  { id: 3, codigo: "MED-00140", nombre: "AMOXICILINA 500 MG CÁPSULA" },
  { id: 4, codigo: "MED-00210", nombre: "OMEPRAZOL 20 MG CÁPSULA" },
  { id: 5, codigo: "MED-00330", nombre: "LORATADINA 10 MG TABLETA" },
  {
    id: 6,
    codigo: "MED-00412",
    nombre: "AZITROMICINA 500 MG TABLETA RECUBIERTA",
  },
  { id: 7, codigo: "MED-00508", nombre: "CLORFENAMINA 4 MG TABLETA" },
  {
    id: 8,
    codigo: "MED-00620",
    nombre: "DEXAMETASONA 4 MG / 2 ML INYECTABLE",
  },
];

export const kardexRowsData: KardexProductoRow[] = [
  {
    idKardex: 101,
    codigo: "MED-00102",
    fecha: "02/09/2026",
    tipoMovimiento: "COMPRA LOCAL",
    clienteProveedor: "DROGUERÍA PERUANA S.A.C.",
    docRef: "F001-008921",
    ingresos: 1000,
    salidas: "-",
    stockAnterior: 500,
    stockActual: 1500,
  },
  {
    idKardex: 102,
    codigo: "MED-00102",
    fecha: "05/09/2026",
    tipoMovimiento: "VENTA EXTERNA",
    clienteProveedor: "GARCÍA MENDOZA CARLOS",
    docRef: "B002-004510",
    ingresos: "-",
    salidas: 20,
    stockAnterior: 1500,
    stockActual: 1480,
  },
  {
    idKardex: 103,
    codigo: "MED-00102",
    fecha: "09/09/2026",
    tipoMovimiento: "VENTA INTERNA (RECETA)",
    clienteProveedor: "ATENCIÓN MÉDICA OCUPACIONAL",
    docRef: "REC-2026-0391",
    ingresos: "-",
    salidas: 60,
    stockAnterior: 1480,
    stockActual: 1420,
  },
  {
    idKardex: 104,
    codigo: "MED-00102",
    fecha: "14/09/2026",
    tipoMovimiento: "VENTA EXTERNA",
    clienteProveedor: "RODRÍGUEZ PEÑA LUIS",
    docRef: "B002-004555",
    ingresos: "-",
    salidas: 40,
    stockAnterior: 1420,
    stockActual: 1380,
  },
  {
    idKardex: 105,
    codigo: "MED-00102",
    fecha: "20/09/2026",
    tipoMovimiento: "VENTA INTERNA (RECETA)",
    clienteProveedor: "CONSULTA ASISTENCIAL",
    docRef: "REC-2026-0415",
    ingresos: "-",
    salidas: 80,
    stockAnterior: 1380,
    stockActual: 1300,
  },
  {
    idKardex: 106,
    codigo: "MED-00105",
    fecha: "01/09/2026",
    tipoMovimiento: "COMPRA LOCAL",
    clienteProveedor: "DROGUERÍA DEL SUR E.I.R.L.",
    docRef: "F001-009104",
    ingresos: 800,
    salidas: "-",
    stockAnterior: 300,
    stockActual: 1100,
  },
  {
    idKardex: 107,
    codigo: "MED-00105",
    fecha: "07/09/2026",
    tipoMovimiento: "VENTA EXTERNA",
    clienteProveedor: "FARMACIA SAN MARTÍN",
    docRef: "B001-002210",
    ingresos: "-",
    salidas: 150,
    stockAnterior: 1100,
    stockActual: 950,
  },
  {
    idKardex: 108,
    codigo: "MED-00105",
    fecha: "18/09/2026",
    tipoMovimiento: "VENTA INTERNA (RECETA)",
    clienteProveedor: "CONSULTA ASISTENCIAL",
    docRef: "REC-2026-0402",
    ingresos: "-",
    salidas: 100,
    stockAnterior: 950,
    stockActual: 850,
  },
  {
    idKardex: 109,
    codigo: "MED-00140",
    fecha: "03/09/2026",
    tipoMovimiento: "COMPRA LOCAL",
    clienteProveedor: "DROGUERÍA PERUANA S.A.C.",
    docRef: "F001-008987",
    ingresos: 600,
    salidas: "-",
    stockAnterior: 0,
    stockActual: 600,
  },
  {
    idKardex: 110,
    codigo: "MED-00140",
    fecha: "16/09/2026",
    tipoMovimiento: "VENTA INTERNA (RECETA)",
    clienteProveedor: "ATENCIÓN MÉDICA OCUPACIONAL",
    docRef: "REC-2026-0398",
    ingresos: "-",
    salidas: 150,
    stockAnterior: 600,
    stockActual: 450,
  },
  {
    idKardex: 111,
    codigo: "MED-00210",
    fecha: "04/09/2026",
    tipoMovimiento: "COMPRA LOCAL",
    clienteProveedor: "DROGUERÍA DEL SUR E.I.R.L.",
    docRef: "F001-009150",
    ingresos: 700,
    salidas: "-",
    stockAnterior: 260,
    stockActual: 960,
  },
  {
    idKardex: 112,
    codigo: "MED-00210",
    fecha: "22/09/2026",
    tipoMovimiento: "VENTA EXTERNA",
    clienteProveedor: "BOTICA VIRGEN DEL CARMEN",
    docRef: "B003-001145",
    ingresos: "-",
    salidas: 480,
    stockAnterior: 960,
    stockActual: 480,
  },
  {
    idKardex: 113,
    codigo: "MED-00330",
    fecha: "06/09/2026",
    tipoMovimiento: "COMPRA LOCAL",
    clienteProveedor: "DROGUERÍA PERUANA S.A.C.",
    docRef: "F001-009233",
    ingresos: 500,
    salidas: "-",
    stockAnterior: 200,
    stockActual: 700,
  },
  {
    idKardex: 114,
    codigo: "MED-00330",
    fecha: "25/09/2026",
    tipoMovimiento: "VENTA INTERNA (RECETA)",
    clienteProveedor: "CONSULTA ASISTENCIAL",
    docRef: "REC-2026-0421",
    ingresos: "-",
    salidas: 360,
    stockAnterior: 700,
    stockActual: 340,
  },
  {
    idKardex: 115,
    codigo: "MED-00412",
    fecha: "08/09/2026",
    tipoMovimiento: "COMPRA LOCAL",
    clienteProveedor: "DROGUERÍA DEL SUR E.I.R.L.",
    docRef: "F001-009301",
    ingresos: 400,
    salidas: "-",
    stockAnterior: 0,
    stockActual: 400,
  },
  {
    idKardex: 116,
    codigo: "MED-00412",
    fecha: "27/09/2026",
    tipoMovimiento: "VENTA EXTERNA",
    clienteProveedor: "CLÍNICA SAN PABLO",
    docRef: "B001-002388",
    ingresos: "-",
    salidas: 210,
    stockAnterior: 400,
    stockActual: 190,
  },
  {
    idKardex: 117,
    codigo: "MED-00508",
    fecha: "02/09/2026",
    tipoMovimiento: "COMPRA LOCAL",
    clienteProveedor: "DROGUERÍA PERUANA S.A.C.",
    docRef: "F001-009015",
    ingresos: 1200,
    salidas: "-",
    stockAnterior: 300,
    stockActual: 1500,
  },
  {
    idKardex: 118,
    codigo: "MED-00508",
    fecha: "12/09/2026",
    tipoMovimiento: "VENTA EXTERNA",
    clienteProveedor: "BOTICA VIRGEN DEL CARMEN",
    docRef: "B003-001098",
    ingresos: "-",
    salidas: 450,
    stockAnterior: 1500,
    stockActual: 1050,
  },
  {
    idKardex: 119,
    codigo: "MED-00508",
    fecha: "24/09/2026",
    tipoMovimiento: "VENTA INTERNA (RECETA)",
    clienteProveedor: "ATENCIÓN MÉDICA OCUPACIONAL",
    docRef: "REC-2026-0408",
    ingresos: "-",
    salidas: 440,
    stockAnterior: 1050,
    stockActual: 610,
  },
  {
    idKardex: 120,
    codigo: "MED-00620",
    fecha: "05/09/2026",
    tipoMovimiento: "COMPRA LOCAL",
    clienteProveedor: "DROGUERÍA DEL SUR E.I.R.L.",
    docRef: "F001-009177",
    ingresos: 250,
    salidas: "-",
    stockAnterior: 100,
    stockActual: 350,
  },
  {
    idKardex: 121,
    codigo: "MED-00620",
    fecha: "19/09/2026",
    tipoMovimiento: "VENTA INTERNA (RECETA)",
    clienteProveedor: "CONSULTA ASISTENCIAL",
    docRef: "REC-2026-0412",
    ingresos: "-",
    salidas: 180,
    stockAnterior: 350,
    stockActual: 170,
  },
];

// ──────────────────────────────────────────────
// INVENTARIO - SEMÁFORO DE VENCIMIENTOS
// ──────────────────────────────────────────────
export type EstadoVencimiento = "APTO" | "NO APTO";

export interface SemaforoVencimientoRow {
  id: number;
  codigo: string;
  producto: string;
  numeroLote: string;
  fechaVencimiento: string;
  cantidad: number;
  diasRestantes: number;
  estado: EstadoVencimiento;
}

export const semaforoVencimientosRows: SemaforoVencimientoRow[] = [
  {
    id: 1,
    codigo: "MED-00102",
    producto: "PARACETAMOL 500 MG TABLETA",
    numeroLote: "LT-2024-08A",
    fechaVencimiento: "15/12/2027",
    cantidad: 800,
    diasRestantes: 436,
    estado: "APTO",
  },
  {
    id: 2,
    codigo: "MED-00105",
    producto: "IBUPROFENO 400 MG TABLETA",
    numeroLote: "LT-2024-11C",
    fechaVencimiento: "30/10/2026",
    cantidad: 320,
    diasRestantes: 25,
    estado: "APTO",
  },
  {
    id: 3,
    codigo: "MED-00140",
    producto: "AMOXICILINA 500 MG CÁPSULA",
    numeroLote: "LT-2023-09K",
    fechaVencimiento: "15/09/2026",
    cantidad: 150,
    diasRestantes: -20,
    estado: "NO APTO",
  },
  {
    id: 4,
    codigo: "MED-00210",
    producto: "OMEPRAZOL 20 MG CÁPSULA",
    numeroLote: "LT-2024-04F",
    fechaVencimiento: "28/11/2026",
    cantidad: 240,
    diasRestantes: 54,
    estado: "APTO",
  },
  {
    id: 5,
    codigo: "MED-00330",
    producto: "LORATADINA 10 MG TABLETA",
    numeroLote: "LT-2025-01R",
    fechaVencimiento: "20/06/2028",
    cantidad: 340,
    diasRestantes: 624,
    estado: "APTO",
  },
  {
    id: 6,
    codigo: "MED-00620",
    producto: "DEXAMETASONA 4 MG / 2 ML INYECTABLE",
    numeroLote: "LT-2023-07X",
    fechaVencimiento: "01/08/2026",
    cantidad: 65,
    diasRestantes: -65,
    estado: "NO APTO",
  },
];

// ──────────────────────────────────────────────
// INFORMES - RESUMEN DE COMPRAS
// ──────────────────────────────────────────────
export interface ResumenCompraProveedorItem {
  id: number;
  ingreso: string;
  factura: string;
  fecha: string;
  proveedor: string;
  subtotal: number;
  igv: number;
  total: number;
}

export interface ResumenCompraProductoItem {
  id: number;
  ingreso: string;
  factura: string;
  fecha: string;
  proveedor: string;
  producto: string;
  cantidad: number;
  costo: number;
}

export const resumenComprasProveedorData: ResumenCompraProveedorItem[] = [
  {
    id: 1,
    ingreso: "ING-2026-0012",
    factura: "F001-008921",
    fecha: "02/09/2026",
    proveedor: "DROGUERÍA PERUANA S.A.C.",
    subtotal: 1520.0,
    igv: 273.6,
    total: 1793.6,
  },
  {
    id: 2,
    ingreso: "ING-2026-0018",
    factura: "E001-002145",
    fecha: "08/09/2026",
    proveedor: "DISTRIBUIDORA MÉDICA DEL SUR",
    subtotal: 2340.5,
    igv: 421.29,
    total: 2761.79,
  },
  {
    id: 3,
    ingreso: "ING-2026-0024",
    factura: "F003-005612",
    fecha: "16/09/2026",
    proveedor: "FARMACÉUTICA NACIONAL S.A.",
    subtotal: 980.0,
    igv: 176.4,
    total: 1156.4,
  },
  {
    id: 4,
    ingreso: "ING-2026-0031",
    factura: "F002-003418",
    fecha: "25/09/2026",
    proveedor: "LABORATORIOS MEDILAB PERÚ",
    subtotal: 3120.0,
    igv: 561.6,
    total: 3681.6,
  },
];

export const resumenComprasProductoData: ResumenCompraProductoItem[] = [
  {
    id: 1,
    ingreso: "ING-2026-0012",
    factura: "F001-008921",
    fecha: "02/09/2026",
    proveedor: "DROGUERÍA PERUANA S.A.C.",
    producto: "PARACETAMOL 500 MG TABLETA",
    cantidad: 1000,
    costo: 250.0,
  },
  {
    id: 2,
    ingreso: "ING-2026-0012",
    factura: "F001-008921",
    fecha: "02/09/2026",
    proveedor: "DROGUERÍA PERUANA S.A.C.",
    producto: "IBUPROFENO 400 MG TABLETA",
    cantidad: 800,
    costo: 280.0,
  },
  {
    id: 3,
    ingreso: "ING-2026-0018",
    factura: "E001-002145",
    fecha: "08/09/2026",
    proveedor: "DISTRIBUIDORA MÉDICA DEL SUR",
    producto: "AMOXICILINA 500 MG CÁPSULA",
    cantidad: 600,
    costo: 330.0,
  },
  {
    id: 4,
    ingreso: "ING-2026-0024",
    factura: "F003-005612",
    fecha: "16/09/2026",
    proveedor: "FARMACÉUTICA NACIONAL S.A.",
    producto: "OMEPRAZOL 20 MG CÁPSULA",
    cantidad: 500,
    costo: 225.0,
  },
  {
    id: 5,
    ingreso: "ING-2026-0031",
    factura: "F002-003418",
    fecha: "25/09/2026",
    proveedor: "LABORATORIOS MEDILAB PERÚ",
    producto: "AZITROMICINA 500 MG TABLETA RECUBIERTA",
    cantidad: 300,
    costo: 450.0,
  },
];

// ──────────────────────────────────────────────
// INFORMES - RESUMEN DE MEDICAMENTOS
// ──────────────────────────────────────────────
export interface ResumenMedicamentoItem {
  id: number;
  codigoInterno: string;
  codigoDigemid: string;
  producto: string;
  principioActivo: string;
  presentacion: string;
  tipoMedicamento: string;
  requiereReceta: string;
  precioUnit: string | number;
  precioBlister: string | number;
  precioCaja: string | number;
}

export const resumenMedicamentosData: ResumenMedicamentoItem[] = [
  {
    id: 1,
    codigoInterno: "MED-00102",
    codigoDigemid: "DIG-04981",
    producto: "PARACETAMOL 500 MG",
    principioActivo: "PARACETAMOL",
    presentacion: "CAJA X 100 TAB",
    tipoMedicamento: "GENÉRICO",
    requiereReceta: "NO",
    precioUnit: "0.50",
    precioBlister: "5.00",
    precioCaja: "45.00",
  },
  {
    id: 2,
    codigoInterno: "MED-00105",
    codigoDigemid: "DIG-05112",
    producto: "IBUPROFENO 400 MG",
    principioActivo: "IBUPROFENO",
    presentacion: "CAJA X 100 TAB",
    tipoMedicamento: "GENÉRICO",
    requiereReceta: "NO",
    precioUnit: "0.80",
    precioBlister: "8.00",
    precioCaja: "70.00",
  },
  {
    id: 3,
    codigoInterno: "MED-00140",
    codigoDigemid: "DIG-02384",
    producto: "AMOXICILINA 500 MG",
    principioActivo: "AMOXICILINA",
    presentacion: "CAJA X 50 CAP",
    tipoMedicamento: "GENÉRICO",
    requiereReceta: "SÍ",
    precioUnit: "1.20",
    precioBlister: "12.00",
    precioCaja: "55.00",
  },
  {
    id: 4,
    codigoInterno: "MED-00210",
    codigoDigemid: "DIG-06782",
    producto: "OMEPRAZOL 20 MG",
    principioActivo: "OMEPRAZOL",
    presentacion: "CAJA X 30 CAP",
    tipoMedicamento: "GENÉRICO",
    requiereReceta: "NO",
    precioUnit: "1.50",
    precioBlister: "15.00",
    precioCaja: "40.00",
  },
  {
    id: 5,
    codigoInterno: "MED-00330",
    codigoDigemid: "DIG-03415",
    producto: "LORATADINA 10 MG",
    principioActivo: "LORATADINA",
    presentacion: "CAJA X 100 TAB",
    tipoMedicamento: "GENÉRICO",
    requiereReceta: "NO",
    precioUnit: "0.70",
    precioBlister: "7.00",
    precioCaja: "60.00",
  },
  {
    id: 6,
    codigoInterno: "MED-00412",
    codigoDigemid: "DIG-08990",
    producto: "AZITROMICINA 500 MG",
    principioActivo: "AZITROMICINA",
    presentacion: "CAJA X 3 TAB REC",
    tipoMedicamento: "GENÉRICO",
    requiereReceta: "SÍ",
    precioUnit: "3.50",
    precioBlister: "10.50",
    precioCaja: "10.50",
  },
];

// ──────────────────────────────────────────────
// INFORMES - RESUMEN DE VENTAS
// ──────────────────────────────────────────────
export interface ResumenVentaItem {
  id: number;
  numeroComprobante: string;
  fechaVenta: string;
  cliente: string;
  sede: string;
  subTotal: string | number;
  igv: string | number;
  total: string | number;
}

export const resumenVentasData: ResumenVentaItem[] = [
  {
    id: 1,
    numeroComprobante: "B002-004510",
    fechaVenta: "05/09/2026",
    cliente: "GARCÍA MENDOZA CARLOS",
    sede: "Condorcocha",
    subTotal: "42.37",
    igv: "7.63",
    total: "50.00",
  },
  {
    id: 2,
    numeroComprobante: "F002-001205",
    fechaVenta: "07/09/2026",
    cliente: "MINERA LOS ANDES S.A.C.",
    sede: "Condorcocha",
    subTotal: "580.51",
    igv: "104.49",
    total: "685.00",
  },
  {
    id: 3,
    numeroComprobante: "REC-2026-0391",
    fechaVenta: "09/09/2026",
    cliente: "MAMANI CHOQUE JORGE",
    sede: "Conchán",
    subTotal: "28.81",
    igv: "5.19",
    total: "34.00",
  },
  {
    id: 4,
    numeroComprobante: "B002-004555",
    fechaVenta: "14/09/2026",
    cliente: "RODRÍGUEZ PEÑA LUIS",
    sede: "Atocongo",
    subTotal: "67.80",
    igv: "12.20",
    total: "80.00",
  },
  {
    id: 5,
    numeroComprobante: "REC-2026-0415",
    fechaVenta: "20/09/2026",
    cliente: "VÁSQUEZ RÍOS ANA",
    sede: "Condorcocha",
    subTotal: "35.59",
    igv: "6.41",
    total: "42.00",
  },
  {
    id: 6,
    numeroComprobante: "F002-001248",
    fechaVenta: "24/09/2026",
    cliente: "CONSTRUCTORA PACÍFICO S.A.",
    sede: "Villarán",
    subTotal: "940.68",
    igv: "169.32",
    total: "1110.00",
  },
];
