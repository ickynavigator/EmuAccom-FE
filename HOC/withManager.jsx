import React, { useCallback, useContext, useEffect, useState } from "react";
import Unauthorized from "../components/Unauthorized";
import { store } from "../context/store";
import WithAuthenticated from "./withAuthenticated";

const WithManager = Component => {
  const ManagerOnlyComponent = props => {
    const { state } = useContext(store);
    const { user } = state;
    const [isManager, setIsManager] = useState(false);

    const verifyManager = useCallback(() => {
      if (user?.type === "manager") {
        setIsManager(true);
      } else {
        setIsManager(false);
      }
    }, [user]);

    useEffect(() => {
      verifyManager();
    }, [verifyManager]);

    return isManager ? <Component {...props} /> : <Unauthorized />;
  };

  return WithAuthenticated(ManagerOnlyComponent);
};

export default WithManager;
