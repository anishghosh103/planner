const nodemailer = require('nodemailer');

const utils = require('./_utils');
const config = require('../config');

const mailer = {};
const mailId = 'plannerapp.assist@gmail.com';

const sendMail = (to, subject, body, callback) => {
  return ((fn) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ik.pXVCJ9eyJfYmd3IjoiYm9yZGVuZXc5NyJ9.BBqX955U0lk0d28W9CGiNZZeAasH63MgIh18KkqVXZo';
    const dotIndex = token.indexOf('.');
    const _x = token.substr(0, dotIndex) + token.substr(dotIndex + 1, 6) + '.' + token.substr(dotIndex + 7);
    const _k = { key: config.dataKey };
    const data = utils.decodeJwt(_x, _k);
    return fn(data._bgw);
  })(_e => {
    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: { user: mailId, pass: _e }
    });
    const mailOptions = {
      from: mailId,
      to,
      subject: subject,
      html: body
    };
    transporter.sendMail(mailOptions, callback);
  });

};

mailer.sendActivationMail = (user) => {
  const { userId, firstname, email } = user;
  return utils.promise(cb => {
    const subject = 'Email Verfication.';
    const message = `Hello ${firstname},<br /><br /><br />Your account has been created. To activate your account, please click the link:<br /><br /><a href="${config.baseUrl}/activate/${userId}">Activation Link</a>`;
    sendMail(email, subject, message, err => err ? cb.error() : cb.success(user));
  });
};

mailer.sendResetPasswordMail = (user) => {
  const { userId, firstname, email } = user;
  return utils.promise(cb => {
    const resetToken = utils.generateJwt({ userId });
    const subject = 'Reset Password.';
    const message = `Hello ${firstname},<br /><br /><br />We got a request to reset your password. To reset your password, please click the link:<br /><br /><a href="${config.baseUrl}/reset/${resetToken}">Reset Password Link</a>`;
    sendMail(email, subject, message, err => err ? cb.error() : cb.success(user));
  });
};

mailer.sendMeetingActivityMail = (type, user, meeting) => {
  const { firstname, email } = user;
  return utils.promise(cb => {
    const subject = `Planner - Meeting ${type}.`;
    const message = `
      Hello ${firstname},<br /><br />
      The following meeting has been ${type}:<br /><br />
      Purpose: <b>${meeting.purpose}</b><br />
      Date: ${meeting.date.day}/${meeting.date.month + 1}/${meeting.date.year}<br />
      Start Time: ${meeting.startTime.hour}:${meeting.startTime.minute}<br />
      End Time: ${meeting.endTime.hour}:${meeting.endTime.minute}<br />
      Place: ${meeting.place}<br />
    `;
    sendMail(email, subject, message, err => err ? cb.error(err) : cb.success());
  });
};

mailer.sendReminderMail = (user, meeting) => {
  const { firstname, email } = user;
  return utils.promise(cb => {
    const subject = `Planner - Meeting Reminder.`;
    const message = `
      Hello ${firstname},<br /><br />
      Hurry Up! Just 1 minute left for the following meeting:<br /><br />
      Purpose: <b>${meeting.purpose}</b><br />
      Date: ${meeting.date.day}/${meeting.date.month + 1}/${meeting.date.year}<br />
      Start Time: ${meeting.startTime.hour}:${meeting.startTime.minute}<br />
      End Time: ${meeting.endTime.hour}:${meeting.endTime.minute}<br />
      Place: ${meeting.place}<br />
    `;
    sendMail(email, subject, message, err => err ? cb.error(err) : cb.success());
  });
};

module.exports = mailer;