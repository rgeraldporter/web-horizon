'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('winston-papertrail').Papertrail;

var winstonPapertrail = new _winston2.default.transports.Papertrail({
    host: process.env.PAPERTRAIL_URL,
    port: process.env.PAPERTRAIL_PORT
});

var logger = new _winston2.default.Logger({
    transports: [winstonPapertrail]
});

exports.default = logger;