import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/modules/auth/store/AuthContext';

export const PublicRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <div className="flex h-screen items-center justify-center dark:text-white">Cargando...</div>;
  if (user && user.username) return <Navigate to="/dashboard" replace />;
  if (user && !user.username) return <Navigate to="/complete-profile" replace />;

  return <Outlet />;
};
