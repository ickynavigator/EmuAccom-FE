/* eslint-disable no-useless-escape */

const regexPatterns = {
  email: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,5})$/,
  name: /^[A-Za-z-]{1,64}$/,
  password: /^[A-Za-z0-9!@#$%^&*()_.]{4,64}$/,
};
export default regexPatterns;
