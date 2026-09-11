/**
 * Odontograma.tsx
 * Componente principal del Odontograma.
 *
 * Responsabilidades:
 * 1. Gestionar el estado de la vista (Adulto/Niño).
 * 2. Gestionar el estado de la selección de herramientas (SelectionMode).
 * 3. Coordinar la interacción entre la barra de herramientas y los dientes.
 * 4. Renderizar la capa de interacción (ToothColumn) y la capa gráfica (SVG Overlay).
 * 5. Manejar problemas de renderizado inicial (visibilidad en pestañas ocultas).
 */

import React, { useState, useRef, useEffect, useCallback } from "react";
import type {
  OdontogramaProps,
  HallazgoClinico,
  SelectionMode,
  ToothData,
} from "./types";
import {
  ADULT_TEETH_UPPER,
  ADULT_TEETH_LOWER,
  CHILD_TEETH_UPPER,
  CHILD_TEETH_LOWER,
} from "./constants";
import {
  ToothColumn,
  OdontogramaToolbar,
  OdontogramaSvgOverlay,
} from "./components";
import {
  getTeethInRange,
  isToothInvalid,
  hasBridgeBetween,
  isUpperArch,
} from "./utils";
import { useSelectionMode, useHallazgosDerivados } from "./hooks";
import {
  handleRestauracionClick,
  handleRestauracionTemporalClick,
  handleSellanteClick,
  handleSuperficieDesgastadaClick,
  handleTratamientoConductoClick,
  handleTransposicionClick,
  processToothClick,
  type ClickHandlerContext,
} from "./handlers";
import { toast } from "sonner";

