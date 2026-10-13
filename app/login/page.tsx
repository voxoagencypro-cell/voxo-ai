import { Suspense } from "react";
import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#070B18] text-white">
          <p className="text-slate-400">Chargement…</p>
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
