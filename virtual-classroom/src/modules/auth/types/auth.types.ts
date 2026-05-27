export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  names: string;
  lastNames: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  names: string;
  lastNames: string;
  email: string;
  role: "ADMIN" | "PARTICIPANT";
  avatar?: string;
}

export interface AuthResponse {
  data: {
    token: string;
    user: User;
  };
}
