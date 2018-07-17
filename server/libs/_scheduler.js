const moment = require('moment-timezone');

const Meeting = require('../api/models/meeting/meeting.model');
const User = require('../api/models/user/user.model');
const eventEmitter = require('./_event-emitter');
const mailer = require('./_mailer');

const scheduler = {};
let remindedMeetings = [];
let timer = null;
let counter = 0;

scheduler.run = () => {
  timer = setInterval(runScheduler, 5000);
};

scheduler.stop = () => {
  if (timer) {
    clearInterval(timer);
  }
};

scheduler.snooze = (meeting) => {
  console.log('scheduler.snooze');
  setTimeout(() => {
    eventEmitter.emit('reminder', meeting);
  }, 5000);
};

module.exports = scheduler;

function runScheduler() {
  // console.log('Scheduler.tick', ++counter);
  cleanRemindedMeetings();
  sendMeetingNotifications();
}

function cleanRemindedMeetings() {
  remindedMeetings = remindedMeetings.filter(meeting => {
    const meetingMoment = moment(
      Object.assign({}, meeting.date, meeting.startTime)
    );
    return moment().isBefore(meetingMoment);
  });
}

function sendMeetingNotifications() {
  const time = moment().add(1, 'minutes').tz('Asia/Kolkata');
  const queryArgs = {
    'date.year': time.get('year'),
    'date.month': time.get('month'),
    'date.day': time.get('date'),
    'startTime.hour': time.get('hour'),
    'startTime.minute': time.get('minute'),
  };
  Meeting.find(queryArgs)
    .lean().exec()
    .then(meetings => {
      meetings
        .filter(meeting => {
          const remindedMeeting = remindedMeetings.find(M => {
            return M.meetingId === meeting.meetingId;
          });
          if (remindedMeeting && !moment(remindedMeeting.updatedAt).isSame(meeting.updatedAt, 'minute')) {
            remindedMeetings = remindedMeetings.filter(M => M.meetingId !== remindedMeeting.meetingId);
          } else if (remindedMeeting) {
            return false;
          }
          return true;
        })
        .forEach(meeting => {
          remindedMeetings.push(meeting);
          eventEmitter.emit('reminder', meeting);
          sendMail(meeting);
        });
    })
    .catch(err => {});
}

function sendMail(meeting) {
  User.findOne({ userId: meeting.userId }).exec()
    .then(user => {
      if (user) {
        return mailer.sendReminderMail(user, meeting);
      }
    })
    .then(() => {})
    .catch(err => console.log(err));
}