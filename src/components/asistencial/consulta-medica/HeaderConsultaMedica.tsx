import React from "react";

interface HeaderConsultaMedicaProps {
    title: string;
    headingId?: string;
}

/**
 * Encabezado con título y acción de salida para la vista de consulta médica.
 */
const HeaderConsultaMedica: React.FC<HeaderConsultaMedicaProps> = ({
    title,
    headingId,
}) => {
    return (
        <div className="flex flex-row justify-between relative mx-6 my-2">
            <h1
                id={headingId}
                className="text-xl font-semibold text-text-primary"
            >
                {title}
            </h1>
            <a
                href="/asistencial"
                className="flex items-center gap-2 rounded-lg absolute bottom-8 right-8 bg-muted-80 px-6 py-2.5 text-white hover:bg-muted cursor-pointer text-sm"
            >
                <i className="fa-solid fa-right-from-bracket"></i>
                Salir
            </a>
        </div>
    );
};

export default HeaderConsultaMedica;
