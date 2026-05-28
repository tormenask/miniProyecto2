import { User, Mail, Lock } from "lucide-react";
import { useRegister } from "../hooks/useRegister";
import { GoogleButton } from "./GoogleButton";

const Label = ({ text, required }: { text: string; required?: boolean }) => (
  <label className="mb-1.5 block text-sm font-medium text-slate-700">
    {text}

    {required && <span className="ml-0.5 text-red-500">*</span>}
  </label>
);

const inputBase =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[#1B3D6F] focus:ring-2 focus:ring-[#1B3D6F]/10";

const inputWithIcon =
  "w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[#1B3D6F] focus:ring-2 focus:ring-[#1B3D6F]/10";

/* ── Component ───────────────────────────────────────────────────────── */
export const RegisterForm = () => {

  const { form, loading, handleChange, handleSubmit } =
    useRegister();
  
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Google */}
      <GoogleButton />
      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200" />

        <span className="text-xs text-slate-400">
          O regístrate con tu correo
        </span>

        <div className="h-px flex-1 bg-slate-200" />
      </div>


      {/* Names */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label text="Nombre(s)" required />

          <input
            name="names"
            value={form.names}
            onChange={handleChange}
            placeholder="Juan"
            className={inputBase}
          />
        </div>

        <div>
          <Label text="Apellido(s)" required />

          <input
            name="lastNames"
            value={form.lastNames}
            onChange={handleChange}
            placeholder="Pérez"
            className={inputBase}
          />
        </div>
      </div>

      {/* Username */}
      <div>
        <Label text="Nombre de Usuario" required />

        <div className="relative">
          <User
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="juanperez"
            className={inputWithIcon}
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <Label text="Correo Electrónico" required />

        <div className="relative">
          <Mail
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="juan@email.com"
            className={inputWithIcon}
          />
        </div>
      </div>

      {/* Passwords */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label text="Contraseña" required />

          <div className="relative">
            <Lock
              size={14}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={inputWithIcon}
            />
          </div>
        </div>

        <div>
          <Label text="Confirmar Contraseña" required />

          <div className="relative">
            <Lock
              size={14}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className={inputWithIcon}
            />
          </div>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="mt-1 w-full rounded-lg bg-[#1B3D6F] py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#163261] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Creando cuenta..." : "Crear Cuenta"}
      </button>
    </form>
  );
};
