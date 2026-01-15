import React, { createContext } from "react";
import useAuth, { type AuthState } from "../hooks/useAuth";

const AuthContext = createContext<{
  auth: AuthState;
  setAuth: (auth: AuthState) => void;
}>({
  auth: {
    isAuthenticated: false,
    user: null,
    token: null,
  },
  setAuth: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { auth, setAuth } = useAuth();

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
