import { createContext, useState } from "react";

import type { User, AuthResponse } from "../types";

import {
  clearAuthStorage,
  getToken,
  getUser,
  saveToken,
  saveUser,
} from "./authStorage";

interface AuthContextProps {
  user: User | null;

  loading: boolean;

  isAuthenticated: boolean;

  login: (data: AuthResponse) => void;

  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(() => {
    return getUser();
  });

  const [loading] = useState(false);

  const login = (data: AuthResponse): void => {
    // Verificamos si data.data existe antes de operar con él
    if (!data.data) {
      console.error(
        "No se pudo iniciar sesión: Datos de autenticación vacíos.",
        data.error,
      );
      return;
    }

    // Aquí TypeScript ya sabe con 100% de certeza que data.data NO es null
    saveToken(data.data.token);
    saveUser(data.data.user);
    setUser(data.data.user);
  };

  const logout = (): void => {
    clearAuthStorage();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!getToken() && !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
