import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../lib/authStore";
import { loginSchema, type LoginFormData } from "../lib/loginSchema";

const VALID_USERNAME = "admin";
const VALID_PASSWORD = "pass123";

export default function LoginForm() {
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  async function onSubmit(data: LoginFormData) {
    if (data.usuario !== VALID_USERNAME || data.password !== VALID_PASSWORD) {
      setError("root", {
        message: "Usuario o contraseña incorrectos",
      });
      return;
    }

    login(data.usuario);
    window.setTimeout(() => {
      window.location.href = "/home";
    }, 600);
  }

  return (
    <section
      className="relative flex w-1/2 flex-col items-center justify-center overflow-hidden bg-linear-to-b from-[#0ed28a] via-[#0cb3a6] via-45% to-[#0a66c2] to-90% px-8 lg:px-16"
      aria-label="Formulario de acceso"
    >
      <div className="flex w-full max-w-130 flex-col items-center rounded-4xl border border-white/15 bg-white/10 px-8 py-10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-[6px] lg:px-12 lg:py-12">
        <h2 className="text-2xl font-bold tracking-wide text-white">
          INICIAR SESIÓN
        </h2>

        <form
          id="login-form"
          className="mt-10 flex w-full flex-col gap-4"
          noValidate
          aria-describedby="login-error"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="usuario" className="sr-only">
              Usuario
            </label>
            <div
              className={`flex w-full items-center gap-3 rounded-full bg-white py-4 ps-6 shadow-sm focus-within:ring-2 focus-within:ring-white/60 ${errors.usuario ? "ring-2 ring-red-200" : ""}`}
            >
              <i
                className="fa-solid fa-user text-sm text-accent-muted"
                aria-hidden="true"
              />
              <input
                id="usuario"
                type="text"
                autoComplete="username"
                placeholder="USUARIO:"
                aria-required="true"
                aria-invalid={Boolean(errors.usuario)}
                aria-describedby={errors.usuario ? "usuario-error" : undefined}
                {...register("usuario")}
                className="bg-transparent text-sm font-medium text-text-secondary placeholder:font-semibold placeholder:text-accent-muted focus:outline-none! w-10/12"
              />
            </div>
            <p
              id="usuario-error"
              className={`px-4 text-[11px] font-medium text-white ${errors.usuario ? "" : "hidden"}`}
              role="alert"
            >
              {errors.usuario?.message}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="sr-only">
              Contraseña
            </label>
            <div
              className={`flex w-full items-center gap-3 rounded-full bg-white py-4 ps-6 shadow-sm focus-within:ring-2 focus-within:ring-white/60 ${errors.password ? "ring-2 ring-red-200" : ""}`}
            >
              <i
                className="fa-solid fa-lock text-sm text-accent-muted"
                aria-hidden="true"
              />
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="CONTRASEÑA:"
                aria-required="true"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                {...register("password")}
                className="bg-transparent text-sm font-medium text-text-secondary placeholder:font-semibold placeholder:text-accent-muted focus:outline-none! w-10/12"
              />
            </div>
            <p
              id="password-error"
              className={`px-4 text-[11px] font-medium text-white ${errors.password ? "" : "hidden"}`}
              role="alert"
            >
              {errors.password?.message}
            </p>
          </div>

          <p
            id="login-error"
            className={`rounded-lg bg-white/20 px-4 py-2 text-center text-xs font-medium text-white ${errors.root ? "" : "hidden"}`}
            role="alert"
            aria-live="polite"
          >
            {errors.root?.message}
          </p>

          <div className="mt-4 flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-brand px-10 py-2 text-lg font-bold tracking-wide text-white shadow-md transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:opacity-50"
            >
              {isSubmitting ? "INGRESANDO..." : "INGRESAR"}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-14 flex flex-col items-center gap-2 text-white">
        <div className="flex items-center gap-2">
          <span
            className="flex size-12 items-center justify-center"
            aria-hidden="true"
          >
            <i className="fa-solid fa-headset text-4xl text-white" />
          </span>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-bold tracking-wide">
              +51 980 773 060
            </span>
            <span className="text-md font-semibold tracking-wider opacity-90">
              CENTRAL DE ATENCIÓN
            </span>
          </div>
        </div>
        <p className="max-w-90 text-center text-xs leading-tight opacity-90">
          Si no puedes acceder, comunícate con nosotros y<br />
          nuestro equipo técnico te ayudará a la brevedad posible.
        </p>
      </div>
    </section>
  );
}
