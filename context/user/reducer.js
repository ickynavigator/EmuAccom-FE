/// <reference path="../../types/typedefs.js" />
import { LOGIN_USER, LOGOUT_USER } from "../constants";

/**
 * Accepts the user login, parses and returns a structured
 * object for the reducer state
 * @param {User} details
 */
const storeLoginDetails = details => {
  const { email, firstName, lastName, token } = details;

  return { email, firstName, lastName, token };
};

/**
 * User reducer
 * @param {User} state
 * @param {{type:string, payload:any}} action
 *
 * @return {User}
 */
export const userReducer = (state, action) => {
  switch (action?.type) {
    case LOGIN_USER: {
      const userDetails = storeLoginDetails(action.payload);
      return {
        ...state,
        ...userDetails,
      };
    }
    case LOGOUT_USER: {
      return {};
    }
    default: {
      console.error("INVALID ACTION TYPE");
      return state;
    }
  }
};

export const initialState = {};
