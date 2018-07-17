const shortid = require('shortid');

const Meeting = require('./meeting.model');
const Errors = require('../errors');

const { utils } = require('../../../libs');
const { promise } = utils;

const actions = {};
const pageLength = 20;
const selectArgs = '-_id -__v';

actions.getByUserId = (userId, page = 1) => {
  return promise(cb => {
    promise(cb => {
      Meeting.find({ userId })
        .count((err, count) => err ? cb.error(Errors.Unknown) : cb.success(count));
    })
    .then(count => {
      Meeting.find({ userId }).select(selectArgs)
        .skip((page - 1) * pageLength).limit(pageLength)
        .lean().exec()
        .then(meetings => cb.success({ total: count, meetings }))
        .catch(err => cb.error(Errors.Unknown));
    })
    .catch(err => cb.error(Errors.Unknown));
  });
};

actions.getById = (meetingId) => {
  return promise(cb => {
    Meeting.findOne({ meetingId }).select(selectArgs)
      .lean().exec()
      .then(meeting => {
        return meeting ? cb.success({ meeting }) : cb.error(Errors.MeetingNotFound);
      })
      .catch(err => cb.error(Errors.Unknown));
  });
};

actions.getByDate = (userId, year, month, day, page) => {
  const queryArgs = { userId };
  if (year) { queryArgs['date.year'] = year; }
  if (month) { queryArgs['date.month'] = month; }
  if (day) { queryArgs['date.day'] = day; }
  return promise(cb => {
    if (page) {
      promise(cb => {
        Meeting.find(queryArgs).select(selectArgs)
          .count((err, count) => err ? cb.error() : cb.success(count));
      })
      .then(count => {
        Meeting.find(queryArgs).select(selectArgs)
          .skip((page - 1) * pageLength).limit(pageLength)
          .lean().exec()
          .then(meetings => cb.success({ total: count, meetings }))
          .catch(err => cb.error(Errors.Unknown));
      })
      .catch(err => cb.error(Errors.Unknown));
    } else {
      Meeting.find(queryArgs).select(selectArgs)
        .lean().exec()
        .then(meetings => cb.success({ meetings }))
        .catch(err => cb.error(Errors.Unknown));
    }
  });
};

actions.create = (userId, purpose, day, month, year, startHour, startMinute, endHour, endMinute, place, admin) => {
  const meeting = {
    meetingId: shortid.generate(),
    userId, purpose,
    date: { day, month, year },
    startTime: { hour: startHour, minute: startMinute },
    endTime: { hour: endHour, minute: endMinute },
    place,
    createdBy: {
      adminId: admin.userId,
      adminName: `${admin.firstname} ${admin.lastname}`
    },
    updatedBy: {
      adminId: admin.userId,
      adminName: `${admin.firstname} ${admin.lastname}`
    }
  };
  return promise(cb => {
    new Meeting(meeting)
      .save(err => err ? cb.error(Errors.Unknown) : cb.success({ meeting }));
  });
};

actions.update = (meetingId, purpose, day, month, year, startHour, startMinute, endHour, endMinute, place, admin) => {
  return promise(cb => {
    Meeting.findOne({ meetingId }).exec()
      .then(meeting => {
        if (!meeting) {
          cb.error(Errors.MeetingNotFound);
        } else {
          meeting.purpose = purpose || meeting.purpose;
          meeting.date.year = year || meeting.data.year;
          meeting.date.month = month || meeting.data.month;
          meeting.date.day = day || meeting.data.day;
          meeting.startTime.hour = startHour || meeting.startTime.hour;
          meeting.startTime.minute = startMinute || meeting.startTime.minute;
          meeting.endTime.hour = endHour || meeting.endTime.hour;
          meeting.endTime.minute = endMinute || meeting.endTime.minute;
          meeting.place = place || meeting.place;
          meeting.updatedBy = {
            adminId: admin.userId,
            adminName: `${admin.firstname} ${admin.lastname}`
          };
          meeting.save((err, result) => {
            return err ? cb.error(Errors.Unknown) : cb.success({ meeting: result });
          });
        }
      })
      .catch(err => cb.error(Errors.Unknown));
  });
};

actions.delete = (meetingId, admin) => {
  return promise(cb => {
    Meeting.findOneAndRemove({ meetingId }).select(selectArgs)
      .lean().exec()
      .then(meeting => {
        meeting.updatedBy = {
          adminId: admin.userId,
          adminName: admin.firstname + admin.lastname
        };
        return meeting ? cb.success({ meeting }) : cb.error(Errors.MeetingNotFound);
      })
      .catch(err => {
        console.log(err);
        cb.error(Errors.Unknown);
      });
  });
};

module.exports = actions;