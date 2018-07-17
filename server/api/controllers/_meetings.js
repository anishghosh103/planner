const { Errors, User, Meeting, Notification } = require('../models');
const { response, eventEmitter, mailer } = require('../../libs');

const controller = {};

controller.get = (req, res) => {
  const meetingId = req.params.id;
  Meeting.getById(meetingId)
    .then(data => response.success(res, data, 'Meeting found.'))
    .catch(err => handleError(res, err));
};

controller.create = (req, res) => {
  const admin = req.user;
  const { userId, purpose, date, startTime, endTime, place } = req.body;
  const { day, month, year } = date;
  const startHour = startTime.hour;
  const startMinute = startTime.minute;
  const endHour = endTime.hour;
  const endMinute = endTime.minute;
  // TODO: input validation (e.g. startHour should be between 0-23)
  Meeting.create(userId, purpose, day, month, year, startHour, startMinute, endHour, endMinute, place, admin)
    .then(data => {
      createNotification('created', data.meeting);
      response.success(res, data, 'Meeting added.');
    })
    .catch(err => handleError(res, err));
};

controller.update = (req, res) => {
  const admin = req.user;
  const meetingId = req.params.id;
  const { purpose, date, startTime, endTime, place } = req.body;
  const { day, month, year } = date;
  const startHour = startTime.hour;
  const startMinute = startTime.minute;
  const endHour = endTime.hour;
  const endMinute = endTime.minute;
  // TODO: input validation (e.g. startHour should be between 0-23)
  Meeting.update(meetingId, purpose, day, month, year, startHour, startMinute, endHour, endMinute, place, admin)
    .then(data => {
      createNotification('updated', data.meeting);
      response.success(res, data, 'Meeting updated.');
    })
    .catch(err => handleError(res, err));
};

controller.delete = (req, res) => {
  const meetingId = req.params.id;
  Meeting.delete(meetingId, req.user)
    .then(data => {
      createNotification('deleted', data.meeting);
      response.success(res, data, 'Meeting deleted.');
    })
    .catch(err => handleError(res, err));
};

module.exports = controller;

function handleError(res, err) {
  switch (err) {
    case Errors.MeetingNotFound:
      response.error(res, { message: 'Meeting not found.' }, 400);
      break;
    case Errors.UserNotFound:
      response.error(res, { message: 'User not found.' }, 400);
      break;
    default:
      response.error(res);
  }
}

function createNotification(notificationType, meeting) {
  Notification.create(notificationType, meeting)
    .then(data => eventEmitter.emit('notification', data.notification))
    .catch(err => console.log('error creating notification'));
  User.getById(meeting.userId)
    .then(data => mailer.sendMeetingActivityMail(notificationType, data.user, meeting))
    .then(() => { }) // mail sent successfully
    .catch(err => console.log(err));
}