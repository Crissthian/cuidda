import {
  resumenComprasProductoData,
  resumenComprasProveedorData,
} from "@/lib/farmaciaData";
import { SEDES } from "@/lib/sedes";
import ExcelJS from "exceljs";
import FileSaver from "file-saver";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const gridTemplateColumnsProveedor = "40px repeat(3, 1fr) 2fr repeat(3, 1fr)";
const gridTemplateColumnsProducto =
  "40px repeat(3, 1fr) 2fr 2fr repeat(2, 1fr)";

const COLUMNS_PROVEEDOR = [
  { label: "", key: "action" },
  { label: "N° DE INGRESO", key: "ingreso" },
  { label: "N° DE FACTURA", key: "factura" },
  { label: "FECHA DE INGRESO", key: "fecha" },
  { label: "PROVEEDOR", key: "proveedor" },
  { label: "SUB TOTAL", key: "subtotal" },
  { label: "I.G.V.", key: "igv" },
  { label: "TOTAL", key: "total" },
];

const COLUMNS_PRODUCTO = [
  { label: "", key: "action" },
  { label: "N° DE INGRESO", key: "ingreso" },
  { label: "N° DE FACTURA", key: "factura" },
  { label: "FECHA DE INGRESO", key: "fecha" },
  { label: "PROVEEDOR", key: "proveedor" },
  { label: "PRODUCTO", key: "producto" },
  { label: "CANTIDAD", key: "cantidad" },
  { label: "COSTO", key: "costo" },
];

