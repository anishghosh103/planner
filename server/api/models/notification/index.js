const shortid = require('shortid');

const Notification = require('./notification.model');
const Errors = require('../errors');

const { utils } = require('../../../libs');
const { promise } = utils;

const actions = {};
const pageLength = 20;
const selectArgs = '-_id -__v';

actions.get = (userId, page = 1) => {
  return promise(cb => {
    promise(cb => {
      Notification.find({ userId })
        .count((err, count) => err ? cb.error(Errors.Unknown) : cb.success(count));
    })
    .then(count => {
      Notification.find({ userId }).select(selectArgs)
        .sort('-meeting.updatedAt')
        .skip((page - 1) * pageLength).limit(pageLength)
        .lean().exec()
        .then(notifications => cb.success({ total: count, notifications }))
        .catch(err => cb.error(Errors.Unknown));
    })
    .catch(err => cb.error(err));
  });
};

actions.create = (notificationType, meeting) => {
  const notification = {
    notificationId: shortid.generate(),
    userId: meeting.userId,
    notificationType,
    meeting
  };
  return promise(cb => {
    new Notification(notification)
      .save(err => err ? cb.error(Errors.Unknown) : cb.success({ notification }));
  });
};

actions.delete = (userId, notificationId) => {
  return promise(cb => {
    Notification.findOneAndRemove({ notificationId }).exec()
      .then(() => cb.success())
      .catch(() => cb.error(Errors.Unknown));
  });
};

actions.deleteAll = (userId) => {
  return promise(cb => {
    Notification.remove({ userId }, err => {
      return err ? cb.error(Errors.Unknown) : cb.success();
    });
  });
};

module.exports = actions;