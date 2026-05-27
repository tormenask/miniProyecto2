import { AuthLayout } from "../components/AuthLayout";
import { AuthHeader } from "../components/AuthHeader";
import { RegisterForm } from "../components/RegisterForm";

export const Register = () => {
  return (
    <AuthLayout>
      <AuthHeader
        title="Crear cuenta"
        subtitle="Regístrate para continuar"
      />

      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;