import { AuthLayout } from "../components/AuthLayout";
import { AuthHeader } from "../components/AuthHeader";
import { RegisterForm } from "../components/RegisterForm";

export const Register = () => {
  return (
    <AuthLayout>
      <AuthHeader
        title="Crear Cuenta"
        subtitle="Únete a nuestra comunidad de estudiantes"
      />
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;