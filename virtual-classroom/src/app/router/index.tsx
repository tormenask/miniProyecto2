import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import { Login } from '@/modules/auth/pages/Login';
import { Register } from '@/modules/auth/pages/Register';
import { Dashboard } from '@/modules/dashboard/pages/Dashboard';
import { Room } from '@/modules/room/pages/Room';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    element: <PublicRoute />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/complete-profile',
        element: (
          <div className="flex min-h-screen items-center justify-center p-4 bg-gray-50 dark:bg-gray-950">
            <div className="text-center dark:text-white">
              <h2 className="text-2xl font-bold mb-4">Completar Perfil</h2>
              <p className="text-gray-500">Página para usuarios que se registran con Google por primera vez.</p>
            </div>
          </div>
        ),
      }
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/room/:id',
        element: <Room />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  }
]);
