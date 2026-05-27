import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/modules/auth/hooks/useAuth";

export const ProtectedRoute = () => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Cargando...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};
