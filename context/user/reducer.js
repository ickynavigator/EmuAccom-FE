import { LOGIN_USER, LOGOUT_USER } from "../constants";

const storeLoginDetails = details => {
  const { email, firstName, lastName, token } = details;

  return { email, firstName, lastName, token };
};

// REDUCER
export const userReducer = (state, action) => {
  switch (action.type) {
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
      throw new Error("INVALID ACTION TYPE");
    }
  }
};

export const initialState = {};
