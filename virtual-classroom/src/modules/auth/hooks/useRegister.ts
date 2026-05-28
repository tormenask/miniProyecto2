import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerRequest } from "../services/auth.service";
import { useAuth } from "./useAuth";
import type { RegisterDto } from "../types";

export const useRegister = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    names: "",
    lastNames: "",
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
    avatarPreview: "",
    avatarFile: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      console.error("Las contraseñas no coinciden");
      return;
    }

    try {
      setLoading(true);
      const payload: RegisterDto = {
        names: form.names,
        lastNames: form.lastNames,
        username: form.username,
        email: form.email,
        password: form.password,
        role: "PARTICIPANT",
        avatar: form.avatarPreview || "",
      };

      const data = await registerRequest(payload);

      login(data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error en el registro:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    handleChange,
    handleSubmit,
  };
};
