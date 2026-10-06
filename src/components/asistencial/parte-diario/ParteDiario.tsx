import {
  parteDiarioEmpresasMock,
  type ParteDiarioEmpresaRow,
} from "@/lib/parteDiarioData";
import ExcelJS from "exceljs";
import { useCallback, useState } from "react";
import OtrosTabla from "./OtrosTabla";
import TablaEmpresas from "./TablaEmpresas";

type ParteDiarioFilters = {
  sede: string;
  empresa: string;
  fechaInicio: string;
  fechaFin: string;
};

const PAGE_SIZE = 20;

/** PDF de ejemplo servido desde `public/docs` (nombre de archivo hardcodeado). */
const PARTE_DIARIO_PDF = "CUIDDA - Parte diario de atenciones 2026-10-06.pdf";

/** URL codificada del PDF estático. */
const PARTE_DIARIO_PDF_URL = `/docs/${encodeURIComponent(PARTE_DIARIO_PDF)}`;

/**
 * Abre el PDF del parte diario en una nueva pestaña del navegador.
 * Es síncrono (dentro del gesto del usuario), por lo que no lo bloquea el
 * bloqueador de popups.
 */
function abrirParteDiarioPdf() {
  window.open(PARTE_DIARIO_PDF_URL, "_blank", "noopener,noreferrer");
}

/**
 * Aplica los filtros activos sobre los datos mock del parte diario.
 */
const filtrarParteDiario = (
  filters: Partial<ParteDiarioFilters>,
): ParteDiarioEmpresaRow[] =>
  parteDiarioEmpresasMock.filter((row) => {
    const matchSede =
      !filters.sede ||
      (filters.sede === "001" && ["UNACEM S.A.A."].includes(row.empresa));
    const matchEmpresa =
      !filters.empresa ||
      row.empresa.toLowerCase().includes(filters.empresa.toLowerCase());
    const matchFechaInicio =
      !filters.fechaInicio ||
      row.fechaAtencion.split("/").reverse().join("-") >= filters.fechaInicio;
    const matchFechaFin =
      !filters.fechaFin ||
      row.fechaAtencion.split("/").reverse().join("-") <= filters.fechaFin;
    return matchSede && matchEmpresa && matchFechaInicio && matchFechaFin;
  });

/**
 * Vista principal del parte diario: controla pestañas, filtros y exportación (mock).
 */
