/**
 * Store en memoria del contenido de los documentos generados con IA.
 * Se siembra con el contenido simulado y se sobrescribe al guardar.
 */
import { create } from "zustand";
import {
  documentoIaContenido,
  type TipoDocumentoIaId,
} from "./documentoIaData";

export type DocumentosIaGuardados = Record<TipoDocumentoIaId, string>;

interface DocumentoIaState {
  documentos: DocumentosIaGuardados;
  guardarDocumento: (tipo: TipoDocumentoIaId, contenido: string) => void;
}

const documentosIniciales: DocumentosIaGuardados = {
  programa: documentoIaContenido.programa.cuerpo,
  avance: documentoIaContenido.avance.cuerpo,
  final: documentoIaContenido.final.cuerpo,
};

export const useDocumentoIaStore = create<DocumentoIaState>((set) => ({
  documentos: documentosIniciales,

  guardarDocumento: (tipo, contenido) =>
    set((state) => ({
      documentos: { ...state.documentos, [tipo]: contenido },
    })),
}));
