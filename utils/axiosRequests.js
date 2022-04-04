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

export const paramParser = params => {
  let paramString = "?";
  for (let i = 0; i < params.length; i += 1) {
    if (params[i].val.length > 1)
      paramString += `${params[i].key}=${params[i].val}&`;
  }

  return paramString;
};

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
