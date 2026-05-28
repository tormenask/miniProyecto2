import { UsernameSetupForm } from "../components/UsernameSetupForm";

export const CompleteGoogleRegister = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-2xl font-bold">
          Completa tu cuenta
        </h1>

        <p className="mb-6 text-sm text-slate-500">
          Elige un username único.
        </p>

        <UsernameSetupForm />
      </div>
    </div>
  );
};