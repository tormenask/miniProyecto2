import { Timestamp } from 'firebase/firestore';

export type Role = 'ADMIN' | 'PARTICIPANT';

export interface UserProfile {
  uid: string;
  names: string;
  lastNames: string;
  username: string;
  email: string;
  avatar: string;
  role: Role;
  createdAt: Timestamp | Date;
}

export interface AuthState {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
}
