const { response } = require('../libs');

const unauthorizedError = {
  message: 'You need to have \'admin\' account to access this route.'
};

module.exports = (req, res, next) => {
  if (req.user.userType === 'admin') {
    next();
  } else {
    response.error(res, unauthorizedError, 403);
  }
};