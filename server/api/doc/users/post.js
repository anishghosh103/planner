/**
 * @api {post} /api/users/login Login
 * @apiName Login
 * @apiGroup User
 * 
 * @apiParam {String} username Username of the user. (Body Parameter)
 * @apiParam {String} password Password of the user. (Body Parameter)
 * 
 * @apiSuccessExample Success Response
 * {
 *  message: 'Login successful.',
 *  status: 200,
 *  data: [
 *    user: {
 *      userId: String,
 *      firstname: String,
 *      lastname: String,
 *      email: String,
 *      username: String,
 *      mobile: String,
 *      userType: String,
 *    }
 *  ]
 * }
 * 
 * @apiErrorExample Error Response (400)
 * {
 *  errors: {
 *    message: 'Some field is empty.',
 *  }
 *  status: 400
 * }
 * @apiErrorExample Error Response (400)
 * {
 *  errors: {
 *    password: 'Incorrect password.',
 *  }
 *  status: 400
 * }
 * @apiErrorExample Error Response (400)
 * {
 *  errors: {
 *    username: 'Username not found.',
 *  }
 *  status: 400
 * }
 * @apiErrorExample Error Response (400)
 * {
 *  errors: {
 *    username: 'User is not verified.',
 *  }
 *  status: 400
 * }
 * @apiUse NotAuthError
 * @apiUse Error500
 */

/**
 * @api {post} /api/users/signup Sign Up
 * @apiName SignUp
 * @apiGroup User
 * 
 * @apiParam {String} firstname First name of the user. (Body Parameter)
 * @apiParam {String} lastname Last name of the user. (Body Parameter)
 * @apiParam {String} username Username of the user. (Body Parameter)
 * @apiParam {String} email Email of the user. (Body Parameter)
 * @apiParam {String} password Password of the user. (Body Parameter)
 * @apiParam {String} mobile Mobile no. of the user. (Body Parameter)
 * 
 * @apiSuccessExample Success Response
 * {
 *  message: 'Registration successful.',
 *  status: 200,
 *  data: {
 *    userId: String,
 *    firstname: String,
 *    lastname: String,
 *    username: String,
 *    email: String,
 *    mobile: String,
 *    userType: String,
 *  }
 * }
 * 
 * @apiErrorExample Error Response (400)
 * {
 *  errors: {
 *    message: 'Some field is empty.',
 *  }
 *  status: 400,
 * }
 * @apiErrorExample Error Response (400)
 * {
 *  errors: {
 *    email: 'Email is already registered.'
 *  },
 *  status: 400,
 * }
 * @apiErrorExample Error Response (400)
 * {
 *  errors: {
 *    username: 'Username is already taken.'
 *  },
 *  status: 400,
 * }
 * @apiUse NotAuthError
 * @apiUse Error500
 */

/**
 * @api {post} /api/users/logout Logout
 * @apiName Logout
 * @apiGroup User
 * @apiPermission User
 * 
 * @apiSuccessExample Success Response
 * {
 *  message: 'Logout successful.',
 *  status: 200,
 *  data: null
 * }
 * 
 * @apiUse RouteError401
 * @apiUse Error500
 */

/**
 * @api {post} /api/users/forgot-password Forgot Password
 * @apiName ForgotPassword
 * @apiGroup User
 * 
 * @apiSuccessExample Success Response
 * {
 *  message: 'Password reset mail sent.',
 *  status: 200,
 *  data: null
 * }
 * 
 * @apiErrorExample Error Response (400)
 * {
 *  errors: {
 *    username: 'Username does not exist.'
 *  },
 *  status: 400,
 * }
 * @apiUse NotAuthError
 * @apiUse Error500
 */