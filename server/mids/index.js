const mids = {};

mids.globalErrorHandler = require('./_global-error-handler');
mids.notFoundHandler = require('./_not-found-handler');
mids.routeLogger = require('./_route-logger');
mids.auth = require('./_auth');
mids.notAuth = require('./_not-auth');
mids.checkAdmin = require('./_check-admin');

module.exports = mids;