import { useRef, type ChangeEvent } from "react";

import { User, Mail, Lock, Upload } from "lucide-react";

import { useRegister } from "../hooks/useRegister";

/* ── Google icon ─────────────────────────────────────────────────────── */
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
    <path
      fill="#EA4335"
      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
    />
    <path
      fill="#4285F4"
      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
    />
    <path
      fill="#FBBC05"
      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
    />
    <path
      fill="#34A853"
      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
    />
  </svg>
);

/* ── Helpers ─────────────────────────────────────────────────────────── */
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
  const fileRef = useRef<HTMLInputElement>(null);

  const { form, loading, handleChange, handleFileChange, handleSubmit } =
    useRegister();
  function handleFile(event: ChangeEvent<HTMLInputElement>): void {
    const file = event.target.files?.[0];
    if (!file) return;

    // 2. Le pasas el archivo directamente al hook, él se encarga del resto
    handleFileChange(file);
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Google */}
      <button
        type="button"
        className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-[0.99]"
      >
        <GoogleIcon />
        Registrarse con Google
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200" />

        <span className="text-xs text-slate-400">
          O regístrate con tu correo
        </span>

        <div className="h-px flex-1 bg-slate-200" />
      </div>

      {/* Avatar */}
      <div>
        <Label text="Foto de Perfil (Opcional)" />

        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200">
            {form.avatarPreview ? (
              <img
                src={form.avatarPreview}
                alt="Avatar"
                className="h-full w-full object-cover"
              />
            ) : (
              <User size={22} strokeWidth={1.5} className="text-slate-400" />
            )}
          </div>

          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-[0.98]"
          >
            <Upload size={14} />
            Subir Imagen
          </button>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
          />
        </div>
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
