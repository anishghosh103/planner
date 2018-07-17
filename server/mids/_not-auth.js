const { response } = require('../libs');

const unauthorizedError = {
  message: 'A user is already logged in.'
};

module.exports = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    response.error(res, unauthorizedError, 403);
  } else {
    next();
  }
};