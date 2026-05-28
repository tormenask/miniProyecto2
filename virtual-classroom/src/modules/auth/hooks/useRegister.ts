import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerRequest } from "../services/auth.service";

import { useAuth } from "./useAuth";

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

  const handleFileChange = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({
        ...prev,
        avatarPreview: reader.result as string,
        avatarFile: file,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      console.error("Las contraseñas no coinciden");
      return;
    }

    try {
      setLoading(true);

      // Creamos un objeto JSON tradicional con todos los campos
      const payload = {
        names: form.names,
        lastNames: form.lastNames,
        username: form.username,
        email: form.email,
        password: form.password,
        role: "PARTICIPANT",
        confirmPassword: form.confirmPassword,
        // Enviamos el string Base64 generado por el FileReader (o vacío si no subió nada)
        avatar: form.avatarPreview || "",
      };

      // registerRequest procesará esto como un JSON normal (aplicación/json)
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
    handleFileChange,
    handleSubmit,
  };
};
