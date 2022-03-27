import axios from "axios";

const serverBase = environment => {
  switch (environment) {
    case "production":
      return "https://emuaccom-be-production.up.railway.app";
    case "development":
    default:
      return process.env.NEXT_PUBLIC_SERVER_URL;
  }
};
export const serverURL = `${serverBase(process.env.NODE_ENV)}/v1/api`;

export const signInRequest = data => {
  // AXIOS INTERCEPTOR
  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401) {
        return Promise.resolve(error);
      }
      return Promise.reject(error);
    },
  );

  const postData = {
    email: data.email,
    password: data.password,
  };
  return axios.post(`${serverURL}/users/login`, postData);
};
