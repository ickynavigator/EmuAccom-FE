import { useContext, useEffect, useState } from "react";
import { store } from "../context/store";

const useAuth = () => {
  const { state } = useContext(store);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user] = useState(state.user);

  useEffect(() => {
    if (user?.token) {
      setIsAuthenticated(true);
      // TODO SETUP API TOKEN AUTHENTICATION
    } else {
      setIsAuthenticated(false);
    }

    setIsLoading(false);
  }, [user]);

  return { isAuthenticated, user, isLoading };
};

export default useAuth;
