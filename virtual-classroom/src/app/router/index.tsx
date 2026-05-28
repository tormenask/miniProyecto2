import { createBrowserRouter, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";
import { Login } from "@/modules/auth/pages/Login";
import { Register } from "@/modules/auth/pages/Register";
import { Dashboard } from "@/modules/dashboard/pages/Dashboard";
import { Room } from "@/modules/room/pages/Room";
import { CompleteGoogleRegister } from "@/modules/auth/pages/CompleteGoogleRegister";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/complete-google-register",
        element: <CompleteGoogleRegister />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/room/:id",
        element: <Room />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
]);
