/**
 * @apiDefine Error500
 * @apiErrorExample Error Response (500)
 * {
 *  errors: {
 *    message: 'Error occurred.'
 *  }
 *  status: 500
 * }
 */

 /**
 * @apiDefine RouteError401
 * @apiErrorExample Error Response (401)
 * {
 *  errors: {
 *    message: 'You are not authorized to access this route.'
 *  }
 *  status: 401
 * }
 */

/**
 * @apiDefine AdminError403
 * @apiErrorExample Error Response (403)
 * {
 *  errors: {
 *    message: 'You need to have \'admin\' account to access this route.'
 *  }
 *  status: 403
 * }
 */

/**
 * @apiDefine NotAuthError
 * @apiErrorExample Error Response (403)
 * {
 *  errors: {
 *    message: 'A user is already logged in.'
 *  }
 *  status: 403
 * }
 */

/**
 * @apiDefine UserError404
 * @apiErrorExample Error Response (404)
 * {
 *  errors: {
 *    message: 'User not found.'
 *  },
 *  status: 404
 * }
 */

/**
 * @apiDefine MeetingError404
 * @apiErrorExample Error Response (404)
 * {
 *  errors: {
 *    message: 'Meeting not found.'
 *  },
 *  status: 404
 * }
 */