export const Odontograma: React.FC<OdontogramaProps> = ({
  hallazgos = [],
  onHallazgoCreated,
  onHallazgoDeleted,
}) => {
  // ============================================================================
  // ESTADO Y REFERENCIAS
  // ============================================================================

  // Modo de vista: 'adult' (Adulto) o 'child' (Niño/Decidua)
  const [viewMode, setViewMode] = useState<"adult" | "child">("adult");

  // Input para etiqueta de corona (aunque se maneja en toolbar, el estado vive aquí para pasarlo a los handlers)
  const [crownLabelInput, setCrownLabelInput] = useState("CR");
  const crownLabelInputRef = useRef(crownLabelInput);

  // Mantener la ref del input actualizada para usarla en callbacks sin dependencias
  useEffect(() => {
    crownLabelInputRef.current = crownLabelInput;
  }, [crownLabelInput]);

  // Estado del modo de selección (herramienta activa)
  const [selectionMode, setSelectionMode] = useState<SelectionMode>({
    isActive: false,
    type: "fixed",
    status: "bueno",
    startId: null,
  });

  // Referencias a los elementos DOM de los dientes para cálculos de SVG
  const toothRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);

  // Flag para indicar que las referencias están listas y posicionadas.
  // Usamos un número (key) para forzar el repintado de los gráficos SVG.
  const [refreshKey, setRefreshKey] = useState(0);
  const triggerRefresh = useCallback(
    () => setRefreshKey((prev) => prev + 1),
    [],
  );

  // ============================================================================
  // DATOS DERIVADOS
  // ============================================================================

  const upperTeeth =
    viewMode === "adult" ? ADULT_TEETH_UPPER : CHILD_TEETH_UPPER;
  const lowerTeeth =
    viewMode === "adult" ? ADULT_TEETH_LOWER : CHILD_TEETH_LOWER;

  // ============================================================================
  // HOOKS PERSONALIZADOS
  // ============================================================================

  // Hook para lógica de selección (Drag & Drop simulado por clicks: inicio -> fin)
  const { startSelection, cancelSelection } = useSelectionMode({
    hallazgos,
    onHallazgoCreated,
    onHallazgoDeleted,
    selectionMode,
    setSelectionMode,
    viewMode,
  });

  // Hook para procesar los hallazgos y obtener listas clasificadas memoizadas
  const {
    appliances,
    crowns,
    cariesList,
    diastemas,
    espigos,
    fractures,
    fusions,
    geminations,
    giroversions,
    piezasAusentes,
    dientesEnClavija,
    piezasErupccion,
    piezasExtruidas,
    piezasIntruidas,
    piezasSupernumerarias,
    pulpotomias,
    protesisFija,
    restauraciones,
    restauracionesTemporales,
    sellantes,
    superficiesDesgastadas,
    tratamientosConducto,
    transposiciones,
    defectosEsmalte,
    fosasFisuras,
    impactacion,
    implanteDental,
    macrodoncia,
    microdoncia,
    movilidadPatologica,
    posicionesAnormales,
    piezasEctopicas,
    remanenteRadicular,
  } = useHallazgosDerivados(hallazgos);

  // ============================================================================
  // EFECTOS
  // ============================================================================

  useEffect(() => {
    const validIds = new Set([...upperTeeth, ...lowerTeeth].map((t) => t.id));

    const newRefs = new Map<number, HTMLDivElement>();
    toothRefs.current.forEach((el, id) => {
      if (validIds.has(id)) {
        newRefs.set(id, el);
      }
    });
    toothRefs.current = newRefs;

    // Usamos un patrón de doble requestAnimationFrame para asegurar que el navegador
    // haya realizado el layout completo y las posiciones de los dientes sean estables.
    let rafId = requestAnimationFrame(() => {
      rafId = requestAnimationFrame(() => {
        triggerRefresh();
      });
    });

    return () => cancelAnimationFrame(rafId);
  }, [viewMode, upperTeeth, lowerTeeth, triggerRefresh]);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry && entry.contentRect.width > 0) {
        // Forzar recálculo de posiciones en el siguiente ciclo de pintado
        requestAnimationFrame(() => {
          triggerRefresh();
        });
      }
    });

    observer.observe(containerRef.current);

    // También forzamos un refresco extra al montar para asegurar que las
    // posiciones iniciales post-hidratación se capturen.
    const initialRaf = requestAnimationFrame(() => triggerRefresh());

    return () => {
      observer.disconnect();
      cancelAnimationFrame(initialRaf);
    };
  }, [triggerRefresh]);

  /**
   * EFECTO: Auto-Consistencia de Hallazgos
   *
   * Valida automáticamente los hallazgos cuando hay cambios.
   * Por ejemplo: Elimina un aparato fijo si uno de sus dientes ancla es marcado como "Ausente".
   */
  useEffect(() => {
    if (!onHallazgoDeleted) return;

    const allCurrentViewIds = [...upperTeeth, ...lowerTeeth].map((t) => t.id);

    // 1. Validar Aparatos Fijos
    appliances
      .filter((a) => a.type === "fixed")
      .forEach((app) => {
        if (
          !allCurrentViewIds.includes(app.startId) &&
          !allCurrentViewIds.includes(app.endId)
        )
          return;

        const range = getTeethInRange(
          app.startId,
          app.endId,
          upperTeeth,
          lowerTeeth,
        );
        const validTeeth = range.filter((id) => !isToothInvalid(id, hallazgos));
        // Si faltan dientes intermedios o extremos, eliminar aparato
        if (
          validTeeth.length < 2 ||
          range.some((id) => isToothInvalid(id, hallazgos))
        ) {
          onHallazgoDeleted(app.id);
        }
      });

    // 2. Validar Aparatos Removibles
    appliances
      .filter((a) => a.type === "removable")
      .forEach((app) => {
        if (
          !allCurrentViewIds.includes(app.startId) &&
          !allCurrentViewIds.includes(app.endId)
        )
          return;
        const range = getTeethInRange(
          app.startId,
          app.endId,
          upperTeeth,
          lowerTeeth,
        );
        const validTeeth = range.filter((id) => !isToothInvalid(id, hallazgos));
        if (validTeeth.length === 0) {
          onHallazgoDeleted(app.id);
        }
      });

    // 3. Validar Coronas
    crowns.forEach((c) => {
      if (!allCurrentViewIds.includes(c.toothId)) return;
      if (isToothInvalid(c.toothId, hallazgos)) onHallazgoDeleted(c.id);
    });

    // 4. Validar Caries
    cariesList.forEach((c) => {
      if (!allCurrentViewIds.includes(c.toothId)) return;
      if (isToothInvalid(c.toothId, hallazgos) || c.surfaces.length === 0) {
        onHallazgoDeleted(c.id);
      }
    });

    // 5. Validar Diastemas
    diastemas.forEach((d) => {
      if (
        !allCurrentViewIds.includes(d.startId) &&
        !allCurrentViewIds.includes(d.endId)
      )
        return;
      if (
        isToothInvalid(d.startId, hallazgos) ||
        isToothInvalid(d.endId, hallazgos)
      ) {
        onHallazgoDeleted(d.id);
        return;
      }
      // Eliminar diastema si hay un puente encima
      if (
        hasBridgeBetween(d.startId, d.endId, appliances, upperTeeth, lowerTeeth)
      ) {
        onHallazgoDeleted(d.id);
      }
    });

    // 6. Validar Espigos
    espigos.forEach((e) => {
      if (!allCurrentViewIds.includes(e.toothId)) return;
      if (isToothInvalid(e.toothId, hallazgos)) onHallazgoDeleted(e.id);
    });

    // 7. Validar Fusiones y Geminaciones
    fusions.forEach((f) => {
      if (
        !allCurrentViewIds.includes(f.startId) &&
        !allCurrentViewIds.includes(f.endId)
      )
        return;
      if (
        isToothInvalid(f.startId, hallazgos) ||
        isToothInvalid(f.endId, hallazgos)
      )
        onHallazgoDeleted(f.id);
    });
    geminations.forEach((g) => {
      if (!allCurrentViewIds.includes(g.toothId)) return;
      if (isToothInvalid(g.toothId, hallazgos)) onHallazgoDeleted(g.id);
    });

    // 8. Validar Giroversiones
    giroversions.forEach((g) => {
      if (!allCurrentViewIds.includes(g.toothId)) return;
      if (isToothInvalid(g.toothId, hallazgos)) onHallazgoDeleted(g.id);
    });

    // 9. Validar Otras anomalías (Clavija, Erupción, Extruidas, Intruidas, Supernumerarias)
    dientesEnClavija.forEach((d) => {
      if (!allCurrentViewIds.includes(d.toothId)) return;
      if (isToothInvalid(d.toothId, hallazgos)) onHallazgoDeleted(d.id);
    });
    piezasErupccion.forEach((p) => {
      if (!allCurrentViewIds.includes(p.toothId)) return;
      if (isToothInvalid(p.toothId, hallazgos)) onHallazgoDeleted(p.id);
    });
    piezasExtruidas.forEach((p) => {
      if (!allCurrentViewIds.includes(p.toothId)) return;
      if (isToothInvalid(p.toothId, hallazgos)) onHallazgoDeleted(p.id);
    });
    piezasIntruidas.forEach((p) => {
      if (!allCurrentViewIds.includes(p.toothId)) return;
      if (isToothInvalid(p.toothId, hallazgos)) onHallazgoDeleted(p.id);
    });
    piezasSupernumerarias.forEach((p) => {
      if (
        !allCurrentViewIds.includes(p.startId) &&
        !allCurrentViewIds.includes(p.endId)
      )
        return;
      if (
        isToothInvalid(p.startId, hallazgos) ||
        isToothInvalid(p.endId, hallazgos)
      )
        onHallazgoDeleted(p.id);
    });

    // 10. Validar Tratamientos (Pulpotomia, TC, Sellantes, Restauraciones)
    pulpotomias.forEach((p) => {
      if (!allCurrentViewIds.includes(p.toothId)) return;
      if (isToothInvalid(p.toothId, hallazgos)) onHallazgoDeleted(p.id);
    });
    restauraciones.forEach((r) => {
      if (!allCurrentViewIds.includes(r.toothId)) return;
      if (isToothInvalid(r.toothId, hallazgos) || r.surfaces.length === 0)
        onHallazgoDeleted(r.id);
    });
    restauracionesTemporales.forEach((r) => {
      if (!allCurrentViewIds.includes(r.toothId)) return;
      if (isToothInvalid(r.toothId, hallazgos) || r.surfaces.length === 0)
        onHallazgoDeleted(r.id);
    });
    superficiesDesgastadas.forEach((s) => {
      if (!allCurrentViewIds.includes(s.toothId)) return;
      if (isToothInvalid(s.toothId, hallazgos) || s.surfaces.length === 0)
        onHallazgoDeleted(s.id);
    });
    tratamientosConducto.forEach((t) => {
      if (!allCurrentViewIds.includes(t.toothId)) return;
      if (isToothInvalid(t.toothId, hallazgos)) onHallazgoDeleted(t.id);
    });
    sellantes.forEach((s) => {
      if (!allCurrentViewIds.includes(s.toothId)) return;
      if (isToothInvalid(s.toothId, hallazgos)) onHallazgoDeleted(s.id);
    });
    transposiciones.forEach((t) => {
      if (
        !allCurrentViewIds.includes(t.startId) &&
        !allCurrentViewIds.includes(t.endId)
      )
        return;
      if (
        isToothInvalid(t.startId, hallazgos) ||
        isToothInvalid(t.endId, hallazgos)
      )
        onHallazgoDeleted(t.id);
    });
    macrodoncia.forEach((m) => {
      if (!allCurrentViewIds.includes(m.toothId)) return;
      if (isToothInvalid(m.toothId, hallazgos)) onHallazgoDeleted(m.id);
    });
    microdoncia.forEach((m) => {
      if (!allCurrentViewIds.includes(m.toothId)) return;
      if (isToothInvalid(m.toothId, hallazgos)) onHallazgoDeleted(m.id);
    });
    posicionesAnormales.forEach((p) => {
      if (!allCurrentViewIds.includes(p.toothId)) return;
      if (isToothInvalid(p.toothId, hallazgos)) onHallazgoDeleted(p.id);
    });
    movilidadPatologica.forEach((m) => {
      if (!allCurrentViewIds.includes(m.toothId)) return;
      if (isToothInvalid(m.toothId, hallazgos)) onHallazgoDeleted(m.id);
    });
    piezasEctopicas.forEach((p) => {
      if (!allCurrentViewIds.includes(p.toothId)) return;
      if (isToothInvalid(p.toothId, hallazgos)) onHallazgoDeleted(p.id);
    });
  }, [
    hallazgos,
    // Dependencias de todas las listas derivadas para re-ejecutar validación
    appliances,
    crowns,
    cariesList,
    diastemas,
    espigos,
    fractures,
    fusions,
    geminations,
    giroversions,
    onHallazgoDeleted,
    upperTeeth,
    lowerTeeth,
    piezasAusentes,
    dientesEnClavija,
    piezasErupccion,
    piezasExtruidas,
    piezasIntruidas,
    piezasSupernumerarias,
    restauraciones,
    restauracionesTemporales,
    sellantes,
    superficiesDesgastadas,
    tratamientosConducto,
    pulpotomias,
    transposiciones,
    defectosEsmalte,
    fosasFisuras,
    impactacion,
    fosasFisuras,
    impactacion,
    implanteDental,
    macrodoncia,
    microdoncia,
    movilidadPatologica,
    posicionesAnormales,
    piezasEctopicas,
  ]);

  // ============================================================================
  // HANDLERS
  // ============================================================================

  /**
   * Construye el objeto de contexto común necesario para los handlers externos.
   */
  const createHandlerContext = (
    toothId: number,
    positionOverride?: "upper" | "lower",
  ): ClickHandlerContext => ({
    id: toothId,
    position: positionOverride || (isUpperArch(toothId) ? "upper" : "lower"),
    hallazgos,
    selectionMode,
    setSelectionMode,
    onHallazgoCreated,
    onHallazgoDeleted,
    crownLabelInput,
    upperTeeth,
    lowerTeeth,
    appliances,
    crowns,
    cariesList,
    diastemas,
    espigos,
    fractures,
    fusions,
    geminations,
    giroversions,
    piezasAusentes,
    dientesEnClavija,
    piezasErupccion,
    piezasExtruidas,
    piezasIntruidas,
    piezasSupernumerarias,
    pulpotomias,
    protesisFija,
    restauraciones,
    restauracionesTemporales,
    sellantes,
    superficiesDesgastadas,
    tratamientosConducto,
    transposiciones,
    defectosEsmalte,
    fosasFisuras,
    impactacion,

    implanteDental,
    macrodoncia,
    microdoncia,
    posicionesAnormales,
    movilidadPatologica,
    piezaEctopica: piezasEctopicas,
    remanenteRadicular,
    viewMode,
  });

  /**
   * Handler para clicks en superficies/zonas del diente (ej. zonas de caries, caras restauradas).
   */
  const handleZoneClick = useCallback(
    (toothId: number, zone: string) => {
      const context = createHandlerContext(toothId);

      // 1. Restauración Definitiva
      if (
        selectionMode.isActive &&
        selectionMode.type === "restauracion_definitiva"
      ) {
        handleRestauracionClick(context, zone);
        return;
      }
      // 2. Restauración Temporal
      if (
        selectionMode.isActive &&
        selectionMode.type === "restauracion_temporal"
      ) {
        handleRestauracionTemporalClick(context, zone);
        return;
      }
      // 3. Superficie Desgastada
      if (
        selectionMode.isActive &&
        selectionMode.type === "superficie_desgastada"
      ) {
        handleSuperficieDesgastadaClick(context, zone);
        return;
      }
      // 4. Sellantes (bueno/malo) - No depende de la zona específica clickeada, pero se activa aquí
      if (
        selectionMode.isActive &&
        ["sealant_good", "sealant_bad"].includes(selectionMode.type)
      ) {
        handleSellanteClick(context);
        return;
      }
      // 5. Tratamiento de Conducto
      if (
        selectionMode.isActive &&
        selectionMode.type === "tratamiento_conducto"
      ) {
        handleTratamientoConductoClick(context, "TC");
        return;
      }
      // 6. Pulpectomía
      if (selectionMode.isActive && selectionMode.type === "pulpectomia") {
        handleTratamientoConductoClick(context, "PC");
        return;
      }
      // 7. Transposición
      if (selectionMode.isActive && selectionMode.type === "transposicion") {
        handleTransposicionClick(context);
        return;
      }

      // 8. Caries (Default para zonas)
      const isCariesMode =
        selectionMode.isActive &&
        ["caries_mb", "caries_ce", "caries_cd", "caries_cdp"].includes(
          selectionMode.type,
        );

      if (!isCariesMode) return;

      if (isToothInvalid(toothId, hallazgos)) {
        toast("No se puede registrar caries en un diente ausente o inválido.");
        return;
      }

      // Lógica específica de Caries (Gestión local rápida)
      let sigla = "CE";
      switch (selectionMode.type) {
        case "caries_mb":
          sigla = "MB";
          break;
        case "caries_cd":
          sigla = "CD";
          break;
        case "caries_cdp":
          sigla = "CDP";
          break;
        default:
          sigla = "CE";
      }

      const existingCaries = cariesList.find((c) => c.toothId === toothId);

      if (existingCaries) {
        // Toggle de la superficie en la caries existente
        let newSurfaces = [...existingCaries.surfaces];
        if (newSurfaces.includes(zone)) {
          newSurfaces = newSurfaces.filter((s) => s !== zone);
        } else {
          newSurfaces.push(zone);
        }

        if (onHallazgoDeleted) onHallazgoDeleted(existingCaries.id);

        if (newSurfaces.length > 0) {
          const newHallazgo: HallazgoClinico = {
            id: Date.now().toString(),
            diente: toothId,
            hallazgo: "CARIES",
            estado: "malo",
            siglas: sigla,
            superficies: newSurfaces,
            especificacion: `Caries ${sigla} en ${newSurfaces.join(", ")}`,
            fecha: new Date().toLocaleDateString("es-PE"),
          };
          onHallazgoCreated(newHallazgo);
        }
      } else {
        // Crear nueva caries
        const newHallazgo: HallazgoClinico = {
          id: Date.now().toString(),
          diente: toothId,
          hallazgo: "CARIES",
          estado: "malo",
          siglas: sigla,
          superficies: [zone],
          especificacion: `Caries ${sigla} en ${zone}`,
          fecha: new Date().toLocaleDateString("es-PE"),
        };
        onHallazgoCreated(newHallazgo);
      }
    },
    [
      selectionMode,
      hallazgos,
      cariesList,
      onHallazgoCreated,
      onHallazgoDeleted,
      createHandlerContext,
    ],
  );

  /**
   * Handler para click general en el diente (coronas, extracciones, etc.).
   * Delega toda la lógica al helper `processToothClick` que distribuye a handlers específicos.
   */
  const handleToothClick = useCallback(
    (id: number, position: "upper" | "lower") => {
      if (!selectionMode.isActive) return;

      // Reconstruimos el contexto con los valores más recientes
      // Usando crownLabelInputRef para evitar dependencias inestables si cambiara rápido
      const context = {
        ...createHandlerContext(id, position),
        crownLabelInput: crownLabelInputRef.current,
      };

      processToothClick(context);
    },
    [selectionMode, createHandlerContext],
  );

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  /** Renderiza una fila de dientes filtrada */
  const renderTeethRow = (
    teeth: ToothData[],
    position: "upper" | "lower",
    filter: (t: ToothData) => boolean,
  ) => {
    return teeth.filter(filter).map((tooth) => (
      <ToothColumn
        key={tooth.id}
        id={tooth.id}
        position={position}
        ref={(el) => {
          if (el) toothRefs.current.set(tooth.id, el);
          else toothRefs.current.delete(tooth.id);
        }}
        onToothClick={handleToothClick}
        onZoneClick={handleZoneClick}
        crown={crowns.find((c) => c.toothId === tooth.id)}
        caries={cariesList.find((c) => c.toothId === tooth.id)}
        piezaAusente={piezasAusentes.find((p) => p.toothId === tooth.id)}
        pulpotomia={pulpotomias.find((p) => p.toothId === tooth.id)}
        restauracion={restauraciones.find((r) => r.toothId === tooth.id)}
        restauracionTemporal={restauracionesTemporales.find(
          (r) => r.toothId === tooth.id,
        )}
        superficieDesgastada={superficiesDesgastadas.find(
          (s) => s.toothId === tooth.id,
        )}
        tratamientoConducto={tratamientosConducto.find(
          (t) => t.toothId === tooth.id,
        )}
        sellante={sellantes.find((s) => s.toothId === tooth.id)}
        defectosEsmalte={defectosEsmalte.filter((d) => d.toothId === tooth.id)}
        fosasFisuras={fosasFisuras.find((f) => f.toothId === tooth.id)}
        impactacion={impactacion.find((i) => i.toothId === tooth.id)}
        implanteDental={implanteDental.find((i) => i.toothId === tooth.id)}
        macrodoncia={macrodoncia.find((m) => m.toothId === tooth.id)}
        microdoncia={microdoncia.find((m) => m.toothId === tooth.id)}
        posicionAnormalDentaria={posicionesAnormales.find(
          (p) => p.toothId === tooth.id,
        )}
        movilidadPatologica={movilidadPatologica.find(
          (m) => m.toothId === tooth.id,
        )}
        piezaEctopica={piezasEctopicas.find((p) => p.toothId === tooth.id)}
        remanenteRadicular={remanenteRadicular.find(
          (r) => r.toothId === tooth.id,
        )}
        isSelectionStart={selectionMode.startId === tooth.id}
      />
    ));
  };

  // ============================================================================
  // RENDER PRINCIPAL
  // ============================================================================

  return (
    <div className="flex flex-col gap-6 p-6 bg-surface-light rounded-xl shadow-md border border-border-default w-full mx-auto caret-transparent">
      {/* Barra de Herramientas */}
      <OdontogramaToolbar
        viewMode={viewMode}
        setViewMode={setViewMode}
        selectionMode={selectionMode}
        crownLabelInput={crownLabelInput}
        setCrownLabelInput={setCrownLabelInput}
        startSelection={startSelection}
        cancelSelection={cancelSelection}
        onDownload={() => {
          if (!containerRef.current) return;
          const node = containerRef.current;

          // Guardar el overflow original para restaurarlo después
          const originalOverflow = node.style.overflow;
          const originalOverflowX = node.style.overflowX;
          const originalOverflowY = node.style.overflowY;

          // Ocultar scrollbars antes de capturar
          node.style.overflow = "hidden";
          node.style.overflowX = "hidden";
          node.style.overflowY = "hidden";

          // Import dinámico para asegurar que se ejecute en el cliente
          import("dom-to-image-more").then((domToImage) => {
            import("file-saver").then(({ saveAs }) => {
              // Esperar 300ms para que los estilos (incluído overflow:hidden) se apliquen completamente
              setTimeout(() => {
                domToImage.default
                  .toBlob(node, {
                    bgcolor: "#ffffff",
                    style: {
                      transform: "scale(1)", // Asegurar escala original
                      transformOrigin: "top left",
                      width: node.offsetWidth + "px",
                      height: node.offsetHeight + "px",
                    },
                    width: node.offsetWidth,
                    height: node.offsetHeight,
                  })
                  .then((blob: Blob | null) => {
                    // Restaurar overflow original
                    node.style.overflow = originalOverflow;
                    node.style.overflowX = originalOverflowX;
                    node.style.overflowY = originalOverflowY;

                    if (blob)
                      saveAs(blob, `odontograma_${new Date().getTime()}.png`);
                  })
                  .catch((error: unknown) => {
                    // Restaurar overflow original incluso si hay error
                    node.style.overflow = originalOverflow;
                    node.style.overflowX = originalOverflowX;
                    node.style.overflowY = originalOverflowY;

                    console.error("Error al capturar odontograma:", error);
                    toast.error("Error al generar la imagen del odontograma.");
                  });
              }, 300); // Delay de 300ms para aplicación de estilos
            });
          });
        }}
      />

      {/* Área del Odontograma */}
      <div
        className="relative rounded-lg border border-border-default flex flex-col gap-0 p-4 items-center overflow-x-auto w-full"
        ref={containerRef}
      >
        {/* Capa de Gráficos SVG (Overlay) */}
        <OdontogramaSvgOverlay
          appliances={appliances}
          diastemas={diastemas}
          upperTeeth={upperTeeth}
          lowerTeeth={lowerTeeth}
          toothRefs={toothRefs}
          containerRef={containerRef}
          refsReady={refreshKey > 0}
          refreshKey={refreshKey}
          hallazgos={hallazgos}
          espigos={espigos}
          fractures={fractures}
          fusions={fusions}
          geminations={geminations}
          giroversions={giroversions}
          piezasAusentes={piezasAusentes}
          dientesEnClavija={dientesEnClavija}
          piezasErupccion={piezasErupccion}
          piezasExtruidas={piezasExtruidas}
          piezasIntruidas={piezasIntruidas}
          piezasSupernumerarias={piezasSupernumerarias}
          protesisFija={protesisFija}
          transposiciones={transposiciones}
          viewMode={viewMode}
        />

        {/* Capa Interactiva: Arcada Superior */}
        <div className="flex gap-2 mb-4 border border-transparent">
          {/* Cuadrante Superior Derecho */}
          <div className="flex gap-1 border border-transparent">
            {renderTeethRow(
              upperTeeth,
              "upper",
              (t) => t.id < 20 || (t.id >= 50 && t.id < 60),
            )}
          </div>
          {/* Cuadrante Superior Izquierdo */}
          <div className="flex gap-1 border border-transparent">
            {renderTeethRow(
              upperTeeth,
              "upper",
              (t) => t.id >= 20 && (t.id < 50 || t.id >= 60),
            )}
          </div>
        </div>

        {/* Línea Divisoria Central */}
        <div
          className="w-full h-px border border-transparent my-2"
          style={{ borderColor: "var(--color-border-subtle)" }}
        ></div>

        {/* Capa Interactiva: Arcada Inferior */}
        <div className="flex gap-2 mt-4 border border-transparent ">
          {/* Cuadrante Inferior Izquierdo */}
          <div className="flex gap-1 border border-transparent">
            {renderTeethRow(
              lowerTeeth,
              "lower",
              (t) => t.id >= 40 || t.id >= 80,
            )}
          </div>
          {/* Cuadrante Inferior Derecho */}
          <div className="flex gap-1 border border-transparent">
            {renderTeethRow(
              lowerTeeth,
              "lower",
              (t) => t.id >= 30 && t.id < 40,
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Odontograma;
