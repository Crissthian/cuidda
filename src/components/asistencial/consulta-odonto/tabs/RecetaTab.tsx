import React, {
  Fragment,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { createPortal } from "react-dom";
import {
  useFieldArray,
  useForm,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import { useAtencionOdontoStore } from "../store/useAtencionOdontoStore";
import {
  cie10OdontoMock,
  medicamentosOdontoMock,
  viasAplicacionOdonto,
  frecuenciasOdonto,
  sistemasOdonto,
  type CIE10Item,
  type MedicamentoOdontoItem,
} from "@/lib/consultaOdontoData";
import PDFRecetaOdonto from "./PDFRecetaOdonto";

export interface DiagnosticoFormValue {
  cie10: string;
  diagnostico: string;
  tipo: string;
  sistema: string;
}

export interface RecetaFormValue {
  producto: string;
  cantidad: string;
  via: string;
  frecuencia: string;
  duracion: string;
  comentarios: string;
  cdg_medicamento: string;
}

export interface RecetaTabProps {
  codigo?: string;
  estado?: string;
  puedeImprimir?: boolean;
  abierto?: boolean;
  onLoadComplete?: (loaded: boolean) => void;
  readOnly?: boolean;
}

export interface RecetaTabRef {
  handleSave: () => Promise<boolean>;
  validate: () => Promise<boolean>;
  getFormData: () => Record<string, unknown>;
}

const EMPTY_DIAGNOSTICO: DiagnosticoFormValue = {
  cie10: "",
  diagnostico: "",
  tipo: "",
  sistema: "",
};

const EMPTY_RECETA: RecetaFormValue = {
  producto: "",
  cantidad: "",
  via: "",
  frecuencia: "",
  duracion: "",
  comentarios: "",
  cdg_medicamento: "",
};

const RecetaTabContent = ({
  codigo: _codigo,
  estado: _estado,
  abierto: _abierto,
  puedeImprimir = true,
  onLoadComplete,
  readOnly = false,
}: RecetaTabProps) => {
  const [modalBusquedaAbierto, setModalBusquedaAbierto] = useState(false);
  const [diagnosticoSeleccionadoIndex, setDiagnosticoSeleccionadoIndex] =
    useState<number | null>(null);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [resultadosFiltrados, setResultadosFiltrados] = useState<CIE10Item[]>(
    [],
  );
  const [buscando, setBuscando] = useState(false);

  const [modalConfirmacion, setModalConfirmacion] = useState<{
    abierto: boolean;
    tipo: "diagnostico" | "receta" | null;
    index: number | null;
  }>({ abierto: false, tipo: null, index: null });
  const [modalContainer, setModalContainer] = useState<HTMLElement | null>(
    null,
  );

  const {
    control,
    setValue,
    watch,
    register: registerField,
    formState: { errors },
  } = useFormContext();

  // Búsqueda de medicamentos en Receta
  const [activeSearchRowReceta, setActiveSearchRowReceta] = useState<
    number | null
  >(null);
  const [searchResultsReceta, setSearchResultsReceta] = useState<
    MedicamentoOdontoItem[]
  >([]);

  const {
    fields: diagnosticos,
    append: appendDiagnostico,
    remove: removeDiagnostico,
  } = useFieldArray({
    control,
    name: "diagnosticos",
  });

  const {
    fields: recetas,
    append: appendReceta,
    remove: removeReceta,
    move: moveReceta,
  } = useFieldArray({
    control,
    name: "recetas",
  });

  const { setAlergiasTemp, alergiasTemp } = useAtencionOdontoStore();

  useEffect(() => {
    setModalContainer(document.body);
    onLoadComplete?.(true);
  }, [onLoadComplete]);

  // Sincronización de alergias
  useEffect(() => {
    const currentAlergias = watch("alergias");
    if (alergiasTemp !== currentAlergias) {
      setValue("alergias", alergiasTemp);
    }
  }, [alergiasTemp, setValue, watch]);

  // Búsqueda CIE-10 mock
  useEffect(() => {
    if (terminoBusqueda.trim().length <= 2) {
      setResultadosFiltrados([]);
      return;
    }

    setBuscando(true);
    const timer = setTimeout(() => {
      const q = terminoBusqueda.toLowerCase();
      const filtered = cie10OdontoMock.filter(
        (item) =>
          item.codigo.toLowerCase().includes(q) ||
          item.descripcion.toLowerCase().includes(q),
      );
      setResultadosFiltrados(filtered);
      setBuscando(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [terminoBusqueda]);

  // Búsqueda de Medicamentos mock
  const handleProductSearchReceta = (rowIndex: number, term: string) => {
    setActiveSearchRowReceta(rowIndex);
    if (term.trim().length < 2) {
      setSearchResultsReceta([]);
      return;
    }
    const q = term.toLowerCase();
    const filtered = medicamentosOdontoMock.filter(
      (m) =>
        m.NombreProducto.toLowerCase().includes(q) ||
        m.CodigoInterno.toLowerCase().includes(q) ||
        m.PrincipioActivo.toLowerCase().includes(q),
    );
    setSearchResultsReceta(filtered);
  };

  const handleSelectProductReceta = (
    rowIndex: number,
    medicamento: MedicamentoOdontoItem,
  ) => {
    setValue(`recetas.${rowIndex}.producto`, medicamento.NombreProducto, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue(
      `recetas.${rowIndex}.cdg_medicamento`,
      String(medicamento.IdMedicamento),
      {
        shouldValidate: false,
        shouldDirty: true,
      },
    );
    setActiveSearchRowReceta(null);
    setSearchResultsReceta([]);
  };

  const agregarDiagnostico = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (readOnly) return;
    appendDiagnostico(EMPTY_DIAGNOSTICO);
  };

  const limpiarDiagnostico = (index: number) => {
    setValue(`diagnosticos.${index}`, EMPTY_DIAGNOSTICO);
  };

  const eliminarDiagnostico = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    e.preventDefault();
    if (readOnly) return;
    setModalConfirmacion({ abierto: true, tipo: "diagnostico", index });
  };

  const agregarReceta = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (readOnly) return;
    appendReceta(EMPTY_RECETA);
  };

  const limpiarReceta = (index: number) => {
    setValue(`recetas.${index}`, EMPTY_RECETA);
  };

  const eliminarReceta = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    e.preventDefault();
    if (readOnly) return;
    setModalConfirmacion({ abierto: true, tipo: "receta", index });
  };

  const confirmarEliminacion = () => {
    if (readOnly) {
      setModalConfirmacion({ abierto: false, tipo: null, index: null });
      return;
    }
    if (
      modalConfirmacion.tipo === "diagnostico" &&
      modalConfirmacion.index !== null
    ) {
      if (diagnosticos.length > 1) {
        removeDiagnostico(modalConfirmacion.index);
      } else {
        limpiarDiagnostico(modalConfirmacion.index);
      }
    } else if (
      modalConfirmacion.tipo === "receta" &&
      modalConfirmacion.index !== null
    ) {
      if (recetas.length > 1) {
        removeReceta(modalConfirmacion.index);
      } else {
        limpiarReceta(modalConfirmacion.index);
      }
    }
    setModalConfirmacion({ abierto: false, tipo: null, index: null });
  };

  const cancelarEliminacion = () => {
    setModalConfirmacion({ abierto: false, tipo: null, index: null });
  };

  const moverRecetaArriba = (index: number) => {
    if (index > 0) moveReceta(index, index - 1);
  };

  const moverRecetaAbajo = (index: number) => {
    if (index < recetas.length - 1) moveReceta(index, index + 1);
  };

  const abrirModalBusqueda = (index: number) => {
    if (readOnly) return;
    setDiagnosticoSeleccionadoIndex(index);
    setModalBusquedaAbierto(true);
    setTerminoBusqueda("");
    setResultadosFiltrados([]);
  };

  const cerrarModalBusqueda = () => {
    setModalBusquedaAbierto(false);
    setDiagnosticoSeleccionadoIndex(null);
    setTerminoBusqueda("");
    setResultadosFiltrados([]);
  };

  const seleccionarCIE10 = (cie10: CIE10Item) => {
    if (readOnly) return;
    if (diagnosticoSeleccionadoIndex !== null) {
      setValue(
        `diagnosticos.${diagnosticoSeleccionadoIndex}.cie10`,
        cie10.codigo,
      );
      setValue(
        `diagnosticos.${diagnosticoSeleccionadoIndex}.diagnostico`,
        cie10.descripcion,
      );
    }
    cerrarModalBusqueda();
  };

  const autocompletarCIE10 = (
    codigo: string,
    index: number,
    openModalIfNotFound = false,
  ) => {
    if (!codigo.trim()) return;
    const found = cie10OdontoMock.find(
      (item) => item.codigo.toUpperCase() === codigo.trim().toUpperCase(),
    );
    if (found) {
      setValue(`diagnosticos.${index}.diagnostico`, found.descripcion);
    } else if (openModalIfNotFound) {
      abrirModalBusqueda(index);
    }
  };

  // Preparar datos para el PDF de receta
  const currentDiagnosticos = watch("diagnosticos") || [];
  const currentRecetas = watch("recetas") || [];
  const currentAlergias = watch("alergias") || "";
  const currentRecomendaciones = watch("recomendaciones") || "";

  const diagnosticosPdf = currentDiagnosticos
    .filter((d: DiagnosticoFormValue) => d.cie10 && d.diagnostico)
    .map((d: DiagnosticoFormValue) => ({
      cie10: d.cie10,
      diagnostico: d.diagnostico,
    }));

  const recetasPdf = currentRecetas
    .filter((r: RecetaFormValue) => r.producto)
    .map((r: RecetaFormValue) => ({
      des_prod: r.producto,
      cant: r.cantidad,
      via_apli:
        viasAplicacionOdonto.find((v) => v.num_item === r.via)?.des_item ||
        r.via ||
        "ORAL",
      frec:
        frecuenciasOdonto.find((f) => f.num_item === r.frecuencia)?.des_item ||
        r.frecuencia ||
        "CADA 8 HORAS",
      durac: r.duracion || "3",
      comen: r.comentarios || "",
    }));

  return (
    <div className="space-y-8 text-start">
      <fieldset disabled={readOnly} className="contents">
        {/* Sección Diagnósticos */}
        <section className="text-text-primary">
          <h3 className="text-xl font-semibold mb-4">Diagnósticos</h3>

          <div className="rounded-lg overflow-hidden">
            {/* Header tabla */}
            <div
              className="gap-4 py-3 text-text-primary"
              style={{
                display: "grid",
                gridTemplateColumns: "120px 1fr 360px 80px 80px 80px 150px",
              }}
            >
              <div className="flex items-center gap-2 text-brand">
                <i className="fa-solid fa-book-medical"></i>
                <span className="font-semibold text-sm">CIE-10</span>
              </div>
              <div className="flex items-center gap-2 text-brand">
                <i className="fa-solid fa-book-medical"></i>
                <span className="font-semibold text-sm">DIAGNÓSTICO</span>
              </div>
              <div className="flex items-center gap-2 text-brand">
                <i className="fa-solid fa-lungs"></i>
                <span className="font-semibold text-sm">SISTEMA</span>
              </div>
              <div className="text-center">
                <span className="font-semibold text-sm">P</span>
              </div>
              <div className="text-center">
                <span className="font-semibold text-sm">D</span>
              </div>
              <div className="text-center">
                <span className="font-semibold text-sm">R</span>
              </div>
              <div></div>
            </div>

            {/* Filas diagnósticos */}
            <div>
              {diagnosticos.map((field, index) => {
                const diagnosticoErrorObj = errors?.diagnosticos as
                  | Array<{
                      cie10?: { message: string };
                      diagnostico?: { message: string };
                      tipo?: { message: string };
                    }>
                  | undefined;

                const errorCie10 = diagnosticoErrorObj?.[index]?.cie10;
                const errorDiagnostico =
                  diagnosticoErrorObj?.[index]?.diagnostico;
                const errorTipo = diagnosticoErrorObj?.[index]?.tipo;

                return (
                  <Fragment key={field.id}>
                    <div
                      className="gap-4 py-3 items-start"
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "120px 1fr 360px 80px 80px 80px 150px",
                      }}
                    >
                      <div className="flex flex-col">
                        <input
                          type="text"
                          placeholder="CIE-10"
                          className={`w-full px-2 py-2 border rounded bg-surface-light -outline-offset-2 uppercase ${
                            errorCie10 ? "border-red-500" : "border-none"
                          }`}
                          {...registerField(`diagnosticos.${index}.cie10`)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              abrirModalBusqueda(index);
                            } else if (e.key === "Tab") {
                              const cie10Val = watch(
                                `diagnosticos.${index}.cie10`,
                              );
                              const diagVal = watch(
                                `diagnosticos.${index}.diagnostico`,
                              );
                              if (!diagVal && cie10Val?.trim()) {
                                e.preventDefault();
                                autocompletarCIE10(cie10Val, index, true);
                              }
                            }
                          }}
                          onBlur={(e) => {
                            const cie10Val = e.target.value;
                            if (cie10Val.trim()) {
                              autocompletarCIE10(cie10Val, index, false);
                            }
                          }}
                        />
                        {errorCie10 && (
                          <span className="text-red-500 text-xs mt-2 w-96">
                            {errorCie10.message}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <input
                          type="text"
                          readOnly
                          tabIndex={-1}
                          placeholder="Descripción del diagnóstico"
                          className={`w-full px-3 py-2 rounded bg-surface-light uppercase ${
                            errorDiagnostico
                              ? "border border-red-500"
                              : "border-none"
                          }`}
                          {...registerField(
                            `diagnosticos.${index}.diagnostico`,
                          )}
                        />
                        {errorDiagnostico && (
                          <span className="text-red-500 text-xs mt-1">
                            {errorDiagnostico.message}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <select
                          className="w-full px-2 py-2 border-none rounded bg-surface-light text-sm uppercase text-text-primary cursor-pointer"
                          {...registerField(`diagnosticos.${index}.sistema`)}
                        >
                          <option value="">SELECCIONAR</option>
                          {sistemasOdonto.map((sistema, idx) => (
                            <option key={idx} value={sistema.num_item}>
                              {sistema.des_item}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="flex justify-center">
                          <input
                            type="radio"
                            value="p"
                            className="radio radio-info text-brand bg-muted-30"
                            {...registerField(`diagnosticos.${index}.tipo`)}
                          />
                        </div>
                        {errorTipo && index === 0 && (
                          <span className="text-red-500 text-xs mt-1 text-center whitespace-nowrap">
                            Seleccionar
                          </span>
                        )}
                      </div>
                      <div className="flex justify-center">
                        <input
                          type="radio"
                          value="d"
                          className="radio radio-info text-brand bg-muted-30"
                          {...registerField(`diagnosticos.${index}.tipo`)}
                        />
                      </div>
                      <div className="flex justify-center">
                        <input
                          type="radio"
                          value="r"
                          className="radio radio-info text-brand bg-muted-30"
                          {...registerField(`diagnosticos.${index}.tipo`)}
                        />
                      </div>
                      <div className="flex items-center justify-end gap-3">
                        <button
                          type="button"
                          onClick={agregarDiagnostico}
                          className="w-10 h-10 text-brand rounded-lg text-lg flex items-center justify-center hover:opacity-90 cursor-pointer"
                        >
                          <i className="fa-solid fa-plus text-2xl font-extrabold"></i>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => eliminarDiagnostico(e, index)}
                          className="w-10 h-10 text-red-500 rounded-lg flex items-center justify-center hover:opacity-90 cursor-pointer"
                        >
                          <i className="fa-solid fa-trash text-2xl"></i>
                        </button>
                      </div>
                    </div>
                  </Fragment>
                );
              })}
            </div>
          </div>
        </section>

        {/* Sección Receta */}
        <section className="text-text-primary">
          <h3 className="text-xl font-semibold mb-4 text-text-primary">
            Receta
          </h3>
          <div className="rounded-lg overflow-hidden">
            {/* Header tabla */}
            <div className="grid grid-cols-[60px_2fr_100px_160px_160px_100px_1.5fr_180px] py-3 gap-4 items-center">
              <div className="text-center">
                <span className="font-semibold text-xs">N°</span>
              </div>
              <div className="text-center">
                <span className="font-semibold text-xs">PRODUCTO</span>
              </div>
              <div className="text-center">
                <span className="font-semibold text-xs">CANTIDAD</span>
              </div>
              <div className="text-center">
                <span className="font-semibold text-xs">VÍA</span>
              </div>
              <div className="text-center">
                <span className="font-semibold text-xs">FRECUENCIA</span>
              </div>
              <div className="text-center">
                <span className="font-semibold text-xs">DURACIÓN (días)</span>
              </div>
              <div className="text-center">
                <span className="font-semibold text-xs">COMENTARIOS</span>
              </div>
              <div></div>
            </div>

            {/* Filas receta */}
            <div>
              {recetas.map((field, index) => (
                <Fragment key={field.id}>
                  <div className="grid grid-cols-[60px_2fr_100px_160px_160px_100px_1.5fr_180px] py-3 gap-4 items-center text-sm">
                    <div className="text-center">
                      <span className="font-medium">{index + 1}.-</span>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded bg-surface-light border-none uppercase text-text-primary"
                        placeholder="Buscar producto..."
                        {...registerField(`recetas.${index}.producto`, {
                          onChange: (e) => {
                            handleProductSearchReceta(index, e.target.value);
                          },
                        })}
                        onFocus={(e) => {
                          setActiveSearchRowReceta(index);
                          if (e.target.value.length >= 2) {
                            handleProductSearchReceta(index, e.target.value);
                          }
                        }}
                        onBlur={() => {
                          setTimeout(() => setActiveSearchRowReceta(null), 250);
                        }}
                      />
                      <input
                        type="hidden"
                        {...registerField(`recetas.${index}.cdg_medicamento`)}
                      />

                      {/* Dropdown de autocompletado */}
                      {activeSearchRowReceta === index &&
                        searchResultsReceta.length > 0 && (
                          <div className="absolute z-60 left-0 right-0 mt-1 bg-surface-default border border-border-default rounded-lg shadow-lg max-h-64 overflow-y-auto">
                            {searchResultsReceta.map((result) => (
                              <div
                                key={result.CodigoInterno}
                                className="w-full text-left p-2 hover:bg-surface-light text-sm border-b border-border-default last:border-0 cursor-pointer"
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  handleSelectProductReceta(index, result);
                                }}
                              >
                                <div className="font-medium text-text-primary">
                                  {result.NombreProducto}
                                </div>
                                <div className="text-xs text-text-secondary">
                                  Código: {result.CodigoInterno} | Stock:{" "}
                                  {result.StockActual}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                    </div>

                    <input
                      type="text"
                      className="w-full px-3 py-2 border-none rounded bg-surface-light uppercase text-text-primary"
                      {...registerField(`recetas.${index}.cantidad`)}
                    />

                    <select
                      className="w-full px-3 py-2 border-none rounded bg-surface-light uppercase text-text-primary cursor-pointer"
                      {...registerField(`recetas.${index}.via`)}
                    >
                      <option value="">Seleccionar</option>
                      {viasAplicacionOdonto.map((via, idx) => (
                        <option key={idx} value={via.num_item}>
                          {via.des_item}
                        </option>
                      ))}
                    </select>

                    <select
                      className="w-full px-3 py-2 border-none rounded bg-surface-light uppercase text-text-primary cursor-pointer"
                      {...registerField(`recetas.${index}.frecuencia`)}
                    >
                      <option value="">Seleccionar</option>
                      {frecuenciasOdonto.map((frecuencia, idx) => (
                        <option key={idx} value={frecuencia.num_item}>
                          {frecuencia.des_item}
                        </option>
                      ))}
                    </select>

                    <input
                      type="text"
                      className="px-3 py-2 border-none rounded bg-surface-light uppercase text-text-primary"
                      {...registerField(`recetas.${index}.duracion`)}
                    />

                    <input
                      type="text"
                      className="w-full px-3 py-2 border-none rounded bg-surface-light uppercase text-text-primary"
                      {...registerField(`recetas.${index}.comentarios`)}
                    />

                    {!readOnly ? (
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => moverRecetaArriba(index)}
                          disabled={index === 0}
                          className="w-8 h-8 text-brand disabled:text-gray-300 rounded-lg flex items-center justify-center hover:opacity-90 cursor-pointer disabled:cursor-not-allowed"
                          title="Mover arriba"
                        >
                          <i className="fa-solid fa-arrow-up text-lg"></i>
                        </button>
                        <button
                          type="button"
                          onClick={() => moverRecetaAbajo(index)}
                          disabled={index === recetas.length - 1}
                          className="w-8 h-8 text-brand disabled:text-gray-300 rounded-lg flex items-center justify-center hover:opacity-90 cursor-pointer disabled:cursor-not-allowed"
                          title="Mover abajo"
                        >
                          <i className="fa-solid fa-arrow-down text-lg"></i>
                        </button>
                        <button
                          type="button"
                          onClick={agregarReceta}
                          className="w-8 h-8 text-brand rounded-lg text-lg flex items-center justify-center hover:opacity-90 cursor-pointer"
                        >
                          <i className="fa-solid fa-plus text-xl font-extrabold"></i>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => eliminarReceta(e, index)}
                          className="w-8 h-8 text-red-500 rounded-lg flex items-center justify-center hover:opacity-90 cursor-pointer"
                        >
                          <i className="fa-solid fa-trash text-lg"></i>
                        </button>
                      </div>
                    ) : null}
                  </div>
                </Fragment>
              ))}
            </div>
          </div>

          <div className="py-4 flex flex-row gap-2 w-full">
            <div className="flex-1">
              <label
                className="block mb-2 font-semibold text-brand"
                htmlFor="alergias"
              >
                Alergias:
              </label>
              <textarea
                id="alergias"
                className="w-full px-3 py-2 border-none rounded bg-surface-light resize-y -outline-offset-1 uppercase text-text-primary"
                rows={4}
                {...registerField("alergias", {
                  onChange: (e) => setAlergiasTemp(e.target.value),
                })}
              ></textarea>
            </div>
            <div className="flex-1">
              <label
                className="block mb-2 font-semibold text-brand"
                htmlFor="recomendaciones"
              >
                Recomendaciones:
              </label>
              <textarea
                id="recomendaciones"
                className="w-full px-3 py-2 border-none rounded bg-surface-light resize-y -outline-offset-1 uppercase text-text-primary"
                rows={4}
                {...registerField("recomendaciones")}
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end">
            {!readOnly ? (
              <PDFRecetaOdonto
                codigoAtencion="00000101"
                disabled={!puedeImprimir}
                diagnosticos={diagnosticosPdf}
                recetas={recetasPdf}
                alergias={currentAlergias}
                recomendaciones={currentRecomendaciones}
              />
            ) : null}
          </div>
        </section>
      </fieldset>

      {/* Modal de confirmación de eliminación */}
      {!readOnly &&
        modalConfirmacion.abierto &&
        modalContainer &&
        createPortal(
          <div className="absolute inset-0 flex items-center justify-center p-4 z-60">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={cancelarEliminacion}
            ></div>
            <div className="relative bg-surface-light rounded-lg w-full max-w-md shadow-xl z-10">
              <div className="px-6 py-4 border-b border-border-default">
                <h3 className="text-xl font-semibold text-text-primary">
                  Confirmar eliminación
                </h3>
              </div>
              <div className="px-6 py-6">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                    <i className="fa-solid fa-exclamation-triangle text-red-600 text-xl"></i>
                  </div>
                  <div className="flex-1">
                    <p className="text-text-primary text-base leading-relaxed">
                      ¿Está seguro de que desea eliminar este{" "}
                      {modalConfirmacion.tipo === "diagnostico"
                        ? "diagnóstico"
                        : "receta"}
                      ?
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      Esta acción no se puede deshacer.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 px-6 py-4 bg-surface-light rounded-b-lg">
                <button
                  type="button"
                  onClick={cancelarEliminacion}
                  className="px-6 py-2 bg-muted hover:bg-muted-80 text-white rounded-lg font-medium transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={confirmarEliminacion}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors cursor-pointer"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>,
          modalContainer,
        )}

      {/* Modal de búsqueda CIE-10 */}
      {!readOnly && modalBusquedaAbierto && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm z-60">
          <div className="rounded-lg w-full max-w-3xl max-h-[80vh] flex flex-col shadow-2xl bg-surface-light border border-border-default">
            <div className="flex justify-between items-center px-6 py-4 border-b border-border-default bg-surface-light rounded-t-lg">
              <h3 className="text-xl font-semibold text-text-primary">
                Búsqueda de Diagnósticos CIE-10
              </h3>
              <button
                type="button"
                onClick={cerrarModalBusqueda}
                className="text-text-primary hover:text-text-primary transition-colors cursor-pointer"
              >
                <i className="fa-solid fa-times text-2xl"></i>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 bg-surface-light text-text-primary">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Buscar por código o descripción (ej: caries, pulpitis, K02)..."
                  className="w-full px-4 py-3 border border-border-default rounded-lg bg-surface-default text-text-primary outline-none focus:ring-1 focus:ring-brand"
                  autoFocus
                  value={terminoBusqueda}
                  onChange={(e) => setTerminoBusqueda(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                {terminoBusqueda.trim().length < 3 ? (
                  <div className="text-center py-12">
                    <i className="fa-solid fa-search text-5xl text-text-secondary mb-4"></i>
                    <p className="text-text-secondary text-lg">
                      Ingrese al menos 3 caracteres para buscar diagnósticos
                      CIE-10
                    </p>
                  </div>
                ) : buscando ? (
                  <div className="text-center py-12">
                    <i className="fa-solid fa-spinner fa-spin text-5xl text-brand mb-4"></i>
                    <p className="text-text-secondary text-lg">Buscando...</p>
                  </div>
                ) : resultadosFiltrados.length > 0 ? (
                  <>
                    <p className="text-sm text-text-secondary mb-3">
                      Se muestran {resultadosFiltrados.length} resultado(s)
                    </p>
                    {resultadosFiltrados.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => seleccionarCIE10(item)}
                        className="p-4 border border-border-default rounded-lg hover:bg-brand hover:text-white cursor-pointer transition-all duration-150 bg-surface-default"
                      >
                        <div className="flex gap-3 items-start">
                          <span className="font-bold text-base">
                            {item.codigo}
                          </span>
                          <span>—</span>
                          <span className="flex-1 leading-relaxed">
                            {item.descripcion}
                          </span>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <i className="fa-solid fa-folder-open text-5xl text-text-secondary mb-4"></i>
                    <p className="text-text-secondary text-lg">
                      No se encontraron resultados para "{terminoBusqueda}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Componente para la prescripción de recetas y registro de diagnósticos CIE-10.
 */
export const RecetaTab = forwardRef<RecetaTabRef, RecetaTabProps>(
  (props, ref) => {
    const methods = useForm({
      defaultValues: {
        diagnosticos: [EMPTY_DIAGNOSTICO],
        recetas: [EMPTY_RECETA],
        alergias: "",
        recomendaciones: "",
      },
    });

    useImperativeHandle(ref, () => ({
      handleSave: async () => true,
      getFormData: () => methods.getValues(),
      validate: async () => await methods.trigger(),
    }));

    return (
      <FormProvider {...methods}>
        <RecetaTabContent {...props} />
      </FormProvider>
    );
  },
);

RecetaTab.displayName = "RecetaTab";
