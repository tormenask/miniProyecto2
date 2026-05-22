import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import { useAuth } from "../store/AuthContext";

export const Register = () => {
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({
    names: "",
    lastNames: "",
    username: "",
    email: "",
    password: "",
    role: "ADMIN"
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      console.log("BACKEND RESPONSE:", data);

      if (!res.ok) {
        throw new Error(
          data.message || JSON.stringify(data.errors) || "Error al registrarse",
        );
      }

      localStorage.setItem("virtual_class_token", data.data.token);

      setUser(data.data.user);
    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gray-50 dark:bg-gray-950">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Crear Cuenta</CardTitle>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Regístrate para acceder a las aulas virtuales
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <Input
                id="names"
                label="Nombres"
                placeholder="Juan"
                onChange={handleChange}
                required
              />
              <Input
                id="lastNames"
                label="Apellidos"
                placeholder="Pérez"
                onChange={handleChange}
                required
              />
            </div>
            <Input
              id="username"
              label="Nombre de usuario"
              placeholder="juanperez123"
              onChange={handleChange}
              required
            />
            <Input
              id="email"
              label="Correo institucional"
              type="email"
              placeholder="juan@universidad.edu"
              onChange={handleChange}
              required
            />
            <Input
              id="password"
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              onChange={handleChange}
              required
            />
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}
            <Button className="w-full" type="submit" isLoading={loading}>
              Registrarse
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Inicia sesión
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
