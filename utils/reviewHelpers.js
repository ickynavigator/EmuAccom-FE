/// <reference path="../types/typedefs.js" />

/**
 * Gets the star rating from all the ratings in the reviews array
 *
 * @param {Review[]} reviews - an array of reviews
 *
 */
export const getRating = reviews => {
  if (reviews.length <= 0) {
    return 0;
  }
  const rate = reviews.reduce((acc, review) => acc + review.rating, 0);
  return rate / reviews.length;
};

export default {};
