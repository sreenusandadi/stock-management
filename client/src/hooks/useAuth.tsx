import { useState } from "react";
import type { User } from "../types/user.types";

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

const useAuth = () => {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
  });

  return { auth, setAuth };
};

export default useAuth;
