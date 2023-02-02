import { createContext } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

export interface AuthContextData {
  user: User;
}

export const AuthContext = createContext({} as AuthContextData);
