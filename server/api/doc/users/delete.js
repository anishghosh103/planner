/**
 * @api {delete} /api/users/notifications Delete All Notifications
 * @apiName DeleteAllNotifications
 * @apiGroup User
 * @apiPermission User
 * 
 * @apiSuccessExample Success Response
 * {
 *  message: 'Notifications deleted.',
 *  status: 200,
 *  data: null
 * }
 * 
 * @apiUse RouteError401
 * @apiUse Error500
 */

/**
 * @api {delete} /api/users/notifications/:notificationId Delete Notification By Id
 * @apiName DeleteNotificationById
 * @apiGroup User
 * @apiPermission User
 * 
 * @apiParam {String} notificationId Notification ID. (URL Parameter)
 * 
 * @apiSuccessExample Success Response
 * {
 *  message: 'Notification deleted.',
 *  status: 200,
 *  data: null
 * }
 * 
 * @apiUse RouteError401
 * @apiUse Error500
 */