export const ResumenCompras = () => {
  const [activeTab, setActiveTab] = useState<"proveedor" | "producto">(
    "proveedor",
  );
  const [almacenProv, setAlmacenProv] = useState<string>(SEDES[0] ?? "");
  const [almacenProd, setAlmacenProd] = useState<string>(SEDES[0] ?? "");
  const [fechaDesdeProv, setFechaDesdeProv] = useState<string>("2026-09-01");
  const [fechaHastaProv, setFechaHastaProv] = useState<string>("2026-09-30");
  const [proveedorVal, setProveedorVal] = useState<string>("");
  const [productoVal, setProductoVal] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 100;

  const currentAlmacen = activeTab === "proveedor" ? almacenProv : almacenProd;

  const filteredProveedor = useMemo(() => {
    return resumenComprasProveedorData.filter((item) => {
      if (!proveedorVal.trim()) return true;
      return item.proveedor.toLowerCase().includes(proveedorVal.toLowerCase());
    });
  }, [proveedorVal]);

  const filteredProducto = useMemo(() => {
    return resumenComprasProductoData.filter((item) => {
      if (!productoVal.trim()) return true;
      return item.producto.toLowerCase().includes(productoVal.toLowerCase());
    });
  }, [productoVal]);

  const TABLE_DATA =
    activeTab === "proveedor" ? filteredProveedor : filteredProducto;
  const COLUMNS =
    activeTab === "proveedor" ? COLUMNS_PROVEEDOR : COLUMNS_PRODUCTO;
  const gridTemplateColumns =
    activeTab === "proveedor"
      ? gridTemplateColumnsProveedor
      : gridTemplateColumnsProducto;

  const totalRegistros = TABLE_DATA.length;
  const totalPages = Math.max(1, Math.ceil(totalRegistros / pageSize));

  const handlePreviousPage = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNextPage = () =>
    setCurrentPage((p) => Math.min(totalPages, p + 1));

  const handleSearch = () => {
    setCurrentPage(1);
    toast.success("Búsqueda de compras actualizada.");
  };

  const handleExport = async () => {
    if (!currentAlmacen) {
      toast.error(
        "Debe seleccionar una sede para exportar el resumen de compras",
      );
      return;
    }

    if (TABLE_DATA.length === 0) {
      toast.error("No hay datos para exportar");
      return;
    }

    try {
      const workbook = new ExcelJS.Workbook();
      const sheetName =
        activeTab === "proveedor"
          ? "Resumen por Proveedor"
          : "Resumen por Producto";
      const worksheet = workbook.addWorksheet(sheetName);

      if (activeTab === "proveedor") {
        worksheet.columns = [
          { header: "N° DE INGRESO", key: "ingreso", width: 15 },
          { header: "N° DE FACTURA", key: "factura", width: 15 },
          { header: "FECHA DE INGRESO", key: "fecha", width: 20 },
          { header: "PROVEEDOR", key: "proveedor", width: 40 },
          { header: "SUB TOTAL", key: "subtotal", width: 15 },
          { header: "I.G.V.", key: "igv", width: 15 },
          { header: "TOTAL", key: "total", width: 15 },
        ];

        filteredProveedor.forEach((item) => {
          worksheet.addRow({
            ingreso: item.ingreso,
            factura: item.factura,
            fecha: item.fecha,
            proveedor: item.proveedor,
            subtotal: item.subtotal,
            igv: item.igv,
            total: item.total,
          });
        });
      } else {
        worksheet.columns = [
          { header: "N° DE INGRESO", key: "ingreso", width: 15 },
          { header: "N° DE FACTURA", key: "factura", width: 15 },
          { header: "FECHA DE INGRESO", key: "fecha", width: 20 },
          { header: "PROVEEDOR", key: "proveedor", width: 40 },
          { header: "PRODUCTO", key: "producto", width: 40 },
          { header: "CANTIDAD", key: "cantidad", width: 15 },
          { header: "COSTO", key: "costo", width: 15 },
        ];

        filteredProducto.forEach((item) => {
          worksheet.addRow({
            ingreso: item.ingreso,
            factura: item.factura,
            fecha: item.fecha,
            proveedor: item.proveedor,
            producto: item.producto,
            cantidad: item.cantidad,
            costo: item.costo,
          });
        });
      }

      const headerRow = worksheet.getRow(1);
      headerRow.height = 25;
      headerRow.eachCell((cell) => {
        cell.font = { bold: true, color: { argb: "FFFFFF" }, size: 11 };
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "0070C0" },
        };
        cell.alignment = { vertical: "middle", horizontal: "center" };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });

      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
          row.eachCell((cell) => {
            cell.border = {
              top: { style: "thin" },
              left: { style: "thin" },
              bottom: { style: "thin" },
              right: { style: "thin" },
            };
            cell.alignment = {
              vertical: "middle",
              wrapText: true,
              horizontal: "left",
            };

            const colIndex = Number(cell.col);
            if (
              activeTab === "proveedor" &&
              [1, 2, 3, 5, 6, 7].includes(colIndex)
            ) {
              cell.alignment = { ...cell.alignment, horizontal: "center" };
            } else if (
              activeTab === "producto" &&
              [1, 2, 3, 6, 7].includes(colIndex)
            ) {
              cell.alignment = { ...cell.alignment, horizontal: "center" };
            }
          });
        }
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const title =
        activeTab === "proveedor"
          ? "Resumen_Compras_Proveedor"
          : "Resumen_Compras_Producto";
      FileSaver.saveAs(
        blob,
        `${title}_${new Date().toISOString().split("T")[0]}.xlsx`,
      );

      toast.success("Excel exportado correctamente");
    } catch {
      toast.error("Hubo un error al exportar el archivo");
    }
  };

  return (
    <div className="w-full">
      {/* Top Toggles */}
      <div className="mb-4 inline-flex rounded-xl bg-muted-20 p-2 gap-4">
        <button
          type="button"
          onClick={() => {
            setActiveTab("proveedor");
            setCurrentPage(1);
          }}
          className={`rounded-lg px-12 py-2 text-sm font-semibold transition-colors ${
            activeTab === "proveedor"
              ? "bg-brand text-white shadow-sm hover:bg-brand/90"
              : "text-brand bg-white-custom"
          }`}
        >
          Proveedor
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab("producto");
            setCurrentPage(1);
          }}
          className={`rounded-lg px-12 py-2 text-sm font-semibold transition-colors ${
            activeTab === "producto"
              ? "bg-brand text-white shadow-sm hover:bg-brand/90"
              : "text-brand bg-white-custom"
          }`}
        >
          Producto
        </button>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-col gap-4">
        {activeTab === "proveedor" ? (
          <>
            {/* First Row */}
            <div className="flex items-center gap-24">
              {/* Almacén */}
              <div className="flex w-95 items-center gap-3">
                <label className="w-16 shrink-0 text-sm font-medium text-text-primary">
                  Almacén
                </label>
                <div className="form-select-container flex-1">
                  <select
                    className="w-full rounded-lg bg-surface-light px-4 py-2.5 text-sm text-text-secondary outline-none cursor-pointer"
                    value={almacenProv}
                    onChange={(e) => setAlmacenProv(e.target.value)}
                  >
                    <option value="" disabled>
                      SELECCIONE
                    </option>
                    {SEDES.map((sede) => (
                      <option key={sede} value={sede}>
                        {sede}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Fechas */}
              <div className="flex flex-1 items-center gap-24">
                <div className="flex flex-1 items-center gap-3">
                  <label
                    htmlFor="fecha-desde-p"
                    className="whitespace-nowrap text-sm font-medium text-text-primary"
                  >
                    Desde:
                  </label>
                  <div className="relative flex-1">
                    <input
                      id="fecha-desde-p"
                      type="date"
                      value={fechaDesdeProv}
                      onChange={(e) => setFechaDesdeProv(e.target.value)}
                      className="w-full rounded-lg bg-surface-light py-2.5 px-4 text-sm text-text-secondary outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-1 items-center gap-3">
                  <label
                    htmlFor="fecha-hasta-p"
                    className="whitespace-nowrap text-sm font-medium text-text-primary"
                  >
                    Hasta:
                  </label>
                  <div className="relative flex-1">
                    <input
                      id="fecha-hasta-p"
                      type="date"
                      value={fechaHastaProv}
                      onChange={(e) => setFechaHastaProv(e.target.value)}
                      className="w-full rounded-lg bg-surface-light py-2.5 px-4 text-sm text-text-secondary outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Second Row */}
            <div className="flex items-center justify-between">
              {/* Proveedor */}
              <div className="flex w-95 items-center gap-3">
                <label className="w-16 shrink-0 text-sm font-medium text-text-primary">
                  Proveedor
                </label>
                <div className="form-select-container flex-1">
                  <input
                    type="text"
                    value={proveedorVal}
                    onChange={(e) => setProveedorVal(e.target.value)}
                    placeholder="Nombre de proveedor..."
                    className="w-full rounded-lg bg-surface-light px-4 py-2.5 text-sm text-text-secondary outline-none uppercase"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleSearch}
                disabled={!almacenProv}
                className="rounded-lg bg-brand px-10 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
              >
                BUSCAR
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-24 flex-1 max-w-240">
              {/* Almacén */}
              <div className="flex items-center gap-4 flex-2">
                <label className="text-sm font-medium text-text-primary whitespace-nowrap min-w-15">
                  Almacén
                </label>
                <div className="flex-1">
                  <select
                    className="w-full rounded-lg bg-surface-light px-4 py-2.5 text-sm text-text-secondary outline-none cursor-pointer"
                    value={almacenProd}
                    onChange={(e) => setAlmacenProd(e.target.value)}
                  >
                    <option value="" disabled>
                      SELECCIONE
                    </option>
                    {SEDES.map((sede) => (
                      <option key={sede} value={sede}>
                        {sede}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Nombre de producto */}
              <div className="flex items-center gap-4 flex-3">
                <label className="text-sm font-medium text-text-primary whitespace-nowrap min-w-30">
                  Nombre de producto
                </label>
                <div className="flex-1">
                  <input
                    type="text"
                    value={productoVal}
                    onChange={(e) => setProductoVal(e.target.value)}
                    placeholder="Nombre de producto..."
                    className="w-full rounded-lg bg-surface-light px-4 py-2.5 text-sm text-text-secondary outline-none uppercase"
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSearch}
              disabled={!almacenProd}
              className="rounded-lg bg-brand px-10 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
            >
              BUSCAR
            </button>
          </div>
        )}
      </div>

      {/* Grid Container */}
      <div className="overflow-hidden rounded-xl shadow shadow-border-default p-4">
        {/* Header Row */}
        <div
          className="grid bg-muted-20 text-xs font-bold uppercase text-brand px-2 py-0"
          style={{ gridTemplateColumns }}
        >
          {COLUMNS.map((col) => (
            <div
              key={col.key}
              className="relative px-4 py-3.5 text-center divisor"
            >
              {col.label}
            </div>
          ))}
        </div>

        {/* Data Rows */}
        <div className="divide-y divide-border-subtle">
          {!currentAlmacen ? (
            <div className="flex h-64 items-center justify-center text-text-secondary">
              Seleccione una sede para consultar el resumen de compras.
            </div>
          ) : TABLE_DATA.length === 0 ? (
            <div className="flex h-64 items-center justify-center text-text-secondary">
              No se encontraron registros para los filtros seleccionados.
            </div>
          ) : (
            TABLE_DATA.map((row) => (
              <div
                key={row.id}
                className="grid items-center px-2 transition-colors bg-surface-default hover:bg-surface-light"
                style={{ gridTemplateColumns }}
              >
                <div className="flex items-center justify-center px-2 py-3.5">
                  <button
                    type="button"
                    className="rounded p-1 text-muted transition-colors hover:bg-surface-light hover:text-brand"
                  >
                    <Search className="size-4" />
                  </button>
                </div>
                <div className="px-4 py-3.5 text-center text-sm font-medium text-text-primary">
                  {row.ingreso}
                </div>
                <div className="px-4 py-3.5 text-center text-sm text-text-secondary">
                  {row.factura}
                </div>
                <div className="px-4 py-3.5 text-center text-sm text-text-secondary">
                  {row.fecha}
                </div>
                <div className="px-4 py-3.5 text-center text-sm text-text-primary truncate">
                  {row.proveedor}
                </div>

                {activeTab === "proveedor" ? (
                  <>
                    <div className="px-4 py-3.5 text-center text-sm text-text-secondary">
                      {"subtotal" in row ? row.subtotal.toFixed(2) : "-"}
                    </div>
                    <div className="px-4 py-3.5 text-center text-sm text-text-secondary">
                      {"igv" in row ? row.igv.toFixed(2) : "-"}
                    </div>
                    <div className="px-4 py-3.5 text-center text-sm font-semibold text-text-primary">
                      {"total" in row ? row.total.toFixed(2) : "-"}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="px-4 py-3.5 text-center text-sm text-text-secondary truncate">
                      {"producto" in row ? row.producto : "-"}
                    </div>
                    <div className="px-4 py-3.5 text-center text-sm text-text-secondary">
                      {"cantidad" in row ? row.cantidad : "-"}
                    </div>
                    <div className="px-4 py-3.5 text-center text-sm font-semibold text-text-secondary">
                      {"costo" in row ? row.costo.toFixed(2) : "-"}
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {totalRegistros > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 text-sm mt-4 border-t border-border-default">
          <div className="text-sm text-text-primary-80">
            Mostrando{" "}
            <span className="font-semibold text-text-primary">
              {TABLE_DATA.length}
            </span>{" "}
            de{" "}
            <span className="font-semibold text-text-primary">
              {totalRegistros}
            </span>{" "}
            registros
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-md p-1 shadow-sm">
              <button
                type="button"
                aria-label="Página anterior"
                title="Anterior"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors border focus:ring-2 focus:ring-offset-1 focus:ring-brand ${
                  currentPage === 1
                    ? "bg-card-bg text-accent-content cursor-not-allowed opacity-60 border-border-default"
                    : "bg-card-bg border-border-default text-accent-content"
                }`}
              >
                <i className="fas fa-chevron-left" />
                <span className="hidden sm:inline">Anterior</span>
              </button>

              <div className="px-3 text-sm font-medium text-text-primary select-none">
                Página {currentPage} de {totalPages}
              </div>

              <button
                type="button"
                aria-label="Página siguiente"
                title="Siguiente"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors border focus:ring-2 focus:ring-offset-1 focus:ring-brand ${
                  currentPage === totalPages
                    ? "bg-card-bg text-accent-content cursor-not-allowed opacity-60 border-border-default"
                    : "bg-card-bg border-border-default text-accent-content"
                }`}
              >
                <span className="hidden sm:inline">Siguiente</span>
                <i className="fas fa-chevron-right" />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={handleExport}
          disabled={TABLE_DATA.length === 0}
          className="rounded-lg bg-brand px-10 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
        >
          EXPORTAR
        </button>
      </div>
    </div>
  );
};
export default ResumenCompras;
