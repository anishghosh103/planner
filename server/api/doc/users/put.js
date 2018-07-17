/**
 * @api {put} /api/users/:id/activate Activate User
 * @apiName ActivateUser
 * @apiGroup User
 * 
 * @apiParam {String} id User Id. (URL Parameter)
 * 
 * @apiSuccessExample Success Response
 * {
 *  message: 'User verified.',
 *  status: 200,
 *  data: null
 * }
 * 
 * @apiUse UserError404
 * @apiUse Error500
 */

/**
 * @api {put} /api/users/reset-password Reset Password
 * @apiName ResetPassword
 * @apiGroup User
 * 
 * @apiParam {String} token JSON Web Token from the password reset email. (Body Parameter)
 * @apiParam {String} password Password of the user. (Body Parameter)
 * 
 * @apiSuccessExample Success Response
 * {
 *  error: false,
 *  message: 'Password reset successful.',
 *  status: 200,
 *  data: {
 *    userId: String,
 *    firstname: String,
 *    lastname: String,
 *    username: String,
 *    email: String,
 *    mobile: String,
 *    userType: String
 *  }
 * }
 * 
 * @apiErrorExample Error Response (400)
 * {
 *  errors: {
 *    message: 'Password not provided.',
 *  }
 *  status: 400
 * }
 * @apiErrorExample Error Response (400)
 * {
 *  errors: {
 *    message: 'Invalid token.',
 *  }
 *  status: 400
 * }
 * @apiUse UserError404
 * @apiUse RouteError401
 * @apiUse Error500
 */