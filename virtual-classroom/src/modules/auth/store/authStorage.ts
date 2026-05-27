import {
  TOKEN_KEY,
  USER_KEY,
} from "../constants/auth.constants";

import type { User } from "../types";

export const saveToken = (
  token: string
) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const saveUser = (
  user: User
) => {
  localStorage.setItem(
    USER_KEY,
    JSON.stringify(user)
  );
};

export const getUser = (): User | null => {
  const user =
    localStorage.getItem(USER_KEY);

  return user ? JSON.parse(user) : null;
};

export const removeUser = () => {
  localStorage.removeItem(USER_KEY);
};

export const clearAuthStorage = () => {
  removeToken();
  removeUser();
};