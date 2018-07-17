/**
 * @api {delete} /api/meetings/:id Delete a Meeting
 * @apiName DeleteMeeting
 * @apiGroup Meeting
 * @apiPermission Admin
 * 
 * @apiParam {String} id Meeting ID. (URL Parameter)
 * 
 * @apiSuccessExample Success Response (200)
 * {
 *  message: 'Meeting deleted.',
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
 * @apiUse MeetingError404
 * @apiUse AdminError403
 * @apiUse Error500
 */