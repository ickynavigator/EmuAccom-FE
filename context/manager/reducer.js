/// <reference path="../../types/typedefs.js" />
import {
  AUTHENTICATE_MANAGER,
  LOGIN_MANAGER,
  LOGOUT_MANAGER,
} from "../constants";

/**
 * Accepts the manager login details, parses and returns a structured
 * object for the reducer state
 * @param {Manager} details
 */
const storeLoginDetails = details => {
  const {
    _id: id,
    businessName,
    managerFirstName,
    managerLastName,
    managerEmail,
    managerDescription,
    type,
    token,
  } = details;

  return {
    id,
    businessName,
    managerFirstName,
    managerLastName,
    managerEmail,
    managerDescription,
    type,
    token,
    isAuthenticated: true,
  };
};

/**
 * User reducer
 * @param {Manager} state
 * @param {{type:string, payload:any}} action
 *
 * @return {Manager}
 */
export const managerReducer = (state, action) => {
  switch (action?.type) {
    case LOGIN_MANAGER: {
      const managerDetails = storeLoginDetails(action.payload);
      return {
        ...state,
        ...managerDetails,
      };
    }
    case LOGOUT_MANAGER: {
      return {};
    }
    case AUTHENTICATE_MANAGER: {
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    }
    default: {
      console.error("INVALID ACTION TYPE");
      return state;
    }
  }
};

export const initialState = {};
