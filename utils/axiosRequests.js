// / <reference path="../types/typedefs.js"
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

/** @param {Dormitory} data */
export const addNewDorm = data => {
  // data is already expected to be validated
  const res = axios.post(`${serverURL}/dorm`, data);
  return res;
};

/** @param {Home} data */
export const addNewHome = data => {
  // data is already expected to be validated
  const res = axios.post(`${serverURL}/house`, data);
  return res;
};

/** @param {User} data */
export const updateUserInfo = data => {
  // AXIOS INTERCEPTOR
  axios.interceptors.response.use(
    response => response,
    axiosResolvers["400-401"],
  );
  const url = `${serverURL}/users/profile`;
  const config = {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  };
  return axios.put(url, data, config);
};

/** @param {Manager} data */
export const updateManagerInfo = data => {
  // AXIOS INTERCEPTOR
  axios.interceptors.response.use(
    response => response,
    axiosResolvers["400-401"],
  );
  const url = `${serverURL}/manager/profile`;
  const config = {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  };
  return axios.put(url, data, config);
};

export const fetchAllLoggedInManagerProperties = token => {
  // AXIOS INTERCEPTOR
  axios.interceptors.response.use(
    response => response,
    axiosResolvers["400-401"],
  );
  const url = `${serverURL}/manager/profile/property`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(url, config);
};

export const deleteProperty = (token, type, id) => {
  // AXIOS INTERCEPTOR
  axios.interceptors.response.use(
    response => response,
    axiosResolvers["400-401"],
  );
  const routeType = (() => {
    switch (type) {
      case "dorm":
        return `dorm`;
      case "home":
        return `house`;
      default:
        return "";
    }
  })();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.delete(`${serverURL}/manager/${routeType}/${id}`, config);
};

export const updateDorm = (form, id) => {
  // AXIOS INTERCEPTOR
  axios.interceptors.response.use(
    response => response,
    axiosResolvers["400-401"],
  );
  const url = `${serverURL}/dorm/${id}`;
  const config = {
    headers: {
      Authorization: `Bearer ${form.token}`,
    },
  };
  return axios.put(url, form, config);
};

export const updateHome = (form, id) => {
  // AXIOS INTERCEPTOR
  axios.interceptors.response.use(
    response => response,
    axiosResolvers["400-401"],
  );
  const url = `${serverURL}/house/${id}`;
  const config = {
    headers: {
      Authorization: `Bearer ${form.token}`,
    },
  };
  return axios.put(url, form, config);
};
