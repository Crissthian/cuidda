export default function LoginBrandPanel() {
  return (
    <section
      className="relative flex w-1/2 flex-col overflow-visible bg-white"
      aria-label="Presentación Cuidda"
    >
      <img
        src="/fondo-login.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-20"
        width="960"
        height="1080"
        decoding="async"
      />
      <div className="absolute inset-0 bg-white/10" aria-hidden="true" />

      <div className="relative flex h-full flex-col pb-0">
        <header className="absolute left-80 top-10 z-30 flex flex-col gap-1">
          <div className="flex items-start">
            <img
              src="/logo-cuidda.png"
              alt="Cuidda"
              className="h-auto w-100 object-contain"
              decoding="async"
            />
            <h1 id="login-title" className="sr-only font-normal">
              Cuidda by Lucemedic - Iniciar sesión
            </h1>
          </div>
        </header>

        <div
          className="pointer-events-none absolute inset-0 z-20 flex items-end justify-start overflow-visible"
          aria-hidden="true"
        >
          <img
            src="/ilustracion-login.png"
            alt="Profesional de salud trabajando en laptop con asistencia de inteligencia artificial"
            className="absolute bottom-0 left-6 h-auto w-245 max-w-none select-none drop-shadow-sm lg:left-10 xl:left-14 xl:w-270"
            width="1080"
            height="960"
            decoding="async"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}
