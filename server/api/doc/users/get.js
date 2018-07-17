/**
 * @api {get} /api/users/ Get All Users
 * @apiName GetAllUsers
 * @apiGroup User
 * @apiPermission Admin
 * 
 * @apiParam {Number} [page=1] Page number of the search result (each page contains 20 results). (Query Parameter)
 * 
 * @apiSuccessExample Success Response (200)
 * {
 *  message: 'Users found.'
 *  status: 200,
 *  data: {
 *    total: Number,
 *    users: [{
 *      userId: String,
 *      firstname: String,
 *      lastname: String,
 *      email: String,
 *      username: String,
 *      mobile: String,
 *      userType: String,
 *    }]
 *  }
 * }
 * 
 * @apiUse RouteError401
 * @apiUse AdminError403
 * @apiUse Error500
 */

/**
 * @api {get} /api/users/notifications Get Notifications of User
 * @apiName GetNotifications
 * @apiGroup User
 * @apiPermission User
 * 
 * @apiParam {Number} [page=1] Page number of the search result (each page contains 20 results). (Query Parameter)
 * 
 * @apiSuccessExample Success Response (200)
 * {
 *  message: 'Notifications found.'
 *  status: 200,
 *  data: {
 *    total: Number,
 *    notifications: [{
 *      notificationId: String,
 *      userId: String,
 *      notificationType: ['created', 'updated', 'deleted'],
 *      meeting: {
 *        meetingId: String,
 *        userId: String,
 *        purpose: String,
 *        date: {
 *          day: Number,
 *          month: Number,
 *          year: Number
 *        },
 *        startTime: {
 *          hour: Number,
 *          minute: Number,
 *        },
 *        endTime: {
 *          hour: Number,
 *          minute: Number,
 *        },
 *        place: String,
 *        createdAt: Date,
 *        createdBy: {,
 *          adminId: String,
 *          adminName: String,
 *        },
 *        updatedAt: Date,
 *        updatedBy: {,
 *          adminId: String,
 *          adminName: String,
 *        },
 *      }
 *    }]
 *  }
 * }
 * 
 * @apiUse RouteError401
 * @apiUse Error500
 */

/**
 * @api {get} /api/users/auth-status Get Authorization Status of User
 * @apiName GetAuthStatus
 * @apiGroup User
 * @apiPermission User
 * 
 * @apiSuccessExample Success Response (200)
 * {
 *  message: 'User authorized.'
 *  status: 200,
 *  data: {
 *    user: {
 *      userId: String,
 *      firstname: String,
 *      lastname: String,
 *      email: String,
 *      username: String,
 *      mobile: String,
 *      userType: String,
 *    }
 *  }
 * }
 * 
 * @apiUse RouteError401
 * @apiUse Error500
 */

/**
 * @api {get} /api/users/:id Get User details by ID
 * @apiName GetUserById
 * @apiGroup User
 * @apiPermission User
 * 
 * @apiParam {String} id User Id. (URL Parameter)
 * 
 * @apiSuccessExample Success Response (200)
 * {
 *  message: 'User found.'
 *  status: 200,
 *  data: {
 *    user: {
 *      userId: String,
 *      firstname: String,
 *      lastname: String,
 *      email: String,
 *      username: String,
 *      mobile: String,
 *      userType: String,
 *    }
 *  }
 * }
 * 
 * @apiErrorExample Error Response (404)
 * {
 *  errors: {
 *    message: 'User not found.',
 *  }
 *  status: 404
 * }
 * @apiUse RouteError401
 * @apiUse Error500
 */

/**
 * @api {get} api/users/:id/meetings Get Meetings Of a User
 * @apiName GetMeetingsOfUser
 * @apiGroup User
 * @apiPermission User
 * 
 * @apiParam {String} id User Id. (URL Parameter)
 * @apiParam {Number} [year] Year. (Query Parameter)
 * @apiParam {Number} [month] Month. (Query Parameter)
 * @apiParam {Number} [day] Date. (Query Parameter)
 * @apiParam {Number} [page] Page number. Each page contains 20 meetings. (Query Parameter)
 * 
 * @apiSuccessExample Success Response (200)
 * {
 *  message: 'Meetings found.',
 *  status: 200,
 *  data: {
 *    total: Number,
 *    meetings: [{
*      meetingId: String,
*      userId: String,
*      purpose: String,
*      date: {
*        day: Number,
*        month: Number,
*        year: Number
*      },
*      startTime: {
*        hour: Number,
*        minute: Number,
*      },
*      endTime: {
*        hour: Number,
*        minute: Number,
*      },
*      place: String,
*      createdAt: Date,
*      createdBy: {,
*        adminId: String,
*        adminName: String,
*      },
*      updatedAt: Date,
*      updatedBy: {,
*        adminId: String,
*        adminName: String,
*      },
*    }]
 *  }
 * }
 * 
 * @apiUse RouteError401
 * @apiUse Error500
 */