import { Link } from "react-router-dom";

import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";

import { useRegister } from "../hooks/useRegister";

export const RegisterForm = () => {
  const {
    form,
    loading,
    handleChange,
    handleSubmit,
  } = useRegister();

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <Input
        name="names"
        placeholder="Nombres"
        value={form.names}
        onChange={handleChange}
      />

      <Input
        name="lastNames"
        placeholder="Apellidos"
        value={form.lastNames}
        onChange={handleChange}
      />

      <Input
        name="email"
        type="email"
        placeholder="Correo"
        value={form.email}
        onChange={handleChange}
      />

      <Input
        name="password"
        type="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
      />

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading
          ? "Creando cuenta..."
          : "Registrarse"}
      </Button>

      <p className="text-center text-sm text-slate-500">
        ¿Ya tienes cuenta?{" "}
        <Link
          to="/login"
          className="font-medium text-blue-600"
        >
          Iniciar sesión
        </Link>
      </p>
    </form>
  );
};