export default function ParteDiarioTabla() {
  const [activeTab, setActiveTab] = useState<"empresas" | "otros">("empresas");

  const [empresasData, setEmpresasData] = useState<ParteDiarioEmpresaRow[]>([]);
  const [loadingEmpresas, setLoadingEmpresas] = useState(false);
  const [errorEmpresas, setErrorEmpresas] = useState<string | null>(null);

  const [empresasCurrentPage, setEmpresasCurrentPage] = useState(1);
  const [empresasTotalPages, setEmpresasTotalPages] = useState(1);
  const [empresasTotal, setEmpresasTotal] = useState(0);

  const [activeFilters, setActiveFilters] = useState<
    Partial<ParteDiarioFilters>
  >({});

  /**
   * Consulta los datos mock con los filtros y página proporcionados.
   */
  const fetchParteDiario = useCallback(
    (filters: Partial<ParteDiarioFilters>, page = 1) => {
      setLoadingEmpresas(true);
      setErrorEmpresas(null);

      window.setTimeout(() => {
        const filtered = filtrarParteDiario(filters);

        const total = filtered.length;
        const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
        const safePage = Math.min(page, totalPages);

        setEmpresasData(
          filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
        );
        setEmpresasTotal(total);
        setEmpresasTotalPages(totalPages);
        setEmpresasCurrentPage(safePage);
        setLoadingEmpresas(false);
      }, 400);
    },
    [],
  );

  const handleFilter = useCallback(
    (filters: ParteDiarioFilters) => {
      setActiveFilters(filters);
      fetchParteDiario(filters, 1);
    },
    [fetchParteDiario],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      fetchParteDiario(activeFilters, page);
    },
    [fetchParteDiario, activeFilters],
  );

  /**
   * Construye y descarga el Excel del parte diario con los filtros activos.
   */
  const handleDownloadExcel = async () => {
    const filtered = filtrarParteDiario(activeFilters);

    if (!filtered.length) return;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Parte Diario");

    worksheet.columns = [
      { header: "N°", key: "id", width: 5 },
      { header: "EMPRESA", key: "empresa", width: 30 },
      { header: "FECHA DE ATENCIÓN", key: "fechaAtencion", width: 18 },
      { header: "HORA DE ATENCIÓN", key: "horaAtencion", width: 18 },
      { header: "APELLIDOS Y NOMBRES", key: "apellidosNombres", width: 35 },
      { header: "EDAD", key: "edad", width: 10 },
      { header: "CÓDIGO", key: "codigo", width: 15 },
      { header: "PROCEDENCIA", key: "procedencia", width: 20 },
      { header: "PLANILLA", key: "planilla", width: 20 },
      { header: "DIAGNÓSTICO", key: "diagnostico", width: 40 },
      { header: "TRATAMIENTO", key: "tratamiento", width: 30 },
    ];

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

    filtered.forEach((row) => {
      worksheet.addRow({
        id: row.id,
        empresa: row.empresa,
        fechaAtencion: row.fechaAtencion,
        horaAtencion: row.horaAtencion,
        apellidosNombres: row.apellidosNombres,
        edad: row.edad,
        codigo: row.codigo,
        procedencia: row.procedencia,
        planilla: row.planilla,
        diagnostico: row.diagnostico,
        tratamiento: row.tratamiento,
      });
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
          if ([1, 3, 4, 6, 7].includes(colIndex)) {
            cell.alignment = { ...cell.alignment, horizontal: "center" };
          }
        });
      }
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Parte_Diario_${new Date().toISOString().split("T")[0]}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-[60vh]">
      {/* Header con tabs y botón de descarga */}
      <div className="flex justify-between items-center px-6">
        <div className="flex gap-2 bg-muted-20 rounded-lg px-2 py-1 w-full max-w-80">
          <button
            type="button"
            onClick={() => setActiveTab("empresas")}
            className={`flex-1 py-2 m-1 rounded-md font-semibold text-sm transition-all cursor-pointer ${
              activeTab === "empresas"
                ? "text-white bg-brand"
                : "text-text-primary bg-surface-default"
            }`}
          >
            Empresas
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("otros")}
            className={`flex-1 py-2 m-1 rounded-md font-semibold text-sm transition-all cursor-pointer ${
              activeTab === "otros"
                ? "text-white bg-brand"
                : "text-text-primary bg-surface-default"
            }`}
          >
            Otros
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            className="rounded-xl flex items-center justify-center text-xl text-brand px-3 py-2 cursor-pointer hover:bg-muted-50 transition-all"
            title="Descargar parte diario en Excel"
            onClick={handleDownloadExcel}
          >
            <i className="fas fa-file-excel text-2xl"></i>
          </button>
          <button
            type="button"
            className="rounded-xl flex items-center justify-center text-xl text-brand px-3 py-2 cursor-pointer hover:bg-muted-50 transition-all"
            title="Ver parte diario en PDF (nueva pestaña)"
            onClick={abrirParteDiarioPdf}
          >
            <i className="fas fa-file-pdf text-2xl"></i>
          </button>
        </div>
      </div>

      {/* Card principal */}
      <div className="rounded-2xl p-6">
        <div className="relative">
          <div className={activeTab === "empresas" ? "block" : "hidden"}>
            <TablaEmpresas
              data={empresasData}
              onFilter={handleFilter}
              onPageChange={handlePageChange}
              loading={loadingEmpresas}
              error={errorEmpresas}
              total={empresasTotal}
              currentPage={empresasCurrentPage}
              totalPages={empresasTotalPages}
            />
          </div>

          <div className={activeTab === "otros" ? "block" : "hidden"}>
            <OtrosTabla />
          </div>
        </div>
      </div>
    </div>
  );
}
