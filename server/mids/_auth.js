const { User } = require('../api/models');

const { response, utils } = require('../libs');

const unauthorizedError = {
  message: 'You are not authorized to access this route.'
};

module.exports = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    utils.verifyJwt(token)
      .then(decodedToken => {
        User.getById(decodedToken.userId)
          .then(data => {
            req.user = data.user;
            next();
          })
          .catch(err => response.error(res, unauthorizedError, 401));
      })
      .catch(err => response.error(res, unauthorizedError, 401));
  } else {
    response.error(res, unauthorizedError, 401);
  }
};