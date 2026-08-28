import LoginBrandPanel from "@/components/LoginBrandPanel";
import LoginForm from "@/components/LoginForm";
import LoginSupport from "@/components/LoginSupport";

export default function LoginPage() {
  return (
    <main
      id="login-main"
      className="flex h-screen w-screen items-center justify-center  bg-white text-xs antialiased"
      aria-labelledby="login-title"
    >
      <div className="relative flex aspect-1920/1080 h-full w-full max-h-270 max-w-[1920px] overflow-visible bg-white shadow-xl">
        <LoginBrandPanel />
        <LoginForm />
        <LoginSupport />
      </div>
    </main>
  );
}
