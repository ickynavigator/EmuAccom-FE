// Type definitions for javascript using jsdoc.

/**
 * User state type.
 * @typedef {{
 *            email: string,
 *            firstName: string,
 *            lastName: string,
 *            token: string
 *            isAuthenticated?: boolean
 *          }} User
 */

/**
 * This is the type of the state object
 * @typedef {{
 *           user: User,
 *           manager: Manager
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

/**
 * This is the type of the address object
 *  @typedef {{
 *      addressLine: string,
 *      city: string,
 *      postalCode: string,
 *      country: string,
 *  }} Address
 */

/**
 *  This is the type of the Dorm object
 *  @typedef {{
 *      name: string,
 *      description: string,
 *      address: Address,
 *      bedroomCount: number,
 *      bedCount: number,
 *      bathroomCount: number,
 *      accomodateCount: number,
 *      availabilityCount: number,
 *      pricePerSemester: number,
 *      pricePerNight?: number,
 *      pictures: { url: string, description?: string }[],
 *      keywords: { tag: string }[],
 *      reviews: Review[],
 *      approved: boolean,
 *      management: string,
 *  }} Dormitory
 */

/**
 *  This is the type of the Manager object
 *  @typedef {{
 *      businessName: string,
 *      managerFirstName: string,
 *      managerLastName: string,
 *      managerEmail: string,
 *      managerDescription: string,
 *      type: string,
 *  }} Manager
 */
