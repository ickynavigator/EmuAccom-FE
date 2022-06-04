import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AUTHENTICATE_MANAGER } from "../context/constants";
import { store } from "../context/store";
import { verifyMangerToken } from "../utils/axiosRequests";
// import WithAuthenticated from "./withAuthenticated";

const WithManager = Component => {
  const ManagerOnlyComponent = () => {
    const { state, dispatch } = useContext(store);
    const Router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isManager, setIsManager] = useState(false);

    const verifyManager = useCallback(async () => {
      if (state.manager.token) {
        if (state.manager.isAuthenticated) {
          setIsManager(true);
          setIsLoading(false);
          return;
        }

        const res = await verifyMangerToken(state.manager.token);
        if (res.status === 200 || res.status === 204 || res.status === 304) {
          dispatch({ type: AUTHENTICATE_MANAGER, payload: true });
          setIsManager(true);
          setIsLoading(false);
          return;
        }
      }

      setIsManager(false);
      dispatch({ type: AUTHENTICATE_MANAGER, payload: false });
      setIsLoading(false);
      Router.push(`/host/login?redirect=${Router.asPath}`);
    }, [state.manager, dispatch, Router]);

    useEffect(() => {
      verifyManager();
    }, [verifyManager]);

    return isLoading ? <>loading...</> : isManager && <Component />;
  };

  return ManagerOnlyComponent;
  // return WithAuthenticated(ManagerOnlyComponent);
};

export default WithManager;
