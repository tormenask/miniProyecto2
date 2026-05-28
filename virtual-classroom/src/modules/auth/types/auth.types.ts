export interface User {
  uid: string;
  names: string;
  lastNames?: string;
  username: string;
  email: string;
  avatar?: string;
  role: "ADMIN" | "PARTICIPANT";
  provider?: "email" | "google";
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  names: string;
  lastNames: string;
  username: string;
  email: string;
  password: string;
  avatar?: string;
  role: "ADMIN" | "PARTICIPANT";
}

export interface GoogleRegisterData {
  uid: string;
  names: string;
  username: string;
  email: string;
  avatar?: string;
}

/* =========================================
   API GENERIC RESPONSE
========================================= */

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

/* =========================================
   AUTH RESPONSE
========================================= */

export interface AuthData {
  token: string;
  user: User;
}

export type AuthResponse = ApiResponse<AuthData>;

/* =========================================
   GOOGLE CHECK RESPONSE
========================================= */

export interface GoogleCheckData {
  exists: boolean;
  token?: string;
  user?: User;
}

export type GoogleCheckResponse = ApiResponse<GoogleCheckData>;