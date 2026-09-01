import { useAuthStore } from "@/lib/authStore";

export default function HomeContent() {
  const username = useAuthStore((state) => state.username) ?? "Elmer";

  return (
    <section
      className="relative flex h-[calc(100vh-8rem)] w-full flex-col overflow-hidden"
      aria-labelledby="home-title"
    >
      {/* Contenido principal: texto a la izquierda, ilustración a la derecha */}
      <div className="relative flex flex-1 items-center px-10">
        {/* Fondo decorativo superior claro */}
        <div className="relative z-10 flex w-200 shrink-0 flex-col gap-4 pb-2 ms-24">
          <h1 id="home-title" className="text-8xl font-semibold leading-none">
            <span className="text-brand ">¡Hola</span>{" "}
            <span className="text-success">{username}!</span>
          </h1>
          <p className="text-xl leading-relaxed text-text-secondary">
            Bienvenido a{" "}
            <span className="font-semibold text-brand text-2xl tracking-wider">
              cuidda
            </span>
            , tu plataforma <br />
            inteligente para gestionar la salud <br />
            ocupacional de tus colaboradores.
          </p>
        </div>

        {/* Ilustración con fondo SVG detrás */}
        <div
          className="absolute bottom-0 right-0 top-10 flex w-375 items-end justify-end "
          aria-hidden="true"
        >
          {/* fondo_index.svg detrás de la imagen */}
          <img
            src="/fondo_index.svg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 -right-1 h-auto w-215 max-w-full select-none object-contain object-bottom-right"
            width="976"
            height="716"
            decoding="async"
          />
          <img
            src="/imagen-index.png"
            alt="Profesional de salud saludando con laptop"
            className="absolute z-10 h-auto w-362.5 select-none -bottom-6 -right-1 drop-shadow-sm"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
