import React, { createContext, useReducer } from "react";
import combineReducers from "react-combine-reducers";
import { initialState as userState, userReducer } from "./user/reducer";

const appState = {};
const store = createContext(appState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [reducer, initialState] = combineReducers({
    user: [userReducer, userState],
  });

  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Provider value={{ state, dispatch }}>{children}</Provider>
  );
};

export { store, StateProvider };
