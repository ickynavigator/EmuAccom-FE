import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { store } from "../context/store";
import { verifyToken } from "../utils/axiosRequests";

const WithAuthenticated = Component => {
  const AuthenticatedComponent = () => {
    const { state } = useContext(store);
    const { user } = state;
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      if (user?.token) {
        const verifyTokenWrapper = async () => {
          const res = await verifyToken(user.token);
          if (res.status === 200 || res.status === 204 || res.status === 304) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
            router.push(`/login?redirect=${router.asPath}`);
          }
        };

        verifyTokenWrapper();
      } else {
        setIsAuthenticated(false);
        router.push(`/login?redirect=${router.asPath}`);
      }

      setIsLoading(false);
      return () => {
        setIsAuthenticated(false);
        setIsLoading(false);
      };
    }, [router, state.user, user]);

    return isLoading ? <>loading...</> : isAuthenticated && <Component />;
  };

  return AuthenticatedComponent;
};

export default WithAuthenticated;
