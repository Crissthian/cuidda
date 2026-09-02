export const consultasTecnicas = [
  {
    id: 1,
    fechaHora: "2026-08-18 09:24",
    sede: "Lima",
    trabajador: "Carlos Aliaga Ríos",
    cargo: "Supervisor de mina",
    empresa: "Andina Industrial S.A.C.",
    medicoSolicitante: "Dr. M. Salcedo",
    especialidad: "Neumología",
    tipoEmo: "Periódico",
    motivo: "Patrón restrictivo en espirometría de EMO periódico.",
    pregunta:
      "¿Considera necesario solicitar espirometría de control o evaluación neumológica adicional?",
    estado: "RESPONDIDO",
    respuesta:
      "Se recomienda evaluación neumológica complementaria y seguimiento de la función pulmonar. Repetir espirometría en 3 meses y valorar exposición a polvo.",
    segundaOpinion: {
      especialidad: "Neumología",
      especialista: "Dra. C. Villanueva — Neumología",
      fecha: "2026-08-19 16:05",
      opinion:
        "El patrón restrictivo es leve y podría estar influido por técnica subóptima. Se sugiere repetir espirometría con broncodilatador y control de calidad ATS/ERS antes de atribuirlo a exposición ocupacional.",
      recomendaciones:
        "Repetir espirometría en 30 días, mantener uso de protección respiratoria y control clínico semestral.",
    },
    documentos: [
      { nombre: "Espirometría", archivo: "Espirometria_2026-08-18.pdf" },
      { nombre: "EMO_02595", archivo: "EMO_02595.pdf" },
    ],
  },
  {
    id: 2,
    fechaHora: "2026-08-20 11:40",
    sede: "Junín",
    trabajador: "Rosa Quispe Mamani",
    cargo: "Operario de planta",
    empresa: "Andina Industrial S.A.C.",
    medicoSolicitante: "Dr. M. Salcedo",
    especialidad: "Otorrinolaringología",
    tipoEmo: "Periódico",
    motivo:
      "Hipoacusia neurosensorial bilateral en trabajadora con GES de ruido.",
    pregunta:
      "¿Considera necesario solicitar un examen adicional o cambio de puesto?",
    estado: "PENDIENTE",
    respuesta: "La consulta aún no cuenta con respuesta del especialista.",
    segundaOpinion: null,
    documentos: [
      { nombre: "Audiometría", archivo: "Audiometria_2026-08-20.pdf" },
      { nombre: "EMO_02596", archivo: "EMO_02596.pdf" },
    ],
  },
] as const;
