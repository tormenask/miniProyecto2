
const BASE_URL: string = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';


export const API_ROUTES = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    REGISTER: `${BASE_URL}/auth/register`,
    LOGOUT: `${BASE_URL}/auth/logout`,
    REFRESH_TOKEN: `${BASE_URL}/auth/refresh-token`,
    ME: `${BASE_URL}/auth/me`,
    FORGOT_PASSWORD: `${BASE_URL}/auth/forgot-password`,
    GOOGLE_CHECK: `${BASE_URL}/auth/google/check`,
    GOOGLE_REGISTER: `${BASE_URL}/auth/google/register`,
  },
  ROOMS: {
    BASE: `${BASE_URL}/rooms`,
    GET_ALL: `${BASE_URL}/rooms`,
    GET_BY_ID: (id: string | number): string => `${BASE_URL}/rooms/${id}`,
    CREATE: `${BASE_URL}/rooms`,
    UPDATE: (id: string | number): string => `${BASE_URL}/rooms/${id}`,
    DELETE: (id: string | number): string => `${BASE_URL}/rooms/${id}`,
  },
} as const; 

export type ApiRoutesType = typeof API_ROUTES;