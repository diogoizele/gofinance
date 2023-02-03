import { createContext } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

export interface AuthContextData {
  user: User | null;
  isUserStorageLoading: boolean;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
  signOut(): Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData);
