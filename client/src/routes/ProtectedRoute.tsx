import { useContext, type JSX } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

type Props = {
  children: JSX.Element;
};

function ProtectedRoute({ children }: Props) {
  const { auth } = useContext(AuthContext);

  const isLoggedIn = auth.isAuthenticated;
  return isLoggedIn ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
