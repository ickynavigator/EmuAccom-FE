import { useContext, useEffect, useState } from "react";
import { store } from "../context/store";
import { verifyMangerToken } from "../utils/axiosRequests";

const useManagerAuth = () => {
  const { state, dispatch } = useContext(store);
  const { manager } = state;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (manager?.token) {
      const verifyTokenWrapper = async () => {
        const res = await verifyMangerToken(manager.token);
        if (res.status === 200 || res.status === 204 || res.status === 304) {
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
  }, [dispatch, manager]);

  return { isAuthenticated, manager, isLoading };
};

export default useManagerAuth;
