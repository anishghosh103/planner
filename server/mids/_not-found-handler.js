const { response } = require('./../libs');

module.exports = (req, res, next) => {
  response.error(res, { message: 'Route not found.' }, 404);
};