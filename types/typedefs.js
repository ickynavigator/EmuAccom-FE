// Type definitions for javascript using jsdoc.

/**
 * User state type.
 * @typedef {{
 *            email: string,
 *            firstName: string,
 *            lastName: string,
 *            token: string
 *          }} User
 */

/**
 * This is the type of the state object
 * @typedef {{
 *           user: User,
 *          }} AppState
 */

/**
 * This is the type of the review object
 * @typedef {{
 *            _id: string,
 *            name: string,
 *            rating: number,
 *            comment: string,
 *            user: string,
 *          }} Review
 */
