/**
 * @api {post} /api/meetings/ Create new Meeting
 * @apiName CreateNewMeeting
 * @apiGroup Meeting
 * @apiPermission Admin
 * 
 * @apiParam {String} userId User ID of the user on whose account the meeting is created. (Body Parameter)
 * @apiParam {String} purpose Purpose of the meeting. (Body Parameter)
 * @apiParam {Object} date Date of the meeting. (Body Parameter)
 * @apiParam {Object} startTime Starting time of the meeting. (Body Parameter)
 * @apiParam {Object} endTime Ending time of the meeting. (Body Parameter)
 * @apiParam {String} place Place of the meeting. (Body Parameter)
 * 
 * @apiSuccessExample Success Response (200)
 * {
 *  message: 'Meeting created.',
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
 * 
 * @apiUse AdminError403
 * @apiUse Error500
 */