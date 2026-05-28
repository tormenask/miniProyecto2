import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerRequest } from "../services/auth.service";

import { useAuth } from "./useAuth";

export const useRegister = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    names: "",
    lastNames: "",
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
    avatar: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data =
        await registerRequest(form);

      login(data);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
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