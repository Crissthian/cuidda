import React from "react";

/**
 * Encabezado de la vista de triaje con título y acceso de salida.
 */
interface HeaderTriajeProps {
  title: string;
  headingId?: string;
}

const HeaderTriaje: React.FC<HeaderTriajeProps> = ({ title, headingId }) => {
  return (
    <div className="flex flex-row justify-between relative mx-6 my-2 caret-transparent">
      <h1 id={headingId} className="text-xl font-semibold text-text-primary">
        {title}
      </h1>
      <a
        href="/asistencial"
        className="flex text-sm uppercase items-center gap-2 rounded-lg absolute bottom-8 right-0 bg-muted-80 px-6 py-2.5 text-white hover:bg-muted cursor-pointer"
      >
        <i className="fa-solid fa-right-from-bracket"></i>
        Salir
      </a>
    </div>
  );
};

export default HeaderTriaje;
