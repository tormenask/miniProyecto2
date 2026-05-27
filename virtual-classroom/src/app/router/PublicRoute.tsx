import {
  Navigate,
  Outlet,
} from "react-router-dom";
import { AppLoader } from "@/shared/components/AppLoader";
import { useAuth } from "@/modules/auth/hooks/useAuth";

export const PublicRoute = () => {
  const {
    isAuthenticated,
    loading,
  } = useAuth();

  if (loading) {
    return (
      <AppLoader />
    );
  }

  if (isAuthenticated) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return <Outlet />;
};