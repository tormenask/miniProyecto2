import { API_ROUTES } from "@/shared/constants/api";

import type {
  LoginDto,
  RegisterDto,
  AuthResponse,
} from "../types";

export const loginRequest = async (
  payload: LoginDto
): Promise<AuthResponse> => {
  const response = await fetch(
    API_ROUTES.AUTH.LOGIN,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(payload),
    }
  );
  console.log(response);
  if (!response.ok) {
    throw new Error(
      "Credenciales inválidas"
    );
  }

  return response.json();
};

export const registerRequest = async (
  payload: RegisterDto
): Promise<AuthResponse> => {
  const response = await fetch(
    API_ROUTES.AUTH.REGISTER,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Error registrando usuario"
    );
  }

  return response.json();
};