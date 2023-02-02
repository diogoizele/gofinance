import { AuthContext, AuthContextData } from "./AuthContext";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const user = {
    id: "1",
    name: "John Doe",
    email: "jonhdower@gmail.com",
    picture: "foto",
  };

  const value: AuthContextData = {
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
