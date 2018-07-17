const { Errors, User, Meeting, Notification } = require('../models');
const { response, utils, eventEmitter, mailer } = require('../../libs');
const { generateJwt, verifyJwt } = utils;

const controller = {};

controller.getAll = (req, res) => {
  User.getAll(req.query.page)
    .then(data => response.success(res, data, 'Users found.'))
    .catch(err => handleError(res, err));
};

controller.getById = (req, res) => {
  User.getById(req.params.id)
    .then(data => response.success(res, data, 'User found.'))
    .catch(err => handleError(res, err));
};

controller.getMeetings = (req, res) => {
  const userId = req.params.id;
  const { year, month, day, page } = req.query;
  let query;
  if (year || month || day) {
    query = Meeting.getByDate(userId, year, month, day, page);
  } else {
    query = Meeting.getByUserId(userId, page);
  }
  query
    .then(data => response.success(res, data, 'Meetings found.'))
    .catch(err => handleError(res, err));
};

controller.getNotifications = (req, res) => {
  Notification.get(req.user.userId, req.query.page)
    .then(data => response.success(res, data, 'Notifications found.'))
    .catch(err => handleError(res, err));
};

controller.getAuthStatus = (req, res) => {
  response.success(res, { user: req.user }, 'User authorized.');
};

controller.login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  
  if (!username || !password) {
    return response.error(res, { message: 'Some field is empty.' }, 400);
  }

  User.verifyUser(username, password)
    .then(data => {
      const token = generateJwt({ userId: data.user.userId });
      res.cookie('token', token);
      response.success(res, data, 'Login Successful.');
    })
    .catch(err => {
      if (err === Errors.UserNotFound) {
        response.error(res, { username: 'Username not found.' }, 400);
      } else {
        handleError(res, err);
      }
    });
};

controller.signup = (req, res) => {
  const { firstname, lastname, username, email, password, mobile } = req.body;

  // TODO: input validation (e.g. password should contain at least 8 characters)
  if (!firstname || !lastname || !username || !email || !password || !mobile) {
    return response.error(res, { message: 'Some field is empty.' }, 400);
  }

  User.create(firstname, lastname, email, password, mobile, username)
    .then(data => mailer.sendActivationMail(data.user))
    .then(user => response.success(res, { user }, 'Registration successful.'))
    .catch(err => handleError(res, err));
};

controller.logout = (req, res) => {
  res.clearCookie('token');
  eventEmitter.emit('logout', req.user.userId);
  response.success(res, null, 'Logout successful.');
};

controller.forgotPassword = (req, res) => {
  const username = req.body.username;
  User.getByUsername(username)
    .then(data => mailer.sendResetPasswordMail(data.user))
    .then(user => response.success(res, null, 'Password reset mail sent.'))
    .catch(err => {
      if (err === Errors.UserNotFound) {
        response.error(res, { username: 'Username does not exist.' }, 400);
      } else {
        handleError(res, err);
      }
    });
};

controller.activate = (req, res) => {
  const userId = req.params.id;
  User.activate(userId)
    .then(() => response.success(res, null, 'User verified.'))
    .catch(err => handleError(res, err));
};

controller.resetPassword = (req, res) => {
  const { token, password } = req.body;
  if (!password) {
    response.error(res, { password: 'Password not provided.' }, 400);
  }
  verifyJwt(token)
    .then(data => {
      if (!data.userId) {
        return promise(cb => cb.error());
      } else {
        User.update(data.userId, { password })
          .then(data => response.success(res, data, 'Password reset successful.'))
          .catch(err => handleError(res, err));
      }
    })
    .catch(err => response.error(res, { message: 'Invalid token' }, 400));
};

controller.deleteNotification = (req, res) => {
  Notification.delete(req.user.userId, req.params.notificationId)
    .then(() => response.success(res, null, 'Notification deleted.'))
    .catch(err => handleError(res, err));
};

controller.deleteAllNotifications = (req, res) => {
  Notification.deleteAll(req.user.userId)
    .then(() => response.success(res, null, 'All Notifications deleted.'))
    .catch(err => handleError(res, err));
};

module.exports = controller;

function handleError(res, err) {
  switch (err) {
    case Errors.UserNotFound:
      response.error(res, { message: 'User not found.' }, 400);
      break;
    case Errors.EmailExists:
      response.error(res, { email: 'Email is already registered.' }, 400);
      break;
    case Errors.UsernameExists:
      response.error(res, { username: 'Username is already taken.' }, 400);
      break;
    case Errors.UserNotVerified:
      response.error(res, { username: 'User is not verified.' }, 400);
      break;
    case Errors.IncorrectPassword:
      response.error(res, { password: 'Incorrect password.' }, 400);
      break;
    case Errors.NotificationNotFound:
      response.error(res, { message: 'Notification not found.' }, 400);
      break;
    case Errors.Unauthorized:
      response.error(res, { message: 'You are not authorized to perform this operation.' }, 400);
      break;
    default:
      response.error(res);
  }
}