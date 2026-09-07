import Modal from "@/components/ui/Modal";
import {
  condicionesPagoMock,
  formasPagoMock,
  monedasMock,
  productosMock,
  vendedoresMock,
  type Producto,
  type TablaItem,
} from "@/lib/admisionData";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { useAdmision } from "./AdmisionContext";
import { generarPDFComprobante } from "./PDFComprobante";
import type { AdmisionInput } from "./admision.types";

interface ModalComprobanteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ComprobanteItem {
  id: string;
  codigo?: string;
  descripcion: string;
  cantidad: number;
  precio: number;
  descuento?: number;
  isFromForm?: boolean;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export default function ModalComprobante({
  isOpen,
  onClose,
}: ModalComprobanteProps) {
  const { getValues, setValue, watch } = useFormContext<AdmisionInput>();
  const { examenesLaboratorio, examenEspecialidadSeleccionado } = useAdmision();

  const tipoDocumentoForm = watch("atencion.tipo_documento");

  // Type & Series State
  const [tipoDocumentoModal, setTipoDocumentoModal] = useState<
    "boleta" | "factura"
  >("boleta");
  const [numeroDocumento, setNumeroDocumento] = useState("");

  // Client & Document Details State
  const [documentoIdentidad, setDocumentoIdentidad] = useState("");
  const [nombreCliente, setNombreCliente] = useState("");
  const [direccion, setDireccion] = useState("");
  const [moneda, setMoneda] = useState("001");
  const [condicionPago, setCondicionPago] = useState("001");
  const [formaPago, setFormaPago] = useState("003");
  const [vendedor, setVendedor] = useState("");
  const [docRef, setDocRef] = useState("");
  const [numeroOperacion, setNumeroOperacion] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Select Options State (mock)
  const [monedas] = useState<TablaItem[]>(monedasMock);
  const [condicionesPago] = useState<TablaItem[]>(condicionesPagoMock);
  const [formasPago] = useState<TablaItem[]>(formasPagoMock);
  const [vendedores] = useState<TablaItem[]>(vendedoresMock);

  // Product Search State
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Producto[]>([]);
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 400);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Items & Selection State
  const [items, setItems] = useState<ComprobanteItem[]>([]);
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());

  // Initialize modal when opened
  useEffect(() => {
    if (!isOpen) return;

    const values = getValues();
    const cdg_ate = values.atencion.cdg_ate;
    if (!cdg_ate) return;

    const isFacturaInitial = tipoDocumentoForm === "factura";
    const tipoInitial = isFacturaInitial ? "factura" : "boleta";
    const serieInitial = isFacturaInitial ? "F001" : "B001";
    setTipoDocumentoModal(tipoInitial);
    setIsSaved(false);

    if (isFacturaInitial) {
      setDocumentoIdentidad(values.atencion.ruc_cliente || "");
      setNombreCliente(values.atencion.nombre_empresa || "");
    } else {
      setDocumentoIdentidad(
        values.paciente?.numero_documento ||
          values.atencion.dni_paciente ||
          "9999999999",
      );
      const patientName = [
        values.paciente?.nombre?.trim(),
        values.paciente?.apellido?.trim(),
      ]
        .filter(Boolean)
        .join(" ");
      setNombreCliente(
        values.atencion.nombre_paciente?.trim() ||
          patientName ||
          "CLIENTE VARIOS",
      );
    }

    setDireccion(values.paciente?.direccion || "");
    setNumeroOperacion("");
    setDocRef("");
    setVendedor("");
    setObservaciones(values.atencion.observaciones || "");

    // Cargar los ítems basados en la especialidad seleccionada
    const initialItems: ComprobanteItem[] = [];
    if (values.atencion.especialidad === "010") {
      examenesLaboratorio.forEach((ex) => {
        initialItems.push({
          id: Math.random().toString(36).substring(2, 9),
          descripcion: ex.nombre,
          cantidad: 1,
          precio: ex.precio,
          descuento: 0,
          isFromForm: true,
        });
      });
    } else if (
      (values.atencion.especialidad === "009" ||
        values.atencion.especialidad === "011") &&
      examenEspecialidadSeleccionado
    ) {
      initialItems.push({
        id: Math.random().toString(36).substring(2, 9),
        descripcion: examenEspecialidadSeleccionado.nombre,
        cantidad: 1,
        precio: examenEspecialidadSeleccionado.precio,
        descuento: 0,
        isFromForm: true,
      });
    }
    setItems(initialItems);
    setCheckedIds(new Set());

    // Correlativo simulado
    const correlativo = String(cdg_ate).replace(/\D/g, "").padStart(8, "0");
    setNumeroDocumento(`${serieInitial}-${correlativo}`);
  }, [
    isOpen,
    getValues,
    examenesLaboratorio,
    examenEspecialidadSeleccionado,
    tipoDocumentoForm,
  ]);

  // Switch Document Type (Boleta <-> Factura)
  const handleTipoDocumentoChange = (nuevoTipo: "boleta" | "factura") => {
    setTipoDocumentoModal(nuevoTipo);
    const nuevaSerie = nuevoTipo === "factura" ? "F001" : "B001";

    const values = getValues();
    if (nuevoTipo === "factura") {
      setDocumentoIdentidad(values.atencion.ruc_cliente || "");
      setNombreCliente(values.atencion.nombre_empresa || "");
    } else {
      setDocumentoIdentidad(
        values.paciente?.numero_documento ||
          values.atencion.dni_paciente ||
          "9999999999",
      );
      const patientName = [
        values.paciente?.nombre?.trim(),
        values.paciente?.apellido?.trim(),
      ]
        .filter(Boolean)
        .join(" ");
      setNombreCliente(
        values.atencion.nombre_paciente?.trim() ||
          patientName ||
          "CLIENTE VARIOS",
      );
    }

    if (!isSaved) {
      const correlativo = String(values.atencion.cdg_ate || "")
        .replace(/\D/g, "")
        .padStart(8, "0");
      setNumeroDocumento(`${nuevaSerie}-${correlativo}`);
    }
  };

  // Product Search Debounce (mock)
  useEffect(() => {
    if (debouncedSearchTerm.length >= 3) {
      const results = productosMock.filter((p) =>
        p.descripcion.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setActiveDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Totals Calculation
  const subTotal = items.reduce(
    (sum, item) => sum + (item.cantidad * item.precio - (item.descuento || 0)),
    0,
  );
  const igvPercent = 18;
  const igv = subTotal * (igvPercent / 100);
  const total = subTotal + igv;

  // Item Table Actions
  const handleAgregarItem = () => {
    const newItem: ComprobanteItem = {
      id: Math.random().toString(36).substring(2, 9),
      descripcion: "",
      cantidad: 1,
      precio: 0,
      descuento: 0,
    };
    setItems([...items, newItem]);
  };

  const handleEliminarItems = () => {
    if (checkedIds.size === 0) {
      toast.warning("Seleccione al menos un ítem para eliminar");
      return;
    }
    setItems(items.filter((item) => !checkedIds.has(item.id)));
    setCheckedIds(new Set());
  };

  const toggleSelectItem = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (item?.isFromForm) return;
    const newChecked = new Set(checkedIds);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedIds(newChecked);
  };

  const updateItemField = (
    id: string,
    field: keyof Omit<ComprobanteItem, "id">,
    value: string | number,
  ) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      }),
    );
  };

  const handleSelectProduct = (itemId: string, producto: Producto) => {
    setItems(
      items.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            codigo: producto.codigo,
            descripcion: producto.descripcion,
            precio:
              moneda === "002"
                ? producto.precio_dolares
                : producto.precio_soles,
          };
        }
        return item;
      }),
    );
    setActiveDropdownId(null);
    setSearchTerm("");
    setSearchResults([]);
  };

  // Print PDF Action
  const handleImprimirPDF = async () => {
    if (!isSaved) {
      toast.warning(
        "Debe guardar el comprobante en la base de datos antes de imprimir",
      );
      return;
    }

    const isFactura = tipoDocumentoModal === "factura";
    const tipoTitulo = isFactura
      ? "FACTURA DE VENTA ELECTRONICA"
      : "BOLETA DE VENTA ELECTRONICA";
    const selectedMoneda = monedas.find((m) => m.num_item === moneda);
    const monedaSimbolo = selectedMoneda?.des_item
      ?.toUpperCase()
      .includes("DOL")
      ? "$ "
      : "S/. ";
    const selectedFormaPago =
      formasPago.find((fp) => fp.num_item === formaPago)?.des_item ||
      formaPago ||
      "EFECTIVO";
    const selectedCondPago =
      condicionesPago.find((cp) => cp.num_item === condicionPago)?.des_item ||
      condicionPago ||
      "CONTADO";

    const pdfItems = items.map((item) => {
      const itemTotal = item.cantidad * item.precio - (item.descuento || 0);
      return {
        cantidad: item.cantidad,
        descripcion: item.descripcion,
        precio: item.precio,
        total: itemTotal,
      };
    });

    const currentDate = new Date();
    const fechaStr = new Intl.DateTimeFormat("es-PE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(currentDate);
    const horaStr = new Intl.DateTimeFormat("es-PE", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(currentDate);

    await generarPDFComprobante({
      comprobante: {
        tipo: tipoTitulo,
        numero: numeroDocumento ? `NRO: ${numeroDocumento}` : "",
      },
      cliente: {
        nombre: nombreCliente,
        tipoDocumento: isFactura ? "RUC" : "DNI",
        numeroDocumento: documentoIdentidad,
        direccion,
      },
      fechaHora: {
        fecha: fechaStr,
        hora: horaStr,
      },
      items: pdfItems,
      totales: {
        subTotal,
        igv,
        total,
        monedaSimbolo,
      },
      pago: {
        montoLetras: `${total.toFixed(2)} ${monedaSimbolo.trim() === "$" ? "DÓLARES" : "SOLES"}`,
        formaPago: selectedFormaPago,
        condVenta: selectedCondPago,
        cajero: "ADMINISTRADOR",
        observaciones,
      },
    });
  };

  // Main Save Action (simulado)
  const handleGuardar = () => {
    const values = getValues();
    const cdg_ate = values.atencion.cdg_ate;

    if (!cdg_ate) {
      toast.error(
        "No se encontró el código de atención para registrar el comprobante",
      );
      return;
    }

    // Validaciones por tipo de comprobante
    const isFactura = tipoDocumentoModal === "factura";
    if (isFactura) {
      const cleanRuc = documentoIdentidad.trim();
      if (!cleanRuc || cleanRuc.length !== 11 || !/^\d+$/.test(cleanRuc)) {
        toast.error(
          "Para emitir una Factura se requiere un RUC válido de 11 dígitos",
        );
        return;
      }
      if (!nombreCliente.trim()) {
        toast.error(
          "Debe ingresar la Razón Social de la empresa para la Factura",
        );
        return;
      }
    } else {
      if (!nombreCliente.trim()) {
        toast.error("Debe ingresar el Nombre del Cliente para la Boleta");
        return;
      }
    }

    if (items.length === 0) {
      toast.error("Debe agregar al menos un ítem al comprobante");
      return;
    }

    for (const it of items) {
      if (!it.descripcion.trim()) {
        toast.error("Todos los ítems deben tener una descripción válida");
        return;
      }
      if (it.cantidad <= 0) {
        toast.error(
          `La cantidad del ítem "${it.descripcion}" debe ser mayor a 0`,
        );
        return;
      }
    }

    setIsSaving(true);
    // Simulación de guardado
    window.setTimeout(() => {
      setIsSaved(true);
      setValue("atencion.numero_documento", numeroDocumento, {
        shouldDirty: true,
        shouldTouch: true,
      });
      if (isFactura) {
        setValue("atencion.ruc_cliente", documentoIdentidad, {
          shouldDirty: true,
          shouldTouch: true,
        });
        setValue("atencion.nombre_empresa", nombreCliente, {
          shouldDirty: true,
          shouldTouch: true,
        });
      } else {
        setValue("atencion.dni_paciente", documentoIdentidad, {
          shouldDirty: true,
          shouldTouch: true,
        });
      }
      if (observaciones) {
        setValue("atencion.observaciones", observaciones, {
          shouldDirty: true,
          shouldTouch: true,
        });
      }
      toast.success(`Comprobante ${numeroDocumento} guardado correctamente`);
      setIsSaving(false);
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Emisión de Comprobante de Pago"
      size="lg"
    >
      <div className="flex flex-col gap-5 text-xs text-text-primary p-2">
        {/* Top Controls: Tipo de Comprobante Switcher */}
        <div className="flex justify-between items-center pb-3 border-b border-border-default">
          <div className="flex items-center gap-3">
            <span className="font-bold text-brand uppercase tracking-wider text-sm">
              Tipo de Comprobante:
            </span>
            <div className="inline-flex rounded-lg p-1 bg-surface-light border border-border-default">
              <button
                type="button"
                onClick={() => handleTipoDocumentoChange("boleta")}
                disabled={isSaved}
                className={`px-4 py-1.5 rounded-md font-bold text-xs uppercase transition-all cursor-pointer ${
                  tipoDocumentoModal === "boleta"
                    ? "bg-brand text-white shadow-sm"
                    : "text-text-secondary hover:text-brand"
                } disabled:opacity-70 disabled:cursor-not-allowed`}
              >
                Boleta de Venta
              </button>
              <button
                type="button"
                onClick={() => handleTipoDocumentoChange("factura")}
                disabled={isSaved}
                className={`px-4 py-1.5 rounded-md font-bold text-xs uppercase transition-all cursor-pointer ${
                  tipoDocumentoModal === "factura"
                    ? "bg-brand text-white shadow-sm"
                    : "text-text-secondary hover:text-brand"
                } disabled:opacity-70 disabled:cursor-not-allowed`}
              >
                Factura de Venta
              </button>
            </div>
          </div>

          {isSaved && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
              <i className="fa-solid fa-circle-check text-emerald-600"></i>{" "}
              REGISTRADO
            </span>
          )}
        </div>

        {/* Header Fields Grid */}
        <div className="grid grid-cols-4 gap-4">
          {/* N.º de Documento (Serie + Correlativo) */}
          <div>
            <label
              htmlFor="modal-numero-documento"
              className="block font-semibold text-brand mb-1"
            >
              N.º Comprobante
            </label>
            <input
              id="modal-numero-documento"
              type="text"
              disabled
              readOnly
              className="w-full rounded-lg border-none bg-surface-light py-2 px-3 text-xs uppercase font-mono font-bold focus:outline-none"
              value={numeroDocumento}
            />
          </div>

          {/* RUC / DNI */}
          <div>
            <label
              htmlFor="modal-doc-identidad"
              className="block font-semibold text-brand mb-1"
            >
              {tipoDocumentoModal === "factura"
                ? "RUC (11 dígitos) *"
                : "DNI / RUC"}
            </label>
            <input
              id="modal-doc-identidad"
              type="text"
              maxLength={tipoDocumentoModal === "factura" ? 11 : 15}
              disabled={isSaved}
              className="w-full rounded-lg border-none bg-surface-light py-2 px-3 text-xs focus:outline-none focus:ring-1 focus:ring-brand font-mono"
              value={documentoIdentidad}
              onChange={(e) => setDocumentoIdentidad(e.target.value)}
              placeholder={
                tipoDocumentoModal === "factura"
                  ? "Ej. 20123456789"
                  : "Ej. 75215918 / 9999999999"
              }
            />
          </div>

          {/* Nombre de Empresa / Nombre de Paciente */}
          <div className="col-span-2">
            <label
              htmlFor="modal-nombre-cliente"
              className="block font-semibold text-brand mb-1"
            >
              {tipoDocumentoModal === "factura"
                ? "Razón Social / Empresa *"
                : "Nombre del Cliente / Paciente *"}
            </label>
            <input
              id="modal-nombre-cliente"
              type="text"
              disabled={isSaved}
              className="w-full rounded-lg border-none bg-surface-light py-2 px-3 text-xs uppercase focus:outline-none focus:ring-1 focus:ring-brand"
              value={nombreCliente}
              onChange={(e) => setNombreCliente(e.target.value)}
              placeholder="NOMBRE / RAZÓN SOCIAL"
            />
          </div>

          {/* Dirección */}
          <div className="col-span-2">
            <label
              htmlFor="modal-direccion"
              className="block font-semibold text-brand mb-1"
            >
              Dirección
            </label>
            <input
              id="modal-direccion"
              type="text"
              disabled={isSaved}
              className="w-full rounded-lg border-none bg-surface-light py-2 px-3 text-xs uppercase focus:outline-none focus:ring-1 focus:ring-brand"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              placeholder="DIRECCIÓN FISCAL O DOMICILIO"
            />
          </div>

          {/* Moneda */}
          <div>
            <label
              htmlFor="modal-moneda"
              className="block font-semibold text-brand mb-1"
            >
              Moneda
            </label>
            <select
              id="modal-moneda"
              disabled={isSaved}
              className="w-full rounded-lg border-none bg-surface-light py-2 px-3 text-xs focus:outline-none focus:ring-1 focus:ring-brand"
              value={moneda}
              onChange={(e) => setMoneda(e.target.value)}
            >
              {monedas.map((m) => (
                <option key={m.num_item} value={m.num_item}>
                  {m.des_item}
                </option>
              ))}
            </select>
          </div>

          {/* Condición de Pago */}
          <div>
            <label
              htmlFor="modal-condicion-pago"
              className="block font-semibold text-brand mb-1"
            >
              Condición de Pago
            </label>
            <select
              id="modal-condicion-pago"
              disabled={isSaved}
              className="w-full rounded-lg border-none bg-surface-light py-2 px-3 text-xs focus:outline-none focus:ring-1 focus:ring-brand"
              value={condicionPago}
              onChange={(e) => setCondicionPago(e.target.value)}
            >
              {condicionesPago.map((cp) => (
                <option key={cp.num_item} value={cp.num_item}>
                  {cp.des_item}
                </option>
              ))}
            </select>
          </div>

          {/* Forma de Pago */}
          <div>
            <label
              htmlFor="modal-forma-pago"
              className="block font-semibold text-brand mb-1"
            >
              Forma / Medio de Pago
            </label>
            <select
              id="modal-forma-pago"
              disabled={isSaved}
              className="w-full rounded-lg border-none bg-surface-light py-2 px-3 text-xs focus:outline-none focus:ring-1 focus:ring-brand"
              value={formaPago}
              onChange={(e) => setFormaPago(e.target.value)}
            >
              {formasPago.map((fp) => (
                <option key={fp.num_item} value={fp.num_item}>
                  {fp.des_item}
                </option>
              ))}
            </select>
          </div>

          {/* Vendedor */}
          <div>
            <label
              htmlFor="modal-vendedor"
              className="block font-semibold text-brand mb-1"
            >
              Vendedor
            </label>
            <select
              id="modal-vendedor"
              disabled={isSaved}
              className="w-full rounded-lg border-none bg-surface-light py-2 px-3 text-xs focus:outline-none focus:ring-1 focus:ring-brand"
              value={vendedor}
              onChange={(e) => setVendedor(e.target.value)}
            >
              <option value="">SELECCIONE (OPCIONAL)</option>
              {vendedores.map((v) => (
                <option key={v.num_item} value={v.num_item}>
                  {v.des_item}
                </option>
              ))}
            </select>
          </div>

          {/* Doc Ref / O.C. */}
          <div>
            <label
              htmlFor="modal-doc-ref"
              className="block font-semibold text-brand mb-1"
            >
              Doc. Ref. / O.C.
            </label>
            <input
              id="modal-doc-ref"
              type="text"
              disabled={isSaved}
              className="w-full rounded-lg border-none bg-surface-light py-2 px-3 text-xs uppercase focus:outline-none focus:ring-1 focus:ring-brand"
              value={docRef}
              onChange={(e) => setDocRef(e.target.value)}
              placeholder="ORDEN DE COMPRA / REF"
            />
          </div>

          {/* N.º de Operación */}
          <div>
            <label
              htmlFor="modal-numero-operacion"
              className="block font-semibold text-brand mb-1"
            >
              N.º de Operación / Voucher
            </label>
            <input
              id="modal-numero-operacion"
              type="text"
              disabled={isSaved}
              className="w-full rounded-lg border-none bg-surface-light py-2 px-3 text-xs focus:outline-none focus:ring-1 focus:ring-brand font-mono"
              value={numeroOperacion}
              onChange={(e) => setNumeroOperacion(e.target.value)}
              placeholder="NRO DE VOUCHER"
            />
          </div>
        </div>

        {/* Items Table Section */}
        <div className="flex flex-col gap-3 mt-2">
          <div className="flex justify-between items-center">
            <span className="font-bold text-brand uppercase text-xs">
              Ítems del Comprobante
            </span>
            {!isSaved && (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleAgregarItem}
                  className="bg-brand hover:bg-brand/90 text-white font-bold py-2 px-3 rounded-lg text-xs uppercase transition-all shadow-sm flex items-center gap-1 cursor-pointer"
                >
                  <i className="fa-solid fa-plus"></i> Agregar item
                </button>
                <button
                  type="button"
                  onClick={handleEliminarItems}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded-lg text-xs uppercase transition-all shadow-sm flex items-center gap-1 cursor-pointer"
                >
                  <i className="fa-solid fa-trash"></i> Eliminar seleccionados
                </button>
              </div>
            )}
          </div>

          {/* Grid Table */}
          <div className="flex flex-col gap-1 shadow shadow-border-subtle rounded-lg">
            {/* Header */}
            <div className="grid grid-cols-[40px_1fr_80px_110px_90px_100px] gap-2 bg-muted-20 p-2 font-semibold text-text-secondary uppercase text-xs items-center divide-x divide-border-default">
              <div></div>
              <div>Descripción</div>
              <div className="text-center">Cant.</div>
              <div className="text-center">Precio Unit.</div>
              <div className="text-center">Dcto.</div>
              <div className="text-center">Total</div>
            </div>

            {/* Body */}
            <div className="max-h-48 overflow-y-visible divide-y divide-border-default/80 divide-dashed">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[40px_1fr_80px_110px_90px_100px] gap-2 p-2 items-center text-xs"
                >
                  {/* Checkbox */}
                  <div className="flex justify-center items-center">
                    <input
                      type="checkbox"
                      checked={item.isFromForm || checkedIds.has(item.id)}
                      onChange={() => toggleSelectItem(item.id)}
                      disabled={isSaved || item.isFromForm}
                      className="checkbox size-5 border-brand border rounded-sm text-brand checked:bg-brand checked:text-surface-light align-middle disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                  </div>

                  {/* Description */}
                  <div className="relative" ref={dropdownRef}>
                    <input
                      type="text"
                      value={item.descripcion}
                      disabled={isSaved}
                      onChange={(e) => {
                        updateItemField(
                          item.id,
                          "descripcion",
                          e.target.value.toUpperCase(),
                        );
                        setSearchTerm(e.target.value);
                        setActiveDropdownId(item.id);
                      }}
                      onFocus={() => {
                        if (!isSaved && item.descripcion.length >= 3) {
                          setSearchTerm(item.descripcion);
                          setActiveDropdownId(item.id);
                        }
                      }}
                      className="w-full bg-surface-light border-none rounded-lg p-1 px-2 text-xs uppercase focus:outline-none focus:ring-1 focus:ring-brand disabled:bg-surface-default"
                      placeholder="DESCRIPCIÓN DEL ÍTEM O SERVICIO"
                    />
                    {!isSaved &&
                      activeDropdownId === item.id &&
                      searchResults.length > 0 && (
                        <div className="absolute z-20 left-0 right-0 top-full mt-1 max-h-48 overflow-y-auto bg-surface-light border border-border-default rounded-lg shadow-lg">
                          {searchResults.map((prod) => (
                            <button
                              key={prod.codigo}
                              type="button"
                              onClick={() => handleSelectProduct(item.id, prod)}
                              className="w-full text-left px-3 py-2 text-xs hover:bg-brand/10 border-b border-border-default last:border-b-0 cursor-pointer"
                            >
                              <div className="font-semibold text-brand">
                                {prod.descripcion}
                              </div>
                              <div className="text-text-secondary">
                                <span>S/. {prod.precio_soles.toFixed(2)}</span>{" "}
                                |{" "}
                                <span>$ {prod.precio_dolares.toFixed(2)}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                  </div>

                  {/* Quantity */}
                  <div>
                    <input
                      type="number"
                      value={item.cantidad}
                      min={1}
                      disabled={isSaved}
                      onChange={(e) =>
                        updateItemField(
                          item.id,
                          "cantidad",
                          parseFloat(e.target.value) || 0,
                        )
                      }
                      className="w-full bg-surface-light border-none rounded-lg p-1 text-xs text-center focus:outline-none focus:ring-1 focus:ring-brand font-mono disabled:bg-surface-default"
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <input
                      type="number"
                      step="0.01"
                      value={item.precio}
                      min={0}
                      disabled={isSaved}
                      onChange={(e) =>
                        updateItemField(
                          item.id,
                          "precio",
                          parseFloat(e.target.value) || 0,
                        )
                      }
                      className="w-full bg-surface-light border-none rounded-lg p-1 text-xs text-right focus:outline-none focus:ring-1 focus:ring-brand font-mono disabled:bg-surface-default"
                    />
                  </div>

                  {/* Discount */}
                  <div>
                    <input
                      type="number"
                      step="0.01"
                      value={item.descuento || 0}
                      min={0}
                      disabled={isSaved}
                      onChange={(e) =>
                        updateItemField(
                          item.id,
                          "descuento",
                          parseFloat(e.target.value) || 0,
                        )
                      }
                      className="w-full bg-surface-light border-none rounded-lg p-1 text-xs text-right focus:outline-none focus:ring-1 focus:ring-brand font-mono disabled:bg-surface-default"
                    />
                  </div>

                  {/* Item Total */}
                  <div className="text-right font-semibold font-mono pr-2">
                    {(
                      item.cantidad * item.precio -
                      (item.descuento || 0)
                    ).toFixed(2)}
                  </div>
                </div>
              ))}
              {items.length === 0 && (
                <div className="p-6 text-center text-text-secondary italic text-xs bg-surface-default">
                  No hay ítems registrados en este comprobante.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom section (Observations & Totals) */}
        <div className="grid grid-cols-2 gap-6 mt-2">
          {/* Observations */}
          <div className="flex flex-col">
            <label
              htmlFor="modal-observaciones"
              className="block font-semibold text-brand mb-1"
            >
              Observaciones
            </label>
            <textarea
              id="modal-observaciones"
              rows={3}
              disabled={isSaved}
              className="w-full rounded-lg border-none bg-surface-light py-2 px-3 text-xs uppercase focus:outline-none focus:ring-1 focus:ring-brand disabled:bg-surface-default"
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              placeholder="OBSERVACIONES ADICIONALES DEL COMPROBANTE"
            />
          </div>

          {/* Totals Panel */}
          <div className="flex flex-col items-end justify-center gap-2 pr-2">
            {/* Sub Total */}
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="text-text-secondary w-28 text-right">
                Sub Total:
              </span>
              <span className="w-32 text-right bg-surface-light py-1.5 px-3 rounded-lg font-mono border border-border-default">
                {moneda === "002" ? "$ " : "S/. "}
                {subTotal.toFixed(2)}
              </span>
            </div>

            {/* IGV */}
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="text-text-secondary w-28 text-right">
                IGV ({igvPercent}%):
              </span>
              <span className="w-32 text-right bg-surface-light py-1.5 px-3 rounded-lg font-mono border border-border-default">
                {moneda === "002" ? "$ " : "S/. "}
                {igv.toFixed(2)}
              </span>
            </div>

            {/* Total */}
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="text-brand w-28 text-right font-bold">
                Total General:
              </span>
              <span className="w-32 text-right bg-brand/10 text-brand py-1.5 px-3 rounded-lg font-mono font-bold border border-brand/20">
                {moneda === "002" ? "$ " : "S/. "}
                {total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-border-default mt-2">
          <button
            type="button"
            onClick={handleImprimirPDF}
            disabled={!isSaved}
            title={
              isSaved
                ? "Imprimir PDF"
                : "Guarde el comprobante para habilitar la impresión PDF"
            }
            className="bg-brand hover:bg-brand/90 disabled:bg-gray-400 text-white font-bold py-2.5 px-6 rounded-lg text-xs uppercase transition-all shadow-sm flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
          >
            <i className="fa-solid fa-file-pdf text-sm"></i> Imprimir PDF
          </button>

          {!isSaved && (
            <button
              type="button"
              onClick={handleGuardar}
              disabled={isSaving}
              className="bg-brand hover:bg-brand/90 text-white font-bold py-2.5 px-6 rounded-lg text-xs uppercase transition-all shadow-sm flex items-center gap-1 cursor-pointer disabled:opacity-60 disabled:cursor-wait"
            >
              {isSaving ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i> Guardando...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-floppy-disk"></i> Guardar
                  Comprobante
                </>
              )}
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="bg-muted hover:bg-muted/90 text-surface-light font-bold py-2.5 px-6 rounded-lg text-xs uppercase transition-all shadow-sm flex items-center gap-1 cursor-pointer"
          >
            <i className="fa-solid fa-xmark"></i> Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
}
