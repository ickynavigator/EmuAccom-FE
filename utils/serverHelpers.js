/* eslint-disable import/prefer-default-export */

export const isDev = () => {
  const environment = process.env.NODE_ENV;
  switch (environment) {
    case "production":
    case "staging":
      return false;
    case "development":
    case "testing":
    default:
      return true;
  }
};
