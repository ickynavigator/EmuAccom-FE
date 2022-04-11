import { useLocalStorage } from "@mantine/hooks";
import React, { createContext, useEffect, useReducer } from "react";
import combineReducers from "react-combine-reducers";
import { initialState as userState, userReducer } from "./user/reducer";

const appState = {};
const store = createContext(appState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [reducer, initialState] = combineReducers({
    user: [userReducer, userState],
  });

  // Fetches the state from the browser local storage
  const [persistedState, setPersistedState] = useLocalStorage({
    key: "state",
    defaultValue: initialState,
  });

  const [state, dispatch] = useReducer(reducer, persistedState);

  useEffect(() => {
    // Updates the local storage state when the user makes changes
    setPersistedState(state);
  }, [setPersistedState, state]);

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Provider value={{ state, dispatch }}>{children}</Provider>
  );
};

export { store, StateProvider };
