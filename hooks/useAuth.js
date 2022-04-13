import { useContext, useEffect, useState } from "react";
import { store } from "../context/store";
import { verifyToken } from "../utils/axiosRequests";

const useAuth = () => {
  const { state } = useContext(store);
  const { user } = state;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.token) {
      const verifyTokenWrapper = async () => {
        const res = await verifyToken(user.token);
        if (res.status === 200 && res.data?.valid) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      };

      verifyTokenWrapper();
    } else {
      setIsAuthenticated(false);
    }

    setIsLoading(false);
    return () => {
      setIsAuthenticated(false);
      setIsLoading(false);
    };
  }, [state.user, user]);

  return { isAuthenticated, user, isLoading };
};

export default useAuth;
