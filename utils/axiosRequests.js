import axios from "axios";
import { isBlankOrUndefined } from "./stringTools";

/** REQUEST HELPERS */
export const serverBase = (environment = "development") => {
  switch (environment) {
    case "production":
      return (
        process.env.NEXT_PUBLIC_SERVER_URL ??
        "https://emuaccom-be.herokuapp.com/"
      );
    case "development":
    default:
      return process.env.NEXT_PUBLIC_SERVER_URL;
  }
};
export const serverURL = `${serverBase(process.env.NODE_ENV)}/v1/api`;
export const axiosResolvers = {
  "400-401": error => {
    if (error.response.status === 401) {
      return Promise.resolve(error);
    }
    if (error.response.status === 400) {
      return Promise.resolve(error);
    }
    return Promise.reject(error);
  },
  401: error => {
    if (error.response.status === 401) {
      return Promise.resolve(error);
    }
    return Promise.reject(error);
  },
};
/**
 * @param {{key: string, val: string | number | boolean }[]} params
 * @returns {string}
 */
export const paramParser = params => {
  let paramString = "?";
  params.forEach(({ key, val }) => {
    if (isBlankOrUndefined(val)) return;

    paramString += `${key}=${val}&`;
  });
  return paramString.slice(0, -1);
};

/** REQUESTS */
export const signInRequest = data => {
  // AXIOS INTERCEPTOR
  axios.interceptors.response.use(response => response, axiosResolvers["401"]);
  const postData = {
    email: data.email,
    password: data.password,
  };
  return axios.post(`${serverURL}/users/login`, postData);
};

export const signUpRequest = data => {
  // AXIOS INTERCEPTOR
  axios.interceptors.response.use(
    response => response,
    axiosResolvers["400-401"],
  );
  const postData = {
    email: data.email,
    password: data.password,
    firstName: data.fName,
    lastName: data.fName,
    type: data.type,
  };
  return axios.post(`${serverURL}/users`, postData);
};

export const fetchDorms = ({
  searchParam = "",
  search = "",
  pageSize = 10,
  pageNumber = 1,
  noPaginate = false,
}) => {
  const parsedParams = paramParser([
    { key: "param", val: searchParam },
    { key: "keyword", val: search },
    { key: "pageSize", val: pageSize },
    { key: "pageNumber", val: pageNumber },
    { key: "noPaginate", val: noPaginate },
  ]);
  return axios.get(`${serverURL}/dorm${parsedParams}`);
};

export const fetchHomes = ({
  searchParam = "",
  search = "",
  pageSize = 10,
  pageNumber = 1,
  noPaginate = false,
}) => {
  const parsedParams = paramParser([
    { key: "param", val: searchParam },
    { key: "keyword", val: search },
    { key: "pageSize", val: pageSize },
    { key: "pageNumber", val: pageNumber },
    { key: "noPaginate", val: noPaginate },
  ]);
  return axios.get(`${serverURL}/house${parsedParams}`);
};

export const fetchSingleDormById = id => {
  const url = `${serverURL}/dorm/${id}`;
  return axios.get(url);
};

export const fetchSingleHouseById = id => {
  const url = `${serverURL}/house/${id}`;
  return axios.get(url);
};

export const verifyToken = token => {
  // AXIOS INTERCEPTOR
  axios.interceptors.response.use(
    response => response,
    axiosResolvers["400-401"],
  );
  const url = `${serverURL}/users/auth`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(url, config);
};

export const signUpManagerRequest = data => {
  // AXIOS INTERCEPTOR
  axios.interceptors.response.use(
    response => response,
    axiosResolvers["400-401"],
  );
  const postData = {
    businessName: data.businessName,
    managerFirstName: data.managerFirstName,
    managerLastName: data.managerLastName,
    managerEmail: data.managerEmail,
    managerDescription: data.managerDescription,
    password: data.password,
    type: data.type,
  };
  return axios.post(`${serverURL}/manager`, postData);
};

export const signInManagerRequest = data => {
  // AXIOS INTERCEPTOR
  axios.interceptors.response.use(response => response, axiosResolvers["401"]);
  const postData = {
    managerEmail: data.email,
    password: data.password,
  };
  return axios.post(`${serverURL}/manager/login`, postData);
};

export const verifyMangerToken = token => {
  // AXIOS INTERCEPTOR
  axios.interceptors.response.use(
    response => response,
    axiosResolvers["400-401"],
  );
  const url = `${serverURL}/manager/auth`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(url, config);
};
