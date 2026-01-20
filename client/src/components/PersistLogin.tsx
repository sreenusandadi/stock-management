import { useContext, useEffect, useState } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import AuthContext from "../context/AuthProvider";
import { Outlet, useLocation } from "react-router-dom";
import NavItemsContext from "../context/NavItemsProvider";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { refresh } = useRefreshToken();
  const { auth } = useContext(AuthContext);
  const { setNavItem } = useContext(NavItemsContext);
  const location = useLocation();

  console.log(location.pathname);

  useEffect(() => {
    const refreshToken = async () => {
      try {
        await refresh();
        setNavItem(location.pathname);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!auth?.token) {
      refreshToken();
    } else {
      setIsLoading(false);
    }
  }, [auth, refresh]);

  useEffect(() => {
    console.log(`IsLoading: ${isLoading}`);
    console.log(`AT: ${JSON.stringify(auth)}`);
  }, [isLoading]);

  return isLoading ? <p>Loading...</p> : <Outlet />;
};

export default PersistLogin;
