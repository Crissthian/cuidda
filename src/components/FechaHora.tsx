import { useEffect, useState } from "react";

export default function FechaHora() {
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  useEffect(() => {
    const actualizarTiempo = () => {
      const ahora = new Date();
      const opcionesFecha: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      };
      const opcionesHora: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };

      setFecha(ahora.toLocaleDateString("es-ES", opcionesFecha));
      setHora(ahora.toLocaleTimeString("es-ES", opcionesHora));
    };

    actualizarTiempo();
    const intervalo = setInterval(actualizarTiempo, 1000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="flex flex-col text-text-primary text-sm font-semibold">
      <div>
        <span className="font-semibold">Fecha:</span>{" "}
        <span className="text-brand">{fecha}</span>
      </div>
      <div>
        <span className="font-semibold">Hora:</span>{" "}
        <span className="text-brand">{hora}</span>
      </div>
    </div>
  );
}
