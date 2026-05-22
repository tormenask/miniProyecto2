import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/modules/auth/store/AuthContext';

export const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <div className="flex h-screen items-center justify-center dark:text-white">Cargando...</div>;
  if (!user) return <Navigate to="/login" replace />;
  // Si falta el username, es que ingresó con google y no completó su perfil
  if (user && !user.username) return <Navigate to="/complete-profile" replace />;

  return <Outlet />;
};
