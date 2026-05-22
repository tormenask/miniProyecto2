/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react';
import type { UserProfile, AuthState } from '../types';

interface AuthContextProps extends AuthState {
  setUser: (user: UserProfile | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>(() => {
    const storedUser = localStorage.getItem('virtual_class_user');
    return {
      user: storedUser ? JSON.parse(storedUser) : null,
      loading: false,
      error: null,
    };
  });

  const setUser = (user: UserProfile | null) => {
    if (user) {
      localStorage.setItem('virtual_class_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('virtual_class_user');
      localStorage.removeItem('virtual_class_token');
    }
    setState((s) => ({ ...s, user }));
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ ...state, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
