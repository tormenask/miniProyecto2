import type { Timestamp } from "firebase/firestore/lite";

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  names: string;
  username: string;
  lastNames: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar: string;
}

export interface User {
  uid: string;
  names: string;
  lastNames: string;
  username: string;
  email: string;
  avatar: string;
  role: 'ADMIN' | 'PARTICIPANT';
  createdAt: Timestamp | Date;
}

export interface AuthResponse {
  data: {
    token: string;
    user: User;
  } | null;
  error: string | null;
}
