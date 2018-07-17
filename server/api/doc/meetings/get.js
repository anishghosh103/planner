/**
 * @api {get} /api/meetings/:id Get Meeting By Id
 * @apiName GetMeetingById
 * @apiGroup Meeting
 * @apiPermission User
 * 
 * @apiParam {String} id Meeting Id. (URL Parameter)
 * 
 * @apiSuccessExample Success Response (200)
 * {
 *  message: 'Meeting found.',
 *  status: 200,
 *  data: {
 *    meeting: {
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
 *    }
 *  }
 * }
 * @apiUse MeetingError404
 * @apiUse Error500
 */