export interface ModuloAcceso {
  id: number;
  label: string;
  href: string;
  icon: string;
  ariaLabel: string;
}

export const modulosAsistencial: ModuloAcceso[] = [
  {
    id: 1,
    label: "Admisión",
    href: "/asistencial/admision",
    icon: "fa-id-card-clip",
    ariaLabel: "Ir a Admisión",
  },
  {
    id: 2,
    label: "Triaje",
    href: "/asistencial/triaje",
    icon: "fa-heartbeat",
    ariaLabel: "Ir a Triaje",
  },
  {
    id: 3,
    label: "Consulta Médica",
    href: "/asistencial/consulta-medica",
    icon: "fa-user-doctor",
    ariaLabel: "Ir a Consulta Médica",
  },
  {
    id: 4,
    label: "Consulta Odonto",
    href: "/asistencial/consulta-odonto",
    icon: "fa-tooth",
    ariaLabel: "Ir a Consulta Odonto",
  },
  {
    id: 5,
    label: "Parte Diario",
    href: "/asistencial/parte-diario",
    icon: "fa-file-waveform",
    ariaLabel: "Ir a Parte Diario",
  },
  {
    id: 6,
    label: "Pacientes",
    href: "/asistencial/pacientes",
    icon: "fa-users",
    ariaLabel: "Ir a Pacientes",
  },
];
