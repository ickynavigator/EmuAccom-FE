import axios from "axios";

/** REQUEST HELPERS */
export const serverBase = (environment = "development") => {
  switch (environment) {
    case "production":
      return "https://emuaccom-be-production.up.railway.app";
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
};
export const paramParser = params => {
  let paramString = "?";
  for (let i = 0; i < params.length; i += 1) {
    if (params[i].val.length > 1)
      paramString += `${params[i].key}=${params[i].val}&`;
  }

  return paramString;
};

/** REQUESTS */
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
  paginate = true,
}) => {
  const parsedParams = paramParser([
    { key: "param", val: searchParam },
    { key: "keyword", val: search },
    { key: "pageSize", val: pageSize },
    { key: "pageNumber", val: pageNumber },
    { key: "paginate", val: paginate },
  ]);
  return axios.get(`${serverURL}/dorm${parsedParams}`);
};

export const fetchHomes = ({
  searchParam = "",
  search = "",
  pageSize = 10,
  pageNumber = 1,
  paginate = true,
}) => {
  const parsedParams = paramParser([
    { key: "param", val: searchParam },
    { key: "keyword", val: search },
    { key: "pageSize", val: pageSize },
    { key: "pageNumber", val: pageNumber },
    { key: "paginate", val: paginate },
  ]);
  return axios.get(`${serverURL}/house${parsedParams}`);
};

export const fetchSingleDormById = id => {
  const url = `${serverURL}/dorm/${id}`;
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
    email: data.email,
    password: data.password,
    firstName: data.fName,
    lastName: data.fName,
    type: data.type,
  };
  return axios.post(`${serverURL}/users/manager`, postData);
};
