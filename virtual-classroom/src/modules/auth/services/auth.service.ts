import { API_ROUTES } from "@/shared/constants/api";

import type {
  LoginDto,
  RegisterDto,
  AuthResponse,
  GoogleRegisterData,
  GoogleCheckResponse,
} from "../types";

export const loginRequest = async (
  payload: LoginDto,
): Promise<AuthResponse> => {
  const response = await fetch(API_ROUTES.AUTH.LOGIN, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Credenciales inválidas");
  }

  return response.json();
};

export const registerRequest = async (
  payload: RegisterDto,
): Promise<AuthResponse> => {
  const response = await fetch(API_ROUTES.AUTH.REGISTER, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    console.error(errorData);

    throw new Error("Error registrando usuario");
  }

  return response.json();
};

export const checkGoogleUser = async (
  uid: string,
  email: string,
): Promise<GoogleCheckResponse> => {
  const response = await fetch(API_ROUTES.AUTH.GOOGLE_CHECK, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      uid,
      email,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    console.error(errorData);

    throw new Error("Error verificando usuario Google");
  }

  return response.json();
};

export const registerGoogle = async (
  payload: GoogleRegisterData,
): Promise<AuthResponse> => {
  const response = await fetch(API_ROUTES.AUTH.GOOGLE_REGISTER, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    console.error(errorData);

    throw new Error("Error registrando usuario Google");
  }

  return response.json();
};
