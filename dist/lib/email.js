'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.send = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _mailgunJs = require('mailgun-js');

var _mailgunJs2 = _interopRequireDefault(_mailgunJs);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mailgunConig = {
    domain: 'sandbox6903d7f2aaef455a92d834c00c70b586.mailgun.org',
    apiKey: process.env.MAILGUN_KEY || null
};

var message = {
    from: 'WebHorizons.org Reports <no-reply@webhorizon.org>',
    to: 'browser-releases@googlegroups.com',
    subject: 'Horizons Browser Report'
};

var send = function send(notice) {
    var mailgun = (0, _mailgunJs2.default)(mailgunConig);

    var emailMessage = (0, _assign2.default)(message, { text: notice });
    notice && mailgun.messages().send(emailMessage, function (error, body) {
        _logger2.default.info('Emailed: ', body);
    });
};

exports.send = send;