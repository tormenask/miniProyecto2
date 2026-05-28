import { type FormEvent, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { registerGoogle } from "../services/auth.service";

import { useAuth } from "./useAuth";

export const useUsernameSetup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const googleData = location.state;
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await registerGoogle({
        ...googleData,
        username,
      });

      login(response);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    username,
    setUsername,
    loading,
    handleSubmit,
  };
};
