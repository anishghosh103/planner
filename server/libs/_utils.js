const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../config');

const utils = {};

utils.promise = (callback) => {
  return new Promise((resolve, reject) => {
    const obj = {};
    callback({
      set: (key, value) => obj[key] = value,
      success: (data) => resolve(data !== undefined ? data : obj),
      error: (data) => reject(data !== undefined ? data : obj)
    });
  });
};

utils.verifyJwt = (token, secret) => {
  return utils.promise(cb => {
    jwt.verify(token, secret || config.secret, (err, decodedToken) => {
      if (err || !decodedToken) {
        cb.error();
      } else {
        cb.success(decodedToken);
      }
    });
  });
};

utils.generateJwt = (payload, secret = config.secret) => {
  return jwt.sign(payload, secret);
};

utils.decodeJwt = (token, key) => {
  return jwt.decode(token);
};

utils.tokenExpired = (token) => {
  const decodedToken = jwt.decode(token);
  if (decodedToken.exp) {
    return new Date(decodedToken.exp).getTime() - Date.now() <= 0;
  } else {
    return true;
  }
};

utils.comparePassword = (value, hash) => {
  return utils.promise(cb => {
    if (value) {
      bcrypt.compare(value, hash, (err, same) => err ? cb.error() : cb.success(same));
    } else {
      cb.success();
    }
  });
};

utils.hashPassword = (value) => {
  return utils.promise(cb => {
    if (value) {
      bcrypt.hash(value, 10, (err, hash) => err ? cb.error() : cb.success(hash));
    } else {
      cb.success();
    }
  });
};

module.exports = utils;