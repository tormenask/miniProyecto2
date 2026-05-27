import {
  useEffect,
} from "react";
import {
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AuthLayout } from "../components/AuthLayout";
import { AuthHeader } from "../components/AuthHeader";
import { LoginForm } from "../components/LoginForm";

export const Login = () => {
  const navigate = useNavigate();

  const {
    isAuthenticated,
  } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [
    isAuthenticated,
    navigate,
  ]);

  return (
    <AuthLayout>
      <AuthHeader
        title="Bienvenido"
        subtitle="Ingresa a tu cuenta"
      />
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;