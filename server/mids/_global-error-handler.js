const { response } = require('./../libs');

module.exports = (err, req, res, next) => {
  response.error(res, err);
};