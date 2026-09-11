import React, { useState, lazy, Suspense, type ChangeEvent } from "react";
import {
  departamentosMock,
  provinciasMock,
  distritosMock,
  viasAplicacionMock,
  type UbigeoItem,
} from "@/lib/consultaMedicaData";

const PDFReferencia = lazy(() => import("./PDFReferencia"));

interface Tratamiento {
  id: number;
  producto: string;
  viaAplicacion: string;
  comentarios: string;
}

interface ReferenciaTabProps {
  codigoAtencion?: string;
  estado?: string;
  readOnly?: boolean;
}

/**
 * Gestiona la referencia médica: datos de destino, tratamientos e impresión PDF.
 */
export default function ReferenciaTab({
  codigoAtencion,
  estado = "1",
  readOnly = false,
}: ReferenciaTabProps) {
  const [numeroReferencia] = useState(
    `0000${codigoAtencion?.slice(-4) || "0042"}`,
  );
  const [esAccidente, setEsAccidente] = useState<"1" | "2">("2");

  // Ubigeo state
  const [departamentos] = useState<UbigeoItem[]>(departamentosMock);
  const [departamento, setDepartamento] = useState("15"); // Lima
  const [provincia, setProvincia] = useState("1501");
  const [distrito, setDistrito] = useState("150101");

  const provincias = (departamento && provinciasMock[departamento]) || [];
  const distritos = (provincia && distritosMock[provincia]) || [];

  const [ipress, setIpress] = useState("HOSPITAL NACIONAL EDGARDO REBAGLIATI");
  const [enfermedadActual, setEnfermedadActual] = useState(
    "Paciente presenta dolor torácico opresivo de inicio súbito, acompañado de diaforesis.",
  );
  const [motivoReferencia, setMotivoReferencia] = useState(
    "Requiere evaluación urgente por cardiología y estudio angiográfico no disponible en este centro.",
  );
  const [tratamientos, setTratamientos] = useState<Tratamiento[]>([
    {
      id: 1,
      producto: "ASPIRINA 100MG",
      viaAplicacion: "001",
      comentarios: "DOSIS DE CARGA ADMINISTRADA",
    },
    {
      id: 2,
      producto: "CLOPIDOGREL 75MG",
      viaAplicacion: "001",
      comentarios: "300MG VÍA ORAL",
    },
  ]);
  const [viasAplicacion] = useState(viasAplicacionMock);

  const handleDepartamentoChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const dep = e.target.value;
    setDepartamento(dep);
    setProvincia("");
    setDistrito("");
  };

  const handleProvinciaChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const prov = e.target.value;
    setProvincia(prov);
    setDistrito("");
  };

  const agregarTratamiento = (index: number) => {
    const nuevosTratamientos = [...tratamientos];
    nuevosTratamientos.splice(index + 1, 0, {
      id: Date.now(),
      producto: "",
      viaAplicacion: "",
      comentarios: "",
    });
    setTratamientos(nuevosTratamientos);
  };

  const eliminarTratamiento = (index: number) => {
    if (tratamientos.length > 1) {
      const nuevosTratamientos = tratamientos.filter((_, i) => i !== index);
      setTratamientos(nuevosTratamientos);
    }
  };

  const actualizarTratamiento = (
    index: number,
    campo: keyof Tratamiento,
    valor: string,
  ) => {
    const nuevosTratamientos = [...tratamientos];
    nuevosTratamientos[index] = {
      ...nuevosTratamientos[index],
      [campo]: valor,
    };
    setTratamientos(nuevosTratamientos);
  };

  return (
    <div className="space-y-6 text-start">
      <fieldset disabled={readOnly} className="space-y-6">
        {/* Número de referencia y Accidente */}
        <div className="grid grid-cols-4 gap-8">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-brand ">
              N° de referencia
            </label>
            <input
              name="numeroReferencia"
              type="text"
              value={numeroReferencia}
              readOnly
              className="max-w-52 w-48 m-auto form-input px-4 py-2 bg-card-surface rounded-lg text-brand text-center font-semibold text-xl focus:ring-0 "
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-brand">
              Accidente
            </label>
            <div className="flex items-center gap-6 py-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="ref_accidente"
                  value="1"
                  checked={esAccidente === "1"}
                  onChange={(e) => setEsAccidente(e.target.value as "1" | "2")}
                  className="radio bg-muted-30 checked:text-brand text-surface-light"
                />
                <span className="text-sm text-brand">Sí</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="ref_accidente"
                  value="2"
                  checked={esAccidente === "2"}
                  onChange={(e) => setEsAccidente(e.target.value as "1" | "2")}
                  className="radio bg-muted-30 checked:text-brand text-surface-light"
                />
                <span className="text-sm text-brand">No</span>
              </label>
            </div>
          </div>
        </div>

        {/* Datos del destino */}
        <section>
          <h3 className="text-lg font-semibold text-brand mb-4">
            Datos del destino
          </h3>
          <div className="grid grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-brand">
                Departamento
              </label>
              <select
                name="ref_departamento"
                value={departamento}
                onChange={handleDepartamentoChange}
                className="w-full px-4 py-3 bg-surface-light rounded-lg text-text-primary appearance-none cursor-pointer"
              >
                <option value="">SELECCIONE</option>
                {departamentos.map((dep) => (
                  <option key={dep.num_item} value={dep.num_item.trim()}>
                    {dep.des_item.trim()}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-brand">
                Provincia
              </label>
              <select
                name="ref_provincia"
                value={provincia}
                onChange={handleProvinciaChange}
                className="w-full px-4 py-3 bg-surface-light rounded-lg text-text-primary appearance-none cursor-pointer"
                disabled={!provincias.length}
              >
                <option value="">SELECCIONE</option>
                {provincias.map((prov) => (
                  <option key={prov.num_item} value={prov.num_item.trim()}>
                    {prov.des_item.trim()}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-brand">
                Distrito
              </label>
              <select
                name="ref_distrito"
                value={distrito}
                onChange={(e) => setDistrito(e.target.value)}
                className="w-full px-4 py-3 bg-surface-light rounded-lg text-text-primary appearance-none cursor-pointer"
                disabled={!distritos.length}
              >
                <option value="">SELECCIONE</option>
                {distritos.map((dist) => (
                  <option key={dist.num_item} value={dist.num_item.trim()}>
                    {dist.des_item.trim()}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-brand">
                IPRESS
              </label>
              <input
                type="text"
                name="ref_ipress"
                value={ipress}
                onChange={(e) => setIpress(e.target.value)}
                placeholder="Ingrese IPRESS"
                className="w-full px-4 py-3 bg-surface-light rounded-lg text-text-primary uppercase"
              />
            </div>
          </div>
        </section>

        {/* Enfermedad actual */}
        <section>
          <h3 className="text-lg font-semibold text-brand mb-4">
            Enfermedad actual
          </h3>
          <textarea
            name="ref_enfermedadActual"
            value={enfermedadActual}
            onChange={(e) => setEnfermedadActual(e.target.value)}
            rows={4}
            placeholder="Describa la enfermedad actual del paciente..."
            className="w-full px-4 py-3 bg-surface-light rounded-lg text-text-primary resize-y uppercase"
          />
        </section>

        {/* Tratamientos administrados */}
        <section>
          <h3 className="text-lg font-semibold text-brand mb-4">
            Tratamientos administrados
          </h3>
          <div className="rounded-lg overflow-hidden">
            {/* Header tabla */}
            <div className="grid grid-cols-[50px_1fr_200px_1fr_100px] gap-2 p-4 bg-surface-light">
              <div className="text-sm font-semibold text-text-primary border-r border-text-secondary pr-3">
                N°
              </div>
              <div className="text-sm font-semibold text-text-primary text-center border-r border-text-secondary pr-3">
                PRODUCTO
              </div>
              <div className="text-sm font-semibold text-text-primary text-center border-r border-text-secondary pr-3">
                VÍA DE APLICACIÓN
              </div>
              <div className="text-sm font-semibold text-text-primary text-center border-r border-text-secondary pr-3">
                COMENTARIOS
              </div>
              <div></div>
            </div>

            {/* Filas de tratamientos */}
            <div className="space-y-2 py-2">
              {tratamientos.map((tratamiento, index) => (
                <div
                  key={tratamiento.id}
                  className="grid grid-cols-[50px_1fr_200px_1fr_100px] gap-2 px-4 py-2 items-center"
                >
                  <div className="text-sm text-text-primary font-medium">
                    {index + 1}.-
                  </div>

                  <input
                    type="text"
                    name={`ref_tratamientos[${index}][producto]`}
                    value={tratamiento.producto}
                    onChange={(e) =>
                      actualizarTratamiento(index, "producto", e.target.value)
                    }
                    placeholder="Ingrese producto..."
                    className="w-full px-3 py-2 bg-surface-light rounded-lg text-text-primary uppercase"
                  />

                  <select
                    name={`ref_tratamientos[${index}][viaAplicacion]`}
                    value={tratamiento.viaAplicacion}
                    onChange={(e) =>
                      actualizarTratamiento(
                        index,
                        "viaAplicacion",
                        e.target.value,
                      )
                    }
                    className="w-full px-3 py-2 bg-surface-light rounded-lg text-text-primary appearance-none cursor-pointer"
                  >
                    <option value="">Seleccionar</option>
                    {viasAplicacion.map((via) => (
                      <option key={via.num_item} value={via.num_item.trim()}>
                        {via.des_item.trim()}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    name={`ref_tratamientos[${index}][comentarios]`}
                    value={tratamiento.comentarios}
                    onChange={(e) =>
                      actualizarTratamiento(
                        index,
                        "comentarios",
                        e.target.value,
                      )
                    }
                    placeholder="Comentarios..."
                    className="w-full px-3 py-2 bg-surface-light rounded-lg text-text-primary uppercase"
                  />

                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => agregarTratamiento(index)}
                      className="w-8 h-8 flex items-center justify-center text-brand hover:bg-brand/80 rounded transition-colors cursor-pointer"
                      title="Agregar tratamiento"
                    >
                      <i className="fa-solid fa-plus text-2xl"></i>
                    </button>
                    <button
                      type="button"
                      onClick={() => eliminarTratamiento(index)}
                      disabled={tratamientos.length <= 1}
                      className={`w-8 h-8 flex items-center justify-center rounded transition-colors cursor-pointer ${
                        tratamientos.length <= 1
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-red-500 hover:bg-red-50"
                      }`}
                      title="Eliminar tratamiento"
                    >
                      <i className="fa-solid fa-trash text-2xl"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Motivo de referencia */}
        <section>
          <h3 className="text-lg font-semibold text-brand mb-4">
            Motivo de referencia
          </h3>
          <textarea
            name="ref_motivoReferencia"
            value={motivoReferencia}
            onChange={(e) => setMotivoReferencia(e.target.value)}
            rows={5}
            placeholder="Describa el motivo de la referencia..."
            className="w-full px-4 py-3 bg-surface-light rounded-lg text-text-primary resize-y uppercase"
          />
        </section>
      </fieldset>

      {/* Botón Imprimir */}
      <div className="flex justify-end pt-4">
        <Suspense
          fallback={
            <button
              type="button"
              className="flex items-center gap-2 px-6 py-2 bg-brand text-white rounded-lg font-semibold opacity-50 cursor-not-allowed"
              disabled
            >
              <i className="fa-solid fa-spinner fa-spin"></i>
              Cargando...
            </button>
          }
        >
          <PDFReferencia codigoAtencion={codigoAtencion} />
        </Suspense>
      </div>
    </div>
  );
}
