const shortid = require('shortid');

const { utils } = require('../../../libs');
const { promise, hashPassword, comparePassword } = utils;

const User = require('./user.model');
const Errors = require('../errors');

const actions = {};
const pageLength = 20;
const selectArgs = '-_id -__v -password';

actions.getAll = (page = 1, onlyNormal = true) => {
  const query = { verified: true };
  if (onlyNormal) query.userType = 'normal';
  return promise(cb => {
    promise(cb => {
      User.find(query).count((err, count) => err ? cb.error(err) : cb.success(count));
    })
    .then(count => {
      User.find(query).select(selectArgs)
        .skip((page - 1) * pageLength).limit(pageLength)
        .lean().exec()
        .then(users => cb.success({ total: count, users }))
        .catch(err => cb.error(Errors.Unknown));
    })
    .catch(err => cb.error(Errors.Unknown));
  });
};

actions.getById = (userId) => {
  return promise(cb => {
    User.findOne({ userId, verified: true }).select(selectArgs)
      .lean().exec()
      .then(user => user ? cb.success({ user }) : cb.error(Errors.UserNotFound))
      .catch(err => cb.error(Errors.Unknown));
  });
};

actions.getByUsername = (username) => {
  return promise(cb => {
    User.findOne({ username, verified: true }).select(selectArgs)
      .lean().exec()
      .then(user => user ? cb.success({ user }) : cb.error(Errors.UserNotFound))
      .catch(err => cb.error(Errors.Unknown));
  });
};

actions.verifyUser = (username, password) => {
  return promise(cb => {
    User.findOne({ username }).lean().exec()
      .then(user => {
        if (user && !user.verified) {
          cb.error(Errors.UserNotVerified);
        } else if (user) {
          const hash = user.password;
          delete user.password;
          delete user._id;
          delete user.__v;
          comparePassword(password, hash)
            .then(same => {
              return same ? cb.success({ user }) : cb.error(Errors.IncorrectPassword);
            })
            .catch(err => cb.error(Errors.Unknown));
        } else {
          cb.error(Errors.UserNotFound);
        }
      })
      .catch(err => cb.error(Errors.Unknown));
  });
};

actions.create = (firstname, lastname, email, password, mobile, username) => {
  const user = {
    firstname, lastname, email, mobile, username,
    userId: shortid.generate(),
    userType: username.endsWith('admin') ? 'admin' : 'normal'
  };
  return promise(cb => {
    User.findOne({ email }).exec()
      .then(data => {
        if (data) {
          cb.error(Errors.EmailExists);
          return promise(cb => cb.success(false));
        } else {
          return User.findOne({ username }).exec();
        }
      })
      .then(data => {
        if (data) {
          cb.error(Errors.UsernameExists);
          return promise(cb => cb.success(false));
        } else if (data !== false) {
          return hashPassword(password);
        }
      })
      .then(data => {
        if (data) {
          const newUser = Object.assign({}, { password: data }, user);
          new User(newUser)
            .save((err, result) => err ? cb.error(Errors.Unknown) : cb.success({ user }));
        }
      })
      .catch(err => cb.error(Errors.Unknown));
  });
};

actions.update = (userId, data) => {
  let { email, password, mobile } = data;
  return promise(cb => {
    if (!data) {
      cb.success();
      return;
    }
    hashPassword(password)
      .then(hash => password = hash)
      .then(() => User.findOne({ userId }).select(selectArgs).exec())
      .then(user => {
        if (user) {
          user.email = email || user.email;
          user.password = password || user.password;
          user.mobile = mobile || user.mobile;
          user.save(err => err ? cb.error(Errors.Unknown) : cb.success(user));
        } else {
          cb.error(Errors.UserNotFound);
        }
      })
      .catch(err => cb.error(Errors.Unknown));
  });
};

actions.activate = (userId) => {
  return promise(cb => {
    User.findOne({ userId }).exec()
      .then(user => {
        if (user) {
          user.verified = true;
          user.save((err, result) => err ? cb.error(Errors.Unknown) : cb.success());
        } else {
          cb.error(Errors.UserNotFound);
        }
      })
      .catch(err => cb.error(Errors.Unknown));
  });
};

module.exports = actions;