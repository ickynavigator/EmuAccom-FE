import { Loader } from "@mantine/core";
import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AUTHENTICATE_USER } from "../context/constants";
import { store } from "../context/store";
import { verifyToken } from "../utils/axiosRequests";

const WithAuthenticated = Component => {
  const AuthenticatedComponent = () => {
    const { state, dispatch } = useContext(store);
    const Router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const verifyTokenWrapper = useCallback(async () => {
      if (state.user) {
        if (state.user.token) {
          if (state.user.isAuthenticated) {
            setIsAuthenticated(true);
            setIsLoading(false);
            return;
          }

          const res = await verifyToken(state.user.token);
          if (res.status === 200 || res.status === 204 || res.status === 304) {
            dispatch({ type: AUTHENTICATE_USER, payload: true });
            setIsAuthenticated(true);
            setIsLoading(false);
            return;
          }
        }
      }

      setIsAuthenticated(false);
      dispatch({ type: AUTHENTICATE_USER, payload: false });
      setIsLoading(false);
      Router.push(`/login?redirect=${Router.asPath}`);
    }, [state.user, dispatch, Router]);

    useEffect(() => {
      verifyTokenWrapper();
    }, [verifyTokenWrapper]);

    return isLoading ? <Loader size="xl" /> : isAuthenticated && <Component />;
  };

  return AuthenticatedComponent;
};

export default WithAuthenticated;
