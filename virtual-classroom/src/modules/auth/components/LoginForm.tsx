import { Link } from "react-router-dom";

import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";

import { useLogin } from "../hooks/useLogin";
import { GoogleButton } from "./GoogleButton";

export const LoginForm = () => {
  const {
    form,
    loading,
    handleChange,
    handleSubmit,
  } = useLogin();

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <GoogleButton/>
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
          ? "Ingresando..."
          : "Iniciar Sesión"}
      </Button>

      <p className="text-center text-sm text-slate-500">
        ¿No tienes cuenta?{" "}
        <Link
          to="/register"
          className="font-medium text-blue-600"
        >
          Registrarse
        </Link>
      </p>
    </form>
  );
};