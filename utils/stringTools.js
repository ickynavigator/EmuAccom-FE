/* eslint-disable no-useless-escape */

export const regexPatterns = {
  text: /^[a-zA-Z0-9\s]*$/,
  email: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,5})$/,
  name: /^[A-Za-z-]{1,64}$/,
  password: /^[A-Za-z0-9!@#$%^&*()_.]{4,64}$/,
};

/**
 * Tests if a string is blank
 * @param {string} value
 * @returns {boolean}
 */
export function isBlank(value) {
  const regexp = /^ *$/;
  return regexp.test(value);
}

/**
 * tests if a string is a undefined/null or empty
 * @param {string | undefined | null} value
 * @returns {boolean}
 */
export function isBlankOrUndefined(value) {
  if (value === undefined || value == null) {
    return true;
  }
  return isBlank(value);
}
