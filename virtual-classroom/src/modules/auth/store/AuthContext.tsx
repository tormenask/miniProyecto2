import {
  createContext,
  useState,
} from "react";

import type {
  User,
  AuthResponse,
} from "../types";

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

  login: (
    data: AuthResponse
  ) => void;

  logout: () => void;
}

export const AuthContext =
  createContext<AuthContextProps>(
    {} as AuthContextProps
  );

export const AuthProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [user, setUser] =
    useState<User | null>(() => {
      return getUser();
    });

  const [loading] =
    useState(false);

  const login = (
    data: AuthResponse
  ): void => {
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
        isAuthenticated:
          !!getToken() && !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};