const libs = {};

libs.mailer = require('./_mailer');
libs.pledge = require('./_pledge');
libs.utils = require('./_utils');
libs.response = require('./_response');
libs.scheduler = require('./_scheduler');
libs.eventEmitter = require('./_event-emitter');
libs.socket = require('./_socket');

module.exports = libs;