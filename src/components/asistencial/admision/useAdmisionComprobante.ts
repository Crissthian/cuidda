import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import type { AdmisionInput } from "./admision.types";
import { useAdmision } from "./AdmisionContext";
import { generarPDFComprobante } from "./PDFComprobante";

const ESPECIALIDADES_COMPROBANTE = new Set(["009", "010", "011"]);

const formatDateForPdf = (value: string | undefined) => {
  const normalized = String(value || "").trim();
  if (!normalized) {
    return new Intl.DateTimeFormat("es-PE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date());
  }

  const dateMatch = normalized.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!dateMatch) return normalized;

  const [, year, month, day] = dateMatch;
  return `${day}/${month}/${year}`;
};

const formatTimeForPdf = (value: string | undefined) => {
  const normalized = String(value || "").trim();
  if (normalized) return normalized;

  return new Intl.DateTimeFormat("es-PE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date());
};

const resolveTipoComprobanteTitulo = (tipoDocumento: string | undefined) => {
  return tipoDocumento === "factura"
    ? "FACTURA DE VENTA ELECTRONICA"
    : "BOLETA DE VENTA ELECTRONICA";
};

const resolvePacienteNombre = (values: AdmisionInput) => {
  const nombreAtencion = values.atencion.nombre_paciente?.trim();
  if (nombreAtencion) return nombreAtencion;

  return [values.paciente.nombre?.trim(), values.paciente.apellido?.trim()]
    .filter(Boolean)
    .join(" ")
    .trim();
};

export const useAdmisionComprobante = () => {
  const { getValues, setValue, watch } = useFormContext<AdmisionInput>();
  const { mode, examenesLaboratorio, examenEspecialidadSeleccionado } =
    useAdmision();

  const especialidad = watch("atencion.especialidad");
  const codigoAdmision = watch("atencion.cdg_ate");
  const numeroDocumentoActual = watch("atencion.numero_documento");

  const yaGenerado = Boolean(numeroDocumentoActual?.trim());

  const hasExamenSeleccionado =
    especialidad === "010"
      ? examenesLaboratorio.length > 0
      : (especialidad === "009" || especialidad === "011") &&
        examenEspecialidadSeleccionado?.especialidad === especialidad;

  let disabledReason = "";
  if (mode !== "actualizar" || !String(codigoAdmision || "").trim()) {
    disabledReason = "Guarde la admisión antes de generar el comprobante";
  } else if (
    !ESPECIALIDADES_COMPROBANTE.has(String(especialidad || "").trim())
  ) {
    disabledReason = "Disponible solo para especialidades 010, 009 y 011";
  } else if (!hasExamenSeleccionado && !yaGenerado) {
    disabledReason =
      "Seleccione al menos un examen para generar el comprobante";
  }

  const canGenerateComprobante = !disabledReason;

  const buildNumeroComprobante = (
    tipoDocumento: string | undefined,
    codigoAdmisionValue: string | undefined,
  ) => {
    const serie = tipoDocumento === "factura" ? "F001" : "B001";
    const correlativo = String(codigoAdmisionValue || "")
      .replace(/\D/g, "")
      .padStart(10, "0")
      .slice(-10);

    return correlativo ? `${serie}-${correlativo}` : serie;
  };

  const handleGenerarComprobante = async () => {
    if (disabledReason) {
      toast.error(disabledReason);
      return;
    }

    const values = getValues();
    const numeroComprobanteGenerado = buildNumeroComprobante(
      values.atencion.tipo_documento,
      values.atencion.cdg_ate,
    );
    const numeroComprobante =
      values.atencion.numero_documento?.trim() || numeroComprobanteGenerado;

    if (!values.atencion.numero_documento?.trim()) {
      setValue("atencion.numero_documento", numeroComprobante, {
        shouldDirty: true,
        shouldTouch: true,
      });
    }
    const clienteEmpresaNombre = values.atencion.nombre_empresa?.trim() || "";
    const clienteEmpresaDocumento = values.atencion.ruc_cliente?.trim() || "";
    const pacienteNombre = resolvePacienteNombre(values);
    const pacienteDocumento =
      values.paciente.numero_documento?.trim() ||
      values.atencion.dni_paciente?.trim() ||
      "";

    const cliente =
      clienteEmpresaNombre && clienteEmpresaDocumento
        ? {
            nombre: clienteEmpresaNombre,
            tipoDocumento: "RUC",
            numeroDocumento: clienteEmpresaDocumento,
          }
        : {
            nombre: pacienteNombre,
            tipoDocumento: "DNI",
            numeroDocumento: pacienteDocumento,
          };

    const items =
      values.atencion.especialidad === "010"
        ? examenesLaboratorio.map((examen) => ({
            cantidad: 1,
            descripcion: examen.nombre,
            precio: examen.precio,
            total: examen.precio,
          }))
        : examenEspecialidadSeleccionado
          ? [
              {
                cantidad: 1,
                descripcion: examenEspecialidadSeleccionado.nombre,
                precio: examenEspecialidadSeleccionado.precio,
                total: examenEspecialidadSeleccionado.precio,
              },
            ]
          : [];

    if (items.length === 0) {
      toast.error("No hay exámenes seleccionados para generar el comprobante");
      return;
    }

    const total = items.reduce((sum, item) => sum + item.total, 0);
    const subTotal = total / 1.18;
    const igv = total - subTotal;

    await generarPDFComprobante({
      comprobante: {
        tipo: resolveTipoComprobanteTitulo(values.atencion.tipo_documento),
        numero: numeroComprobante
          ? `NRO ${numeroComprobante}`
          : `NRO ${values.atencion.cdg_ate || ""}`,
      },
      cliente,
      fechaHora: {
        fecha: formatDateForPdf(undefined),
        hora: formatTimeForPdf(undefined),
      },
      items,
      totales: {
        subTotal,
        igv,
        total,
      },
      pago: {
        montoLetras: `${total.toFixed(2)} SOLES`,
        formaPago: "EFECTIVO",
        condVenta: "CONTADO",
        cajero: "ADMINISTRADOR",
        observaciones: values.atencion.observaciones?.trim() || "",
      },
    });
  };

  return {
    canGenerateComprobante,
    disabledReason,
    handleGenerarComprobante,
  };
};
