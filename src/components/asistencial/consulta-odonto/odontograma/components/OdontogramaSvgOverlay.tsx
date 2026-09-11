import React from "react";
import type {
  Appliance,
  Diastema,
  ToothData,
  HallazgoClinico,
  EspigoMunon,
  Fracture,
  Fusion,
  Gemination,
  Giroversion,
  PiezaAusente,
  DienteEnClavija,
  PiezaErupccion,
  PiezaExtruida,
  PiezaIntruida,
  PiezaSupernumeraria,
  ProtesisFija,
  Transposicion,
} from "../types";
import {
  EdentulousOverlay,
  EspigoOverlay,
  ApplianceOverlay,
  DiastemaOverlay,
  FractureOverlay,
  FusionOverlay,
  GeminationOverlay,
  GiroversionOverlay,
  PiezaAusenteOverlay,
  DienteEnClavijaOverlay,
  PiezaErupcionOverlay,
  PiezaExtruidaOverlay,
  PiezaIntruidaOverlay,
  PiezaSupernumerariaOverlay,
  ProtesisFijaOverlay,
  ProtesisTotalOverlay,
  ProtesisRemovibleOverlay,
  TransposicionOverlay,
} from "./overlays";

/**
 * @interface OdontogramaSvgOverlayProps
 * @description Propiedades del componente OdontogramaSvgOverlay.
 */
interface OdontogramaSvgOverlayProps {
  appliances: Appliance[];
  diastemas: Diastema[];
  upperTeeth: ToothData[];
  lowerTeeth: ToothData[];
  toothRefs: React.RefObject<Map<number, HTMLDivElement>>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  refsReady: boolean;
  hallazgos: HallazgoClinico[];
  espigos: EspigoMunon[];
  fractures: Fracture[];
  fusions: Fusion[];
  geminations: Gemination[];
  giroversions: Giroversion[];
  piezasAusentes: PiezaAusente[];
  dientesEnClavija: DienteEnClavija[];
  piezasErupccion: PiezaErupccion[];
  piezasExtruidas: PiezaExtruida[];
  piezasIntruidas: PiezaIntruida[];
  piezasSupernumerarias: PiezaSupernumeraria[];
  protesisFija: ProtesisFija[];
  transposiciones: Transposicion[];
  viewMode: "adult" | "child";
  refreshKey: number;
}

/**
 * Overlay SVG que renderiza las representaciones gráficas de los hallazgos.
 * Versión refactorizada usando componentes modulares para cada tipo de overlay.
 */
export const OdontogramaSvgOverlay = React.memo<OdontogramaSvgOverlayProps>(
  (props) => {
    const baseProps = {
      toothRefs: props.toothRefs,
      containerRef: props.containerRef,
      refsReady: props.refsReady,
      upperTeeth: props.upperTeeth,
      lowerTeeth: props.lowerTeeth,
      refreshKey: props.refreshKey,
    };

    return (
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
        <EdentulousOverlay
          hallazgos={props.hallazgos}
          viewMode={props.viewMode}
          {...baseProps}
        />

        <EspigoOverlay espigos={props.espigos} {...baseProps} />

        <ApplianceOverlay appliances={props.appliances} {...baseProps} />

        <DiastemaOverlay diastemas={props.diastemas} {...baseProps} />

        <FractureOverlay fractures={props.fractures} {...baseProps} />

        <FusionOverlay fusions={props.fusions} {...baseProps} />

        <GeminationOverlay geminations={props.geminations} {...baseProps} />

        <GiroversionOverlay giroversions={props.giroversions} {...baseProps} />

        <PiezaAusenteOverlay
          piezasAusentes={props.piezasAusentes}
          {...baseProps}
        />

        <DienteEnClavijaOverlay
          dientesEnClavija={props.dientesEnClavija}
          {...baseProps}
        />

        <PiezaErupcionOverlay
          piezasErupccion={props.piezasErupccion}
          {...baseProps}
        />

        <PiezaExtruidaOverlay
          piezasExtruidas={props.piezasExtruidas}
          {...baseProps}
        />

        <PiezaIntruidaOverlay
          piezasIntruidas={props.piezasIntruidas}
          {...baseProps}
        />

        <PiezaSupernumerariaOverlay
          piezasSupernumerarias={props.piezasSupernumerarias}
          {...baseProps}
        />

        <ProtesisFijaOverlay protesisFija={props.protesisFija} {...baseProps} />

        <ProtesisTotalOverlay
          hallazgos={props.hallazgos}
          viewMode={props.viewMode}
          {...baseProps}
        />

        <ProtesisRemovibleOverlay
          hallazgos={props.hallazgos}
          viewMode={props.viewMode}
          {...baseProps}
        />

        <TransposicionOverlay
          transposiciones={props.transposiciones}
          {...baseProps}
        />
      </svg>
    );
  },
);
OdontogramaSvgOverlay.displayName = "OdontogramaSvgOverlay";
